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
    </div>
    <el-table v-loading="listLoading" ref="multipleTable" :data="list" border fit highlight-current-row
              style="width: 100%">

      <el-table-column type="selection" width="55"/>
      <el-table-column :label="$t('table.processInstanceId')">
        <template slot-scope="{row}">
          <span>{{ row.processInstanceId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.startTime')">
        <template slot-scope="{row}">
          <span>{{ row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" :label="$t('table.endTime')">
        <template slot-scope="{row}">
          <span>{{ row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" :label="$t('table.startUserId')">
        <template slot-scope="{row}">
          <span>{{ row.startUserId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.duration')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.duration }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('table.status')" width="110">
        <template>
          <el-tag type="danger">
            作废
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" :label="$t('table.actions')" align="center" class-name="small-padding fixed-width"
                       width="180">
        <template slot-scope="{row}">
          <el-button @click="dialogFormVisible = false">
            {{ $t('table.processInfo') }}
          </el-button>
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

    <router-view/>
  </div>
</template>

<script>
    import {getHistoryProcess} from '@/api/workflow'
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    import waves from '@/directive/waves'

    export default {
        name: 'ProcessList',
        components: {Pagination},
        directives: {waves},
        filters: {
        },
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    start: 1,
                    pageSize: 20
                },
                dialogFormVisible: false,
                dialogStatus: '',
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                getHistoryProcess(this.listQuery).then(response => {
                    this.list = response.data.list;
                    this.total = response.data.total;
                    this.listLoading = false
                })
            },
        }
    }
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
