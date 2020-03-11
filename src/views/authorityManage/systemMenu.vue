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
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column :label="$t('table.menuName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.menuName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.menuCode')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.menuCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.menuDesc')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.menuDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.pMenu')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pmenuName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.menuScheme')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.scheme }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.menuTarget')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.target }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.menuLevel')" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.level === '1'?'success':row.level === '2'?'':'danger'">{{ row.level | menuLevelFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.remark')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.routePath')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.icon')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.icon }}</span>
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

    <el-dialog :title="formTitle[dialogStatus]" :visible.sync="dialogFormVisible">
      <!-- rules表示表单验证规则 -->
      <el-form ref="dataForm" :rules="rules" :model="formData" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.menuName')" prop="menuName">
              <el-input v-model="formData.menuName"/>
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item :label="$t('table.menuLevel')" prop="level">
              <el-radio v-model="formData.level" label="1" border>菜单</el-radio>
              <el-radio v-model="formData.level" label="2" border>子菜单</el-radio>
              <el-radio v-model="formData.level" label="3" border>按钮</el-radio>
              <el-radio v-model="formData.level" label="4" border>api接口</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.menuCode')" prop="menuCode">
              <el-input v-model="formData.menuCode"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.pMenu')" prop="pid">
              <el-cascader v-model="formData.pid" :props="pMenu" :options="list" style="width: 100%">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.menuUrl')" prop="url">
              <el-input v-model="formData.url"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('table.sort')" prop="sort">
              <el-input v-model="formData.sort"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('table.icon')" prop="icon">
              <el-input v-model="formData.icon"/>
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
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('table.menuDesc')" prop="menuDesc">
              <el-input
                v-model="formData.menuDesc"
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
        addSystemMenu,
        editSystemMenu,
        delSystemMenu,
        delSystemMenuByIds,
        getSystemMenusNodeList
    } from '@/api/systemMenu'
    import baseData from '@/config/baseData'

    export default {
        name: 'SystemMenu',
        components: {Pagination},
        directives: {waves},
        filters: {
            menuLevelFilter(type) {
                var menuLevelFilterKeyValue = baseData.menuLevel.reduce((acc, cur) => {
                    acc[cur.key] = cur.value;
                    return acc;
                }, {});
                return menuLevelFilterKeyValue[type];
            }
        },
        data() {
            return {
                list: null,
                listLoading: true,
                listQuery: {
                    start: 1,
                    pageSize: 20,
                    title: null
                },
                pMenu: {
                    value: 'id',
                    label: 'menuName',
                    children: 'children',
                    checkStrictly: true,
                    emitPath: false
                },
                formData: {
                    id: '',
                    menuName: null,
                    menuCode: null,
                    menuDesc: null,
                    pid: null,
                    scheme: null,
                    target: null,
                    sort: null,
                    level: null,
                    remark: null,
                    url: null,
                    icon: null,
                    serviceId: null,
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
                getSystemMenusNodeList(this.listQuery).then(res => {
                    console.log(res);
                    this.list = res.data;
                    // this.total = res.data.total;

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
                    menuName: null,
                    menuCode: null,
                    menuDesc: null,
                    pid: null,
                    scheme: null,
                    target: null,
                    sort: null,
                    level: null,
                    remark: null,
                    url: null,
                    icon: null,
                    serviceId: null,
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
                        addSystemMenu(this.formData).then((res) => {
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
                        editSystemMenu(this.formData).then((res) => {
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
                        delSystemMenuByIds(data).then((res) => {
                            this.getList();
                            this.$message.success('res.message');
                        })
                    } else {
                        delSystemMenu(data).then((res) => {
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
