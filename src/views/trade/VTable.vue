<template>
  <div class="v-table-wrapper">
    <div class="v-table-header" v-if="$slots.headerFilter || props.headerPagination">
      <slot name="header-filter"><div></div></slot>
      <Pagination
        v-if="props.headerPagination"
        :current="props.currentPage"
        show-quick-jumper
        :total="props.total"
        :showSizeChanger="true"
        :pageSizeOptions="props.pageSizeOptions"
        @change="onPageChange"
      />
    </div>
    <Table
      v-bind="attrs"
      :transformCellText="transformCellText"
      :dataSource="props.dataSource"
      :columns="getColumns"
      :pagination="false"
    >
      <template #headerCell="headerProp">
        <template v-if="headerProp.column.dataIndex === 'action'">
          <span> {{ headerProp.title }} <SettingOutlined @click="handleSettingClick" /> </span>
        </template>
      </template>
      <template #bodyCell="columnProp">
        <slot
          name="actionBodyColumn"
          v-bind="columnProp"
          v-if="columnProp.column.dataIndex === 'action'"
        ></slot>
        <!-- <template >
        </template> -->
        <slot name="bodyColumn" v-bind="columnProp" v-else></slot>
      </template>
    </Table>
    <div class="v-table-footer">
      <slot name="footer-filter"><div></div></slot>
      <Pagination
        :current="props.currentPage"
        show-quick-jumper
        :total="props.total"
        :showSizeChanger="true"
        :pageSizeOptions="props.pageSizeOptions"
        @change="onPageChange"
      />
    </div>
    <Modal
      v-model:visible="visible"
      title="设置列表显示字段"
      @ok="handleOk"
      class="column-select-modal"
    >
      <CheckboxGroup v-model:value="tempSelectedColumns" style="width: 100%">
        <Row>
          <Col v-for="col in props.columns" :key="col.dataIndex" :span="8">
            <Checkbox :value="col.dataIndex">{{ col.title }}</Checkbox>
          </Col>
        </Row>
      </CheckboxGroup>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import { computed, ref, useAttrs, useSlots } from 'vue';
  import { Table, Pagination, Modal, Row, Col, Checkbox, CheckboxGroup } from 'ant-design-vue';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import type { ColumnType } from 'ant-design-vue/lib/table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { TransformCellText } from 'ant-design-vue/lib/vc-table/interface';
  const { t } = useI18n();
  const slots = useSlots();

  const props = defineProps({
    columns: {
      type: Array as PropType<VTableColumnType[]>,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    headerPagination: {
      type: Boolean,
      default: true,
    },
    pageSizeOptions: {
      type: Array as PropType<number[]>,
      default: () => [10, 20, 30, 50, 100],
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    actionColumnWidth: {
      type: Number,
      default: 100,
    },
    transformCellText: {
      type: Function as PropType<TransformCellText<any>>,
      default: ({ text }: any) => {
        // console.log('text', text, Array.isArray(text), column);
        if (Array.isArray(text) && text.length === 0) {
          return '- -';
        }
        return text;
      },
    },
  });

  const emit = defineEmits<{
    (e: 'pageChange', page: number, pageSize: number): void;
  }>();

  const attrs = useAttrs();
  const onPageChange = (page: number, pageSize: number) => {
    emit('pageChange', page, pageSize);
  };
  const selectedColumns = ref<string[]>([]);
  const getColumns = computed(() => {
    const filterFn = selectedColumns.value.length
      ? (column: VTableColumnType) => selectedColumns.value.includes(column.dataIndex)
      : (column: VTableColumnType) => column.visible;
    // console.log('slots', slots.actionBodyColumn);
    if (!slots.actionBodyColumn) {
      return props.columns.filter(filterFn);
    }
    return props.columns.filter(filterFn).concat({
      title: t('common.action'),
      key: 'action',
      dataIndex: 'action',
      width: props.actionColumnWidth,
    });
  });
  const tempSelectedColumns = ref<string[]>([]);
  const visible = ref(false);
  const handleSettingClick = () => {
    tempSelectedColumns.value = selectedColumns.value.length
      ? [...selectedColumns.value]
      : getColumns.value.map((column) => column.dataIndex);
    visible.value = true;
  };
  const handleOk = () => {
    selectedColumns.value = tempSelectedColumns.value;
    visible.value = false;
  };
</script>
<script lang="ts">
  interface VTableColumnType<T extends string = any> extends ColumnType {
    visible?: boolean;
    dataIndex: T;
    key?: T;
  }
  export { VTableColumnType };
</script>

<style lang="less">
  .v-table-wrapper {
    .v-table-header,
    .v-table-footer {
      display: flex;
      justify-content: space-between;
    }

    .v-table-header {
      margin-bottom: 16px;
    }

    .v-table-footer {
      margin-top: 16px;
    }
  }

  .column-select-modal {
    .ant-checkbox-group {
      padding: 30px 20px;
    }

    .ant-col {
      margin-bottom: 12px;
    }
  }
</style>
