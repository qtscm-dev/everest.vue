<template>
  <div>
    <div class="header">
      <span>员工管理</span>
      <a-dropdown>
        <a-button style="float: right" @click="(e) => e.preventDefault()"
          >返回</a-button
        >
        <a-menu slot="overlay">
          <a-menu-item>
            <router-link :to="{ name: 'employee' }">返回列表页</router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link href="javascript:;" :to="{ name: 'index' }"
              >返回首页</router-link
            >
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="concent">
      <div class="title">
        <span>员工信息</span>
      </div>
      <div class="informa">
        <img
          ref="imgs"
          :src="imgSrc"
          style="width: 250px; height: 200px"
          alt=""
        />
        <a-descriptions
          class="informa-ul"
          :column="{ xxl: 3, xl: 3, lg: 1, md: 1, sm: 2, xs: 2 }"
        >
          <a-descriptions-item label="员工ID">
            {{ empInfo.id }}
          </a-descriptions-item>
          <a-descriptions-item label="状态">
            {{ empInfo.status }}
          </a-descriptions-item>
          <a-descriptions-item label="姓名">
            {{ empInfo.nm }}
          </a-descriptions-item>
          <a-descriptions-item label="邮箱">
            {{ empInfo.email }}
          </a-descriptions-item>
          <a-descriptions-item label="性别">
            {{ empInfo.sex }}
          </a-descriptions-item>
          <a-descriptions-item label="职位">
            {{ empInfo.job }}
          </a-descriptions-item>
          <a-descriptions-item label="手机号码">
            {{ empInfo.mob }}
          </a-descriptions-item>
          <a-descriptions-item label="座机号码">
            {{ empInfo.phone }}
          </a-descriptions-item>
          <a-descriptions-item label="是否领导">
            {{ empInfo.is_leader }}
          </a-descriptions-item>
          <a-descriptions-item label="部门顺序">
            {{ empInfo.dept_id }}
          </a-descriptions-item>
          <a-descriptions-item label="所属部门">
            {{ empInfo.dept_nm }}
          </a-descriptions-item>
          <a-descriptions-item label="地址">
            {{ empInfo.address }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import imgSrc1 from "../../../public/portrait/defaultman.jpeg";
import imgSrc2 from "../../../public/portrait/defaultwoman.png";
import Footer from "../../components/Footer/Footer";
export default {
  name: "emdetails",
  components: { Footer },
  data() {
    return {
      imgSrc: "",
      // 参数
      param: "",
      // 员工信息
      empInfo: "",
    };
  },
  methods: {
    // 获取信息
    handlerEmp() {
      this.param = this.$router.currentRoute.params.id.slice(4);
      this.$api
        .get(this.baseURL + "dept/mbr_detail/", {
          params: {
            user_id: this.param,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.empInfo = result.staff_info;
          if (this.empInfo.avatar != null) {
            this.imgSrc = this.baseURL + this.empInfo.avatar;
          } else if (this.empInfo.avatar == null) {
            if (this.empInfo.sex == "男") {
              this.imgSrc = imgSrc1;
            } else if (this.empInfo.sex == "女") {
              this.imgSrc = imgSrc2;
            } else {
              this.imgSrc = imgSrc1;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.handlerEmp();
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  padding: 18px 24px;
  box-sizing: border-box;
  background: #fff;
}
.header > span {
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
}
.concent {
  width: 98%;
  height: auto;
  margin: 24px;
  background: #fff;
}
.concent .title {
  padding: 24px;
  border-bottom: 1px solid #e8e8e8;
}
.concent .informa {
  width: 100%;
  height: auto;
  padding: 24px 32px;
  box-sizing: border-box;
  position: relative;
}
.concent .informa .informa-ul {
  /* position: absolute;
  left: 420px;
  top: 24px; */
}
.concent .informa .informa-ul ul {
  width: 50%;
  height: auto;
}
.concent .informa .informa-ul .list {
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.85);
}
.concent .informa .informa-ul .list span {
  color: rgba(0, 0, 0, 0.55);
}
</style>
