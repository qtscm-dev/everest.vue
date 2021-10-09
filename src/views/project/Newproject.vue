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
        <a-button type="primary" @click="handlerNewpro('newproForm')"
          >提交项目</a-button
        >
      </div>
    </div>
    <a-form-model
      ref="newproForm"
      :rules="rules"
      :model="newproForm"
      class="concentor"
    >
      <a-row>
        <a-col :span="8">
          <a-form-model-item
            label="项目编号"
            prop="code"
            style="position: relative"
          >
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
          <a-form-model-item label="项目名称" prop="nm">
            <a-input
              style="width: 70%"
              v-model="newproForm.nm"
              placeholder="请输入"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="合同编号" prop="contract_no">
            <a-input
              style="width: 70%"
              v-model="newproForm.contract_no"
              placeholder="请输入"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="流程编号" prop="proc_code">
            <a-input
              style="width: 70%"
              v-model="newproForm.proc_code"
              placeholder="请输入"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="项目类型" prop="proj_type_id">
            <a-select
              style="width: 70%"
              placeholder="请选择"
              v-model="newproForm.proj_type_id"
            >
              <div slot="dropdownRender" slot-scope="menu">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <div
                  style="padding: 4px 8px; cursor: pointer"
                  @mousedown="(e) => e.preventDefault()"
                  @click="addItem(project_typeFrom)"
                >
                  <a-icon type="plus" /> 添加数据
                </div>
                <a-modal
                  v-model="visibl"
                  title="添加数据"
                  :allowClear="true"
                  :destroyOnClose="true"
                  on-ok="handleOk"
                >
                  <template slot="footer">
                    <a-button key="back" @click="handlerAddClear">
                      取消
                    </a-button>
                    <a-button
                      key="submit"
                      type="primary"
                      @click="handlerAddNum"
                    >
                      确定
                    </a-button>
                  </template>
                  <a-input
                    v-model="lbl"
                    placeholder="请输入"
                    style="margin: 24px auto"
                  />
                </a-modal>
              </div>
              <a-select-option
                v-for="projects in project_typeFrom"
                :key="projects.id"
              >
                {{ projects.lbl }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="建设单位" prop="build_unit">
            <a-input
              style="width: 70%"
              v-model="newproForm.build_unit"
              placeholder="请输入"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="建筑面积" prop="build_area">
            <a-input
              style="width: 70%"
              v-model="newproForm.build_area"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              placeholder="请输入"
              suffix="平米"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="幕墙面积" prop="wall_area">
            <a-input
              style="width: 70%"
              v-model="newproForm.wall_area"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              placeholder="请输入"
              suffix="平米"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="门窗面积" prop="dw_area">
            <a-input
              style="width: 70%"
              v-model="newproForm.dw_area"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              placeholder="请输入"
              suffix="平米"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="建筑高度" prop="build_height">
            <a-input
              style="width: 70%"
              v-model="newproForm.build_height"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              placeholder="请输入"
              suffix="米"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="幕墙高度" prop="wall_height">
            <a-input
              style="width: 70%"
              v-model="newproForm.wall_height"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              placeholder="请输入"
              suffix="米"
            ></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="项目周期" prop="proj_cycle">
            <a-range-picker
              style="width: 70%"
              v-model="newproForm.proj_cycle"
              @change="onChange"
            >
              <a-icon slot="suffixIcon" type="calendar" />
            </a-range-picker>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="建筑类型" prop="build_type_id">
            <a-select
              mode="multiple"
              class="sele"
              style="width: 70%"
              v-model="newproForm.build_type_id"
              :showArrow="true"
              placeholder="请选择(可多选)"
            >
              <div slot="dropdownRender" slot-scope="menu">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <div
                  style="padding: 4px 8px; cursor: pointer"
                  @mousedown="(e) => e.preventDefault()"
                  @click="addItem(build_typeForm)"
                >
                  <a-icon type="plus" /> 添加数据
                </div>
                <a-modal
                  v-model="visibl"
                  title="添加数据"
                  :allowClear="true"
                  :destroyOnClose="true"
                  on-ok="handleOk"
                >
                  <template slot="footer">
                    <a-button key="back" @click="handlerAddClear">
                      取消
                    </a-button>
                    <a-button
                      key="submit"
                      type="primary"
                      @click="handlerAddNum"
                    >
                      确定
                    </a-button>
                  </template>
                  <a-input
                    v-model="lbl"
                    placeholder="请输入"
                    style="margin: 24px auto"
                  />
                </a-modal>
              </div>
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
          <a-form-model-item label="设计类型" prop="design_type_id">
            <a-select
              mode="multiple"
              style="width: 70%"
              :showArrow="true"
              placeholder="请选择(可多选)"
              v-model="newproForm.design_type_id"
            >
              <div slot="dropdownRender" slot-scope="menu">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <div
                  style="padding: 4px 8px; cursor: pointer"
                  @mousedown="(e) => e.preventDefault()"
                  @click="addItem(work_typeForm)"
                >
                  <a-icon type="plus" /> 添加数据
                </div>
                <a-modal
                  v-model="visibl"
                  title="添加数据"
                  :allowClear="true"
                  :destroyOnClose="true"
                  on-ok="handleOk"
                >
                  <template slot="footer">
                    <a-button key="back" @click="handlerAddClear">
                      取消
                    </a-button>
                    <a-button
                      key="submit"
                      type="primary"
                      @click="handlerAddNum"
                    >
                      确定
                    </a-button>
                  </template>
                  <a-input
                    v-model="lbl"
                    placeholder="请输入"
                    style="margin: 24px auto"
                  />
                </a-modal>
              </div>
              <a-select-option v-for="works in work_typeForm" :key="works.id">
                {{ works.lbl }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="主设专业" prop="main_major_id">
            <a-select
              style="width: 70%"
              placeholder="请选择"
              v-model="newproForm.main_major_id"
            >
              <div slot="dropdownRender" slot-scope="menu">
                <v-nodes :vnodes="menu" />
                <a-divider style="margin: 4px 0" />
                <div
                  style="padding: 4px 8px; cursor: pointer"
                  @mousedown="(e) => e.preventDefault()"
                  @click="addItem(work_typeForm)"
                >
                  <a-icon type="plus" /> 添加数据
                </div>
                <a-modal
                  v-model="visibl"
                  title="添加数据"
                  :allowClear="true"
                  :destroyOnClose="true"
                  on-ok="handleOk"
                >
                  <template slot="footer">
                    <a-button key="back" @click="handlerAddClear">
                      取消
                    </a-button>
                    <a-button
                      key="submit"
                      type="primary"
                      @click="handlerAddNum"
                    >
                      确定
                    </a-button>
                  </template>
                  <a-input
                    v-model="lbl"
                    placeholder="请输入"
                    style="margin: 24px auto"
                  />
                </a-modal>
              </div>
              <a-select-option v-for="works in work_typeForm" :key="works.id">
                {{ works.lbl }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="建设地点" prop="build_addr">
            <a-cascader
              style="width: 23.5%; margin-right: 15px"
              :options="options"
              expand-trigger="hover"
              placeholder="请选择"
              v-model="newproForm.build_addr[0]"
            />
            <a-input
              style="width: 65.5%"
              placeholder="街道，门牌号（可选输入）"
              v-model="newproForm.build_addr[1]"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <div>
            <a-form-model-item
              style="width: 45%"
              v-for="(item, i) in plus"
              :key="i"
              :label="i === 0 ? '竞争单位' : ''"
              prop="competitor"
            >
              <a-input
                placeholder="请输入"
                v-model="newproForm.competitor[i]"
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
          <a-form-model-item label="设计报价" prop="quote">
            <a-input-group>
              <a-input
                style="width: 23.5%; margin-right: 15px"
                placeholder="请输入"
                v-model="newproForm.quote[0]"
              />
              <a-input
                style="width: 20.5%"
                addon-before="￥"
                suffix="RMB"
                placeholder="0"
                v-model="newproForm.quote[1]"
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
import { Modal, message } from "ant-design-vue";
import options from "../../address/add";
import Footer from "../../components/Footer/Footer";
export default {
  name: "newproject",
  components: {
    Footer,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
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
      rules: {
        code: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "blur",
          },
          { validator: GloTips, trigger: "change" },
        ],
        proj_cycle: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        nm: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        contract_no: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        proc_code: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        proj_type_id: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        build_unit: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        competitor: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        build_area: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        wall_area: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        dw_area: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        build_height: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        wall_height: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        build_type_id: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        design_type_id: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        main_major_id: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        build_addr: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
        quote: [
          {
            required: true,
            message: "该项为必填项",
            trigger: "change",
          },
          { validator: GloTips, trigger: "change" },
        ],
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
        quote: [],
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
      // 新增类型
      visibl: false,
      pid: "",
      lbl: "",
      lbl_nm: [],
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
      } else {
        this.handlerModel();
      }
    },
    // 保存后返回列表页
    handlerModel() {
      let that = this;
      console.log(that.newproForm);
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
    handlerNewpro(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          var qs = require("qs");
          this.$api
            .post(
              this.baseURL + "project/new_project/",
              qs.stringify(this.newproForm),
              {
                headers: {
                  Authorization: localStorage.getItem("Authorization"),
                },
              }
            )
            .then((res) => {
              if (res.data.code) {
                message.success("成功");
                this.$router.push({ name: "project" });
              } else {
                message.error(res.data.data.errmsg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
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
    // 新增类型
    addItem(form) {
      this.visibl = true;
      for (let i = 0; i < form.length; i++) {
        this.pid = form[i].pid;
      }
    },
    handlerAddNum() {
      var qs = require("qs");
      let params = {
        lbl: this.lbl,
        pid: this.pid,
      };
      this.$api
        .post(this.baseURL + "project/new_csd/", qs.stringify(params), {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          if (res.data.code) {
            message.success("数据添加成功");
            this.lbl = "";
            this.newproForm.build_type_id.push(res.data.data.data.n_id);
            this.getProject();
          } else {
            message.error(res.data.data.errmsg);
          }
          this.visibl = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlerAddClear() {
      this.lbl = "";
      this.visibl = false;
    },
  },
  mounted() {
    this.getProject();
  },
};
</script>

<style scoped>
.sele:hover {
  cursor: pointer;
}
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
