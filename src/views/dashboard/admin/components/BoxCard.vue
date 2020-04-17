<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div style="position:relative;">
      <pan-thumb :image="avatar" class="panThumb"/>
      <mallki class-name="mallki-text" text="YK-iSystem-Admin"/>
      <div style="padding-top:35px;" class="progress-item" v-for="item in skillsList">
        <span>{{item.skillsName}}</span>
        <el-progress :percentage="item.skillsSlider" :status="item.skillsSlider === 100?'success':''"/>
      </div>
    </div>
  </el-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import PanThumb from '@/components/PanThumb'
    import Mallki from '@/components/TextHoverEffect/Mallki'
    import {getUserIntroducesNoPage} from '@/api/userIntroduce'

    export default {
        components: {PanThumb, Mallki},

        filters: {
            statusFilter(status) {
                const statusMap = {
                    success: 'success',
                    pending: 'danger'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                skillsList: []
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'avatar',
                'roles'
            ])
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                getUserIntroducesNoPage().then((res) => {
                    if (res.data.length > 0) {
                        if (!res.data[0].skills) {
                            this.skillsList = [];
                        } else {
                            this.skillsList = res.data[0].skillsList;
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
  .box-card-component {
    .el-card__header {
      padding: 0px !important;
    }
  }
</style>
<style lang="scss" scoped>
  .box-card-component {
    .box-card-header {
      position: relative;
      height: 220px;

      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;

        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }

    .mallki-text {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 20px;
      font-weight: bold;
    }

    .panThumb {
      z-index: 100;
      height: 70px !important;
      width: 70px !important;
      position: absolute !important;
      top: -45px;
      left: 0px;
      border: 5px solid #ffffff;
      background-color: #fff;
      margin: auto;
      box-shadow: none !important;

      /deep/ .pan-info {
        box-shadow: none !important;
      }
    }

    .progress-item {
      margin-bottom: 10px;
      font-size: 14px;
    }

    @media only screen and (max-width: 1510px) {
      .mallki-text {
        display: none;
      }
    }
  }
</style>
