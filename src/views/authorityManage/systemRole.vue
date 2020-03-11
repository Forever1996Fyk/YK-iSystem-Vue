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
      <el-table-column :label="$t('table.roleName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.roleCode')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roleCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.remark')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="230">
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
            <el-form-item :label="$t('table.roleName')" prop="roleName">
              <el-input v-model="formData.roleName"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.roleCode')" prop="roleCode">
              <el-input v-model="formData.roleCode"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('table.authMenu')" prop="authorityId">
            <el-tree :data="menuList" :props="menuProp" show-checkbox node-key="authorityId" ref="selectAuthorityTree"></el-tree>
            </el-form-item>
          </el-col>
        </el-row>

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

    <el-dialog :title="formTitle[dialogStatus]" :visible.sync="dialogAuthTableVisible">
      <div class="filter-container">
        <el-input
          v-model="auth.listQuery.authority"
          :placeholder="$t('table.authority')"
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
        v-loading="auth.listLoading"
        :data="auth.list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @select="columnSelected"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column :label="$t('table.authority')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.authority }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="auth.total>0"
        :total="auth.total"
        :page.sync="auth.listQuery.start"
        :limit.sync="auth.listQuery.pageSize"
        @pagination="getAuthList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAuthTableVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="authSave">
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
        addSystemRole,
        editSystemRole,
        delSystemRole,
        delSystemRoleByIds,
        getSystemRoles,
        assignRoleAuth
    } from '@/api/systemRole'
    import baseData from '@/config/baseData'
    import {
        getSystemAuthorities
    } from '@/api/systemAuthority'
    import {
        getSystemMenusNodeList
    } from '@/api/systemMenu'
    import {getArrayInObjectArray} from '@/utils'

    export default {
        name: 'SystemRole',
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
                auth: {
                    list: null,
                    total: 0,
                    listLoading: true,
                    listQuery: {
                        start: 1,
                        pageSize: 20,
                        authority: null,
                        roleId: null
                    }
                },
                total: 0,
                listLoading: true,
                listQuery: {
                    start: 1,
                    pageSize: 20,
                    title: null
                },
                formData: {
                    id: '',
                    roleName: null,
                    remark: null,
                    roleCode: null,
                    authorityIds: null
                },
                dialogFormVisible: false,
                dialogAuthTableVisible: false,
                dialogStatus: '',
                formTitle: {
                    edit: this.$t('Edit'),
                    add: this.$t('Add'),
                    assignAuth: this.$t('assignAuth')
                },
                whetherOptions: baseData.whetherOptions,
                rules: {
                    roleName: [{required: true, message: '必填', trigger: 'change'}],
                    roleCode: [{required: true, message: '必填', trigger: 'change'}]
                },
                menuList: null,
                menuProp: {
                    value: 'authorityId',
                    label: 'menuName',
                    children: 'children'
                }
            }
        },
        created() {
            this.getList();
            this.getAuthorityIds();
        },
        methods: {
            getList() {
                this.listLoading = true;
                getSystemRoles(this.listQuery).then(res => {
                    console.log(res);
                    this.list = res.data.data;
                    this.total = res.data.total;

                    // Just to simulate the time of the request
                    setTimeout(() => {
                        this.listLoading = false;
                    }, 1.5 * 1000)
                })
            },
            getAuthList() {
                this.auth.listLoading = true;
                getSystemAuthorities(this.auth.listQuery).then(res => {
                    console.log(res);
                    this.auth.list = res.data.data;
                    this.auth.total = res.data.total;

                    // Just to simulate the time of the request
                    setTimeout(() => {
                        this.auth.listLoading = false;
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
                    roleName: null,
                    remark: null,
                    roleCode: null
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
                    //这些方法都需要放在nextTick里, 因为dom元素还没有加载完, 也就是selectAuthorityTree还没有加载出来
                    this.$refs.selectAuthorityTree.setCheckedKeys(this.formData.authorityIds);
                    this.$refs['dataForm'].clearValidate();
                })
            },
            addSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.formData.authorityIds = this.$refs.selectAuthorityTree.getCheckedKeys();
                        console.log(this.formData);
                        addSystemRole(this.formData).then((res) => {
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
                        this.formData.authorityIds = this.$refs.selectAuthorityTree.getCheckedKeys();
                        console.log(this.formData.authorityIds);
                        console.log(this.formData);
                        editSystemRole(this.formData).then((res) => {
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
                        delSystemRoleByIds(data).then((res) => {
                            this.getList();
                            this.$message.success(res.message);
                        })
                    } else {
                        delSystemRole(data).then((res) => {
                            this.getList();
                            this.$message.success(res.message);
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
            },
            handleAssignAuth(data) {
                if (!data) {
                    this.$message.warning("数据错误");
                }
                this.formData = data;
                this.dialogAuthTableVisible = true;
                this.auth.listQuery.roleId = data.id;
                this.getAuthList(this.auth.listQuery);
            },
            authSave() {
                var datas = this.$refs.multipleTable.selection;
                console.log(datas);
                if (datas.length === 0) {
                    this.dialogAuthTableVisible = false;
                    return;
                }
                var param = {id: this.formData.id, authorityIds: getArrayInObjectArray(datas, 'id')};
                assignRoleAuth(param).then((res) => {
                    this.dialogAuthTableVisible = false;
                    this.$message.success(res.message);
                })
            },
            columnSelected(rows, row) {
                if (row.selected) {
                    this.$refs.multipleTable.toggleRowSelection(row, true);
                }
            },
            getAuthorityIds() {
                getSystemMenusNodeList().then((res) => {
                    var data = res.data;
                    this.menuList = data;
                })
            },
        }
    }
</script>
