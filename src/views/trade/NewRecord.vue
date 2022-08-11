<template>
  <PageWrapper>
    <Form layout="horizontal" :model="formState">
      <Row class="ant-form-item" v-if="isEditPage">
        <Col span="12">
          <div class="record-no">
            {{ t('routes.trade.tradeList.tradeNo') }}：{{ formState.transactionId }}
          </div>
        </Col>
      </Row>
      <Row :gutter="64">
        <Col span="12">
          <FormItem :label="t('routes.trade.tradeList.takeEffectDate')">
            <DatePicker
              v-model:value="formState.effectiveDate"
              value-format="YYYY-MM-DD HH:mm:ss"
              :disabled="isEditPage"
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="t('routes.trade.tradeList.deadlineDate')">
            <DatePicker
              v-model:value="formState.abortDate"
              value-format="YYYY-MM-DD HH:mm:ss"
              :disabled="isEditPage"
            />
          </FormItem>
        </Col>
      </Row>
      <Card :title="t('routes.trade.newTrade.houseInfo')" :bordered="false">
        <Row :gutter="64">
          <Col span="12">
            <Row :gutter="12">
              <Col span="20">
                <FormItem :label="t('routes.trade.newTrade.houseAddress')">
                  <Input
                    v-model:value="formState.estateAddress"
                    :placeholder="t('common.inputText')"
                  />
                </FormItem>
              </Col>
              <Col span="4">
                <FormItem>
                  <Input
                    v-model:value="formState.houseNumber"
                    :placeholder="t('common.inputText')"
                  />
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.tradeType')">
              <Select v-model:value="formState.transactionType">
                <SelectOption v-for="st in tradeTypeList" :key="st.value" :value="st.value">
                  {{ st.label }}
                </SelectOption>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.whichCity')">
              <Input v-model:value="formState.city" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.rentPrice')">
              <Input v-model:value="formState.rentSellPrice" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.whichProvince')">
              <Input v-model:value="formState.province" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.taxRate')">
              <Input v-model:value="formState.taxRate" :placeholder="t('common.ratePlaceholder')" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.mailCode')">
              <Input v-model:value="formState.postCode" :placeholder="t('common.inputText')" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.note')">
              <TextArea
                v-model:value="formState.mark"
                :placeholder="t('routes.trade.newTrade.notePlaceholder')"
                :maxlength="255"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.uploadPic')">
              <FileUpload
                accept="image/*"
                :preview="true"
                :limit="9"
                v-model:file-list="formState.hrefUrlsList"
              >
                <Button type="primary">
                  {{ t('common.selectFile') }}
                </Button>
                {{ t('routes.trade.newTrade.uploadPicTip') }}
              </FileUpload>
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card :title="t('routes.trade.newTrade.commissionInfo')" :bordered="false">
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.commissionType')">
              <RadioGroup v-model:value="formState.brokerageCalType">
                <Radio value="1">{{ t('routes.trade.newTrade.commissionType1') }}</Radio>
                <Radio value="2">{{ t('routes.trade.newTrade.commissionType2') }}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.commissionRate')">
              <Input
                v-model:value="formState.brokerageRate"
                :placeholder="t('common.ratePlaceholder')"
              />
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Row :gutter="64">
        <Col span="12">
          <Card :title="t('routes.trade.newTrade.sellerInfo')" :bordered="false">
            <FormItem :label="t('routes.trade.newTrade.sellerName')">
              <Input v-model:value="formState.sellerName" :placeholder="t('common.inputText')" />
            </FormItem>
            <FormItem :label="t('routes.trade.newTrade.lowerName')">
              <Input v-model:value="formState.sellerLawyer" :placeholder="t('common.inputText')" />
            </FormItem>
            <FormItem :label="t('routes.trade.newTrade.lowerPhone')">
              <Input
                v-model:value="formState.sellerLawyerPhone"
                :placeholder="t('common.inputText')"
              />
            </FormItem>
            <FormItem :label="t('common.uploadFile')">
              <FileUpload v-model:file-list="formState.sellerFilePathModel">
                <Button type="primary">
                  {{ t('common.uploadFile') }}
                </Button>
                {{ t('common.uploadFileType', { type: 'word' }) }}
              </FileUpload>
            </FormItem>
          </Card>
        </Col>
        <Col span="12">
          <Card :title="t('routes.trade.newTrade.buyerInfo')" :bordered="false">
            <FormItem :label="t('routes.trade.newTrade.buyerName')">
              <Input v-model:value="formState.buyerName" :placeholder="t('common.inputText')" />
            </FormItem>
            <FormItem :label="t('routes.trade.newTrade.lowerName')">
              <Input v-model:value="formState.buyerLawyer" :placeholder="t('common.inputText')" />
            </FormItem>
            <FormItem :label="t('routes.trade.newTrade.lowerPhone')">
              <Input
                v-model:value="formState.buyerLawyerPhone"
                :placeholder="t('common.inputText')"
              />
            </FormItem>
            <FormItem :label="t('common.uploadFile')">
              <FileUpload v-model:file-list="formState.buyerFilePathModel">
                <Button type="primary">
                  {{ t('common.uploadFile') }}
                </Button>
                {{ t('common.uploadFileType', { type: 'word' }) }}
              </FileUpload>
            </FormItem>
          </Card>
        </Col>
      </Row>
      <Row :gutter="64">
        <Col span="12">
          <Card :title="t('routes.trade.newTrade.sellerBrokerInfo')" :bordered="false">
            <FormItem :label="t('routes.trade.newTrade.brokerCompany')">
              <Select
                v-model:value="formState.sellerBrokerCompanyId"
                :placeholder="t('common.chooseText')"
              >
                <SelectOption
                  v-for="company in brokerCompanies"
                  :key="company.id"
                  :value="company.id"
                  >{{ company.name }}</SelectOption
                >
              </Select>
            </FormItem>
            <FormItem :label="t('routes.trade.newTrade.broker')">
              <Select
                :options="sellerBrokerList"
                v-model:value="formState.sellerBrokerPersonId"
                :fieldNames="{ label: 'name', value: 'id' }"
                :placeholder="t('common.chooseText')"
              />
            </FormItem>
            <FormItem :label="t('routes.trade.newTrade.commissionDistributeRate')">
              <Input
                v-model:value="formState.sellerBrokerBrokerageRate"
                :placeholder="t('common.ratePlaceholder')"
              />
            </FormItem>
            <FormItem :label="t('common.uploadFile')">
              <FileUpload v-model:file-list="formState.sellerBrokerFilePathModel">
                <Button type="primary">
                  {{ t('common.uploadFile') }}
                </Button>
                {{ t('common.uploadFileType', { type: 'word' }) }}
              </FileUpload>
            </FormItem>
          </Card>
        </Col>
        <Col span="12">
          <Card :title="t('routes.trade.newTrade.buyerBrokerInfo')" :bordered="false">
            <FormItem :label="t('routes.trade.newTrade.brokerCompany')">
              <Select
                v-model:value="formState.buyerBrokerCompanyId"
                :placeholder="t('common.chooseText')"
              >
                <SelectOption
                  v-for="company in brokerCompanies"
                  :key="company.id"
                  :value="company.id"
                  >{{ company.name }}</SelectOption
                >
              </Select>
            </FormItem>
            <FormItem :label="t('routes.trade.newTrade.broker')">
              <Select
                :options="buyerBrokerList"
                v-model:value="formState.buyerBrokerPersonId"
                :fieldNames="{ label: 'name', value: 'id' }"
                :placeholder="t('common.chooseText')"
              />
            </FormItem>
            <FormItem :label="t('routes.trade.newTrade.commissionDistributeRate')">
              <Input
                v-model:value="formState.buyerBrokerBrokerageRate"
                :placeholder="t('common.ratePlaceholder')"
              />
            </FormItem>
            <FormItem :label="t('common.uploadFile')">
              <FileUpload v-model:file-list="formState.buyerBrokerFilePathModel">
                <Button type="primary">
                  {{ t('common.uploadFile') }}
                </Button>
                {{ t('common.uploadFileType', { type: 'word' }) }}
              </FileUpload>
            </FormItem>
          </Card>
        </Col>
      </Row>
      <Card :title="t('routes.trade.newTrade.depositInfo')" :bordered="false">
        <Row :gutter="64">
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.depositDepository')">
              <Input
                v-model:value="formState.depositCustody"
                :placeholder="t('common.inputText')"
              />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="t('routes.trade.newTrade.depositAmount')">
              <Input v-model:value="formState.depositAmount" :placeholder="t('common.inputText')" />
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
  } from 'ant-design-vue';
  import FileUpload from './FileUpload.vue';
  // import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
  // import type { UploadRequestOption } from 'ant-design-vue/lib/vc-upload/interface';

  import { PageWrapper } from '/@/components/Page';
  import { reactive, ref, watch } from 'vue';
  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import { getRecordDetail, saveRecord } from '/@/api/trade';
  import { getAllBrokerCompany } from '/@/api/brokerCompany';
  // import { uploadFile } from '/@/api/sys/file';
  import { useRoute, useRouter } from 'vue-router';
  import { getBrokerListByBrokerCompanyId } from '/@/api/broker';
  const router = useRouter();
  const route = useRoute();

  const TextArea = Input.TextArea;

  const { t } = useI18n();

  const isEditPage = route.name === 'editRecord';

  const formState = ref<GetRecordDetail>({} as GetRecordDetail);
  const tradeTypeList = reactive([
    {
      label: '全部',
      value: 0,
    },
    {
      label: '销售',
      value: 1,
    },
    {
      label: '租赁',
      value: 2,
    },
  ]);

  const buyerBrokerList = ref<AOptionItem[]>([]);
  const sellerBrokerList = ref<AOptionItem[]>([]);

  watch(
    () => formState.value.buyerBrokerCompanyId,
    (companyId, oldValue) => {
      if (!companyId) {
        return;
      }
      if (oldValue) {
        formState.value.buyerBrokerPersonId = undefined;
      }
      getBrokerListByBrokerCompanyId(companyId).then((res) => {
        buyerBrokerList.value = res;
      });
    },
    { immediate: true },
  );
  watch(
    () => formState.value.sellerBrokerCompanyId,
    (companyId, oldValue) => {
      if (!companyId) {
        return;
      }
      if (oldValue) {
        formState.value.sellerBrokerPersonId = undefined;
      }
      getBrokerListByBrokerCompanyId(companyId).then((res) => {
        sellerBrokerList.value = res;
      });
    },
    { immediate: true },
  );

  const brokerCompanies = ref<AOptionItem[]>([]);
  getAllBrokerCompany().then((res) => {
    brokerCompanies.value = res;
  });

  if (isEditPage) {
    console.log(route.params.id);
    getRecordDetail(route.params.id as string).then((res) => {
      formState.value = res;
    });
  }

  // const customFileUpload = (options: UploadRequestOption) => {
  //   return uploadFile({
  //     file: options.file as File,
  //   });
  // };

  const tabStore = useMultipleTabStore();

  const handleCancel = () => {
    tabStore.closeTabByKey(route.path, router);
  };
  const handleSave = () => {
    saveRecord(formState.value).then(() => {
      tabStore.closeTabByKey(route.path, router);
    });
  };
</script>
