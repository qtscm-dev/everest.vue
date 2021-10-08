<template>
  <div>
    <div class="header">
      <a-breadcrumb class="title">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>立项中心</a-breadcrumb-item>
      </a-breadcrumb>
      <span>立项中心</span>
    </div>
    <a-form v-bind="formItemLayout" class="ant-advanced-search-form">
      <a-row>
        <a-col :span="6">
          <a-form-item label="编号名称">
            <a-input
              v-model="conditionForm.search"
              placeholder="请输入编号/名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="选择日期">
            <a-range-picker
              v-model="conditionForm.proj_cycle"
              v-decorator="['range-picker']"
              @change="onChange"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="建设单位">
            <a-input v-model="conditionForm.client_nm" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="6" :style="{ textAlign: 'right' }">
          <a-button type="primary" @click="handlerSubmit"> 查询 </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="hanslerReset">
            重置
          </a-button>
          <a
            ref="run"
            :style="{ marginLeft: '8px', fontSize: '12px' }"
            @click="toggle"
          >
            收起
          </a>
          <a-icon style="color: #1890ff" :type="expand ? 'up' : 'down'" />
        </a-col>
      </a-row>
      <a-row :style="{ display: 3 < count ? 'none' : 'block' }">
        <a-col :span="6">
          <a-form-item label="工程地点">
            <a-cascader placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="concent">
      <div class="concent-title">
        <span>项目列表</span>
        <a-button style="float: right" type="primary" @click="handlerNewpro"
          >新建项目</a-button
        >
      </div>
      <a-radio-group class="pro_radio" v-model="value">
        <a-radio-button class="radio-but" value="a" @click="handlerAll">
          全部&nbsp;&nbsp;&nbsp;{{ dataLength.allLength }}
        </a-radio-button>
        <a-radio-button class="radio-but" value="b" @click="projectList">
          待立项&nbsp;&nbsp;&nbsp;{{ dataLength.listLength }}
        </a-radio-button>
        <a-radio-button class="radio-but" value="c" @click="handlerApproved">
          已立项&nbsp;&nbsp;&nbsp;{{ dataLength.approvedLength }}
        </a-radio-button>
        <a-radio-button class="radio-but" value="d" @click="handlerWithdrawn">
          已中止&nbsp;&nbsp;&nbsp;{{ dataLength.withdrawnLength }}
        </a-radio-button>
      </a-radio-group>
      <a-empty :style="{ display: projeList == false ? 'block' : 'none' }" />
      <a-table
        :style="{ display: projeList == false ? 'none' : 'block' }"
        :columns="columns"
        :data-source="projeList"
        :pagination="pagination"
        :scroll="{ x: 1500 }"
        :rowKey="(record) => record.id"
        size="middle"
        :rowClassName="
          (record, index) => (index % 2 === 1 ? 'table-proj' : null)
        "
      >
        <a-badge
          v-if="text == '1000'"
          slot="status"
          slot-scope="text"
          status="default"
          text="待立项"
        />
        <a-badge
          v-else-if="text == '2000'"
          slot="status"
          slot-scope="text"
          status="success"
          text="已立项"
        />
        <a-badge
          v-else-if="text == '1211'"
          slot="status"
          slot-scope="text"
          status="error"
          text="已中止"
        />
        <template slot="operation" slot-scope="text, record">
          <div>
            <a
              style="font-size: 14px"
              @click="() => handlerJump(record.id, record.status)"
              >详情</a
            >
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "project",
  data() {
    const columns = [
      {
        title: "项目ID",
        dataIndex: "code",
      },
      {
        title: "项目名称",
        dataIndex: "nm",
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
        title: "建设单位",
        dataIndex: "client_nm",
        ellipsis: true,
      },
      {
        title: "幕墙面积",
        dataIndex: "wall_area",
      },
      {
        title: "建筑类型",
        dataIndex: "build_lbl",
        ellipsis: true,
      },
      {
        title: "项目类型",
        dataIndex: "project_lbl",
      },
      {
        title: "设计内容",
        dataIndex: "major_lbl",
        ellipsis: true,
      },
      {
        title: "项目周期",
        dataIndex: "pro_cycle",
        width: 200,
        ellipsis: true,
      },
      {
        title: "项目地点",
        dataIndex: "bulid_addr",
        width: 220,
        ellipsis: true,
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
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
        fixed: "right",
        width: 60,
      },
    ];
    return {
      expand: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      // 列表展示
      columns,
      projeList: [],
      rowClassName: "",
      // 单选框
      value: "a",
      // 状态
      statu: "",
      // 条件查询
      conditionForm: {
        proj_cycle: [],
        search: "",
        client_nm: "",
      },
      // 详情查询
      viewForm: {
        id: "",
        status: "",
      },
      // 详情
      viewUrl: "",
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
          console.log(this.currt);
          this.getProject(this.pagination.proj, current, pageSize);
        },
        showQuickJumper: true,
      },
      // 数据长度
      dataLength: {
        listLength: 0,
        approvedLength: 0,
        withdrawnLength: 0,
        allLength: 0,
      },
    };
  },
  computed: {
    count() {
      return this.expand ? 5 : 3;
    },
  },
  methods: {
    // 条件查询
    handlerSubmit() {
      this.$api
        .get(this.baseURL + "project/project/", {
          params: {
            status: this.statu,
            search: this.conditionForm.search,
            proj_cycle: this.conditionForm.proj_cycle,
            client_nm: this.conditionForm.client_nm,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.projeList = result.datarows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onChange(date, dateString) {
      console.log(date);
      this.conditionForm.proj_cycle = dateString;
    },
    // 重置
    hanslerReset() {
      this.conditionForm.proj_cycle = [];
      this.conditionForm.search = "";
      this.conditionForm.client_nm = "";
      this.getProject(this.statu);
    },
    // 新建项目
    handlerNewpro() {
      this.$router.push({ name: "newproject" });
    },
    // 待立项
    projectList() {
      this.getProject("1000", this.currt);
      this.statu = "1000";
    },
    // 已立项
    handlerApproved() {
      this.getProject("2000", this.currt);
      this.statu = "2000";
    },
    // 已中止
    handlerWithdrawn() {
      this.getProject("1211", this.currt);
      this.statu = "1211";
    },
    // 全部
    handlerAll() {
      this.getProject("all", this.currt);
      this.statu = "all";
    },
    // 项目列表
    getProject(sta, pages, perpage) {
      this.$api
        .get(this.baseURL + "project/project/", {
          params: {
            status: sta,
            page: pages,
            perpage: perpage,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          if (!result.datarows) {
            this.projeList = "";
          } else {
            this.projeList = result.datarows;
          }
          this.dataLength.listLength = result.count_num.not_approved_num;
          this.dataLength.approvedLength = result.count_num.approved_num;
          this.dataLength.withdrawnLength = result.count_num.revoke_num;
          this.dataLength.allLength = result.count_num.whole_num;
          this.pagination.total = result.pagination.total_items;
          this.pagination.proj = sta;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 展开收起
    toggle() {
      this.expand = !this.expand;
      let run = this.$refs.run;
      if (this.expand) {
        run.innerHTML = "展开";
      } else if (!this.expand) {
        run.innerHTML = "收起";
      }
    },
    // 查看详情
    handlerJump(id, status) {
      if (status == 1000) {
        this.$router.push("/index/project/project/toapppro/:id=" + id);
      } else {
        this.$router.push("/index/project/project/apppro/:id=" + id);
      }
    },
  },
  mounted() {
    this.handlerAll();
  },
};
</script>

<style>
.table-proj {
  background: #fafafa;
}
</style>
<style scoped>
.radio-but {
  width: 146px;
  text-align: center;
}
.header {
  width: 100%;
  height: 80px;
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
.concent {
  width: 98%;
  height: auto;
  padding: 24px;
  box-sizing: border-box;
  margin: 24px auto;
  background: #fff;
}
.concent-title {
  width: 100%;
  height: 32px;
  margin-bottom: 24px;
  line-height: 32px;
}
.concent .concent-div {
  width: auto;
  height: 32px;
}
.concent div span {
  color: #000;
  font-size: 16px;
}
.concent .concent-div-pag {
  float: right;
}
.pro_radio {
  margin-bottom: 24px;
}
.ant-advanced-search-form {
  width: 98%;
  height: auto;
  margin: 24px auto;
  background: #fff;
  padding: 24px;
  border-radius: 6px;
}
.ant-advanced-search-form .ant-form-item {
  display: flex;
  margin-bottom: 0;
}
</style>
