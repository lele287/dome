import Vue from "vue";
import { Store } from "vuex";
declare module "vue/types/vue" {
  interface Vue {
    $http: any;
    $store: Store;
    $eventBus: Vue;
  }
}
