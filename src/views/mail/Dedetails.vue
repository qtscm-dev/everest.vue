<template>
  <div>
    <div class="header">
      <h3>部门管理</h3>
    </div>
    <div class="conter">
      <div class="top">
        <div class="top-1">基本信息</div>
        <div class="top-2">
          <a-descriptions :column="{ xs: 2, sm: 3, md: 4 }">
            <a-descriptions-item label="部门名称">
              {{ depart.nm }}
            </a-descriptions-item>
            <a-descriptions-item label="部门等级">
              {{ depart.lvl }}
            </a-descriptions-item>
            <a-descriptions-item label="部门顺序">
              {{ depart.o }}
            </a-descriptions-item>
            <a-descriptions-item label="上级部门">
              {{ depart.pnm }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
      <div class="concent">
        <div style="margin-bottom: 24px">
          <span>员工信息</span>
          <a-button type="primary" class="concent-button" @click="handlerNewem"
            >新增员工</a-button
          >
        </div>
        <a-radio-group style="margin-bottom: 24px" v-model="value">
          <a-radio-button
            value="a"
            @click="handlerTrue"
            style="font-size: 14px"
          >
            已激活&nbsp;&nbsp;{{ listLenght.trueLenght }}
          </a-radio-button>
          <a-radio-button
            value="b"
            @click="handlerFalse"
            style="font-size: 14px"
          >
            已禁用&nbsp;&nbsp;{{ listLenght.falseLenght }}
          </a-radio-button>
          <a-radio-button value="c" @click="handlerAll" style="font-size: 14px">
            全部&nbsp;&nbsp;{{ listLenght.allLenght }}
          </a-radio-button>
        </a-radio-group>
        <a-empty
          image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
          :image-style="{
            height: '60px',
          }"
          :style="[
            { display: empList == false ? 'block' : 'none' },
            { margin: '24px' },
          ]"
        >
          <span slot="description"> 暂无数据 </span>
          <a-button type="primary" @click="handlerNewem"> 现在创建 </a-button>
        </a-empty>
        <a-table
          :columns="columns"
          :data-source="empList"
          :scroll="{ x: 1500 }"
          :pagination="pagination"
          :rowKey="(record) => record.id"
          size="middle"
          :rowClassName="
            (record, index) => (index % 2 === 1 ? 'table-proj' : null)
          "
          :style="{ display: empList == false ? 'none' : 'block' }"
        >
          <span slot="pic" slot-scope="text, record">
            <img
              style="
                display: block;
                width: 30px;
                heigth: 30px;
                border-radius: 50%;
              "
              :src="record.avatar"
            />
          </span>
          <!-- 状态 -->
          <a-badge
            v-if="text == '已激活'"
            slot="status"
            slot-scope="text"
            status="success"
            text="已激活"
            style="font-weight: initial"
          />
          <a-badge
            v-else-if="text == '已禁用'"
            slot="status"
            slot-scope="text"
            status="error"
            text="已禁用"
            style="font-weight: initial"
          />
          <template slot="operation" slot-scope="text, record">
            <a
              style="font-size: 14px; font-weight: initial; color: #1890ff"
              @click="() => handlerInfo(record.id)"
              >详情</a
            >
            <a-divider type="vertical" />
            <a
              style="font-size: 14px; font-weight: initial; color: #1890ff"
              @click="() => handlerEdit(record.id)"
            >
              编辑
            </a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="请确认是否要删除该员工？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="() => handlerDelete(record.id)"
            >
              <a
                style="font-size: 14px; font-weight: initial; color: #1890ff"
                class="ant-dropdown-link"
              >
                删除</a
              >
            </a-popconfirm>
            <a-divider type="vertical" />
            <a
              style="font-size: 14px; font-weight: initial; color: #1890ff"
              @click="() => handlerReset(record.id)"
              >重置</a
            >
          </template>
        </a-table>
        <!-- 新增员工 -->
        <NewEmploy
          :editList="editList"
          :dept_list="dept_list"
          :job_list="job_list"
          :role_list="role_list"
          :visibles1="visibles1"
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
    <Footer />
  </div>
</template>

<script>
import imgUrl1 from "../../../public/portrait/woman.jpg";
import imgUrl2 from "../../../public/portrait/man.jpg";
import { Modal, message } from "ant-design-vue";
import NewEmploy from "./NewEmploy/NewEmploy";
import EditEmploy from "./EditEmploy/EditEmploy";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  name: "dedetails",
  components: { NewEmploy, EditEmploy },
  data() {
    const columns = [
      {
        title: "头像",
        dataIndex: "avatar",
        key: "avatar",
        width: 70,
        scopedSlots: { customRender: "pic" },
      },
      {
        title: "姓名",
        dataIndex: "nm",
        key: "nm",
        width: 90,
      },
      {
        title: "手机号码",
        dataIndex: "mob",
        key: "mob",
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
        key: "sex",
      },
      {
        title: "职位",
        dataIndex: "job",
        key: "job",
      },
      {
        title: "部门顺序",
        dataIndex: "o",
        key: "o",
      },
      {
        title: "是否领导",
        dataIndex: "is_leader",
        key: "is_leader",
      },
      {
        title: "操作时间",
        dataIndex: "updated",
        key: "updated",
        sorter: (a, b) => {
          return a.updated > b.updated ? 1 : -1;
        },
      },
      {
        title: "操作",
        dataIndex: "operation",
        fixed: "right",
        scopedSlots: { customRender: "operation" },
      },
    ];
    return {
      // 参数
      param: this.$router.currentRoute.params.id.slice(4),
      // 表格
      form: this.$form.createForm(this, { name: "coordinated" }),
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
      visibles1: false,
      visibles2: false,
      value: "a",
      // 部门详情
      depart: "",
      // 员工信息
      columns,
      empList: [],
      staff_list: "",
      // 类型
      role_list: [],
      job_list: [],
      dept_list: [],
      imgUrl: this.baseURL + "project/upload_file/",
      imageUrl: "",
      // 数据长度
      listLenght: {
        trueLenght: "",
        falseLenght: "",
        allLenght: "",
      },
      // 新增员工
      editList: [
        {
          login_nm: "",
          nm: "",
          mob: "",
          phone: "",
          active: "",
          email: "",
          address: "",
          avatar: "",
          job_id: "",
          dept_id: "",
          is_leader: "",
          gender: "",
          role_id: "",
        },
      ],
      // 分页
      pagination: {
        defaultPageSize: 20,
        total: 0,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        size: "middle",
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
    };
  },
  methods: {
    // 获取信息
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
    getInfo(id, stat) {
      this.$api
        .get(this.baseURL + "dept/dept_detail/", {
          params: {
            dept_id: id,
            sta: stat,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.depart = result.dept_info;
          if (!result.staff_list) {
            this.empList = "";
          } else {
            this.empList = result.staff_list;
          }
          this.listLenght.trueLenght = result.count_num.active_num;
          this.listLenght.falseLenght = result.count_num.disabled_num;
          this.listLenght.allLenght = result.count_num.total_num;
          this.pagination.total = result.pagination.total_items;
          for (let i = 0; i < this.empList.length; i++) {
            if (this.empList[i].avatar == null) {
              if (this.empList[i].sex == "女") {
                this.empList[i].avatar = imgUrl1;
              } else {
                this.empList[i].avatar = imgUrl2;
              }
            } else {
              this.empList[i].avatar = this.baseURL + this.empList[i].avatar;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 已激活
    handlerTrue() {
      this.getInfo(this.param, "t");
    },
    // 已禁用
    handlerFalse() {
      this.getInfo(this.param, "f");
    },
    // 全部
    handlerAll() {
      this.getInfo(this.param, "all");
    },
    // 新增员工
    handlerNewem() {
      this.visibles1 = true;
    },
    // 员工详情
    handlerInfo(id) {
      this.$router.push("/employee/emdetails/:id=" + id);
    },
    // 员工编辑
    handlerEdit(id) {
      this.visibles2 = true;
      console.log(id);
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
    // 文件上传
    handleChange(info) {
      if (info.file.status === "uploading") {
        message.error("上传失败");
      }
      if (info.file.status === "done") {
        let result = info.file.response.data;
        console.log(result);
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          message.success("上传成功");
        });
      }
    },
    beforeUpload(file) {
      console.log(file.type);
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    // 删除员工
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
          let result = res.data;
          if (!result.code) {
            Modal.error({
              title: "删除员工",
              content: result.data.errmsg,
              okText: "返回",
            });
          }
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.handlerTrue();
    this.handlerIn();
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
.header > h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.conter {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 24px;
}
.conter .top {
  height: auto;
  margin: 0 auto;
  padding: 0;
  background: #fff;
}
.conter .top .top-1 {
  width: 100%;
  height: 57px;
  padding-left: 24px;
  border-bottom: 1px solid #e8e8e8;
  line-height: 55px;
  color: #000;
  font-size: 16px;
}
.conter .top .top-2 {
  width: 100%;
  padding: 24px;
  font-size: 14px;
}
.conter .concent {
  width: 99.5%;
  height: auto;
  margin: 24px auto;
  box-sizing: border-box;
  padding: 24px;
  background: #fff;
}
.conter .concent div span {
  font-weight: bold;
  color: #000;
  font-size: 16px;
}
.conter .concent div .concent-button {
  float: right;
}
.conter .concent .concent-radio {
  margin: 24px auto;
}
.conter .concent .concent-div {
  width: auto;
  height: 32px;
}
.conter .concent .concent-div-pag {
  float: right;
}
</style>
