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
      <el-table-column :label="$t('table.taskId')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.applyUserName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.createTime')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.taskName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.taskName}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column :label="$t('table.endTime')" align="center">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.endTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column :label="$t('table.reason')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reason }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column :label="$t('table.assignee')" align="center">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.assignee }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column :label="$t('table.processInstanceId')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.processInstanceId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="230">
        <template slot-scope="{row}">
          <router-link :to="'/workflowManage/taskManage/handleTask/' + row.id">
            <el-button type="primary" size="mini">
              {{ $t('table.handle') }}
            </el-button>
          </router-link>
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
        getUpcomingTasks,completeTask,getHighLightProcImage,getApproveInfo
    } from '@/api/taskManage'
    import baseData from '@/config/baseData'

    export default {
        name: 'UpcomingTask',
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
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                getUpcomingTasks(this.listQuery).then(res => {
                    console.log(res);
                    this.list = res.data.list;
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
                        addUserLeave(this.formData).then((res) => {
                            this.$message.success(res.message);
                            this.getList();
                            this.dialogFormVisible = false;
                        })
                    }
                })
            },
            editSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData);
                        editUserLeave(this.formData).then((res) => {
                            console.log(res);
                            this.$message.success(res.message);
                            this.getList();
                            this.dialogFormVisible = false;
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
