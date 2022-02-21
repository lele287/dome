<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "App",
  components: {},
})
export default class App extends Vue {
  // mounted(): void {}
}
</script>

<style lang="less"></style>
