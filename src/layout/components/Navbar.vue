<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
               @toggleClick="toggleSideBar"/>

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item"/>

        <error-log class="errLog-container right-menu-item hover-effect"/>

        <screenfull id="screenfull" class="right-menu-item hover-effect"/>

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect"/>
        </el-tooltip>

        <lang-select class="right-menu-item hover-effect"/>

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>
              {{ $t('navbar.profile') }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item command="updatePwd">
            {{ $t('navbar.updatePwd') }}
          </el-dropdown-item>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="formData" ref="dataForm" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-col :span="12">
              <el-form-item :label="$t('table.oldPwd')" prop="oldPwd">
                <el-input v-model="formData.oldPwd"/>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('table.newPwd')" prop="newPwd">
                <el-input v-model="formData.newPwd"/>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="save">
          {{ $t('table.save')}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import ErrorLog from '@/components/ErrorLog'
    import Screenfull from '@/components/Screenfull'
    import SizeSelect from '@/components/SizeSelect'
    import LangSelect from '@/components/LangSelect'
    import Search from '@/components/HeaderSearch'
    import {updateUserPassword} from '@/api/systemUser'

    export default {
        components: {
            Breadcrumb,
            Hamburger,
            ErrorLog,
            Screenfull,
            SizeSelect,
            LangSelect,
            Search
        },
        data() {
            return {
                dialogFormVisible: false,
                formData: {
                    oldPwd: null,
                    newPwd: null,
                },
                rules: {
                    oldPwd: [{ required: true, message: '原密码必填', trigger: 'change' }],
                    newPwd: [{ required: true, message: '新密码必填', trigger: 'change' }]
                },
            }
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar',
                'device'
            ])
        },

        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
            async logout() {
                await this.$store.dispatch('user/logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            },
            handleCommand(type) {
                if ('updatePwd' === type) {
                    this.dialogFormVisible = true;
                }
            },
            save() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        updateUserPassword(this.formData.oldPwd, this.formData.newPwd).then((res) => {
                            this.$message.success(res.message);
                            this.dialogFormVisible = false;
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
