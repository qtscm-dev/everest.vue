<template>
  <a-config-provider id="app" :locale="locale">
    <router-view v-if="isReloadData" />
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      locale: zhCN,
      isReloadData: true,
    };
  },
  methods: {
    reload() {
      this.isReloadData = false;
      this.$nextTick(function () {
        this.isReloadData = true;
      });
    },
  },
  mounted() {
    // this.$store.dispatch('asyncSetRouter')
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
.ant-tabs-bar {
  border-bottom: 0;
}
.has-error .ant-form-explain,
.has-error .ant-form-split {
  text-align: left;
}
.ant-table-footer {
  background: #fff;
}
.ant-select-selection:hover {
  cursor: pointer;
}
.ant-form-item-with-help {
  height: 78.89px;
}
.ant-col-8 {
  height: 102.8px;
}
.table-depa {
  background: #fafafa;
}
.table-proj {
  background: #fafafa;
}
.ant-tabs-nav-scroll {
  background: #fff;
  padding: 0 24px;
}
// .ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane,
// .ant-tabs .ant-tabs-bottom-content > .ant-tabs-tabpane {
//   padding: 0 24px;
// }
</style>
