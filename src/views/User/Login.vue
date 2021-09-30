<template>
  <div>
    <div class="login">
      <div class="appdiv">
        <h1>中南幕墙数字化中台</h1>
        <h5>效率就是生产力</h5>
        <div
          style="padding: 0 48px; box-sizing: border-box; text-align: center"
        >
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="账号密码登录">
              <a-form-model
                :form="form"
                class="user"
                :rules="rules"
                :model="loginForm"
              >
                <a-form-model-item class="account" prop="username">
                  <a-input
                    size="large"
                    placeholder="账号"
                    prop="username"
                    v-model="loginForm.username"
                  >
                    <a-icon
                      slot="prefix"
                      type="user"
                      style="color: rgba(0, 0, 0, 0.25)"
                    />
                  </a-input>
                </a-form-model-item>
                <a-form-model-item class="account" prop="password">
                  <a-input-password
                    size="large"
                    type="password"
                    placeholder="密码"
                    v-model="loginForm.password"
                  >
                    <a-icon
                      slot="prefix"
                      type="lock"
                      style="color: rgba(0, 0, 0, 0.25)"
                    />
                  </a-input-password>
                </a-form-model-item>
                <a-form-model-item class="remenber">
                  <a-checkbox class="remenber-1">自动登录</a-checkbox>
                  <a href="">忘记密码</a>
                </a-form-model-item>
              </a-form-model>
            </a-tab-pane>
            <a-tab-pane key="2" tab="手机号登录">
              <a-form-model class="phone">
                <a-form-model-item class="account">
                  <a-input
                    size="large"
                    maxLength="11"
                    minLength="11"
                    onkeyup="this.value=this.value.replace(/\D/g,'')"
                    placeholder="手机号"
                  >
                    <a-icon
                      slot="prefix"
                      type="mobile"
                      style="color: rgba(0, 0, 0, 0.25)"
                    />
                  </a-input>
                </a-form-model-item>
                <a-form-model-item class="account">
                  <a-input
                    size="large"
                    style="width: 70%; float: left"
                    placeholder="验证码"
                  >
                    <a-icon
                      slot="prefix"
                      type="user"
                      style="color: rgba(0, 0, 0, 0.25)"
                    />
                  </a-input>
                  <a-button type="primary" class="code">获取验证码</a-button>
                </a-form-model-item>
                <div class="remenber"></div>
              </a-form-model>
            </a-tab-pane>
          </a-tabs>
          <div class="login-in">
            <a-button
              style="width: 100%; height: 100%"
              type="primary"
              @click="loginFun"
              >登录</a-button
            >
          </div>
          <div class="login-on">
            <div class="login-on-1">
              <span>其他登录方式 </span>
              <img
                src="../../../public/wechat.png"
                alt=""
                @click="handlerwechat"
                v-on:mouseover="changeActive($event)"
                v-on:mouseout="removeActive($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
        password: {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
      },
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  created() {
    let that = this;
    document.onkeydown = function () {
      let e = window.event;
      if (e.keyCode == 13) {
        that.loginFun();
      }
    };
  },
  methods: {
    // 登录
    loginFun() {
      this.form.validateFields((err) => {
        if (!err) {
          var qs = require("qs");
          this.$api
            .post(this.baseURL + "auth/login", qs.stringify(this.loginForm))
            .then((res) => {
              let result = res.data;
              if (res.data.code == true) {
                message.success("登录成功", 4);
                localStorage.setItem(
                  "Authorization",
                  "Bearer " + res.data.data.token
                );
                // localStorage.setItem("username", this.loginForm.username);
                // localStorage.setItem("password", this.loginForm.password);
                this.$router.push({ name: "index" });
              } else if (res.data.code == false) {
                message.error(result.data.errmsg, 4);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    // 其他登录方式
    handlerwechat() {
      this.$router.push({ name: "loginwechat" });
    },
    changeActive($event) {
      $event.currentTarget.className = "active";
    },
    removeActive($event) {
      $event.currentTarget.className = "";
    },
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../../public/login.jpg) center/cover;
}
.appdiv {
  width: 464px;
  height: 496px;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: #fff;
}
h1 {
  font-size: 28px;
  text-align: center;
  color: #000;
  opacity: 65%;
  margin: 24px auto 10px;
}
h5 {
  font-size: 10px;
  text-align: center;
  margin: 0 auto 44px;
  opacity: 43%;
}
.title {
  width: 338px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.title .title-1 {
  width: 135px;
  height: 46px;
  font-size: 16px;
  line-height: 43px;
  opacity: 65%;
  text-align: center;
}
.title .title-1:hover {
  color: #1890ff;
  opacity: 1;
  border-bottom: 2px solid #1890ff;
}
.title .title-1.active {
  color: #1890ff;
  opacity: 1;
  border-bottom: 2px solid #1890ff;
}
.account {
  width: 368px;
  height: 40px;
  margin: 15px auto 23px;
}
.remenber {
  width: 368px;
  height: 22px;
  font-size: 14px;
  margin: 24px auto;
}
.remenber-1 {
  float: left;
  opacity: 0.75;
}
.login-in {
  width: 368px;
  height: 40px;
  margin: 0 auto;
}
.login-on {
  width: 369px;
  height: 24px;
  margin: 24px auto;
}
.login-on-1 {
  float: left;
  font-size: 14px;
  line-height: 24px;
}
.login-on-2 {
  float: right;
  color: #1890ff;
  font-size: 14px;
  line-height: 24px;
}
.login-on-1 span {
  padding-right: 16px;
}
.login-on-1 > img {
  display: block;
  width: 24px;
  height: 24px;
  float: right;
}
.login-on-1 > img.active {
  content: url("../../../public/wechat-on.png");
}
a {
  float: right;
}
.code {
  width: 25%;
  height: 40px;
  float: right;
  text-align: center;
  padding: 0;
}
.qrcode {
  z-index: 2;
}
.qrcode img {
  display: block;
  width: 209px;
  height: 209px;
  border: 1px solid #000;
  margin: 25px auto;
}
.ant-tabs-nav-scroll {
  text-align: center;
}
</style>
