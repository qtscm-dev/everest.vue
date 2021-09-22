<template>
  <a-table
    :columns="columns"
    :data-source="data"
    bordered
    :rowKey="(record) => record.id"
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
          <a-select-option v-for="list in contact_typ" :key="list.lbl">{{
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
          <a @click="() => save(record.id)">保存</a>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => handlerEdit(record.id)"
            >编辑</a
          >
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
const columns = [
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
const data = [];
export default {
  data() {
    this.cacheData = data.map((item) => ({ ...item }));
    return {
      data,
      columns,
      editingKey: "",
      contact_typ: {},
    };
  },
  methods: {
    // 联系人列表
    getContacts() {
      this.$api
        .get(this.baseURL + "project/proj_contact", {
          params: {
            proj_id: "10137",
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.data = result.datarows;
          this.contact_typ = result.contact_typ;
          console.log(this.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleChange(value, id, column) {
      console.log(this.data);
      const newData = [...this.data];
      const target = newData.filter((item) => id === item.id)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
      console.log(target);
    },
    // 编辑
    handlerEdit(id) {
      const newData = [...this.data];
      const target = newData.filter((item) => id === item.id)[0];
      this.editingKey = id;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    // 保存
    save(id) {
      console.log(this.data);
      const newData = [...this.data];
      const target = newData.filter((item) => id === item.id)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
      }
      this.editingKey = "";
      console.log(typeof target.typ == String ? "" : "shu");
    },
  },
  mounted() {
    this.getContacts();
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
