<template>
  <div class="full-screen">
    <div class="main-section flex-column">
      <iframe ref="activit" width="100%" height="100%" :src="src" style="border:none"></iframe>
    </div>
  </div>
</template>
<script>
    import config from '@/config'
    import {getToken} from '@/utils/auth'
    export default {
        computed: {
            src() {
                return '/modeler.html?modelId=1';
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
