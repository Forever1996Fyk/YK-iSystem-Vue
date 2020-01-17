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
      <el-table-column :label="$t('table.account')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.nickName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nickName }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column :label="$t('table.userIcon')" align="center">-->
<!--        <template slot-scope="{row}">-->
<!--          <span>{{ row.userIcon }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column :label="$t('table.age')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sex')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.marryFlag')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.marryFlag }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.education')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.education }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.phone')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.email')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.prov')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prov }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.city')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.dist')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dist }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.address')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.idcard')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.idcard }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.remark')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
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
        <el-col :span="12">
          <el-form-item :label="$t('table.userName')" prop="userName">
            <el-input v-model="formData.userName"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.nickName')" prop="nickName">
            <el-input v-model="formData.nickName"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.userIcon')" prop="userIcon">
            <el-input v-model="formData.userIcon"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.age')" prop="age">
            <el-input v-model="formData.age"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.sex')" prop="sex">
            <el-input v-model="formData.sex"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.marryFlag')" prop="marryFlag">
            <el-input v-model="formData.marryFlag"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.education')" prop="education">
            <el-input v-model="formData.education"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.phone')" prop="phone">
            <el-input v-model="formData.phone"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.email')" prop="email">
            <el-input v-model="formData.email"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.prov')" prop="prov">
            <el-input v-model="formData.prov"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.city')" prop="city">
            <el-input v-model="formData.city"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.dist')" prop="dist">
            <el-input v-model="formData.dist"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.address')" prop="address">
            <el-input v-model="formData.address"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.idcard')" prop="idcard">
            <el-input v-model="formData.idcard"/>
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
        addSystemUser,
        editSystemUser,
        delSystemUser,
        delSystemUserByIds,
        getSystemUsers
    } from '@/api/systemUser'
    import baseData from '@/config/baseData'

    export default {
        name: 'SystemUser',
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
                    account: null,
                    userName: null,
                    password: null,
                    salt: null,
                    nickName: null,
                    userIcon: null,
                    lastLoginTime: null,
                    age: null,
                    sex: null,
                    marryFlag: null,
                    education: null,
                    phone: null,
                    email: null,
                    prov: null,
                    city: null,
                    dist: null,
                    address: null,
                    idcard: null,
                    remark: null
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
                getSystemUsers(this.listQuery).then(res => {
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
                    account: null,
                    userName: null,
                    password: null,
                    salt: null,
                    nickName: null,
                    userIcon: null,
                    lastLoginTime: null,
                    age: null,
                    sex: null,
                    marryFlag: null,
                    education: null,
                    phone: null,
                    email: null,
                    prov: null,
                    city: null,
                    dist: null,
                    address: null,
                    idcard: null,
                    remark: null
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
                        addSystemUser(this.formData).then((res) => {
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
                        editSystemUser(this.formData).then((res) => {
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
                        delSystemUserByIds(data).then((res) => {
                            this.getList();
                            this.$message.success(res.message);
                        })
                    } else {
                        delSystemUser(data).then((res) => {
                            this.getList();
                            this.$message.success(res.message);
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
