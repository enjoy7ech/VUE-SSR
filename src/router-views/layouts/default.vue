<template>
  <default-layout></default-layout>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData() {
    console.log(22222222222)
  },
  mounted() {
    console.log(1231231)
  }
})
</script>
