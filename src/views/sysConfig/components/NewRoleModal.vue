<template>
  <Modal
    class="with-padding"
    v-model:visible="visible"
    :title="
      t(`common.${role ? 'edit' : 'create'}`, {
        name: t('routes.sysConfig.role.role'),
      })
    "
  >
    <Form
      :model="formData"
      ref="formRef"
      :rules="formRules"
      :labelCol="{ style: { width: '100px' } }"
    >
      <Form.Item :label="t('routes.sysConfig.role.roleName')" name="email">
        <Input v-model:value="formData.roleName" />
      </Form.Item>
      <Form.Item :label="t('routes.sysConfig.role.selectMenu')" name="roleIds">
        <Tree
          :treeData="menuTree"
          :fieldNames="{ key: 'id' }"
          v-model:checkedKeys="selectedMenu"
          checkable
          checkStrictly
        >
          <template #title="treeData">{{ t(treeData.i18n) }}</template>
        </Tree>
      </Form.Item>
    </Form>
    <template #footer>
      <Button type="primary" @click="handleSubmit">{{ t('common.confirmSubmitText') }}</Button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref } from 'vue';
  import { Modal, Input, Tree, Button, Form } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { getAllMenuTree, getRoleDetail, saveRole } from '/@/api/sysConfig/role.api';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { ValidationRule } from 'ant-design-vue/es/form/Form';
  const { t } = useI18n();

  const props = defineProps<{
    role?: RoleItem;
  }>();
  const emit = defineEmits<{
    (e: 'hide'): void;
    (e: 'reload'): void;
  }>();

  const formData = ref<Omit<SaveRoleInfo, 'powerList'>>(
    props.role
      ? {
          roleName: props.role.roleName,
          roleId: props.role.roleId,
        }
      : { roleName: '' },
  );
  const visible = computed({
    get() {
      return true;
    },
    set() {
      emit('hide');
    },
  });

  const selectedMenu = ref<{
    checked: number[];
    halfChecked: number[];
  }>({
    checked: [],
    halfChecked: [],
  });
  const menuTree = ref<RoleMenuTree>([]);
  getAllMenuTree().then((res) => {
    menuTree.value = res;
  });
  if (props.role) {
    getRoleDetail(props.role.roleId).then((res) => {
      selectedMenu.value.checked = res.powerList;
    });
  }

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
    saveRole({ ...formData.value, powerList: selectedMenu.value.checked }).then(() => {
      visible.value = false;
      emit('reload');
    });
    // saveBanner(bannerInfo.value).then(() => {
    //   emit('reload');
    //   visible.value = false;
    // });
  };
</script>
