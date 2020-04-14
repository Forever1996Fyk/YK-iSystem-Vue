<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner"/>

    <panel-group @handleSetLineChartData="handleSetLineChartData" :count-num="countNum"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" v-if="lineChartData !== null"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChartData" v-if="pieChartData !== null"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}"
              style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}"
              style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}"
              style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import GithubCorner from '@/components/GithubCorner'
    import PanelGroup from './components/PanelGroup'
    import LineChart from './components/LineChart'
    import RaddarChart from './components/RaddarChart'
    import PieChart from './components/PieChart'
    import BarChart from './components/BarChart'
    import TransactionTable from './components/TransactionTable'
    import TodoList from './components/TodoList'
    import BoxCard from './components/BoxCard'

    import {getIndexCountData, getIndexChartData, getIndexInfoData} from '@/api/dashboard'

    const lineChartData = {
        // newVisitis: {
        //     expectedData: [100, 120, 161, 134, 105, 160, 165],
        //     actualData: [120, 82, 91, 154, 162, 140, 145]
        // },
        messages: {
            expectedData: [200, 192, 120, 144, 160, 130, 140],
            actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        purchases: {
            expectedData: [80, 100, 121, 104, 105, 90, 100],
            actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shoppings: {
            expectedData: [130, 140, 141, 142, 145, 150, 160],
            actualData: [120, 82, 91, 154, 162, 140, 130]
        }
    }

    export default {
        name: 'DashboardAdmin',
        components: {
            GithubCorner,
            PanelGroup,
            LineChart,
            RaddarChart,
            PieChart,
            BarChart,
            TransactionTable,
            TodoList,
            BoxCard
        },
        data() {
            return {
                lineChartData: null,
                pieChartData: null,
                countNum: {},
            }
        },
        created() {
            this.handleSetLineChartData('actionCount');
            this.handleSetraddarPieBarChartData();
        },
        methods: {
            handleSetLineChartData(type) {
                var lineData = {xData: [], yData: []};
                switch (type) {
                    case 'actionCount':
                        getIndexCountData({type: type}).then((res) => {
                            for (var i = 0; i < res.data.list.length; i++) {
                                lineData.xData.push(res.data.list[i].actionTime);
                                lineData.yData.push(res.data.list[i].num);
                            }
                            this.countNum = res.data;
                            this.lineChartData = lineData;
                        })
                }
            },

            handleSetraddarPieBarChartData() {
                getIndexChartData().then((res) => {
                    this.pieChartData = res.data.cpuInfo[0];
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
