<template>
  <div>
    <div class="header">
      <a-breadcrumb class="title">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>指派中心</a-breadcrumb-item>
      </a-breadcrumb>
      <span>指派中心</span>
    </div>
    <a-form class="ant-advanced-search-form">
      <a-row>
        <a-col :span="12">
          <a-form-item label="编号名称">
            <a-input
              v-model="inquire.search"
              placeholder="请输入编号/名称"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-model="inquire.proj_cycle" label="日期">
            <a-range-picker />
          </a-form-item>
        </a-col>
        <a-col :span="12" :style="{ display: 3 < count ? 'none' : 'block' }">
          <a-form-item label="建设单位">
            <a-input
              v-model="inquire.client_nm"
              placeholder="请输入建设单位名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12" :style="{ display: 3 < count ? 'none' : 'block' }">
          <a-form-item label="工程地点">
            <a-input placeholder="请输入工程地点" />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="query">
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit" @click="handlerSubmit">
            查询
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="reset">
            重置
          </a-button>
          <a
            ref="run"
            :style="{ marginLeft: '8px', fontSize: '12px' }"
            @click="toggle"
          >
            收起 </a
          ><a-icon :type="expand ? 'up' : 'down'" />
        </a-col>
      </div>
    </a-form>
    <div class="content">
      <div class="content-title">
        <span>项目列表</span>
      </div>
      <!-- <div class="empty" v-show="flase">
        <a-empty />
      </div> -->
      <div>
        <a-radio-group default-value="a">
          <a-radio-button :style="styles" value="a" @click="tobeAssign">
            待指派
          </a-radio-button>
          <a-radio-button :style="styles" value="b" @click="tobeNewAssign">
            已指派
          </a-radio-button>
          <a-radio-button :style="styles" value="c" @click="tobeWithdraw">
            已撤回
          </a-radio-button>
          <a-radio-button :style="styles" value="d" @click="tobeAll">
            全部
          </a-radio-button>
        </a-radio-group>
        <a-table
          :columns="columns"
          :data-source="toAssign"
          :scroll="{ x: 1300 }"
          :rowKey="(record) => record.id"
        >
          <a class="active" slot="action" slot-scope="">详情</a>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "assign",
  data() {
    const columns = [
      {
        title: "项目ID",
        dataIndex: "code",
        key: "code",
        width: 100,
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
        width: 150,
      },
      {
        title: "项目类型",
        dataIndex: "project_lbl",
        key: "project_lbl",
        width: 180,
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
      },

      {
        title: "创建时间",
        dataIndex: "created",
        key: "created",
        width: 180,
      },

      {
        title: "操作",
        key: "action",
        fixed: "right",
        scopedSlots: { customRender: "action" },
      },
    ];

    return {
      //空状态
      expand: false,
      styles:
        "width:80px;height:40px;text-align:center;line-height:40px;font-size:14px;",

      //条件查询
      inquire: {
        pro_cycle: [],
        search: "",
        client_nm: "",
      },
      //列表展示
      columns,
      toAssign: [],
    };
  },
  computed: {
    count() {
      return this.expand ? 5 : 3;
    },
  },
  methods: {
    //查询
    handlerSubmit() {
      console.log(this.inquire.proj_cycle);
      this.$api
        .get(this.baseURL + "assign/assign_list/", {
          params: {
            proj_cycle: this.inquire.proj_cycle,
            search: this.inquire.search,
            client_nm: this.inquire.client_nm,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          console.log(res.data);
          this.toAssign = result.datarows;
          console.log(this.toAssign);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置
    reset() {
      this.inquire.proj_cycle = [];
      this.inquire.search = "";
      this.inquire.client_nm = "";
      this.tobeAssign();
    },
    //展开收起
    toggle() {
      this.expand = !this.expand;
      let run = this.$refs.run;
      if (this.expand) {
        run.innerHTML = "展开";
      } else if (!this.expand) {
        run.innerHTML = "收起";
      }
    },
    //待指派
    tobeAssign() {
      this.$api
        .get(this.baseURL + "assign/assign_list/", {
          params: {
            status: "2000",
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.toAssign = result.datarows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //已指派
    tobeNewAssign() {
      this.$api
        .get(this.baseURL + "assign/assign_list/", {
          params: {
            status: "3000",
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.toAssign = result.datarows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //已撤回
    tobeWithdraw() {
      this.$api
        .get(this.baseURL + "assign/assign_list/", {
          params: {
            status: "1211",
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.toAssign = result.datarows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //全部
    tobeAll() {
      this.$api
        .get(this.baseURL + "assign/assign_list/", {
          params: {
            status: "all",
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.toAssign = result.datarows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.tobeAssign();
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
  padding: 9px 32px;
  font-size: 14px;
  opacity: 65%;
}
.header > span {
  font-size: 20px;
  font-weight: bold;
  color: rgb(5, 5, 5);
  padding: 16px 32px;
}
.content {
  width: 98%;
  height: auto;
  padding: 24px;
  background: #fff;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 6px;
  margin: 24px auto;
  position: relative;
}
.content > .content-title {
  width: 100%;
  height: 32px;
  line-height: 32px;
}
.content > .content-title > span {
  color: #000;
  font-size: 16px;
}
.anticon {
  color: #1890ff;
}
.ant-advanced-search-form {
  padding: 24px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  margin: 24px 9px;
  position: relative;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

.ant-col-12 {
  width: 35%;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fffbfb;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
.ant-radio-group {
  margin-top: 24px;
  margin-bottom: 24px;
}

.query {
  width: 200px;
  position: absolute;
  top: 29px;
  right: 75px;
}
</style>
