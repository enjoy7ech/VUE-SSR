<template>
  <div id="header">
    <img class="top-banner" src="./images/top.png" alt />
    <div class="mini-header">
      <div class="mini-header-content">
        <span class="item">主站</span>
        <span class="item">番剧</span>
        <span class="item">游戏中心</span>
      </div>
    </div>
    <div>{{loginTime}}</div>
    {{$store.state.user}}
  </div>
</template>

<script src="./component.ts"></script>
<style lang="stylus" scoped src="./style.stylus"></style>