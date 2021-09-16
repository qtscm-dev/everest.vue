<template>
  <div>
    <div class="header">
      <a-breadcrumb class="title">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>立项中心</a-breadcrumb-item>
      </a-breadcrumb>
      <span>立项中心</span>
    </div>
    <a-form class="ant-advanced-search-form">
      <a-row>
        <a-col :span="8">
          <a-form-item label="编号名称">
            <a-input
              v-model="conditionForm.search"
              placeholder="请输入编号/名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="选择日期">
            <a-range-picker
              v-model="conditionForm.proj_cycle"
              v-decorator="['range-picker']"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8" :style="{ display: 3 < count ? 'none' : 'block' }">
          <a-form-item label="建设单位">
            <a-input v-model="conditionForm.client_nm" placeholder="请输入" />
          </a-form-item>
        </a-col>
        <a-col :span="8" :style="{ display: 3 < count ? 'none' : 'block' }">
          <a-form-item label="工程地点">
            <a-cascader placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
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
    </a-form>
    <div class="concent">
      <div class="concent-title">
        <span>项目列表</span>
        <a-button style="float: right" type="primary" @click="handlerNewpro"
          >新建项目</a-button
        >
      </div>
      <div ref="havedata">
        <a-empty />
      </div>
      <div ref="emptys">
        <a-radio-group class="pro_radio" v-model="value">
          <a-radio-button value="a" @click="projectList">
            待立项&nbsp;&nbsp;{{ dataLength.listLength }}
          </a-radio-button>
          <a-radio-button value="b" @click="handlerApproved">
            已立项&nbsp;&nbsp;{{ dataLength.approvedLength }}
          </a-radio-button>
          <a-radio-button value="c" @click="handlerWithdrawn">
            已撤回&nbsp;&nbsp;{{ dataLength.withdrawnLength }}
          </a-radio-button>
          <a-radio-button value="d" @click="handlerAll">
            全部&nbsp;&nbsp;{{ dataLength.allLength }}
          </a-radio-button>
        </a-radio-group>
        <a-table
          :columns="columns"
          :data-source="projeList"
          :pagination="pagination"
          :scroll="{ x: 1500 }"
          size="middle"
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
        key: "code",
        width: 100,
        fixed: "left",
        align: "center",
      },
      {
        title: "项目名称",
        dataIndex: "nm",
        key: "nm",
        width: 100,
      },
      {
        title: "建设单位",
        dataIndex: "client_nm",
        key: "client_nm",
        width: 100,
        ellipsis: true,
      },
      {
        title: "幕墙面积",
        dataIndex: "wall_area",
        key: "wall_area",
        width: 100,
      },
      {
        title: "建筑类型",
        dataIndex: "build_lbl",
        key: "build_lbl",
        width: 100,
        ellipsis: true,
      },
      {
        title: "项目类型",
        dataIndex: "project_lbl",
        key: "project_lbl",
        width: 80,
      },
      {
        title: "设计内容",
        dataIndex: "major_lbl",
        key: "major_lbl",
        width: 150,
      },
      {
        title: "项目周期",
        dataIndex: "pro_cycle",
        key: "pro_cycle",
        width: 180,
      },
      {
        title: "项目地点",
        dataIndex: "bulid_addr",
        key: "bulid_addr",
        width: 180,
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
      },
      {
        title: "操作",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
        fixed: "right",
        width: 70,
        align: "center",
      },
    ];
    return {
      expand: false,
      // 列表展示
      columns,
      projeList: [],
      // 单选框
      value: "a",
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
      pagination: {
        defaultPageSize: 20,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        size: "middle",
        total: "",
        proj: "",
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
        onChange: (current, pageSize) => {
          this.getProject(this.pagination.proj, current, pageSize);
        },
      },
      // 数据长度
      dataLength: {
        listLength: "",
        approvedLength: "",
        withdrawnLength: "",
        allLength: "",
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
          console.log(this.projectList);
          this.projeList = result.datarows;
          console.log(this.projectList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置
    hanslerReset() {
      this.conditionForm.proj_cycle = [];
      this.conditionForm.search = "";
      this.conditionForm.client_nm = "";
      this.projectList();
    },
    // 新建项目
    handlerNewpro() {
      this.$router.push({ name: "newproject" });
    },
    // 项目列表(待立项)
    projectList() {
      this.getProject("1000");
    },
    // 已立项
    handlerApproved() {
      this.getProject("2000");
    },
    // 已撤回
    handlerWithdrawn() {
      this.getProject("1211");
    },
    // 全部
    handlerAll() {
      this.getProject("all");
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
          console.log(result);
          this.projeList = result.datarows;
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
    // 空状态
    getEmptys() {
      let emptys = this.$refs.emptys;
      let havedata = this.$refs.havedata;
      this.$api
        .get(this.baseURL + "project/project/", {
          params: {
            status: "all",
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          let title = result.pagination.total_items;
          if (title != null) {
            havedata.style.display = "none";
            emptys.style.display = "block";
          } else {
            havedata.style.display = "block";
            emptys.style.display = "none";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.projectList();
    this.getEmptys();
  },
};
</script>

<style scoped>
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
let i ; // 1,i = 0; 2, i = 9; i = list2 list let i ; 2 i = 9 ;
