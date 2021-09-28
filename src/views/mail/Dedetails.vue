<template>
  <div>
    <div class="header">
      <a-breadcrumb class="title">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>通讯录管理</a-breadcrumb-item>
        <a-breadcrumb-item>部门管理</a-breadcrumb-item>
      </a-breadcrumb>
      <span>部门管理</span>
    </div>
    <div class="conter">
      <div class="top">
        <div class="top-1">基本信息</div>
        <div class="top-2">
          <a-row>
            <a-col
              style="margin-bottom: 12px; margin-top: 12px; color: #000"
              :span="8"
            >
              部门名称：<span style="opacity: 0.7">{{ depart.nm }}</span>
            </a-col>
            <a-col
              style="margin-bottom: 12px; margin-top: 12px; color: #000"
              :span="8"
            >
              部门等级：<span style="opacity: 0.7">{{ depart.lvl }}</span>
            </a-col>
            <a-col
              style="margin-bottom: 12px; margin-top: 12px; color: #000"
              :span="8"
            >
              部门顺序：<span style="opacity: 0.7">{{ depart.o }}</span>
            </a-col>
            <a-col
              style="margin-bottom: 12px; margin-top: 12px; color: #000"
              :span="8"
            >
              上级部门：<span style="opacity: 0.7">{{ depart.pnm }}</span>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="concent">
        <div style="margin-bottom: 24px">
          <span>员工信息</span>
          <a-button type="primary" class="concent-button" @click="handlerNewem"
            >新增员工</a-button
          >
        </div>
        <a-empty :style="{ display: empList == false ? 'block' : 'none' }" />
        <a-radio-group
          style="margin-bottom: 24px"
          v-model="value"
          :style="{ display: empList == false ? 'none' : 'block' }"
        >
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
          <a-radio-button value="c" @click="handlerAll" style="font-size: 14px">
            全部&nbsp;&nbsp;{{ listLenght.allLenght }}
          </a-radio-button>
        </a-radio-group>
        <a-table
          :columns="columns"
          :data-source="empList"
          :scroll="{ x: 1500 }"
          :pagination="pagination"
          :rowKey="(record) => record.id"
          size="middle"
          :rowClassName="
            (record, index) => (index % 2 === 1 ? 'table-proj' : null)
          "
          :style="{ display: empList == false ? 'none' : 'block' }"
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
          <!-- 状态 -->
          <a-badge
            v-if="text == '已激活'"
            slot="status"
            slot-scope="text"
            status="success"
            text="已激活"
            style="font-weight: initial"
          />
          <a-badge
            v-else-if="text == '已禁用'"
            slot="status"
            slot-scope="text"
            status="error"
            text="已禁用"
            style="font-weight: initial"
          />
          <template slot="operation" slot-scope="text, record">
            <span
              style="font-size: 14px; font-weight: initial; color: #1890ff"
              @click="() => handlerInfo(record.id)"
              >详情</span
            >
            <a-divider type="vertical" />
            <span
              style="font-size: 14px; font-weight: initial; color: #1890ff"
              @click="() => handlerEdit(record.id)"
            >
              编辑
            </span>
            <a-divider type="vertical" />
            <a-popconfirm
              title="请确认是否要删除该员工？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="() => handlerDelete(record.id)"
            >
              <span
                style="font-size: 14px; font-weight: initial; color: #1890ff"
                class="ant-dropdown-link"
              >
                删除</span
              >
            </a-popconfirm>
            <a-divider type="vertical" />
            <span
              style="font-size: 14px; font-weight: initial; color: #1890ff"
              @click="() => handlerReset(record.id)"
              >重置</span
            >
          </template>
        </a-table>
        <!-- 新增员工 -->
        <a-form :form="form" :model="editList" v-bind="formItemLayout">
          <a-modal
            v-model="visibles1"
            title="新增员工"
            @ok="handleOk"
            :destroyOnClose="true"
          >
            <a-form-item label="上传图像：">
              <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="imgUrl"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <a-icon type="plus" />
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
        <a-form :form="form" :model="staff_info" v-bind="formItemLayout">
          <a-modal
            v-model="visibles2"
            title="编辑员工"
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
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <a-icon type="plus" />
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
                style="width: 275.33px; margin-bottom: 24px"
                placeholder="请选择"
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
    <Footer />
  </div>
</template>

<script>
import imgUrl1 from "../../../public/portrait/woman.jpg";
import imgUrl2 from "../../../public/portrait/man.jpg";
import { Modal, message } from "ant-design-vue";
import Footer from "../../components/Footer/Footer";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  name: "dedetails",
  components: { Footer },
  data() {
    const columns = [
      {
        title: "头像",
        dataIndex: "avatar",
        key: "avatar",
        width: 70,
        scopedSlots: { customRender: "pic" },
      },
      {
        title: "姓名",
        dataIndex: "nm",
        key: "nm",
        width: 90,
      },
      {
        title: "手机号码",
        dataIndex: "mob",
        key: "mob",
      },
      {
        title: "状态",
        dataIndex: "status",
        scopedSlots: { customRender: "status" },
        sorter: (a, b) => {
          return a.status > b.status ? 1 : -1;
        },
      },
      {
        title: "性别",
        dataIndex: "sex",
        key: "sex",
      },
      {
        title: "职位",
        dataIndex: "job",
        key: "job",
      },
      {
        title: "部门顺序",
        dataIndex: "o",
        key: "o",
      },
      {
        title: "是否领导",
        dataIndex: "is_leader",
        key: "is_leader",
      },
      {
        title: "操作时间",
        dataIndex: "updated",
        key: "updated",
        sorter: (a, b) => {
          return a.updated > b.updated ? 1 : -1;
        },
      },
      {
        title: "操作",
        dataIndex: "operation",
        fixed: "right",
        scopedSlots: { customRender: "operation" },
      },
    ];
    return {
      // 参数
      param: this.$router.currentRoute.params.id.slice(4),
      // 表格
      form: this.$form.createForm(this, { name: "coordinated" }),
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
      visibles1: false,
      visibles2: false,
      value: "a",
      // 部门详情
      depart: "",
      // 员工信息
      columns,
      empList: [],
      staff_info: "",
      staff_list: "",
      role_list: "",
      job_list: "",
      dept_list: "",
      imgUrl: this.baseURL + "project/upload_file/",
      imageUrl: "",
      // 数据长度
      listLenght: {
        trueLenght: "",
        falseLenght: "",
        allLenght: "",
      },
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
      // 分页
      pagination: {
        defaultPageSize: 20,
        total: 0,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        size: "middle",
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
    };
  },
  methods: {
    // 获取信息
    getInfo(id, stat) {
      this.$api
        .get(this.baseURL + "dept/dept_detail/", {
          params: {
            dept_id: id,
            sta: stat,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.depart = result.dept_info;
          if (!result.staff_list) {
            this.empList = "";
          } else {
            this.empList = result.staff_list;
          }
          this.listLenght.trueLenght = result.count_num.active_num;
          this.listLenght.falseLenght = result.count_num.disabled_num;
          this.listLenght.allLenght = result.count_num.total_num;
          this.pagination.total = result.pagination.total_items;
          for (let i = 0; i < this.empList.length; i++) {
            if (this.empList[i].avatar == null) {
              if (this.empList[i].sex == "女") {
                this.empList[i].avatar = imgUrl1;
              } else {
                this.empList[i].avatar = imgUrl2;
              }
            } else {
              this.empList[i].avatar = this.baseURL + this.empList[i].avatar;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 已激活
    handlerTrue() {
      this.getInfo(this.param, "t");
    },
    // 已禁用
    handlerFalse() {
      this.getInfo(this.param, "f");
    },
    // 全部
    handlerAll() {
      this.getInfo(this.param, "all");
    },
    // 新增员工
    handlerNewem() {
      this.visibles1 = true;
    },
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err) => {
        var qs = require("qs");
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
          this.handlerInfo("t");
        }
      });
    },
    // 员工详情
    handlerInfo(id) {
      this.$router.push("/index/employee/emdetails/:id=" + id);
    },
    // 员工编辑
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
          console.log(id);
          let result = res.data.data.data;
          this.staff_info = result.staff_info;
          console.log(result);
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
    // 文件上传
    handleChange(info) {
      if (info.file.status === "uploading") {
        message.error("上传失败");
      }
      if (info.file.status === "done") {
        let result = info.file.response.data;
        console.log(result);
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          message.success("上传成功");
        });
      }
    },
    beforeUpload(file) {
      console.log(file.type);
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    // 删除员工
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
  },
  mounted() {
    this.handlerTrue();
  },
};
</script>

<style>
.table-proj {
  background: #fafafa;
}
</style>
<style scoped>
.header {
  width: 100%;
  height: 80px;
  background: #fff;
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
.conter {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 24px;
}
.conter .top {
  width: 99.5%;
  height: 196px;
  margin: 0 auto;
  background: #fff;
}
.conter .top .top-1 {
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #e8e8e8;
  line-height: 55px;
  font-weight: bold;
  padding-left: 24px;
  color: #000;
  font-size: 16px;
}
.conter .top .top-2 {
  width: 100%;
  height: 140px;
  padding: 24px;
}
.conter .concent {
  width: 99.5%;
  height: auto;
  margin: 24px auto;
  box-sizing: border-box;
  padding: 24px;
  background: #fff;
}
.conter .concent div span {
  font-weight: bold;
  color: #000;
  font-size: 16px;
}
.conter .concent div .concent-button {
  float: right;
}
.conter .concent .concent-radio {
  margin: 24px auto;
}
.conter .concent .concent-div {
  width: auto;
  height: 32px;
}
.conter .concent .concent-div-pag {
  float: right;
}
</style>
