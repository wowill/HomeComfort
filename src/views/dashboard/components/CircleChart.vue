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
    total: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => [
        { value: 40, name: '现金管理' },
        { value: 38, name: '固定收益' },
        { value: 32, name: '保险产品' },
        { value: 30, name: '混合策略' },
        { value: 28, name: '权益投资' },
        { value: 26, name: '另类投资' },
      ],
    },
    mapFn: {
      type: Function as PropType<(...args) => any>,
      required: true,
    },
    formatter: {
      type: Function as PropType<(...args) => string>,
      required: true,
    },
  });

  const x = '20%';
  const option = computed<ECBasicOption>(() => {
    return {
      color: ['#37cbcb', '#3ba1ff', '#4fcb74', '#fbd438', '#f04864', '#9860e5'],
      legend: {
        top: 'middle',
        left: '55%',
        orient: 'vertical',
        formatter: props.formatter,
        // formatter(name) {
        //   for (var i = 0; i < props.data.length; i++) {
        //     if (name == props.data[i].name) {
        //       return '{name|' + name + '}{value|333' + 2 + '}{amount|' + 3 + '}';
        //     }
        //   }
        // },
        textStyle: {
          rich: {
            name: {
              width: 55,
              // backgroundColor: 'red',
            },
            value: {
              width: 100,
              align: 'center',
              // backgroundColor: 'rgba(8,8,8,.5)',
            },
            amount: {},
          },
        },
      },
      toolbox: {
        show: false,
      },
      title: [
        {
          text: props.total,
          x: x,
          top: '50%',
          textStyle: {
            color: 'rgba(0,0,0, 0.85)',
            fontSize: 24,
          },
          padding: [5, 10, 5, 0],
          z: 100,
          textAlign: 'center',
        },
        {
          text: props.name,
          x: x,
          top: '40%',
          textStyle: {
            fontSize: '14',
            color: 'rgba(0,0,0, 0.43)',
          },
          z: 100,
          textAlign: 'center',
        },
      ],
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%',
        backgroundColor: 'rgba(47,37,198,0.75)',
        borderColor: '#2880FF',
        borderWidth: 1,
        textStyle: {
          color: '#fff',
        },
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: ['60%', '80%'],
          center: [x, '50%'],
          // roseType: 'area',
          label: { show: false },
          labelLine: { show: false },
          selectedOffset: 30,
          selectedMode: false,
          // itemStyle: {
          //   borderRadius: 8,
          // },
          data: props.data.map(props.mapFn),
        },
      ],
    };
  });
</script>
