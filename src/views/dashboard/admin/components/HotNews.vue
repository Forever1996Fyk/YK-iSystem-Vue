<template>
  <div>
  <el-table :data="list" style="width: 100%;padding-top: 15px;" v-loading="listLoading">
    <el-table-column :label="$t('table.title')" min-width="200">
      <template slot-scope="{row}">
        <el-link :href="row.url" type="danger" :underline="false" target="_blank">{{ row.title }}</el-link>
      </template>
    </el-table-column>
    <el-table-column :label="$t('table.likeNum')" width="195" align="center">
      <template slot-scope="{row}">
        {{ row.likeNum }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('table.hotType')" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.hotType | hotTypeFilter">
          {{ row.hotType | hotTypeFilter}}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>

  <pagination
    v-show="total>0"
    :total="total"
    :page.sync="listQuery.start"
    :limit.sync="listQuery.pageSize"
    :pageSizes="[6]"
    @pagination="getList"
  />
  </div>

</template>

<script>
    import {getHotNews} from '@/api/dashboard'
    import Pagination from '@/components/Pagination'
    import baseData from '@/config/baseData'

    export default {
        components: {Pagination},
        filters: {
            hotTypeTagFilter(status) {
                const statusMap = {
                    1: 'danger',
                    2: 'success',
                }
                return statusMap[status]
            },
            hotTypeFilter(type) {
                switch (type) {
                    case '1':
                        return '热';
                    case '2':
                        return '新';
                    case '3':
                        return '荐';
                    default:
                        return '荐'
                }
            }
        },
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    start: 1,
                    pageSize: 6,
                },
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = true;
                getHotNews(this.listQuery).then(res => {
                    console.log(res);
                    this.list = res.data.data;
                    this.total = res.data.total;

                    // Just to simulate the time of the request
                    setTimeout(() => {
                        this.listLoading = false;
                    }, 1.5 * 1000)
                })
            }
        }
    }
</script>
