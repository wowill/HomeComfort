<template>
  <Modal
    class="with-padding"
    v-model:visible="visible"
    :title="t('routes.broker.teamList.addMember')"
    @ok="handleSubmit"
  >
    <Form :model="formData" ref="formRef" :labelCol="{ style: { width: '100px' } }">
      <Form.Item :label="t('routes.broker.list.brokerName')" name="brokers">
        <Select
          mode="tags"
          :options="brokerList"
          v-model:value="formData.brokers"
          :fieldNames="{ label: 'name', value: 'id' }"
        />
      </Form.Item>
    </Form>
  </Modal>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref } from 'vue';
  import { Modal, Form, Select } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { getBrokerListByBrokerCompanyId } from '/@/api/broker';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();

  const props = defineProps<{
    brokerCompanyId: number;
  }>();
  const emit = defineEmits<{
    (e: 'hide'): void;
    (e: 'newMembers', members: BrokerTeamMember[]): void;
  }>();

  const brokerList = ref<AOptionItem[]>([]);
  const brokerIdMap: Record<string, BrokerTeamMember> = {};
  getBrokerListByBrokerCompanyId(props.brokerCompanyId).then((res) => {
    brokerList.value = res;
    for (const item of res) {
      brokerIdMap[item.id] = {
        brokerPersonId: item.id,
        brokerPersonName: item.name,
        commissionDistributionRatio: '',
      };
    }
  });
  const formData = ref({
    brokers: [],
  });
  const visible = computed({
    get() {
      return true;
    },
    set() {
      emit('hide');
    },
  });

  const formRef = ref<FormInstance>() as Ref<FormInstance>;
  // const handleCancelClick = () => {
  //   visible.value = false;
  // };
  const handleSubmit = async () => {
    console.log(formData.value);
    emit(
      'newMembers',
      formData.value.brokers.map((id) => ({ ...brokerIdMap[id] })),
    );
    visible.value = false;
    // await formRef.value.validate();
    // saveTeam(formData.value).then(() => {
    //   visible.value = false;
    //   emit('reload');
    // });
    // saveBanner(bannerInfo.value).then(() => {
    //   emit('reload');
    //   visible.value = false;
    // });
  };
</script>
