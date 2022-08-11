<template>
  <Modal
    class="with-padding"
    v-model:visible="visible"
    :title="
      t(`common.${customer ? 'edit' : 'create'}`, {
        name: isLawyerPage
          ? t('routes.sysConfig.lawyer.lawyerInfo')
          : t('routes.sysConfig.customers.customerInfo'),
      })
    "
  >
    <Form
      :model="formData"
      ref="formRef"
      :rules="formRules"
      :labelCol="{ style: { width: '100px' } }"
    >
      <Form.Item label="Last Name" name="lastName">
        <Input v-model:value="formData.lastName" />
      </Form.Item>
      <Form.Item label="First Name" name="firstName">
        <Input v-model:value="formData.firstName" />
      </Form.Item>
      <Row :gutter="18">
        <Col span="20">
          <Form.Item :label="t('routes.sysConfig.customers.address')" name="adress">
            <Input v-model:value="formData.adress" />
          </Form.Item>
        </Col>
        <Col span="4">
          <Form.Item name="homeNumber">
            <Input v-model:value="formData.homeNumber" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item :label="t('routes.trade.newTrade.whichCity')" name="city">
        <Input v-model:value="formData.city" />
      </Form.Item>
      <Form.Item :label="t('routes.trade.newTrade.whichProvince')" name="province">
        <Input v-model:value="formData.province" />
      </Form.Item>
      <Form.Item :label="t('routes.trade.newTrade.mailCode')" name="postCode">
        <Input v-model:value="formData.postCode" />
      </Form.Item>
      <Form.Item :label="t('routes.sysConfig.customers.telephone')" name="phone">
        <Input v-model:value="formData.phone" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input v-model:value="formData.email" />
      </Form.Item>
      <Form.Item :label="t('routes.sysConfig.customers.company2')" name="companyName">
        <Input v-model:value="formData.companyName" />
      </Form.Item>
    </Form>
    <template #footer>
      <Button type="primary" @click="handleSubmit">{{ t('common.confirmSubmitText') }}</Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref } from 'vue';
  import { Modal, Input, Button, Form, Row, Col } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { saveCustomer } from '/@/api/sysConfig/customer.api';
  import { saveLawyer } from '/@/api/sysConfig/lawyer.api';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { ValidationRule } from 'ant-design-vue/es/form/Form';
  const { t } = useI18n();

  const props = defineProps<{
    customer: CustomerInfoItem;
    isLawyerPage?: boolean;
  }>();
  const emit = defineEmits<{
    (e: 'hide'): void;
    (e: 'reload'): void;
  }>();

  const formData = ref<CustomerInfoItem>(
    props.customer
      ? {
          ...props.customer,
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

  const formRules = computed<Record<string, ValidationRule | ValidationRule[]>>(() => ({
    lastName: [
      {
        required: true,
        message: t('common.inputText') + 'Last Name',
      },
    ],
    firstName: [
      {
        required: true,
        message: t('common.inputText') + 'First Name',
      },
    ],
    adress: {
      required: true,
      message: t('common.inputText') + t('routes.sysConfig.customers.address'),
    },
    homeNumber: {
      required: true,
      message: t('common.inputText') + t('routes.trade.newTrade.houseUnit'),
    },
    city: {
      required: true,
      message: t('common.inputText') + t('routes.trade.newTrade.whichCity'),
    },
    province: {
      required: true,
      message: t('common.inputText') + t('routes.trade.newTrade.whichProvince'),
    },
    postCode: {
      required: true,
      message: t('common.inputText') + t('routes.trade.newTrade.mailCode'),
    },
    phone: {
      required: true,
      message: t('common.inputText') + t('routes.sysConfig.customers.telephone'),
    },
    email: {
      required: true,
      message: t('common.inputText') + 'Email',
    },
    companyName: {
      required: true,
      message: t('common.inputText') + t('routes.sysConfig.customers.company2'),
    },
  }));

  const formRef = ref<FormInstance>() as Ref<FormInstance>;
  // const handleCancelClick = () => {
  //   visible.value = false;
  // };
  const handleSubmit = async () => {
    await formRef.value.validate();
    const api = props.isLawyerPage ? saveLawyer : saveCustomer;
    api(formData.value).then(() => {
      visible.value = false;
      emit('reload');
    });
    // saveBanner(bannerInfo.value).then(() => {
    //   emit('reload');
    //   visible.value = false;
    // });
  };
</script>
