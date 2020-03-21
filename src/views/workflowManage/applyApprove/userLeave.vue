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
      >
<!--        {{ $t('table.add') }}-->
        新建请假单
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
      <el-table-column :label="$t('table.userName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.startTime')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.startTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.endTime')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.endTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.reason')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.leaveDays')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.leaveDays }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.taskName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.taskName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="230">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row.id)">
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
            <el-form-item :label="$t('table.startTime')" prop="startTime">
              <el-date-picker v-model="formData.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                              placeholder="Select date and time" style="width: 100%" @blur="getLeaveDays"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('table.endTime')" prop="endTime">
              <el-date-picker v-model="formData.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                              placeholder="Select date and time" style="width: 100%" @blur="getLeaveDays"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.leaveDays')" prop="leaveDays">
              <el-input v-model="formData.leaveDays" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.leaveType')" prop="leaveType">
              <el-select v-model="formData.leaveType" class="filter-item" placeholder="Please select" style="width:100%">
                <el-option v-for="item in leaveTypeOption" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('table.reason')" prop="reason">
              <el-input
                v-model="formData.reason"
                :autosize="{ minRows: 4, maxRows: 8}"
                type="textarea"
                placeholder="Please input"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" :disabled="disabled">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='add'?addSave():updateTask(true)" :disabled="disabled">
          {{ dialogStatus==='add'?$t('table.submitApply'): $t('table.reSubmitApply')}}
        </el-button>
        <el-button v-if="dialogStatus==='edit'" type="danger" @click="updateTask(false)" :disabled="disabled">
          {{ $t('table.cancelApply')}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import waves from '@/directive/waves'
    import {
        addUserLeave,
        editUserLeave,
        delUserLeave,
        delUserLeaveByIds,
        getUserLeaves
    } from '@/api/userLeave'
    import {
        updateTask
    } from '@/api/taskManage'
    import baseData from '@/config/baseData'
    import {formatDate} from '@/utils'
    import moment from 'moment'

    export default {
        name: 'UserLeave',
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
                    startTime: null,
                    endTime: null,
                    reason: null,
                    leaveDays: null,
                    urlPath: null,
                    leaveType: null
                },
                leaveTypeOption: baseData.leaveTypeOption,
                dialogFormVisible: false,
                dialogStatus: '',
                formTitle: {
                    edit: this.$t('Edit'),
                    add: this.$t('Add')
                },
                whetherOptions: baseData.whetherOptions,
                rules: {
                    startTime: [{required: true, message: '开始时间必填', trigger: 'change'}],
                    endTime: [{required: true, message: '结束时间必填', trigger: 'change'}],
                    reason: [{required: true, message: '请假原因必填', trigger: 'change'}],
                    urlPath: [{required: true, message: '请假路径必填', trigger: 'change'}],
                    leaveType: [{required: true, message: '请假类型必填', trigger: 'change'}],
                },
                disabled: false,
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getLeaveDays() {
                console.log(this.formData.endTime);
                if (this.formData.endTime && this.formData.startTime) {
                    var startTime = new moment(this.formData.startTime);
                    var endTime = new moment(this.formData.endTime);
                    var duration = moment.duration(endTime.diff(startTime));
                    var days = 0;
                    if (duration.milliseconds() < 0 && duration.seconds() < 0
                    && duration.hours() < 0 && duration.days() < 0 && duration.years() < 0) {
                        this.$message.error("开始时间不能小于结束时间");
                    }

                    if (duration.days() > 0) {
                        days = duration.days();
                    }
                    if (duration.hours() >= 8) {
                        days += 1;
                    }
                    this.formData.leaveDays = days;
                }
                // this.formData.leaveDays = DateDiff(this.formData.endTime, this.formData.startTime);
            },
            getList() {
                this.listLoading = true;
                getUserLeaves(this.listQuery).then(res => {
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
                    userId: null,
                    startTime: null,
                    endTime: null,
                    reason: null,
                    leaveDays: null,
                    processInstanceId: null,
                    urlPath: null,
                }
            },
            handleCreate() {
                this.resetTemp();
                this.dialogStatus = 'add';
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate();
                })
            },
            handleUpdate(data) {
                this.formData = Object.assign({}, data);// copy obj
                this.dialogStatus = 'edit';
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate();
                })
            },
            addSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData);
                        this.formData.startTime = formatDate(this.formData.startTime, "yyyy-MM-dd hh:mm:ss");
                        this.formData.endTime= formatDate(this.formData.endTime, "yyyy-MM-dd hh:mm:ss");
                        this.disabled = true;
                        addUserLeave(this.formData).then((res) => {
                            this.$message.success(res.message);
                            this.getList();
                            this.dialogFormVisible = false;
                        }).finally(() => {
                            this.disabled = false;
                        })
                    }
                })
            },
            updateTask(pass) {
                this.disabled = true;
                updateTask(this.formData.taskId, 'leave', pass).then((res) => {
                    if (pass) {
                        this.$message.success(res.message);
                    } else {
                        this.$message.warning(res.message);
                    }
                }).finally(() => {
                    this.disabled = false;
                })
            },
            handleDelete(data) {
                this.$confirm('确定删除该数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (data instanceof Array) {
                        delUserLeaveByIds(data).then((res) => {
                            this.getList();
                            this.$message.success('res.message');
                        })
                    } else {
                        delUserLeave(data).then((res) => {
                            this.getList();
                            this.$message.success('res.message');
                        });
                    }
                }).catch(() => {
                    this.$message.info("已取消");
                })
            },
            handleBatchDelete() {
                var datas = this.$refs.multipleTable.selection;
                var ids = [];
                if (datas.length === 0) {
                    this.$message.error('请选择至少一条数据');
                    return
                }
                for (var i = 0; i < datas.length; i++) {
                    ids.push(datas[i].id);
                }
                this.handleDelete(ids);
            }
        }
    }
</script>
