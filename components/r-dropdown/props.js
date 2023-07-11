/*
 * @Author       : Zdd
 * @Date         : 2022-03-22 09:43:50
 * @LastEditors  : Zdd
 * @LastEditTime : 2022-05-10 17:30:02
 * @FilePath     : /components/r-dropdown/props.js
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
    marginTop: {
      type: [String, Number],
      default: "",
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
  },
};
