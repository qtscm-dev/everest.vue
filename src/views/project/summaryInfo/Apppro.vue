<template>
  <div>
    <div class="header">
      <div>
        <span class="ss">立项中心</span>
        <div style="float: right">
          <a-button :style="styles" type="danger" ghost @click="handlerWithpro"
            >中止立项</a-button
          >
          <a-dropdown placement="bottomRight">
            <a-button>返回</a-button>
            <a-menu slot="overlay">
              <a-menu-item>
                <router-link :to="{ name: 'project' }">返回列表页</router-link>
              </a-menu-item>
              <a-menu-item>
                <router-link href="javascript:;" :to="{ name: 'index' }"
                  >返回首页</router-link
                >
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-button :style="styless" type="primary" @click="handlerRecover"
            >恢复项目</a-button
          >
        </div>
      </div>
    </div>
    <a-tabs :tabBarGutter="0" class="apppro-tabs" default-active-key="1">
      <a-tab-pane key="1" tab="概要信息">
        <ProjectBasicInfo
          :ProjectBasicInfo="projectBasicInfo"
          :status="status"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="项目部门" force-render>
        <DepartInfo :prodepa="prodepa" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="联系人">
        <ContactInfo :contactsList="contactsList" :contact_typ="contact_typ" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="项目文件">
        <DocumentInfo :proj_doculist="proj_doculist" />
      </a-tab-pane>
    </a-tabs>
    <Footer class="footent" />
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
import ProjectBasicInfo from "../../../components/ProjectDetail/BasicInfo";
import DepartInfo from "../../../components/ProjectDetail/DepartInfo";
import ContactInfo from "../../../components/ProjectDetail/ContactInfo";
import DocumentInfo from "../../../components/ProjectDetail/DocumentInfo";
import Footer from "../../../components/Footer/Footer";
export default {
  name: "apppro",
  components: {
    ProjectBasicInfo,
    DepartInfo,
    ContactInfo,
    DocumentInfo,
    Footer,
  },
  data() {
    return {
      param: this.$router.currentRoute.params.id.slice(4),
      styles: "margin-right:16px",
      styless: "margin-left:16px",
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      // 概要信息
      projectBasicInfo: {},
      status: {
        badges: "",
        msg: "",
      },
      // 项目部门
      prodepa: [],
      // 联系人列表
      contactsList: [],
      contact_typ: [],
      // 项目文件
      proj_doculist: [],
    };
  },
  methods: {
    // 参数获取
    parameter() {
      this.$api
        .get(this.baseURL + "project/project_detail/", {
          params: {
            project_id: this.param,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          this.projectBasicInfo = result.data.data.project_info[0];
          if (this.projectBasicInfo.status == 2000) {
            this.status.badge = "processing";
            this.status.msg = "已立项";
            this.styles = "margin-right: 16px";
            this.styless = "display: none";
          } else if (this.projectBasicInfo.status == 1211) {
            this.status.badge = "error";
            this.status.msg = "已中止";
            this.styless = "margin-left: 16px";
            this.styles = "display: none";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 中止立项
    handlerWithpro() {
      let that = this;
      Modal.confirm({
        title: "中止项目",
        content: (
          <div>
            <a-form>
              <a-form-item label="请输入“确定中止”以校验是否误操作">
                <a-input class="withpro_inp" placeholder="确定中止" />
              </a-form-item>
              <a-textarea
                class="withpro_text"
                placeholder="请输入原因（选填）"
              />
            </a-form>
          </div>
        ),
        cancelText: "取消",
        okText: "确定",
        onOk() {
          let inp = document.getElementsByClassName("withpro_inp")[0].value;
          let texta = document.getElementsByClassName("withpro_text")[0].value;
          if (inp == "确定中止") {
            if (texta == "") {
              that.handlerWithpros();
            } else {
              that.handlerWithpros(texta);
            }
          } else {
            that.handlerWagin();
          }
        },
        onCancel() {
          that.$router.push({ name: "project" });
        },
      });
    },
    handlerWagin() {
      let that = this;
      Modal.error({
        title: "中止项目",
        content: (
          <div>
            <a-input class="withpro_inpu" placeholder="确定中止" />
            <span style="color: red; font-size: 12px">
              输入内容有误，请重新输入“确定中止”以校验是否误操作
            </span>
            <br />
            <br />
            <a-textarea
              class="withpro_texta"
              placeholder="请输入原因（选填）"
            />
          </div>
        ),
        cancelText: "取消",
        okText: "确定",
        maskClosable: true,
        onOk() {
          let inp = document.getElementsByClassName("ant-inputu")[0].value;
          let texta =
            document.getElementsByClassName("ant-withpro_texta")[0].value;
          if (inp == "确定中止") {
            if (texta == "") {
              that.handlerWithpros();
            } else {
              that.handlerWithpros(texta);
            }
          } else {
            that.handlerWagin();
          }
          console.log(that);
        },
        onCancel() {
          Modal.destroy();
        },
      });
    },
    handlerWithpros(reas) {
      let that = this;
      that.$api
        .get(this.baseURL + "project/revoke_proj/", {
          params: {
            project_id: that.param,
            reason: reas,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          console.log(res);
          that.$router.push({ name: "project" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 恢复项目
    handlerRecover() {
      let that = this;
      Modal.confirm({
        title: "恢复项目",
        content: (
          <div>
            <a-form>
              <a-form-item label="请输入“恢复项目”以校验是否误操作">
                <a-input class="recover_inp" placeholder="恢复项目" />
              </a-form-item>
            </a-form>
          </div>
        ),
        cancelText: "取消",
        okText: "确定",
        onOk() {
          let inp = document.getElementsByClassName("recover_inp")[0].value;
          if (inp == "恢复项目") {
            that.handlerRecovers();
          } else {
            that.handlerRagin();
          }
        },
      });
    },
    handlerRagin() {
      let that = this;
      Modal.confirm({
        title: "恢复项目",
        content: (
          <div>
            <a-input class="withpro_inp" placeholder="恢复项目" />
            <span style="color: red; font-size: 12px">
              输入内容有误，请重新输入“恢复项目”以校验是否误操作
            </span>
          </div>
        ),
        cancelText: "取消",
        okText: "确定",
        onOk() {
          let inp = document.getElementsByClassName("withpro_inp")[0].value;
          if (inp == "恢复项目") {
            that.handlerRecovers();
          } else {
            that.handlerRagin();
          }
          console.log(that);
        },
      });
    },
    handlerRecovers() {
      let that = this;
      that.$api
        .get(that.baseURL + "project/recover_proj/", {
          params: {
            project_id: that.param,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          console.log(res);
          that.$router.push({ name: "project" });
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
            proj_id: this.param,
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
            proj_id: this.param,
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
            proj_id: this.param,
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
    this.parameter();
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
.header .ss {
  font-size: 20px;
  line-height: 40px;
  color: #000;
  font-weight: bold;
  margin-top: 10px;
}
</style>
