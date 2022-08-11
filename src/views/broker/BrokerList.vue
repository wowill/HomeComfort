<template>
  <PageWrapper>
    <template #headerContent>
      <Form layout="horizontal" :model="formState">
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('routes.broker.list.brokerId')">
              <Input v-model:value="formState.brokerPersonId" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('routes.broker.list.brokerName')">
              <Input v-model:value="formState.brokerPersonName" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('routes.trade.tradeList.belongCompany')">
              <Input v-model:value="formState.companyId" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('common.createDate')">
              <RangePicker v-model:value="formState.createTime" :valueFormat="dateValueFormat" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('common.updateDate')">
              <RangePicker v-model:value="formState.editTime" :valueFormat="dateValueFormat" />
            </FormItem>
          </Col>
          <Col :span="8">
            <Button type="primary" @click="getRecordList()">{{ t('common.queryText') }}</Button>
            <Button type="primary" @click="handleAddClick" v-if="pageFn.add">{{
              t('common.addNew')
            }}</Button>
            <Button type="primary" @click="handleNavTeam">{{
              t('routes.broker.list.teamManage')
            }}</Button>
            <Button type="primary" @click="handleNavCommissionRule">{{
              t('routes.broker.rule.title')
            }}</Button>
          </Col>
        </Row>
      </Form>
    </template>
    <VTableVue
      :total="total"
      :columns="columns"
      :dataSource="dataSource"
      :actionColumnWidth="155"
      :rowSelection="rowSelection"
      rowKey="brokerPersonId"
      @page-change="onPageChange"
    >
      <template #header-filter>
        <RadioGroup v-model:value="formState.status" @change="getRecordList()">
          <RadioButton v-for="st in stateTypeList" :key="st.value" :value="st.value">
            {{ st.label }}({{ tradeTypeMap[st.name] }})
          </RadioButton>
        </RadioGroup>
      </template>
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
          @click="handleDelClick(record)"
          v-if="pageFn.delete"
          >{{ t('common.delText') }}</Button
        >
        <Button class="action-btn" type="link" @click="handleRemarkClick(record)">{{
          t('common.notes')
        }}</Button>
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
      pageName="broker"
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
    DatePicker,
    Button,
    RadioGroup,
    Radio,
    // Image,
  } from 'ant-design-vue';
  // import Icon from '/@/components/Icon/index';
  import { PageWrapper } from '/@/components/Page';
  import VTableVue, { VTableColumnType } from '../trade/VTable.vue';
  import { getPagedBrokerList, deleteBroker } from '/@/api/broker/';
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

  const RangePicker = DatePicker.RangePicker;
  const dateValueFormat = 'YYYY-MM-DD';

  // const formState = reactive({
  //   recordNo: '',
  //   broker: '',
  //   addr: '',
  //   startDate: [] as unknown as [string, string],
  //   endDate: [] as unknown as [string, string],
  //   currentPage: 1,
  //   pageSize: 10,
  // });

  const RadioButton = Radio.Button;
  const stateTypeList = computed(() => [
    {
      label: t('routes.broker.list.all'),
      name: 'total',
      value: 0,
    },
    {
      label: t('routes.broker.list.normal'),
      name: 'normal',
      value: 1,
    },
    {
      label: t('routes.broker.list.pause'),
      name: 'pause',
      value: 2,
    },
    {
      label: t('routes.broker.list.disabled'),
      name: 'disable',
      value: 3,
    },
  ]);
  const columns = computed<VTableColumnType[]>(() => [
    {
      title: t('routes.broker.list.brokerId'),
      dataIndex: 'brokerPersonId',
      visible: true,
      width: '100px',
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
      title: t('routes.trade.tradeList.belongCompany'),
      dataIndex: 'companyName',
      visible: true,
    },
    {
      title: t('routes.trade.tradeList.belongTeam'),
      dataIndex: 'teamName',
      visible: true,
      minWidth: 150,
      // width: 150,
    },
    {
      title: t('routes.broker.list.tradeCount'),
      dataIndex: 'transactionRecordNumber',
      visible: true,
    },
    {
      title: t('routes.broker.list.telephone'),
      dataIndex: 'phone',
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
  const tradeTypeMap = ref<BrokerStatusMap>({} as BrokerStatusMap);
  // const transformCellTextFn = ({ text }: any) => {
  //   // console.log('text', text, Array.isArray(text), column);
  //   if (Array.isArray(text) && text.length === 0) {
  //     return '- -';
  //   }
  //   return text;
  // };
  const {
    total,
    params: formState,
    records: dataSource,
    getRecords: getRecordList,
    rowSelection,
    // checkedRowKeys,
  } = createUseRecords<BrokerItem[]>()(getPagedBrokerList, (data, recordRef, totalRef) => {
    recordRef.value = data.records.brokerPersonRecordList;
    totalRef.value = data.total;
    tradeTypeMap.value = data.records.brokerPersonStatusList;
  });
  getRecordList(
    {
      ...formState.value,
      status: 0,
    },
    true,
  );
  const onPageChange = (page: number, pageSize: number) => {
    formState.value.page = page;
    formState.value.limit = pageSize;
    getRecordList();
  };
  const handleDelClick = (record: BrokerItem) => {
    deleteBroker(record.brokerPersonId).then(() => {
      getRecordList();
    });
  };
  const noteModalVisible = ref(false);
  const noteModalId = ref(0);
  const handleRemarkClick = (record: BrokerItem) => {
    noteModalVisible.value = true;
    noteModalId.value = record.brokerPersonId;
  };
  // const handleShowRecordList = (record: BrokerItem) => {
  //   navTo({
  //     name: 'recordList',
  //     params: {
  //       id: record.brokerPersonId,
  //     },
  //   });
  // };
  const handleNavTeam = () => {
    navTo({
      name: 'teamList',
    });
  };
  const handleNavCommissionRule = () => {
    navTo({
      name: 'commissionRule',
    });
  };
  const handleAddClick = () => {
    navTo({
      name: 'newBroker',
    });
  };
  const handleEditClick = (record: BrokerItem) => {
    navTo({
      name: 'editBroker',
      params: {
        id: record.brokerPersonId,
      },
    });
  };
  const visibleModal = shallowRef<typeof CustomerTradeListModal>();
  const visibleModalCustomer = ref<BrokerItem>();

  // const handleCreateClick = () => {
  //   visibleModal.value = NewCustomerModal;
  //   visibleModalCustomer.value = void 0;
  // };
  const handleShowTradeCount = (row: BrokerItem) => {
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
