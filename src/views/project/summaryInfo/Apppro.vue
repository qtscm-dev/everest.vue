<template>
  <div>
    <div class="header">
      <a-breadcrumb class="title">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>立项中心</a-breadcrumb-item>
      </a-breadcrumb>
      <span>立项中心</span>
      <div
        :style="{
          float: 'right',
          padding: ' 0 24px',
        }"
      >
        <a-button :style="styles" type="danger" ghost @click="handlerWithpro"
          >中止立项</a-button
        >
        <a-dropdown :placement="placement">
          <a-button>返回</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <span>返回列表页</span>
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
      <a-tabs :tabBarGutter="0" class="apppro-tabs" default-active-key="4">
        <a-tab-pane key="1" tab="概要信息">
          <ProjectBasicInfo
            :ProjectBasicInfo="projectBasicInfo"
            :badges="badges"
            :msg="msg"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="项目部门" force-render>
          <DepartInfo :prodepa="prodepa" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="联系人">
          <ContactInfo
            :contactsList="contactsList"
            :contact_typ="contact_typ"
            :proj_id="proj_id"
          />
          <!-- <div class="concenter">
            <div class="title">
              <span>联系人列表</span>
            </div>
            <div class="content">
              <a-empty
                :style="{ display: contactsList == false ? 'block' : 'none' }"
              />
              <a-table
                :columns="contacts"
                :data-source="contactsList"
                :scroll="{ x: 1500 }"
                :rowKey="(record) => record.id"
                :rowClassName="
                  (record, index) => (index % 2 === 1 ? 'table-apppro' : null)
                "
                :style="{ display: contactsList == false ? 'none' : 'block' }"
              >
                <template
                  v-for="col in [
                    'nm',
                    'mob',
                    'typ',
                    'comp_nm',
                    'dept_nm',
                    'job',
                  ]"
                  :slot="col"
                  slot-scope="text, record"
                >
                  <div :key="col">
                    <a-input
                      v-if="record.editable && col != 'typ'"
                      style="margin: -5px 0"
                      :value="text"
                      @change="
                        (e) => handleChange(e.target.value, record.id, col)
                      "
                    />
                    <a-select
                      placeholder="请选择"
                      style="display: block"
                      v-else-if="record.editable && col == 'typ'"
                      v-model="record.typ"
                      @change="
                        (e) => handleChange(e.target.value, record.id, col)
                      "
                    >
                      <a-select-option
                        v-for="list in contact_typ"
                        :key="list.id"
                        >{{ list.lbl }}</a-select-option
                      >
                    </a-select>
                    <template v-else>
                      {{ text }}
                    </template>
                  </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                  <div class="editable-row-operations">
                    <span v-if="record.editable">
                      <a @click="() => handlerSave(record.id)">保存</a
                      >&nbsp;&nbsp;&nbsp;
                      <a @click="() => handlerClear(record.id)">取消</a>
                    </span>
                    <span v-else>
                      <a
                        :disabled="editingKey !== ''"
                        @click="() => handlerEdit(record.id)"
                        >编辑</a
                      >
                    </span>
                    <a-divider type="vertical" />
                    <a
                      :disabled="editingKey !== ''"
                      @click="() => handlerDelete(record.id)"
                      >删除</a
                    >
                  </div>
                </template>
              </a-table>
            </div>
          </div> -->
        </a-tab-pane>
        <a-tab-pane key="4" tab="项目文件">
          <DocumentInfo :proj_doculist="proj_doculist" />
        </a-tab-pane>
        <a-tab-pane key="5" tab="操作记录">
          <OperationInfo :oper_recolist="oper_recolist" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
import { message } from "ant-design-vue";
import ProjectBasicInfo from "../../../components/ProjectDetail/BasicInfo";
import DepartInfo from "../../../components/ProjectDetail/DepartInfo";
import ContactInfo from "../../../components/ProjectDetail/ContactInfo";
import OperationInfo from "../../../components/ProjectDetail/OperationInfo";
import DocumentInfo from "../../../components/ProjectDetail/DocumentInfo";
export default {
  name: "apppro",
  components: {
    ProjectBasicInfo,
    DepartInfo,
    ContactInfo,
    OperationInfo,
    DocumentInfo,
  },
  data() {
    return {
      param: "",
      projectBasicInfo: {},
      badges: "",
      msg: "",
      types: "",
      ghosts: "",
      styles: "margin-right:16px",
      styless: "margin-left:16px",
      proj: "",
      placement: "bottomRight",
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
      // 项目部门
      prodepa: "",
      // 联系人列
      // contacts,
      proj_id: this.params,
      contactsList: [],
      editingKey: "",
      contact_typ: [],
      // 项目文件
      proj_doculist: "",
      // 操作记录
      // oper_reco,
      oper_recolist: "",
      operForm: {
        oper_act: "",
        oper_date: "",
      },
      // 分页
      paginationOper: {
        defaultPageSize: 20,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        size: "middle",
        total: "",
        proj: "",
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
        // onChange: (current, pageSize) => {
        //   this.getProject(this.pagination.proj, current, pageSize);
        // },
      },
    };
  },
  methods: {
    // 参数获取
    parameter() {
      this.param = this.$router.currentRoute.params.id.slice(4);
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
            this.badges = "processing";
            this.msg = "已立项";
            this.styles = "margin-right: 16px";
            this.styless = "display: none";
          } else if (this.projectBasicInfo.status == 1211) {
            this.badges = "error";
            this.msg = "已中止";
            this.styless = "margin-left: 16px";
            this.styles = "display: none";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 撤回立项
    handlerWithpro() {
      let that = this;
      const h = that.$createElement;
      Modal.confirm({
        title: "撤回立项",
        content: h("div", {}, [
          h("p", "请输入“确定撤回”以校验是否误操作"),
          h("br"),
          h("a-input"),
        ]),
        cancelText: "取消",
        okText: "确定",
        onOk() {
          let inp = document.getElementsByClassName("ant-input")[0].value;
          if (inp == "确定撤回") {
            that.handlerWithpros();
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
      const h = that.$createElement;
      Modal.confirm({
        title: "撤回立项",
        content: h("div", {}, [
          h("p", '输入内容有误，请重新输入"确定撤回"以校验是否误操作'),
          h("br"),
          h("a-input"),
        ]),
        cancelText: "取消",
        okText: "确定",
        onOk() {
          let inp = document.getElementsByClassName("ant-input")[0].value;
          if (inp == "确定撤回") {
            that.handlerWithpros();
          } else {
            that.handlerWagin();
          }
          console.log(that);
        },
      });
    },
    handlerWithpros() {
      let that = this;
      that.$api
        .get(that.baseURL + "project/revoke_proj/", {
          params: {
            project_id: that.viewList.id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          console.log(that.viewList);
          that.$router.push({ name: "project" });
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 恢复项目
    handlerRecover() {
      let that = this;
      const h = that.$createElement;
      Modal.confirm({
        title: "恢复项目",
        content: h("div", {}, [
          h("p", "请输入“恢复项目”以校验是否误操作"),
          h("br"),
          h("a-input"),
        ]),
        cancelText: "取消",
        okText: "确定",
        onOk() {
          let inp = document.getElementsByClassName("ant-input")[0].value;
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
      const h = that.$createElement;
      Modal.confirm({
        title: "恢复项目",
        content: h("div", {}, [
          h("p", '输入内容有误，请重新输入"恢复项目"以校验是否误操作'),
          h("br"),
          h("a-input"),
        ]),
        cancelText: "取消",
        okText: "确定",
        onOk() {
          let inp = document.getElementsByClassName("ant-input")[0].value;
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
            project_id: that.viewList.id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          console.log(that.viewList);
          that.$router.push({ name: "project" });
          console.log(result);
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
          this.prodepa = result.datarows;
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
          this.contactsList = result.datarows;
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
          this.proj_doculist = result.datarows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 项目上传
    customRequest(data) {
      const formData = new FormData();
      formData.append("proj_id", this.param);
      formData.append("avatar", data.file);
      this.$api({
        method: "post",
        url: this.baseURL + "project/new_file",
        headers: { Authorization: localStorage.getItem("Authorization") },
        data: formData,
      })
        .then((res) => {
          let result = res.data;
          if (result.code) {
            message.success(`${data.file.name} 上传成功.`);
          } else if (!result.code) {
            message.error(`${data.file.name} 上传失败.`);
          }
          this.getProjdoculist();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 下载
    handlerProjdown(id, nm) {
      console.log(id);
      const formData = new FormData();
      formData.append("rsc_id", "10930");
      this.$api({
        method: "post",
        url: this.baseURL + "project/down_file",
        headers: { Authorization: localStorage.getItem("Authorization") },
        data: formData,
        responseType: "blob",
      })
        .then((res) => {
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", nm);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重命名
    handlerProjrenm(id, nm) {
      var qs = require("qs");
      let params = {
        rsc_id: id,
        rename: nm,
      };
      this.$api
        .post(this.baseURL + "project/rename", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success("重命名成功");
            this.getProjdoculist();
          } else {
            message.error("重命名失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlerProjClean() {
      this.getProjdoculist();
    },
    // 删除
    handlerProjdelete(id) {
      var qs = require("qs");
      let params = {
        rsc_id: id,
      };
      this.$api
        .post(this.baseURL + "project/del_file", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          console.log(res.data);
          this.getProjdoculist();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 操作记录
    getOper() {
      // this.$api
      //   .get(this.baseURL + "", {
      //     params: {},
      //     headers: {
      //       Authorization: localStorage.getItem("Authorization"),
      //     },
      //   })
      //   .then((res) => {
      //     let result = res.data;
      //     // this.oper_recolist = result.datarows;
      //     console.log(result);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
  mounted() {
    this.parameter();
    this.getProdepa();
    this.getContacts();
    this.getProjdoculist();
    this.getOper();
  },
};
</script>

<style>
.table-apppro {
  background: #fafafa;
}
.header {
  width: 100%;
  height: 112px;
  background: #fff;
}
.header > .title {
  padding: 8px 32px;
  font-size: 14px;
  opacity: 65%;
}
.header > span {
  font-size: 20px;
  font-weight: bold;
  color: #000;
  padding: 12px 32px 0;
}
.apppro-tabs {
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
}
.ant-tabs-tabpane {
  background: #fff;
  box-sizing: border-box;
}
.ant-popover-message-title {
  padding-left: 0;
}
.concenter {
  width: 100%;
  height: auto;
}
.concenter .title {
  line-height: 56px;
  padding: 0 24px;
  border-bottom: 1px solid #e8e8e8;
  font-size: 16px;
  color: #000;
}
.concenter .content {
  box-sizing: border-box;
  padding: 24px;
}
.top {
  padding: 24px;
  position: relative;
}
.top .ant-form-item {
  display: flex;
}
.top.ant-form-item-control-wrapper {
  flex: 1;
}
.ant-row .ant-form-item {
  margin-bottom: 0;
}
.top > .top_button {
  position: absolute;
  top: 24px;
  right: 24px;
}
.con_table {
  margin-top: 24px;
}
.concent-title {
  width: 100%;
  height: 32px;
  margin-bottom: 24px;
  line-height: 32px;
  font-size: 16px;
  color: #000;
}
.oper_title {
  padding: 12px 24px;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 16px;
  color: #000;
  border-bottom: 1px solid #e8e8e8;
}
.oper_table {
  padding: 24px;
}
</style>
