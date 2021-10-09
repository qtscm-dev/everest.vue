<template>
  <div>
    <div class="header">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>通讯录管理</a-breadcrumb-item>
        <a-breadcrumb-item>员工管理</a-breadcrumb-item>
      </a-breadcrumb>
      <h3>员工管理</h3>
      <a-tabs default-active-key="1">
        <a-tab-pane class="tabs-item" key="1" tab="内部系统">
          <div class="tabs-item-top">
            <a-form
              :model="queryForm"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 15 }"
            >
              <a-row>
                <a-col :span="8">
                  <a-form-item
                    style="margin-bottom: 12px; margin-top: 12px"
                    label="员工"
                  >
                    <a-input
                      v-model="queryForm.nm"
                      placeholder="请输入账号/名称"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    style="margin-bottom: 12px; margin-top: 12px"
                    label="部门"
                  >
                    <a-input
                      v-model="queryForm.dept_nm"
                      placeholder="请输入部门名称"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
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
          <div class="tabs-item-content">
            <div
              style="
                width: 100%;
                height: 32px;
                line-height: 32px;
                margin-bottom: 24px;
              "
            >
              <span>员工列表</span>
              <a-button
                :style="[
                  { display: employlist == false ? 'none' : 'block' },
                  { float: 'right' },
                ]"
                type="primary"
                @click="handlerNew"
                >新增员工</a-button
              >
            </div>
            <a-radio-group style="margin-bottom: 24px" v-model="value">
              <a-radio-button
                value="a"
                @click="handlerAll"
                style="width: 146px; font-size: 14px; text-align: center"
              >
                全部&nbsp;&nbsp;{{ listLenght.allLenght }}
              </a-radio-button>
              <a-radio-button
                value="b"
                @click="handlerTrue"
                style="width: 146px; font-size: 14px; text-align: center"
              >
                已激活&nbsp;&nbsp;{{ listLenght.trueLenght }}
              </a-radio-button>
              <a-radio-button
                value="c"
                @click="handlerFalse"
                style="width: 146px; font-size: 14px; text-align: center"
              >
                已禁用&nbsp;&nbsp;{{ listLenght.falseLenght }}
              </a-radio-button>
            </a-radio-group>
            <a-empty
              image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
              :image-style="{
                height: '60px',
              }"
              :style="[
                { display: employlist == false ? 'block' : 'none' },
                { margin: '24px' },
              ]"
            >
              <span slot="description"> 暂无数据 </span>
            </a-empty>
            <a-table
              :columns="columns"
              :data-source="employlist"
              :scroll="{ x: 1500 }"
              :pagination="pagination"
              size="middle"
              :rowKey="(record) => record.id"
              :rowClassName="
                (record, index) => (index % 2 === 1 ? 'table-emplo' : null)
              "
              :style="{ display: employlist == false ? 'none' : 'block' }"
            >
              <!-- 头像 -->
              <span slot="pic" slot-scope="text, record">
                <a-avatar :src="record.avatar" />
              </span>
              <!-- 状态 -->
              <a-badge
                v-if="text == '已激活'"
                slot="status"
                slot-scope="text"
                status="success"
                text="已激活"
              />
              <a-badge
                v-else-if="text == '已禁用'"
                slot="status"
                slot-scope="text"
                status="error"
                text="已禁用"
              />
              <!-- 操作 -->
              <template slot="operation" slot-scope="text, record">
                <a @click="() => handlerEmpl(record.id)">详情</a>
                <a-divider type="vertical" />
                <a @click="() => handlerEdit(record.id)"> 编辑 </a>
                <a-divider type="vertical" />
                <a-popconfirm
                  title="请确认是否要删除该员工？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="() => handlerDelete(record.id)"
                >
                  <a class="ant-dropdown-link"> 删除</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link"> 重置</a>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
      <!-- 新增员工 -->
      <NewEmploy
        :editList="editList"
        :dept_list="dept_list"
        :job_list="job_list"
        :role_list="role_list"
        :visibles1="vi"
      />
      <!-- 编辑员工 -->
      <EditEmploy
        :staff_list="staff_list"
        :dept_list="dept_list"
        :job_list="job_list"
        :role_list="role_list"
        :visibles2="visibles2"
      />
    </div>
  </div>
</template>

<script>
import imgSrc1 from "../../../public/portrait/woman.jpg";
import imgSrc2 from "../../../public/portrait/man.jpg";
import { message, Modal } from "ant-design-vue";
import NewEmploy from "./NewEmploy/NewEmploy";
import EditEmploy from "./EditEmploy/EditEmploy";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "employee",
  components: { NewEmploy, EditEmploy },
  data() {
    const columns = [
      {
        title: "头像",
        dataIndex: "avatar",
        scopedSlots: { customRender: "pic" },
      },
      {
        title: "姓名",
        dataIndex: "nm",
      },
      {
        title: "手机号码",
        dataIndex: "mob",
        width: 120,
      },
      {
        title: "状态",
        dataIndex: "status",
        scopedSlots: { customRender: "status" },
        sorter: (a, b) => {
          return a.status > b.status ? 1 : -1;
        },
      },
      {
        title: "性别",
        dataIndex: "sex",
      },
      {
        title: "职位",
        dataIndex: "job",
      },
      {
        title: "部门",
        dataIndex: "dept_nm",
      },
      {
        title: "部门等级",
        dataIndex: "lvl",
      },
      {
        title: "部门顺序",
        dataIndex: "o",
      },
      {
        title: "是否领导",
        dataIndex: "is_leader",
      },
      {
        title: "创建时间",
        dataIndex: "created",
        width: 150,
      },
      {
        title: "操作时间",
        dataIndex: "updated",
        width: 150,
        sorter: (a, b) => {
          return a.updated > b.updated ? 1 : -1;
        },
      },
      {
        title: "操作",
        width: 200,
        fixed: "right",
        scopedSlots: { customRender: "operation" },
      },
    ];
    return {
      // 表单
      form: this.$form.createForm(this, { name: "coordinated" }),
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
      vi: false,
      visibles2: false,
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
      // 员工表格
      columns,
      employlist: [],
      listLenght: {
        trueLenght: 0,
        falseLenght: 0,
        allLenght: 0,
      },
      // 状态默认
      value: "a",
      // 头像地址
      imgUrl: this.baseURL + "project/upload_file/",
      imageUrl: "",
      // 新增员工
      editList: [
        {
          login_nm: "",
          nm: "",
          mob: "",
          phone: "",
          active: "",
          email: "",
          address: [[], []],
          avatar: "",
          job_id: "",
          dept_id: "",
          is_leader: "",
          gender: "",
          role_id: "",
        },
      ],
      dept_list: [],
      job_list: [],
      role_list: [],
      // 状态
      statu: "",
      // 查询条件
      queryForm: {
        nm: "",
        dept_nm: "",
      },
      // 编辑员工
      staff_list: [],
      id: "",
      // 分页
      currt: 1,
      pagination: {
        pageSizeOptions: ["10", "20", "50", "100"],
        defaultPageSize: 20,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        size: "middle",
        total: 0,
        proj: "",
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
        onChange: (current, pageSize) => {
          this.currt = current;
          this.handlerInfo(this.pagination.proj, current, pageSize);
        },
        showQuickJumper: true,
      },
    };
  },
  methods: {
    // 条件查询
    handlersubmit() {
      this.$api
        .get(this.baseURL + "dept/mbr/", {
          params: {
            status: this.statu,
            nm: this.queryForm.nm,
            dept_nm: this.queryForm.dept_nm,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          this.employlist = result.data.data.datarows;
          for (let i = 0; i < this.employlist.length; i++) {
            if (this.employlist[i].avatar !== null) {
              let emel = this.employlist[i].avatar;
              this.employlist[i].avatar = this.baseURL + emel;
            } else {
              if (this.employlist[i].sex == "女") {
                this.employlist[i].avatar = imgSrc1;
              } else {
                this.employlist[i].avatar = imgSrc2;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置
    handlerReset() {
      this.queryForm.nm = "";
      this.queryForm.dept_nm = "";
      this.handlerInfo(this.statu);
    },
    // 文件上传
    handleChange(info) {
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    // 新增员工
    handlerNew() {
      this.vi = true;
    },
    // 获取全部员工信息
    handlerAll() {
      this.handlerInfo("all", this.currt);
      this.statu = "all";
    },
    // 获取已激活员工信息
    handlerTrue() {
      this.handlerInfo("t", this.currt);
      this.statu = "t";
    },
    // 获取已禁用员工信息
    handlerFalse() {
      this.handlerInfo("f", this.currt);
      this.statu = "f";
    },
    // 获取员工信息
    handlerInfo(stat, page, perpage) {
      this.$api
        .get(this.baseURL + "dept/mbr/", {
          params: {
            sta: stat,
            page: page,
            perpage: perpage,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.employlist = result.datarows;
          if (this.employlist != false) {
            this.listLenght.trueLenght = result.count_num.active_num;
            this.listLenght.falseLenght = result.count_num.disabled_num;
            this.listLenght.allLenght = result.count_num.total_num;
          }
          this.pagination.total = result.pagination.total_items;
          this.pagination.proj = stat;
          for (let i = 0; i < this.employlist.length; i++) {
            if (this.employlist[i].avatar !== null) {
              let emel = this.employlist[i].avatar;
              this.employlist[i].avatar = this.baseURL + "" + emel;
            } else {
              if (this.employlist[i].sex == "女") {
                this.employlist[i].avatar = imgSrc1;
              } else {
                this.employlist[i].avatar = imgSrc2;
              }
            }
          }
          this.pagination.total = result.pagination.total_items;
          this.pagination.emp_sta = stat;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除员工信息
    handlerDelete(id) {
      this.$api
        .get(this.baseURL + "dept/del_mbr/", {
          params: {
            user_id: id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success("删除成功");
          } else if (!res.data.code) {
            Modal.error({
              title: "删除员工",
              content: res.data.data.errmsg,
              okText: "返回",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 详情
    handlerEmpl(id) {
      this.$router.push("/index/employee/emdetails/:id=" + id);
    },
    handlerIn() {
      this.$api
        .get(this.baseURL + "dept/new_mbr/", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          this.dept_list = result.data.data.dept_list;
          this.job_list = result.data.data.job_list;
          this.role_list = result.data.data.role_list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑员工
    handlerEdit(id) {
      this.visibles2 = true;
      this.id = id;
      this.$api
        .get(this.baseURL + "dept/mbr_detail/", {
          params: {
            user_id: id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.staff_list = result.staff_info;
          this.staff_list.user_id = id;
          if (this.staff_list.sta == "t") {
            this.staff_list.active = "t";
          } else {
            this.staff_list.active = "f";
          }
          if (this.staff_list.is_leader == "t") {
            this.staff_list.leader = "t";
          } else {
            this.staff_list.is_leader = "f";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.handlerAll();
    this.handlerIn();
  },
};
</script>

<style scooed>
.ant-col-8 {
  height: auto;
}
.table-emplo {
  background: #fafafa;
}
.ant-spin-nested-loading {
  position: relative;
  width: 100%;
  height: auto;
}
.header {
  width: 100%;
  height: 120px;
  padding: 18px 24px;
  box-sizing: border-box;
  background: #fff;
}
.header > h3 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
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
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
