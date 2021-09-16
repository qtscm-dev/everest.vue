<template>
  <div>
    <a-upload
      name="avatar"
      :multiple="true"
      :show-upload-list="false"
      :customRequest="customRequest"
    >
      <a-button type="primary">上传文件</a-button>
    </a-upload>
  </div>
</template>
<script>
// import { message } from "ant-design-vue";
export default {
  data() {
    return {
      // headers: {
      //   Authorization: localStorage.getItem("Authorization"),
      // },
      proj_id: "10137",
      // docuURL: this.baseURL + "project/new_file",
      // fileList: [],
    };
  },
  methods: {
    // handleChange(info) {
    //   const status = info.file.status;
    //   if (status !== "uploading") {
    //     console.log(info.fileList);
    //   }
    //   if (status === "done") {
    //     message.success(`${info.file.name} 上传成功.`);
    //   } else if (status === "error") {
    //     message.error(`${info.file.name} 上传失败.`);
    //   }
    // },
    customRequest(data) {
      const formData = new FormData();
      formData.append("proj_id", this.proj_id);
      formData.append("avatar", data.file);
      this.$api({
        method: "post",
        url: this.baseURL + "project/new_file",
        headers: { Authorization: localStorage.getItem("Authorization") },
        data: formData,
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.ant-upload-drag-container {
  width: 640px;
}
</style>
