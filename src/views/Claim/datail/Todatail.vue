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
          <a-button
            type="danger"
            :style="styles"
            ghost
            @click="handlerWaidatail"
            >放弃认领</a-button
          >
          <a-button-group>
            <a-dropdown placement="bottomRight">
              <a-button>返回</a-button>
              <a-menu slot="overlay">
                <a-menu-item>
                  <router-link :to="{ name: 'claimIndex' }"
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
            <a-button :style="stylez" @click="handlerFavoir"
              >加入收藏夹</a-button
            ></a-button-group
          >
          <a-button type="primary" :style="stylep" @click="handlerDatail"
            >认领项目</a-button
          >
        </span>
      </h3>
      <a-tabs :tabBarGutter="0" default-active-key="1" ref="hides">
        <a-tab-pane key="1" tab="概要信息">
          <BasicInfo
            class="basic"
            :ProjectBasicInfo="ProjectBasicInfo"
            :status="status"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="项目部门" class="hidess">
          <DepartInfo :prodepa="prodepa" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="联系人">
          <ContactInfo
            :contactsList="contactsList"
            :contact_typ="contact_typ"
          />
        </a-tab-pane>
        <a-tab-pane key="4" tab="项目文件">
          <DocumentInfo :proj_doculist="proj_doculist" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { Modal, message } from "ant-design-vue";
import BasicInfo from "../../../components/ProjectDetail/BasicInfo";
import DepartInfo from "../../../components/ProjectDetail/DepartInfo";
import ContactInfo from "../../../components/ProjectDetail/ContactInfo";
import DocumentInfo from "../../../components/ProjectDetail/DocumentInfo";
export default {
  name: "Todatail",
  components: { BasicInfo, DepartInfo, ContactInfo, DocumentInfo },
  inject: ["reload"],
  data() {
    return {
      id: this.$router.currentRoute.params.id.slice(4),
      // 按钮
      styles: "",
      stylez: "",
      stylep: "",
      // 状态
      disabled: "",
      // 概要信息
      ProjectBasicInfo: {},
      status: {
        badges: "",
        msg: "",
      },
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
            this.status.badge = "default";
            this.status.msg = "待认领";
            this.styles = "display: none";
            this.stylep = "margin-left: 16px";
            this.disabled = "disabled";
          } else if (this.ProjectBasicInfo.sub_status == "3000") {
            this.status.badge = "success";
            this.status.msg = "已认领";
            this.styles = "margin-right: 16px";
            this.stylez = "display: none";
            this.stylep = "display: none";
            this.disabled = "";
          } else if (this.ProjectBasicInfo.sub_status == "2111") {
            this.status.badge = "error";
            this.status.msg = "已撤回";
            this.styles = "margin-right: 16px";
            this.stylez = "display: none";
            this.stylep = "display: none";
            this.disabled = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 认领项目
    handlerDatail() {
      let that = this;
      var qs = require("qs");
      let params = {
        sub_id: this.id,
      };
      Modal.confirm({
        title: "认领项目",
        content: "请确定是否要领取该项目",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          that.$api
            .post(that.baseURL + "claim/claim_proj/", qs.stringify(params), {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            })
            .then((res) => {
              if (res.data.code) {
                message.success(that.ProjectBasicInfo.code + "认领成功");
                that.$router.push({ name: "claimIndex" });
              } else {
                message.error(that.ProjectBasicInfo.code + "认领失败");
              }
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    // 放弃认领
    handlerWaidatail() {
      let that = this;
      let qs = require("qs");
      let params = {
        sub_id: that.id,
      };
      Modal.confirm({
        title: "放弃认领",
        content: "请确定是否要放弃认领该项目",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          that.$api
            .post(that.baseURL + "claim/discard_claim/", qs.stringify(params), {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            })
            .then((res) => {
              if (res.data.code) {
                message.success(that.ProjectBasicInfo.code + "放弃认领成功");
                that.$router.push({ name: "claimIndex" });
              } else {
                message.error(res.data.data.errmsg);
              }
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      });
    },
    // 加入收藏夹
    handlerFavoir() {
      let qs = require("qs");
      let params = {
        sub_id: this.id,
      };
      this.$api
        .post(this.baseURL + "claim/add_collect/", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success(this.ProjectBasicInfo.code + "加入收藏夹成功");
          } else {
            message.error(res.data.data.errmsg);
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 项目部门
    handlerDepart() {
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
  },
  mounted() {
    // 概要信息
    this.handlerBasic();
    // 项目部门
    this.handlerDepart();
    // 联系人
    this.getContacts();
    // 项目文件
    this.getProjdoculist();
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
