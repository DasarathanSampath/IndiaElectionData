<template>
    <div>   
        <div class="row">
            <div class="column-4">        
                <TableConst
                :tableHead="tableHead"
                :posts="dataByConst"                
            />      
            </div>
            <div v-if="chartdataVotes && optionsVotes" class="column-5">
                <BarChart 
                    :chartData="chartdataVotes"
                    :options="optionsVotes"
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
        dataByConst: {
            tyep: Array,
            required: true
        },
        tableHead: {
            tyep: Array,
            required: true
        }
    },
    components: {
        BarChart, TableConst
    },
    computed: {
        groupByPartySum () {
            const groupByPartySum = this.dataByConst.reduce((acc, it) => {
                const total = +it.total
                acc[it.party] = (acc[it.party] || 0) + total
                return acc
            }, {})
            return groupByPartySum
        },
        performancePartyNames () {
            return Object.keys(this.groupByPartySum)
        },
        performancePartyVotes () {
            return Object.values(this.groupByPartySum)          
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
                    display: true,
                    position: 'bottom'
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
                    text: 'Votes by Party for Selected Constituency'
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