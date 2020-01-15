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
      <el-table-column :label="$t('table.routeName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.routeName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.path')">
        <template slot-scope="{row}">
          <span>{{ row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.serviceId')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.serviceId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.routeDesc')" align="center">
        <template slot-scope="{row}">
          {{ row.routeDesc }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.stripPrefix')" align="center">
        <template slot-scope="{row}">
          {{ row.stripPrefix | whetherFilter}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.persist')" align="center">
        <template slot-scope="{row}">
          {{ row.persist | whetherFilter}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.retryable')" align="center">
        <template slot-scope="{row}">
          {{ row.retryable | whetherFilter}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
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
            <el-form-item :label="$t('table.routeName')" prop="routeName">
              <el-input v-model="formData.routeName"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.path')" prop="path">
              <el-input v-model="formData.path"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('table.stripPrefix')" prop="stripPrefix">
              <el-select v-model="formData.stripPrefix" class="filter-item" placeholder="Please select"
                         style="width:100%">
                <el-option v-for="item in whetherOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.persist')" prop="persist">
              <el-select v-model="formData.persist" class="filter-item" placeholder="Please select" style="width:100%">
                <el-option v-for="item in whetherOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('table.retryable')" prop="retryable">
              <el-select v-model="formData.retryable" class="filter-item" placeholder="Please select"
                         style="width:100%">
                <el-option v-for="item in whetherOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('table.routeDesc')" prop="routeDesc">
              <el-input
                v-model="formData.routeDesc"
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
        addGatewayRoute,
        editGatewayRoute,
        delGatewayRoute,
        delGatewayRouteByIds,
        getGatewayRoutes
    } from '@/api/gateway'
    import baseData from '@/config/baseData'

    export default {
        name: 'GateWay',
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
                    routeName: null
                },
                formData: {
                    id: '',
                    routeName: '',
                    path: '',
                    stripPrefix: 0,
                    persist: 0,
                    retryable: 0,
                    routeDesc: ''
                },
                dialogFormVisible: false,
                dialogStatus: '',
                formTitle: {
                    edit: this.$t('Edit'),
                    add: this.$t('Add')
                },
                whetherOptions: baseData.whetherOptions,
                rules: {
                    routeName: [{required: true, message: '路由名称必填', trigger: 'change'}],
                    path: [{required: true, message: '路径必填', trigger: 'change'}],
                    routeDesc: [{required: true, message: '路由描述必填', trigger: 'change'}]
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                getGatewayRoutes(this.listQuery).then(res => {
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
                    routeName: '',
                    path: '',
                    stripPrefix: 1,
                    persist: 0,
                    retryable: 0,
                    routeDesc: ''
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
                        addGatewayRoute(this.formData).then((res) => {
                            this.$message.success( res.message);
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
                        editGatewayRoute(this.formData).then((res) => {
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
                        delGatewayRouteByIds(data).then((res) => {
                            this.getList();
                            this.$message.success(res.message);
                        })
                    } else {
                        delGatewayRoute(data).then((res) => {
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
            }
        }
    }
</script>
