<template>
  <div class="concenter">
    <div class="title">
      <span>联系人列表</span>
    </div>
    <div class="content">
      <a-empty :style="{ display: contactsList == false ? 'block' : 'none' }" />
      <a-table
        :columns="contacts"
        :data-source="contactsList"
        :pagination="pagination"
        :scroll="{ x: 1500 }"
        :rowKey="(record) => record.id"
        :rowClassName="
          (record, index) => (index % 2 === 1 ? 'table-apppro' : null)
        "
        :style="{ display: contactsList == false ? 'none' : 'block' }"
      >
        <!-- 编辑 -->
        <template
          v-for="col in ['nm', 'mob', 'typ', 'comp_nm', 'dept_nm', 'job']"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              v-if="record.editable && col != 'typ'"
              placeholder="请输入"
              :value="text"
              @change="(e) => handleChange(e.target.value, record.id, col)"
            />
            <a-select
              v-else-if="record.editable && col == 'typ'"
              placeholder="请选择"
              v-model="record.typ"
              @change="(e) => handleChange(e.target.value, record.id, col)"
            >
              <a-select-option v-for="list in contact_typ" :key="list.id">{{
                list.lbl
              }}</a-select-option>
            </a-select>
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <!-- 操作 -->
        <template slot="operation" slot-scope="text, record">
          <div v-if="saveingKey == ''" class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => handlerSave(record.id)">保存</a
              >&nbsp;&nbsp;&nbsp;
              <a @click="() => handlerClear(record.id)">取消</a>
            </span>
            <span v-else>
              <a
                :disabled="editingKey !== ''"
                @click="() => handlerEdit(record.id)"
                >编辑</a
              >
              <a-divider type="vertical" />
              <a
                :disabled="editingKey !== ''"
                @click="() => handlerDelete(record.id)"
                >删除</a
              >
            </span>
          </div>
          <div v-else class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="handlerNewcon">保存</a>&nbsp;&nbsp;&nbsp;
              <a @click="() => handlerClear(record.id)">取消</a>
            </span>
            <span v-else>
              <a
                :disabled="editingKey !== ''"
                @click="() => handlerEdit(record.id)"
                >编辑</a
              >
              <a-divider type="vertical" />
              <a
                :disabled="editingKey !== ''"
                @click="() => handlerDelete(record.id)"
                >删除</a
              >
            </span>
          </div>
        </template>
      </a-table>
      <div :style="{ display: contactsList == false ? 'none' : 'block' }">
        <a-button type="dashed" style="width: 100%" @click="handlerAdd">
          <a-icon type="plus" /> 添加
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: "ContactInfo",
  props: {
    contactsList: [],
    contact_typ: [],
  },
  inject: ["reload"],
  data() {
    const contacts = [
      {
        title: "姓名",
        dataIndex: "nm",
        scopedSlots: { customRender: "nm" },
      },
      {
        title: "手机号",
        dataIndex: "mob",
        scopedSlots: { customRender: "mob" },
      },
      {
        title: "类型",
        dataIndex: "typ",
        scopedSlots: { customRender: "typ" },
      },
      {
        title: "公司",
        dataIndex: "comp_nm",
        scopedSlots: { customRender: "comp_nm" },
      },
      {
        title: "部门",
        dataIndex: "dept_nm",
        scopedSlots: { customRender: "dept_nm" },
      },
      {
        title: "职位",
        dataIndex: "job",
        scopedSlots: { customRender: "job" },
      },
      {
        title: "操作人",
        dataIndex: "oper_nm",
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
        width: 120,
      },
    ];
    return {
      contacts,
      editingKey: "",
      saveingKey: "",
      param: this.$router.currentRoute.params.id.slice(4),
      // 分页
      pagination: {
        pagination: false,
        defaultPageSize: 20,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        size: "middle",
        total: 0,
        proj: "",
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
    };
  },
  methods: {
    // 编辑联系人
    handleChange(value, id, column) {
      const newData = [...this.contactsList];
      const target = newData.filter((item) => id === item.id)[0];
      if (target) {
        target[column] = value;
        this.contactsList = newData;
      }
    },
    // 编辑
    handlerEdit(id) {
      const newData = [...this.contactsList];
      const target = newData.filter((item) => id === item.id)[0];
      this.editingKey = id;
      if (target) {
        target.editable = true;
        this.contactsList = newData;
      }
    },
    // 保存
    handlerSave(id) {
      const newData = [...this.contactsList];
      const target = newData.filter((item) => id === item.id)[0];
      var qs = require("qs");
      let params = {
        proj_id: this.param,
        proj_contact_id: id,
        typ: !/^[0-9]+$/.test(target.typ) ? target.typ_id : target.typ,
        nm: target.nm,
        comp_nm: target.comp_nm,
        dept_nm: target.dept_nm,
        job: target.job,
        mob: target.mob,
      };
      this.$api
        .post(this.baseURL + "project/edit_contact", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success("保存成功");
            this.reload();
          } else {
            message.error("保存失败");
            this.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (target) {
        delete target.editable;
      }
      this.editingKey = "";
    },
    // 取消
    handlerClear(id) {
      const newData = [...this.contactsList];
      const target = newData.filter((item) => id === item.id)[0];
      this.editingKey = "";
      if (target) {
        delete target.editable;
      }
      this.reload();
    },
    // 删除联系人
    handlerDelete(id) {
      this.$api
        .get(this.baseURL + "project/del_contact", {
          params: {
            proj_contact_id: id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success("联系人删除成功");
            this.reload();
          } else {
            message.error(res.data.data.errmsg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 新增联系人
    handlerAdd() {
      const leng = this.contactsList.length;
      const list = this.contactsList;
      const newData = {
        nm: "",
        mob: "",
        typ: "",
        comp_nm: "",
        dept_nm: "",
        job: "",
        editable: true,
      };
      this.contactsList = [...list, newData];
      this.contactsList.length = leng + 1;
      this.saveingKey = true;
      this.handlerEdit();
    },
    // 保存新增联系人
    handlerNewcon() {
      var qs = require("qs");
      let leng = this.contactsList.length - 1;
      let list = this.contactsList[leng];
      let params = {
        proj_id: this.param,
        nm: list.nm,
        mob: list.mob,
        comp_nm: list.comp_nm,
        typ: list.typ,
        job: list.job,
        dept_nm: list.dept_nm,
      };
      this.$api
        .post(this.baseURL + "project/new_contact", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code) {
            message.success("保存成功");
            this.reload();
          } else {
            message.error("保存失败");
          }
          this.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.concenter {
  width: 100%;
  height: auto;
}
.concenter .title {
  line-height: 56px;
  padding: 0 24px;
  font-size: 16px;
  color: #000;
}
.concenter .content {
  box-sizing: border-box;
  padding: 0 24px 24px;
}
</style>
