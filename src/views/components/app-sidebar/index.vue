<template>
  <div id="sideBar" ref="sideBar">
    <div :class="[fixed && 'fixed', 'sidebar-content']">
      <div class="bar-item" v-for="(item, index) in menus" :key="index">
        <div class="bar-h1 active">
          <i class="fa fa-circle-o"></i>
          <span class="h1-text">
            {{ item.name }}
          </span>
          <span class="h1-right-tool">
            <i class="fa fa-angle-down"></i>
          </span>
        </div>
        <div class="bar-h2" v-for="(item2, index2) in item.children" :key="index2">
          <span class="h2-text">{{ item2.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./component.ts" lang="ts"></script>
<style lang="stylus" scoped src="./style.stylus"></style>
