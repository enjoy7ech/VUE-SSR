<template>
  <div id="sideBar" :class="[fixed && 'fixed']" ref="sideBar">
    <div class="sidebar-content">
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
        <router-link
          class="bar-h2"
          v-for="(item2, index2) in item.children"
          :key="index2"
          :to="{ name: item2.routeName }"
          active-class="active"
          exact
          tag="div"
        >
          <span class="h2-text">{{ item2.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script src="./component.ts" lang="ts"></script>
<style lang="scss" scoped src="./style.scss"></style>
