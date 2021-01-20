<script>

import { Bar, mixins } from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels'

const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  components: {
    ChartJsPluginDataLabels
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
