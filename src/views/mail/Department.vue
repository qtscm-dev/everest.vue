<template>
  <div>
    <div class="header">
      <h3>部门管理</h3>
      <a-tabs default-active-key="1">
        <a-tab-pane class="tabs-item" key="1" tab="内部系统">
          <div class="tabs-item-top">
            <a-form-model :model="departForm" v-bind="formItemLayout">
              <a-row>
                <a-col :span="8">
                  <a-form-model-item
                    style="margin-bottom: 12px; margin-top: 12px"
                    label="部门名称"
                  >
                    <a-input
                      v-model="departForm.nm"
                      placeholder="请输入"
                    ></a-input>
                  </a-form-model-item>
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
            </a-form-model>
          </div>
          <div class="tabs-item-content">
            <div style="height: 32px; line-height: 32px; margin-bottom: 24px">
              <span>部门列表</span>
              <a-button
                :style="[
                  { display: departlist == false ? 'none' : 'block' },
                  { float: 'right' },
                ]"
                type="primary"
                @click="handlerNew"
                >新增部门</a-button
              >
            </div>
            <a-empty
              image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
              :image-style="{
                height: '60px',
              }"
              :style="{ display: departlist == false ? 'block' : 'none' }"
            >
              <span slot="description"> 暂无数据 </span>
              <a-button type="primary" @click="handlerNew"> 现在创建 </a-button>
            </a-empty>
            <a-table
              :columns="columns"
              :data-source="departlist"
              :style="{ display: departlist == false ? 'none' : 'block' }"
              size="middle"
              :scroll="{ x: 800 }"
              :pagination="pagination"
              :rowKey="(record) => record.id"
              :rowClassName="
                (record, index) => (index % 2 === 1 ? 'table-depa' : null)
              "
            >
              <template slot="operation" slot-scope="text, record">
                <a
                  :href="url"
                  target="_blank"
                  @click="() => handlerInfo(record.id)"
                  >详情</a
                >
                <a-divider type="vertical" />
                <a @click="() => handleredit(record.id)"> 编辑 </a>
                <a-divider type="vertical" />
                <a-popconfirm
                  placement="topRight"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="() => handlerDelete(record.id)"
                >
                  <template slot="title">
                    <p>请确认是否要删除该部门？</p>
                  </template>
                  <a class="ant-dropdown-link"> 删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
      <!-- 新增部门 -->
      <a-modal v-model="visible" title="新增部门" :destroyOnClose="true">
        <template slot="footer">
          <a-button key="back" @click="handleCancel"> 返回 </a-button>
          <a-button key="submit" type="primary" @click="handleOk('depaForm')">
            提交
          </a-button>
        </template>
        <a-alert
          class="modal-alert"
          type="error"
          :message="msg"
          banner
          :style="dis"
        />
        <a-form-model
          ref="depaForm"
          :model="depaForm"
          :rules="rules"
          v-bind="formItemLayout"
        >
          <a-form-model-item label="部门名称" prop="nm">
            <a-input placeholder="请输入" v-model="depaForm.nm" />
          </a-form-model-item>
          <a-form-model-item label="上级部门" prop="pid">
            <a-select placeholder="请选择" v-model="depaForm.pid">
              <a-select-option v-for="supes in superiorForm" :key="supes.id">
                {{ supes.nm }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="部门顺序" prop="o">
            <a-input placeholder="请输入" v-model="depaForm.o" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <!-- 编辑 -->
      <a-modal v-model="visibilie" title="编辑部门" :destroyOnClose="true">
        <template slot="footer">
          <a-button @click="handleBack"> 返回 </a-button>
          <a-button type="primary" @click="handlerDetemine('editList')">
            提交
          </a-button>
        </template>
        <a-form-model
          ref="editList"
          :model="editList"
          :rules="rules"
          v-bind="formItemLayout"
        >
          <a-form-model-item label="部门名称" prop="nm">
            <a-input placeholder="请输入" v-model="editList.nm" />
          </a-form-model-item>
          <a-form-model-item label="上级部门" prop="pid">
            <a-select placeholder="请选择" v-model="editList.pnm">
              <a-select-option v-for="supes in superiorForm" :key="supes.id">
                {{ supes.nm }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="部门顺序" prop="o">
            <a-input placeholder="请输入" v-model="editList.o" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { Modal, message } from "ant-design-vue";
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
        ellipsis: true,
      },
      {
        title: "部门等级",
        dataIndex: "lvl",
        key: "lvl",
        ellipsis: true,
      },
      {
        title: "部门顺序",
        dataIndex: "o",
        key: "o",
        ellipsis: true,
      },
      {
        title: "上级部门",
        dataIndex: "pnm",
        key: "pnm",
        ellipsis: true,
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
        sorter: (a, b) => {
          return a.updated > b.updated ? 1 : -1;
        },
      },
      {
        title: "操作",
        dataIndex: "operation",
        width: 150,
        fixed: "right",
        scopedSlots: { customRender: "operation" },
      },
    ];
    let GloTips = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("该项不能为空"));
      } else {
        callback();
      }
    };
    return {
      // 栅格布局
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
      },
      // 校验规则
      rules: {
        nm: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        pid: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        o: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
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
      visible: false,
      visibilie: false,
      // 上级部门
      superiorForm: [],
      // 条件查询
      departForm: {
        nm: "",
      },
      // 详情
      id: "",
      url: "",
      // 编辑部门
      editList: {},
      // 分页
      pagination: {
        total: 0,
        pageSizeOptions: ["10", "20", "50", "100"],
        defaultPageSize: 20,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        size: "middle",
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
        onChange: (current, pageSize) => {
          this.departmentList(current, pageSize);
        },
        showQuickJumper: true,
      },
      dis: "display: none",
      msg: "",
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
    handleOk(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          var qs = require("qs");
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
              if (res.data.code) {
                this.visible = false;
                message.success("成功");
                this.departmentList();
              } else if (!res.data.code) {
                Modal.error({
                  title: res.data.data.errmsg,
                  content: "请选择其他顺序编号",
                });
                this.visible = true;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.dis = "display: block";
          this.msg = "请填写必填字段：";
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
          this.editList = result.dept_info;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlerDetemine(form) {
      var qs = require("qs");
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = {
            dept_id: this.editList.id,
            nm: this.editList.nm,
            pid: this.editList.pid,
            o: this.editList.o,
          };
          this.$api
            .post(this.baseURL + "dept/edit_dept/", qs.stringify(params), {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            })
            .then((res) => {
              if (res.data.code) {
                message.success("成功");
                this.visibilie = false;
                this.departmentList();
              } else {
                message.error(res.data.data.errmsg);
                this.visibilie = true;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
    departmentList(page, perpage) {
      this.$api
        .get(this.baseURL + "dept/dept/", {
          params: {
            page: page,
            perpage: perpage,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.departlist = result.datarows;
          this.pagination.total = result.pagination.total_items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 详情
    handlerInfo(id) {
      this.url = "/department/dedetails/:id=" + id;
    },
  },
  mounted() {
    this.departmentList();
    this.getSuperior();
  },
};
</script>

<style scoped>
.ant-col-8 {
  height: auto;
}
.ant-spin-nested-loading {
  position: relative;
  width: 100%;
  height: auto;
}
.header {
  width: 100%;
  height: 100px;
  padding: 18px 24px;
  box-sizing: border-box;
  background: #fff;
}
.header > h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.tabs-item-top {
  width: 99%;
  height: auto;
  padding: 0 24px;
  margin: 8px auto 24px;
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
