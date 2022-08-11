<template>
  <div class="text-center">
    <h2 class="mb-3 text-3xl font-bold text-center xl:text-3xl enter-x">
      {{ title }}
    </h2>
    <h2
      class="mb-8 text-2xl text-center xl:text-3xl enter-x text-primary border-b border-primary inline-block px-4 pb-6px"
    >
      {{ getFormTitle }}
    </h2>
  </div>
</template>
<script lang="ts" setup>
  import { useGlobSetting } from '/@/hooks/setting';
  import { computed, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { LoginStateEnum, useLoginState } from './useLogin';
  const { title } = useGlobSetting();

  const { t } = useI18n();

  const { getLoginState } = useLoginState();

  const getFormTitle = computed(() => {
    const titleObj = {
      [LoginStateEnum.FORGET_PASSWORD]: t('sys.login.forgetFormTitle'),
      [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),
      [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
      [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormTitle'),
      [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormTitle'),
    };
    return titleObj[unref(getLoginState)];
  });
</script>
