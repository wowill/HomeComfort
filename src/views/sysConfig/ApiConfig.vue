<template>
  <PageWrapper>
    <template #headerContent>
      <Button type="primary" @click="handleBatchSync">{{
        t('routes.sysConfig.api.batchSync')
      }}</Button>
    </template>
    <VTableVue
      :total="total"
      :columns="columns"
      :dataSource="records"
      :actionColumnWidth="250"
      :rowSelection="rowSelection"
      :headerPagination="true"
      rowKey="apiId"
      @page-change="onPageChange"
    >
      <template #actionBodyColumn="{ record }">
        <Button class="action-btn" type="link" @click="handleStartSync(record)">{{
          t('routes.sysConfig.api.syncBtn')
        }}</Button>
        <Button class="action-btn" type="link" @click="handleChangeState(record)">{{
          record.apiStatus === '0'
            ? t('routes.sysConfig.api.enableBtn')
            : t('routes.sysConfig.api.disableBtn')
        }}</Button>
        <Button class="action-btn" type="link" @click="handleViewLog(record)">{{
          t('routes.sysConfig.api.viewLogBtn')
        }}</Button>
      </template>
      <!-- <template #bodyColumn="{ column, text, record }">
        <template v-if="column.dataIndex === 'transactionRecordNumber'">
          <Button type="link" @click="handleShowTradeCount(record)">{{ text }}</Button>
        </template>
      </template> -->
    </VTableVue>
    <ApiSyncLogModal
      v-if="modalVisible"
      :api="visibleModalApi"
      @hide="modalVisible = false"
      @reload="getRecordList"
    />
    <ApiSyncStateModal :requestId="requestId" @hide="requestId = ''" @reload="getRecordList" />
    <!-- <RecordNoteModal :id="noteModalId" v-model:visible="noteModalVisible" /> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  // import type { FormInstance } from 'ant-design-vue';
  import { ref, shallowRef, computed } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import {
    getApiConfigList,
    changeApiState,
    startApiSync,
    batchApiSync,
  } from '/@/api/sysConfig/apiConfig.api';
  import { createUseRecords } from '/@/utils/my/useRecords';
  import VTableVue, { VTableColumnType } from '../trade/VTable.vue';
  import ApiSyncLogModal from './components/ApiSyncLogModal.vue';
  import ApiSyncStateModal from './components/ApiSyncStateModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  // import usePageFn from '/@/utils/my/usePageFn';
  // const pageFn = usePageFn();
  const { t } = useI18n();

  // const RadioButton = Radio.Button;
  // const dateValueFormat = 'YYYY-MM-DD';
  const columns = computed<VTableColumnType[]>(() => [
    {
      title: t('routes.sysConfig.api.apiName'),
      dataIndex: 'apiName',
      visible: true,
    },
    {
      title: t('routes.sysConfig.api.apiState'),
      dataIndex: 'apiStatusName',
      visible: true,
    },
    {
      title: t('routes.sysConfig.api.lastSyncTime'),
      dataIndex: 'lastSyncTime',
      visible: true,
    },
  ]);

  const { total, params, records, getRecords, rowSelection, checkedRowKeys } =
    createUseRecords<TradeRuleItem[]>()(getApiConfigList);

  getRecords();

  const getRecordList = () => {
    getRecords();
  };

  const onPageChange = (page: number, pageSize: number) => {
    params.value.page = page;
    params.value.limit = pageSize;
    getRecords();
  };

  // const headerFormRef = ref<FormInstance>() as Ref<FormInstance>;
  // const handleResetClick = () => {
  //   headerFormRef.value.resetFields();
  // };
  const handleChangeState = (api: ApiConfigItem) => {
    changeApiState(api.apiId, 1 - +api.apiStatus).then(getRecords);
  };

  const handleBatchSync = () => {
    if (checkedRowKeys.value.length === 0) {
      return;
    }
    batchApiSync(checkedRowKeys.value as number[]).then((res) => {
      console.log('requestId 3', res);
      requestId.value = res;
    });
  };
  const requestId = ref('');
  const handleStartSync = (api: ApiConfigItem) => {
    startApiSync(api.apiId).then((res) => {
      console.log('requestId 3', res);
      requestId.value = res;
    });
  };
  const modalVisible = shallowRef<boolean>(false);
  const visibleModalApi = ref<ApiConfigItem>({} as ApiConfigItem);
  const handleViewLog = (api: ApiConfigItem) => {
    console.log(api);
    modalVisible.value = true;
    visibleModalApi.value = api;
  };
</script>
