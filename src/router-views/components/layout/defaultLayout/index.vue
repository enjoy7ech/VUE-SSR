<template>
  <div id="layout-container">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div id="router-view"></div>
    <app-footer></app-footer>
  </div>
</template>
<style lang="stylus" scoped>
#router-view
  display inline-block
  margin-top 80px
  vertical-align text-top
  margin-left 260px
</style>
