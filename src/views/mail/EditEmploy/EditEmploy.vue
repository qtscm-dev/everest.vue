<template>
  <a-modal
    v-model="visibles2"
    title="编辑员工"
    @ok="handlereDete"
    :destroyOnClose="true"
  >
    <a-form :form="form" v-bind="formItemLayout">
      <a-form-item label="上传图像：">
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :action="imgUrl"
          :headers="headers"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img
            style="width: 128px; height: 128px"
            v-if="imageUrl"
            :src="imageUrl"
            alt="avatar"
          />
          <div v-else>
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="姓名">
        <a-input
          placeholder="请输入"
          v-decorator="[
            '姓名',
            {
              rules: [{ required: true, message: '该项为必填项' }],
            },
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="手机号码">
        <a-input
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          placeholder="请输入"
          v-decorator="[
            '手机号码',
            {
              rules: [{ required: true, message: '该项为必填项' }],
            },
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="账号">
        <a-input
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          placeholder="请输入"
          v-decorator="[
            '账号',
            {
              rules: [{ required: true, message: '该项为必填项' }],
            },
          ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="角色">
        <a-select
          placeholder="请选择"
          v-decorator="[
            '角色',
            {
              rules: [{ required: true, message: '该项为必填项' }],
            },
          ]"
        >
          <a-select-option
            v-for="(roles, i) in role_list"
            :key="i"
            :value="roles.id"
          >
            {{ roles.lbl }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="性别">
        <a-select
          v-model="staff_list.gender"
          placeholder="请选择"
          v-decorator="[
            '性别',
            {
              rules: [{ required: true, message: '该项为必填项' }],
            },
          ]"
        >
          <a-select-option value="1"> 男 </a-select-option>
          <a-select-option value="0"> 女 </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="职位">
        <a-select
          placeholder="请选择"
          v-decorator="[
            '职位',
            {
              rules: [{ required: true, message: '该项为必填项' }],
            },
          ]"
        >
          <a-select-option
            v-for="(jobs, i) in job_list"
            :key="i"
            :value="jobs.id"
          >
            {{ jobs.un }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="部门">
        <a-select
          placeholder="请选择"
          v-decorator="[
            '部门',
            {
              rules: [{ required: true, message: '该项为必填项' }],
            },
          ]"
        >
          <a-select-option
            v-for="(depts, i) in dept_list"
            :key="i"
            :value="depts.id"
          >
            {{ depts.nm }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否领导">
        <a-select
          placeholder="请选择"
          v-decorator="[
            '是否领导',
            {
              rules: [{ required: true, message: '该项为必填项' }],
            },
          ]"
        >
          <a-select-option value="true"> 是 </a-select-option>
          <a-select-option value="false"> 否 </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="电话号码">
        <a-input-group v-model="staff_list.phone">
          <a-row :gutter="8">
            <a-col :span="8">
              <a-input placeholder="+86" />
            </a-col>
            <a-col :span="16">
              <a-input />
            </a-col>
          </a-row>
        </a-input-group>
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item label="地址">
        <a-cascader
          expand-trigger="hover"
          style="width: 236px; margin-bottom: 24px"
          placeholder="请选择地址，如“xx省xx市xx区”"
        ></a-cascader>
        <a-input placeholder="请输入具体地址，如“xx街道xx小区”"></a-input>
      </a-form-item>
      <a-form-item label="状态">
        <a-radio-group name="radioGroup">
          <a-radio :value="true"> 已激活 </a-radio>
          <a-radio :value="false"> 已禁用 </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// import { message } from "ant-design-vue";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "EditEmploy",
  props: {
    visibles2: {},
    staff_list: [
      // {
      //   login_nm: "",
      //   nm: "",
      //   mob: "",
      //   phone: "",
      //   active: "",
      //   email: "",
      //   address: "",
      //   avatar: "",
      //   job_id: "",
      //   dept_id: "",
      //   is_leader: "",
      //   gender: "",
      //   role_id: "",
      //   user_id: "",
      // },
    ],
    dept_list: [],
    job_list: [],
    role_list: [],
    id: {},
  },
  data() {
    return {
      // 表单
      form: this.$form.createForm(this, { name: "coordinated" }),
      // 栅格布局
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
      },
      //
      // 头像地址
      imgUrl: this.baseURL + "project/upload_file/",
      imageUrl: "",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    };
  },
  methods: {
    handlereDete() {
      var qs = require("qs");
      console.log(this.staff_list);
      this.$api
        .post(this.baseURL + "dept/edit_mbr/", qs.stringify(this.staff_list), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
      this.visibles2 = false;
    },
    // 文件上传
    handleChange(info) {
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
};
</script>

<style></style>
