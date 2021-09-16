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
          >撤回立项</a-button
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
          <div class="concenter">
            <div class="title">
              <span>基础信息</span>
            </div>
            <a-descriptions class="content">
              <a-descriptions-item label="项目编号">{{
                viewList[0].code
              }}</a-descriptions-item>
              <a-descriptions-item label="项目名称">{{
                viewList[0].nm
              }}</a-descriptions-item>
              <a-descriptions-item label="项目状态">
                <a-badge :status="badges" />{{
                  viewList[0].pro_status
                }}</a-descriptions-item
              >
              <a-descriptions-item label="合同编号">{{
                viewList[0].contract_no
              }}</a-descriptions-item>
              <a-descriptions-item label="流程编号">{{
                viewList[0].proc_code
              }}</a-descriptions-item>
              <a-descriptions-item label="项目类型">{{
                viewList[0].project_lbl
              }}</a-descriptions-item>
              <a-descriptions-item label="建设单位">{{
                viewList[0].client_nm
              }}</a-descriptions-item>
              <a-descriptions-item label="建筑面积"
                >{{ viewList[0].build_area }}平方米
              </a-descriptions-item>
              <a-descriptions-item label="幕墙面积"
                >{{ viewList[0].wall_area }}平方米</a-descriptions-item
              >
              <a-descriptions-item label="门窗面积"
                >{{ viewList[0].dw_area }}平方米</a-descriptions-item
              >
              <a-descriptions-item label="建筑高度"
                >{{ viewList[0].build_height }}米</a-descriptions-item
              >
              <a-descriptions-item label="幕墙高度"
                >{{ viewList[0].wall_height }}米</a-descriptions-item
              >
              <a-descriptions-item label="项目周期">{{
                viewList[0].pro_cycle
              }}</a-descriptions-item>
              <a-descriptions-item label="建筑类型">{{
                viewList[0].build_lbl
              }}</a-descriptions-item>
              <a-descriptions-item label="设计类型">{{
                viewList[0].major_lbl
              }}</a-descriptions-item>
              <a-descriptions-item label="主设专业">
                {{ viewList[0].main_major_lbl }}
              </a-descriptions-item>
              <a-descriptions-item label="建设地点">
                {{ viewList[0].bulid_addr }}
              </a-descriptions-item>
              <a-descriptions-item label="竞争单位">
                {{ viewList[0].competitor }}
              </a-descriptions-item>
              <a-descriptions-item label="设计报价">
                {{ viewList[0].fee }}
              </a-descriptions-item>
              <a-descriptions-item label="代建">
                {{ viewList[0].construction }}
              </a-descriptions-item>
              <a-descriptions-item label="母公司">
                {{ viewList[0].parent_company }}
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                {{ viewList[0].cmt }}
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="项目部门" force-render>
          <div class="concenter">
            <div class="title">
              <span>项目部门</span>
            </div>
            <div class="content">
              <a-table :columns="columns" :data-source="prodepa">
                <span slot="tags" slot-scope="tags">
                  <a-tag v-if="tags" color="geekblue">
                    {{ tags }}
                  </a-tag>
                </span>
              </a-table>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="联系人">
          <div class="concenter">
            <div class="title">
              <span>联系人列表</span>
            </div>
            <div class="content">
              <a-table :columns="contacts" :data-source="contactsList">
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
                      v-if="record.editable"
                      style="margin: -5px 0"
                      :value="text"
                      @change="
                        (e) => handleChange(e.target.value, record.id, col)
                      "
                    />
                    <template v-else>
                      {{ text }}
                    </template>
                  </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                  <div class="editable-row-operations">
                    <span v-if="record.editable">
                      <a @click="() => save(record.id)">保存</a>
                      <a-popconfirm
                        title="Sure to cancel?"
                        @confirm="() => cancel(record.id)"
                      >
                        <a>取消</a>
                      </a-popconfirm>
                    </span>
                    <span v-else>
                      <a
                        :disabled="editingKey !== ''"
                        @click="() => edit(record.id)"
                        >编辑</a
                      >
                    </span>
                    <a-divider type="vertical" />
                    <span>
                      <a
                        :disabled="editingKey !== ''"
                        @click="() => handlerDelete(record.id)"
                        >删除</a
                      >
                    </span>
                  </div>
                </template>
              </a-table>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="4" tab="项目文件">
          <a-form class="top">
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item label="文件名称">
                  <a-input placeholder="请输入" />
                </a-form-item>
              </a-col>
            </a-row>
            <div class="top_button">
              <a-button type="primary" style="margin-right: 8px">查询</a-button>
              <a-button>重置</a-button>
            </div>
          </a-form>
          <div style="width: 100%; height: 24px"></div>
          <div style="padding: 24px">
            <div class="concent-title">
              <span>项目文件</span>
              <a-button style="float: right" type="primary">上传文件</a-button>
            </div>
            <a-table :columns="proj_docu" :data-source="proj_doculist">
              <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <span v-if="record.editable">
                    <a @click="() => save(record.id)">下载</a>
                    <a-popconfirm
                      title="Sure to cancel?"
                      @confirm="() => cancel(record.id)"
                    >
                      <a>删除</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a
                      :disabled="editingKey !== ''"
                      @click="() => edit(record.id)"
                      >重命名</a
                    >
                  </span>
                </div>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="5" tab="操作记录"> Content of Tab Pane 3 </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
export default {
  name: "apppro",
  data() {
    const columns = [
      {
        title: "项目ID",
        dataIndex: "code",
      },
      {
        title: "项目状态",
        dataIndex: "proj_sta",
      },
      {
        title: "项目分工",
        dataIndex: "cmt",
      },
      {
        title: "负责部门",
        dataIndex: "dept_nm",
      },
      {
        title: "是否主设",
        dataIndex: "is_main",
        key: "is_main",
        scopedSlots: { customRender: "tags" },
      },
      {
        title: "操作人",
        dataIndex: "oper_nm",
        key: "oper_nm",
      },
      {
        title: "创建时间",
        dataIndex: "updated",
        key: "updated",
      },
    ];
    const contacts = [
      {
        title: "姓名",
        dataIndex: "nm",
        scopedSlots: { customRender: "nm" },
      },
      {
        title: "手机号",
        dataIndex: "mob",
        scopedSlots: { customRender: "mob" },
      },
      {
        title: "类型",
        dataIndex: "typ",
        scopedSlots: { customRender: "typ" },
      },
      {
        title: "公司",
        dataIndex: "comp_nm",
        scopedSlots: { customRender: "comp_nm" },
      },
      {
        title: "部门",
        dataIndex: "dept_nm",
        scopedSlots: { customRender: "dept_nm" },
      },
      {
        title: "职位",
        dataIndex: "job",
        scopedSlots: { customRender: "job" },
      },
      {
        title: "操作人",
        dataIndex: "oper_nm",
      },
      {
        title: "创建时间",
        dataIndex: "updated",
      },
      {
        title: "操作",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
      },
    ];
    const proj_docu = [
      {
        title: "文件名称",
        dataIndex: "nm",
        scopedSlots: { customRender: "nm" },
      },
      {
        title: "操作人",
        dataIndex: "nm",
        scopedSlots: { customRender: "nm" },
      },
      {
        title: "创建时间",
        dataIndex: "nm",
        scopedSlots: { customRender: "nm" },
      },
      {
        title: "操作",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
      },
    ];
    return {
      param: "",
      contactsid: "",
      viewList: [],
      badges: "",
      types: "",
      ghosts: "",
      styles: "margin-right:16px",
      styless: "margin-left:16px",
      proj: "",
      placement: "bottomRight",
      // 项目部门
      columns,
      prodepa: "",
      // 联系人列表
      contacts,
      contactsList: [],
      editingKey: "",
      // 分页
      pagination: {
        pageSize: 20,
      },
      // 项目文件
      proj_docu,
      proj_doculist: "",
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
          this.viewList = result.data.data.project_info;
          if (this.viewList[0].status == 2000) {
            this.badges = "processing";
            this.styles = "margin-right: 16px";
            this.styless = "display: none";
          } else if (this.viewList[0].status == 1211) {
            this.badges = "error";
            this.styless = "margin-left: 16px";
            this.styles = "display: none";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rowClick(record) {
      return {
        on: {
          click: () => {
            this.contactsid = record.id;
          },
        },
      };
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
            project_id: that.viewList[0].id,
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
            project_id: that.viewList[0].id,
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
    // 联系人列表
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
    // 编辑联系人
    handlerEdit() {
      this.$api
        .get(this.baseURL + "project/edit_contact/", {
          params: {
            //       this.param
            // this.contactsid
          },
          headers: {},
        })
        .then((res) => {
          let result = res.data;
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit(id) {
      const newData = this.contactsList;
      const target = newData.filter((item) => id === item.id)[0];
      this.editingKey = id;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(id) {
      const newData = [...this.contactsList];
      console.log(newData);
      this.cacheData = newData.map((item) => ({ ...item }));
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => id === item.id)[0];
      const targetCache = newCacheData.filter((item) => id === item.id)[0];
      if (!target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.contactsList];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
    // 删除联系人
    handlerDelete(id) {
      this.$api
        .get(this.baseURL + "project/del_contact", {
          params: {
            proj_contact_id: id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          console.log(res);
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
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 项目上传
    handlerProjup() {},
  },
  mounted() {
    this.parameter();
    this.getProdepa();
    this.getContacts();
    this.getProjdoculist();
  },
};
</script>

<style>
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
</style>
<style scoped>
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
  /* background: #fff; */
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
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 24px;
  line-height: 32px;
}
</style>
