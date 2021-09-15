<template>
  <div style="width: 200px">
    <!-- 菜单栏 -->
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-sub-menu key="sub1">
        <span slot="title"
          ><a-icon type="contacts" /><span>通讯录管理</span></span
        >
        <a-menu-item key="1">
          <router-link :to="{ name: 'department' }">部门管理</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="{ name: 'employee' }">员工管理</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="form" /><span>立项中心</span></span>
        <a-menu-item key="3">
          <router-link :to="{ name: 'project' }">立项中心</router-link>
        </a-menu-item>
      </a-sub-menu>
      <!-- <a-sub-menu key="sub3">
        <span slot="title"><a-icon type="form" /><span>指派中心</span></span>
        <a-menu-item key="4">
          <router-link :to="{ name: 'assign' }">指派中心</router-link>
        </a-menu-item>
      </a-sub-menu> -->
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "SiderMenu",
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
