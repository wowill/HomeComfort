<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="email" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.email"
          :placeholder="t('sys.login.emailPlaceholder')"
        />
      </FormItem>

      <!-- <FormItem name="mobile" class="enter-x">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem> -->
      <FormItem name="emailCode" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.emailCode"
          :placeholder="t('sys.login.emailCodePlaceholder')"
          :sendCodeApi="getVerifyCode"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <InputPassword
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.passwordPlaceholder')"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPasswordPlaceholder')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleSubmit" :loading="loading">
          {{ t('sys.login.confirmSubmit') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum, useFormValid } from './useLogin';
  import { getMailVerifyCode, resetPassword } from '/@/api/sys/user';
  // import { useMessage } from '/@/hooks/web/useMessage';
  const InputPassword = Input.Password;
  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState, setLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    email: '',
    emailCode: '',
    password: '',
    confirmPassword: '',
  });

  const { getFormRules } = useFormRules(formData);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.FORGET_PASSWORD);

  function getVerifyCode() {
    console.log('formData.value.email', formData.email);
    if (!formData.email) {
      return Promise.reject();
    }
    return getMailVerifyCode(formData.email);
  }

  // const { createWarningModal } = useMessage();
  const { validForm } = useFormValid(formRef);
  async function handleSubmit() {
    const data = await validForm();
    console.log(data);
    await resetPassword(data);
    setLoginState(LoginStateEnum.LOGIN);
  }
</script>
