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
      <a-form class="formlist" v-bind="formItemLayout">
        <a-row>
          <a-col :span="6">
            <a-form-item label="项目">
              <a-input placeholder="请输入项目ID/名称" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="日期">
              <a-range-picker />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="部门">
              <a-select placeholder="请选择" />
            </a-form-item>
          </a-col>
          <a-col :span="6" :style="{ textAlign: 'right' }">
            <a-button type="primary"> 查询 </a-button>
            <a-button :style="{ marginLeft: '8px' }"> 重置 </a-button>
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
              <a-cascader placeholder="请选择" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="pro">
      <div class="protitle">
        <span>项目列表</span>
        <img src="../../../public/favor/favorimg.png" alt="收藏夹" />
      </div>
      <a-empty :style="{ display: prolist == false ? 'block' : 'none' }" />
      <div
        class="protable"
        :style="{ display: prolist == false ? 'block' : 'block' }"
      >
        <a-radio-group class="tableradiolist" v-model="value">
          <a-radio-button class="tableradio" value="a" @click="handlerUnclai">
            待认领&nbsp;&nbsp;{{ aleng }}
          </a-radio-button>
          <a-radio-button class="tableradio" value="b" @click="handlerClai">
            已认领&nbsp;&nbsp;{{ bleng }}
          </a-radio-button>
          <a-radio-button class="tableradio" value="c" @click="handlerRevoke">
            已撤回&nbsp;&nbsp;{{ cleng }}
          </a-radio-button>
          <a-radio-button class="tableradio" value="d" @click="handlerWholer">
            全部&nbsp;&nbsp;{{ dleng }}
          </a-radio-button>
        </a-radio-group>
        <a-table
          :columns="columns"
          :data-source="prolist"
          :pagination="pagination"
          :scroll="{ x: 1500 }"
          :rowKey="(record) => record.id"
          size="middle"
          :rowClassName="
            (record, index) => (index % 2 === 1 ? 'table-proj' : null)
          "
        >
          <template slot="operation" slot-scope="text, record">
            <div>
              <a
                style="font-size: 14px"
                @click="() => handlerDetails(record.id, record.status)"
                >详情</a
              >
            </div>
          </template></a-table
        >
      </div>
    </div>
  </div>
</template>

<script>
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
      },
      {
        title: "建设单位",
        dataIndex: "client_nm",
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
        title: "部门",
        dataIndex: "dept_nm",
      },
      {
        title: "设计内容",
        dataIndex: "major_lbl",
        ellipsis: true,
      },
      {
        title: "项目周期",
        dataIndex: "pro_cycle",
        width: 220,
      },
      {
        title: "项目地点",
        dataIndex: "build_addr",
        width: 250,
      },
      {
        title: "操作时间",
        dataIndex: "updated",
        width: 150,
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
      // 单选框
      value: "a",
      // 数据长度
      aleng: "",
      bleng: "",
      cleng: "",
      dleng: "",
      // 项目列表
      columns,
      prolist: [],
      // 分页
      pagination: {
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
        showQuickJumper: (current, pageSize) => (this.pageSize = pageSize),
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
    // 项目列表
    getProtable(sta) {
      this.$api
        .get(this.baseURL + "claim/claim_list", {
          params: {
            status: sta,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.prolist = result.datarows;
          this.aleng = result.count_nm.unclaimed_num;
          this.bleng = result.count_nm.claimed_num;
          this.cleng = result.count_nm.revoke_num;
          this.dleng = result.count_nm.whole_num;
          this.pagination.total = result.pagination.total_items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 待认领
    handlerUnclai() {
      this.getProtable("2100");
    },
    // 已认领
    handlerClai() {
      this.getProtable("3000");
    },
    // 已撤回
    handlerRevoke() {
      this.getProtable("2111");
    },
    // 全部
    handlerWholer() {
      this.getProtable("all");
    },
    // 详情
    handlerDetails() {},
  },
  mounted() {
    this.getProtable();
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
.pro > .protitle > img {
  float: right;
}
.tableradiolist {
  margin-top: 18px;
  margin-bottom: 24px;
}
.tableradio {
  width: 146px;
  text-align: center;
}
.table-proj {
  background: #fafafa;
}
</style>
