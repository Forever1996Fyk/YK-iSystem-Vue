<template>
  <div class="login-container">
    <el-form ref="dataForm" :model="registerForm" :rules="registerRules" class="login-form" autocomplete="on"
             label-position="left">

      <div class="title-container">
        <h3 class="title">
          {{ $t('register.registerTitle') }}
        </h3>
        <lang-select class="set-language"/>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="userName"
          v-model="registerForm.userName"
          :placeholder="$t('register.username')"
          name="userName"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            :placeholder="$t('register.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </el-form-item>
      </el-tooltip>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="rePassword">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
          <el-input
            :key="passwordType"
            ref="rePassword"
            v-model="registerForm.rePassword"
            :type="passwordType"
            :placeholder="$t('register.rePassword')"
            name="rePassword"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email"/>
        </span>
        <el-input
          v-model="registerForm.email"
          :placeholder="$t('register.email')"
          name="email"
          type="text">

        </el-input>

        <el-button type="primary" class="sendCode" @click="sendCode()">发送验证码</el-button>
      </el-form-item>

      <el-form-item prop="checkCode">
        <span class="svg-container">
          <svg-icon icon-class="verification"/>
        </span>
        <el-input
          ref="checkCode"
          v-model="registerForm.checkCode"
          :placeholder="$t('register.checkCode')"
          name="checkCode"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleRegister">
        {{ $t('register.register') }}
      </el-button>

      <div style="position:relative">
        <router-link :to="'/login'" class="register" >用户登录</router-link>
      </div>
    </el-form>

  </div>
</template>

<script>
    import LangSelect from '@/components/LangSelect'
    import {emailRegistered, sendRegisterEmail} from '@/api/auth'

    export default {
        name: 'Login',
        components: {LangSelect},
        data() {
            return {
                registerForm: {
                    userName: '',
                    password: '',
                    rePassword: '',
                    email: '',
                    checkCode: '',
                },
                registerRules: {
                    userName: [{required: true, message: '用户名必填', trigger: 'change'}],
                    password: [{required: true, message: '密码必填', trigger: 'change'}],
                    rePassword: [{required: true, message: '确认密码必填', trigger: 'change'}],
                    email: [{required: true, message: '邮箱必填', trigger: 'change'}],
                    checkCode: [{required: true, message: '验证码必填', trigger: 'change'}],
                },
                passwordType: 'password',
                capsTooltip: false,
                loading: false,
                showDialog: false,
                redirect: undefined,
                otherQuery: {}
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    const query = route.query
                    if (query) {
                        this.redirect = query.redirect
                        this.otherQuery = this.getOtherQuery(query)
                    }
                },
                immediate: true
            }
        },
        created() {
            // window.addEventListener('storage', this.afterQRScan)
        },
        mounted() {
            if (this.registerForm.userName === '') {
                this.$refs.userName.focus()
            } else if (this.registerForm.password === '') {
                this.$refs.password.focus()
            } else if (this.registerForm.email === '') {
                this.$refs.email.focus()
            } else if (this.registerForm.checkCode === '') {
                this.$refs.checkCode.focus()
            }
        },
        destroyed() {
            // window.removeEventListener('storage', this.afterQRScan)
        },
        methods: {
            sendCode() {
                if (!this.registerForm.email) {
                    this.$message.warning('请填写邮箱');
                    return;
                }
                if (!this.registerForm.userName) {
                    this.$message.warning('请填写用户名');
                    return;
                }
                sendRegisterEmail(this.registerForm.email, this.registerForm.userName).then((res) => {
                    this.$message.success(res.message);
                })
            },
            checkCapslock(e) {
                const {key} = e
                this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            handleRegister() {
                this.$refs['dataForm'].validate(valid => {
                    if (valid) {
                        if (this.registerForm.password !== this.registerForm.rePassword) {
                            this.$message.warning('两次密码输入不一致, 请确认密码');
                            return ;
                        }
                        this.loading = true;
                        var that = this;
                        emailRegistered(this.registerForm).then((res) => {
                            this.$message({
                                showClose: true,
                                message: res.message,
                                type: 'success',
                                duration: 3000,
                                onClose: function () {
                                    that.loading = false;
                                    that.$router.push({path: '/login'})
                                }
                            })
                        })
                            .catch(() => {
                                this.loading = false
                            })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur]
                    }
                    return acc
                }, {})
            }
        }
    }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 130px;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

  .register {
    font-size: 14px;
    margin-bottom: 10px;
    color: #2aabd2;
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .sendCode {
      padding: 15px 15px 15px 15px;
      color: red;
      vertical-align: middle;
      height: 49px;
      position: absolute;
      right: 0;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
