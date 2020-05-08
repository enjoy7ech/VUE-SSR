<template>
  <div id="layout-container">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div id="router-view">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<style lang="scss" scoped>
#router-view {
  display: inline-block;
  margin-top: 80px;
  vertical-align: text-top;
  margin-left: 260px;
}
</style>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData() {
    console.log(123123)
  },
  mounted() {
    console.log(1231231)
  }
})
</script>
