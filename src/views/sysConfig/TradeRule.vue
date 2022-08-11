<template>
  <PageWrapper>
    <template #headerContent>
      <Form layout="horizontal" :model="params">
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('routes.sysConfig.tradeRule.name')">
              <Input v-model:value="params.transactionConditionsName" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('common.createDate')">
              <DatePicker.RangePicker
                v-model:value="params.createTime"
                :valueFormat="dateValueFormat"
              />
            </FormItem>
          </Col>
          <Col :span="8">
            <Button type="primary" @click="getRecordList">{{ t('common.queryText') }}</Button>
            <!-- <Button type="primary" @click="handleResetClick">{{ t('common.resetText') }}</Button> -->
            <Button type="primary" @click="handleCreateClick" v-if="pageFn.add">
              {{ t('common.create') }}</Button
            >
          </Col>
        </Row>
      </Form>
    </template>
    <VTableVue
      :total="total"
      :columns="columns"
      :dataSource="records"
      :actionColumnWidth="250"
      :rowSelection="rowSelection"
      :headerPagination="true"
      rowKey="transactionId"
      @page-change="onPageChange"
    >
      <template #actionBodyColumn="{ record }">
        <Button
          class="action-btn"
          type="link"
          @click="handleEditClick(record)"
          v-if="pageFn.edit"
          >{{ t('common.edit') }}</Button
        >
      </template>
      <!-- <template #bodyColumn="{ column, text, record }">
        <template v-if="column.dataIndex === 'transactionRecordNumber'">
          <Button type="link" @click="handleShowTradeCount(record)">{{ text }}</Button>
        </template>
      </template> -->
    </VTableVue>
    <component
      v-if="visibleModal"
      :is="visibleModal"
      :rule="visibleModalRule"
      @hide="visibleModal = undefined"
      @reload="getRecordList"
    />
    <!-- <RecordNoteModal :id="noteModalId" v-model:visible="noteModalVisible" /> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Form, FormItem, Row, Col, Input, Button, DatePicker } from 'ant-design-vue';
  // import type { FormInstance } from 'ant-design-vue';
  import { ref, shallowRef, computed } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { getPagedTradeRuleList } from '/@/api/sysConfig/tradeRule.api';
  import { createUseRecords } from '/@/utils/my/useRecords';
  import VTableVue, { VTableColumnType } from '../trade/VTable.vue';
  import NewTradeRuleModal from './components/NewTradeRuleModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import usePageFn from '/@/utils/my/usePageFn';
  const pageFn = usePageFn();
  const { t } = useI18n();

  // const RadioButton = Radio.Button;
  const dateValueFormat = 'YYYY-MM-DD';
  const columns = computed<VTableColumnType[]>(() => [
    {
      title: t('common.createDate'),
      dataIndex: 'createTime',
      visible: true,
    },
    {
      title: t('routes.sysConfig.tradeRule.name'),
      dataIndex: 'transactionConditionsName',
      visible: true,
    },
    {
      title: t('routes.sysConfig.tradeRule.description'),
      dataIndex: 'transactionConditionsDetail',
      visible: true,
    },
    {
      title: t('common.updater'),
      dataIndex: 'editUserName',
      visible: true,
    },
    {
      title: t('common.updateDate'),
      dataIndex: 'editTime',
      visible: true,
    },
  ]);

  const { total, params, records, getRecords, rowSelection } =
    createUseRecords<TradeRuleItem[]>()(getPagedTradeRuleList);

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
  // const handleToggleUserState = (user: RoleItem) => {
  //   changeUserState(user.roleId, 1 - +user.enable).then(getRecords);
  // };
  const visibleModal = shallowRef<typeof NewTradeRuleModal>();
  const visibleModalRule = ref<TradeRuleItem>();
  const handleEditClick = (user: TradeRuleItem) => {
    visibleModal.value = NewTradeRuleModal;
    visibleModalRule.value = user;
  };
  const handleCreateClick = () => {
    visibleModal.value = NewTradeRuleModal;
    visibleModalRule.value = void 0;
  };
</script>
