<template>
  <div class="user-activity">
    <div class="post" v-for="item in list">
      <div class="user-block">
        <img class="img-circle"
             :src="user.avatar">
        <span class="username text-muted">{{item.nickName}}</span>
        <span class="description">{{item.createTime}}</span>
      </div>
      <p v-html="item.content">
      </p>
      <div class="user-images" v-if="item.attachUrls != null">
        <el-carousel :interval="6000" type="card" height="220px">
          <el-carousel-item v-for="attachUrl in item.attachUrls.split(',')">
            <img :src="attachUrl" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share"/>
            <span style="cursor:pointer">Share</span>
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-delete"></i>
            <span style="cursor:pointer" @click="deleteActivity(item.id)">Delete</span>
          </span>
        </li>
      </ul>
    </div>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.start"
      :limit.sync="listQuery.pageSize"
      :pageSizes="[3]"
      @pagination="getList"
    />
  </div>
</template>

<script>

    const avatarPrefix = '?imageView2/1/w/80/h/80'
    const carouselPrefix = '?imageView2/2/h/440'
    import {
        delUserActivity,
        getUserActivitys
    } from '@/api/userActivity'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination

    export default {
        components: {Pagination},
        props: {
            user: {
                type: Object,
                default: () => {
                    return {
                        userId: null
                    }
                }
            }
        },
        data() {
            return {
                list: null,
                total: 0,
                listQuery: {
                    start: 1,
                    pageSize: 3,
                    userId: null
                },
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.listQuery.userId = this.user.userId;
                getUserActivitys(this.listQuery).then((res) => {
                    this.list = res.data.data;
                    this.total = res.data.total;

                    console.log(this.list);
                })
            },
            deleteActivity(id) {
                delUserActivity(id).then((res) => {
                    this.$message.success(res.message);
                    this.getList();
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .user-activity {
    .user-block {

      .username,
      .description {
        display: block;
        margin-left: 50px;
        padding: 2px 0;
      }

      .username {
        font-size: 16px;
        color: #000;
      }

      :after {
        clear: both;
      }

      .img-circle {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        float: left;
      }

      span {
        font-weight: 500;
        font-size: 12px;
      }
    }

    .post {
      font-size: 14px;
      border-bottom: 1px solid #d2d6de;
      margin-bottom: 15px;
      padding-bottom: 15px;
      color: #666;

      .image {
        width: 100%;
        height: 100%;

      }

      .user-images {
        padding-top: 20px;
      }
    }

    .list-inline {
      padding-left: 0;
      margin-left: -5px;
      list-style: none;

      li {
        display: inline-block;
        padding-right: 5px;
        padding-left: 5px;
        font-size: 13px;
      }

      .link-black {

        &:hover,
        &:focus {
          color: #999;
        }
      }
    }

  }

  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }
</style>
