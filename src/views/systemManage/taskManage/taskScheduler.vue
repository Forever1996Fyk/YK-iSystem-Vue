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

      <router-link :to="'/systemManage/taskLog/'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="success"
          icon="el-icon-notebook-2">
          {{ $t('table.log') }}
        </el-button>
      </router-link>

      <el-button
        class="filter-item"
        style="margin-left: 10px; display: none"
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
      <el-table-column :label="$t('table.jobName')" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.jobName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jobGroupName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.jobGroupName | jobGroupFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jobClassName')" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.jobClassName | descFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jobTrigger')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.jobTrigger | jobTriggerFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.cronExpression')" align="center" width="200">
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
      <el-table-column :label="$t('table.startTime')" align="center" width="200">
        <template slot-scope="{row}">
          {{ row.startTime }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.endTime')" align="center" width="200">
        <template slot-scope="{row}">
          {{ row.endTime }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusTagFilter">{{ row.status | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('table.actions')" align="center" class-name="small-padding fixed-width"
                       width="230">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button :type="row.status === 1?'info':'success'" size="mini"
                     :icon="row.status === 1?'el-icon-video-pause':'el-icon-video-play'" @click="handleTask(row)">
            {{ row.status === 1 ? $t('table.pause'): $t('table.resume') }}
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(row)">
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
          <el-col :span="24">
            <el-form-item :label="$t('table.jobName')" prop="jobName">
              <el-input v-model="formData.jobName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.jobGroupName')" prop="jobGroupName">
              <el-select v-model="formData.jobGroupName" class="filter-item" placeholder="Please select"
                         style="width:100%">
                <el-option key="default" label="默认" value="default"/>
                <el-option key="system" label="系统" value="system"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.jobTrigger')" prop="jobTrigger">
              <el-select v-model="formData.jobTrigger" class="filter-item" placeholder="Please select"
                         style="width:100%" @change="changeJobTrigger" :disabled="disabled">
                <el-option key="simple" label="简单任务" value="simple"/>
                <el-option key="cron" label="定时任务" value="cron"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.jobAddress')" prop="jobAddress">
              <el-select v-model="jobAddress" class="filter-item" placeholder="Please select"
                         style="width:100%">
                <el-option key="local" label="本地" value="local"/>
                <el-option key="http" label="远程" value="http"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="jobAddress === 'local'">
            <el-form-item :label="$t('table.jobClassName')" prop="jobClassName">
              <el-input v-model="formData.jobClassName"/>
              <el-alert
                title="任务类名标准"
                type="warning"
                show-icon>
                <template>
                  Bean调用示例：taskTest.taskNoParams();<br>
                  Class类调用示例：com.yksys.isystem.service.system.task.TaskTest.taskNoParams();<br>
                  参数说明：支持字符串，布尔类型，长整型，浮点型，整型"
                </template>
              </el-alert>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="jobAddress === 'http'">
          <el-col :span="12">
            <el-form-item :label="$t('table.serviceId')" prop="serviceId">
              <el-select v-model="httpData.serviceId" class="filter-item"
                         placeholder="Please select" style="width:100%">
                <el-option v-for="item in serviceIdOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.contentType')" prop="contentType">
              <el-select v-model="httpData.contentType" class="filter-item"
                         placeholder="Please select" style="width:100%">
                <el-option v-for="item in contentTypeOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="jobAddress === 'http'">
          <el-col :span="6">
            <el-form-item :label="$t('table.requestMethod')" prop="method">
              <el-select v-model="httpData.method" class="filter-item"
                         placeholder="Please select" style="width:100%">
                <el-option v-for="item in requestMethod" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item :label="$t('table.path')" prop="path">
              <el-input v-model="httpData.path"/>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item :label="$t('table.alarmMail')" prop="alarmMail">
              <el-input v-model="httpData.alarmMail"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('table.cronExpression')" prop="cronExpression" v-if="cronVisible">
              <el-popover v-model="cronPopover">
                <el-input slot="reference" @click="cronPopover=true" v-model="formData.cronExpression"/>
                <cron @change="changeCron" @close="cronPopover=false" i18n="cn"></cron>
              </el-popover>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('table.misfirePolicy')" prop="misfirePolicy" v-if="cronVisible">
              <el-radio-group v-model="formData.misfirePolicy" size="small">
                <el-radio label="0" border>默认</el-radio>
                <el-radio label="1" border>立即触发执行</el-radio>
                <el-radio label="2" border>触发一次执行</el-radio>
                <el-radio label="3" border>不触发立即执行</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.repeatInterval')" prop="repeatInterval" v-if="simpleVisible">
              <el-input v-model="formData.repeatInterval"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.repeatCount')" prop="repeatCount" v-if="simpleVisible">
              <el-input v-model="formData.repeatCount"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.concurrent')" prop="concurrent">
              <el-radio-group v-model="formData.concurrent" size="small">
                <el-radio label="0" border>禁止</el-radio>
                <el-radio label="1" border>允许</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.startTime')" prop="startTime" v-if="simpleVisible">
              <el-date-picker v-model="formData.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                              placeholder="Select date and time" style="width: 100%"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('table.endTime')" prop="endTime" v-if="simpleVisible">
              <el-date-picker v-model="formData.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                              placeholder="Select date and time" style="width: 100%"/>
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
        addLocalJob,
        editLocalJob,
        deleteJob,
        pauseJob,
        resumeJob,
        addHttpJob,
        editHttpJob
    } from '@/api/taskScheduler'
    import {
        getGatewayRoutesNoPage
    } from '@/api/gatewayRoute'
    import baseData from '@/config/baseData'
    import {formatDate} from '@/utils'
    import {cron} from 'vue-cron';

    export default {
        name: 'TaskScheduler',
        components: {Pagination, cron},
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
            descFilter(data) {
                return baseData.descFilter(data);
            },
            jobGroupFilter(type) {
                switch (type) {
                    case 'default':
                        return '默认';
                    case 'system':
                        return '系统';
                }
            },
            jobTriggerFilter(type) {
                switch (type) {
                    case 'simple':
                        return '简单任务';
                    case 'cron':
                        return '定时任务';
                }
            },
            statusFilter(type) {
                switch (type) {
                    case 1:
                        return '运行中';
                    case 2:
                        return '已暂停';
                    case 0:
                        return '已删除';
                }
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
                    endTime: '',
                    misfirePolicy: '',
                    concurrent: '',
                    dataMap: '',
                },
                httpData: {
                    serviceId: '',
                    method: '',
                    path: '',
                    contentType: '',
                    body: '',
                    alarmMail: ''
                },
                cronVisible: false,
                simpleVisible: true,
                dialogFormVisible: false,
                disabled: false,
                dialogStatus: '',
                cronPopover: false,
                formTitle: {
                    edit: this.$t('Edit'),
                    add: this.$t('Add')
                },
                jobAddress: '',
                whetherOptions: baseData.whetherOptions,
                requestMethod: baseData.requestMethod,
                contentTypeOptions: baseData.contentType,
                serviceIdOptions: [],
                rules: {
                    jobName: [{required: true, message: '任务名称必填', trigger: 'change'}],
                    jobClassName: [{required: true, message: '任务类名必填', trigger: 'change'}],
                    jobGroupName: [{required: true, message: '任务组名描述必填', trigger: 'change'}],
                    jobTrigger: [{required: true, message: '任务类型必填', trigger: 'change'}],
                    jobDescription: [{required: true, message: '任务描述必填', trigger: 'change'}],
                    cronExpression: [{required: true, message: 'cron表达式必填', trigger: 'change'}],
                    repeatInterval: [{required: true, message: '间隔时间必填', trigger: 'change'}],
                    repeatCount: [{required: true, message: '重复次数必填', trigger: 'change'}],
                    startTime: [{required: true, message: '开始时间必填', trigger: 'change'}],
                    endTime: [{required: true, message: '结束时间必填', trigger: 'change'}],
                    misfirePolicy: [{required: true, message: '执行策略必填', trigger: 'change'}],
                    concurrent: [{required: true, message: '并发执行必填', trigger: 'change'}],
                    // jobAddress: [{required: true, message: '任务位置必填', trigger: 'change'}],
                    // serviceId: [{required: true, message: '服务id必填', trigger: 'change'}],
                    // method: [{required: true, message: '请求方式必填', trigger: 'change'}],
                    // path: [{required: true, message: '请求路径必填', trigger: 'change'}],
                    // contentType: [{required: true, message: '响应类型必填', trigger: 'change'}],
                    // alarmMail: [{required: true, message: '警报邮箱必填', trigger: 'change'}],
                }
            }
        },
        created() {
            this.getList();
            this.getServiceIds();
        },
        methods: {
            changeJobTrigger() {
                if (this.formData.jobTrigger === 'simple') {
                    this.cronVisible = false;
                    this.simpleVisible = true;
                } else {
                    this.cronVisible = true;
                    this.simpleVisible = false;
                }
            },
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
                    startTime: null,
                    endTime: null
                }
            },
            changeCron(val) {
                this.formData.cronExpression = val;
            },
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'add'
                this.dialogFormVisible = true
                this.disabled = false;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleUpdate(data) {
                this.formData = Object.assign({}, data)// copy obj
                console.log(this.formData);
                this.dialogStatus = 'edit'
                this.dialogFormVisible = true
                this.disabled = true;
                this.changeJobTrigger();
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            addSave() {
                if (this.jobAddress === 'local') {
                    this.addLocalSave();
                } else if (this.jobAddress === 'http') {
                    this.addHttpSave();
                }
            },
            addLocalSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData)
                        if (this.formData.startTime) {
                            this.formData.startTime = formatDate(this.formData.startTime, "yyyy-MM-dd hh:mm:ss");
                        }
                        if (this.formData.endTime) {
                            this.formData.endTime = formatDate(this.formData.endTime, "yyyy-MM-dd hh:mm:ss");
                        }
                        addLocalJob(this.formData).then((res) => {
                            this.$message.success(res.message)
                            this.getList()
                            this.dialogFormVisible = false
                        })
                    }
                })
            },
            addHttpSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData)
                        if (this.formData.startTime) {
                            this.formData.startTime = formatDate(this.formData.startTime, "yyyy-MM-dd hh:mm:ss");
                        }
                        if (this.formData.endTime) {
                            this.formData.endTime = formatDate(this.formData.endTime, "yyyy-MM-dd hh:mm:ss");
                        }
                        this.formData.dataMap = this.httpData;
                        console.log(this.formData);
                        addHttpJob(this.formData).then((res) => {
                            this.$message.success(res.message)
                            this.getList()
                            this.dialogFormVisible = false
                        })
                    }
                })
            },
            editSave() {
                if (this.jobAddress === 'local') {
                    this.editLocalSave();
                } else if (this.jobAddress === 'http') {
                    this.editHttpSave();
                }
            },
            editLocalSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData)
                        if (this.formData.startTime) {
                            this.formData.startTime = formatDate(this.formData.startTime, "yyyy-MM-dd hh:mm:ss");
                        }
                        if (this.formData.endTime) {
                            this.formData.endTime = formatDate(this.formData.endTime, "yyyy-MM-dd hh:mm:ss");
                        }
                        editLocalJob(this.formData).then((res) => {
                            console.log(res)
                            this.$message.success(res.message)
                            this.getList()
                            this.dialogFormVisible = false
                        })
                    }
                })
            },
            editHttpSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData)
                        if (this.formData.startTime) {
                            this.formData.startTime = formatDate(this.formData.startTime, "yyyy-MM-dd hh:mm:ss");
                        }
                        if (this.formData.endTime) {
                            this.formData.endTime = formatDate(this.formData.endTime, "yyyy-MM-dd hh:mm:ss");
                        }
                        this.formData.dataMap = this.httpData;
                        editHttpJob(this.formData).then((res) => {
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
                    console.log(data);
                    if (data instanceof Array) {
                        deleteJob(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    } else {
                        deleteJob(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    }
                }).catch(() => {
                    this.$message.info('已取消')
                })
            },
            handleTask(data) {
                if (data.status === 1) {
                    this.$confirm('确定暂停该任务吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log(data);
                        pauseJob(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    }).catch(() => {
                        this.$message.info('已取消')
                    })
                } else if (data.status === 2) {
                    this.$confirm('确定重启该任务吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log(data);
                        resumeJob(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    }).catch(() => {
                        this.$message.info('已取消')
                    })
                }

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
            },
            getServiceIds() {
                this.serviceIdOptions = [];
                getGatewayRoutesNoPage().then((res) => {
                    var data = res.data;
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            var obj = {key: data[i].routeName, value: data[i].routeName};
                            this.serviceIdOptions.push(obj);
                        }
                    }
                })
            }
        }
    }
</script>
