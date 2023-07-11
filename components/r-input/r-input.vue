<template>
  <view>
    <!-- input -->
    <template v-if="type !== 'textarea'">
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
    <!-- textarea -->
    <template v-else>
      <uvTextarea
        :value="value"
        :placeholder="placeholder"
        :height="height"
        :confirmType="confirmType"
        :disabled="disabled"
        :count="count"
        :focus="focus"
        :autoHeight="autoHeight"
        :fixed="fixed"
        :cursorSpacing="cursorSpacing"
        :cursor="cursor"
        :showConfirmBar="showConfirmBar"
        :selectionStart="selectionStart"
        :selectionEnd="selectionEnd"
        :adjustPosition="adjustPosition"
        :placeholderStyle="placeholderStyle"
        :disableDefaultPadding="disableDefaultPadding"
        :holdKeyboard="holdKeyboard"
        :maxlength="textareaMaxlength"
        :customStyle="textareaCustomStyle"
        :formatter="formatter"
        :border="border"
        @focus="(e) => $emit('focus')"
        @blur="(e) => $emit('blur')"
        @linechange="(e) => $emit('linechange', e)"
        @confirm="(e) => $emit('confirm')"
        @input="(e) => $emit('input', e)"
        @keyboardheightchange="(e) => $emit('keyboardheightchange')"
      ></uvTextarea>
    </template>
  </view>
</template>

<script>
import uvInput from "../u-input/u-input.vue";
import props from "../u-input/props.js";
import uvTextarea from "../u-textarea/u-textarea.vue";
import textareaProps from "../u-textarea/props.js";

export default {
  name: "u-input",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, props, textareaProps],
  components: {
    uvInput,
    uvTextarea,
  },
  computed: {
    textareaMaxlength() {
      console.log(this.count, this.maxlength);
      return this.count ? this.maxlength : -1;
    },
    // 输入框的样式
    textareaCustomStyle() {
      const style = {
        color: this.color,
        // #ifdef MP-ALIPAY
        paddingLeft: "5px",
        // #endif
        fontSize: uni.$u.addUnit(this.fontSize),
      };
      return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle));
    },
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
