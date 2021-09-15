<template>
  <a-table :columns="columns" :data-source="data">
    <template v-for="col in ['nm']" :slot="col" slot-scope="text, record">
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="(e) => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">保存</a>
          <a-popconfirm
            title="Sure to cancel?"
            @confirm="() => cancel(record.key)"
          >
            <a>取消</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
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
    key: "nm",
    scopedSlots: { customRender: "nm" },
  },
  {
    title: "手机号",
    dataIndex: "mob",
    key: "mob",
    scopedSlots: { customRender: "mob" },
  },
  {
    title: "类型",
    dataIndex: "typ",
    key: "typ",
    scopedSlots: { customRender: "typ" },
  },
  {
    title: "公司",
    dataIndex: "comp_nm",
    key: "comp_nm",
    scopedSlots: { customRender: "comp_nm" },
  },
  {
    title: "部门",
    dataIndex: "dept_nm",
    key: "dept_nm",
    scopedSlots: { customRender: "dept_nm" },
  },
  {
    title: "职位",
    dataIndex: "job",
    key: "job",
    scopedSlots: { customRender: "job" },
  },
  {
    title: "操作人",
    dataIndex: "oper_nm",
    key: "oper_nm",
  },
  {
    title: "创建时间",
    dataIndex: "updated",
    key: "updated",
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

const data = [];
for (let i = 0; i < 2; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
export default {
  data() {
    return {
      data: [
        {
          comp_nm: "幕墙公司",
          // editable: true,
          dept_nm: "业务部",
          id: "10641",
          job: "业务员",
          mob: "12345678978",
          nm: "晨晨",
          oper_nm: "陈希傲",
          typ: "主体施工图设计",
          updated: "2021-08-13 10:52:05",
        },
      ],
      columns,
      editingKey: "",
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = this.data;
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
      console.log(value, key, column);
    },
    edit(key) {
      console.log(key);
      const newData = this.data;
      console.log(newData);
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.key)[0];
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = "";
      this.cacheData = data.map((item) => ({ ...item }));
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
