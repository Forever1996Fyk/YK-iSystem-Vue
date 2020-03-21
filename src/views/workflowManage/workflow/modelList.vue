<template>
  <div class="app-container">
    <div class="filter-container">
      <router-view/>
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
        @click="handleCreate"
        :disabled="disabled"
      >
        {{ $t('table.add') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="success"
        icon="el-icon-refresh"
        @click="synchronizeData"
        :disabled="disabled"
      >
        {{ $t('table.synchronizeData') }}
      </el-button>

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="danger"
        icon="el-icon-delete"
        @click="handleBatchDelete"
        :disabled="disabled"
      >
        {{ $t('table.delete') }}
      </el-button>
    </div>
    <el-table v-loading="listLoading" ref="multipleTable" :data="list" border fit highlight-current-row
              style="width: 100%">

      <el-table-column type="selection" width="55"/>
      <el-table-column :label="$t('table.modelId')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.modelName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" :label="$t('table.modelKey')">
        <template slot-scope="{row}">
          <span>{{ row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('table.actions')" align="center" class-name="small-padding fixed-width"
                       width="280">
        <template slot-scope="{row}">
          <router-link :to="'/workflowManage/workflow/modelerDesign/'+row.id">
            <el-button type="success" icon="el-icon-s-tools" :disabled="disabled">
              {{ $t('table.designFlow') }}
            </el-button>
          </router-link>
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-promotion" :command="composeValue('deploy', row.id)">{{ $t('table.deploy') }}</el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete" :command="composeValue('del', row.id)">{{ $t('table.delete') }}</el-dropdown-item>
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

    <el-dialog :title="formTitle[dialogStatus]" :visible.sync="dialogFormVisible">
      <!-- rules表示表单验证规则 -->
      <el-form ref="dataForm" :rules="rules" :model="formData" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.modelName')" prop="modelName">
              <el-input v-model="formData.name"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('table.modelKey')" prop="modelKey">
              <el-input v-model="formData.key"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('table.description')" prop="description">
              <el-input
                v-model="formData.description"
                :autosize="{ minRows: 4, maxRows: 8}"
                type="textarea"
                placeholder="Please input"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" >
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='add'?addSave():editSave()" :disabled="disabled">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {getModels, delModel, createNewModel, delModelByIds, synchronizeData, deployByModelId} from '@/api/workflow'
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    import waves from '@/directive/waves'

    export default {
        name: 'ModelList',
        components: {Pagination},
        directives: {waves},
        filters: {},
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
                disabled: false
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
                getModels(this.listQuery).then(response => {
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
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'add'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleCommand(command) {
                console.log(command);
                switch (command.key) {
                    case 'del':
                        this.handleDelete(command.value);
                        break;
                    case 'deploy':
                        this.deployModel(command.value);
                        break;
                }
            },
            deployModel(id) {
                this.disabled = true;
                deployByModelId(id).then((res) => {
                    this.$message.success(res.message);
                }).finally(() => {
                    this.disabled = false;
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
                        delModelByIds(data).then((res) => {
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
            addSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData);
                        this.disabled = true;
                        createNewModel(this.formData).then((res) => {
                            this.$message.success(res.message);
                            this.getList();
                            this.dialogFormVisible = false
                        }).finally(() => {
                            this.disabled = false;
                        })
                    }
                })
            },
            synchronizeData() {
                this.disabled = true;
                synchronizeData().then((res) => {
                    this.$message.success(res.message);
                    this.getList();
                }).finally(() => {
                    this.disabled = false;
                })
            }
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
