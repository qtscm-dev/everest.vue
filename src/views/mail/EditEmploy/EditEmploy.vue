<template>
  <a-modal
    v-model="visibles2"
    title="编辑员工"
    @ok="handlereDete"
    :destroyOnClose="true"
  >
    <a-form-model :model="staff_list" :rules="rules" v-bind="formItemLayout">
      <a-form-model-item label="上传图像：">
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
      </a-form-model-item>
      <a-form-model-item label="姓名" prop="nm">
        <a-input placeholder="请输入" v-model="staff_list.nm" />
      </a-form-model-item>
      <a-form-model-item label="手机号码" prop="mob">
        <a-input
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          placeholder="请输入"
          v-model="staff_list.mob"
        />
      </a-form-model-item>
      <a-form-model-item label="账号" prop="login_nm">
        <a-input
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          placeholder="请输入"
          v-model="staff_list.login_nm"
        />
      </a-form-model-item>
      <a-form-model-item label="角色" prop="dept_nm">
        <a-select placeholder="请选择" v-model="staff_list.dept_nm">
          <a-select-option v-for="roles in role_list" :key="roles.id">
            {{ roles.lbl }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="性别" prop="gender">
        <a-select v-model="staff_list.gender" placeholder="请选择">
          <a-select-option value="1"> 男 </a-select-option>
          <a-select-option value="0"> 女 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="职位" prop="job_id">
        <a-select placeholder="请选择" v-model="staff_list.job_id">
          <a-select-option v-for="jobs in job_list" :key="jobs.id">
            {{ jobs.un }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="部门" prop="search">
        <a-select placeholder="请选择" v-model="staff_list.search">
          <a-select-option v-for="depts in dept_list" :key="depts.id">
            {{ depts.nm }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="是否领导" prop="is_leader">
        <a-select placeholder="请选择" v-model="staff_list.is_leader">
          <a-select-option value="t"> 是 </a-select-option>
          <a-select-option value="f"> 否 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="电话号码">
        <a-input-group>
          <a-input style="width: 25%; margin-right: 10px" placeholder="+86" />
          <a-input style="width: 70%" v-model="staff_list.phone" />
        </a-input-group>
      </a-form-model-item>
      <a-form-model-item label="邮箱">
        <a-input placeholder="请输入" v-model="staff_list.email"></a-input>
      </a-form-model-item>
      <a-form-model-item label="地址">
        <a-cascader
          expand-trigger="hover"
          :options="options"
          style="width: 236px; margin-bottom: 24px"
          :model="[staff_list.address, staff_list.province]"
          :default-value="[
            staff_list.province,
            staff_list.city,
            staff_list.region,
          ]"
          placeholder="请选择"
        ></a-cascader>
        <a-input placeholder="请输入具体地址，如“xx街道xx小区”"></a-input>
      </a-form-model-item>
      <a-form-model-item label="状态" prop="active">
        <a-radio-group
          name="radioGroup"
          defaultChecked="true"
          v-model="staff_list.sta"
        >
          <a-radio value="t"> 已激活 </a-radio>
          <a-radio value="f"> 已禁用 </a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { message } from "ant-design-vue";
import options from "../../../address/add";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "EditEmploy",
  props: {
    visibles2: {},
    staff_list: [],
    dept_list: [],
    job_list: [],
    role_list: [],
    id: {},
  },
  data() {
    let GloTips = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("该项不能为空"));
      } else {
        callback();
      }
    };
    return {
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
      //地址
      options: options,
      // 头像地址
      imgUrl: this.baseURL + "project/upload_file/",
      imageUrl: "",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
      //
      // 校验规则
      rules: {
        nm: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        mob: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        login_nm: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        dept_nm: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        gender: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        job_id: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        dept_id: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        is_leader: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        active: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
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
          if (res.data.code) {
            message.success("修改成功");
          } else {
            message.error(res.data.data.errmsg);
          }
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
