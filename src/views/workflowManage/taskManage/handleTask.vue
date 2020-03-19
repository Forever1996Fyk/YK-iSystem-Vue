<template>
  <div class="createPost-container">
    <el-tabs @tab-click="changeTabs">
      <el-tab-pane :label="$t('tagsView.ApplicationMatters')" name="first">
          <div class="createPost-main-container">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('table.applyUserName')">
                    <el-input v-model="formData.userName"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('table.leaveType')">
                    <el-input v-model="formData.leaveType"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('table.startTime')">
                    <el-input v-model="formData.startTime"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('table.endTime')">
                    <el-input v-model="formData.endTime"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('table.leaveDays')">
                    <el-input v-model="formData.leaveDays"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('table.reason')" prop="reason">
                    <el-input
                      v-model="formData.reason"
                      :autosize="{ minRows: 4, maxRows: 8}"
                      type="textarea"
                      placeholder="Please input"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item prop="approveMsg" :label="$t('table.approveMsg')" style="margin-bottom: 30px;">
                    <Tinymce ref="editor" v-model="formData.approveMsg" :height="400"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import Tinymce from '@/components/Tinymce'
    import Upload from '@/components/Upload/SingleImage3'
    import MDinput from '@/components/MDinput'
    import {getUserLeaveById} from '@/api/userLeave'

    export default {
        name: 'HandleTask',
        components: {Tinymce, MDinput, Upload},
        data() {
            return {
                formData: {
                    id: '',
                    userName: null,
                    leaveType: null,
                    startTime: null,
                    endTime: null,
                    reason: null,
                    approveMsg: null
                },
                rules: {
                    content: [{required: true, message: '审批信息必填', trigger: 'change'}],
                }
            }
        },
        created() {
            const id = this.$route.params && this.$route.params.id;
            this.getUserLeaveById(id);
        },
        methods: {
            changeTabs() {

            },
            getUserLeaveById(id) {
                getUserLeaveById(id).then(response => {
                    console.log(response.data);
                    this.formData = response.data;
                }).catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }

  .article-textarea /deep/ {
    textarea {
      padding-right: 40px;
      resize: none;
      border: none;
      border-radius: 0px;
      border-bottom: 1px solid #bfcbd9;
    }
  }
</style>
