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
      <el-table-column :label="$t('table.processDefinitionId')">
        <template slot-scope="{row}">
          <span>{{ row.processDefinitionId }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" :label="$t('table.processDefinitionKey')">
        <template slot-scope="{row}">
          <span>{{ row.processDefinitionKey }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" :label="$t('table.processDefinitionVersion')">
        <template slot-scope="{row}">
          <span>{{ row.processDefinitionVersion }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.deploymentName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.deploymentName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.deploymentTime')" align="center" width="170">
        <template slot-scope="{row}">
          <span>{{ row.deploymentTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" :label="$t('table.diagramResourceName')">
        <template slot-scope="{row}">
          <span>{{ row.diagramResourceName }}</span>
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
                       width="180">
        <template slot-scope="{row}">
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary" :disabled="is_disabled">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :icon="getIconByStatus(row.status)"
                                :command="getCommandByStatus(row)">
                {{ $t(getTableNameByStatus(row.status)) }}
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete" :command="composeValue('del', row.processInstanceId)">{{ $t('table.delete') }}</el-dropdown-item>
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
    import {getActProcessDeploys, deleteProcessInstance, pendProcess, activateProcess} from '@/api/workflow'
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
                    0: 'danger',
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
                },
                is_disabled: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getIconByStatus(data) {
                var icon = 'el-icon-s-promotion';
                if (data === 1) {
                    icon = 'el-icon-remove-outline';
                    return icon;
                } else if (data === 2) {
                    return icon;
                } else {
                    return icon;
                }
            },
            getCommandByStatus(row) {
                if (row.status === 1) {
                    return this.composeValue('pending', row.processInstanceId);
                } else if (row.status === 2) {
                    return this.composeValue('active', row.processInstanceId);
                } else {
                    return this.composeValue('end', row.processInstanceId);
                }
            },
            getTableNameByStatus(data) {
                if (data === 1) {
                    return 'table.pendProcess';
                } else {
                    return 'table.activeProcess';
                }
            },
            composeValue(key, vaule) {
                return {
                    'key': key,
                    'value': vaule
                }
            },
            getList() {
                this.listLoading = true;
                getActProcessDeploys(this.listQuery).then(response => {
                    console.log(response.data.list);
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
                    case 'active':
                        this.activateProcess(command.value);
                        break;
                    case 'pending':
                        this.pendProcess(command.value);
                        break;
                    case 'end':
                        this.$message.error('该流程已结束!');
                        break;

                }
            },
            activateProcess(id) {
                this.is_disabled = true;
                activateProcess(id).then((res) => {
                    this.getList();
                    this.$message.success(res.message);
                    this.is_disabled = false;
                })
            },
            pendProcess(id) {
                this.is_disabled = true;
                pendProcess(id).then((res) => {
                    this.getList();
                    this.$message.success(res.message);
                    this.is_disabled = false;
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
                        deleteProcessInstances(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    } else {
                        deleteProcessInstance(data).then((res) => {
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
