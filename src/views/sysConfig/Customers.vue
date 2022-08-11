<template>
  <PageWrapper>
    <template #headerContent>
      <Form layout="horizontal" :model="params">
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('routes.sysConfig.customers.customerId')">
              <Input v-model:value="params.customerId" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('routes.sysConfig.customers.customName')">
              <Input v-model:value="params.customerName" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('routes.sysConfig.customers.company')">
              <Input v-model:value="params.companyName" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('common.createDate')">
              <DatePicker.RangePicker
                v-model:value="params.editTime"
                :valueFormat="dateValueFormat"
              />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('common.updateDate')">
              <DatePicker.RangePicker
                v-model:value="params.editTime"
                :valueFormat="dateValueFormat"
              />
            </FormItem>
          </Col>
          <Col :span="8">
            <Button type="primary" @click="getRecordList">{{ t('common.queryText') }}</Button>
            <!-- <Button type="primary" @click="handleResetClick">{{ t('common.resetText') }}</Button> -->
            <Button type="primary" @click="handleCreateClick" v-if="pageFn.add">
              {{ t('common.create', { name: t('routes.sysConfig.customers.customer') }) }}</Button
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
      <template #bodyColumn="{ column, text, record }">
        <template v-if="column.dataIndex === 'transactionRecordNumber'">
          <Button type="link" @click="handleShowTradeCount(record)">{{ text }}</Button>
        </template>
      </template>
    </VTableVue>
    <component
      v-if="visibleModal"
      :is="visibleModal"
      :customer="visibleModalCustomer"
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
  import { getPagedCustomerList } from '/@/api/sysConfig/customer.api';
  import { createUseRecords } from '/@/utils/my/useRecords';
  import VTableVue, { VTableColumnType } from '../trade/VTable.vue';
  import CustomerTradeListModal from './components/CustomerTradeListModal.vue';
  import NewCustomerModal from './components/NewCustomerModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import usePageFn from '/@/utils/my/usePageFn';
  const pageFn = usePageFn();
  const { t } = useI18n();

  // const RadioButton = Radio.Button;
  const dateValueFormat = 'YYYY-MM-DD';
  const columns = computed<VTableColumnType[]>(() => [
    {
      title: t('routes.sysConfig.customers.customerId'),
      dataIndex: 'customerId',
      visible: true,
    },
    {
      title: t('common.updateDate'),
      dataIndex: 'editTime',
      visible: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      visible: true,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      visible: true,
    },
    {
      title: t('routes.sysConfig.customers.company'),
      dataIndex: 'companyName',
      visible: true,
    },
    {
      title: t('routes.sysConfig.customers.tradeCount'),
      dataIndex: 'transactionRecordNumber',
      visible: true,
    },
    {
      title: t('routes.sysConfig.customers.telephone'),
      dataIndex: 'phone',
      visible: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      visible: true,
      // width: 150,
    },

    {
      title: t('common.createDate'),
      dataIndex: 'createTime',
      visible: true,
    },
  ]);

  const { total, params, records, getRecords, rowSelection } =
    createUseRecords<CustomerInfoItem[]>()(getPagedCustomerList);

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
  const visibleModal = shallowRef<typeof CustomerTradeListModal>();
  const visibleModalCustomer = ref<CustomerInfoItem>();
  const handleEditClick = (user: RoleItem) => {
    visibleModal.value = NewCustomerModal;
    visibleModalCustomer.value = user;
  };
  const handleCreateClick = () => {
    visibleModal.value = NewCustomerModal;
    visibleModalCustomer.value = void 0;
  };
  const handleShowTradeCount = (row: CustomerInfoItem) => {
    visibleModal.value = CustomerTradeListModal;
    visibleModalCustomer.value = row;
  };
</script>
