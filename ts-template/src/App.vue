<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import INIT_API from "@/api/init";
@Component({
  name: "App",
  components: {},
})
export default class App extends Vue {
  mounted(): void {
    INIT_API.queryRegion(34).then((res) => {
      // console.log(res);
    });
  }
}
</script>

<style lang="less"></style>
