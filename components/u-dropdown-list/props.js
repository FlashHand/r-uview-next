/*
 * @Author       : Zdd
 * @Date         : 2022-03-22 09:43:50
 * @LastEditors  : Zdd
 * @LastEditTime : 2022-08-03 18:43:47
 * @FilePath     : /components/u-dropdown-list/props.js
 * @Description  :
 * Copyright 2022 RYS, All Rights Reserved.
 */
export default {
  props: {
    // 绑定的值
    value: {
      type: [String, Number],
      default: "",
    },
    // 选项数据，如果传入了默认slot，此参数无效
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    // 点击遮罩是否可以收起弹窗
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    // 控制操作菜单是否显示
    show: {
      type: Boolean,
      default: false,
    },
    // 控制操作菜单是否显示
    calcNavBar: {
      type: Boolean,
      default: true,
    },
    marginTop: {
      type: [String, Number],
      default: "194rpx",
    },
    // 选中 icon 颜色
    iconColor: {
      type: String,
      default: "#606266",
    },
  },
};
