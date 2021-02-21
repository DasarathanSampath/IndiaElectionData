<template>
    <div>
        <TablePerformance
            :tableHead="tableHeadPerformance"
            :posts="performanceData"
            style="padding: 1rem 0 1rem 0"
        />
        <div class="row">
        <div v-if="chartdataVotes && optionsVotes" class="column-2">        
            <BarChart 
                :chartData="chartdataVotes"
                :options="optionsVotes"
                class="card"
            />        
        </div>
        <div v-if="chartdataSeats && optionsSeats" class="column-2">
            <BarChart 
                :chartData="chartdataSeats"
                :options="optionsSeats"
                class="card"                
            />                     
        </div>
        </div>
    </div>
</template>

<script>
import BarChart from '@/components/BarChart'
import TablePerformance from '@/components/TablePerformance'

export default {
    props: {
        performanceData: {
            tyep: Array,
            required: true
        }
    },
    components: {
        BarChart, TablePerformance
    },
    data () {
        return {
            tableHeadPerformance: ['Party', 'Contested', 'Seats Won', 'Votes']
        }
    },
    computed: {
        performancePartyNames () {
            return this.performanceData.map(a => a.party)
        },
        performancePartyWins () {
            return this.performanceData.map(a => a.won)
        },
        performancePartyVotes () {
            return this.performanceData.map(a => a.votes)
        },
        chartdataVotes () {
            const labels = this.performancePartyNames
            const datasets = [
                {
                label: 'Total Votes',
                xlabels: 'X Axis',
                backgroundColor: '#f87979',
                lineTension: 0,
                borderWidth: 1,
                borderColor: '#F2A727',
                pointBackgroundColor: '#F2A727',
                data: this.performancePartyVotes
                }
            ]
            return {labels, datasets}
        },
        optionsVotes () {
            const options = {
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        offset: 4,
                        align: 'top',
                        font: {
                            weight: 'bold',
                            size: 16
                        },
                        rotation: 320
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: { // hides the legend
                    position: 'bottom',
                    display: true
                },
                scales: { // hides the y axis
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'No. of Votes'
                        }                  
                    }],
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Party Names'
                        }
                    }]
                },
                title: {
                    display: true,
                    position: 'bottom',
                    text: 'Votes by Party'
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 75,
                        bottom: 20
                    }
                }
            }
            return options
        },
        chartdataSeats () {
            const labels = this.performancePartyNames
            const datasets = [
                {
                label: 'Seats Won',
                xlabels: 'X Axis',                
                backgroundColor: '#f87979',
                lineTension: 0,
                borderWidth: 1,
                borderColor: '#F2A727',
                pointBackgroundColor: '#F2A727',
                data: this.performancePartyWins
                }
            ]
            return {labels, datasets}
        },
        optionsSeats () {
            const options = {
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        offset: 4,
                        align: 'top',
                        font: {
                            weight: 'bold',
                            size: 16
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: { // hides the legend
                    display: true,
                    position: 'bottom'
                },
                scales: { // hides the y axis
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'No. of Seats'
                        }
                    }],
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Party Names'
                        }
                    }]
                },
                title: {
                    display: true,
                    position: 'bottom',
                    text: 'Winning Seats by Party'
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 75,
                        bottom: 20
                    }
                }
            }
            return options
        }        
    }
}
</script>