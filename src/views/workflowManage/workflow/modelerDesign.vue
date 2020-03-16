<template>
  <iframe ref="activit" width="100%" height="850" :src="src" style="border:none"></iframe>
</template>
<script>
    import config from '@/config'
    import {getToken} from '@/utils/auth'
    export default {
        computed: {
            src() {
                const id = this.$route.params && this.$route.params.id
                return '/modeler.html?modelId=' + id;
            },
            token() {
                return getToken();
            },
            apiUrl() {
                return config.apiUrl.dev + '/workflow/api/activiti';
            }
        },
        mounted() {
            window.getMyVue = this;
        }
    }
</script>
