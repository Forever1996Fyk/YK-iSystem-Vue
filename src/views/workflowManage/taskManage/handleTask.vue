<template>
  <div class="createPost-container">
    <el-tabs @tab-click="changeTabs" v-model="activeName">
      <el-tab-pane :label="$t('tagsView.ApplicationMatters')" name="applicationMatters">
          <div class="createPost-main-container">
            <el-form ref="formData" :model="formData" :rules="rules" label-width="100px">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('table.applyUserName')">
                    <el-input v-model="formData.userName" readonly/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('table.leaveType')">
                    <el-input v-model="formData.leaveType" readonly/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('table.startTime')">
                    <el-input v-model="formData.startTime" readonly/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('table.endTime')">
                    <el-input v-model="formData.endTime" readonly/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="$t('table.leaveDays')">
                    <el-input v-model="formData.leaveDays" readonly/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('table.reason')" prop="reason" >
                    <el-input
                      v-model="formData.reason"
                      :autosize="{ minRows: 4, maxRows: 8}"
                      type="textarea"
                      placeholder="Please input" readonly
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item prop="approveMsg" :label="$t('table.approveMsg')" style="margin-bottom: 30px;">
                    <Tinymce ref="editor" v-model="formData.approveMsg" :height="200"/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item>
                    <el-button type="primary">
                      {{ $t('button.approve') }}
                    </el-button>
                    <el-button type="info" >
                      {{ $t('button.turnDown') }}
                    </el-button>
                    <el-button type="danger">
                      {{ $t('button.invalid') }}
                    </el-button>
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
                activeName: 'applicationMatters',
                formData: {
                    id: '',
                    userName: null,
                    leaveType: null,
                    leaveDays: null,
                    startTime: null,
                    endTime: null,
                    reason: null,
                    approveMsg: null
                },
                readonly: true,
                rules: {
                    content: [{required: true, message: '审批信息必填', trigger: 'change'}],
                }
            }
        },
        created() {
            const obj = this.$route.query.obj;
            this.getUserLeaveById(JSON.parse(obj));
        },
        methods: {
            changeTabs() {

            },
            getUserLeaveById(obj) {
                this.formData = obj;
                this.formData.leaveType = obj.params.leaveType;
                this.formData.leaveDays = obj.params.leaveDays;
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
