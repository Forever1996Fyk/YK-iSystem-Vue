<template>
    <el-tabs v-model="activeName">
      <el-tab-pane label="Eureka Monitor" name="Eureka">
        <iframe width="100%" height="850" :src="eurekaSrc" style="border:none"></iframe>
      </el-tab-pane>
      <el-tab-pane label="Admin Monitor" name="Admin">
        <iframe width="100%" height="850" :src="adminSrc" style="border:none"></iframe>
      </el-tab-pane>
    </el-tabs>
</template>
<script>
    export default {
        data() {
            return {
                activeName: 'Eureka'
            };
        },
        computed: {
            eurekaSrc() {
                return 'http://localhost:8761';
            },
            adminSrc() {
                return 'http://localhost:8184';
            },
        },
    }
</script>
