import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/User/Login.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      // hideInMenu: true,
      component: () => import("../views/User/Login.vue"),
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../views/Index/Index.vue"),
      // hideInMenu: false,
      children: [
        // 通讯录管理
        {
          path: "/index/department",
          name: "department",
          component: () => import("../views/mail/Department.vue"),
        },
        {
          path: "/index/department/dedetails/:id",
          name: "dedetails",
          component: () => import("../views/mail/Dedetails.vue"),
        },
        {
          path: "/index/employee",
          name: "employee",
          component: () => import("../views/mail/Employee.vue"),
        },
        {
          path: "/index/employee/emdetails/:id",
          name: "emdetails",
          component: () => import("../views/mail/Emdetails.vue"),
        },

        // 立项中心
        {
          path: "/index/project/project",
          name: "project",
          component: () => import("../views/project/Project.vue"),
        },
        {
          path: "/index/project/newproject",
          name: "newproject",
          component: () => import("../views/project/Newproject.vue"),
        },

        // 概要信息--已立项
        {
          path: "/index/project/project/apppro/:id",
          name: "apppro",
          component: () => import("../views/project/summaryInfo/Apppro.vue"),
        },
        {
          path: "/index/project/project/toapppro/:id",
          name: "apppro",
          component: () => import("../views/project/summaryInfo/Toapppro.vue"),
        },

        // 认领中心
        {
          path: "/index/claim/claimindex",
          name: "claimIndex",
          component: () => import("../views/Claim/claimIndex"),
        },
        {
          path: "/index/claim/claimindex/todatail/:id",
          name: "Todatail",
          component: () => import("../views/Claim/datail/Todatail"),
        },
        {
          path: "/index/claim/claimindex/favordatail",
          name: "Favordatail",
          component: () => import("../views/Claim/datail/Favordatail"),
        },
        {
          path: "/index/claim/claimindex/favtodatail/:id",
          name: "Favtodatail",
          component: () => import("../views/Claim/datail/Favtodatail"),
        },

        // 设计中心
        {
          path: "/index/design/design",
          name: "DesignIndex",
          component: () => import("../views/Design/DesignIndex"),
        },
      ],
    },
    {
      path: "/ceshi",
      component: () => import("../views/User/ceshi.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  let { title = "中南暮墙数字化中台" } = to.meta;
  document.title = title;
  let Authorization = localStorage.getItem("Authorization");
  if (to.name != "login") {
    if (!Authorization) {
      next({ name: Login });
    } else {
      next();
    }
  }
  next();
});

export default router;
