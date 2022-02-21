import Vue from "vue";
import Vuex from "vuex";

import { IState } from "../types";

// import * as localUtil from "../utils/local_util";
import mutations from "./mutations";

Vue.use(Vuex);
const state: IState = {
  accessToken: "",
};

export default new Vuex.Store({
  state,
  mutations,
  actions: {},
  modules: {},
  getters: {},
});
