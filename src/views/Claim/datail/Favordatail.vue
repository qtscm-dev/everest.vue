<template>
  <div>
    <div class="header">
      <a-breadcrumb>
        <a-breadcrumb-item><a href="javascript;">首页</a></a-breadcrumb-item>
        <a-breadcrumb-item
          ><a href="javascript;">认领中心</a></a-breadcrumb-item
        >
      </a-breadcrumb>
      <h3>
        项目列表
        <a-dropdown placement="bottomRight">
          <a-button>返回</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link :to="{ name: 'claimIndex' }">返回列表页</router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link href="javascript:;" :to="{ name: 'index' }"
                >返回工作台</router-link
              >
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </h3>
    </div>
    <div class="formQuery">
      <a-form class="formlist" v-bind="formItemLayout" v-model="projForm">
        <a-row>
          <a-col :span="6">
            <a-form-item label="项目">
              <a-input
                v-model="projForm.search"
                placeholder="请输入项目ID/名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="日期">
              <a-range-picker
                v-model="projForm.proj_cycle"
                @change="onChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="部门">
              <a-select placeholder="请选择" />
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
              <a-cascader placeholder="请选择" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="favor">
      <div class="tatil">
        <span>收藏夹</span>
        <router-link :to="{ name: 'claimIndex' }">
          <img
            src="../../../../public/favor/revokeimg.png"
            style="width: 24px; margin-top: 16px; float: right"
        /></router-link>
      </div>
      <div class="favortable">
        <a-empty :style="{ display: prolist == false ? 'block' : 'none' }" />
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
          :style="{ display: prolist == false ? 'none' : 'block' }"
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
                :href="url"
                target="_blank"
                style="font-size: 14px"
                @click="() => handlerDetails(record.id, record.status)"
                >详情</a
              >
              <a-divider type="vertical" />
              <a
                style="font-size: 14px"
                @click="() => handlerUnfavor(record.id, record.code)"
                >取消收藏</a
              >
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: "Favordatail",
  computed: {
    count() {
      return this.expand ? 5 : 3;
    },
  },
  inject: ["reload"],
  data() {
    const columns = [
      {
        title: "项目",
        dataIndex: "code",
      },
      {
        title: "状态",
        dataIndex: "status",
        scopedSlots: { customRender: "status" },
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
        dataIndex: "bulid_addr",
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
        width: 120,
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
      //   查询
      projForm: {
        search: "",
        proj_cycle: [],
      },
      // 项目列表
      columns,
      prolist: [],
      // 分页
      pagination: {
        defaultPageSize: 20,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        size: "middle",
        total: 0,
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
        onChange: (current, pageSize) => {
          this.getProject(current, pageSize);
        },
        showQuickJumper: true,
      },
      // 详情
      url: "",
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
    getProject(page, perpage) {
      this.$api
        .get(this.baseURL + "claim/collect/", {
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
          this.prolist = result.datarows;
          this.pagination.total = result.pagination.total_items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 取消收藏
    handlerUnfavor(id, code) {
      let qs = require("qs");
      let params = {
        sub_id: id,
      };
      this.$api
        .post(this.baseURL + "claim/cancel_collect/", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success(code + "取消收藏成功");
            this.reload();
          } else {
            message.success(code + "取消收藏失败");
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
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
            search: this.projForm.search,
            proj_cycle: this.projForm.proj_cycle,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res;
          console.log(result);
          this.prolist = result.datarows;
          console.log(this.prolist);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置
    handlerReset() {
      this.projForm.search = "";
      this.projForm.proj_cycle = "";
      this.getProject();
    },
    // 详情
    handlerDetails(id) {
      this.url = "/claim/claimindex/favtodatail/:id=" + id;
    },
  },
  mounted() {
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
  display: flex;
  justify-content: space-between;
}
.formQuery {
  width: 97%;
  height: auto;
  padding: 24px;
  box-sizing: border-box;
  margin: 24px auto;
  background: #fff;
}
.favor {
  width: 97%;
  height: auto;
  margin: 24px auto;
  background: #fff;
}
.favor > .tatil {
  height: 32px;
  font-size: 16px;
  line-height: 56px;
  color: #000;
  padding: 0 24px;
  box-sizing: border-box;
}
.favortable {
  padding: 24px;
  box-sizing: border-box;
}
.table-proj {
  background: #fafafa;
}
</style>
