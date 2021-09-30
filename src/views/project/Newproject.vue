<template>
  <div>
    <div class="header">
      <a-breadcrumb class="title">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>立项中心</a-breadcrumb-item>
      </a-breadcrumb>
      <span>立项中心</span>
      <div style="float: right">
        <a-dropdown>
          <a-button
            style="margin-right: 16px"
            @click="(e) => e.preventDefault()"
            >返回</a-button
          >
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
        <a-button type="primary" @click="handlerNewpro">提交项目</a-button>
      </div>
    </div>
    <a-form-model :form="form" :newnewproForm="newproForm" class="concentor">
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="项目编号" style="position: relative">
            <a-input
              style="width: 70%"
              v-model="newproForm.code"
              placeholder="请输入"
            />
            <span
              ref="itemNo"
              style="
                display: none;
                color: red;
                position: absolute;
                top: 16px;
                left: 0;
              "
              >该项为必填项</span
            >
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="项目名称">
            <a-input
              style="width: 70%"
              v-decorator="[
                newproForm.nm,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="合同编号">
            <a-input
              style="width: 70%"
              v-decorator="[
                newproForm.contract_no,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="流程编号">
            <a-input
              style="width: 70%"
              v-decorator="[
                newproForm.proc_code,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="项目类型">
            <a-select
              style="width: 70%"
              v-decorator="[
                newproForm.proj_type_id,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请选择"
            >
              <a-select-option
                v-for="(projects, i) in project_typeFrom"
                :key="i"
                :value="projects.id"
              >
                {{ projects.lbl }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="建设单位">
            <a-input
              style="width: 70%"
              v-decorator="[
                newproForm.build_unit,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="建筑面积">
            <a-input
              style="width: 70%"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              v-decorator="[
                newproForm.build_area,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
              suffix="平米"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="幕墙面积">
            <a-input
              style="width: 70%"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              v-decorator="[
                newproForm.wall_area,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
              suffix="平米"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="门窗面积">
            <a-input
              style="width: 70%"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              v-decorator="[
                newproForm.dw_area,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
              suffix="平米"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="建筑高度">
            <a-input
              style="width: 70%"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              v-decorator="[
                newproForm.build_height,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
              suffix="米"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="幕墙高度">
            <a-input
              style="width: 70%"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              v-decorator="[
                newproForm.wall_height,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
              placeholder="请输入"
              suffix="米"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="项目周期">
            <a-range-picker
              style="width: 70%"
              v-decorator="[newproForm.proj_cycle, rangeConfig]"
              @change="onChange"
            >
              <a-icon slot="suffixIcon" type="calendar" />
            </a-range-picker>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="建筑类型">
            <a-select
              mode="multiple"
              style="width: 70%"
              placeholder="请选择(可多选)"
              v-decorator="[
                newproForm.build_type_id,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
            >
              <a-select-option
                v-for="builds in build_typeForm"
                :key="builds.id"
              >
                {{ builds.lbl }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="设计类型">
            <a-select
              mode="multiple"
              style="width: 70%"
              placeholder="请选择(可多选)"
              v-decorator="[
                newproForm.design_type_id,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
            >
              <a-select-option v-for="works in work_typeForm" :key="works.id">
                {{ works.lbl }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="主设专业">
            <a-select
              style="width: 70%"
              placeholder="请选择"
              v-decorator="[
                newproForm.main_major_id,
                { rules: [{ required: true, message: '该项为必填项' }] },
              ]"
            >
              <a-select-option
                v-for="(works, i) in work_typeForm"
                :key="i"
                :value="works.id"
              >
                {{ works.lbl }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="建设地点">
            <a-input-group>
              <a-cascader
                style="width: 23.5%; margin-right: 15px; float: left"
                :options="options"
                expand-trigger="hover"
                placeholder="请选择"
                v-model="newproForm.build_addr[0]"
                v-decorator="[
                  '建设',
                  {
                    initialValue: [options],
                    rules: [{ required: true, message: '该项为必填项' }],
                  },
                ]"
              />
              <a-input
                style="width: 65.5%"
                placeholder="街道，门牌号（可选输入）"
                v-model="newproForm.build_addr[1]"
                v-decorator="[
                  '地点',
                  {
                    initialValue: [newproForm.build_addr[1]],
                    rules: [{ required: true, message: '该项为必填项' }],
                  },
                ]"
              />
            </a-input-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <div>
            <a-form-model-item
              style="width: 45%"
              v-for="(item, i) in plus"
              :key="i"
              :label="i === 0 ? '竞争单位' : ''"
            >
              <a-input
                placeholder="请输入"
                v-decorator="[
                  newproForm.competitor[i],
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
            </a-form-model-item>
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
        <a-col :span="24">
          <a-form-model-item label="设计报价">
            <a-input-group>
              <a-input
                style="width: 23.5%; margin-right: 15px"
                placeholder="请输入"
                v-decorator="[
                  newproForm.quote.nm,
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
              <a-input
                style="width: 20.5%"
                addon-before="￥"
                suffix="RMB"
                placeholder="0"
                v-decorator="[
                  newproForm.quote.rmb,
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
            </a-input-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="16">
          <a-form-model-item label="代建">
            <a-input
              v-model="newproForm.agent_constr"
              style="width: 68%"
              placeholder="请输入"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="16">
          <a-form-model-item label="母公司">
            <a-input
              v-model="newproForm.parent_company"
              style="width: 68%"
              placeholder="请输入"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="备注（可选）">
            <a-textarea
              v-model="newproForm.cmt"
              style="width: 89.5%"
              placeholder="请输入备注"
            ></a-textarea>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <Footer />
  </div>
</template>

<script>
import { Modal } from "ant-design-vue";
import options from "../../address/add";
import Footer from "../../components/Footer/Footer";
export default {
  name: "newproject",
  components: { Footer },
  data() {
    return {
      form: this.$form.createForm(this, { name: "coordinated" }),
      rangeConfig: {
        rules: [{ type: "array", required: true, message: "该项为必填项" }],
      },
      // 项目类型
      project_typeFrom: [],
      // 建筑类型
      build_typeForm: [],
      // 设计类型
      work_typeForm: [],
      // 新建项目
      newproForm: {
        code: "",
        nm: "",
        contract_no: "",
        proc_code: "",
        proj_type_id: "",
        build_unit: "",
        build_area: "",
        wall_area: "",
        dw_area: "",
        build_height: "",
        wall_height: "",
        proj_cycle: [],
        build_type_id: [],
        design_type_id: [],
        main_major_id: "",
        build_addr: [],
        competitor: [],
        quote: { nm: "", rmb: "" },
        agent_constr: "",
        parent_company: "",
        cmt: "",
      },
      // 竞争单位
      plus: [
        {
          newplus: "",
        },
      ],
      // 建设地点
      options: options,
    };
  },
  methods: {
    waring() {
      let a = this.newproForm.agent_constr;
      let b = this.newproForm.build_addr;
      let c = this.newproForm.build_area;
      let d = this.newproForm.build_height;
      let e = this.newproForm.build_type_id;
      let f = this.newproForm.build_unit;
      let g = this.newproForm.cmt;
      let h = this.newproForm.code;
      let i = this.newproForm.competitor;
      let j = this.newproForm.contract_no;
      let k = this.newproForm.design_type_id;
      let l = this.newproForm.dw_area;
      let m = this.newproForm.main_major_id;
      let n = this.newproForm.nm;
      let o = this.newproForm.parent_company;
      let p = this.newproForm.proc_code;
      let q = this.newproForm.proj_cycle;
      let r = this.newproForm.proj_type_id;
      let s = this.newproForm.quote;
      let t = this.newproForm.wall_area;
      let u = this.newproForm.wall_height;
      if (
        a == "" &&
        b == "" &&
        c == "" &&
        d == "" &&
        e == "" &&
        f == "" &&
        g == "" &&
        h == "" &&
        i == "" &&
        j == "" &&
        k == "" &&
        l == "" &&
        m == "" &&
        n == "" &&
        o == "" &&
        p == "" &&
        q == "" &&
        r == "" &&
        s.nm == "" &&
        s.rmb == "" &&
        t == "" &&
        u == ""
      ) {
        this.$router.push({ name: "project" });
        // console.log("dd");
      } else {
        this.handlerModel();
      }
    },
    // 保存后返回列表页
    handlerModel() {
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
              if (result.code) {
                that.$router.push({ name: "project" });
              } else {
                that.$refs.itemNo.style.display = "block";
              }
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
    // 获取新建项目内容
    getProject() {
      this.$api
        .get(this.baseURL + "project/new_project/", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.project_typeFrom = result.project_type;
          this.build_typeForm = result.build_type;
          this.work_typeForm = result.work_type;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交项目
    handlerNewpro(e) {
      e.preventDefault();
      console.log(this.form);
      // console.log(this.form.setFieldsValue);
      console.log(this.newproForm);
      console.log(this.newproForm.build_addr);
      // this.form.validateFields((err) => {
      //   if (!err) {
      //     var qs = require("qs");
      //     this.$api
      //       .post(
      //         this.baseURL + "project/new_project/",
      //         qs.stringify(this.newproForm),
      //         {
      //           headers: {
      //             Authorization: localStorage.getItem("Authorization"),
      //           },
      //         }
      //       )
      //       .then((res) => {
      //         console.log(res);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //   }
      // });
    },
    //项目周期
    onChange(date, dateString) {
      console.log(date);
      this.newproForm.proj_cycle = dateString;
    },
    // 新增竞争单位
    handlerNewplus() {
      this.plus.push({
        content: "",
      });
    },
    // 删除竞争单位
    handlerDelete(index) {
      if (this.plus.length > 1) {
        this.plus.splice(index, 1);
      }
    },
    // 保存返回
    handlerpreser() {
      var qs = require("qs");
      this.$api
        .post(
          this.baseURL + "project/save_project/",
          qs.stringify(this.newproForm),
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        )
        .then((res) => {
          console.log(this.newproForm);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProject();
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 90px;
  background: #fff;
  padding-right: 24px;
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
.concentor {
  width: 97%;
  height: auto;
  margin: 24px auto;
  padding: 24px;
  box-sizing: border-box;
  background: #fff;
}
</style>
