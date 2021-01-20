<template>
  <div v-if="asyncDataStatus_ready && storeConstData">
    <div class="table-filters">
      <select class="select-float" v-model="selectedYear" @change="setYear(selectedYear)">
          <option v-for="year in storeParliYears " :key="year">
            {{year}}
          </option>
      </select> 
    </div>
    <h1> {{storeSelectedYear}} Parliamentary Election</h1>
    <div class="row">
      <div class="column-3">        
        <h4>Electors: <span> {{totalElectors}} </span> </h4> 
        <h4>Voters: <span> {{totalVoters}} </span> </h4> 
        <h4>Polling Percentage: <span> {{pollingPercentage}} % </span> </h4>
        <h4>Number of Constituency: <span> {{totalConstituency}} </span> </h4>
      </div>
      <div class="column-3">
        <h4> The winning alliance: <span> {{theWinningAlliance}} </span> </h4>
        <h4>Won seats: <span> {{theWinningSeats}} </span></h4>
      </div>
      <div class="column-3">
        <h4> The runner alliance: <span> {{theRunnerAlliance}} </span> </h4>
        <h4>Won seats:<span> {{theRunnerSeats}} </span> </h4>
      </div>
    </div>
    <h1>Performance of Major Parties</h1>
    <PerformanceSummary 
      :performanceData="storePerformanceData"
    />
    <h1>Winners data by State Name:</h1>
    <select class="select-float" v-model="selectedState" @change="setStateName(selectedState)">
        <option v-for="stateName in storeStateNames " :key="stateName">
              {{ stateName }}
        </option>
    </select>
    <StateSummary
      :winnersData="storeWinnersData"
      :tableHead="tableHeadConst"
      :storeSelectedState="storeSelectedState"
    />
    <h1>Complete data by Constituency for the above State Name:</h1>
    <select class="select-float" v-model="selectedConst" @change="setAndGetConst(selectedConst)">
      <option v-for="constName in storeConstNames" :key="constName">
            {{ constName }}
      </option>
    </select>
    <ConstSummary
      :dataByConst="dataByConst"
      :tableHead="tableHeadConst"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import TableConst from '@/components/TableConst'
import PerformanceSummary from '@/components/PerformanceSummary'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import StateSummary from '@/components/StateSummary'
import ConstSummary from '@/components/ConstSummary'

export default {
  name: 'HomePage',
  data () {
    return {
      tableHeadConst: [ 'alliance', 'State Name', 'Constituency', 'Candidate', 'Party', 'Electors', 'Polled', 'Received', 'Rank', '% Electors', '% Polled' ]
    }
  },

  components: {
    TableConst, PerformanceSummary, StateSummary, ConstSummary
  },

  mixins: [asyncDataStatus],

  computed: {
    ...mapGetters({
      storeParliYears: 'parliYears',
      storeSelectedYear: 'selectedYear',      
      storeStateNames: 'stateNames',
      storeSelectedState: 'selectedState',
      storeConstNames: 'constNames',
      storeSelectedConst: 'selectedConst',
      storeConstData: 'constData',
      storeWinnersData: 'winnersData',
      storePerformanceData: 'performanceData'
    }),
    selectedState: {
      set (selectedState) {
        this.$store.dispatch('fetchSelectedState', {selectedState})
      },
      get() {
        return this.storeSelectedState
      }
    },
    selectedYear: {
      set (selectedYear) {
        this.$store.dispatch('fetchInitialData', {selectedYear})
      },
      get() {
        return this.storeSelectedYear
      }
    },
    selectedConst: {
      set (selectedConst) {
        this.$store.dispatch('fetchSelectedConst', {selectedConst})
      },
      get() {
        return this.storeSelectedConst
      }
    },
    totalElectors() {
      return (this.storePerformanceData[0].electors).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    totalVoters() {
      return (this.storePerformanceData[0].voters).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    pollingPercentage() {
      return (Math.round((this.storePerformanceData[0].voters / this.storePerformanceData[0].electors) * 10000) / 10000) * 100
    },
    totalConstituency() {
      return(this.storeWinnersData.length)
    },
    groupByAllianceWin () {
      const groupByAllianceWinSum = this.storeWinnersData.reduce((acc, it) => {
        const win = +it.win
        acc[it.alliance] = (acc[it.alliance] || 0) + win
        return acc
      }, {})
      return groupByAllianceWinSum
    },    
    groupByAllianceWinSorted () {
      var sortable = []
      for (var seats in this.groupByAllianceWin) {
          sortable.push([seats, this.groupByAllianceWin[seats]])
      }
      sortable.sort(function(a, b) {
          return b[1] - a[1]
      })
      var objSorted = {}
      sortable.forEach(function(item){
          objSorted[item[0]] = item[1]
      })
      return objSorted
    },    
    theWinningAlliance () {
      return Object.keys(this.groupByAllianceWinSorted)[0]
    },
    theWinningSeats () {
      return this.groupByAllianceWinSorted[Object.keys(this.groupByAllianceWinSorted)[0]]
    },
    theRunnerAlliance () {
      return Object.keys(this.groupByAllianceWinSorted)[1]
    },
    theRunnerSeats () {
      return this.groupByAllianceWinSorted[Object.keys(this.groupByAllianceWinSorted)[1]]
    },
    dataByConst () {
      return this.storeConstData
    }
  },

  methods: {
    setYear (selectedYear) {
      this.$store.dispatch('fetchInitialData', {selectedYear})
    },
    setStateName (selectedState) {
      this.$store.dispatch('fetchSelectedState', {selectedState})
    },
    setAndGetConst (selectedConst) {
      this.$store.dispatch('fetchSelectedConst', {selectedConst})
    }/* ,
    forceRerenderPerformance() {
      this.renderComponentPerformance = false
      this.$nextTick().then(() => {
        this.renderComponentPerformance = true
      })
    },
    forceRerenderState() {
      this.renderComponentState = false
      this.$nextTick().then(() => {
        this.renderComponentState = true
      })
    },
    forceRerenderConst() {
      this.renderComponentConst = false
      this.$nextTick().then(() => {
        this.renderComponentConst = true
      })
    } */   
  },
  created () {
    const selectedYear = null
    this.$store.dispatch('fetchInitialData', {selectedYear})
      .then(() => { this.asyncDataStatus_fetched() })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  display: inline-block;
  font-style: italic;
  font-weight: 600;
  color:darkslategray;
}
</style>
