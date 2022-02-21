import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ViewUI from "view-design";
import axiosPlugin from "./api/request";
import "view-design/dist/styles/iview.css";
import "./style/index.less";
const eventBus = new Vue();
// Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.prototype.$eventBus = eventBus;
Vue.prototype.$http = axiosPlugin;
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
