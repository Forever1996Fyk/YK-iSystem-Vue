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
      <router-link :to="'/articleManage/createArticle/'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-plus"
        >
          {{ $t('table.add') }}
        </el-button>
      </router-link>

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
    <el-table v-loading="listLoading" ref="multipleTable" :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column type="selection" width="55"/>
      <el-table-column :label="$t('table.title')">
        <template slot-scope="{row}">
          <router-link :to="'/articleManage/editArticle/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.articleCover')" align="center">
        <template slot-scope="{row}">
          <img :src="row.articleCoverUrl" min-width="30" height="30" />
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" :label="$t('table.publishTime')">
        <template slot-scope="scope">
          <span>{{ scope.row.publishTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400" align="center" :label="$t('table.articleClass')">
        <template slot-scope="{row}">
          <el-tag v-for="item in row.articleClassId.split(',')" size="mini">{{item}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="100" :label="$t('table.importance')">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
        </template>
      </el-table-column>

      <el-table-column width="100" :label="$t('table.isComment')">
        <template slot-scope="{row}">
          <span>{{ row.comment | isCommentFilter}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" :label="$t('table.status')" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusTagFilter">
            {{ row.status | statusFilter}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.actions')" width="120">
        <template slot-scope="scope">
          <router-link :to="'/articleManage/editArticle/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              {{ $t('table.edit') }}
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
  </div>
</template>

<script>
    import {getArticles, delArticleByIds, delArticle} from '@/api/article'
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    import baseData from '@/config/baseData'

    export default {
        name: 'ArticleList',
        components: {Pagination},
        filters: {
            statusTagFilter(status) {
                const statusMap = {
                    1: 'success',
                    2: 'info',
                    0: 'danger'
                };
                return statusMap[status];
            },
            statusFilter(status) {
                return baseData.filterKeyValue(baseData.articleStatus)[status];
            },
            isCommentFilter(type) {
                return baseData.filterKeyValue(baseData.whetherOptions)[type];
            },
        },
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    pageSize: 20
                }
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true
                getArticles(this.listQuery).then(response => {
                    this.list = response.data.data;
                    this.total = response.data.total;
                    this.listLoading = false
                })
            },
            handleFilter() {
                this.listQuery.page = 1
                this.getList()
            },
            handleBatchDelete() {
                var datas = this.$refs.multipleTable.selection;
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
            handleDelete(data) {
                this.$confirm('确定删除该数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (data instanceof Array) {
                        delArticleByIds(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    } else {
                        delArticle(data).then((res) => {
                            this.getList()
                            this.$message.success(res.message)
                        })
                    }
                }).catch(() => {
                    this.$message.info('已取消')
                })
            },
        }
    }
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
