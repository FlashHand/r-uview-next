<template>
  <view class="u-swipe-action-item" ref="u-swipe-action-item">
    <view class="u-swipe-action-item__right" v-if="show">
      <slot name="button">
        <view
          v-for="(item, index) in options"
          :key="index"
          class="u-swipe-action-item__right__button"
          :ref="`u-swipe-action-item__right__button-${index}`"
          :style="[
            {
              alignItems:
                item.style && item.style.borderRadius ? 'center' : 'stretch',
            },
          ]"
          @tap="buttonClickHandler(item, index)"
        >
          <view
            class="u-swipe-action-item__right__button__wrapper"
            :style="[
              {
                backgroundColor:
                  item.style && item.style.backgroundColor
                    ? item.style.backgroundColor
                    : '#C7C6CD',
                borderRadius:
                  item.style && item.style.borderRadius
                    ? item.style.borderRadius
                    : '0',
                padding: item.style && item.style.borderRadius ? '0' : '0 15px',
              },
              item.style,
            ]"
          >
            <u-icon
              v-if="item.icon"
              :name="item.icon"
              :color="
                item.style && item.style.color ? item.style.color : '#ffffff'
              "
              :size="
                item.iconSize
                  ? $u.addUnit(item.iconSize)
                  : item.style && item.style.fontSize
                  ? $u.getPx(item.style.fontSize) * 1.2
                  : 17
              "
              :customStyle="{
                marginRight: item.text ? '2px' : 0,
              }"
            ></u-icon>
            <text
              v-if="item.text"
              class="u-swipe-action-item__right__button__wrapper__text u-line-1"
              :style="[
                {
                  color:
                    item.style && item.style.color
                      ? item.style.color
                      : '#ffffff',
                  fontSize:
                    item.style && item.style.fontSize
                      ? item.style.fontSize
                      : '16px',
                  lineHeight:
                    item.style && item.style.fontSize
                      ? item.style.fontSize
                      : '16px',
                },
              ]"
              >{{ item.text }}</text
            >
          </view>
        </view>
      </slot>
    </view>
    <view
      class="u-swipe-action-item__content"
      @touchstart="currentTouchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      :size="size"
      :change:size="sizeChange"
      :style="`transition: transform ${duration}ms ease 0s; transform: translateX(-${
        show ? translateX : 0
      }rpx)`"
    >
      <slot />
    </view>
  </view>
</template>
<script>
import touch from "../../libs/mixin/touch.js";
import props from "./props.js";

/**
 * SwipeActionItem 滑动单元格子组件
 * @description 该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作
 * @tutorial https://www.uviewui.com/components/swipeAction.html
 * @property { Number}	translateX
 * @property {String | Number}	index			标识符，如果是v-for，可用index索引
 * @property {Number}			threshold		滑动距离阈值，只有大于此值，才被认为是要打开菜单（默认 30 ）
 * @property {Array}			options			右侧按钮内容
 * @property {String | Number}	duration		动画过渡时间，单位ms（默认 350 ）
 * @event {Function(index)}	open	组件打开时触发
 * @event {Function(index)}	close	组件关闭时触发
 * @example	<u-swipe-action><u-swipe-action-item :options="options1" ></u-swipe-action-item></u-swipe-action>
 */
export default {
  name: "r-swipe-action-item",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, props, touch],
  data() {
    return {
      show: false,
    };
  },
  created() {
    // 此方法在mixin中
    this.getParentData("r-swipe-action");
  },
  methods: {
    // 关闭时执行
    closeHandler() {
      this.show = false;
    },
    closeOther() {
      // 尝试关闭其他打开的单元格
      this.parent && this.parent.closeOther(this);
    },
    // 按钮被点击
    buttonClickHandler(item, index) {
      this.$emit("click", {
        index,
        name: this.name,
      });
    },
    currentTouchStart(e) {
      this.closeOther();
      this.touchStart(e);
    },
    // 触摸结束
    touchEnd() {
      if (this.deltaX < -this.threshold && !this.show) {
        this.show = true;
      }
      if (this.deltaX > this.threshold && this.show) {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

.u-swipe-action-item {
  position: relative;
  overflow: hidden;

  &__content {
    background-color: #ffffff;
  }

  &__right {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    @include flex;

    &__button {
      @include flex;
      justify-content: center;
      overflow: hidden;
      align-items: center;

      &__wrapper {
        @include flex;
        align-items: center;
        justify-content: center;
        padding: 0 15px;

        &__text {
          @include flex;
          align-items: center;
          color: #ffffff;
          font-size: 15px;
          text-align: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
