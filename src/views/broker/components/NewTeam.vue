<template>
  <Modal
    class="with-padding"
    width="800px"
    v-model:visible="visible"
    :title="
      t(`common.${team ? 'edit' : 'create'}`, {
        name: t('routes.broker.teamList.dialogName'),
      })
    "
    @ok="handleSubmit"
  >
    <Form
      :model="formData"
      ref="formRef"
      :rules="formRules"
      :labelCol="{ style: { width: '100px' } }"
    >
      <Row :gutter="24">
        <Col :span="20">
          <Form.Item :label="t('routes.trade.newTrade.brokerCompany')" name="brokerCompanyId">
            <Select
              v-model:value="formData.brokerCompanyId"
              :options="brokerCompanyList"
              :fieldNames="{ label: 'name', value: 'id' }"
            />
          </Form.Item>
          <Form.Item :label="t('routes.broker.teamList.teamName')" name="teamName">
            <Input v-model:value="formData.teamName" />
          </Form.Item>
          <Form.Item
            :label="t('routes.trade.newTrade.commissionDistributeRate')"
            name="commissionDistributionRatio"
          >
            <Input v-model:value="formData.commissionDistributionRatio" />
          </Form.Item>
        </Col>
      </Row>
      <Row :gutter="24">
        <Col :span="20">
          <Form.Item :label="t('routes.broker.newBroker.teamMember')">
            <Table rowKey="brokerPersonId" :dataSource="teamMemberList" :pagination="false">
              <Table.Column :title="'Member Name'" dataIndex="brokerPersonName" />
              <Table.Column
                :title="t('routes.trade.newTrade.commissionDistributeRate')"
                dataIndex="commissionDistributionRatio"
              >
                <template #default="{ index }">
                  <Input v-model:value="teamMemberList[index].commissionDistributionRatio" />
                </template>
              </Table.Column>
              <Table.Column :title="t('common.action')">
                <template #default="{ index }">
                  <Button type="link" @click="handleDeleteMember(index)">{{
                    t('common.delText')
                  }}</Button>
                </template>
              </Table.Column>
            </Table>
          </Form.Item>
        </Col>
        <Col :span="4">
          <Button @click="handleAddMember">{{ t('routes.broker.teamList.addMember') }}</Button>
        </Col>
      </Row>
    </Form>
    <AddMemberModal
      :brokerCompanyId="formData.brokerCompanyId || 0"
      v-if="addMemberModalVisible"
      @hide="addMemberModalVisible = false"
      @new-members="handleAddMembers"
    />

    <!-- <template #footer>
      <Button type="primary" @click="handleSubmit">{{ t('common.confirmSubmitText') }}</Button>
    </template> -->
  </Modal>
</template>

<script lang="ts" setup>
  import { computed, ref, Ref } from 'vue';
  import { Modal, Input, Form, Table, Col, Row, Button, Select, message } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { getTeamDetail, saveTeam } from '/@/api/broker/team';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { ValidationRule } from 'ant-design-vue/es/form/Form';
  import AddMemberModal from './AddMemberModal.vue';
  import { getAllBrokerCompany } from '/@/api/brokerCompany';
  const { t } = useI18n();

  const props = defineProps<{
    team: TeamItem;
  }>();
  const emit = defineEmits<{
    (e: 'hide'): void;
    (e: 'reload'): void;
  }>();

  const brokerCompanyList = ref<AOptionItem[]>([]);
  getAllBrokerCompany().then((res) => {
    brokerCompanyList.value = res;
  });

  const teamMemberList = ref([] as BrokerTeamMember[]);
  const formData = ref<Partial<TeamItem>>({});
  if (props.team) {
    getTeamDetail(props.team.brokerTeamId).then(({ brokerTeamMemberQoList, ...teamInfo }) => {
      teamMemberList.value = brokerTeamMemberQoList;
      formData.value = teamInfo;
    });
  }
  const handleAddMembers = (members: BrokerTeamMember[]) => {
    const memberKeys = teamMemberList.value.reduce((acc, cur) => {
      acc[cur.brokerPersonId] = true;
      return acc;
    }, {});
    for (const member of members) {
      if (memberKeys[member.brokerPersonId]) {
        continue;
      }
      teamMemberList.value.push(member);
    }
  };
  const handleDeleteMember = (index: number) => {
    teamMemberList.value.splice(index, 1);
  };
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

  const addMemberModalVisible = ref(false);
  const handleAddMember = () => {
    if (!formData.value.brokerCompanyId) {
      message.warn(`${t('common.chooseText')}${t('routes.trade.newTrade.brokerCompany')}`);
      return;
    }
    addMemberModalVisible.value = true;
  };

  const formRef = ref<FormInstance>() as Ref<FormInstance>;
  // const handleCancelClick = () => {
  //   visible.value = false;
  // };
  const handleSubmit = async () => {
    await formRef.value.validate();
    saveTeam({ ...formData.value, brokerTeamMemberQoList: teamMemberList.value }).then(() => {
      visible.value = false;
      emit('reload');
    });
    // saveBanner(bannerInfo.value).then(() => {
    //   emit('reload');
    //   visible.value = false;
    // });
  };
</script>
