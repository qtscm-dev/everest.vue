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
        {
          path: "/index/project/toappr",
          name: "suminfo_toappr",
          component: () => import("../views/project/Suminfo_toappr.vue"),
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

        // 指派中心
        // {
        //   path: "/index/assign/assign",
        //   name: "assign",
        //   component: () => import("../views/assign/Assign.vue")
        // }
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
  // console.log(Authorization);
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
