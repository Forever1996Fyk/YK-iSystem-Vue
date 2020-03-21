<template>
  <div class="createPost-container">
    <el-tabs @tab-click="changeTabs" v-model="activeName">
      <el-tab-pane :label="$t('tagsView.ApplicationMatters')" name="applicationMatters">
        <div class="createPost-main-container">
          <el-form ref="dataForm" :model="formData" :rules="rules" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$t('table.applyUserName')">
                  <el-input v-model="formData.applyUserName" readonly/>
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
                <el-form-item :label="$t('table.reason')" prop="reason">
                  <el-input
                    v-model="formData.reason"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    type="textarea"
                    placeholder="Please input" readonly
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="visible">
              <el-col :span="24">
                <el-form-item prop="approveMsg" :label="$t('table.approveMsg')" style="margin-bottom: 30px;">
                  <Tinymce ref="editor" v-model="formData.approveMsg" :height="200"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-if="visible">
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" :disabled="disabled" @click="completeTask('true')">
                    {{ $t('button.approve') }}
                  </el-button>
                  <el-button type="info" :disabled="disabled" @click="completeTask('false')">
                    {{ $t('button.turnDown') }}
                  </el-button>
                  <!--                    <el-button type="danger">-->
                  <!--                      {{ $t('button.invalid') }}-->
                  <!--                    </el-button>-->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" name="approveProcess">
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row
                  style="width: 100%">

          <el-table-column :label="$t('table.taskName')">
            <template slot-scope="{row}">
              <span>{{ row.taskName }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('table.userName')">
            <template slot-scope="{row}">
              <span>{{ row.userName }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180" align="center" :label="$t('table.approveTime')">
            <template slot-scope="{row}">
              <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>

          <el-table-column width="400" align="center" :label="$t('table.approveMsg')">
            <template slot-scope="{row}">
              <p v-html="row.approveMsg"></p>
            </template>
          </el-table-column>

          <el-table-column width="400" align="center" :label="$t('table.isPass')">
            <template slot-scope="{row}">
              <span>{{ row.pass?'通过':'不通过' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="流程图" name="processImage">
        <div class="createPost-main-container">
          <img :src="'data:/image/png;base64,' + image0" v-if="showImg0"/>
          <img :src="'data:/image/png;base64,' + image1" v-if="showImg1"/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import Tinymce from '@/components/Tinymce'
    import Upload from '@/components/Upload/SingleImage3'
    import MDinput from '@/components/MDinput'
    import {
        completeTask,
        getApplicationMatters,
        getHisApplicationMatters,
        getHighLightProcImage,
        getApproveInfo
    } from '@/api/taskManage'

    export default {
        name: 'HandleTask',
        components: {Tinymce, MDinput, Upload},
        data() {
            return {
                activeName: 'applicationMatters',
                listLoading: true,
                list: null,
                formData: {
                    id: '',
                    applyUserName: null,
                    leaveType: null,
                    leaveDays: null,
                    startTime: null,
                    endTime: null,
                    reason: null,
                    approveMsg: null,
                    processInstanceId: null,
                    taskId: null
                },
                visible: true,
                readonly: true,
                disabled: false,
                rules: {
                    approveMsg: [{required: true, message: '审批信息必填', trigger: 'change'}],
                },
                image0: null,
                image1: null,
                showImg0: false,
                showImg1: true
            }
        },
        created() {
            if (this.$route.query) {
                const id = this.$route.query.id;
                const type = this.$route.query.type;
                this.getUserLeaveById(id, type);
            }
        },
        methods: {
            changeTabs(tab) {
                switch (tab.name) {
                    case 'approveProcess':
                        getApproveInfo(this.formData.processInstanceId).then((res) => {
                            console.log(res);
                            this.list = res.data;
                            this.listLoading = false;
                        });
                        break;
                    case 'processImage':
                        getHighLightProcImage(this.formData.processInstanceId).then((res) => {
                            var data = res.data.images;
                            this.image0 = data[0];
                            this.image1 = data[1];

                            var countNum = 0;
                            setInterval(function () {
                                if (countNum === 0) {
                                    this.showImg0 = true;
                                    this.showImg1 = false;
                                } else {
                                    this.showImg0 = false;
                                    this.showImg1 = true;
                                }

                                countNum++;

                                if (countNum === 2) {
                                    countNum = 0;
                                }
                            }, 1000);
                        });
                        break;
                }
            },
            getUserLeaveById(id, type) {
                if (type === 'upcomingTask') {
                    getApplicationMatters(id).then((res) => {
                        this.formData = res.data;
                        this.formData.taskId = id;
                    })
                } else {
                    this.visible = false;
                    getHisApplicationMatters(id).then((res) => {
                        console.log(res)
                        this.formData = res.data;
                    })
                }
            },
            completeTask(pass) {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {

                        this.disabled = true;
                        completeTask(this.formData.taskId, pass, this.formData).then((res) => {
                            this.$message.success(res.message);
                            this.$store.dispatch('tagsView/delView', this.$route)
                            // 返回上一步路由
                            this.$router.go(-1);
                        }).finally(() => {
                            this.disabled = false;
                        })
                    }
                })
            }
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
