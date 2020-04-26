<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.title')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
<!--      <el-button-->
<!--        class="filter-item"-->
<!--        style="margin-left: 10px;"-->
<!--        type="primary"-->
<!--        icon="el-icon-plus"-->
<!--        @click="handleImport"-->
<!--      >-->
<!--        {{ $t('table.import') }}-->
<!--      </el-button>-->

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="danger"
        icon="el-icon-delete"
        @click="handleExport"
      >
        {{ $t('table.export') }}
      </el-button>
    </div>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column :label="$t('table.subject')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.subject }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.title')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.content')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.url')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.publishTime')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.publishTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.publishPlatform')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.publishPlatform }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.forwardNum')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.forwardNum }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.commentNum')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.commentNum }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.likeNum')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.likeNum }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sort')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.type')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.hotType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hotType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.remark')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.start"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import waves from '@/directive/waves'
    import {
        exportHotNewsToExcel,
        importHotNewsByExcel,
        getHotNews
    } from '@/api/hotNews'
    import baseData from '@/config/baseData'

    export default {
        name: 'HotNews',
        components: {Pagination},
        directives: {waves},
        filters: {
            whetherFilter(type) {
                var whetherFilterKeyValue = baseData.whetherOptions.reduce((acc, cur) => {
                    acc[cur.key] = cur.value;
                    return acc;
                }, {});
                return whetherFilterKeyValue[type];
            }
        },
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    start: 1,
                    pageSize: 20,
                    title: null
                },
                formData: {
                    id: '',
                    subject: null,
                    title: null,
                    content: null,
                    url: null,
                    publishTime: null,
                    publishPlatform: null,
                    forwardNum: null,
                    commentNum: null,
                    likeNum: null,
                    sort: null,
                    type: null,
                    hotType: null,
                    remark: null,
                },
                dialogFormVisible: false,
                dialogStatus: '',
                formTitle: {
                    edit: this.$t('Edit'),
                    add: this.$t('Add')
                },
                whetherOptions: baseData.whetherOptions,
                rules: {
                    attrName: [{required: true, message: '必填', trigger: 'change'}],
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                getHotNews(this.listQuery).then(res => {
                    console.log(res);
                    this.list = res.data.data;
                    this.total = res.data.total;

                    // Just to simulate the time of the request
                    setTimeout(() => {
                        this.listLoading = false;
                    }, 1.5 * 1000)
                })
            },
            handleFilter() {
                this.listQuery.page = 1;
                this.getList()
            },
            resetTemp() {
                this.formData = {
                    id: '',
                    subject: null,
                    title: null,
                    content: null,
                    url: null,
                    publishTime: null,
                    publishPlatform: null,
                    forwardNum: null,
                    commentNum: null,
                    likeNum: null,
                    sort: null,
                    type: null,
                    hotType: null,
                    remark: null,
                }
            },
            handleExport() {
                exportHotNewsToExcel().then((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>
