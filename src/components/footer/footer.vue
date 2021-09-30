<template>
  <div class="footer">
    copyright&nbsp;&nbsp;©&nbsp;&nbsp;{{
      dataTime
    }}&nbsp;&nbsp;浙江中南建设有限公司
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      dataTime: "2021",
    };
  },
};
</script>

<style>
.footer {
  height: 170px;
  padding: 48px 24px;
  box-sizing: border-box;
  line-height: 170px;
  text-align: center;
  font-size: 14px;
}
</style>
