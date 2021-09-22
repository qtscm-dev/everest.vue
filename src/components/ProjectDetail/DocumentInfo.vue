<template>
  <div>
    <a-form class="top">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="文件名称">
            <a-input placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>
      <div class="top_button">
        <a-button type="primary" style="margin-right: 8px">查询</a-button>
        <a-button>重置</a-button>
      </div>
    </a-form>
    <div style="width: 100%; height: 24px; background: #f4f4f4"></div>
    <div style="padding: 24px">
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
              placement="topRight"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handlerProjdelete(record.id)"
            >
              <template slot="title">
                <p>请确认是否要删除该文件？</p>
              </template>
              <a :disabled="record.is_allow == ''">删除</a>
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
      proj_docu,
      param: this.$router.currentRoute.params.id.slice(4),
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
          } else if (!result.code) {
            message.error(`${data.file.name} 上传失败.`);
          }
          this.getProjdoculist();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
