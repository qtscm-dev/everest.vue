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
        :scroll="{ x: 1500 }"
        :rowKey="(record) => record.id"
        :rowClassName="
          (record, index) => (index % 2 === 1 ? 'table-apppro' : null)
        "
        :style="{ display: contactsList == false ? 'none' : 'block' }"
      >
        <template
          v-for="col in ['nm', 'mob', 'typ', 'comp_nm', 'dept_nm', 'job']"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              v-if="record.editable && col != 'typ'"
              style="margin: -5px 0"
              :value="text"
              @change="(e) => handleChange(e.target.value, record.id, col)"
            />
            <a-select
              placeholder="请选择"
              style="display: block"
              v-else-if="record.editable && col == 'typ'"
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
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
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
            </span>
            <a-divider type="vertical" />
            <a
              :disabled="editingKey !== ''"
              @click="() => handlerDelete(record.id)"
              >删除</a
            >
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: "ContactInfo",
  props: {
    contactsList: {},
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
      param: this.$router.currentRoute.params.id.slice(4),
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
      console.log(id);
      console.log(this.param);
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
            this.getContacts();
          } else {
            console.log(res);
            message.error("保存失败");
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
      this.getContacts();
    },
    // 删除联系人
    handlerDelete(id) {
      console.log(id);
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
            this.getContacts();
          } else {
            message.error(res.data.data.errmsg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
