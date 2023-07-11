<template>
  <view class="u-calendar-header u-border-bottom">
    <text class="u-calendar-header__title" v-if="showTitle">{{ title }}</text>
    <view
      v-if="shortcuts && shortcuts.length > 0"
      class="u-calendar-header__type u-flex u-p-x-32"
    >
      <u-button
        v-for="(item, index) in shortcuts"
        :customStyle="customStyle(index)"
        :text="item.text"
        :key="index + 'shortcuts-button'"
        @click="shortcutSelect(index)"
      ></u-button>
    </view>
    <text class="u-calendar-header__subtitle" v-if="showSubtitle">{{
      subtitle
    }}</text>
    <view class="u-calendar-header__weekdays">
      <text class="u-calendar-header__weekdays__weekday">一</text>
      <text class="u-calendar-header__weekdays__weekday">二</text>
      <text class="u-calendar-header__weekdays__weekday">三</text>
      <text class="u-calendar-header__weekdays__weekday">四</text>
      <text class="u-calendar-header__weekdays__weekday">五</text>
      <text class="u-calendar-header__weekdays__weekday">六</text>
      <text class="u-calendar-header__weekdays__weekday">日</text>
    </view>
  </view>
</template>

<script>
import calendar from "../../libs/util/calendar";
export default {
  name: "u-calendar-header",
  mixins: [uni.$u.mpMixin, uni.$u.mixin],
  props: {
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 副标题
    subtitle: {
      type: String,
      default: "",
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true,
    },
    // 是否显示副标题
    showSubtitle: {
      type: Boolean,
      default: true,
    },
    // 配置快捷选项
    shortcuts: {
      type: Array,
      default: uni.$u.props.calendar.customList,
    },
  },
  data() {
    return {
      color: uni.$u.color,
      selectShortcut: -1, // 选择时间区间类型，1：近一周，2近一个月，3近三个月
    };
  },
  methods: {
    customStyle(index) {
      const style = {
        width: "218rpx",
        height: "64rpx",
        borderRadius: "44rpx",
        border: "none",
      };
      if (this.selectShortcut === index)
        return {
          ...style,
          color: " #ffffff",
          backgroundColor: this.color.primary,
        };
      return { ...style, backgroundColor: this.color.backgroundColor };
    },
    // 重置选择类型
    resetSelectTimeType() {
      this.selectShortcut = -1;
    },
    shortcutSelect(index) {
      this.selectShortcut = index;
      this.$emit("changedSelectTimeType", index);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

.u-calendar-header {
  padding-bottom: 4px;

  &__title {
    font-size: 16px;
    color: $u-main-color;
    text-align: center;
    height: 42px;
    line-height: 42px;
    font-weight: bold;
  }

  &__type {
    flex-direction: row;
    justify-content: space-between;
  }

  &__subtitle {
    font-size: 14px;
    color: $u-main-color;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
  }

  &__weekdays {
    @include flex;
    justify-content: space-between;

    &__weekday {
      font-size: 13px;
      color: $u-main-color;
      line-height: 30px;
      flex: 1;
      text-align: center;
    }
  }
}
</style>
