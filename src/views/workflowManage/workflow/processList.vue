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
        type="danger"
        icon="el-icon-delete"
        @click="handleBatchDelete"
      >
        {{ $t('table.delete') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" ref="multipleTable" :data="list" border fit highlight-current-row
              style="width: 100%">

      <el-table-column type="selection" width="55"/>
      <el-table-column :label="$t('table.processId')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.name')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.deploymentName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" :label="$t('table.processKey')">
        <template slot-scope="{row}">
          <span>{{ row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" :label="$t('table.version')">
        <template slot-scope="{row}">
          <span>{{ row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.deploymentTime')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.deploymentTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" :label="$t('table.category')">
        <template slot-scope="{row}">
          <span>{{ row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" :label="$t('table.resourceName')">
        <template slot-scope="{row}">
          <span>{{ row.resourceName }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('table.status')" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusTagFilter">
            {{ row.status | statusFilter}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" :label="$t('table.actions')" align="center" class-name="small-padding fixed-width"
                       width="280">
        <template slot-scope="{row}">
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-promotion" :command="composeValue('startProcess', row.deploymentId)">{{ $t('table.startProcess') }}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete" :command="composeValue('del', row.deploymentId)">{{ $t('table.delete') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    import {getActProcessDeploys, startProcess, delProcessDeploy, delProcessDeploys} from '@/api/workflow'
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    import waves from '@/directive/waves'
    import baseData from '@/config/baseData'

    export default {
        name: 'ProcessList',
        components: {Pagination},
        directives: {waves},
        filters: {
            statusTagFilter(status) {
                const statusMap = {
                    1: 'success',
                    2: 'info',
                    0: 'danger'
                };
                return statusMap[status];
            },
            statusFilter(status) {
                return baseData.filterKeyValue(baseData.processStatus)[status];
            },
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
                formData: {
                    id: null,
                    name: null,
                    description: null,
                    revision: 1,
                    key: null
                },
                dialogFormVisible: false,
                dialogStatus: '',
                formTitle: {
                    edit: this.$t('Edit'),
                    add: this.$t('Add'),
                },
                rules: {
                    name: [{required: true, message: '模型名称必填', trigger: 'change'}],
                    key: [{required: true, message: '模型key必填', trigger: 'change'}],
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            composeValue(key, vaule) {
                return {
                    'key': key,
                    'value': vaule
                }
            },
            getList() {
                this.listLoading = true;
                getActProcessDeploys(this.listQuery).then(response => {
                    console.log(response.data);
                    this.list = response.data.list;
                    this.total = response.data.total;
                    this.listLoading = false
                })
            },
            resetTemp() {
                this.formData = {
                    id: null,
                    name: null,
                    description: null,
                    revision: 1,
                    key: null
                }
            },
            handleCommand(command) {
                console.log(command);
                switch (command.key) {
                    case 'del':
                        this.handleDelete(command.value);
                        break;
                    case 'startProcess':
                        this.startProcess(command.value);
                        break;
                }
            },
            startProcess(id) {
                startProcess(id).then((res) => {
                    this.getList();
                    this.$message.success(res.message);
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
                        delProcessDeploys(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    } else {
                        delProcessDeploy(data).then((res) => {
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
