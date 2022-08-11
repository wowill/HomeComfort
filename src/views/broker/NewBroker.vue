<template>
  <PageWrapper>
    <Form layout="horizontal" :model="formState" :label-col="{ style: { width: '120px' } }">
      <Row class="ant-form-item" v-if="isEditPage">
        <Col span="12">
          <div class="record-no">
            {{ t('routes.broker.list.brokerId') }}：{{ formState.brokerPersonId }}
          </div>
        </Col>
      </Row>
      <!-- <Row :gutter="64">
        <Col span="12">
          <FormItem :label="t('routes.broker.tradeList.takeEffectDate')">
            <DatePicker
              v-model:value="formState.effectiveDate"
              value-format="YYYY-MM-DD HH:mm:ss"
              :disabled="isEditPage"
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="t('routes.broker.tradeList.deadlineDate')">
            <DatePicker
              v-model:value="formState.abortDate"
              value-format="YYYY-MM-DD HH:mm:ss"
              :disabled="isEditPage"
            />
          </FormItem>
        </Col>
      </Row> -->
      <Card :title="t('routes.broker.newBroker.baseInfo')" :bordered="false">
        <Row :gutter="64">
          <Col span="12">
            <FormItem label="Last Name">
              <Input v-model:value="formState.lastName" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <Row :gutter="12">
              <Col span="20">
                <FormItem :label="t('routes.trade.newTrade.houseAddress')">
                  <Input v-model:value="formState.address" :placeholder="t('common.inputText')" />
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem>
                  <Input
                    v-model:value="formState.homeNumber"
                    :placeholder="t('common.inputText')"
                  />
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem label="First Name">
              <Input v-model:value="formState.firstName" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.whichCity')">
              <Input v-model:value="formState.city" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.brokerCompany')">
              <Select
                v-model:value="formState.brokerCompanyId"
                :placeholder="t('common.inputText')"
                @change="handleBrokerCompanyChange"
              >
                <SelectOption
                  v-for="company in brokerCompanies"
                  :key="company.id"
                  :value="company.id"
                  >{{ company.name }}</SelectOption
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.whichProvince')">
              <Input v-model:value="formState.province" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.broker.newBroker.hireDate')">
              <DatePicker
                v-model:value="formState.employTime"
                value-format="YYYY-MM-DD HH:mm:ss"
                :disabled="isEditPage"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.mailCode')">
              <Input v-model:value="formState.postCode" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.broker.list.telephone')">
              <Input v-model:value="formState.phone" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('common.state')">
              <Select v-model:value="formState.accountStatus" :placeholder="t('common.inputText')">
                <SelectOption v-for="state in stateList" :key="state.value" :value="state.value">{{
                  state.label
                }}</SelectOption>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="'Email'">
              <Input v-model:value="formState.email" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.broker.newBroker.role')">
              <Select
                v-model:value="formState.role"
                :placeholder="t('common.inputText')"
                mode="multiple"
              >
                <SelectOption v-for="role in roleList" :key="role.value" :value="role.value">{{
                  role.label
                }}</SelectOption>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.broker.list.loginAccount')">
              <Input v-model:value="formState.loginAccount" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card :title="t('routes.broker.newBroker.bankInfo')" :bordered="false">
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.broker.newBroker.receiveType')">
              <RadioGroup v-model:value="formState.paymentType">
                <Radio value="1">{{ t('routes.broker.newBroker.personalReceive') }}</Radio>
                <Radio value="2">{{ t('routes.broker.newBroker.thirdReceive') }}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.broker.newBroker.bankAccount')">
              <Input
                v-model:value="formState.taxBankAccount"
                :placeholder="t('common.ratePlaceholder')"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.broker.newBroker.bankName')">
              <Input
                v-model:value="formState.taxBankName"
                :placeholder="t('common.ratePlaceholder')"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.broker.newBroker.accountName')">
              <Input
                v-model:value="formState.taxAccountName"
                :placeholder="t('common.ratePlaceholder')"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="'SIN/SSN'">
              <Input
                v-model:value="formState.taxSinSsn"
                :placeholder="t('common.ratePlaceholder')"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="'HST'">
              <Input v-model:value="formState.taxHst" :placeholder="t('common.ratePlaceholder')" />
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card :title="t('routes.broker.newBroker.companyInfo')" :bordered="false">
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.broker.newBroker.commissionPlan')">
              <Input
                v-model:value="formState.commissionPlanId"
                :placeholder="t('common.inputText')"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.broker.newBroker.registerNo')">
              <Input
                v-model:value="formState.registrationNumber"
                :placeholder="t('common.inputText')"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="'License'">
              <Input v-model:value="formState.license" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.broker.newBroker.licenseExpireDate')">
              <DatePicker
                v-model:value="formState.licenseExpiredDate"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card :title="t('routes.broker.newBroker.teamInfo')" :bordered="false">
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.trade.tradeList.belongTeam')">
              <Input v-model:value="formState.teamName" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.commissionDistributeRate')">
              <Input
                v-model:value="formState.commissionDistributionRatio"
                :placeholder="t('common.inputText')"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.broker.newBroker.teamMember')">
              <Table rowKey="brokerPersonId" :dataSource="teamMemberList" :pagination="false">
                <Table.Column :title="'Member Name'" dataIndex="brokerPersonName" />
                <Table.Column
                  :title="t('routes.trade.newTrade.commissionDistributeRate')"
                  dataIndex="commissionDistributionRatio"
                />
              </Table>
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col :span="2" :offset="10">
          <Button @click="handleCancel">{{ t('common.cancelText') }}</Button>
        </Col>
        <Col :span="2">
          <Button type="primary" @click="handleSave">{{ t('common.confirmSubmitText') }}</Button>
        </Col>
      </Row>
    </Form>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { useI18n } from '/@/hooks/web/useI18n';
  import {
    Form,
    FormItem,
    Row,
    Col,
    Input,
    DatePicker,
    Button,
    Card,
    Select,
    SelectOption,
    Radio,
    RadioGroup,
    Table,
  } from 'ant-design-vue';
  import { getBrokerDetail, saveBroker, getTeamListByBrokerCompanyId } from '/@/api/broker/';
  // import FileUpload from '../trade/FileUpload.vue';
  // import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
  // import type { UploadRequestOption } from 'ant-design-vue/lib/vc-upload/interface';

  import { PageWrapper } from '/@/components/Page';
  import { reactive, ref } from 'vue';
  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import { getAllBrokerCompany } from '/@/api/brokerCompany';
  // import { uploadFile } from '/@/api/sys/file';
  import { useRoute, useRouter } from 'vue-router';
  const router = useRouter();
  const route = useRoute();

  const { t } = useI18n();

  const isEditPage = route.name === 'editBroker';

  const formState = ref<Partial<BrokerDetail>>({} as BrokerDetail);
  const teamMemberList = ref<BrokerTeamMember[]>([]);
  const stateList = reactive([
    {
      label: 'Active',
      value: 0,
    },
    {
      label: 'Terminated',
      value: 1,
    },
  ]);
  const roleList = reactive([
    {
      label: 'Sales Rep.',
      value: 0,
    },
    {
      label: 'Lease Rep.',
      value: 1,
    },
  ]);

  const brokerCompanies = ref<BrokerCompanyItem[]>([]);
  getAllBrokerCompany().then((res) => {
    brokerCompanies.value = res;
  });

  const teamList = ref<BrokerTeam[]>([]);
  const getTeamList = (brokerCompanyId: number) => {
    teamList.value = [];
    getTeamListByBrokerCompanyId(brokerCompanyId).then((res) => {
      teamList.value = res;
    });
  };

  if (isEditPage) {
    console.log(route.params.id);
    getBrokerDetail(route.params.id as string).then(({ brokerTeamMemberQoList, ...res }) => {
      formState.value = res;
      teamMemberList.value = brokerTeamMemberQoList;
      if (res.brokerCompanyId) {
        getTeamList(res.brokerCompanyId);
      }
    });
  }

  // const customFileUpload = (options: UploadRequestOption) => {
  //   return uploadFile({
  //     file: options.file as File,
  //   });
  // };
  const handleBrokerCompanyChange = (brokerCompanyId: number) => {
    console.log('brokerCompanyId', brokerCompanyId);
    teamMemberList.value = [];
    getTeamList(brokerCompanyId);
  };

  const tabStore = useMultipleTabStore();

  const handleCancel = () => {
    tabStore.closeTabByKey(route.path, router);
  };
  const handleSave = () => {
    saveBroker(formState.value).then(() => {
      tabStore.closeTabByKey(route.path, router);
    });
  };
</script>
