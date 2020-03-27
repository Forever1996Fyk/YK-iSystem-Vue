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
<!--      <el-button-->
<!--        class="filter-item"-->
<!--        style="margin-left: 10px;"-->
<!--        type="primary"-->
<!--        icon="el-icon-plus"-->
<!--        @click="handleCreate"-->
<!--      >-->
<!--        {{ $t('table.add') }}-->
<!--      </el-button>-->

<!--      <el-button-->
<!--        class="filter-item"-->
<!--        style="margin-left: 10px;"-->
<!--        type="danger"-->
<!--        icon="el-icon-delete"-->
<!--        @click="handleBatchDelete"-->
<!--      >-->
<!--        {{ $t('table.delete') }}-->
<!--      </el-button>-->
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
      <el-table-column :label="$t('table.jobClassName')" align="center">
        <template slot-scope="{row}">
          <el-popover placement="top-start"
                      :title="$t('table.projectName')"
                      width="200"
                      trigger="hover"
                      :content="row.jobClassName">
            <el-link slot="reference" type="primary">{{ row.jobClassName | descFilter}}</el-link>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jobGroupName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.jobGroupName | jobGroupFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.jobMessage')" align="center" width="300">
        <template slot-scope="{row}">
          <span>{{ row.jobMessage }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.startTime')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.endTime')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.exceptionInfo')" align="center">
        <template slot-scope="{row}">
          <el-popover placement="top-start"
                      :title="$t('table.exceptionInfo')"
                      width="200"
                      trigger="hover"
                      :content="row.exceptionInfo">
            <el-link slot="reference" type="primary">{{ row.exceptionInfo | descFilter}}</el-link>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.remark')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="230">-->
<!--        <template slot-scope="{row}">-->
<!--          <el-button type="primary" size="mini" @click="handleUpdate(row)">-->
<!--            {{ $t('table.edit') }}-->
<!--          </el-button>-->
<!--          <el-button size="mini" type="danger" @click="handleDelete(row.id)">-->
<!--            {{ $t('table.delete') }}-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
        <el-col :span="12">
          <el-form-item :label="$t('table.jobName')" prop="jobName">
            <el-input v-model="formData.jobName"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.jobClassName')" prop="jobClassName">
            <el-input v-model="formData.jobClassName"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.jobGroupName')" prop="jobGroupName">
            <el-input v-model="formData.jobGroupName"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.jobMessage')" prop="jobMessage">
            <el-input v-model="formData.jobMessage"/>
          </el-form-item>
        </el-col>

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

        <el-col :span="12">
          <el-form-item :label="$t('table.exceptionInfo')" prop="exceptionInfo">
            <el-input v-model="formData.exceptionInfo"/>
          </el-form-item>
        </el-col>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('table.remark')" prop="remark">
              <el-input
                v-model="formData.remark"
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
        addTaskLog,
        editTaskLog,
        delTaskLog,
        delTaskLogByIds,
        getTaskLogs
    } from '@/api/taskLog'
    import baseData from '@/config/baseData'

    export default {
        name: 'TaskLog',
        components: {Pagination},
        directives: {waves},
        filters: {
            whetherFilter(type) {
                var whetherFilterKeyValue = baseData.whetherOptions.reduce((acc, cur) => {
                    acc[cur.key] = cur.value;
                    return acc;
                }, {});
                return whetherFilterKeyValue[type];
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
                    jobName: null,
                    jobClassName: null,
                    jobGroupName: null,
                    jobMessage: null,
                    startTime: null,
                    endTime: null,
                    exceptionInfo: null,
                    remark: null,
                },
                dialogFormVisible: false,
                dialogStatus: '',
                formTitle: {
                    edit: this.$t('Edit'),
                    add: this.$t('Add')
                },
                whetherOptions: baseData.whetherOptions,
                rules: {
                    attrName: [{required: true, message: '必填', trigger: 'change'}],
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                getTaskLogs(this.listQuery).then(res => {
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
                    jobName: null,
                    jobClassName: null,
                    jobGroupName: null,
                    jobMessage: null,
                    startTime: null,
                    endTime: null,
                    exceptionInfo: null,
                    remark: null,
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
                        addTaskLog(this.formData).then((res) => {
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
                        editTaskLog(this.formData).then((res) => {
                            console.log(res);
                            this.$message.success(res.message);
                            this.getList();
                            this.dialogFormVisible = false;
                        })
                    }
                })
            }
            ,
            handleDelete(data) {
                this.$confirm('确定删除该数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (data instanceof Array) {
                        delTaskLogByIds(data).then((res) => {
                            this.getList();
                            this.$message.success('res.message');
                        })
                    } else {
                        delTaskLog(data).then((res) => {
                            this.getList();
                            this.$message.success('res.message');
                        });
                    }
                }).catch(() => {
                    this.$message.info("已取消");
                })
            }
            ,
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
