<!-- @format -->

<template>
  <div class="wr-base-modal-containter">
    <Modal
      v-model="showModal"
      :width="width"
      :height="height"
      :title="title"
      :ok-text="_okText"
      :cancel-text="_cancelText"
      @on-ok="ok"
      @on-cancel="cancel"
      @on-visible-change="onVisibleChange"
      :mask-closable="maskClosable"
      :mask="mask"
      :class-name="_className"
      :transfer="transfer"
      :footer-hide="noFooter"
    >
      <p slot="header" class="se-modal-header" style="color: #fff">
        <i v-if="icon" ref="iconRef" class="iconfont"></i>
        {{ title }}
      </p>
      <a slot="close">
        <slot name="close">
          <i class="ivu-icon ivu-icon-ios-close"></i>
        </slot>
      </a>
      <slot></slot>
      <div v-if="noFooter" slot="footer" class="se-modal-line"></div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
@Component({ name: "BaseModal" })
export default class BaseModal extends Vue {
  @Prop({ default: false, type: Boolean }) private visible!: boolean;
  @Prop() private width!: boolean | string;
  @Prop({ default: "200", type: String || Number }) private height!: boolean;
  @Prop({ default: "", type: String }) private title!: string;
  @Prop({ default: false, type: Boolean }) private maskClosable!: boolean;
  @Prop({ default: false, type: Boolean }) private mask!: boolean;
  @Prop({ default: "确认", type: String }) private okText!: string;
  @Prop({ default: "取消", type: String }) private cancelText!: string;
  @Prop({ default: false, type: Boolean }) private noFooter!: boolean;
  @Prop({ default: "", type: String }) private className!: string;
  @Prop({ default: "", type: String }) private icon!: string;
  @Prop({ default: false, type: Boolean }) private transfer!: boolean;

  @Ref() private iconRef!: HTMLElement;
  updated(): void {
    if (this.icon) {
      this.iconRef.innerHTML = this.icon; // 每次更新时调用，这样图标才能保持更新
    }
  }
  get showModal(): boolean {
    return this.visible;
  }

  set showModal(v: boolean) {
    // this.visible = v;
  }
  get _okText(): string {
    return this.okText || "确定";
  }
  get _cancelText(): string {
    return this.cancelText || "取消";
  }
  get _className(): string {
    let className =
      ` ${this.className} vertical-center-modal` || "vertical-center-modal";
    if (this.noFooter) {
      className += " noFooter";
    }
    return className;
  }

  ok(): void {
    this.$emit("on-ok");
  }
  cancel(): void {
    this.$emit("on-cancel");
  }
  onVisibleChange(value: boolean): boolean {
    return value;
  }
}
</script>

<style lang="less"></style>
