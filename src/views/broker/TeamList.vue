<template>
  <PageWrapper>
    <template #headerContent>
      <Form layout="horizontal" :model="formState">
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('routes.broker.teamList.teamName')">
              <Input v-model:value="formState.brokerTeamName" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('routes.trade.tradeList.belongCompany')">
              <Input v-model:value="formState.companyId" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('common.createDate')">
              <RangePicker v-model:value="formState.createTime" :valueFormat="dateValueFormat" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('common.updateDate')">
              <RangePicker v-model:value="formState.editTime" :valueFormat="dateValueFormat" />
            </FormItem>
          </Col>
          <Col :span="8">
            <Button type="primary" @click="getRecordList()">{{ t('common.queryText') }}</Button>
            <Button type="primary" @click="handleCreateClick" v-if="pageFn.add">{{
              t('common.addNew')
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
      :transformCellText="transformCellTextFn"
      rowKey="brokerPersonId"
      @page-change="onPageChange"
    >
      <template #actionBodyColumn="{ record }" v-if="pageFn.edit">
        <Button class="action-btn" type="link" @click="handleEditClick(record)">{{
          t('common.edit')
        }}</Button>
      </template>
      <!-- <template #bodyColumn="{ column, text, record }">
        <template v-if="column.dataIndex === 'transactionRecordNumber'">
          <Button type="link" @click="handleShowTradeCount(record)">{{ text || 0 }}</Button>
        </template>
      </template> -->
    </VTableVue>
    <component
      v-if="visibleModal"
      :is="visibleModal"
      :team="visibleModalTeam"
      :isLawyerPage="true"
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
    // Image,
  } from 'ant-design-vue';
  // import Icon from '/@/components/Icon/index';
  import { PageWrapper } from '/@/components/Page';
  import VTableVue, { VTableColumnType } from '../trade/VTable.vue';
  import { getPagedTeamList } from '/@/api/broker/team';
  import { ref, computed, shallowRef } from 'vue';
  // import { formatDate } from '/@/utils/dateUtil';
  // import { useRouter } from 'vue-router';
  import { createUseRecords } from '/@/utils/my/useRecords';
  // import RecordNoteModal from './components/RecordNoteModal.vue';
  import NewTeam from './components/NewTeam.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import usePageFn from '/@/utils/my/usePageFn';
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

  const columns = computed<VTableColumnType[]>(() => [
    {
      title: t('routes.broker.teamList.teamName'),
      dataIndex: 'teamName',
      visible: true,
      width: '100px',
    },
    {
      title: t('routes.trade.tradeList.belongCompany'),
      dataIndex: 'companyName',
      visible: true,
    },
    {
      title: t('routes.trade.newTrade.commissionDistributeRate'),
      dataIndex: 'commissionDistributionRatio',
      visible: true,
    },
    {
      title: t('routes.broker.teamList.teamMemberCount'),
      dataIndex: 'memberNumber',
      visible: true,
    },
    {
      title: t('common.updateDate'),
      dataIndex: 'editTime',
      visible: true,
    },
    {
      title: t('common.createDate'),
      dataIndex: 'createTime',
      visible: true,
    },
  ]);
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
  } = createUseRecords<TeamItem[]>()(getPagedTeamList);
  getRecordList();
  const onPageChange = (page: number, pageSize: number) => {
    formState.value.page = page;
    formState.value.limit = pageSize;
    getRecordList();
  };
  // const handleShowRecordList = (record: TeamItem) => {
  //   router.push({
  //     name: 'recordList',
  //     params: {
  //       id: record.brokerPersonId,
  //     },
  //   });
  // };
  const visibleModal = shallowRef<typeof NewTeam>();
  const visibleModalTeam = ref<TeamItem>();

  const handleCreateClick = () => {
    visibleModal.value = NewTeam;
    visibleModalTeam.value = void 0;
  };
  const handleEditClick = (row: TeamItem) => {
    visibleModal.value = NewTeam;
    visibleModalTeam.value = row;
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
