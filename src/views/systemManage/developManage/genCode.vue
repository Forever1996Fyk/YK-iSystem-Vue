<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.tableName"
        :placeholder="$t('table.tableName')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleGenerate"
      >
        {{ $t('table.generate') }}
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
      <el-table-column type="selection" width="55" />
      <el-table-column v-if="false" prop="id">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="tableName" align="center">
        <template slot-scope="{row}">
          {{ row.tableName }}
        </template>
      </el-table-column>
      <el-table-column label="tableComment" align="center">
        <template slot-scope="{row}">
          {{ row.tableComment }}
        </template>
      </el-table-column>
      <el-table-column label="engine" align="center">
        <template slot-scope="{row}">
          {{ row.engine }}
        </template>
      </el-table-column>
      <el-table-column label="createTime" align="center">
        <template slot-scope="{row}">
          {{ row.createTime }}
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
import { getDBTables } from '@/api/generater'
import config from '@/config'

export default {
  name: 'GenCode',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        start: 1,
        pageSize: 20,
        tableName: null
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getDBTables(this.listQuery).then(res => {
        console.log(res)
        this.list = res.data.data
        this.total = res.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleGenerate() {
      var datas = this.$refs.multipleTable.selection;
      console.log(datas)
      var tableNames = []
      if (datas.length === 0) {
        this.$message.error('请选择至少一条数据')
        return
      }
      for (var i = 0; i < datas.length; i++) {
        tableNames.push(datas[i].tableName)
      }
      console.log(tableNames)
      var url = config.apiUrl.dev + '/generate/api/generate/generateCode/' + tableNames
      window.open(url, '_blank')
    }
  }
}
</script>
