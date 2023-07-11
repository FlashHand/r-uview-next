<!--
 * @Author       : Zdd
 * @Date         : 2022-03-29 09:54:04
 * @LastEditors  : Zdd
 * @LastEditTime : 2022-03-29 10:50:09
 * @FilePath     : /components/r-virtual-scroll/r-virtual-scroll.vue
 * @Description  : 
 * Copyright 2022 RYS, All Rights Reserved. 
-->
<template>
  <div class="wrapper" ref="wrapper" @scroll="onScroll">
    <div class="background" :style="{ height: `${total_height}px` }"></div>
    <div class="list" ref="container">
      <div v-for="item in runList" :key="item">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * virtual-scroll 虚拟滚动
 * @description 为了解决长列表造成的渲染压力,业界出现了相应的应对技术,即长列表的虚拟滚动
 * @description TODO: scrolltoupper、scrolltolower、scrollIntoView、scrollTop
 * @tutorial https://www.uviewui.com/components/virtual-scroll.html
 * @property {Number}	cache_screens		缓冲的屏幕数量
 * @property {Array}	originList	原始数据
 * @property {item => Number}	getHeight	根据 item 返回这列高度
 * @example <r-virtual-scroll></r-virtual-scroll>
 */
export default {
  props: {
    cache_screens: {
      // 缓冲的屏幕数量
      type: Number,
      default: 1,
    },
    originList: {
      // 原始数据
      type: Array,
      default: [],
    },
    getHeight: {
      // 根据 item 返回这列高度
      type: Function,
    },
  },
  data() {
    return {
      list: [], // 源数据
      runList: [], // 运行时的列表
      total_height: 0, // 列表总高度
      maxNum: 0, // 一屏幕容纳的最大数量
      distance: 0, // 存储滚动的距离
    };
  },
  mounted() {
    this.genData();
    this.init();
    this.getRunData();
  },
  methods: {
    init() {
      const containerHeight = parseInt(
        getComputedStyle(this.$refs.wrapper).height,
      );
      //一屏的最大数量
      this.maxNum = Math.ceil(containerHeight / this.min_height);
      console.log(`maxNum:${this.maxNum}`, containerHeight, this.min_height);
    },
    onScroll(e) {
      if (this.ticking) {
        return;
      }
      this.ticking = true;
      requestAnimationFrame(() => {
        this.ticking = false;
      });
      const distance = e.target.scrollTop;
      this.distance = distance;
      this.getRunData(distance);
    },
    //二分法计算起始索引
    getStartIndex(scrollTop) {
      let start = 0,
        end = this.list.length - 1;
      while (start < end) {
        const mid = Math.floor((start + end) / 2);
        const { top, height } = this.list[mid];
        if (scrollTop >= top && scrollTop < top + height) {
          start = mid;
          break;
        } else if (scrollTop >= top + height) {
          start = mid + 1;
        } else if (scrollTop < top) {
          end = mid - 1;
        }
      }
      return start;
    },
    getRunData(distance = null) {
      //滚动的总距离
      const scrollTop = distance ? distance : this.$refs.container.scrollTop;

      //在哪个范围内不执行滚动
      if (this.scroll_scale) {
        if (
          scrollTop > this.scroll_scale[0] &&
          scrollTop < this.scroll_scale[1]
        ) {
          return;
        }
      }

      //起始索引
      let start_index = this.getStartIndex(scrollTop);
      start_index = start_index < 0 ? 0 : start_index;

      //上屏索引
      let upper_start_index = start_index - this.maxNum * this.cache_screens;
      upper_start_index = upper_start_index < 0 ? 0 : upper_start_index;

      // 调整offset
      this.$refs.container.style.transform = `translate3d(0,${this.list[upper_start_index].top}px,0)`;

      //中间屏幕的元素
      const mid_list = this.list.slice(start_index, start_index + this.maxNum);

      // 上屏
      const upper_list = this.list.slice(upper_start_index, start_index);

      // 下屏元素
      let down_start_index = start_index + this.maxNum;

      down_start_index =
        down_start_index > this.list.length - 1
          ? this.list.length
          : down_start_index;

      this.scroll_scale = [
        this.list[Math.floor(upper_start_index + this.maxNum / 2)].top,
        this.list[Math.ceil(start_index + this.maxNum / 2)].top,
      ];

      const down_list = this.list.slice(
        down_start_index,
        down_start_index + this.maxNum * this.cache_screens,
      );

      this.runList = [...upper_list, ...mid_list, ...down_list];
    },
    //生成数据
    genData() {
      let total_height = 0;
      let min_height = 50;
      const list = this.originList.map((data, index) => {
        const height = this.getHeight(data);
        min_height = min_height > height ? height : min_height;
        const ob = {
          index,
          height,
          top: total_height,
          data,
        };
        total_height += height;
        return ob;
      });
      this.total_height = total_height; //  列表总高度
      this.list = list;
      this.min_height = min_height; // 最小高度是50
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-y: scroll;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  .list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
