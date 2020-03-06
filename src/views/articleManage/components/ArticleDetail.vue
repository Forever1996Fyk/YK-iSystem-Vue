<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <CommentDropdown v-model="postForm.comment"/>
        <PlatformDropdown v-model="postForm.platforms"/>
        <SourceUrlDropdown v-model="postForm.source_uri"/>
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Publish
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          Draft
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="10">
                  <el-form-item label-width="120px" :label="$t('table.publishTime')" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.publishTime" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="Select date and time"/>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="90px" :label="$t('table.importance')" class="postInfo-container-item">
                    <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display:inline-block"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="Summary:">
          <el-input v-model="postForm.articleSummary" :rows="1" type="textarea" class="article-textarea" autosize
                    placeholder="Please enter the content"/>
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400"/>
        </el-form-item>

        <el-form-item prop="articleCover" style="margin-bottom: 30px;">
          <Upload v-model="postForm.articleCover" :articleCoverUrl = "postForm.articleCoverUrl"/>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
    import Tinymce from '@/components/Tinymce'
    import Upload from '@/components/Upload/SingleImage3'
    import MDinput from '@/components/MDinput'
    import Sticky from '@/components/Sticky' // 粘性header组件
    import {validURL} from '@/utils/validate'
    import {addArticle, editArticle, getArticleById} from '@/api/article'
    import {CommentDropdown, PlatformDropdown, SourceUrlDropdown} from './Dropdown'
    import {formatDate} from '@/utils'

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
        components: {Tinymce, MDinput, Upload, Sticky, CommentDropdown, PlatformDropdown, SourceUrlDropdown},
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
</style>
