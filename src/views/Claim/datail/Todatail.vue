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
      <a-tabs :tabBarGutter="0" default-active-key="2">
        <a-tab-pane key="1" tab="概要信息">
          <BasicInfo
            class="basic"
            :ProjectBasicInfo="ProjectBasicInfo"
            :badges="badges"
            :msg="msg"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="项目部门">
          <DepartInfo :prodepa="prodepa" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="联系人"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="4" tab="项目文件"> Content of Tab Pane 3 </a-tab-pane>
        <a-tab-pane key="5" tab="操作记录"> Content of Tab Pane 3 </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { Modal, message } from "ant-design-vue";
import BasicInfo from "../../../components/ProjectDetail/BasicInfo";
import DepartInfo from "../../../components/ProjectDetail/DepartInfo";
export default {
  name: "Todatail",
  components: { BasicInfo, DepartInfo },
  inject: ["reload"],
  data() {
    return {
      id: this.$router.currentRoute.params.id.slice(4),
      // 按钮
      styles: "",
      stylez: "",
      stylep: "",
      // 概要信息
      ProjectBasicInfo: {},
      badges: {},
      msg: "",
      // 项目部门
      prodepa: "",
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
            this.styles = "display: none";
            this.stylep = "margin-left: 16px";
          } else if (this.ProjectBasicInfo.sub_status == "3000") {
            this.badges = "success";
            this.msg = "已认领";
            this.styles = "margin-right: 16px";
            this.stylez = "display: none";
            this.stylep = "display: none";
          } else if (this.ProjectBasicInfo.sub_status == "2111") {
            this.badges = "error";
            this.msg = "已撤回";
            this.styles = "margin-right: 16px";
            this.stylez = "display: none";
            this.stylep = "display: none";
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
                that.reload();
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
                that.reload();
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
      this.$api.get(this.baseURL + "", {
        params: {},
        headers: {},
      });
    },
  },
  mounted() {
    // 概要信息
    this.handlerBasic();
    // 项目部门
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
