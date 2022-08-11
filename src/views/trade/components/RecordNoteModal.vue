<template>
  <Modal
    v-model:visible="visible"
    :title="t('common.add', { name: t('common.notes') })"
    :footer="null"
  >
    <Card :bordered="false">
      <TextArea v-model:value="noteContent" :maxlength="200" />
      <div class="ant-modal-footer">
        <Button type="primary" @click="handleCancelClick">{{ t('common.cancelText') }}</Button>
        <Button type="primary" @click="handleOkClick">{{ t('common.okText') }}</Button>
      </div>
      <List :pagination="paginationConfig">
        <List.Item v-for="note in currentPageNotes" :key="note.hcTransactionMarkId">
          <List.Item.Meta>
            <template #title>
              <span class="create-time">{{ note.createTime }}</span>
              {{ note.markUserName }}
            </template>
          </List.Item.Meta>
          {{ note.mark }}
        </List.Item>
      </List>
    </Card>
  </Modal>
</template>

<script lang="ts" setup>
  import { computed, watch, ref } from 'vue';
  import { Modal, Input, Button, Card, List } from 'ant-design-vue';
  import { getRecordNotes, addRecordNote } from '/@/api/trade';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();

  const TextArea = Input.TextArea;

  const props = defineProps({
    visible: { type: Boolean, default: false },
    id: {
      type: Number,
      required: true,
    },
  });
  const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
  }>();

  const visible = computed({
    get() {
      return props.visible;
    },
    set(v: boolean) {
      emit('update:visible', v);
    },
  });
  watch(
    () => props.visible,
    (v) => {
      console.log(v);
      if (v) {
        getNotes();
      }
    },
  );

  const currentPageNotes = ref<GetRecordNotesItem[]>([]);
  const getNotes = (page = 1, pageSize = 2) => {
    getRecordNotes({
      transactionId: props.id,
      current: page,
      size: pageSize,
    }).then((res) => {
      currentPageNotes.value = res.records;
      paginationConfig.value.total = res.total;
    });
  };
  const paginationConfig = ref({
    total: 0,
    pageSize: 2,
    onChange: getNotes,
    showLessItems: true,
  });
  // const currentPage = ref(1);

  const noteContent = ref('');
  const handleCancelClick = () => {
    visible.value = false;
  };
  const handleOkClick = () => {
    addRecordNote(props.id, noteContent.value).then((res) => {
      noteContent.value = '';
      console.log('rrr', res);
      getNotes(1);
    });
  };
</script>

<style lang="less" scoped>
  .create-time {
    margin-right: 18px;
    font-weight: normal;
  }
</style>
