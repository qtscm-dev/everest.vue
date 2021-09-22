<template>
  <div>
    <div class="concenter">
      <a-form v-bind="formItemLayout" class="top">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="操作人">
              <a-input
                v-model="operForm.oper_act"
                placeholder="请输入名称"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="日期">
              <a-range-picker v-model="operForm.oper_date" @change="onChange" />
            </a-form-item>
          </a-col>
          <a-col :span="8" :style="{ textAlign: 'right' }">
            <a-button
              type="primary"
              style="margin-right: 8px"
              @click="handlerOperquery"
              >查询</a-button
            >
            <a-button @change="handlerOperreset">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div style="width: 100%; height: 24px; background: #f4f4f4"></div>
    <div>
      <div class="oper_title">
        <span>操作记录</span>
      </div>
      <div style="padding: 24px">
        <a-empty
          :style="{ display: oper_recolist == false ? 'block' : 'none' }"
        />
        <a-table
          class="oper_table"
          :columns="oper_reco"
          :data-source="oper_recolist"
          :pagination="paginationOper"
          :rowKey="(record) => record.id"
          :rowClassName="
            (record, index) => (index % 2 === 1 ? 'table-apppro' : null)
          "
          :style="{ display: oper_recolist == false ? 'none' : 'block' }"
        >
          <template slot="operation" slot-scope="text, record">
            <div>
              <span
                style="color: #1890ff; font-size: 14px"
                @click="() => handlerJump(record.id)"
                >详情</span
              >
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OperationInfo",
  props: {
    oper_recolist: {},
  },
  data() {
    const oper_reco = [
      {
        title: "创建时间",
        dataIndex: "nm",
      },
      {
        title: "操作人姓名",
        dataIndex: "oper_nm",
      },
      {
        title: "操作类型",
        dataIndex: "updated",
      },
      {
        title: "操作内容",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
      },
    ];
    return {
      oper_reco,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      operForm: {
        oper_act: "",
        oper_date: "",
      },
    };
  },
  methods: {
    // 操作记录查询
    handlerOperquery() {
      // this.$api
      //   .get(this.baseURL + "", {
      //     params: {},
      //     headers: {
      //       Authorization: localStorage.getItem("Authorization"),
      //     },
      //   })
      //   .then((res) => {
      //     let result = res.data;
      //     console.log(result);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    // 操作记录重置
    handlerOperreset() {
      // this.operForm.oper_act = "";
      // this.operForm.oper_date = "";
      // this.getOper();
    },
    onChange(date, datestring) {
      console.log(date);
      this.operForm.oper_date = datestring;
    },
  },
};
</script>

<style></style>
