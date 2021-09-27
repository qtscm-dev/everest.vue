<template>
  <div>
    <div class="header">
      <a-breadcrumb>
        <a-breadcrumb-item><a href="javascript;">首页</a></a-breadcrumb-item>
        <a-breadcrumb-item
          ><a href="javascript;">项目管理</a></a-breadcrumb-item
        >
      </a-breadcrumb>
      <h3>
        项目管理
        <span>
          <a-dropdown placement="bottomRight">
            <a-button>返回</a-button>
            <a-menu slot="overlay">
              <a-menu-item>
                <router-link :to="{ name: 'claimIndex' }"
                  >返回列表页</router-link
                >
              </a-menu-item>
              <a-menu-item>
                <router-link href="javascript:;" :to="{ name: 'Favordatail' }"
                  >返回收藏夹</router-link
                >
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-button type="primary" style="margin-left: 16px">认领项目</a-button>
        </span>
      </h3>
      <a-tabs :tabBarGutter="0" default-active-key="1">
        <a-tab-pane key="1" tab="概要信息">
          <BasicInfo
            class="basic"
            :ProjectBasicInfo="ProjectBasicInfo"
            :badges="badges"
            :msg="msg"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="项目部门"> Content of Tab Pane 2 </a-tab-pane>
        <a-tab-pane key="3" tab="联系人"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="4" tab="项目文件"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="5" tab="操作记录"> Content of Tab Pane 3 </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import BasicInfo from "../../../components/ProjectDetail/BasicInfo";
export default {
  name: "Favtodatail",
  components: { BasicInfo },
  data() {
    return {
      id: this.$router.currentRoute.params.id.slice(4),
      // 概要信息
      ProjectBasicInfo: "",
      badges: "",
      msg: "",
    };
  },
  methods: {
    // 概要信息
    handlerBasic() {
      this.$api
        .get(this.baseURL + "claim/claim_detail/", {
          params: {
            sub_id: this.id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.ProjectBasicInfo = result.sub_info[0];
          if (this.ProjectBasicInfo.sub_status == "2100") {
            this.badges = "default";
            this.msg = "待认领";
          } else if (this.ProjectBasicInfo.sub_status == "3000") {
            this.badges = "success";
            this.msg = "已认领";
          } else if (this.ProjectBasicInfo.sub_status == "2111") {
            this.badges = "error";
            this.msg = "已撤回";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.handlerBasic();
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 125px;
  padding: 18px 24px;
  box-sizing: border-box;
  background: #fff;
}
.header > h3 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.basic {
  background: #fff;
}
</style>
