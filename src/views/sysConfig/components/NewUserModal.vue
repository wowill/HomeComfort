<template>
  <Modal
    class="with-padding"
    v-model:visible="visible"
    :title="
      t(`common.${user ? 'edit' : 'create'}`, {
        name: t('routes.sysConfig.account.account'),
      })
    "
  >
    <Form
      :model="formData"
      ref="formRef"
      :rules="formRules"
      :labelCol="{ style: { width: '100px' } }"
    >
      <Form.Item
        :label="t('routes.sysConfig.account.loginAccount')"
        name="email"
        v-if="props.user?.userId"
      >
        {{ formData.email }}
      </Form.Item>
      <template v-else>
        <Form.Item :label="t('routes.sysConfig.account.loginAccount')" name="email">
          <Input v-model:value="formData.email" />
        </Form.Item>
        <Form.Item :label="t('routes.sysConfig.account.newPwd')" name="loginPwd">
          <Input.Password v-model:value="formData.password" />
        </Form.Item>
      </template>
      <Form.Item :label="t('routes.sysConfig.account.selectRole')" name="roleIds">
        <Select v-model:value="formData.roleIds" mode="multiple">
          <Select.Option v-for="role in roles" :key="role.roleId" :value="role.roleId">
            {{ role.roleName }}
          </Select.Option>
        </Select>
      </Form.Item>
    </Form>
    <template #footer>
      <Button type="primary" @click="handleSubmit">{{ t('common.confirmSubmitText') }}</Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref } from 'vue';
  import { Modal, Input, Select, Button, Form } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { getRoleList, saveUser } from '/@/api/sysConfig/user.api';
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

  const formData = ref<UserFormData>(
    props.user
      ? {
          email: props.user.email,
          roleIds: props.user.roleIds ? props.user.roleIds.split(',').map((i) => +i) : [],
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

  const roles = ref<GetRoleListResult>([]);
  getRoleList().then((res) => {
    roles.value = res;
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
    const { roleIds, ...data } = formData.value;
    saveUser({ ...props.user, ...data, roleIds: roleIds ? roleIds.join(',') : '' }).then(() => {
      visible.value = false;
      emit('reload');
    });
    // saveBanner(bannerInfo.value).then(() => {
    //   emit('reload');
    //   visible.value = false;
    // });
  };
  interface UserFormData {
    email?: string;
    password?: string;
    roleIds?: number[];
  }
</script>
