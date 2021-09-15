<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="../../../public/favicon.png" />
        <span>中南幕墙</span>
      </div>
      <SiderMenu />
    </a-layout-sider>
    <a-layout>
      <!-- 头部 -->
      <a-layout-header
        style="
          background: #fff;
          padding: 0 24px;
          border-bottom: 1px solid #e8e8e8;
        "
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="icon">
          <a-icon class="icon-1" type="search" />
          <a-icon class="icon-1" type="bell" />
          <!-- <div> -->
          <img :src="imgSrc" alt="" />
          <span>{{ loginname }}</span>
          <!-- </div> -->
        </div>
      </a-layout-header>
      <!-- 主体 -->
      <a-layout-content>
        <!-- <Header /> -->
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import SiderMenu from "./SiderMenu.vue";
export default {
  name: "index",
  data() {
    return {
      collapsed: false,
      imgSrc: "",
      loginname: "",
    };
  },
  methods: {
    handlerLogin() {
      this.$api
        .get(this.baseURL + "dept/dept/", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data;
          this.loginname = result.login_nm;
          this.imgSrc = result.avatar;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.handlerLogin();
  },
  components: {
    SiderMenu,
  },
};
</script>

<style>
#components-layout-demo-custom-trigger {
  width: 100%;
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.icon {
  width: auto;
  float: right;
  /* padding: 0 24px; */
  text-align: center;
}
.icon-1 {
  margin-right: 8px;
}
.icon > img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 8px;
}
.icon span {
  font-size: 14px;
}
#components-layout-demo-custom-trigger .logo {
  height: 43px;
  margin: 16px;
}
.logo img {
  width: 43px;
  height: 43px;
}
.logo span {
  font-size: 20px;
  color: #fff;
}
</style>
