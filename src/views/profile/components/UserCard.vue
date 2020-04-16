<template>
  <div>
    <el-card style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>About me</span>
      </div>

      <div class="user-profile">
        <div class="box-center">
          <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
            <!--          <a class="btn" @click="updateUserIcon">上传</a>-->
            <div class="user-name text-center">{{ user.name }}</div>
          </pan-thumb>
        </div>

        <div class="box-center">
          <el-button size="mini" icon="el-icon-upload" @click="updateUserIcon">
            Change Avatar
          </el-button>
          <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
        </div>
      </div>

      <div class="user-bio">
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="education"/>
            <span>Education</span></div>
          <div class="user-bio-section-body">
            <div class="text-muted">
              JS in Computer Science from the University of Technology <a class="editEdu" @click.prevent="dialogFormVisible = true">修改</a>
              <label />
            </div>
          </div>
        </div>

        <div class="user-skills user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="skill"/>
            <span>Skills</span>
            <span><el-button @click="test" size="mini" ><i class="el-icon-plus"></i></el-button></span>
          </div>
          <div class="user-bio-section-body">
            <div class="progress-item">
              <span>Vue</span>
              <el-slider :value="70" show-input @change="test"></el-slider>
<!--              <el-progress :percentage="70"/>-->
            </div>
            <div class="progress-item">
              <span>JavaScript</span>
              <el-slider :value="18" show-input @change="test"></el-slider>
            </div>
            <div class="progress-item">
              <span>Css</span>
              <el-slider :value="12" show-input @change="test"></el-slider>
            </div>
            <div class="progress-item">
              <span>ESLint</span>
              <el-slider :value="100" show-input @change="test"></el-slider>
            </div>
          </div>
        </div>
      </div>

      <my-upload field="userIcon"
                 @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 v-model="show"
                 :width="300"
                 :height="300"
                 :url="url"
                 :params="params"
                 :headers="headers"
                 img-format="jpg"></my-upload>

      <el-dialog :visible.sync="dialogFormVisible">
        <el-input
          :autosize="{ minRows: 4, maxRows: 8}"
          type="textarea"
          placeholder="Please input"
        />
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            {{ $t('table.cancel') }}
          </el-button>
          <el-button type="primary" @click="dialogStatus==='add'?addSave():editSave()">
            {{ $t('table.confirm') }}
          </el-button>
        </div>
      </el-dialog>
    </el-card>

  </div>
</template>

<script>
    import PanThumb from '@/components/PanThumb'
    import myUpload from 'vue-image-crop-upload'
    import { getToken } from '@/utils/auth'
    import bucket from '@/config/bucket'
    import {mapMutations} from 'vuex'

    export default {
        components: {PanThumb, myUpload},
        data() {
            return {
                show: false,
                params: bucket.bucketPubR,
                headers: {
                    Authorization: 'Bearer ' + getToken()
                },
                imgDataUrl: '',
                url: 'http://127.0.0.1:8769/fileupload/api/admin/updateUserIcon',
                editing: false,
                dialogFormVisible: false
            };
        },
        props: {
            user: {
                type: Object,
                default: () => {
                    return {
                        name: '',
                        email: '',
                        avatar: '',
                        roles: ''
                    }
                }
            }
        },
        methods: {
            ...mapMutations({
                SET_AVATAR: 'user/SET_AVATAR'
            }),
            updateUserIcon() {
                this.show = !this.show;
            },

            test() {
                alert(11);
            },
            /**y
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log(jsonData.data.attachUrl);
                this.SET_AVATAR(jsonData.data.attachUrl);
                this.user.avatar = jsonData.data.attachUrl
                console.log(this.user.avatar);
                console.log('field: ' + field);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            }
        }
    }
</script>

<style lang="scss" scoped>
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .editEdu {
    color: #2ac06d;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }

    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>
