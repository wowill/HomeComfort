<template>
  <Modal
    class="with-padding"
    v-model:visible="visible"
    :title="t('routes.sysConfig.customers.viewDetail')"
  >
    <!-- <List :dataSource="records" :pagination="pagination">
      <template #renderItem="{ item }">
        <List.Item>
          <List.Item.Meta
            :title="item.createTime"
            :key="item.loginlogId"
            :description="item.loginAdress + ' ' + item.loginIp"
          />
        </List.Item>
      </template>
    </List> -->
    <Table :data-source="records" :columns="columns" :pagination="pagination" />
  </Modal>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Modal, Table } from 'ant-design-vue';
  import { getCustomerTradeList } from '/@/api/sysConfig/customer.api';
  import { getLawyerTradeList } from '/@/api/sysConfig/lawyer.api';
  import { getBrokerTradeList } from '/@/api/broker';
  import { createUseRecords } from '/@/utils/my/useRecords';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();

  const apiMap = {
    lawyer: getLawyerTradeList,
    broker: getBrokerTradeList,
  };
  const props = defineProps<{
    customer: CustomerInfoItem;
    pageName?: string;
  }>();
  const emit = defineEmits<{
    (e: 'hide'): void;
    (e: 'reload'): void;
  }>();

  const visible = computed({
    get() {
      return true;
    },
    set() {
      emit('hide');
    },
  });

  const columns = computed(() => [
    {
      title: t('routes.trade.tradeList.recordCode'),
      dataIndex: 'transactionCode',
    },
    {
      title: t('common.state'),
      dataIndex: 'transactionStatusName',
    },
  ]);

  const { params, total, records, getRecords } = createUseRecords<GetLoginLogItem[]>()(
    (props.pageName && apiMap[props.pageName]) || getCustomerTradeList,
  );

  const defaultPageSize = 5;

  const getLogList = (current = 1, pageSize = defaultPageSize) => {
    params.value = {
      ...props.customer,
      limit: pageSize,
      page: current,
    };
    getRecords();
  };

  getLogList();

  const pagination = computed(() => ({
    onChange: getLogList,
    pageSize: params.value.limit || defaultPageSize,
    total: total.value,
    pageSizeOptions: [5, 10, 20, 50],
  }));
</script>
