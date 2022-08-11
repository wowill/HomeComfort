<template>
  <Select v-bind="$attrs" v-model:value="transformedValue">
    <slot></slot>
  </Select>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Select } from 'ant-design-vue';
  const props = defineProps({
    value: {
      type: Boolean,
    },
    trueValue: {
      type: Number,
      default: 1,
    },
    falseValue: {
      type: Number,
      default: 0,
    },
  });
  const emit = defineEmits<{
    (e: 'update:value', value: boolean): void;
  }>();

  const transformedValue = computed<number | string>({
    get() {
      if (props.value === true) {
        return props.trueValue;
      }
      if (props.value === false) {
        return props.falseValue;
      }
      return '';
    },
    set(val) {
      emit('update:value', val === props.trueValue);
    },
  });
</script>
