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

      <el-checkbox v-model="showApiDesc" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        {{ $t('table.apiDesc') }}
      </el-checkbox>

      <el-checkbox v-model="showClassName" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        {{ $t('table.className') }}
      </el-checkbox>

      <el-checkbox v-model="showMethodName" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        {{ $t('table.methodName') }}
      </el-checkbox>

      <el-checkbox v-model="showContentType" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
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
      <el-table-column type="selection" width="55" />
      <el-table-column :label="$t('table.apiCode')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.apiCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apiName')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.apiName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.apiCategory')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.apiCategory }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showApiDesc" :label="$t('table.apiDesc')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.apiDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.requestMethod')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.requestMethod }}</span>
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
      <el-table-column :label="$t('table.path')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.serviceId')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.serviceId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.persist')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.persist | whetherFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.auth')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.auth | whetherFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.open')" align="center">
        <template slot-scope="{row}">
          <span>{{ row.open | whetherFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('table.actions')" align="center" class-name="small-padding fixed-width">
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
            <el-form-item :label="$t('table.apiCode')" prop="apiCode">
              <el-input v-model="formData.apiCode" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('table.apiName')" prop="apiName">
              <el-input v-model="formData.apiName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('table.apiCategory')" prop="apiCategory">
              <el-input v-model="formData.apiCategory" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('table.persist')" prop="persist">
              <el-select v-model="formData.persist" class="filter-item" placeholder="Please select" style="width:100%">
                <el-option v-for="item in whetherOptions" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('table.auth')" prop="auth">
              <el-select v-model="formData.auth" class="filter-item" placeholder="Please select" style="width:100%">
                <el-option v-for="item in whetherOptions" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('table.open')" prop="open">
              <el-select v-model="formData.open" class="filter-item" placeholder="Please select" style="width:100%">
                <el-option v-for="item in whetherOptions" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.requestMethod')" prop="requestMethod">
              <el-input v-model="formData.requestMethod" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('table.contentType')" prop="contentType">
              <el-input v-model="formData.contentType" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.className')" prop="className">
              <el-input v-model="formData.className" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.methodName')" prop="methodName">
              <el-input v-model="formData.methodName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.path')" prop="path">
              <el-input v-model="formData.path" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('table.serviceId')" prop="serviceId">
              <el-input v-model="formData.serviceId" />
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
import baseData from '@/config/baseData'

export default {
  name: 'SystemApi',
  components: { Pagination },
  directives: { waves },
  filters: {
    whetherFilter(type) {
      var whetherFilterKeyValue = baseData.whetherOptions.reduce((acc, cur) => {
        acc[cur.key] = cur.value
        return acc
      }, {})
      return whetherFilterKeyValue[type]
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
        title: null
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
      dialogStatus: '',
      formTitle: {
        edit: this.$t('Edit'),
        add: this.$t('Add')
      },
      whetherOptions: baseData.whetherOptions,
      rules: {
        attrName: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getSystemApis(this.listQuery).then(res => {
        console.log(res)
        this.list = res.data.data
        this.total = res.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
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
      this.resetTemp()
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(data) {
      this.formData = Object.assign({}, data)// copy obj
      this.dialogStatus = 'edit'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addSave() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.formData)
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
          console.log(this.formData)
          editSystemApi(this.formData).then((res) => {
            console.log(res)
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
    }
  }
}
</script>
