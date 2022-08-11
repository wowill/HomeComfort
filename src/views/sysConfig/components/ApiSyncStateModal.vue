<template>
  <Modal
    class="with-padding without-ok-btn-modal"
    v-model:visible="visible"
    :width="600"
    :title="titleMap[syncState.status]"
    cancelText="关闭"
  >
    <Progress :percent="syncState.percent" :status="statusMap[syncState.status]" />
    <p>{{ syncDetail }}</p>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Modal, Progress } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useI18n } from '/@/hooks/web/useI18n';
  const userStore = useUserStore();
  const { t } = useI18n();

  const props = defineProps<{
    requestId: string;
  }>();
  const emit = defineEmits<{
    (e: 'hide'): void;
    (e: 'reload'): void;
  }>();

  const visible = computed({
    get() {
      return !!props.requestId;
    },
    set() {
      if (syncState.value.status === 1) {
        emit('reload');
      }
      // socket.close();
      emit('hide');
    },
  });

  const syncState = ref({
    percent: 0,
    status: 0,
    dealNum: '',
    reason: '',
  });

  const socket = new WebSocket(
    `ws://${location.host}${import.meta.env.VITE_GLOB_API_URL}/hc?LakerToken=${userStore.getToken}`,
  );
  socket.addEventListener('open', function (event) {
    // socket.send('Hello Server!');
    console.log('666', event);
  });

  const titleMap = {
    '-1': t('routes.sysConfig.api.syncFailed'),
    '0': t('routes.sysConfig.api.syncing'),
    '1': t('routes.sysConfig.api.syncSuccess'),
  };

  const statusMap = {
    '-1': 'exception',
    '0': 'active',
    '1': 'success',
  };

  const syncDetail = computed(() => {
    switch (syncState.value.status) {
      case 0:
        return t('routes.sysConfig.api.syncingNum', { num: syncState.value.dealNum });
      case 1:
        return t('routes.sysConfig.api.totalSyncNum', { num: syncState.value.dealNum });
      case -1:
        return syncState.value.reason;
      default:
        return '';
    }
  });
  socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    console.log('Message from server ', data, props.requestId);
    if (data.requestId !== props.requestId) {
      return;
    }
    const { syncProgress, syncStatus, dealNumber, reason } = data.content;
    syncState.value = {
      percent: syncProgress,
      status: syncStatus,
      dealNum: dealNumber,
      reason,
    };
    // syncState.percent = event.data.;
  });
</script>
