<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.routeName"
        :placeholder="$t('table.routeName')"
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
      <el-table-column :label="$t('table.jobName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.jobName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jobGroupName')">
        <template slot-scope="{row}">
          <span>{{ row.jobGroupName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jobTrigger')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.jobTrigger }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.cronExpression')" align="center">
        <template slot-scope="{row}">
          {{ row.cronExpression }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.repeatInterval')" align="center">
        <template slot-scope="{row}">
          {{ row.repeatInterval }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.repeatCount')" align="center">
        <template slot-scope="{row}">
          {{ row.repeatCount }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.startTime')" align="center">
        <template slot-scope="{row}">
          {{ row.startTime }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.endTime')" align="center">
        <template slot-scope="{row}">
          {{ row.endTime }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jobStatus')" align="center">
        <template slot-scope="{row}">
          {{ row.jobStatus }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(row.id)">
            {{ $t('table.delete') }}
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

    <el-dialog :title="formTitle[dialogStatus]" :visible.sync="dialogFormVisible">
      <!-- rules表示表单验证规则 -->
      <el-form ref="dataForm" :rules="rules" :model="formData" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.jobName')" prop="jobName">
              <el-input v-model="formData.jobName"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.jobGroupName')" prop="jobGroupName">
              <el-input v-model="formData.jobGroupName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.jobClassName')" prop="jobClassName">
              <el-input v-model="formData.jobClassName"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.jobTrigger')" prop="jobTrigger">
              <el-select v-model="formData.jobTrigger" class="filter-item" placeholder="Please select"
                         style="width:100%">
                <el-option key="simple" label="简单任务" value="simple"/>
                <el-option key="cron" label="定时任务" value="cron"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.cronExpression')" prop="cronExpression">
              <el-select
                v-model="formData.cronExpression"
                class="filter-item"
                placeholder="Please select"
                style="width:100%"
              >
                <el-option v-for="item in whetherOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.repeatInterval')" prop="repeatInterval">
              <el-input v-model="formData.repeatInterval"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.repeatCount')" prop="repeatCount">
              <el-input v-model="formData.repeatCount"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.startTime')" prop="startTime">
              <el-input v-model="formData.startTime"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.endTime')" prop="endTime">
              <el-input v-model="formData.endTime"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('table.jobDescription')" prop="jobDescription">
              <el-input
                v-model="formData.jobDescription"
                :autosize="{ minRows: 4, maxRows: 8}"
                type="textarea"
                placeholder="Please input"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='add'?addSave():editSave()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import waves from '@/directive/waves'
    import {
        getJobs,
        addJob,
        editJob,
        deleteJob,
        pauseJob,
        resumeJob
    } from '@/api/taskScheduler'
    import baseData from '@/config/baseData'

    export default {
        name: 'TaskScheduler',
        components: {Pagination},
        directives: {waves},
        filters: {
            whetherFilter(type) {
                var whetherFilterKeyValue = baseData.whetherOptions.reduce((acc, cur) => {
                    acc[cur.key] = cur.value
                    return acc
                }, {})
                return whetherFilterKeyValue[type]
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
                    jobName: null
                },
                formData: {
                    id: '',
                    jobName: '',
                    jobDescription: '',
                    jobClassName: '',
                    jobGroupName: '',
                    jobTrigger: '',
                    cronExpression: '',
                    repeatInterval: '',
                    repeatCount: '',
                    startTime: '',
                    endTime: ''
                },
                dialogFormVisible: false,
                dialogStatus: '',
                formTitle: {
                    edit: this.$t('Edit'),
                    add: this.$t('Add')
                },
                whetherOptions: baseData.whetherOptions,
                rules: {
                    jobName: [{required: true, message: '任务名称必填', trigger: 'change'}],
                    jobClassName: [{required: true, message: '任务类名必填', trigger: 'change'}],
                    jobGroupName: [{required: true, message: '任务组名描述必填', trigger: 'change'}],
                    jobTrigger: [{required: true, message: '任务类型必填', trigger: 'change'}],
                    jobDescription: [{required: true, message: '任务描述必填', trigger: 'change'}]
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                getJobs(this.listQuery).then(res => {
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
            resetTemp() {
                this.formData = {
                    id: '',
                    jobName: '',
                    jobDescription: '',
                    jobClassName: '',
                    jobGroupName: '',
                    jobTrigger: '',
                    cronExpression: '',
                    repeatInterval: '',
                    repeatCount: '',
                    startTime: '',
                    endTime: ''
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
            handleUpdate(data) {
                this.formData = Object.assign({}, data)// copy obj
                this.dialogStatus = 'edit'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            addSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData)
                        addJob(this.formData).then((res) => {
                            this.$message.success(res.message)
                            this.getList()
                            this.dialogFormVisible = false
                        })
                    }
                })
            },
            editSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData)
                        editJob(this.formData).then((res) => {
                            console.log(res)
                            this.$message.success(res.message)
                            this.getList()
                            this.dialogFormVisible = false
                        })
                    }
                })
            },
            handleDelete(data) {
                this.$confirm('确定删除该数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (data instanceof Array) {
                        deleteJob(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    } else {
                        delGatewayRoute(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    }
                }).catch(() => {
                    this.$message.info('已取消')
                })
            },
            handleBatchDelete() {
                var datas = this.$refs.multipleTable.selection
                var ids = []
                if (datas.length === 0) {
                    this.$message.error('请选择至少一条数据')
                    return
                }
                for (var i = 0; i < datas.length; i++) {
                    ids.push(datas[i].id)
                }
                this.handleDelete(ids)
            }
        }
    }
</script>
