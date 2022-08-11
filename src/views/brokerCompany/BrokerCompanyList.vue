<template>
  <PageWrapper>
    <template #headerContent>
      <Form layout="horizontal" :model="formState">
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('routes.brokerCompany.list.companyName')">
              <Input v-model:value="formState.companyName" />
            </FormItem>
          </Col>
          <Col :span="8">
            <Button type="primary" @click="getRecordList()">{{ t('common.queryText') }}</Button>
          </Col>
        </Row>
      </Form>
    </template>
    <VTableVue
      :headerPagination="false"
      :total="total"
      :columns="columns"
      :dataSource="dataSource"
      :actionColumnWidth="155"
      :rowSelection="rowSelection"
      :transformCellText="transformCellTextFn"
      rowKey="brokerPersonId"
      @page-change="onPageChange"
    >
      <!-- <template #header-filter>
        <RadioGroup v-model:value="stateType">
          <RadioButton v-for="st in stateTypeList" :key="st.value" :value="st.value">
            {{ st.label }}({{ tradeTypeMap[st.value] }})
          </RadioButton>
        </RadioGroup>
      </template> -->
      <template #actionBodyColumn="{ record }">
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
          @click="handleTogglePauseState(record)"
          v-if="pageFn.pause"
          >{{ record.pause ? t('common.restoreText') : t('common.pauseText') }}</Button
        >
        <Button
          class="action-btn"
          type="link"
          @click="handleToggleDisableState(record)"
          v-if="pageFn.disable"
          >{{ record.enable ? t('common.disableText') : t('common.enableText') }}</Button
        >
      </template>
      <template #bodyColumn="{ column, text, record }">
        <template v-if="column.dataIndex === 'transactionRecordNumber'">
          <Button type="link" @click="handleShowTradeCount(record)">{{ text || 0 }}</Button>
        </template>
      </template>
    </VTableVue>
    <component
      v-if="visibleModal"
      :is="visibleModal"
      :customer="visibleModalCustomer"
      :isLawyerPage="true"
      pageName="brokerCompany"
      @hide="visibleModal = undefined"
      @reload="getRecordList"
    />
    <!-- <RecordNoteModal :id="noteModalId" v-model:visible="noteModalVisible" /> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import {
    Form,
    FormItem,
    Row,
    Col,
    Input,
    Button,
    // RadioGroup,
    // Radio,
    // Image,
  } from 'ant-design-vue';
  // import Icon from '/@/components/Icon/index';
  import { PageWrapper } from '/@/components/Page';
  import VTableVue, { VTableColumnType } from '../trade/VTable.vue';
  import {
    getPagedBrokerCompany,
    toggleBrokerCompanyDisableState,
    toggleBrokerCompanyPauseState,
  } from '/@/api/brokerCompany/';
  import { ref, computed, shallowRef } from 'vue';
  // import { formatDate } from '/@/utils/dateUtil';
  import { createUseRecords } from '/@/utils/my/useRecords';
  import CustomerTradeListModal from '/@/views/sysConfig/components/CustomerTradeListModal.vue';
  // import RecordNoteModal from './components/RecordNoteModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import usePageFn from '/@/utils/my/usePageFn';
  import { useNav } from '/@/utils/UseRoute';
  const navTo = useNav();
  const pageFn = usePageFn();
  const { t } = useI18n();

  const columns = computed<VTableColumnType[]>(() => [
    {
      title: 'ID',
      dataIndex: 'brokerCompanyId',
      visible: true,
      width: '100px',
    },
    {
      title: t('common.updateDate'),
      dataIndex: 'editTime',
      visible: true,
    },
    {
      title: t('routes.brokerCompany.list.companyName'),
      dataIndex: 'companyName',
      visible: true,
    },
    {
      title: t('routes.brokerCompany.list.brokerCount'),
      dataIndex: 'personNumber',
      visible: true,
      minWidth: 150,
      // width: 150,
    },
    {
      title: t('routes.brokerCompany.list.telephone'),
      dataIndex: 'phone',
      visible: true,
    },
    {
      title: 'Fax',
      dataIndex: 'fax',
      visible: true,
    },
    {
      title: t('routes.broker.list.loginAccount'),
      dataIndex: 'loginAccount',
      visible: true,
    },
    {
      title: t('routes.broker.list.lastLoginTime'),
      dataIndex: 'lastLoginTime',
      visible: true,
    },
    {
      title: t('routes.broker.list.accountState'),
      dataIndex: 'accountStatus',
      visible: true,
    },
    {
      title: t('common.createDate'),
      dataIndex: 'createTime',
      visible: true,
    },
  ]);
  // const tradeTypeMap = ref<BrokerStatusMap>({} as BrokerStatusMap);
  const transformCellTextFn = ({ text }: any) => {
    // console.log('text', text, Array.isArray(text), column);
    if (Array.isArray(text) && text.length === 0) {
      return '- -';
    }
    return text;
  };
  const {
    total,
    params: formState,
    records: dataSource,
    getRecords: getRecordList,
    rowSelection,
    // checkedRowKeys,
  } = createUseRecords<BrokerCompanyItem[]>()(getPagedBrokerCompany);
  getRecordList();
  const onPageChange = (page: number, pageSize: number) => {
    formState.value.page = page;
    formState.value.limit = pageSize;
    getRecordList();
  };
  const handleToggleDisableState = (record: BrokerCompanyItem) => {
    toggleBrokerCompanyDisableState(record.brokerCompanyId).then(() => {
      getRecordList();
    });
  };
  const handleTogglePauseState = (record: BrokerCompanyItem) => {
    toggleBrokerCompanyPauseState(record.brokerCompanyId).then(() => {
      getRecordList();
    });
  };
  // const handleShowRecordList = (record: BrokerCompanyItem) => {
  //   navTo({
  //     name: 'recordList',
  //     params: {
  //       id: record.brokerPersonId,
  //     },
  //   });
  // };
  const handleEditClick = (record: BrokerCompanyItem) => {
    navTo({
      name: 'editBrokerCompany',
      params: {
        id: record.brokerCompanyId,
      },
    });
  };
  const visibleModal = shallowRef<typeof CustomerTradeListModal>();
  const visibleModalCustomer = ref<BrokerCompanyItem>();

  // const handleCreateClick = () => {
  //   visibleModal.value = NewCustomerModal;
  //   visibleModalCustomer.value = void 0;
  // };
  const handleShowTradeCount = (row: BrokerCompanyItem) => {
    visibleModal.value = CustomerTradeListModal;
    visibleModalCustomer.value = row;
  };
</script>

<style lang="less">
  .house-pic-thumb {
    &.ant-image-img {
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
  }
</style>
