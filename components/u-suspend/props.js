/*
 * @Author       : Zdd
 * @Date         : 2022-04-12 11:33:59
 * @LastEditors  : Zdd
 * @LastEditTime : 2022-04-12 14:58:03
 * @FilePath     : /components/u-suspend/props.js
 * @Description  :
 * Copyright 2022 RYS, All Rights Reserved.
 */
export default {
  props: {
    // 需要显示的提示文字
    text: {
      type: [String, Number],
      default: uni.$u.props.tooltip.text,
    },
    // 点击复制按钮时，复制的文本，为空则使用text值
    copyText: {
      type: [String, Number],
      default: uni.$u.props.tooltip.copyText,
    },
    // 文本大小
    size: {
      type: [String, Number],
      default: uni.$u.props.tooltip.size,
    },
    // 字体颜色
    color: {
      type: String,
      default: uni.$u.props.tooltip.color,
    },
    // 三角指示器颜色
    indicatorColor: {
      type: String,
      default: "#060607",
    },
    // 弹出提示框时，文本的背景色
    bgColor: {
      type: String,
      default: uni.$u.props.tooltip.bgColor,
    },
    // 弹出提示的方向，top-上方，bottom-下方
    direction: {
      type: String,
      default: uni.$u.props.tooltip.direction,
    },
    // 弹出提示的z-index，nvue无效
    zIndex: {
      type: [String, Number],
      default: uni.$u.props.tooltip.zIndex,
    },
    // 是否显示复制按钮
    showCopy: {
      type: Boolean,
      default: uni.$u.props.tooltip.showCopy,
    },
    // 扩展的按钮组
    buttons: {
      type: Array,
      default: uni.$u.props.tooltip.buttons,
    },
    // 是否显示透明遮罩以防止触摸穿透
    overlay: {
      type: Boolean,
      default: uni.$u.props.tooltip.overlay,
    },
    // 是否显示
    show: {
      type: Boolean,
      default: false,
    },
  },
};
