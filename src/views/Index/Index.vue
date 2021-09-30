<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img
          src="../../../public/favicon.png"
          style="float: left; margin: 0 auto"
        />
        <span
          :style="[
            { display: collapsed ? 'none' : 'block' },
            { float: 'left' },
          ]"
          >中南幕墙</span
        >
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
          <a-icon class="icon-1" type="question-circle" />
          <a-icon class="icon-1" type="bell" />
          <a-dropdown placement="bottomRight">
            <div class="icon_log">
              <a-avatar class="icpn_ava" :src="imgSrc" alt="" />{{ loginname }}
            </div>
            <a-menu slot="overlay">
              <a-menu-item>
                <router-link :to="{ name: 'index' }">
                  <a-icon type="home" />&nbsp;&nbsp;个人主页
                </router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link :to="{ name: 'index' }">
                  <a-icon type="tool" />&nbsp;&nbsp;修改密码
                </router-link>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item>
                <router-link :to="{ name: 'index' }">
                  <a-icon type="logout" />&nbsp;&nbsp;退出登录
                </router-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <!-- 主体 -->
      <a-layout-content>
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
          this.imgSrc = this.baseURL + result.avatar;
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
  font-size: 14px;
  text-align: center;
}
.icon_log {
  width: 100px;
  height: 60px;
  float: right;
}
.icon_log:hover {
  cursor: pointer;
  background: #fafafa;
}
.icon-1 {
  margin-right: 24px;
}
.icon-1:hover {
  cursor: pointer;
}
.icpn_ava {
  margin-right: 8px;
}
.icon > img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 8px;
}
.logo img {
  width: 32px;
  height: 32px;
  margin-right: 6px;
}
.logo span {
  font-size: 20px;
  color: #fff;
  text-align: center;
}
.logo {
  width: 100%;
  height: 60px;
  padding: 18px 24px;
  box-sizing: border-box;
}
</style>
