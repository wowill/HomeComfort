<template>
  <PageWrapper>
    <template #headerContent>
      <Button type="primary" @click="handleAddClick" v-if="pageFn.add">
        {{ t('common.create', { name: t('routes.broker.rule.name') }) }}
      </Button>
    </template>
    <VTableVue
      :total="total"
      :columns="columns"
      :dataSource="dataSource"
      :rowSelection="rowSelection"
      :actionColumnWidth="125"
      @page-change="onPageChange"
    >
      <template #actionBodyColumn="{ record }" v-if="pageFn.edit || pageFn.enable">
        <Button
          class="action-btn"
          type="link"
          @click="handleEditClick(record)"
          v-if="pageFn.edit"
          >{{ t('common.edit') }}</Button
        >
        <Button
          class="action-btn"
          type="link"
          @click="handleToggleDisableClick(record)"
          v-if="pageFn.enable"
        >
          {{ record.enable ? t('common.disableText') : t('common.enableText') }}
        </Button>
      </template>
      <template #bodyColumn="{ column, text }">
        <template v-if="column.dataIndex === 'enable'">
          {{ text ? t('common.enableText') : t('common.disableText') }}
        </template>
      </template>
    </VTableVue>
    <NewCommissionRule
      v-if="newModalVisible"
      :rule="newModalRule"
      @hide="newModalVisible = false"
      @reload="getRecords()"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Button } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import VTableVue, { VTableColumnType } from '../trade/VTable.vue';
  import { createUseRecords } from '/@/utils/my/useRecords';
  import { getPagedCommissionRuleList, toggleCommissionRuleStatus } from '/@/api/broker/';
  import NewCommissionRule from './components/NewCommissionRule.vue';
  import usePageFn from '/@/utils/my/usePageFn';
  const pageFn = usePageFn();
  const { t } = useI18n();

  const columns = computed<VTableColumnType<keyof CommissionRuleItem>[]>(() => [
    {
      title: 'ID',
      dataIndex: 'commissionRuleId',
      visible: true,
      width: '100px',
    },
    {
      title: t('routes.broker.rule.ruleName'),
      dataIndex: 'commissionRuleName',
      visible: true,
      width: '100px',
    },
    {
      title: t('routes.broker.rule.ruleType'),
      dataIndex: 'commissionRuleTypeName',
      visible: true,
    },
    {
      title: t('routes.broker.rule.ruleState'),
      dataIndex: 'enable',
      visible: true,
    },
    {
      title: t('routes.broker.rule.creator'),
      dataIndex: 'createUserName',
      visible: true,
    },
    {
      title: t('routes.broker.rule.createTime'),
      dataIndex: 'createTime',
      visible: true,
      minWidth: 150,
      // width: 150,
    },
    {
      title: t('routes.broker.rule.modifier'),
      dataIndex: 'editeUserName',
      visible: true,
    },
    {
      title: t('routes.broker.rule.modifyTime'),
      dataIndex: 'editTime',
      visible: true,
    },
  ]);

  const {
    total,
    params: formState,
    records: dataSource,
    getRecords,
    rowSelection,
    // checkedRowKeys,
  } = createUseRecords<BrokerItem[]>()(getPagedCommissionRuleList);
  getRecords();

  const onPageChange = (page: number, pageSize: number) => {
    formState.value.page = page;
    formState.value.limit = pageSize;
    getRecords();
  };

  const newModalVisible = ref(false);
  const newModalRule = ref<CommissionRuleItem>();
  const handleAddClick = () => {
    newModalVisible.value = true;
    newModalRule.value = void 0;
  };
  const handleEditClick = (rowData: CommissionRuleItem) => {
    newModalVisible.value = true;
    newModalRule.value = rowData;
  };
  const handleToggleDisableClick = (rowData: CommissionRuleItem) => {
    toggleCommissionRuleStatus(rowData.commissionRuleId).then(() => {
      getRecords();
    });
  };
</script>
