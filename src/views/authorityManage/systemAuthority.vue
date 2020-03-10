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
      <el-table-column :label="$t('table.authority')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.authority }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apiCode')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.apiCode }}</span>
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
          <el-col :span="8">
            <el-form-item :label="$t('table.authority')" prop="authority">
              <el-input v-model="formData.authority"/>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('table.apiName')" prop="apiId">
              <el-select v-model="formData.apiId" class="filter-item" placeholder="Please select"
                         style="width:100%">
                <el-option v-for="item in apiIdOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('table.menuName')" prop="menuId">
              <el-select v-model="formData.menuId" class="filter-item" placeholder="Please select"
                         style="width:100%">
                <el-option v-for="item in menuIdOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
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
  </div>
</template>

<script>
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import waves from '@/directive/waves'
    import {
        addSystemAuthority,
        editSystemAuthority,
        delSystemAuthority,
        delSystemAuthorityByIds,
        getSystemAuthorities
    } from '@/api/systemAuthority'
    import {
        getSystemApisNoPage
    } from '@/api/systemApi'
    import {
        getSystemMenus
    } from '@/api/systemMenu'
    import baseData from '@/config/baseData'

    export default {
        name: 'SystemAuthority',
        components: {Pagination},
        directives: {waves},
        filters: {
            whetherFilter(type) {
                return baseData.filterKeyValue(baseData.whetherOptions)[type];
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
                    authority: null,
                    apiId: null,
                    remark: null,
                    menuId: null
                },
                dialogFormVisible: false,
                dialogStatus: '',
                formTitle: {
                    edit: this.$t('Edit'),
                    add: this.$t('Add')
                },
                whetherOptions: baseData.whetherOptions,
                rules: {
                    authority: [{required: true, message: '必填', trigger: 'change'}],
                    apiId: [{required: true, message: '必填', trigger: 'change'}]
                }
            }
        },
        created() {
            this.getList();
            this.getApiIds();
            this.getMenuIds();
        },
        methods: {
            getList() {
                this.listLoading = true;
                getSystemAuthorities(this.listQuery).then(res => {
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
                    authority: null,
                    apiId: null,
                    menuId: null,
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
                        addSystemAuthority(this.formData).then((res) => {
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
                        editSystemAuthority(this.formData).then((res) => {
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
                        delSystemAuthorityByIds(data).then((res) => {
                            this.getList();
                            this.$message.success(res.message);
                        })
                    } else {
                        delSystemAuthority(data).then((res) => {
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
            getApiIds() {
                this.apiIdOptions = [];
                getSystemApisNoPage().then((res) => {
                    var data = res.data;
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            var obj = {key: data[i].id, value: data[i].apiCode};
                            this.apiIdOptions.push(obj);
                        }
                    }
                })
            },
            getMenuIds() {
                this.menuIdOptions = [];
                getSystemMenus().then((res) => {
                    var data = res.data;
                    if (data) {
                        for (var i = 0; i < data.length; i++) {
                            var obj = {key: data[i].id, value: data[i].menuCode};
                            this.menuIdOptions.push(obj);
                        }
                    }
                })
            }
        }
    }
</script>
