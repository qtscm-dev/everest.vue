<template>
  <div>
    <div class="header">
      <a-breadcrumb>
        <a-breadcrumb-item><a href="javascript;">首页</a></a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href="javascript;">认领中心</a>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <h3>部门项目</h3>
    </div>
    <!-- 查询 -->
    <div class="query">
      <a-form-model v-bind="formItemLayout">
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="项目">
              <a-input placeholder="请输入项目ID/名称" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="日期">
              <a-range-picker @change="onChange" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="建设单位">
              <a-input placeholder="请输入" />
            </a-form-model-item>
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
            <a-icon style="color: #1890ff" :type="expand ? 'down' : 'up'" />
          </a-col>
        </a-row>
        <a-row :style="{ display: 4 < count ? 'none' : 'block' }">
          <a-col :span="6">
            <a-form-item label="工程地点">
              <a-cascader
                placeholder="请选择"
                :options="options"
                change-on-select
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-model>
    </div>
    <!-- 列表 -->
    <div class="list">
      <div class="title">项目列表</div>
      <a-radio-group class="tableradiolist" v-model="value">
        <a-radio-button class="tableradio" value="a" @click="handlerAll">
          全部&nbsp;&nbsp;{{ a }}
        </a-radio-button>
        <a-radio-button class="tableradio" value="b" @click="handlerWait">
          设计待分配&nbsp;&nbsp;{{ b }}
        </a-radio-button>
        <a-radio-button class="tableradio" value="c" @click="handlerAntion">
          设计待开始&nbsp;&nbsp;{{ c }}
        </a-radio-button>
        <a-radio-button class="tableradio" value="d" @click="handlerIng">
          设计中&nbsp;&nbsp;{{ d }}
        </a-radio-button>
        <a-radio-button class="tableradio" value="e" @click="handlerDeli">
          设计交付&nbsp;&nbsp;{{ e }}
        </a-radio-button>
        <a-radio-button class="tableradio" value="f" @click="handlerFile">
          设计归档&nbsp;&nbsp;{{ f }}
        </a-radio-button>
        <a-radio-button class="tableradio" value="g" @click="handlerEnd">
          项目中止&nbsp;&nbsp;{{ g }}
        </a-radio-button>
      </a-radio-group>
      <a-empty :style="{ display: datalist == false ? 'block' : 'none' }" />
      <a-table
        :columns="columns"
        :data-source="datalist"
        :pagination="pagination"
        :scroll="{ x: 2000 }"
        :rowKey="(record) => record.sub_id"
        size="middle"
        :rowClassName="
          (record, index) => (index % 2 === 1 ? 'table-proj' : null)
        "
        :style="{ display: datalist == false ? 'none' : 'block' }"
      >
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
    </div>
  </div>
</template>

<script>
import options from "../../address/add";
export default {
  name: "DesignIndex",
  computed: {
    count() {
      return this.expand ? 5 : 3;
    },
  },
  data() {
    const columns = [
      {
        title: "项目名称",
        dataIndex: "proj_nm",
      },
      {
        title: "部门",
        dataIndex: "dept_nm",
        width: 100,
      },
      {
        title: "建设单位",
        dataIndex: "client_nm",
      },
      {
        title: "幕墙面积",
        dataIndex: "wall_area",
        width: 100,
      },
      {
        title: "建筑类型",
        dataIndex: "build_lbl",
      },
      {
        title: "项目类型",
        dataIndex: "project_lbl",
        width: 100,
      },
      {
        title: "设计内容",
        dataIndex: "major_lbl",
      },
      {
        title: "项目周期",
        dataIndex: "proj_cycle",
      },
      {
        title: "项目地点",
        dataIndex: "bulid_addr",
      },
      {
        title: "操作时间",
        dataIndex: "updated",
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
      // 工程地点
      options: options,
      // 单选框
      value: "a",
      // 表格
      columns,
      datalist: false,
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
          this.handlerData(this.pagination.proj, current, pageSize);
        },
        showQuickJumper: true,
      },
      // 长度
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
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
    // 查询
    onChange(date, dateString) {
      console.log(date);
      this.projForm.proj_cycle = dateString;
    },
    // 数据
    handlerData(sta, page, perpage) {
      this.$api
        .get(this.baseURL + "design/design_list/", {
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
          this.datalist = result.datarows;
          this.a = result.count_num.whole_num;
          this.b = result.count_num.unassign_num;
          this.c = result.count_num.start_num;
          this.d = result.count_num.design_num;
          this.e = result.count_num.arch_num;
          this.f = result.count_num.deliv_num;
          this.g = result.count_num.stop_num;
          this.pagination.proj = sta;
          console.log(this.datalist);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 全部
    handlerAll() {
      this.handlerData("all");
    },
    // 设计待分配
    handlerWait() {
      this.handlerData("1000");
    },
    // 设计待开始
    handlerAntion() {
      this.handlerData("2000");
    },
    // 设计中
    handlerIng() {
      this.handlerData("3000");
    },
    // 设计交付
    handlerDeli() {
      this.handlerData("5000");
    },
    // 设计归档
    handlerFile() {
      this.handlerData("4000");
    },
    // 项目终止
    handlerEnd() {
      this.handlerData("9111");
    },
    // 详情
    handlerDetails() {},
  },
  mounted() {
    this.handlerAll();
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
.query {
  width: 99%;
  height: auto;
  margin: 24px;
  padding: 24px 24px 0;
  box-sizing: border-box;
  background: #fff;
}
.list {
  width: 98%;
  height: auto;
  margin: 0 24px 24px;
  padding: 24px;
  box-sizing: border-box;
  background: #fff;
}
.list .title {
  color: #000;
  font-size: 16px;
}
.tableradiolist {
  margin: 24px 0;
}
.tableradio {
  width: 146px;
  text-align: center;
}
</style>
