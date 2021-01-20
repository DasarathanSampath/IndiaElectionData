<template>
  <div v-if="asyncDataStatus_ready && storeConstDataLegis">
    <div class="table-filters">
      <select class="select-float" v-model="selectedStateLegis" @change="setState(selectedStateLegis)">
          <option v-for="state in storeLegisStates " :key="state">
            {{state}}
          </option>
      </select> 
      <select class="select-float" v-model="selectedYearLegis" @change="setYear(selectedYearLegis)">
          <option v-for="year in storeYearsLegis " :key="year">
            {{year}}
          </option>
      </select> 
    </div>
    <h1> {{storeSelectedYearLegis}} {{stateNamesData[selectedStateLegis]}} Legislative Election</h1>
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
      :performanceData="storePerformanceDataLegis"
    />
    <h1>Winners data:</h1>
      <LegislativeSummary
      :winnersData="storeWinnersDataLegis"
      :tableHead="tableHeadConst"
      :storeSelectedState="storeSelectedStateLegis"
    />
    <h1>Complete data by Constituency for the above State Name:</h1>
    <select class="select-float" v-model="selectedConstLegis" @change="setAndGetConst(selectedConstLegis)">
      <option v-for="constName in storeConstNamesLegis" :key="constName">
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
import LegislativeSummary from '@/components/LegislativeSummary'
import ConstSummary from '@/components/ConstSummary'

export default {
  name: 'PageLegislative',
  data () {
    return {
      tableHeadConst: [ 'alliance', 'State Name', 'Constituency', 'Candidate', 'Party', 'Electors', 'Polled', 'Received', 'Rank', '% Electors', '% Polled' ],
      stateNamesData: { tamilnadu: 'Tamil Nadu', delhi: 'NCT of Delhi' }
    }
  },

  components: {
    TableConst, PerformanceSummary, LegislativeSummary, ConstSummary
  },

  mixins: [asyncDataStatus],

  computed: {
    ...mapGetters({
      storeLegisStates: 'legisStates',
      storeSelectedStateLegis: 'selectedStateLegis',
      storeYearsLegis: 'yearsLegis',
      storeSelectedYearLegis:'selectedYearLegis',
      storePerformanceDataLegis: 'performanceDataLegis',
      storeWinnersDataLegis: 'winnersDataLegis',
      storeConstNamesLegis: 'constNamesLegis',
      storeSelectedConstLegis: 'selectedConstLegis',
      storeConstDataLegis: 'constDataLegis'
    }),
    selectedStateLegis: {
      set (selectedStateLegis) {
        this.$store.dispatch('fetchInitialDataLegis', {selectedStateLegis})
      },
      get() {
        return this.storeSelectedStateLegis
      }
    },
    selectedYearLegis: {
      set (selectedYearLegis) {
        this.$store.dispatch('fetchSelectedYearLegis', {selectedYearLegis})
      },
      get() {
        return this.storeSelectedYearLegis
      }
    },
    selectedConstLegis: {
      set (selectedConstLegis) {
        this.$store.dispatch('fetchSelectedConstLegis', {selectedConstLegis})
      },
      get() {
        return this.storeSelectedConstLegis
      }
    },
    totalElectors() {
      return (this.storePerformanceDataLegis[0].electors).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    totalVoters() {
      return (this.storePerformanceDataLegis[0].voters).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    pollingPercentage() {
      return (Math.round((this.storePerformanceDataLegis[0].voters / this.storePerformanceDataLegis[0].electors) * 10000) / 10000) * 100
    },
    totalConstituency() {
      return(this.storeWinnersDataLegis.length)
    },
    groupByAllianceWin () {
      const groupByAllianceWinSum = this.storeWinnersDataLegis.reduce((acc, it) => {
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
      return this.storeConstDataLegis
    }
  },

  methods: {
    setYear (selectedYearLegis) {
      this.$store.dispatch('fetchSelectedYearLegis', {selectedYearLegis})
    },
    setState (selectedStateLegis) {
      this.$store.dispatch('fetchInitialDataLegis', {selectedStateLegis})
    },
    setAndGetConst (selectedConstLegis) {
      this.$store.dispatch('fetchSelectedConstLegis', {selectedConstLegis})
    } 
  },  
  created () {
    const selectedStateLegis = null
    this.$store.dispatch('fetchInitialDataLegis', {selectedStateLegis})
      .then(() => { this.asyncDataStatus_fetched() })
  }
}
</script>

<style scoped>
span {
  display: inline-block;
  font-style: italic;
  font-weight: 600;
  color:darkslategray;
}
</style>
