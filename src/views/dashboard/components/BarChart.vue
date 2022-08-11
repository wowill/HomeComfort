<template>
  <ECharts class="chart" :option="option" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { PropType } from 'vue';
  import ECharts from 'vue-echarts';
  // import { use } from "echarts/core"
  // import * as echarts from 'echarts';
  import 'echarts';

  import type { ECBasicOption } from 'echarts/types/dist/shared';

  const props = defineProps({
    name: {
      type: String,
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    // mapFn: {
    //   type: Function as PropType<(...args) => any>,
    //   required: true,
    // },
    // formatter: {
    //   type: Function as PropType<(...args) => string>,
    //   required: true,
    // },
  });

  const option = computed<ECBasicOption>(() => {
    return {
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: props.data.map((i) => i.yearMonth),
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      series: [
        {
          data: props.data.map((i) => i.addNumber),
          type: 'bar',
          itemStyle: {
            color: '#1890ffd8',
          },
          label: {
            show: true,
            position: 'top',
          },
        },
      ],
    };
  });
</script>
