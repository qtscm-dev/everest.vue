import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/User/Login.vue";

Vue.use(VueRouter);
const RouteView = {
  name: "RouteView",
  render: (h) => h("router-view"),
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      // hideInMenu: true,
      component: () => import("../views/User/Login"),
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../views/Index/Index"),
      // hideInMenu: false,
      children: [
        // 通讯录管理
        {
          path: "/index/department",
          name: "department",
          component: RouteView,
          children: [
            {
              path: "/department/department",
              name: "department",
              component: () => import("../views/mail/Department"),
            },
            {
              path: "/department/dedetails/:id",
              name: "dedetails",
              component: () => import("../views/mail/Dedetails"),
            },
            {
              path: "/employee/employee",
              name: "employee",
              component: () => import("../views/mail/Employee"),
            },
            {
              path: "/employee/emdetails/:id",
              name: "emdetails",
              component: () => import("../views/mail/Emdetails"),
            },
          ],
        },

        // 立项中心
        {
          path: "/index/project",
          name: "project",
          component: RouteView,
          children: [
            {
              path: "/project/project",
              name: "project",
              component: () => import("../views/project/Project"),
            },
            // 概要信息--已立项
            {
              path: "/project/apppro/:id",
              name: "apppro",
              component: () =>
                import("../views/project/summaryInfo/Apppro.vue"),
            },
            {
              path: "/project/toapppro/:id",
              name: "apppro",
              component: () =>
                import("../views/project/summaryInfo/Toapppro.vue"),
            },
            {
              path: "/project/newproject",
              name: "newproject",
              component: () => import("../views/project/Newproject.vue"),
            },
          ],
        },

        // 认领中心
        {
          path: "/index/claim",
          name: "claimIndex",
          component: RouteView,
          children: [
            {
              path: "/claim/claimindex",
              name: "claimIndex",
              component: () => import("../views/Claim/claimIndex"),
            },
            {
              path: "/claim/claimindex/todatail/:id",
              name: "Todatail",
              component: () => import("../views/Claim/datail/Todatail"),
            },
            {
              path: "/claim/claimindex/favordatail",
              name: "Favordatail",
              component: () => import("../views/Claim/datail/Favordatail"),
            },
            {
              path: "/claim/claimindex/favtodatail/:id",
              name: "Favtodatail",
              component: () => import("../views/Claim/datail/Favtodatail"),
            },
          ],
        },

        // 设计中心
        {
          path: "/index/design",
          name: "DesignIndex",
          component: RouteView,
          children: [
            {
              path: "/design/design",
              name: "DesignIndex",
              component: () => import("../views/Design/DesignIndex"),
            },
            {
              path: "/design/desideta/:id",
              name: "DesiDeta",
              component: () => import("../views/Design/Detail/DesiDeta"),
            },
          ],
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
