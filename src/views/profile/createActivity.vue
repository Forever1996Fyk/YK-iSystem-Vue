<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" :isOpenPic="false" :isOpenVid="false"/>
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
    import {validURL} from '@/utils/validate'
    import {addArticle, editArticle, getArticleById} from '@/api/article'
    import {formatDate} from '@/utils'
    import editorImage from '@/components/Tinymce/components/EditorImage'

    const defaultForm = {
        status: 2,
        title: '', // 文章题目
        content: '', // 文章内容
        articleSummary: '', // 文章摘要
        source_uri: '', // 文章外链
        articleCover: '', // 文章图片id
        articleCoverUrl: '', // 文章图片Url
        id: undefined,
        platforms: [],
        comment: true,
        importance: 0,
        publishTime: ''
    }

    export default {
        name: 'ArticleDetail',
        components: {Tinymce, MDinput, Upload, editorImage},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            const validateRequire = (rule, value, callback) => {
                if (value === '') {
                    this.$message({
                        message: rule.field + '为必传项',
                        type: 'error'
                    })
                    callback(new Error(rule.field + '为必传项'))
                } else {
                    callback()
                }
            }
            const validateSourceUri = (rule, value, callback) => {
                if (value) {
                    if (validURL(value)) {
                        callback()
                    } else {
                        this.$message({
                            message: '外链url填写不正确',
                            type: 'error'
                        })
                        callback(new Error('外链url填写不正确'))
                    }
                } else {
                    callback()
                }
            }
            return {
                postForm: Object.assign({}, defaultForm),
                loading: false,
                userListOptions: [],
                rules: {
                    title: [{validator: validateRequire}],
                    content: [{validator: validateRequire}],
                    source_uri: [{validator: validateSourceUri, trigger: 'blur'}]
                },
                tempRoute: {}
            }
        },
        computed: {
            contentShortLength() {
                return this.postForm.articleSummary.length
            },
            lang() {
                return this.$store.getters.language
            }
        },
        created() {
            if (this.isEdit) {
                const id = this.$route.params && this.$route.params.id
                this.getArticleById(id);
            }

            // Why need to make a copy of this.$route here?
            // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
            // https://github.com/PanJiaChen/vue-element-admin/issues/1221
            this.tempRoute = Object.assign({}, this.$route)
        },
        methods: {
            getArticleById(id) {
                getArticleById(id).then(response => {
                    this.postForm = response.data;
                    this.postForm.comment = this.postForm.comment === 1;

                    // just for test
                    // this.postForm.title += `   Article Id:${this.postForm.id}`
                    // this.postForm.articleSummary += `   Article Id:${this.postForm.id}`

                    // set tagsview title
                    this.setTagsViewTitle()

                    // set page title
                    this.setPageTitle()
                }).catch(err => {
                    console.log(err)
                })
            },
            setTagsViewTitle() {
                const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
                const route = Object.assign({}, this.tempRoute, {title: `${title}-${this.postForm.id}`})
                this.$store.dispatch('tagsView/updateVisitedView', route)
            },
            setPageTitle() {
                const title = 'Edit Article'
                document.title = `${title} - ${this.postForm.id}`
            },
            submitForm() {
                console.log(this.postForm);
                this.saveArticle(1);
            },
            saveArticle(status) {
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.postForm.status = status;
                        if (this.postForm.comment) {
                            this.postForm.comment = 1;
                        } else {
                            this.postForm.comment = 0;
                        }
                        this.postForm.publishTime = formatDate(this.postForm.publishTime, "yyyy-MM-dd hh:mm:ss");

                        if (!this.postForm.id) {
                            addArticle(this.postForm).then((res) => {
                                this.checkStatus(status, res);
                                this.postForm = Object.assign({}, defaultForm)
                            });
                        } else {
                            editArticle(this.postForm).then((res) => {
                                this.checkStatus(status, res);
                            });
                        }

                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            checkStatus(status, res) {
                if (status === 1) {
                    this.$notify({
                        title: '成功',
                        message: res.message,
                        type: 'success',
                        duration: 2000
                    });
                } else {
                    this.$message({
                        message: '保存草稿成功',
                        type: 'success',
                        showClose: true,
                        duration: 1000
                    })
                }
                this.loading = false;
            },
            draftForm() {
                this.saveArticle(2);
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
