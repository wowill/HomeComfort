<template>
  <Modal
    class="with-padding"
    v-model:visible="visible"
    :title="t('routes.sysConfig.account.resetPwd')"
  >
    <List :dataSource="records" :pagination="pagination">
      <template #renderItem="{ item }">
        <List.Item>
          <List.Item.Meta
            :title="item.createTime"
            :key="item.loginlogId"
            :description="item.loginAdress + ' ' + item.loginIp"
          />
        </List.Item>
      </template>
    </List>
  </Modal>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Modal, List } from 'ant-design-vue';
  import { getLoginLogs } from '/@/api/sysConfig/user.api';
  import { createUseRecords } from '/@/utils/my/useRecords';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();

  const props = defineProps<{
    user: UserItem;
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

  const { total, params, records, getRecords } =
    createUseRecords<GetLoginLogItem[]>()(getLoginLogs);

  const defaultPageSize = 5;

  const getLogList = (current = 1, pageSize = defaultPageSize) => {
    params.value = {
      userId: props.user.userId,
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
