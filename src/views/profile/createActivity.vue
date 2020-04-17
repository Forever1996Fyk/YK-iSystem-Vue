<template>
  <div class="createPost-container">
    <el-form ref="formData" :model="formData" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar'">
        <el-button style="margin-left: 10px;" type="success" @click="addSave">
          保存
        </el-button>
        <router-link :to="'/profile/index'">
          <el-button type="warning">
            取消
          </el-button>
        </router-link>
      </sticky>
      <div class="createPost-main-container">

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="formData.content" :height="400" :isOpenPic="false" :isOpenVid="false"/>
        </el-form-item>

        <el-form-item prop="articleCover" style="margin-bottom: 30px;">
          <el-upload
            :multiple="true"
            :file-list="fileList"
            :show-file-list="true"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :headers="headers"
            class="editor-slide-upload"
            :action="url"
            :data="param"
            name="articleContent"
            list-type="picture-card"
          >
            <el-button size="small" type="primary">
              Click upload
            </el-button>
          </el-upload>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
    import Tinymce from '@/components/Tinymce'
    import Upload from '@/components/Upload/SingleImage3'
    import MDinput from '@/components/MDinput'
    import editorImage from '@/components/Tinymce/components/EditorImage'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import { getToken } from '@/utils/auth'
    import bucket from '@/config/bucket'
    import config from '@/config'
    import {
        addUserActivity,
    } from '@/api/userActivity'

    const defaultData = {
        content: null,
        activityImg: null
    };

    export default {
        name: 'CreateActivity',
        components: {Tinymce, MDinput, Upload, editorImage, Sticky},
        data() {
            return {
                listObj: {},
                fileList: [],
                headers: {
                    Authorization: 'Bearer ' + getToken()
                },
                file: '',
                url: config.apiUrl.dev + '/fileupload/api/oss/uploadOSS',
                param: bucket.bucketPubR,
                formData: Object.assign({}, defaultData),
                activityImgList: [],
            }
        },
        methods: {
            handleSuccess(response, file) {
                const uid = file.uid
                const objKeyArr = Object.keys(this.listObj)
                for (let i = 0, len = objKeyArr.length; i < len; i++) {
                    if (this.listObj[objKeyArr[i]].uid === uid) {
                        this.listObj[objKeyArr[i]].url = response.data.attachUrl
                        this.listObj[objKeyArr[i]].hasSuccess = true

                        this.activityImgList.push(response.data.id);
                        return
                    }
                }
            },
            handleRemove(file) {
                const uid = file.uid
                const objKeyArr = Object.keys(this.listObj)
                for (let i = 0, len = objKeyArr.length; i < len; i++) {
                    if (this.listObj[objKeyArr[i]].uid === uid) {
                        delete this.listObj[objKeyArr[i]]
                        return
                    }
                }
            },
            beforeUpload(file) {
                const _self = this
                const _URL = window.URL || window.webkitURL
                const fileName = file.uid
                this.listObj[fileName] = {}
                return new Promise((resolve, reject) => {
                    const img = new Image()
                    img.src = _URL.createObjectURL(file)
                    img.onload = function () {
                        _self.listObj[fileName] = {
                            hasSuccess: false,
                            uid: file.uid,
                            width: this.width,
                            height: this.height
                        }
                    }

                    resolve(true)
                })
            },
            addSave() {
                console.log(this.formData);
                if (!this.formData.content && this.activityImgList.length === 0) {
                    this.$message.warning('必须要填写内容或者上传至少一张图片');
                    return;
                }

                if (this.activityImgList.length !== 0) {
                    this.formData.activityImg = this.activityImgList.join(",");
                }

                addUserActivity(this.formData).then((res) => {
                    this.$message.success(res.message);
                    this.formData.content = null;
                    this.formData.activityImg = null;
                    this.fileList = [];
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

  .editor-slide-upload {
    margin-bottom: 20px;

    /deep/ .el-upload--picture-card {
      width: 100%;
    }
  }
</style>
