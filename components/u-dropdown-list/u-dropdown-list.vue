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
      <u-cell-group :border="false">
        <view style="background-color: white">
          <view
            v-for="(item, index) in options"
            :key="index"
            class="u-p-y-20 u-p-r-32 u-border-bottom"
            style="
              margin-left: 32rpx;
              padding-left: 0;
              display: flex;
              flex-direction: row;
            "
            @click="changedSelected(item)"
          >
            <view style="flex: 1">{{ item.name }}</view>
            <u-icon
              name="checkbox-mark"
              v-if="item.value === value"
              :color="iconColor"
            ></u-icon>
          </view>
        </view>
      </u-cell-group>
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
 * @property {String}		  	value			绑定的值
 * @property {String}		  	iconColor			选中 icon 颜色
 * @property {{ name: string, value: string|number }[]}	options			选项数据，如果传入了默认slot，此参数无效
 *
 * @event {Function} change 绑定的值发生变化时触发
 * @event {Function} overlayClick 点击遮罩时触发
 *
 * @example <dropdown-list :show="show" v-model="status"></dropdown-list>
 * @example [vue3] <dropdown-list :show="show" v-model:value="status"></dropdown-list>
 */
export default {
  name: "u-dropdown-list",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, props],
  data() {
    return {
      overlayTop: "",
      animationData: {},
    };
  },
  mounted() {
    this.getElRect();
  },
  methods: {
    async setContentAnimate(height) {
      this.animating = true;
      // #ifdef APP-NVUE
      const ref = this.$refs["animation"].ref;
      animation.transition(
        ref,
        {
          styles: {
            height: uni.$u.addUnit(height),
          },
          duration: this.duration,
          timingFunction: "ease-in-out",
        },
        () => {
          this.animating = false;
        },
      );
      // #endif

      // #ifndef APP-NVUE
      const animation = uni.createAnimation({
        timingFunction: "ease-in-out",
      });
      animation
        .height(height)
        .step({
          duration: this.duration,
        })
        .step();
      // 导出动画数据给面板的animationData值
      this.animationData = animation.export();
      // 标识动画结束
      uni.$u.sleep(this.duration).then(() => {
        this.animating = false;
      });
      // #endif
    },
    overlayClick() {
      this.$emit("overlayClick");
      this.setContentAnimate(0);
    },
    changedSelected(item) {
      this.$emit("change", item.value);
      // #ifdef VUE3
      this.$emit("update:value", item.value);
      // #endif
    },
    // 元素尺寸
    async getElRect() {
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
