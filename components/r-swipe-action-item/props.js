export default {
  props: {
    // 标识符，如果是v-for，可用index索引值
    name: {
      type: [String, Number],
      default: uni.$u.props.swipeActionItem.name,
    },
    // 滑动距离阈值，只有大于此值，才被认为是要打开菜单
    threshold: {
      type: Number,
      default: uni.$u.props.swipeActionItem.threshold,
    },
    translateX: {
      type: Number,
      default: 154,
    },
    // 右侧按钮内容
    options: {
      type: Array,
      default() {
        return uni.$u.props.swipeActionItem.rightOptions;
      },
    },
    // 动画过渡时间，单位ms
    duration: {
      type: [Number],
      default: uni.$u.props.swipeActionItem.duration,
    },
  },
};
