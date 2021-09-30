<template>
  <div slot="dropdownRender" slot-scope="menu">
    <v-nodes :vnodes="menu" />
    <a-divider style="margin: 4px 0" />
    <div
      style="padding: 4px 8px; cursor: pointer"
      @mousedown="(e) => e.preventDefault()"
      @click="addItem"
    >
      <a-icon type="plus" /> 添加数据
    </div>
    <a-modal
      v-model="visibl"
      title="添加数据"
      :allowClear="true"
      :destroyOnClose="true"
      on-ok="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handlerAddClear"> 取消 </a-button>
        <a-button key="submit" type="primary" @click="handlerAddNum">
          确定
        </a-button>
      </template>
      <a-input v-model="lbl" placeholder="请输入" style="margin: 24px auto" />
    </a-modal>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: "MiSelect",
  components: {
    // VNodes: {
    //   functional: true,
    //   render: (h, ctx) => ctx.props.vnodes,
    // },
  },
  props: {
    type_id: [],
    visibl: {},
  },
  data() {
    return {};
  },
  methods: {
    handlerAdd() {
      let qs = require("qs");
      let params = {
        pid: "",
        lbl: "",
      };
      this.$api
        .post(this.baseURL + "project/new_csd/", qs.stringify(params), {
          headers: {},
        })
        .then((res) => {
          if (res.data.code) {
            message.success("新增数据成功");
            // this.type_id.push(res.data.data.data.n_id);
          } else {
            message.error(res.data.data.data.errmsg);
          }
        });
    },
  },
};
</script>

<style></style>
