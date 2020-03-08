<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.apiCode"
        :placeholder="$t('table.apiCode')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.apiName"
        :placeholder="$t('table.apiName')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.apiCategory" class="filter-item" :placeholder="$t('table.apiCategory')"
                 style="width: 200px;" clearable>
        <el-option v-for="item in apiCategoryOptions" :key="item.key" :label="item.value" :value="item.key"/>
      </el-select>
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

      <el-checkbox v-model="showApiDesc" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        {{ $t('table.apiDesc') }}
      </el-checkbox>

      <el-checkbox v-model="showClassName" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        {{ $t('table.className') }}
      </el-checkbox>

      <el-checkbox v-model="showMethodName" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        {{ $t('table.methodName') }}
      </el-checkbox>

      <el-checkbox v-model="showContentType" class="filter-item" style="margin-left:15px;"
                   @change="tableKey=tableKey+1">
        {{ $t('table.contentType') }}
      </el-checkbox>
    </div>

    <el-table
      ref="multipleTable"
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column :label="$t('table.apiCode')" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.apiCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apiName')" align="center" min-width="180px">
        <template slot-scope="{row}">
          <span>{{ row.apiName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apiCategory')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.apiCategory | apiCategoryFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showApiDesc" :label="$t('table.apiDesc')" align="center" width="280px">
        <template slot-scope="{row}">
          <span @click="handleView(row.apiDesc)" class="link-type">{{ row.apiDesc | descFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.requestMethod')" align="center" width="280px">
        <template slot-scope="{row}">
          <el-tag v-for="item in row.requestMethod.split(',')" size="mini">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="showContentType" :label="$t('table.contentType')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contentType }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showClassName" :label="$t('table.className')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showMethodName" :label="$t('table.methodName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.methodName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.path')" align="center" width="280px">
        <template slot-scope="{row}">
          <span>{{ row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.serviceId')" align="center" width="180px">
        <template slot-scope="{row}">
          <span>{{ row.serviceId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.persist')" align="center"  width="80">
        <template slot-scope="{row}">
          <span>{{ row.persist | whetherFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.auth')" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.auth | whetherFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.open')" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.open | whetherFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('table.actions')" align="center" class-name="small-padding fixed-width" width="230">
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
            <el-form-item :label="$t('table.apiCode')" prop="apiCode">
              <el-input v-model="formData.apiCode"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('table.apiName')" prop="apiName">
              <el-input v-model="formData.apiName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('table.apiCategory')" prop="apiCategory">
              <el-select v-model="formData.apiCategory" class="filter-item" placeholder="Please select"
                         style="width:100%">
                <el-option v-for="item in apiCategoryOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('table.persist')" prop="persist">
              <el-select v-model="formData.persist" class="filter-item" placeholder="Please select" style="width:100%">
                <el-option v-for="item in whetherOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('table.auth')" prop="auth">
              <el-select v-model="formData.auth" class="filter-item" placeholder="Please select" style="width:100%">
                <el-option v-for="item in whetherOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('table.open')" prop="open">
              <el-select v-model="formData.open" class="filter-item" placeholder="Please select" style="width:100%">
                <el-option v-for="item in whetherOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.serviceId')" prop="serviceId">
              <el-select v-model="formData.serviceId" class="filter-item"
                         placeholder="Please select" style="width:100%">
                <el-option v-for="item in serviceIdOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.path')" prop="path">
              <el-input v-model="formData.path"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.className')" prop="className">
              <el-input v-model="formData.className"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.methodName')" prop="methodName">
              <el-input v-model="formData.methodName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.requestMethod')" prop="requestMethod">
              <el-select v-model="formData.requestMethod" class="filter-item" multiple
                         placeholder="Please select" style="width:100%">
                <el-option v-for="item in requestMethodOptions" :key="item.key" :label="item.value" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('table.contentType')" prop="contentType">
              <el-input v-model="formData.contentType"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('table.apiDesc')" prop="apiDesc">
              <el-input
                v-model="formData.apiDesc"
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

    <el-dialog :title="formTitle[dialogStatus]" :visible.sync="dialogViewVisible">
      <span>{{viewApiDesc}}</span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogViewVisible = false">
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
        addSystemApi,
        editSystemApi,
        delSystemApi,
        delSystemApiByIds,
        getSystemApis
    } from '@/api/systemApi'
    import {
        getGatewayRoutesNoPage
    } from '@/api/gatewayRoute'
    import baseData from '@/config/baseData'

    const apiCategoryOptions = [
        {key: 'default', value: '默认'},
        {key: 'system', value: '系统'},
        {key: 'generate', value: '代码生成'},
        {key: 'gatewayRout', value: '路由网关'},
        {key: 'auth', value: '用户认证'},
    ];

    export default {
        name: 'SystemApi',
        components: {Pagination},
        directives: {waves},
        filters: {
            whetherFilter(type) {
                return baseData.filterKeyValue(baseData.whetherOptions)[type];
            },
            apiCategoryFilter(type) {
                return baseData.filterKeyValue(apiCategoryOptions)[type];
            },
            descFilter(type) {
                return baseData.descFilter(type);
            }
        },
        data() {
            return {
                tableKey: 0,
                showMethodName: false,
                showClassName: false,
                showContentType: false,
                showApiDesc: false,
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    start: 1,
                    pageSize: 20,
                    apiCode: null,
                    apiName: null,
                    apiCategory: null
                },
                formData: {
                    id: '',
                    apiCode: null,
                    apiName: null,
                    apiCategory: null,
                    apiDesc: null,
                    requestMethod: null,
                    contentType: null,
                    className: null,
                    methodName: null,
                    path: null,
                    serviceId: null,
                    persist: 1,
                    auth: 1,
                    open: 1
                },
                dialogFormVisible: false,
                dialogViewVisible: false,
                dialogStatus: '',
                viewApiDesc: '',
                formTitle: {
                    edit: this.$t('Edit'),
                    add: this.$t('Add'),
                    view: this.$t('View')
                },
                serviceIdOptions: [],
                whetherOptions: baseData.whetherOptions,
                requestMethodOptions: baseData.requestMethod,
                apiCategoryOptions,
                rules: {
                    apiCode: [{required: true, message: '接口编码必填', trigger: 'change'}],
                    apiName: [{required: true, message: '接口名称必填', trigger: 'change'}],
                    apiCategory: [{required: true, message: '接口分类必填', trigger: 'change'}],
                    serviceId: [{required: true, message: '服务id必填', trigger: 'change'}],
                    path: [{required: true, message: '接口路径必填', trigger: 'change'}]
                }
            }
        },
        created() {
            this.getList();
            this.getServiceIds();
        },
        methods: {
            getList() {
                this.listLoading = true;
                getSystemApis(this.listQuery).then(res => {
                    console.log(res);
                    this.list = res.data.data;
                    this.total = res.data.total;

                    // Just to simulate the time of the request
                    setTimeout(() => {
                        this.listLoading = false
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
                    apiCode: null,
                    apiName: null,
                    apiCategory: null,
                    apiDesc: null,
                    requestMethod: null,
                    contentType: null,
                    className: null,
                    methodName: null,
                    path: null,
                    serviceId: null,
                    persist: 1,
                    auth: 1,
                    open: 1
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
                if (this.formData.requestMethod) {
                    this.formData.requestMethod = this.formData.requestMethod.split(",");
                }
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleView(data) {
                this.viewApiDesc = data;
                this.dialogStatus = 'view';
                this.dialogViewVisible = true;
            },
            addSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData);
                        if (this.formData.requestMethod) {
                            this.formData.requestMethod = this.formData.requestMethod.join(",");
                        }
                        addSystemApi(this.formData).then((res) => {
                            this.$message.success(res.message)
                            this.getList()
                            this.dialogFormVisible = false
                        })
                    }
                })
            },
            editSave() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData);
                        if (this.formData.requestMethod) {
                            this.formData.requestMethod = this.formData.requestMethod.join(",");
                        }
                        editSystemApi(this.formData).then((res) => {
                            console.log(res);
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
                    if (data instanceof Array) {
                        delSystemApiByIds(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    } else {
                        delSystemApi(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    }
                }).catch(() => {
                    this.$message.info('已取消')
                })
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
