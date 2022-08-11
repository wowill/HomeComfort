<template>
  <Modal
    class="with-padding"
    v-model:visible="visible"
    :title="t('routes.sysConfig.account.resetPwd')"
  >
    <Form
      :model="formaData"
      ref="formRef"
      :rules="formRules"
      :labelCol="{ style: { width: '100px' } }"
    >
      <Form.Item :label="t('routes.sysConfig.account.newPwd')" name="pwd">
        <Input v-model:value="formaData.pwd" />
      </Form.Item>
    </Form>
    <template #footer>
      <Button type="primary" @click="handleSubmit">{{ t('common.confirmSubmitText') }}</Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref } from 'vue';
  import { Modal, Input, Button, Form } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { resetUserPwd } from '/@/api/sysConfig/user.api';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { ValidationRule } from 'ant-design-vue/es/form/Form';
  const { t } = useI18n();

  const props = defineProps<{
    user: UserItem;
  }>();
  const emit = defineEmits<{
    (e: 'hide'): void;
    (e: 'reload'): void;
  }>();

  const formaData = ref({
    pwd: '',
  });
  const visible = computed({
    get() {
      return true;
    },
    set() {
      emit('hide');
    },
  });

  const formRules = computed<Record<string, ValidationRule[]>>(() => ({
    pwd: [
      {
        required: true,
        message: t('common.inputText') + t('routes.sysConfig.account.newPwd'),
      },
      {
        min: 5,
        max: 12,
        message: t('routes.sysConfig.account.newPwdPlaceholder'),
      },
    ],
  }));

  const formRef = ref<FormInstance>() as Ref<FormInstance>;
  // const handleCancelClick = () => {
  //   visible.value = false;
  // };
  const handleSubmit = async () => {
    await formRef.value.validate();
    resetUserPwd(props.user.userId, formaData.value.pwd).then(() => {
      visible.value = false;
    });
    // saveBanner(bannerInfo.value).then(() => {
    //   emit('reload');
    //   visible.value = false;
    // });
  };
</script>
