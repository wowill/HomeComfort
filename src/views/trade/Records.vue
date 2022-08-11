<template>
  <PageWrapper>
    <template #headerContent>
      <Form layout="horizontal" :model="formState">
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('routes.trade.tradeList.tradeNo')">
              <Input v-model:value="formState.recordNo" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('routes.trade.tradeList.broker')">
              <Input v-model:value="formState.broker" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('routes.trade.tradeList.houseAddr')">
              <Input v-model:value="formState.addr" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('routes.trade.tradeList.takeEffectDate')">
              <RangePicker v-model:value="formState.startDate" :valueFormat="dateValueFormat" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('routes.trade.tradeList.deadlineDate')">
              <RangePicker v-model:value="formState.endDate" :valueFormat="dateValueFormat" />
            </FormItem>
          </Col>
          <Col :span="8">
            <Button type="primary" @click="getRecordList">{{ t('common.queryText') }}</Button>
            <Button type="primary" @click="handleAddClick">{{
              t('routes.trade.tradeList.newRecord')
            }}</Button>
            <Button type="primary" @click="handleCopyClick">{{
              t('routes.trade.tradeList.copyRecord')
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
      rowKey="transactionId"
      @page-change="onPageChange"
    >
      <template #header-filter>
        <RadioGroup v-model:value="tradeType" @change="getRecordList">
          <RadioButton v-for="st in tradeTypeList" :key="st.value" :value="st.value">
            {{ st.label }}({{ tradeTypeMap[st.type] || 0 }})
          </RadioButton>
        </RadioGroup>
      </template>
      <template #actionBodyColumn="{ record }">
        <Button class="action-btn" type="link" @click="handleEditClick(record)">{{
          t('common.edit')
        }}</Button>
        <Popconfirm @confirm="handleDelClick(record)" :title="t('auto.shi-fou-que-ren-shan-chu')">
          <Button class="action-btn" type="link">{{ t('common.delText') }}</Button>
        </Popconfirm>
        <Button class="action-btn" type="link" @click="handleRemarkClick(record)">{{
          t('common.notes')
        }}</Button>
      </template>
      <template #bodyColumn="{ column, text, record }">
        <template v-if="column.key === 'deadlineDate' || column.key === 'takeEffectDate'">
          {{ formatDate(text) }}
        </template>
        <template v-else-if="column.key === 'roomPic'">
          <Image :src="text" class="house-pic-thumb" />
        </template>
        <template v-else-if="column.key === 'broker'">
          {{ record.sellerBrokerFirstName }} {{ record.sellerBrokerLastName }}
        </template>
      </template>
    </VTableVue>
    <RecordNoteModal :id="noteModalId" v-model:visible="noteModalVisible" />
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
    Image,
    Popconfirm,
  } from 'ant-design-vue';
  // import Icon from '/@/components/Icon/index';
  import { PageWrapper } from '/@/components/Page';
  import VTableVue, { VTableColumnType } from './VTable.vue';
  import { getRecords, deleteRecord } from '/@/api/trade';
  import { reactive, ref, computed } from 'vue';
  import { formatDate } from '/@/utils/dateUtil';
  import RecordNoteModal from './components/RecordNoteModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useNav } from '/@/utils/UseRoute';
  const navTo = useNav();
  const { t } = useI18n();

  const RangePicker = DatePicker.RangePicker;
  const dateValueFormat = 'YYYY-MM-DD';

  const formState = reactive({
    recordNo: '',
    broker: '',
    addr: '',
    startDate: [] as unknown as [string, string],
    endDate: [] as unknown as [string, string],
    currentPage: 1,
    pageSize: 10,
  });

  const RadioButton = Radio.Button;
  const tradeType = ref('');
  const tradeTypeList = computed(() => [
    {
      label: t('routes.trade.tradeList.all'),
      type: 'total',
      value: '',
    },
    {
      label: t('routes.trade.tradeList.sell'),
      type: 'sale',
      value: '1',
    },
    {
      label: t('routes.trade.tradeList.rent'),
      type: 'lease',
      value: '2',
    },
  ]);
  const columns = computed<VTableColumnType[]>(() => [
    {
      title: t('routes.trade.tradeList.roomPic'),
      dataIndex: 'hrefUrls',
      key: 'roomPic',
      visible: true,
      width: '100px',
    },
    {
      title: t('routes.trade.tradeList.recordCode'),
      dataIndex: 'transactionCode',
      key: 'recordCode',
      visible: true,
    },
    {
      title: t('routes.trade.tradeList.deadlineDate'),
      dataIndex: 'abortDate',
      key: 'deadlineDate',
      visible: true,
    },
    {
      title: t('routes.trade.tradeList.state'),
      dataIndex: 'transactionStatusName',
      key: 'state',
      visible: true,
    },
    {
      title: t('routes.trade.tradeList.tradeStatus'),
      dataIndex: 'transactionStatusName',
      key: 'tradeStatus',
      visible: true,
    },
    {
      title: t('routes.trade.tradeList.houseAddr'),
      dataIndex: 'estateAddress',
      key: 'houseAddr',
      visible: true,
      minWidth: 150,
      // width: 150,
    },
    {
      title: t('routes.trade.tradeList.roomNumber'),
      dataIndex: 'houseNumber',
      key: 'roomNumber',
      visible: true,
    },
    {
      title: t('routes.trade.tradeList.broker'),
      dataIndex: 'brokerName',
      key: 'broker',
      visible: true,
    },
    {
      title: t('routes.trade.tradeList.belongTeam'),
      dataIndex: 'sellerTeamName',
      key: 'belongTeam',
      visible: true,
    },
    {
      title: t('routes.trade.tradeList.belongCompany'),
      dataIndex: 'sellerBrokerCompanyName',
      key: 'belongCompany',
      visible: true,
    },
    {
      title: t('routes.trade.tradeList.takeEffectDate'),
      dataIndex: 'effectiveDate',
      key: 'takeEffectDate',
      visible: true,
    },
  ]);
  const dataSource = ref<GetRecordItem[]>([]);
  const tradeTypeMap = ref<TradeTypeMap>({} as TradeTypeMap);
  const total = ref(0);
  const checkedRowKeys = ref<string[]>([]);
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys: (string | number)[], selectedRows: GetRecordItem[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      checkedRowKeys.value = selectedRowKeys as string[];
    },
    // onSelect: (record: GetRecordItem, selected: boolean, selectedRows: GetRecordItem[]) => {
    //   console.log(record, selected, selectedRows);
    // },
    // onSelectAll: (
    //   selected: boolean,
    //   selectedRows: GetRecordItem[],
    //   changeRows: GetRecordItem[],
    // ) => {
    //   console.log(selected, selectedRows, changeRows);
    // },
  });
  const getRecordList = () => {
    const [effectiveDateStart, effectiveDateEnd] = formState.startDate || [];
    const [abortDateStart, abortDateEnd] = formState.endDate || [];
    console.log(effectiveDateStart, effectiveDateEnd);
    getRecords({
      brokerPersonName: formState.broker,
      recordCode: formState.recordNo,
      estateAddress: formState.addr,
      effectiveDateStart,
      effectiveDateEnd,
      abortDateStart,
      abortDateEnd,
      page: formState.currentPage,
      limit: formState.pageSize,
      transactionType: tradeType.value,
    }).then((res) => {
      dataSource.value = res.records.transactionRecordList;
      tradeTypeMap.value = res.records.transactionTypeCountDtoList;
      total.value = res.total;
    });
  };
  getRecordList();
  const onPageChange = (page: number, pageSize: number) => {
    formState.currentPage = page;
    formState.pageSize = pageSize;
    getRecordList();
  };
  const handleCopyClick = () => {
    console.log('复制');
  };
  const handleAddClick = () => {
    navTo({
      name: 'newRecord',
    });
  };
  const handleEditClick = (record: GetRecordItem) => {
    navTo({
      name: 'editRecord',
      params: {
        id: record.transactionId,
      },
    });
  };
  const handleDelClick = (record: GetRecordItem) => {
    deleteRecord(record.transactionId).then(getRecordList);
  };
  const noteModalVisible = ref(false);
  const noteModalId = ref(0);
  const handleRemarkClick = (record: GetRecordItem) => {
    noteModalVisible.value = true;
    noteModalId.value = record.transactionId;
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
