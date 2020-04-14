<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
    import echarts from 'echarts'

    require('echarts/theme/macarons') // echarts theme
    import resize from './mixins/resize'

    export default {
        mixins: [resize],
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '300px'
            },
            chartData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                chart: null
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        watch: {
            chartData: {
                deep: true,
                handler(val) {
                    this.setOptions(val)
                }
            }
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')
                this.setOptions(this.chartData)
            },
            setOptions(val) {
                console.log(val);
                this.chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        left: 'center',
                        bottom: '10',
                        data: ['用户使用率', '系统使用率', '当前等待率', '当前空闲率', '当前错误率']
                    },
                    series: [
                        {
                            name: 'CPU UESD RATE',
                            type: 'pie',
                            roseType: 'radius',
                            radius: [15, 95],
                            center: ['50%', '40%'],
                            data: [
                                {value: val.userRate, name: '用户使用率'},
                                {value: val.sysRate, name: '系统使用率'},
                                {value: val.waitRate, name: '当前等待率'},
                                {value: val.idleRate, name: '当前空闲率'},
                                {value: val.niceRate, name: '当前错误率'}
                            ],
                            animationEasing: 'cubicInOut',
                            animationDuration: 2600
                        }
                    ]
                })
            }
        }
    }
</script>
