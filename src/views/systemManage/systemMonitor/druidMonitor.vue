<template>
  <iframe width="100%" height="850" :src="src" style="border:none"></iframe>
</template>
<script>
    export default {
        computed: {
            src() {
                return 'http://localhost:8769/druid/index.html';
            }
        },
    }
</script>
