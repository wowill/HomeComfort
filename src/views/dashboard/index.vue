<template>
  <PageWrapper>
    <Row :gutter="24">
      <Col :span="12">
        <Card :title="t('auto.jiao-yi-ji-lu')" :bordered="false">
          <Row>
            <Col :span="12"
              >{{ t('auto.fang-wu-xiao-shou') }}：{{
                dashboardData.indexPageTransactionRecordsChartModel.saleRecords
              }}</Col
            >
            <Col :span="12"
              >{{ t('auto.fang-wu-zu-lin') }}：{{
                dashboardData.indexPageTransactionRecordsChartModel.leaseRecords
              }}</Col
            >
          </Row>
          <Row>
            <Col :span="12"
              >{{ t('auto.shang-ye-di-chan') }}：{{
                dashboardData.indexPageTransactionRecordsChartModel.cxRecords
              }}</Col
            >
            <Col :span="12"
              >{{ t('auto.jiao-yi-zong-e') }}：${{
                dashboardData.indexPageTransactionRecordsChartModel.totalAmountOfTransactions
              }}
            </Col>
          </Row>
          <CircleChartVue
            style="height: 200px"
            :name="t('auto.ji-lu-zong-shu')"
            :data="dashboardData.indexPageTransactionRecordsChartModel.chatList"
            :map-fn="recordMapFn"
            :total="dashboardData.indexPageTransactionRecordsChartModel.totalRecords"
            :formatter="recorderFormatter"
          />
        </Card>
      </Col>
      <Col :span="12">
        <Card :title="t('routes.trade.tradeList.broker')" :bordered="false">
          <Row>
            <Col :span="12"
              >{{ t('auto.you-jiao-yi-ren-shu') }}：{{
                dashboardData.indexPageBrokersChartModel.hasRecordBrokerNumber
              }}</Col
            >
            <Col :span="12"
              >{{ t('auto.wu-jiao-yi-ren-shu') }}：{{
                dashboardData.indexPageBrokersChartModel.noRecordBrokerNumber
              }}</Col
            >
          </Row>
          <Row>
            <Col :span="12"
              >{{ t('auto.jing-ji-ren-zong-shu') }}：{{
                dashboardData.indexPageBrokersChartModel.totalBrokerNumber
              }}</Col
            >
          </Row>
          <CircleChartVue
            style="height: 200px"
            :name="t('auto.jing-ji-ren-zong-shu')"
            :data="dashboardData.indexPageBrokersChartModel.chatList"
            :total="dashboardData.indexPageBrokersChartModel.totalBrokerNumber"
            :map-fn="brokerMapFn"
            :formatter="brokerFormatter"
          />
        </Card>
      </Col>
    </Row>
    <Card :title="t('auto.jiao-yi-ji-lu-xin-zeng-qu-shi')" :bordered="false">
      <BarChartVue style="height: 220px" :data="dashboardData.newTrendOfTransactionRecordsList" />
    </Card>
    <Card :title="t('auto.jing-ji-ren-xin-zeng-qu-shi')" :bordered="false">
      <BarChartVue style="height: 220px" :data="dashboardData.newTrendsOfBrokersList"
    /></Card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Row, Col, Card } from 'ant-design-vue';
  import CircleChartVue from './components/CircleChart.vue';
  import BarChartVue from './components/BarChart.vue';
  import { getDashboardData } from '/@/api/dashboard';

  const { t } = useI18n();
  const dashboardData = ref<DashboardDataResult>({
    indexPageBrokersChartModel: {
      chatList: [],
      hasRecordBrokerNumber: 0,
      noRecordBrokerNumber: 0,
      totalBrokerNumber: 0,
    },
    indexPageTransactionRecordsChartModel: {
      chatList: [],
      cxRecords: 0,
      leaseRecords: 0,
      saleRecords: 0,
      totalAmountOfTransactions: 0,
      totalRecords: 0,
    },
    newTrendOfTransactionRecordsList: [],
    newTrendsOfBrokersList: [],
  });
  getDashboardData().then((res) => {
    dashboardData.value = res;
  });

  const recordMapFn = (item: TransactionRecordsChartModelItem) => ({
    ...item,
    name: item.companyName,
    value: item.recordNumber,
  });
  const recorderFormatter = (name: string) => {
    const data = dashboardData.value.indexPageTransactionRecordsChartModel.chatList;
    const item = data.find((i) => i.companyName === name);
    if (item) {
      return (
        '{name|' +
        name +
        '}{value|' +
        item.recordNumber +
        '}{amount|$ ' +
        item.amountOfTransactions +
        '}'
      );
    }
    return '';
  };

  const brokerMapFn = (item: BrokersChartModelItem) => ({
    ...item,
    name: item.companyName,
    value: item.number,
  });
  const brokerFormatter = (name: string) => {
    const data = dashboardData.value.indexPageBrokersChartModel.chatList;
    const item = data.find((i) => i.companyName === name);
    if (item) {
      return '{name|' + name + '}{value|' + item.percent + '%}{amount|' + item.number + '}';
    }
    return '';
  };
</script>
