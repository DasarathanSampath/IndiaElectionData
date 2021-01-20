<template>
    <div>   
        <div class="row">
            <div class="column-4">        
                <TableConst
                :tableHead="tableHead"
                :posts="winnersData"
            />      
            </div>
            <div v-if="chartdataSeats && optionsSeats" class="column-5">
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
import TableConst from '@/components/TableConst'

export default {
    props: {
        winnersData: {
            type: Array,
            required: true
        },
        tableHead: {
            type: Array,
            required: true
        },
        storeSelectedState: {
            type: String,
            required: true
        }
    },
    components: {
        BarChart, TableConst
    },   
    computed: {
        groupByPartySum () {
            const groupByPartySum = this.winnersData.reduce((acc, it) => {
                const win = +it.win
                acc[it.party] = (acc[it.party] || 0) + win
                return acc
            }, {})
            return groupByPartySum
        },
        performancePartyNames () {
            return Object.keys(this.groupByPartySum)
        },
        performancePartyWins () {
            return Object.values(this.groupByPartySum)          
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
                    text: 'Winning Seats by Party for Selected State'
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