<template>
  <div>
    <div class="header">
      <a-breadcrumb>
        <a-breadcrumb-item><a href="javascript;">首页</a></a-breadcrumb-item>
        <a-breadcrumb-item
          ><a href="javascript;">认领中心</a></a-breadcrumb-item
        >
      </a-breadcrumb>
      <h3>认领中心</h3>
    </div>
    <div class="formQuery">
      <a-form class="formlist" v-bind="formItemLayout" v-model="projForm">
        <a-row>
          <a-col :span="6">
            <a-form-item label="项目">
              <a-input
                placeholder="请输入项目ID/名称"
                v-model="projForm.search"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="日期">
              <a-range-picker v-model="projForm.proj_cycle" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="部门">
              <a-select placeholder="请选择" v-model="projForm.proj_nm" />
            </a-form-item>
          </a-col>
          <a-col :span="6" :style="{ textAlign: 'right' }">
            <a-button type="primary" @click="handlerQuery"> 查询 </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handlerReset">
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
        <a-row :style="{ display: 4 < count ? 'none' : 'block' }">
          <a-col :span="6">
            <a-form-item label="工程地点">
              <a-cascader placeholder="请选择" v-model="projForm.proj_addr" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="pro">
      <div class="protitle">
        <span>项目列表</span>
        <router-link :to="{ name: 'Favordatail' }">
          <a-badge :count="countleng" style="float: right" :offset="[-5, 25]">
            <img src="../../../public/favor/favorimg.png" alt="收藏夹" />
          </a-badge>
        </router-link>
      </div>
      <a-radio-group class="tableradiolist" v-model="value">
        <a-radio-button class="tableradio" value="d" @click="handlerWholer">
          全部&nbsp;&nbsp;{{ dleng }}
        </a-radio-button>
        <a-radio-button class="tableradio" value="a" @click="handlerUnclai">
          待认领&nbsp;&nbsp;{{ aleng }}
        </a-radio-button>
        <a-radio-button class="tableradio" value="b" @click="handlerClai">
          已认领&nbsp;&nbsp;{{ bleng }}
        </a-radio-button>
        <a-radio-button class="tableradio" value="c" @click="handlerRevoke">
          已撤回&nbsp;&nbsp;{{ cleng }}
        </a-radio-button>
      </a-radio-group>
      <a-empty :style="{ display: prolist == false ? 'block' : 'none' }" />
      <!-- <div class="protable"> -->
      <a-table
        :columns="columns"
        :data-source="prolist"
        :pagination="pagination"
        :scroll="{ x: 2000 }"
        :rowKey="(record) => record.id"
        size="middle"
        :rowClassName="
          (record, index) => (index % 2 === 1 ? 'table-proj' : null)
        "
        :style="{ display: prolist == false ? 'none' : 'block' }"
        @change="handlerSort"
      >
        <!-- 状态 -->
        <a-badge
          v-if="text == '2100'"
          slot="status"
          slot-scope="text"
          status="default"
          text="待认领"
        />
        <a-badge
          v-else-if="text == '3000'"
          slot="status"
          slot-scope="text"
          status="success"
          text="已认领"
        />
        <a-badge
          v-else-if="text == '2111'"
          slot="status"
          slot-scope="text"
          status="error"
          text="已撤回"
        />
        <!-- 操作 -->
        <template slot="operation" slot-scope="text, record">
          <div>
            <a
              style="font-size: 14px"
              @click="() => handlerDetails(record.id, record.status)"
              >详情</a
            >
          </div>
        </template>
      </a-table>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
function handlerSort(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}
export default {
  name: "claimIndex",
  computed: {
    count() {
      return this.expand ? 5 : 3;
    },
  },
  data() {
    const columns = [
      {
        title: "项目",
        dataIndex: "code",
        // width: 180,
      },
      {
        title: "状态",
        dataIndex: "status",
        width: 90,
        scopedSlots: { customRender: "status" },
        sorter: (a, b) => {
          return a.status > b.status ? 1 : -1;
        },
      },
      {
        title: "建设单位",
        dataIndex: "client_nm",
        // width: 100,
      },
      {
        title: "幕墙面积",
        dataIndex: "wall_area",
        width: 100,
      },
      {
        title: "建筑类型",
        dataIndex: "build_lbl",
        // width: 200,
        ellipsis: true,
      },
      {
        title: "项目类型",
        dataIndex: "project_lbl",
        width: 100,
      },
      {
        title: "部门",
        dataIndex: "dept_nm",
        width: 100,
      },
      {
        title: "设计内容",
        dataIndex: "major_lbl",
        ellipsis: true,
      },
      {
        title: "项目周期",
        dataIndex: "pro_cycle",
        // width: 220,
      },
      {
        title: "项目地点",
        dataIndex: "bulid_addr",
        // width: 250,
      },
      {
        title: "操作时间",
        dataIndex: "updated",
        // width: 150,
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
      // 栅格
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
      // 展开收起
      expand: false,
      // 收藏夹
      countleng: "",
      // 查询
      projForm: {
        search: "",
        proj_cycle: [],
      },
      // 单选框
      value: "d",
      // 数据长度
      aleng: 0,
      bleng: 0,
      cleng: 0,
      dleng: 0,
      // 状态
      satau: "",
      // 项目列表
      columns,
      prolist: [],
      // 分页
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
          this.getProtable(this.pagination.proj, current, pageSize);
        },
        showQuickJumper: true,
      },
    };
  },
  methods: {
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
    // 收藏夹
    getProject() {
      this.$api
        .get(this.baseURL + "claim/collect/", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.countleng = result.datarows.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 项目列表
    getProtable(sta, page, perpage) {
      this.$api
        .get(this.baseURL + "claim/claim_list", {
          params: {
            status: sta,
            page: page,
            perpage: perpage,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.prolist = result.datarows;
          for (let i = 0; i < this.prolist.length; i++) {
            this.prolist[i].wall_area = this.prolist[i].wall_area + "平方米";
          }
          if (this.prolist != false) {
            this.aleng = result.count_nm.unclaimed_num;
            this.bleng = result.count_nm.claimed_num;
            this.cleng = result.count_nm.revoke_num;
            this.dleng = result.count_nm.whole_num;
          }
          this.pagination.total = result.pagination.total_items;
          this.pagination.proj = sta;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 待认领
    handlerUnclai() {
      this.getProtable("2100");
      this.statu = "2100";
    },
    // 已认领
    handlerClai() {
      this.getProtable("3000");
      this.statu = "3000";
    },
    // 已撤回
    handlerRevoke() {
      this.getProtable("2111");
      this.statu = "2111";
    },
    // 全部
    handlerWholer() {
      this.getProtable("all");
      this.statu = "all";
    },
    // 详情
    handlerDetails(id) {
      this.$router.push("/index/claim/claimindex/todatail/:id=" + id);
    },
    // 查询
    onChange(date, dateString) {
      console.log(date);
      this.projForm.proj_cycle = dateString;
    },
    handlerQuery() {
      this.$api
        .get(this.baseURL + "claim/claim_list", {
          params: {
            status: this.statu,
            search: this.projForm.search,
            proj_cycle: this.projForm.proj_cycle,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.prolist = result.datarows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置
    handlerReset() {
      this.projForm.search = "";
      this.projForm.proj_cycle = "";
      this.getProtable(this.statu);
    },
    handlerSort,
  },
  mounted() {
    this.handlerWholer();
    this.getProject();
  },
};
</script>

<style scoped>
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
  margin-top: 10px;
}
.formQuery {
  width: 97%;
  height: auto;
  padding: 24px;
  box-sizing: border-box;
  margin: 24px auto;
  background: #fff;
}
.pro {
  width: 97%;
  height: auto;
  margin: 0 auto 24px;
  padding: 24px;
  box-sizing: border-box;
  background: #fff;
}
.pro > .protitle {
  font-size: 16px;
  line-height: 34px;
  color: #000;
}
.tableradiolist {
  margin-top: 18px;
  margin-bottom: 24px;
}
.tableradio {
  width: 146px;
  text-align: center;
}
</style>
