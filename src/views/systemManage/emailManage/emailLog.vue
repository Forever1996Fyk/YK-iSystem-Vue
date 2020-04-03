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
      <el-table-column :label="$t('table.subject')" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleView(row.subject, $t('table.subject'))">{{ row.subject | descFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.recipients')" align="center" width="200">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleView(row.recipients, $t('table.recipients'))">{{ row.recipients | descFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.cc')" align="center" width="200">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleView(row.cc, $t('table.cc'))">{{ row.cc | descFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.content')" align="center" width="200">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleView(row.content, $t('table.content'))">点击查看内容</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.attachment')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.attachment }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sendNum')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sendNum }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.error')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.error }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.result')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.result ===1 ? '成功' : '失败'}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.config')" align="center" width="200">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleJsonView(row.config, $t('table.config'))">点击查看配置内容</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.tplName')" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.tplName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.remark')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
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

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
      <!-- rules表示表单验证规则 -->
      <el-form label-width="100px">
        <el-row>
          <div v-html="content"></div>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="formTitle" :visible.sync="dialogJsonFormVisible">
      <div class="editor-container">
        <json-editor ref="jsonEditor" v-model="jsonContent" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogJsonFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import waves from '@/directive/waves'
    import {
        addEmailLog,
        editEmailLog,
        delEmailLog,
        delEmailLogByIds,
        getEmailLogs
    } from '@/api/emailLog'
    import baseData from '@/config/baseData'
    import JsonEditor from '@/components/JsonEditor'

    export default {
        name: 'EmailLog',
        components: {Pagination, JsonEditor},
        directives: {waves},
        filters: {
            descFilter(data) {
                return baseData.descFilter(data);
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
                content: null,
                jsonContent: null,
                formData: {
                    id: '',
                    subject: null,
                    recipients: null,
                    cc: null,
                    content: null,
                    attachment: null,
                    sendNum: null,
                    error: null,
                    result: null,
                    configId: null,
                    tplId: null,
                    remark: null,
                },
                dialogFormVisible: false,
                dialogJsonFormVisible: false,
                dialogStatus: '',
                formTitle: null,
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
                getEmailLogs(this.listQuery).then(res => {
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
                    subject: null,
                    recipients: null,
                    cc: null,
                    content: null,
                    attachment: null,
                    sendNum: null,
                    error: null,
                    result: null,
                    configId: null,
                    tplId: null,
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
                        addEmailLog(this.formData).then((res) => {
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
                        editEmailLog(this.formData).then((res) => {
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
                        delEmailLogByIds(data).then((res) => {
                            this.getList();
                            this.$message.success('res.message');
                        })
                    } else {
                        delEmailLog(data).then((res) => {
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
            },
            handleView(data, title) {
                this.dialogFormVisible = true;
                this.content = data;
                this.formTitle = title;
            },
            handleJsonView(data, title) {
                this.dialogJsonFormVisible = true;
                this.jsonContent = JSON.parse(data);
                this.formTitle = title;
            }
        }
    }
</script>

<style scoped>
  .editor-container{
    position: relative;
    height: 100%;
  }
</style>
