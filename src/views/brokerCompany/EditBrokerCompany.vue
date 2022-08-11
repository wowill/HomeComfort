<template>
  <PageWrapper>
    <Form layout="horizontal" :model="formState" :label-col="{ style: { width: '120px' } }">
      <Row class="ant-form-item" v-if="isEditPage">
        <Col span="12">
          <div class="record-no"> ID：{{ formState.brokerCompanyId }} </div>
        </Col>
      </Row>
      <Card :title="t('routes.broker.newBroker.baseInfo')" :bordered="false">
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.brokerCompany.list.companyName')">
              <Input v-model:value="formState.companyName" :placeholder="t('common.inputText')" />
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
            <FormItem :label="t('routes.brokerCompany.list.telephone')">
              <Input v-model:value="formState.phone" :placeholder="t('common.inputText')" />
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
            <FormItem :label="'Fax'">
              <Input v-model:value="formState.fax" :placeholder="t('common.inputText')" />
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
            <FormItem :label="t('routes.broker.list.loginAccount')">
              <Input v-model:value="formState.loginAccount" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.mailCode')">
              <Input v-model:value="formState.postCode" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card :title="t('routes.brokerCompany.editBrokerCompany.taxInfo')" :bordered="false">
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.brokerCompany.editBrokerCompany.accountName')">
              <Input
                v-model:value="formState.taxAccountName"
                :placeholder="t('common.inputText')"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.brokerCompany.editBrokerCompany.bankAccount')">
              <Input
                v-model:value="formState.taxBankAccount"
                :placeholder="t('common.inputText')"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.brokerCompany.editBrokerCompany.openBank')">
              <Input v-model:value="formState.taxBankName" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="'HST'">
              <Input v-model:value="formState.taxHst" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.brokerCompany.editBrokerCompany.bankCode')">
              <Input
                v-model:value="formState.taxBankCode"
                :placeholder="t('common.ratePlaceholder')"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.brokerCompany.editBrokerCompany.rate')">
              <Input v-model:value="formState.taxRate" :placeholder="t('common.ratePlaceholder')" />
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
  import { Form, FormItem, Row, Col, Input, Button, Card } from 'ant-design-vue';
  import { getBrokerCompanyDetail, saveBrokerCompany } from '/@/api/brokerCompany';
  // import FileUpload from '../trade/FileUpload.vue';
  // import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
  // import type { UploadRequestOption } from 'ant-design-vue/lib/vc-upload/interface';

  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import { getAllBrokerCompany } from '/@/api/brokerCompany';
  // import { uploadFile } from '/@/api/sys/file';
  import { useRoute, useRouter } from 'vue-router';
  const router = useRouter();
  const route = useRoute();

  const { t } = useI18n();

  // const isEditPage = route.name === 'editBroker';
  const isEditPage = true;

  const formState = ref<BrokerCompanyItem>({} as BrokerCompanyItem);

  const brokerCompanies = ref<BrokerCompanyItem[]>([]);
  getAllBrokerCompany().then((res) => {
    brokerCompanies.value = res;
  });

  if (isEditPage) {
    getBrokerCompanyDetail(route.params.id as string).then((res) => {
      formState.value = res;
    });
  }

  const tabStore = useMultipleTabStore();

  const handleCancel = () => {
    tabStore.closeTabByKey(route.path, router);
  };
  const handleSave = () => {
    saveBrokerCompany(formState.value).then(() => {
      tabStore.closeTabByKey(route.path, router);
    });
  };
</script>
