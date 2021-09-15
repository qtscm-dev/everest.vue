<template>
  <div>
    <div class="header">
      <a-breadcrumb class="title">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>立项中心</a-breadcrumb-item>
      </a-breadcrumb>
      <span>立项中心</span>
      <div
        :style="{
          float: 'right',
          padding: ' 0 24px',
        }"
      >
        <a-dropdown>
          <a-button style="margin-right: 16px">返回</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <span @click="waring">返回列表页</span>
            </a-menu-item>
            <a-menu-item>
              <router-link href="javascript:;" :to="{ name: 'index' }"
                >返回首页</router-link
              >
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-button type="primary" @click="handleSearch">提交项目</a-button>
      </div>
    </div>
    <a-form class="ant-advanced-search-form" :form="form">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="项目编号">
            <a-input
              v-model="viewForm.id"
              v-decorator="[
                '项目编号',
                {
                  rules: [
                    {
                      required: true,
                      initialValue: viewList.id,
                      message: '该项为必填项',
                    },
                  ],
                },
              ]"
              placeholder="请输入"
            />
            <div></div>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="项目名称">
            <a-input
              v-model="viewForm.nm"
              v-decorator="[
                '项目名称',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="合同编号">
            <a-input
              v-model="viewForm.contract_id"
              v-decorator="[
                '合同编号',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="流程编号">
            <a-input
              v-model="viewForm.proc_code"
              v-decorator="[
                '流程编号',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="项目类型">
            <a-select
              v-model="viewForm.project_lbl"
              v-decorator="[
                '项目类型',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请选择"
            >
              <a-select-option value="1">ggg </a-select-option>
              <a-select-option value="2">ggg </a-select-option>
              <a-select-option value="3">ggg </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="建设单位">
            <a-input
              v-model="viewForm.client_nm"
              v-decorator="[
                '建设单位',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="建筑面积">
            <a-input
              v-model="viewForm.build_area"
              v-decorator="[
                '建筑面积',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              suffix="平米"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="幕墙面积">
            <a-input
              v-model="viewForm.wall_area"
              v-decorator="[
                '幕墙面积',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              suffix="平米"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="门窗面积">
            <a-input
              v-model="viewForm.dw_area"
              v-decorator="[
                '门窗面积',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              suffix="平米"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="建筑高度">
            <a-input
              v-model="viewForm.build_height"
              v-decorator="[
                '建筑高度',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              suffix="米"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="幕墙高度">
            <a-input
              v-model="viewForm.wall_height"
              v-decorator="[
                '幕墙高度',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              suffix="米"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="项目周期">
            <a-range-picker
              v-model="viewForm.proj_cycle"
              style="width: 70%"
              :v-decorator="[
                '项目周期',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              @change="sonChange"
            >
              <a-icon slot="suffixIcon" type="calendar" />
            </a-range-picker>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="建筑类型">
            <a-select
              v-model="viewForm.build_lbl"
              v-decorator="[
                '建筑类型',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            >
              <a-select-option value="1">222 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="主设专业">
            <a-select
              v-model="viewForm.main_major_lbl"
              v-decorator="[
                '主设专业',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            >
              <a-select-option value="1">222 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="设计类型">
            <a-select
              v-model="viewForm.major_lbl"
              v-decorator="[
                '设计类型',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            >
              <a-select-option value="1">222 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="建设地点">
            <a-cascader
              v-model="viewForm.bulid_addr"
              style="width: 40%; margin-right: 15px"
              :options="options"
              expand-trigger="hover"
              v-decorator="[
                '建设地点',
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              @change="onChange"
            />
            <a-input
              v-model="viewForm.bulid_addr"
              style="width: 57%"
              placeholder="街道，门牌号（可选输入）"
            />
          </a-form-item>
        </a-col>
        <a-col :span="16">
          <div>
            <a-form-item
              style="width: 45%"
              v-for="(item, i) in plus"
              :key="i"
              :label="i === 0 ? '竞争单位' : ''"
            >
              <a-input
                v-model="viewForm.competitor"
                placeholder="请输入"
                v-decorator="[
                  `竞争单位[${i}]`,
                  {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '该项为必填项',
                      },
                    ],
                  },
                ]"
              />
            </a-form-item>
            <div style="position: absolute; top: 39px; left: 45%">
              <a-icon
                type="plus-circle"
                style="
                  color: #1890ff;
                  font-size: 24px;
                  margin-right: 10px;
                  margin-left: 24px;
                  padding-top: 8px;
                  box-sizing: border-box;
                "
                @click="handlerNewplus"
              />
              <a-icon
                type="minus-circle"
                style="
                  color: #1890ff;
                  font-size: 24px;
                  padding-top: 8px;
                  box-sizing: border-box;
                "
                @click="handlerDelete"
              />
            </div>
          </div>
        </a-col>
        <a-col :span="16">
          <a-form-item label="设计报价">
            <a-input-group>
              <a-input
                v-model="viewForm.quote.nm"
                style="width: 50%; margin-right: 15px"
                v-decorator="[
                  '设计报价',
                  { rules: [{ required: true, message: '该项为必填项' }] },
                ]"
                placeholder="请输入"
              />
              <a-input
                v-model="viewForm.quote.rem"
                style="width: 45%"
                addon-before="￥"
                suffix="RMB"
                v-decorator="[
                  '设计报价',
                  { rules: [{ required: true, message: '该项为必填项' }] },
                ]"
                placeholder="请输入"
              />
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="备注">
            <a-textarea v-model="viewForm.cmt" placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
export default {
  name: "toapppro",
  data() {
    return {
      msg: "ddd",
      form: this.$form.createForm(this, { name: "advanced_search" }),
      // 建设地点
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake",
                },
              ],
            },
          ],
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghuamen",
                  label: "Zhong Hua Men",
                },
              ],
            },
          ],
        },
        {
          value: "jiang",
          label: "Jiang",
          children: [
            {
              value: "nanji",
              label: "Nanji",
              children: [
                {
                  value: "zhonghuam",
                  label: "Zhong Hua M",
                },
              ],
            },
          ],
        },
        {
          value: "jian",
          label: "Jiangsu",
          children: [
            {
              value: "nanj",
              label: "Nanj",
              children: [
                {
                  value: "zhonghua",
                  label: "Zhong Hua",
                },
              ],
            },
          ],
        },
        {
          value: "jia",
          label: "Jia",
          children: [
            {
              value: "nan",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghu",
                  label: "Zhong Hu",
                },
              ],
            },
          ],
        },
        {
          value: "ji",
          label: "Ji",
          children: [
            {
              value: "nanjin",
              label: "Nanjin",
              children: [
                {
                  value: "zhonghuame",
                  label: "Zhong Hua Me",
                },
              ],
            },
          ],
        },
        {
          value: "jiangs",
          label: "Jiangs",
          children: [
            {
              value: "na",
              label: "Na",
              children: [
                {
                  value: "zhongh",
                  label: "Zhong H",
                },
              ],
            },
          ],
        },
        {
          value: "j",
          label: "J",
          children: [
            {
              value: "n",
              label: "N",
              children: [
                {
                  value: "z",
                  label: "Z",
                },
              ],
            },
          ],
        },
      ],
      // 竞争单位
      plus: [
        {
          newplus: "",
        },
      ],
      // 参数
      parame: "",
      // 提交项目
      viewForm: {
        project_id: "",
        biz_catg_code: "",
        biz_catg_id: "",
        build_area: "",
        build_height: "",
        build_lbl: "",
        bulid_addr: "",
        client_id: "",
        client_nm: "",
        cmt: "",
        code: "",
        compete_unit: "",
        competitor: "",
        construction: "",
        contract_id: "",
        contract_no: "",
        created: "",
        creator_id: "",
        dept_nm: "",
        dw_area: "",
        end_date: "",
        fee: "",
        id: "",
        main_major_id: "",
        main_major_lbl: "",
        major_lbl: "",
        nm: "",
        org_acct_id: "",
        owner_id: "",
        parent_company: "",
        pro_cycle: "",
        pro_status: "",
        proc_code: "",
        proj_type_id: "",
        project_contact_id: "",
        project_lbl: "",
        quote: "",
        stage: "",
        start_date: "",
        status: "",
        updated: "",
        updator_id: "",
        wall_area: "",
        wall_height: "",
      },
      viewList: [],
    };
  },
  beforeCreate() {
    this.$forceUpdate();
  },
  methods: {
    //提交项目
    handleSearch(e) {
      e.preventDefault();
      this.viewForm.project_id = this.viewList.id;
      console.log(this.viewForm);
      var qs = require("qs");
      this.form.validateFields((err) => {
        if (!err) {
          this.$api
            .post(this.baseURL + "", qs.stringify(this.viewForm), {
              headers: {
                Authorization: localStorage.getItem("Authorization"),
              },
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    //
    handleReset() {
      this.form.resetFields();
    },
    //
    waring() {
      let that = this;
      Modal.confirm({
        title: "返回",
        content: "当前内容未保存，返回后内容将不保存",
        cancelText: "返回",
        okText: "保存",
        onOk() {
          var qs = require("qs");
          that.$api
            .post(
              that.baseURL + "project/save_project/",
              qs.stringify(that.newproForm),
              {
                headers: {
                  Authorization: localStorage.getItem("Authorization"),
                },
              }
            )
            .then((res) => {
              let result = res.data;
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        onCancel() {
          that.$router.push({ name: "project" });
        },
      });
    },
    // 建设地点
    onChange(value) {
      console.log(value);
    },
    // 新增竞争单位
    handlerNewplus() {
      this.plus.push({
        content: "",
      });
    },
    // 删除竞争单位
    handlerDelete(index) {
      this.plus.splice(index, 1);
    },
    // 项目周期
    sonChange(date, dateString) {
      console.log(date);
      this.viewList.proj_cycle = dateString;
      console.log(this.viewList.proj_cycle);
    },
    // 获取参数/数据
    getParame() {
      this.parame = this.$router.currentRoute.params.id.slice(4);
      this.$api
        .get(this.baseURL + "project/project_detail/", {
          params: {
            project_id: this.parame,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data;
          this.viewList = result.data.data.project_info[0];
          console.log(this.viewList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getParame();
  },
};
</script>

<style>
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
.apppro-tabs {
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
}
.ant-tabs-tabpane {
  background: #fff;
  box-sizing: border-box;
}
.ant-advanced-search-form {
  margin: 24px;
  padding: 24px;
  background: #fff;
}
</style>
