<template>
  <div>
    <div class="header">
      <a-breadcrumb class="title">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>通讯录管理</a-breadcrumb-item>
        <a-breadcrumb-item>部门管理</a-breadcrumb-item>
      </a-breadcrumb>
      <span>部门管理</span>
      <a-tabs class="tabs" default-active-key="1">
        <a-tab-pane class="tabs-item" key="1" tab="内部系统">
          <div class="tabs-item-top">
            <a-form
              :model="departForm"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-row>
                <a-col :span="8">
                  <a-form-item
                    style="margin-bottom: 12px; margin-top: 12px"
                    label="部门名称"
                  >
                    <a-input
                      v-model="departForm.nm"
                      placeholder="请输入"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="16">
                  <span
                    class="form-button"
                    style="margin-bottom: 12px; margin-top: 15px"
                  >
                    <a-button
                      class="form-button-item"
                      type="primary"
                      @click="handlersubmit"
                      >查询</a-button
                    >
                    <a-button class="form-button-item" @click="handlerReset"
                      >重置</a-button
                    >
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div class="he"></div>
          <div class="tabs-item-content">
            <div style="height: 32px; line-height: 32px; margin-bottom: 24px">
              <span>部门列表</span>
              <a-button style="float: right" type="primary" @click="handlerNew"
                >新增部门</a-button
              >
            </div>
            <a-table
              :columns="columns"
              :data-source="departlist"
              size="middle"
              :scroll="{ x: 800 }"
            >
              <template slot="operation" slot-scope="text, record">
                <span
                  style="color: #1890ff"
                  @click="() => handlerInfo(record.id)"
                  >详情</span
                >
                <a-divider type="vertical" />
                <span
                  style="color: #1890ff"
                  @click="() => handleredit(record.id)"
                >
                  编辑
                </span>
                <a-divider type="vertical" />
                <a-popconfirm
                  title="请确认是否要删除该部门？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="() => handlerDelete(record.id)"
                >
                  <span style="color: #1890ff" class="ant-dropdown-link">
                    删除</span
                  >
                </a-popconfirm>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
      <!-- 新增部门 -->
      <a-form
        :form="form"
        :model="depaForm"
        style="box-size: border-box; padding-left: 90px"
        :label-col="{ span: 8 }"
        :wrapper-col="wrapperCol"
      >
        <a-modal
          v-model="visible"
          title="新增部门"
          on-ok="handleOk"
          :destroyOnClose="true"
        >
          <template slot="footer">
            <a-button key="back" @click="handleCancel"> 返回 </a-button>
            <a-button key="submit" type="primary" @click="handleOk">
              提交
            </a-button>
          </template>
          <a-alert
            class="modal-alert"
            type="error"
            message="请填写必填字段：部门名称"
            banner
          />
          <a-form-item label="部门名称">
            <a-input
              placeholder="请输入"
              v-model="depaForm.nm"
              v-decorator="['名称', { rules: [{ required: true }] }]"
            />
          </a-form-item>
          <a-form-item label="上级部门">
            <a-select
              style="width: 236px"
              placeholder="请选择"
              v-model="depaForm.pid"
              v-decorator="['上级部门', { rules: [{ required: true }] }]"
            >
              <a-select-option
                v-for="(superiors, i) in superiorForm"
                :key="i"
                :value="superiors.id"
              >
                {{ superiors.nm }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="部门顺序">
            <a-input
              placeholder="请输入"
              v-model="depaForm.o"
              v-decorator="[
                '顺序',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your note!',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-modal>
      </a-form>
      <!-- 编辑 -->
      <a-form
        :form="form"
        :model="depaForm"
        style="box-size: border-box; padding-left: 90px"
        :label-col="{ span: 8 }"
        :wrapper-col="wrapperCol"
      >
        <a-modal v-model="visibilie" title="编辑部门" :destroyOnClose="true">
          <template slot="footer">
            <a-button @click="handleBack"> 返回 </a-button>
            <a-button type="primary" @click="handlerDetemine"> 提交 </a-button>
          </template>
          <a-form-item label="部门名称">
            <a-input
              :initialValue="editForm.nm"
              :defaultValue="editForm.nm"
              v-model="editList.nm"
              v-decorator="['名称', { rules: [{ required: true }] }]"
            />
          </a-form-item>
          <a-form-item label="上级部门">
            <a-select
              style="width: 236px"
              v-model="editList.pid"
              v-decorator="['上级部门', { rules: [{ required: true }] }]"
            >
              <a-select-option
                v-for="(superiors, i) in superiorForm"
                :key="i"
                :value="superiors.id"
              >
                {{ superiors.nm }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="部门顺序">
            <a-input
              placeholder="请输入"
              :initialValue="editForm.o"
              :defaultValue="editForm.o"
              v-model="editList.o"
              v-decorator="[
                '顺序',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your note!',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
        </a-modal>
      </a-form>
    </div>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
export default {
  name: "department",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    const columns = [
      {
        title: "部门名称",
        dataIndex: "nm",
        key: "nm",
        width: 120,
        fixed: "left",
        align: "center",
      },
      {
        title: "部门等级",
        dataIndex: "lvl",
        key: "lvl",
        align: "center",
      },
      {
        title: "部门顺序",
        dataIndex: "o",
        key: "o",
        align: "center",
      },
      {
        title: "上级部门",
        dataIndex: "pnm",
        key: "pnm",
        align: "center",
      },
      {
        title: "创建时间",
        dataIndex: "created",
        key: "created",
        width: 180,
      },
      {
        title: "更新时间",
        dataIndex: "updated",
        key: "updated",
        width: 180,
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: 150,
        fixed: "right",
        scopedSlots: { customRender: "operation" },
      },
    ];
    return {
      // 表单
      form: this.$form.createForm(this, { name: "coordinated" }),
      // 栅格布局
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      // 列表信息
      columns,
      departlist: [],
      // 新增部门
      depaForm: {
        nm: "",
        pid: "",
        o: "",
      },
      loading: false,
      visible: false,
      visibilie: false,
      // 上级部门
      superiorForm: [],
      // 条件查询
      departForm: {
        nm: "",
      },
      // 详情
      viewUrl: "",
      id: "",
      // 编辑部门
      editForm: "",
      editList: {
        id: "",
        nm: "",
        pnm: "",
        pid: "",
        o: "",
      },
    };
  },
  methods: {
    // 查询
    handlersubmit() {
      this.$api
        .get(this.baseURL + "dept/dept/", {
          params: {
            nm: this.departForm.nm,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          this.departlist = result.data.data.datarows;
          return result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置
    handlerReset() {
      this.departForm.nm = "";
      this.departmentList();
    },
    // 新增部门
    handlerNew() {
      this.visible = true;
    },
    handleOk(e) {
      e.preventDefault();
      this.loading = true;
      var qs = require("qs");
      this.form.validateFields((err) => {
        if (!err) {
          this.$api
            .post(
              this.baseURL + "dept/new_dept/",
              qs.stringify(this.depaForm),
              {
                headers: {
                  Authorization: localStorage.getItem("Authorization"),
                },
              }
            )
            .then((res) => {
              if (res.data.code == false) {
                Modal.error({
                  title: "部门顺序重复",
                  content: "请选择其他顺序编号",
                });
                this.visible = true;
              } else if (res.data.code !== false) {
                this.visible = false;
                this.departmentList();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    handleCancel() {
      this.visible = false;
    },
    // 编辑
    handleredit(id) {
      this.visibilie = true;
      this.$api
        .get(this.baseURL + "dept/edit_dept/", {
          params: {
            dept_id: id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.editForm = result.dept_info;
          return this.editForm;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlerDetemine(e) {
      var qs = require("qs");
      e.preventDefault;
      let params = {
        dept_id: this.id,
        nm: this.editList.nm,
        pid: this.editList.pid == null ? this.editList.id : this.editForm.pid,
        o: this.editList.o == null ? this.editList.o : this.editForm.o,
      };
      this.$api
        .post(this.baseURL + "dept/edit_dept/", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          console.log(result);
          this.visibilie = false;
          this.departmentList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleBack() {
      this.visibilie = false;
    },
    // 删除
    handlerDelete(id) {
      this.$api
        .get(this.baseURL + "dept/del_dept/", {
          params: {
            dept_id: id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          if (!result.code) {
            Modal.error({
              title: "删除部门",
              content: result.data.errmsg,
              okText: "返回",
            });
          }
          this.departmentList();
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 上级部门
    getSuperior() {
      this.$api
        .get(this.baseURL + "dept/new_dept/", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.superiorForm = result.sup_dept;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 部门列表展示
    departmentList() {
      this.$api
        .get(this.baseURL + "dept/dept/", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          this.departlist = result.data.data.datarows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 详情
    handlerInfo(id) {
      console.log(id);
      this.$router.push("/index/department/dedetails/:id=" + id);
      // this.$router.push("/index/department/dedetails/:id=" + id);
    },
  },
  mounted() {
    this.departmentList();
    this.getSuperior();
  },
};
</script>

<style scooed>
.ant-spin-nested-loading {
  position: relative;
  width: 100%;
  height: auto;
}
.header {
  width: 100%;
  height: 110px;
  background: #fff;
  position: relative;
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
.header > .tabs {
  padding: 0 24px;
}
.tabs-item-top {
  width: 99%;
  height: auto;
  padding: 0 24px;
  margin: 8px auto 0;
  background: #fff;
}
.tabs-item-top .form-button {
  float: right;
  margin-right: 24px;
}
.tabs-item-top .form-button-item {
  margin-right: 8px;
}
.form-input {
  width: 264px;
  height: 32px;
}
.he {
  width: 100%;
  height: 24px;
}
.tabs-item-content {
  width: 99%;
  height: auto;
  padding: 24px;
  margin: 0 auto;
  background: #fff;
}
.tabs-item-content > div {
  font-size: 16px;
  line-height: 22px;
}
.modal-alert {
  margin-bottom: 24px;
}
</style>
