<template>
  <Modal
    class="with-padding"
    v-model:visible="visible"
    :title="t(props.banner ? 'common.edit' : 'common.add', { name: 'Banner' })"
    @ok="handleOkClick"
  >
    <Form
      :model="bannerInfo"
      ref="formRef"
      :rules="formRules"
      :labelCol="{ style: { width: '100px' } }"
    >
      <Form.Item :label="t('routes.sysConfig.banner.bannerName')" name="bannerName">
        <Input v-model:value="bannerInfo.bannerName" />
      </Form.Item>
      <Form.Item :label="t('routes.sysConfig.banner.pic')" name="fileModel">
        <FileUpload
          accept="image/*"
          v-model:file-list="bannerInfo.fileModel"
          :size="6"
          fileType="jpeg/png"
        >
          <Button type="primary">
            {{ t('common.selectFile') }}
          </Button>
          {{ t('routes.sysConfig.banner.picUploadTip') }}
        </FileUpload>
      </Form.Item>
      <Form.Item :label="t('routes.sysConfig.banner.picLink')" name="hrefType">
        <RadioGroup v-model:value="bannerInfo.hrefType" :options="jumpTypeOptions" />
      </Form.Item>
      <Form.Item :label="t('routes.sysConfig.banner.jumpLink')" name="href">
        <Input v-model:value="bannerInfo.href" />
      </Form.Item>
      <Form.Item :label="t('routes.sysConfig.banner.showOrder')" name="sort">
        <InputNumber v-model:value="bannerInfo.sort" :min="1" :max="99" />
      </Form.Item>
    </Form>
  </Modal>
</template>

<script lang="ts" setup>
  import { computed, watch, ref, Ref } from 'vue';
  import { Modal, Input, Button, Form, InputNumber, RadioGroup } from 'ant-design-vue';
  import FileUpload from '../../trade/FileUpload.vue';
  import { saveBanner } from '/@/api/sysConfig/banner';
  import type { FormInstance } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { ValidationRule } from 'ant-design-vue/es/form/Form';
  const { t } = useI18n();

  const props = defineProps({
    visible: { type: Boolean, default: false },
    banner: {
      type: Object,
    },
  });
  const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'reload'): void;
  }>();

  const bannerInfo = ref<BannerItem>({} as BannerItem);
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
      if (v) {
        bannerInfo.value = (props.banner ? { ...props.banner } : {}) as BannerItem;
      }
    },
  );

  const formRules = computed<Record<string, ValidationRule[]>>(() => ({
    bannerName: [
      {
        required: true,
        message: t('common.inputText') + t('routes.sysConfig.banner.bannerName'),
      },
    ],
    fileModel: [
      {
        required: true,
        message: t('common.chooseText') + t('routes.sysConfig.banner.pic'),
      },
    ],
    hrefType: [
      {
        required: true,
        message: t('common.chooseText') + t('routes.sysConfig.banner.picLink'),
      },
    ],
    href: [
      {
        required: !!bannerInfo.value.hrefType,
        message: t('common.inputText') + t('routes.sysConfig.banner.jumpLink'),
      },
    ],
    sort: [
      {
        required: true,
        message: t('common.inputText') + t('routes.sysConfig.banner.showOrder'),
      },
    ],
  }));

  // const currentPage = ref(1);
  const jumpTypeOptions = computed(() => [
    {
      value: 0,
      label: t('routes.sysConfig.banner.noJumpType'),
    },
    {
      value: 1,
      label: t('routes.sysConfig.banner.customJumpType'),
    },
  ]);

  const formRef = ref<FormInstance>() as Ref<FormInstance>;
  // const handleCancelClick = () => {
  //   visible.value = false;
  // };
  const handleOkClick = async () => {
    await formRef.value.validate();
    saveBanner(bannerInfo.value).then(() => {
      emit('reload');
      visible.value = false;
    });
  };
</script>

<style lang="less" scoped>
  .create-time {
    margin-right: 18px;
    font-weight: normal;
  }
</style>
