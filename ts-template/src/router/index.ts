import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { LoadingBar } from "view-design";

Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  // {
  //   path: "/",
  //   component: () => import("../views/home/TemplateReadme.vue"),
  // },
];
const router = new VueRouter({
  routes,
});
// 处理连续点击同一路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  //   const arr: string[] = ["/useragr"];
  //   if (arr.indexOf(to.path) >= 0) {
  //     const ele: HTMLElement = document.querySelector("body");
  //     if (ele) {
  //       ele.style.backgroundImage = "none";
  //       ele.style.backgroundColor = "#eee";
  //       ele.style.overflow = "auto";
  //     }
  //   }
  next();
});
router.afterEach(() => {
  LoadingBar.finish();
});

export default router;
