<template>
  <div>
    <div class="header">
      <span>{{ stat }}项目</span>
      <div style="float: right">
        <a-button :style="style3" type="danger" ghost>中止立项</a-button>
        <a-dropdown placement="bottomRight">
          <a-button>返回</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link :to="{ name: 'DesignIndex' }"
                >返回列表页</router-link
              >
            </a-menu-item>
            <a-menu-item>
              <router-link href="javascript:;" :to="{ name: 'index' }"
                >返回首页</router-link
              >
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-button :style="style1" type="primary">分配负责人</a-button>
        <a-button :style="style2" type="primary">开始设计</a-button>
      </div>
    </div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="概要信息">
        <ProjectBasicInfo
          :ProjectBasicInfo="projectBasicInfo"
          :status="status"
          class="summary"
        />
      </a-tab-pane>
      <!-- <a-tab-pane key="2" tab="Tab 2" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3"> Content of Tab Pane 3 </a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script>
import ProjectBasicInfo from "../../../components/ProjectDetail/BasicInfo";
export default {
  name: "DesiDeta",
  components: { ProjectBasicInfo },
  data() {
    return {
      stat: "",
      id: this.$router.currentRoute.params.id.slice(4),
      // 按钮
      style1: "display: none",
      style2: "display: none",
      style3: "display: none",
      // 概要信息
      projectBasicInfo: {},
      status: {},
    };
  },
  methods: {
    getIndex() {
      this.$api
        .get(this.baseURL + "design/design_detail/", {
          params: {
            sub_id: this.id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.projectBasicInfo = result.project_info[0];
          console.log(this.projectBasicInfo.status);
          if (this.projectBasicInfo.status == "1000") {
            this.status.badge = "default";
            this.status.msg = "待分配";
            this.style1 = "dispaly: block; margin-left: 16px";
          } else if (this.projectBasicInfo.status == "2000") {
            this.status.badge = "default";
            this.status.msg = "待开始";
            this.style2 = "dispaly: block; margin-left: 16px";
          } else if (this.projectBasicInfo.status == "3000") {
            this.status.badge = "processing";
            this.status.msg = "设计中";
            this.style3 = "dispaly: block; margin-right: 16px";
          } else if (this.projectBasicInfo.status == "4000") {
            this.status.badge = "success";
            this.status.msg = "设计归档";
          } else if (this.projectBasicInfo.status == "5000") {
            this.status.badge = "processing";
            this.status.msg = "设计交付";
          } else if (this.projectBasicInfo.status == "9111") {
            this.status.badge = "error";
            this.status.msg = "已中止";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getIndex();
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  padding: 18px 24px;
  box-sizing: border-box;
  background: #fff;
}
.header > span {
  font-size: 20px;
  color: #000;
  font-weight: bold;
}
.summary {
  margin: 12px 24px 24px;
}
</style>
