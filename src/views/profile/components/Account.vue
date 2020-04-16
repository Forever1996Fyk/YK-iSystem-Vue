<template>
    <el-form ref="dataForm" :rules="rules" :model="formData" label-width="100px" v-loading="loading">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('table.userName')" prop="userName">
            <el-input v-model="formData.userName"/>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('table.nickName')" prop="nickName">
            <el-input v-model="formData.nickName"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('table.sex')" prop="sex">
            <el-select v-model="formData.sex" class="filter-item" placeholder="Please select" style="width:100%">
              <el-option v-for="item in sex" :key="item.key" :label="item.value" :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item :label="$t('table.marryFlag')" prop="marryFlag">
            <el-select v-model="formData.marryFlag" class="filter-item" placeholder="Please select"
                       style="width:100%">
              <el-option v-for="item in marryFlag" :key="item.key" :label="item.value" :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('table.education')" prop="education">
            <el-select v-model="formData.education" class="filter-item" placeholder="Please select"
                       style="width:100%">
              <el-option v-for="item in education" :key="item.key" :label="item.value" :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('table.age')" prop="age">
            <el-input v-model="formData.age"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('table.prov')" prop="prov">
            <el-select @change="choseProv" v-model="formData.prov" class="filter-item" placeholder="Please select"
                       style="width:100%">
              <el-option v-for="item in prov" :key="item.key" :label="item.value" :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('table.city')" prop="city">
            <el-select @change="choseCity" v-model="formData.city" class="filter-item" placeholder="Please select"
                       style="width:100%">
              <el-option v-for="item in city" :key="item.key" :label="item.value" :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item :label="$t('table.dist')" prop="dist">
            <el-select v-model="formData.dist" class="filter-item" placeholder="Please select" style="width:100%">
              <el-option v-for="item in dist" :key="item.key" :label="item.value" :value="item.key"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('table.address')" prop="address">
            <el-input v-model="formData.address"/>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('table.remark')" prop="remark">
            <el-input
              v-model="formData.remark"
              :autosize="{ minRows: 4, maxRows: 8}"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="editSave()">更新</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
    import {
        editSystemUser,
        getSystemUserById
    } from '@/api/systemUser'
    import baseData from '@/config/baseData'
    import area from '@/config/area.json'
    export default {
        props: {
            user: {
                type: Object,
                default: () => {
                    return {
                        userId: ''
                    }
                }
            }
        },
        data() {
            return {
                sex: baseData.sex,
                marryFlag: baseData.marryFlag,
                education: baseData.education,
                area,
                prov: [],
                city: [],
                dist: [],
                city1: [],
                dist1: [],
                loading: false,
                formData: {
                    id: '',
                    account: null,
                    userName: null,
                    nickName: null,
                    age: null,
                    sex: null,
                    marryFlag: null,
                    education: null,
                    phone: null,
                    email: null,
                    prov: null,
                    city: null,
                    dist: null,
                    address: null,
                },
                rules: {
                    // attrName: [{required: true, message: '必填', trigger: 'change'}],
                }
            }
        },
        created() {
            this.getAreaData();
            this.getSystemUserById();
        },
        methods: {
            getSystemUserById() {
                getSystemUserById(this.user.userId).then((res) => {
                    this.formData = res.data;
                    this.choseProv(this.formData.prov);
                    this.choseCity(this.formData.city);
                });
            },
            submit() {
                this.$message({
                    message: 'User information has been updated successfully',
                    type: 'success',
                    duration: 5 * 1000
                })
            },
            getAreaData() {
                var data = area;
                for (var item in data) {
                    if (item.match(/0000$/)) {//省
                        this.prov.push({key: item, value: data[item], children: []});
                    } else if (item.match(/00$/)) {//市
                        this.city1.push({key: item, value: data[item], children: []});
                    } else {
                        this.dist1.push({key: item, value: data[item]});
                    }
                }

                for (var index in this.prov) {
                    for (var index1 in this.city1) {
                        if (this.prov[index].key.slice(0, 2) === this.city1[index1].key.slice(0, 2)) {
                            this.prov[index].children.push(this.city1[index1])
                        }
                    }
                }

                for (var index in this.city1) {
                    for (var index1 in this.dist1) {
                        if (this.city1[index].key.slice(0, 2) ===this. dist1[index1].key.slice(0, 2)) {
                            this.city1[index].children.push(this.dist1[index1])
                        }
                    }
                }
            },
            //选省
            choseProv(e) {
                for (var index in this.prov) {
                    if (e === this.prov[index].key) {
                        this.city = this.prov[index].children;
                        this.dist = this.prov[index].children[0].children;
                        this.E = this.dist[0].key;
                    }
                }
            },
            //选市
            choseCity(e) {
                for (var index in this.city) {
                    if (e === this.city[index].key) {
                        this.dist = this.city[index].children;
                        this.E = this.dist[0].key;
                    }
                }
            },
            editSave() {
                this.loading = true;
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.formData);
                        editSystemUser(this.formData).then((res) => {
                            console.log(res)
                            this.$message.success(res.message)
                            this.loading = false;
                        })
                    }
                })
            },
        }
    }
</script>
