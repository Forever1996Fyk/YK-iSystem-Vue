<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

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

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Java', 'Python', 'PHP', 'C', 'C++', 'C#', 'JS'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '1月使用率',
          type: 'bar',
          stack: 'vistors',
          barWidth: '30%',
          data: [16.896, 9.704, 2.405, 15.774, 5.574, 5.349, 2.451],
          animationDuration
        }, {
          name: '2月使用率',
          type: 'bar',
          stack: 'vistors',
          barWidth: '30%',
          data: [20.896, 14.543, 4.411, 13.334, 7.612, 5.349, 1.421],
          animationDuration
        }, {
          name: '3月使用率',
          type: 'bar',
          stack: 'vistors',
          barWidth: '30%',
          data: [26.896, 12.461, 5.123, 10.012, 9.601, 5.349, 5.451],
          animationDuration
        }]
      })
    }
  }
}
</script>
