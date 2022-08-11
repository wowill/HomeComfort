<template>
  <Modal
    class="with-padding without-ok-btn-modal"
    v-model:visible="visible"
    :width="600"
    :title="t('routes.sysConfig.account.resetPwd')"
    cancelText="关闭"
  >
    <Table :dataSource="records" :columns="columns" :pagination="false" />
  </Modal>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Modal, Table } from 'ant-design-vue';
  import { getApiSyncLog } from '/@/api/sysConfig/apiConfig.api';
  import { createUseRecords } from '/@/utils/my/useRecords';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();

  const props = defineProps<{
    api: ApiConfigItem;
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
      title: t('routes.sysConfig.api.operateTime'),
      dataIndex: 'createTime',
      visible: true,
    },
    {
      title: t('routes.sysConfig.api.operator'),
      dataIndex: 'operateAccount',
      visible: true,
    },
    {
      title: t('routes.sysConfig.api.syncState'),
      dataIndex: 'syncStatus',
      visible: true,
    },
    {
      title: t('routes.sysConfig.api.syncResult'),
      dataIndex: 'syncResult',
    },
  ]);

  const { params, records, getRecords } = createUseRecords<ApiSyncLogItem[]>()(
    getApiSyncLog,
    (res, result) => {
      console.log(res, 99999);
      result.value = res;
    },
  );

  // const defaultPageSize = 5;

  // const getLogList = (current = 1, pageSize = defaultPageSize) => {
  const getLogList = () => {
    params.value = {
      id: props.api.apiId,
      // limit: pageSize,
      // page: current,
    };
    getRecords();
  };

  getLogList();

  // const pagination = computed(() => ({
  //   onChange: getLogList,
  //   pageSize: params.value.limit || defaultPageSize,
  //   total: total.value,
  //   pageSizeOptions: [5, 10, 20, 50],
  // }));
</script>
