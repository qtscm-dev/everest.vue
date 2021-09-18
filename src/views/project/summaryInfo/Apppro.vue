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
      <a-tabs :tabBarGutter="0" class="apppro-tabs" default-active-key="3">
        <a-tab-pane key="1" tab="概要信息">
          <div class="concenter">
            <div class="title">
              <span>基础信息</span>
            </div>
            <a-descriptions class="content">
              <a-descriptions-item label="项目编号">{{
                viewList.code
              }}</a-descriptions-item>
              <a-descriptions-item label="项目名称">{{
                viewList.nm
              }}</a-descriptions-item>
              <a-descriptions-item label="项目状态">
                <a-badge :status="badges" />{{
                  viewList.pro_status
                }}</a-descriptions-item
              >
              <a-descriptions-item label="合同编号">{{
                viewList.contract_no
              }}</a-descriptions-item>
              <a-descriptions-item label="流程编号">{{
                viewList.proc_code
              }}</a-descriptions-item>
              <a-descriptions-item label="项目类型">{{
                viewList.project_lbl
              }}</a-descriptions-item>
              <a-descriptions-item label="建设单位">{{
                viewList.client_nm
              }}</a-descriptions-item>
              <a-descriptions-item label="建筑面积"
                >{{ viewList.build_area }}平方米
              </a-descriptions-item>
              <a-descriptions-item label="幕墙面积"
                >{{ viewList.wall_area }}平方米</a-descriptions-item
              >
              <a-descriptions-item label="门窗面积"
                >{{ viewList.dw_area }}平方米</a-descriptions-item
              >
              <a-descriptions-item label="建筑高度"
                >{{ viewList.build_height }}米</a-descriptions-item
              >
              <a-descriptions-item label="幕墙高度"
                >{{ viewList.wall_height }}米</a-descriptions-item
              >
              <a-descriptions-item label="项目周期">{{
                viewList.pro_cycle
              }}</a-descriptions-item>
              <a-descriptions-item label="建筑类型">{{
                viewList.build_lbl
              }}</a-descriptions-item>
              <a-descriptions-item label="设计类型">{{
                viewList.major_lbl
              }}</a-descriptions-item>
              <a-descriptions-item label="主设专业">
                {{ viewList.main_major_lbl }}
              </a-descriptions-item>
              <a-descriptions-item label="建设地点">
                {{ viewList.bulid_addr }}
              </a-descriptions-item>
              <a-descriptions-item label="竞争单位">
                {{ viewList.competitor }}
              </a-descriptions-item>
              <a-descriptions-item label="设计报价">
                {{ viewList.fee }}
              </a-descriptions-item>
              <a-descriptions-item label="代建">
                {{ viewList.construction }}
              </a-descriptions-item>
              <a-descriptions-item label="母公司">
                {{ viewList.parent_company }}
              </a-descriptions-item>
              <a-descriptions-item label="备注">
                {{ viewList.cmt }}
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
              <a-empty
                :style="{ display: contactsList == false ? 'block' : 'none' }"
              />
              <a-table
                :columns="columns"
                :data-source="prodepa"
                :rowKey="(record) => record.id"
                :rowClassName="
                  (record, index) => (index % 2 === 1 ? 'table-apppro' : null)
                "
                :style="{ display: contactsList == false ? 'none' : 'block' }"
              >
                <span slot="tags" slot-scope="tags">
                  <a-tag v-if="tags" color="blue">
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
                      v-if="record.editable"
                      style="margin: -5px 0"
                      :value="text"
                      @change="
                        (e) => handleChange(e.target.value, record.id, col)
                      "
                    />

                    <a-select
                      placeholder="请选择"
                      style="display: block"
                      v-else-if="record.typ"
                      :value="text"
                      @change="onChangeSelect($event, record.key, col)"
                    >
                      <a-select-option value="lucy">Lucy</a-select-option>
                      <a-select-option value="jack">Jack</a-select-option>
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
          <div style="width: 100%; height: 24px; background: #f4f4f4"></div>
          <div style="padding: 24px">
            <div class="concent-title">
              <span>项目文件</span>
              <a-upload
                name="avatar"
                :multiple="true"
                :show-upload-list="false"
                :customRequest="customRequest"
                style="float: right"
              >
                <a-button type="primary">上传文件</a-button>
              </a-upload>
            </div>
            <a-empty
              :style="{ display: proj_doculist == false ? 'block' : 'none' }"
            />
            <a-table
              :style="{ display: proj_doculist == false ? 'none' : 'block' }"
              :columns="proj_docu"
              :data-source="proj_doculist"
              :rowKey="(record) => record.id"
              :rowClassName="
                (record, index) => (index % 2 === 1 ? 'table-apppro' : null)
              "
            >
              <template slot="operation" slot-scope="text, record">
                <!-- 无权限不能操作 -->
                <div
                  class="editable-row-operations"
                  v-if="record.is_allow == 'f'"
                >
                  <a :disabled="record.is_allow !== ''">下载</a>
                  <a-divider type="vertical" />
                  <a :disabled="record.is_allow !== ''">重命名</a>
                  <a-divider type="vertical" />
                  <a :disabled="record.is_allow !== ''">删除</a>
                </div>
                <!-- 有权限可操作 -->
                <div
                  class="editable-row-operations"
                  v-if="record.is_allow == 't'"
                >
                  <a
                    :disabled="record.is_allow == ''"
                    @click="handlerProjdown(record.id, record.nm)"
                    >下载</a
                  >
                  <a-divider type="vertical" />
                  <a-popconfirm
                    placement="topLeft"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerProjrenm(record.id, record.nm)"
                  >
                    <a-icon slot="icon" />
                    <template
                      slot="title"
                      style="position: relative; top: 0; left: 0"
                    >
                      <p>重命名</p>
                      <a-input
                        v-model="record.nm"
                        style="margin-top: 10px"
                      ></a-input>
                    </template>
                    <a :disabled="record.is_allow == ''">重命名</a>
                  </a-popconfirm>
                  <a-divider type="vertical" />
                  <a-popconfirm
                    placement="topRight"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerProjdelete(record.id)"
                  >
                    <template slot="title">
                      <p>请确认是否要删除该文件？</p>
                    </template>
                    <a :disabled="record.is_allow == ''">删除</a>
                  </a-popconfirm>
                </div>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="5" tab="操作记录">
          <div class="concenter">
            <a-form v-bind="formItemLayout" class="top">
              <a-row :gutter="24">
                <a-col :span="8">
                  <a-form-item label="操作人">
                    <a-input
                      v-model="operForm.oper_act"
                      placeholder="请输入名称"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="日期">
                    <a-range-picker
                      v-model="operForm.oper_date"
                      @change="onChange"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="8" :style="{ textAlign: 'right' }">
                  <a-button
                    type="primary"
                    style="margin-right: 8px"
                    @click="handlerOperquery"
                    >查询</a-button
                  >
                  <a-button @change="handlerOperreset">重置</a-button>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div style="width: 100%; height: 24px; background: #f4f4f4"></div>
          <div>
            <div class="oper_title">
              <span>操作记录</span>
            </div>
            <div style="padding: 24px">
              <a-empty
                :style="{ display: oper_recolist == false ? 'block' : 'none' }"
              />
              <a-table
                class="oper_table"
                :columns="oper_reco"
                :data-source="oper_recolist"
                :pagination="paginationOper"
                :rowKey="(record) => record.id"
                :rowClassName="
                  (record, index) => (index % 2 === 1 ? 'table-apppro' : null)
                "
                :style="{ display: oper_recolist == false ? 'none' : 'block' }"
              >
                <template slot="operation" slot-scope="text, record">
                  <div>
                    <span
                      style="color: #1890ff; font-size: 14px"
                      @click="() => handlerJump(record.id, record.status)"
                      >详情</span
                    >
                  </div>
                </template>
              </a-table>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
import { message } from "ant-design-vue";
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
        fixed: "right",
        width: 120,
      },
    ];
    const proj_docu = [
      {
        title: "文件名称",
        dataIndex: "nm",
      },
      {
        title: "创建者",
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
    const oper_reco = [
      {
        title: "创建时间",
        dataIndex: "nm",
      },
      {
        title: "操作人姓名",
        dataIndex: "oper_nm",
      },
      {
        title: "操作类型",
        dataIndex: "updated",
      },
      {
        title: "操作内容",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
      },
    ];
    return {
      param: "",
      viewList: {},
      badges: "",
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
      // 操作记录
      oper_reco,
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
          this.viewList = result.data.data.project_info[0];
          console.log(this.viewList);
          if (this.viewList.status == 2000) {
            this.badges = "processing";
            this.styles = "margin-right: 16px";
            this.styless = "display: none";
          } else if (this.viewList.status == 1211) {
            this.badges = "error";
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
    handleChange(value, id, column) {
      const newData = [...this.contactsList];
      const target = newData.filter((item) => id === item.id)[0];
      if (target) {
        target[column] = value;
        this.contactsList = newData;
      }
    },
    // 编辑
    handlerEdit(id) {
      const newData = [...this.contactsList];
      const target = newData.filter((item) => id === item.id)[0];
      this.editingKey = id;
      if (target) {
        target.editable = true;
        this.contactsList = newData;
      }
    },
    // 保存
    handlerSave(id) {
      const newData = [...this.contactsList];
      const target = newData.filter((item) => id === item.id)[0];
      var qs = require("qs");
      let params = {
        proj_id: "10137",
        proj_contact_id: id,
        typ: "53",
        nm: target.nm,
        comp_nm: target.comp_nm,
        dept_nm: target.dept_nm,
        job: target.job,
        mob: target.mob,
      };
      this.$api
        .post(this.baseURL + "project/edit_contact", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          console.log(res);
          this.getContacts();
        })
        .catch((err) => {
          console.log(err);
        });
      if (target) {
        delete target.editable;
      }
      this.editingKey = "";
    },
    // 取消
    handlerClear(id) {
      const newData = [...this.contactsList];
      const target = newData.filter((item) => id === item.id)[0];
      this.editingKey = "";
      if (target) {
        delete target.editable;
      }
      this.getContacts();
    },
    // 删除联系人
    handlerDelete(id) {
      console.log(id);
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
          if (res.data.code) {
            message.success("联系人删除成功");
            this.getContacts();
          } else {
            message.error(res.data.data.errmsg);
          }
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
          } else {
            message.error("重命名失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    // 操作记录查询
    handlerOperquery() {
      // this.$api
      //   .get(this.baseURL + "", {
      //     params: {},
      //     headers: {
      //       Authorization: localStorage.getItem("Authorization"),
      //     },
      //   })
      //   .then((res) => {
      //     let result = res.data;
      //     console.log(result);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    // 操作记录重置
    handlerOperreset() {
      // this.operForm.oper_act = "";
      // this.operForm.oper_date = "";
      // this.getOper();
    },
    onChange(date, datestring) {
      console.log(date);
      this.operForm.oper_date = datestring;
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
