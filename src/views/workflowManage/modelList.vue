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
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-plus"
        >
          {{ $t('table.add') }}
        </el-button>

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="danger"
        icon="el-icon-delete"
        @click="handleBatchDelete"
      >
        {{ $t('table.delete') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" ref="multipleTable" :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column type="selection" width="55"/>
      <el-table-column :label="$t('table.id')">
        <template slot-scope="{row}">
            <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.name')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" :label="$t('table.key')">
        <template slot-scope="scope">
          <span>{{ row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('table.actions')" align="center" class-name="small-padding fixed-width"
                       width="230">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-s-tools">
            {{ $t('table.designFlow') }}
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(row.id)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
  </div>
</template>

<script>
    import {getModels, delModel, createNewModel} from '@/api/workflow'
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    import baseData from '@/config/baseData'

    export default {
        name: 'ModelList',
        components: {Pagination},
        filters: {
        },
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    pageSize: 20
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                getModels(this.listQuery).then(response => {
                    this.list = response.data.data;
                    this.total = response.data.total;
                    this.listLoading = false
                })
            },
            handleFilter() {
                this.listQuery.page = 1
                this.getList()
            },
            handleBatchDelete() {
                var datas = this.$refs.multipleTable.selection;
                var ids = []
                if (datas.length === 0) {
                    this.$message.error('请选择至少一条数据')
                    return
                }
                for (var i = 0; i < datas.length; i++) {
                    ids.push(datas[i].id)
                }
                this.handleDelete(ids)
            },
            handleDelete(data) {
                this.$confirm('确定删除该数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (data instanceof Array) {
                        delArticleByIds(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    } else {
                        delModel(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    }
                }).catch(() => {
                    this.$message.info('已取消')
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
