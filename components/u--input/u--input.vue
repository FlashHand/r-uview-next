<!--
 * @Author       : Zdd
 * @Date         : 2022-03-14 09:41:04
 * @LastEditors  : Zdd
 * @LastEditTime : 2022-05-05 14:47:51
 * @FilePath     : /components/u--input/u--input.vue
 * @Description  : 
 * Copyright 2022 RYS, All Rights Reserved. 
-->
<template>
  <uvInput
    :value="value"
    :type="type"
    :fixed="fixed"
    :disabled="disabled"
    :disabledColor="disabledColor"
    :clearable="clearable"
    :password="password"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :placeholderClass="placeholderClass"
    :placeholderStyle="placeholderStyle"
    :showWordLimit="showWordLimit"
    :confirmType="confirmType"
    :confirmHold="confirmHold"
    :holdKeyboard="holdKeyboard"
    :focus="focus"
    :autoBlur="autoBlur"
    :disableDefaultPadding="disableDefaultPadding"
    :cursor="cursor"
    :cursorSpacing="cursorSpacing"
    :selectionStart="selectionStart"
    :selectionEnd="selectionEnd"
    :adjustPosition="adjustPosition"
    :inputAlign="inputAlign"
    :fontSize="fontSize"
    :color="color"
    :prefixIcon="prefixIcon"
    :suffixIcon="suffixIcon"
    :suffixIconStyle="suffixIconStyle"
    :prefixIconStyle="prefixIconStyle"
    :border="border"
    :readonly="readonly"
    :shape="shape"
    :customStyle="customStyle"
    :formatter="formatter"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @keyboardheightchange="$emit('keyboardheightchange')"
    @change="handleChange"
    @input="(e) => $emit('input', e)"
    @confirm="(e) => $emit('confirm', e)"
    @clear="$emit('clear')"
    @click="$emit('click')"
  >
    <!-- #ifndef VUE3 -->
    <!-- #ifdef MP -->
    <slot name="prefix"></slot>
    <slot name="suffix"></slot>
    <!-- #endif -->
    <!-- #ifndef MP -->
    <slot name="prefix" slot="prefix"></slot>
    <slot name="suffix" slot="suffix"></slot>
    <!-- #endif -->
    <!-- #endif -->
    <!-- #ifdef VUE3 -->
    <template v-slot:prefix>
      <slot name="prefix" slot="prefix"></slot>
    </template>
    <template v-slot:suffix>
      <slot name="suffix" slot="suffix"></slot>
    </template>
    <!-- #endif -->
  </uvInput>
</template>

<script>
/**
 * 此组件存在的理由是，在nvue下，u-input被uni-app官方占用了，u-input在nvue中相当于input组件
 * 所以在nvue下，取名为u--input，内部其实还是u-input.vue，只不过做一层中转
 */
import uvInput from "../u-input/u-input.vue";
import props from "../u-input/props.js";
export default {
  name: "u--input",
  mixins: [uni.$u.mpMixin, props, uni.$u.mixin],
  components: {
    uvInput,
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e);
      // #ifdef VUE3
      this.$emit("update:value", e);
      // #endif
    },
  },
};
</script>
