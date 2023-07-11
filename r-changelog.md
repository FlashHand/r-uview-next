<!--
 * @Author       : Zdd
 * @Date         : 2022-03-21 10:21:09
 * @LastEditors  : Zdd
 * @LastEditTime : 2022-03-29 17:19:05
 * @FilePath     : /r-changelog.md
 * @Description  :
 * Copyright 2022 RYS, All Rights Reserved.
-->

```
3.0.0-uview-2.0.28
- 3.0.0 r-uview-next 版本号
- uview-2.0.28 uview 版本号
```

## 3.0.2-uview-2.0.28（2022 年 3 月 21 日）

### u-sticky 调整优化，新增 r-tag 标签，u-drowdown-list 调整优化，u--input bug 修复

### u-tooltip 兼容 vue3，u-calendar month 组件懒加载优化卡顿，u-modal title 样式调整，r-virtual-scroll 增加虚拟滚动组件

### feat

1. 增加 u-sticky 监听(watch) customNavHeight
2. 新增 r-tag 标签，适用 rys 自定义 tag
3. u-drowdown-list 调整优化，通过 slot 传组件；自动计算 top

### fix

1. u--input 在 vue3 下 v-model bug

## 3.0.1-uview-2.0.28（2022 年 3 月 21 日）

### u-tabbar 、u-textarea 调整优化

### feat

1. 增加 u-tabbar 是否显示上方阴影选项
2. 增加 u-tabbar 可自定义高度

### fix

1. 修复 u-textarea 配置 autoHeight 高度异常
2. 优化 u-textarea 配置 count u-textarea\_\_count 组件显示

## 3.0.0-uview-2.0.28（2022 年 3 月 16 日）

### vue 版本适配 vue2、vue3，平台适配 H5 和微信小程序

1. `./libs/css/common.scss` 增加公共 css class
2. 兼容小程序，`./libs/css/mp.scss` 增加特定样式代码
3. export 导出方式优化 `./libs/utils/day.js`
4. v-for 在 <template> 标签使用报错
5. index.js 增加 vue3 兼容代码
