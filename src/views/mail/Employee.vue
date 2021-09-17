<template>
  <div>
    <div class="header">
      <a-breadcrumb class="title">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>通讯录管理</a-breadcrumb-item>
        <a-breadcrumb-item>员工管理</a-breadcrumb-item>
      </a-breadcrumb>
      <span>员工管理</span>
      <a-tabs class="tabs" default-active-key="1">
        <a-tab-pane class="tabs-item" key="1" tab="内部系统">
          <div class="tabs-item-top">
            <a-form
              :model="queryForm"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 15 }"
            >
              <a-row>
                <a-col :span="8">
                  <a-form-item
                    style="margin-bottom: 12px; margin-top: 12px"
                    label="员工"
                  >
                    <a-input
                      v-model="queryForm.nm"
                      placeholder="请输入账号/名称"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    style="margin-bottom: 12px; margin-top: 12px"
                    label="部门"
                  >
                    <a-input
                      v-model="queryForm.dept_nm"
                      placeholder="请输入部门名称"
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <span
                    class="form-button"
                    style="margin-bottom: 12px; margin-top: 15px"
                  >
                    <a-button
                      class="form-button-item"
                      type="primary"
                      @click="handlersubmit"
                      >查询</a-button
                    >
                    <a-button class="form-button-item" @click="handlerReset"
                      >重置</a-button
                    >
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div class="he"></div>
          <div class="tabs-item-content">
            <div
              style="
                width: 100%;
                height: 32px;
                line-height: 32px;
                margin-bottom: 24px;
              "
            >
              <span>员工列表</span>
              <a-button style="float: right" type="primary" @click="handlerNew"
                >新增员工</a-button
              >
            </div>
            <a-radio-group style="margin-bottom: 24px" v-model="value">
              <a-radio-button
                value="a"
                @click="handlerTrue"
                style="font-size: 14px"
              >
                已激活&nbsp;&nbsp;{{ listLenght.trueLenght }}
              </a-radio-button>
              <a-radio-button
                value="b"
                @click="handlerFalse"
                style="font-size: 14px"
              >
                已禁用&nbsp;&nbsp;{{ listLenght.falseLenght }}
              </a-radio-button>
              <a-radio-button
                value="c"
                @click="handlerAll"
                style="font-size: 14px"
              >
                全部&nbsp;&nbsp;{{ listLenght.allLenght }}
              </a-radio-button>
            </a-radio-group>
            <a-table
              :columns="columns"
              :data-source="employlist"
              :scroll="{ x: 1500 }"
              :pagination="pagination"
              size="middle"
              :rowClassName="
                (record, index) => (index % 2 === 1 ? 'table-emplo' : null)
              "
            >
              <span slot="pic" slot-scope="text, record">
                <img
                  style="
                    display: block;
                    width: 30px;
                    heigth: 30px;
                    border-radius: 50%;
                  "
                  :src="record.avatar"
                />
              </span>
              <a-badge
                v-if="text == '已激活'"
                slot="status"
                slot-scope="text"
                status="success"
                :text="text"
              />
              <a-badge
                v-else-if="text == '已禁用'"
                slot="status"
                slot-scope="text"
                status="error"
                :text="text"
              />
              <template slot="operation" slot-scope="text, record">
                <a @click="() => handlerEmpl(record.id)">详情</a>
                <a-divider type="vertical" />
                <a @click="() => handlerEdit(record.id)"> 编辑 </a>
                <a-divider type="vertical" />
                <a-popconfirm
                  title="请确认是否要删除该员工？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="() => handlerDelete(record.id)"
                >
                  <a class="ant-dropdown-link"> 删除</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link"> 重置</a>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
      <!-- 新增员工 -->
      <a-form
        :form="form"
        :model="editList"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-modal
          v-model="visibles1"
          title="新增员工"
          @ok="handleOk"
          :wrapper-col="wrapperCol"
          :destroyOnClose="true"
        >
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
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item label="姓名">
            <a-input
              v-model="editList.nm"
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
              v-model="editList.mob"
              type="text"
              maxLength="11"
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
              v-model="editList.login_nm"
              type="text"
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
              v-model="editList.role_id"
              style="width: 275.33px"
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
              v-model="editList.gender"
              style="width: 275.33px"
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
              v-model="editList.job_id"
              style="width: 275.33px"
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
              v-model="editList.dept_id"
              style="width: 275.33px"
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
              v-model="editList.is_leader"
              style="width: 275.33px"
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
            <a-input-group v-model="editList.phone">
              <a-row :gutter="8">
                <a-col :span="8">
                  <a-input placeholder="     +86" />
                </a-col>
                <a-col :span="16">
                  <a-input />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model="editList.email" placeholder="请输入"></a-input>
          </a-form-item>
          <a-form-item label="地址">
            <a-cascader
              v-model="editList.address"
              expand-trigger="hover"
              :options="options"
              style="width: 275.33px; margin-bottom: 24px"
              placeholder="请选择地址，如“xx省xx市xx区”"
            ></a-cascader>
            <a-input placeholder="请输入具体地址，如“xx街道xx小区”"></a-input>
          </a-form-item>
          <a-form-item label="状态">
            <a-radio-group v-model="editList.active" name="radioGroup">
              <a-radio :value="true"> 已激活 </a-radio>
              <a-radio :value="false"> 已禁用 </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-modal>
      </a-form>
      <!-- 编辑员工 -->
      <a-form
        :form="form"
        :model="editList"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-modal
          v-model="visibles2"
          title="编辑员工"
          :wrapper-col="wrapperCol"
          @ok="handlereDete"
          :destroyOnClose="true"
        >
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
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item label="姓名">
            <a-input
              :initialValue="staff_info.nm"
              :defaultValue="staff_info.nm"
              v-model="staff_list.nm"
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
              :initialValue="staff_info.mob"
              :defaultValue="staff_info.mob"
              v-model="staff_list.mob"
              type="text"
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
              :initialValue="staff_info.login_nm"
              :defaultValue="staff_info.login_nm"
              v-model="staff_list.login_nm"
              type="text"
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
              :initialValue="staff_info.role_id"
              :defaultValue="staff_info.role_id"
              v-model="staff_list.role_id"
              style="width: 275.33px"
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
              style="width: 275.33px"
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
              v-model="staff_list.job_id"
              style="width: 275.33px"
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
              v-model="staff_list.dept_id"
              style="width: 275.33px"
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
              :initialValue="staff_info.is_leader"
              :defaultValue="staff_info.is_leader"
              v-model="staff_list.is_leader"
              style="width: 275.33px"
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
            <a-input-group
              :initialValue="staff_info.phone"
              :defaultValue="staff_info.phone"
              v-model="staff_list.phone"
            >
              <a-row :gutter="8">
                <a-col :span="8">
                  <a-input placeholder="     +86" />
                </a-col>
                <a-col :span="16">
                  <a-input />
                </a-col>
              </a-row>
            </a-input-group>
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input
              :initialValue="staff_info.email"
              :defaultValue="staff_info.email"
              v-model="staff_list.email"
              placeholder="请输入"
            ></a-input>
          </a-form-item>
          <a-form-item label="地址">
            <a-cascader
              :initialValue="staff_info.address"
              :defaultValue="staff_info.address"
              v-model="staff_list.address"
              expand-trigger="hover"
              :options="options"
              style="width: 275.33px; margin-bottom: 24px"
              placeholder="请选择地址，如“xx省xx市xx区”"
            ></a-cascader>
            <a-input placeholder="请输入具体地址，如“xx街道xx小区”"></a-input>
          </a-form-item>
          <a-form-item label="状态">
            <a-radio-group v-model="staff_list.active" name="radioGroup">
              <a-radio :value="true"> 已激活 </a-radio>
              <a-radio :value="false"> 已禁用 </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-modal>
      </a-form>
    </div>
  </div>
</template>

<script>
import imgSrc1 from "../../../public/portrait/woman.jpg";
import imgSrc2 from "../../../public/portrait/man.jpg";
import { Modal } from "ant-design-vue";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "employee",
  data() {
    const columns = [
      {
        title: "头像",
        dataIndex: "avatar",
        fixed: "left",
        width: 60,
        scopedSlots: { customRender: "pic" },
      },
      {
        title: "姓名",
        dataIndex: "nm",
        fixed: "left",
        width: 60,
      },
      {
        title: "手机号码",
        dataIndex: "mob",
      },
      {
        title: "状态",
        dataIndex: "status",
        scopedSlots: { customRender: "status" },
      },
      {
        title: "性别",
        dataIndex: "sex",
      },
      {
        title: "职位",
        dataIndex: "job",
      },
      {
        title: "部门",
        dataIndex: "dept_nm",
      },
      {
        title: "部门等级",
        dataIndex: "lvl",
      },
      {
        title: "部门顺序",
        dataIndex: "o",
      },
      {
        title: "是否领导",
        dataIndex: "is_leader",
      },
      {
        title: "创建时间",
        dataIndex: "created",
      },
      {
        title: "更新时间",
        dataIndex: "updated",
      },
      {
        title: "操作",
        fixed: "right",
        scopedSlots: { customRender: "operation" },
      },
    ];
    return {
      loading: false,
      visibles1: false,
      visibles2: false,
      form: this.$form.createForm(this, { name: "coordinated" }),
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
      // 员工表格
      columns,
      employlist: [],
      listLenght: {
        trueLenght: "",
        falseLenght: "",
        allLenght: "",
      },
      pagination: {
        defaultPageSize: 20,
        current: "2",
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        size: "middle",
        total: "",
        emp_sta: "",
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
        onChange: (current, pageSize) => {
          this.handlerInfo(this.pagination.emp_sta, current, pageSize);
          console.log(this.pagination.emp_sta, current, pageSize);
        },
      },
      // 状态默认
      value: "a",
      // 栅格
      labelCol: {
        xs: { span: 12 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 14 },
      },
      // 地址
      options: [
        {
          value: "浙江省",
          label: "浙江省",
          children: [
            {
              value: "杭州市",
              label: "杭州市",
              children: [
                {
                  value: "西湖区",
                  label: "西湖区",
                },
              ],
            },
          ],
        },
        {
          value: "江苏省",
          label: "江苏省",
          children: [
            {
              value: "南京市",
              label: "南京市",
              children: [
                {
                  value: "中华门",
                  label: "中华门",
                },
              ],
            },
          ],
        },
      ],
      // 头像地址
      imgUrl: this.baseURL + "project/upload_file/",
      imageUrl: "",
      // 新增员工
      editList: [
        {
          login_nm: "",
          nm: "",
          mob: "",
          phone: "",
          active: "",
          email: "",
          address: "",
          avatar: "",
          job_id: "",
          dept_id: "",
          is_leader: "",
          gender: "",
          role_id: "",
        },
      ],
      dept_list: [],
      job_list: [],
      role_list: [],
      // 查询条件
      queryForm: {
        nm: "",
        dept_nm: "",
      },
      // 参数
      id: "",
      emUrl: "",
      // 状态
      text: "",
      // 编辑员工
      staff_info: "",
      staff_list: [
        {
          login_nm: "",
          nm: "",
          mob: "",
          phone: "",
          active: "",
          email: "",
          address: "",
          avatar: "",
          job_id: "",
          dept_id: "",
          is_leader: "",
          gender: "",
          role_id: "",
          user_id: "",
        },
      ],
    };
  },
  methods: {
    handleChangee(value) {
      console.log(`Selected: ${value}`);
    },
    // 条件查询
    handlersubmit() {
      this.$api
        .get(this.baseURL + "dept/mbr/", {
          params: {
            nm: this.queryForm.nm,
            dept_nm: this.queryForm.dept_nm,
          },
        })
        .then((res) => {
          let result = res.data;
          this.employlist = result.data.data.datarows;
          for (let i = 0; i < this.employlist.length; i++) {
            if (this.employlist[i].avatar !== null) {
              let emel = this.employlist[i].avatar;
              this.employlist[i].avatar = this.baseURL + emel;
            } else {
              if (this.employlist[i].sex == "女") {
                this.employlist[i].avatar = imgSrc1;
              } else {
                this.employlist[i].avatar = imgSrc2;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置
    handlerReset() {
      this.queryForm.nm = "";
      this.queryForm.dept_nm = "";
      this.handlerTrue();
    },
    // 文件上传
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
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
    // 新增员工
    handlerNew() {
      this.visibles1 = true;
    },
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err) => {
        var qs = require("qs");
        this.loading = true;
        if (!err) {
          this.$api
            .post(this.baseURL + "dept/new_mbr/", qs.stringify(this.editList), {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            })
            .then((res) => {
              let result = res.data;
              console.log(this.editList);
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
          this.visibles1 = false;
          this.loading = false;
          this.handlerInfo("t");
        }
      });
    },
    // 获取全部员工信息
    handlerAll() {
      this.handlerInfo("all");
    },
    // 获取已激活员工信息
    handlerTrue() {
      this.handlerInfo("t");
    },
    // 获取已禁用员工信息
    handlerFalse() {
      this.handlerInfo("f");
    },
    // 获取员工信息
    handlerInfo(stat, page, perpage) {
      this.$api
        .get(this.baseURL + "dept/mbr/", {
          params: {
            sta: stat,
            page: page,
            perpage: perpage,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.employlist = result.datarows;
          this.listLenght.trueLenght = result.count_num.active_num;
          this.listLenght.falseLenght = result.count_num.disabled_num;
          this.listLenght.allLenght = result.count_num.total_num;
          for (let i = 0; i < this.employlist.length; i++) {
            if (this.employlist[i].avatar !== null) {
              let emel = this.employlist[i].avatar;
              this.employlist[i].avatar = this.baseURL + "" + emel;
            } else {
              if (this.employlist[i].sex == "女") {
                this.employlist[i].avatar = imgSrc1;
              } else {
                this.employlist[i].avatar = imgSrc2;
              }
            }
          }
          this.pagination.total = result.pagination.total_items;
          this.pagination.emp_sta = stat;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除员工信息
    handlerDelete(id) {
      this.$api
        .get(this.baseURL + "dept/del_mbr/", {
          params: {
            user_id: id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          if (!result.code) {
            Modal.error({
              title: "删除员工",
              content: result.data.errmsg,
              okText: "返回",
            });
          }
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 详情
    handlerEmpl(id) {
      this.$router.push("/index/employee/emdetails/:id=" + id);
    },
    handlerIn() {
      this.$api
        .get(this.baseURL + "dept/new_mbr/", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          this.dept_list = result.data.data.dept_list;
          this.job_list = result.data.data.job_list;
          this.role_list = result.data.data.role_list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 编辑员工
    handlerEdit(id) {
      this.visibles2 = true;
      this.$api
        .get(this.baseURL + "dept/mbr_detail/", {
          params: {
            user_id: id,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.staff_info = result.staff_info;
          console.log(this.staff_info);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlereDete() {
      var qs = require("qs");
      let params = {
        user_id: this.id,
        login_nm:
          this.staff_list.login_nm != null
            ? this.staff_list.login_nm
            : this.staff_info.login_nm,
        nm:
          this.staff_list.nm != null ? this.staff_list.nm : this.staff_info.nm,
        mob:
          this.staff_list.mob != null
            ? this.staff_list.mob
            : this.staff_info.mob,
        phone:
          this.staff_list.phone != null
            ? this.staff_list.phone
            : this.staff_info.phone,
        active:
          this.staff_list.active != null
            ? this.staff_list.active
            : this.staff_info.sta,
        email:
          this.staff_list.email != null
            ? this.staff_list.email
            : this.staff_info.email,
        address:
          this.staff_list.address != null
            ? this.staff_list.address
            : this.staff_info.address,
        avatar:
          this.staff_list.avatar != null
            ? this.staff_list.avatar
            : this.staff_info.avatar,
        job_id:
          this.staff_list.job_id != null
            ? this.staff_list.job_id
            : this.staff_info.job_id,
        dept_id:
          this.staff_list.dept_id != null
            ? this.staff_list.dept_id
            : this.staff_info.dept_id,
        is_leader:
          this.staff_list.is_leader != null
            ? this.staff_list.is_leader
            : this.staff_info.leader,
        gender:
          this.staff_list.gender != null
            ? this.staff_list.gender
            : this.staff_info.gender,
        role_id:
          this.staff_list.role_id != null
            ? this.staff_list.role_id
            : this.staff_info.role_id,
      };
      this.$api
        .post(this.baseURL + "dept/edit_mbr/", qs.stringify(params), {
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
  },
  mounted() {
    this.handlerTrue();
    this.handlerIn();
  },
};
</script>

<style scooed>
.table-emplo {
  background: #fafafa;
}
.ant-spin-nested-loading {
  position: relative;
  width: 100%;
  height: auto;
}
.header {
  width: 100%;
  height: 110px;
  background: #fff;
  position: relative;
}
.header > .title {
  padding: 8px 32px;
  font-size: 14px;
  opacity: 65%;
}
.header > span {
  font-size: 20px;
  font-weight: bold;
  color: #000;
  padding: 12px 32px 0;
}
.header > .tabs {
  padding: 0 24px;
}
.tabs-item-top {
  width: 99%;
  height: auto;
  padding: 0 24px;
  margin: 8px auto 0;
  background: #fff;
}
.tabs-item-top .form-button {
  float: right;
  margin-right: 24px;
}
.tabs-item-top .form-button-item {
  margin-right: 8px;
}
.form-input {
  width: 264px;
  height: 32px;
}
.he {
  width: 100%;
  height: 24px;
}
.tabs-item-content {
  width: 99%;
  height: auto;
  padding: 24px;
  margin: 0 auto;
  background: #fff;
}
.tabs-item-content > div {
  font-size: 16px;
  line-height: 22px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
