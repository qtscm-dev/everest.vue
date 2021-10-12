<template>
  <div>
    <div class="header">
      <span>部门项目</span>
      <div style="float: right">
        <a-dropdown placement="bottomRight">
          <a-button>返回</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link :to="{ name: 'DesignIndex' }"
                >返回列表页</router-link
              >
            </a-menu-item>
            <a-menu-item>
              <router-link href="javascript:;" :to="{ name: 'index' }"
                >返回首页</router-link
              >
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-button
          style="margin-left: 16px"
          type="primary"
          @click="handlercomplete"
          >分配完成</a-button
        >
      </div>
    </div>

    <a-tabs :tabBarGutter="0" default-active-key="1">
      <a-tab-pane key="1" tab="项目部门" force-render>
        <div class="concenter">
          <div class="title">
            <span>项目部门</span>
          </div>
          <div class="content">
            <a-empty
              :style="{ display: prodepa == false ? 'block' : 'none' }"
            />
            <a-table
              :columns="columns"
              :data-source="prodepa"
              :pagination="pagination"
              :scroll="{ x: 1500 }"
              :rowKey="(record) => record.id"
              :rowClassName="
                (record, index) => (index % 2 === 1 ? 'table-apppro' : null)
              "
              :style="{ display: prodepa == false ? 'none' : 'block' }"
            >
              <!-- 是否主设 -->
              <span slot="tags" slot-scope="tags">
                <a-tag v-if="tags == 't'" color="blue"> 主设 </a-tag>
              </span>
              <!-- 状态 -->
              <a-badge
                v-if="text == '1000'"
                slot="status"
                slot-scope="text"
                status="default"
                text="设计待分配"
              />
              <a-badge
                v-else-if="text == '2000'"
                slot="status"
                slot-scope="text"
                status="default"
                text="设计已分配"
              />
              <!-- 编辑 -->
              <template
                v-for="col in ['leader_nm']"
                :slot="col"
                slot-scope="text, record"
              >
                <div :key="col">
                  <a-select
                    v-if="record.editable"
                    style="width: 100%"
                    placeholder="请选择"
                    v-model="record.leader_nm"
                    @change="
                      (e) => handleChange(record.leader_nm, record.id, col)
                    "
                  >
                    <a-select-option
                      v-for="list in staff_data"
                      :key="list.id"
                      >{{ list.nm }}</a-select-option
                    >
                  </a-select>
                  <template v-else>
                    {{ text }}
                  </template>
                </div>
              </template>
              <!-- 操作 -->
              <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <span v-if="record.editable">
                    <a @click="() => handlerSave(record.id)">保存</a
                    >&nbsp;&nbsp;
                    <a @click="() => handlerClear(record.id)">取消</a>
                  </span>
                  <span v-else>
                    <a
                      :disabled="editingKey !== ''"
                      @click="() => handlerEdit(record.id)"
                      >编辑</a
                    >
                  </span>
                </div>
              </template>
            </a-table>
          </div>
        </div>
      </a-tab-pane>
      <!-- <a-tab-pane key="2" tab="联系人">
        <ContactInfo :contactsList="contactsList" :contact_typ="contact_typ" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="项目文件">
        <DocumentInfo :proj_doculist="proj_doculist" />
      </a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: "DesignPerson",
  data() {
    const columns = [
      {
        title: "项目ID",
        dataIndex: "code",
      },
      {
        title: "项目状态",
        dataIndex: "ec_status",
        scopedSlots: { customRender: "status" },
      },
      {
        title: "负责部门",
        dataIndex: "dept_nm",
      },
      {
        title: "是否主设",
        dataIndex: "is_main",
        scopedSlots: { customRender: "tags" },
      },
      {
        title: "项目负责人",
        dataIndex: "leader_nm",
        scopedSlots: { customRender: "leader_nm" },
      },
      {
        title: "项目分工",
        dataIndex: "cmt",
      },
      {
        title: "操作人",
        dataIndex: "updator_nm",
      },
      {
        title: "创建时间",
        dataIndex: "updated",
      },
      {
        title: "操作",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
        fixed: "right",
        width: 100,
      },
    ];
    return {
      id: this.$router.currentRoute.params.id.slice(4),
      // 部门项目
      columns,
      prodepa: [],
      // 负责人
      staff_data: "",
      // 分页
      pagination: {
        defaultPageSize: 20,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        size: "middle",
        total: 0,
        proj: "",
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
      editingKey: "",
      // 分配完成
      designperson: [],
    };
  },
  methods: {
    // 部门项目
    getIndex() {
      this.$api
        .get(this.baseURL + "design/distr_com", {
          params: {
            sub_id: this.id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.prodepa = result.proj_dept;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑
    handleChange(value, id, column) {
      const newData = [...this.prodepa];
      const target = newData.filter((item) => id === item.id)[0];
      if (target) {
        target[column] = value;
        this.prodepa = newData;
      }
    },
    handlerEdit(id) {
      this.$api
        .get(this.baseURL + "design/distr_com", {
          params: {
            sub_id: id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.staff_data = result.staff_data;
          const newData = [...this.prodepa];
          const target = newData.filter((item) => id === item.id)[0];
          this.editingKey = id;
          if (target) {
            target.editable = true;
            this.prodepa = newData;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 保存
    handlerSave(id) {
      const newData = [...this.prodepa];
      const target = newData.filter((item) => id === item.id)[0];
      if (target) {
        delete target.editable;
        this.prodepa = newData;
      }
      this.designperson.push(target);
      console.log(this.designperson);
      this.editingKey = "";
    },
    // 取消
    handlerClear(id) {
      const newData = [...this.prodepa];
      const target = newData.filter((item) => id === item.id)[0];
      this.editingKey = "";
      if (target) {
        delete target.editable;
        this.prodepa = newData;
      }
    },
    // 分配完成
    handlercomplete() {
      for (let i = 0; i < this.designperson.length; i++) {
        for (let j = i + 1; j < this.designperson.length; j++) {
          if ((this.designperson[i] = this.designperson[j])) {
            this.designperson.splice(j, 1);
            j--;
            // console.log(this.designperson[i]);
            // console.log(this.designperson[j]);
          }
        }
      }
      console.log(this.designperson);
      //   var qs = require("qs");
      //   let params = {
      //     proj_dept: this.designperson,
      //   };
      //   this.$api
      //     .post(this.baseURL + "design/distr_com", qs.stringify(params), {
      //       headers: {
      //         Authorization: localStorage.getItem("Authorization"),
      //       },
      //     })
      //     .then((res) => {
      //       console.log(res.data);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    },
  },
  mounted() {
    this.getIndex();
  },
};
</script>

<style>
.table-apppro {
  background: #fafafa;
}
</style>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  padding: 18px 24px;
  box-sizing: border-box;
  background: #fff;
}
.header > span {
  font-size: 20px;
  color: #000;
  font-weight: bold;
}
.concenter {
  width: 97%;
  height: auto;
  margin: 12px 24px;
  box-sizing: border-box;
  background: #fff;
}
.concenter .title {
  font-size: 16px;
  padding: 24px 24px;
  color: #000;
}
.content {
  padding: 0 24px 24px;
}
</style>
