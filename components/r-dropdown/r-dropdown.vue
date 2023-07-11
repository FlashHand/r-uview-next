<!--
 * @Author       : Zdd
 * @Date         : 2022-05-10 17:19:55
 * @LastEditors  : Zdd
 * @LastEditTime : 2022-05-11 11:42:55
 * @FilePath     : /components/r-dropdown/r-dropdown.vue
 * @Description  : 
 * Copyright 2022 RYS, All Rights Reserved. 
-->
<template>
  <view>
    <view>
      <slot />
    </view>
    <u-overlay
      :customStyle="{ top: overlayTop }"
      :show="show"
      :closeOnClickOverlay="closeOnClickOverlay"
      @click="overlayClick"
    >
      <slot name="content" />
    </u-overlay>
  </view>
</template>

<script>
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin("dom");
// #endif
import props from "./props.js";

/**
 * dropdown-list
 * @description 跟随目标组件弹出一个带遮罩层的操作菜单，供用户选择并返回结果。
 * @tutorial https://xxx/dropdown-list.html 【暂无】
 * @property {Boolean} 			closeOnClickOverlay			点击遮罩是否可以收起弹窗（默认 true ）
 * @property {Boolean} 	  	show			控制操作菜单是否显示（默认 false ）
 * @property {Boolean} 	  	calcNavBar			高度是否导航栏计算（默认 false ）
 * @property {String|number}		  	marginTop			距离顶部值
 *
 * @example <r-dropdown v-model:show="show"></r-dropdown>
 */
export default {
  name: "r-dropdown",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, props],
  data() {
    return {
      overlayTop: "",
    };
  },
  mounted() {
    this.getElRect();
  },
  methods: {
    overlayClick() {
      if (this.closeOnClickOverlay) {
        this.$emit("update:show", false);
      }
    },
    // 元素尺寸
    getElRect() {
      const { statusBarHeight: _statusBarHeight } = this.$u.sys();
      const statusBarHeight = _statusBarHeight || 0;
      const showNavBar = this.$u.showNavBar();
      const titleBarHeight = showNavBar
        ? this.$u.os() === "ios"
          ? 44
          : 48
        : 0;
      const navBarH = titleBarHeight + statusBarHeight;
      const marginTop = uni.$u.addUnit(this.marginTop);
      const top = (this.calcNavBar ? navBarH : 0) + "px";
      this.overlayTop = `calc(${marginTop} + ${top})`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";
</style>
