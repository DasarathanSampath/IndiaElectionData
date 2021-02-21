<template>
  <div>
    <h1>Data Conversion Legislative</h1>
  </div>
</template>

<script>
import jsonData from '@/json/kl/kl2006.json'

export default {
  name: 'DataConversion',
  data () {
    return {
      completeData: jsonData.ydata
    }
  },

  computed: {
    onlyWinners () {
      const data = this.completeData
      const filtered = []
      for (const key in data) {
        if (data[key].win === 1) { filtered.push(data[key]) }
      }
      return filtered
    },
    stateNames () {
      const data = this.completeData
      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x)
          return rv
        }, {})
      }
      const groupByConst = groupBy(data, 'statename')
      const names = Object.keys(groupByConst)
      const sortednames = names.sort()
      return sortednames
    },
    groupByConst () {
      const data = this.completeData
      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x)
          return rv
        }, {})
      }
      const groupByState = groupBy(data, 'pcname')
      return groupByState
    },
    constituencynames () {
      const data = this.completeData
      const groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x)
          return rv
        }, {})
      }
      const groupByConst = groupBy(data, 'pcname')
      const names = Object.keys(groupByConst)
      const sortednames = names.sort()
      return sortednames
    }    
  },

  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
