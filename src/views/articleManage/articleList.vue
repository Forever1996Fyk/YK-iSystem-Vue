<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

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
              Edit
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
    import {getArticles} from '@/api/article'
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
            }
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
            }
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
