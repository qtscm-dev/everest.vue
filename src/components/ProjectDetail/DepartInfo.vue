<template>
  <div class="concenter">
    <div class="title">
      <span>项目部门</span>
    </div>
    <div class="content">
      <a-empty :style="{ display: prodepa == false ? 'block' : 'none' }" />
      <a-table
        :columns="columns"
        :data-source="prodepa"
        :pagination="pagination"
        :rowKey="(record) => record.code"
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
          v-if="text == '2111'"
          slot="status"
          slot-scope="text"
          status="success"
          text="已中止"
        />
        <a-badge
          v-else-if="text == '2100'"
          slot="status"
          slot-scope="text"
          status="default"
          text="待认领"
        />
        <a-badge
          v-else-if="text == '2300'"
          slot="status"
          slot-scope="text"
          status="success"
          text="已认领"
        />
        <a-badge
          v-else-if="text == '3000'"
          slot="status"
          slot-scope="text"
          status="success"
          text="已指派"
        />
        <a-badge
          v-else-if="text == '9000'"
          slot="status"
          slot-scope="text"
          status="success"
          text="已完成"
        />
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepartInfo",
  props: {
    prodepa: {},
  },
  data() {
    const columns = [
      {
        title: "项目ID",
        dataIndex: "code",
      },
      {
        title: "项目状态",
        dataIndex: "proj_sta",
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
        title: "项目分工",
        dataIndex: "cmt",
      },
      {
        title: "操作人",
        dataIndex: "oper_nm",
      },
      {
        title: "操作时间",
        dataIndex: "updated",
      },
    ];
    return {
      columns,
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
    };
  },
};
</script>

<style>
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
