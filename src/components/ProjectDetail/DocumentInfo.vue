<template>
  <div>
    <a-form class="top" v-bind="formItemLayout">
      <a-row>
        <a-col :span="6">
          <a-form-item label="文件名称">
            <a-input placeholder="请输入" v-model="QueryForm.nm" />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="top_button">
        <a-button type="primary" style="margin-right: 8px" @click="handlerQuery"
          >查询</a-button
        >
        <a-button @click="handlerReset">重置</a-button>
      </div>
    </a-form>
    <div style="padding: 24px; background: #fff">
      <div class="concent-title">
        <span>项目文件</span>
        <a-upload
          name="avatar"
          :multiple="true"
          :show-upload-list="false"
          :customRequest="customRequest"
          style="float: right"
        >
          <a-button type="primary">上传文件</a-button>
        </a-upload>
      </div>
      <a-empty
        :style="{ display: proj_doculist == false ? 'block' : 'none' }"
      />
      <a-table
        :style="{ display: proj_doculist == false ? 'none' : 'block' }"
        :columns="proj_docu"
        :data-source="proj_doculist"
        :pagination="pagination"
        :rowKey="(record) => record.id"
        :rowClassName="
          (record, index) => (index % 2 === 1 ? 'table-apppro' : null)
        "
      >
        <template slot="operation" slot-scope="text, record">
          <!-- 无权限不能操作 -->
          <div class="editable-row-operations" v-if="record.is_allow == 'f'">
            <a :disabled="record.is_allow !== ''">下载</a>
            <a-divider type="vertical" />
            <a :disabled="record.is_allow !== ''">重命名</a>
            <a-divider type="vertical" />
            <a :disabled="record.is_allow !== ''">删除</a>
          </div>
          <!-- 有权限可操作 -->
          <div class="editable-row-operations" v-if="record.is_allow == 't'">
            <a
              :disabled="record.is_allow == ''"
              @click="handlerProjdown(record.id, record.nm)"
              >下载</a
            >
            <a-divider type="vertical" />
            <a-popconfirm
              placement="topLeft"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handlerProjrenm(record.id, record.nm)"
              @cancel="handlerProjClean(record.id)"
            >
              <a-icon slot="icon" />
              <template
                slot="title"
                style="position: relative; top: 0; left: 0"
              >
                <p>重命名</p>
                <a-input v-model="record.nm" style="margin-top: 10px"></a-input>
              </template>
              <a :disabled="record.is_allow == ''">重命名</a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <a-popconfirm
              ok-text="确定"
              cancel-text="取消"
              @confirm="() => handlerProjdelete(record.id)"
            >
              <template slot="title">
                <p>请确认是否要删除该文件？</p>
              </template>
              <a class="ant-dropdown-link"> 删除</a>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: "DocumentInfo",
  props: {
    proj_doculist: {},
  },
  inject: ["reload"],
  data() {
    const proj_docu = [
      {
        title: "文件名称",
        dataIndex: "nm",
      },
      {
        title: "创建者",
        dataIndex: "oper_nm",
      },
      {
        title: "创建时间",
        dataIndex: "created",
      },
      {
        title: "操作",
        dataIndex: "operation",
        scopedSlots: { customRender: "operation" },
      },
    ];
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 10 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      },
      proj_docu,
      param: this.$router.currentRoute.params.id.slice(4),
      pagination: false,
      // 查询
      QueryForm: {
        nm: "",
      },
    };
  },
  methods: {
    // 项目上传
    customRequest(data) {
      const formData = new FormData();
      formData.append("proj_id", this.param);
      formData.append("avatar", data.file);
      this.$api({
        method: "post",
        url: this.baseURL + "project/new_file",
        headers: { Authorization: localStorage.getItem("Authorization") },
        data: formData,
      })
        .then((res) => {
          let result = res.data;
          if (result.code) {
            message.success(`${data.file.name} 上传成功.`);
            this.reload();
          } else if (!result.code) {
            message.error(`${data.file.name} 上传失败.`);
          }
          this.getProjdoculist();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 下载
    handlerProjdown(id, nm) {
      console.log(id);
      const formData = new FormData();
      formData.append("rsc_id", "10930");
      this.$api({
        method: "post",
        url: this.baseURL + "project/down_file",
        headers: { Authorization: localStorage.getItem("Authorization") },
        data: formData,
        responseType: "blob",
      })
        .then((res) => {
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", nm);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重命名
    handlerProjrenm(id, nm) {
      var qs = require("qs");
      let params = {
        rsc_id: id,
        rename: nm,
      };
      this.$api
        .post(this.baseURL + "project/rename", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success("重命名成功");
            this.reload();
          } else {
            message.error("重命名失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlerProjClean() {
      this.reload();
    },
    // 删除
    handlerProjdelete(id) {
      var qs = require("qs");
      let params = {
        rsc_id: id,
      };
      this.$api
        .post(this.baseURL + "project/del_file", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success("删除成功");
            this.reload();
          } else {
            message.error("删除失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询
    handlerQuery() {
      console.log(this.QueryForm.nm);
      this.$api
        .get(this.baseURL + "project/proj_file", {
          params: {
            proj_id: this.param,
            file_nm: this.QueryForm.nm,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          console.log(result);
          this.proj_doculist = result.datarows;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置
    handlerReset() {
      this.reload();
    },
  },
};
</script>

<style>
.top {
  padding: 24px;
  margin-bottom: 24px;
  position: relative;
  background: #fff;
}
.top > .top_button {
  position: absolute;
  top: 24px;
  right: 24px;
}
.concent-title {
  width: 100%;
  height: 32px;
  margin-bottom: 24px;
  line-height: 32px;
  font-size: 16px;
  color: #000;
}
.table-apppro {
  background: #fafafa;
}
</style>
