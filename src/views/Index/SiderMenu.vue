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
          <router-link :to="{ name: 'project' }">公司项目</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title"><a-icon type="form" /><span>认领中心</span></span>
        <a-menu-item key="41">
          <router-link :to="{ name: 'claimIndex' }">部门项目</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub5">
        <span slot="title"><a-icon type="form" /><span>设计中心</span></span>
        <a-menu-item key="51">
          <router-link :to="{ name: 'claimIndex' }">部门项目</router-link>
        </a-menu-item>
      </a-sub-menu>
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
