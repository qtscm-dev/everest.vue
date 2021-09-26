<template>
  <div id="components-badge-demo-title">
    <br />
    <br />
    <br />
    <a-badge :count="5" title="Custom hover text" :offset="[0, 40]">
      <a href="#" class="head-example" />
    </a-badge>
  </div>
</template>
<style scoped>
#components-badge-demo-title .ant-badge:not(.ant-badge-status) {
  margin-right: 20px;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
  display: inline-block;
}
</style>
