<template>
  <Modal
    class="with-padding"
    v-model:visible="visible"
    :title="
      t(`common.${rule ? 'edit' : 'create'}`, {
        name: t('routes.sysConfig.tradeRule.tradeRule'),
      })
    "
  >
    <Form
      :model="formData"
      ref="formRef"
      :rules="formRules"
      :labelCol="{ style: { width: '100px' } }"
    >
      <Form.Item :label="t('routes.sysConfig.tradeRule.name')" name="transactionConditionsName">
        <Input v-model:value="formData.transactionConditionsName" />
      </Form.Item>
      <Form.Item
        :label="t('routes.sysConfig.tradeRule.description')"
        name="transactionConditionsDetail"
      >
        <Input.TextArea :rows="3" v-model:value="formData.transactionConditionsDetail" />
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
  import { saveTradeRule } from '/@/api/sysConfig/tradeRule.api';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { ValidationRule } from 'ant-design-vue/es/form/Form';
  const { t } = useI18n();

  const props = defineProps<{
    rule: TradeRuleItem;
  }>();
  const emit = defineEmits<{
    (e: 'hide'): void;
    (e: 'reload'): void;
  }>();

  const formData = ref<TradeRuleItem>(
    props.rule
      ? {
          ...props.rule,
        }
      : {},
  );
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
    saveTradeRule(formData.value).then(() => {
      visible.value = false;
      emit('reload');
    });
  };
</script>
