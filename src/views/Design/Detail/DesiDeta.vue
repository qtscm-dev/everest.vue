<template>
  <div>
    <div class="header">
      <span>{{ status.msg }}项目</span>
      <div style="float: right">
        <a-button :style="style3" type="danger" ghost @click="handlerEnding"
          >中止立项</a-button
        >
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
        <a-button :style="style1" type="primary" @click="handlerPerson"
          >分配负责人</a-button
        >
        <a-button :style="style2" type="primary" @click="handlerAction"
          >开始设计</a-button
        >
      </div>
    </div>
    <a-tabs :tabBarGutter="0" default-active-key="1">
      <a-tab-pane key="1" tab="概要信息">
        <ProjectBasicInfo
          :ProjectBasicInfo="projectBasicInfo"
          :status="status"
          class="summary"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="项目部门" force-render>
        <DepartInfo :prodepa="prodepa" class="depar" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="联系人">
        <ContactInfo :contactsList="contactsList" :contact_typ="contact_typ" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="项目文件">
        <DocumentInfo :proj_doculist="proj_doculist" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import ProjectBasicInfo from "../../../components/ProjectDetail/BasicInfo";
import DepartInfo from "../../../components/ProjectDetail/DepartInfo";
import ContactInfo from "../../../components/ProjectDetail/ContactInfo";
import DocumentInfo from "../../../components/ProjectDetail/DocumentInfo";
import { message } from "ant-design-vue";
export default {
  name: "DesiDeta",
  components: { ProjectBasicInfo, DepartInfo, ContactInfo, DocumentInfo },
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
      // 项目部门
      prodepa: [],
      // 联系人
      contactsList: [],
      contact_typ: [],
      // 项目文件
      proj_doculist: [],
    };
  },
  methods: {
    // 概要信息
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
    // 项目部门
    getProdepa() {
      this.$api
        .get(this.baseURL + "project/proj_dept", {
          params: {
            proj_id: this.id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          if (result.datarows) {
            this.prodepa = result.datarows;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 联系人
    getContacts() {
      this.$api
        .get(this.baseURL + "project/proj_contact", {
          params: {
            proj_id: this.id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          if (result.datarows) {
            this.contactsList = result.datarows;
          }
          this.contact_typ = result.contact_typ;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 项目文件
    getProjdoculist() {
      this.$api
        .get(this.baseURL + "project/proj_file", {
          params: {
            proj_id: this.id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          if (result.datarows) {
            this.proj_doculist = result.datarows;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 分配负责人
    handlerPerson() {
      this.$router.push({ name: "DesignPerson" });
    },
    // 中止项目
    handlerEnding() {
      var qs = require("qs");
      let params = {
        sub_id: this.id,
      };
      this.$api
        .post(this.baseURL + "design/revoke_design/", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success("中止立项成功");
            this.$router.push({ name: "DesignIndex" });
          } else {
            message.error("中止立项失败");
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 开始设计
    handlerAction() {
      var qs = require("qs");
      let params = {
        sub_id: this.id,
      };
      this.$api
        .post(this.baseURL + "design/start_design/", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success("成功");
            this.$router.push({ name: "DesignIndex" });
          } else {
            message.error("失败");
          }
        });
    },
  },
  mounted() {
    this.getIndex();
    this.getProdepa();
    this.getContacts();
    this.getProjdoculist();
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
  width: 97%;
  margin: 12px 24px 24px;
}
</style>
