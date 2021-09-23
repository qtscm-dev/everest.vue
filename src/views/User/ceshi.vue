<template>
  <div id="components-a-popconfirm-demo-placement">
    <a-popconfirm
      placement="topRight"
      ok-text="Yes"
      cancel-text="No"
      @confirm="confirm"
    >
      <template slot="title">
        <p>方法</p>
        <p>{{ text }}</p>
      </template>
      <a-button>TR</a-button>
    </a-popconfirm>
  </div>
</template>
<script>
import { message } from "ant-design-vue";

export default {
  data() {
    return {
      buttonWidth: 70,
      text: "Are you sure to delete this task?",
    };
  },
  methods: {
    confirm() {
      message.info("Clicked on Yes.");
    },
  },
};
</script>
