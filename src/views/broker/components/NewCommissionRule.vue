<template>
  <Modal
    class="with-padding"
    width="800px"
    v-model:visible="visible"
    :title="
      t(`common.${rule ? 'edit' : 'create'}`, {
        name: t('routes.broker.rule.name'),
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
          <Form.Item :label="t('routes.broker.rule.ruleName')" name="commissionRuleName">
            <Input v-model:value="formData.commissionRuleName" />
          </Form.Item>
          <Form.Item :label="t('routes.broker.rule.ruleType')" name="commissionRuleType">
            <Select :options="commissionRuleTypeList" v-model:value="formData.commissionRuleType" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <Table :columns="tableColumns" :data-source="ruleList" :pagination="false" />

    <Card>
      <Form :model="newAddRuleItem" ref="newAddFormRef" :labelCol="{ style: { width: '100px' } }">
        <template v-for="inputItem in inputItems" :key="inputItem.dataIndex">
          <Row :gutter="24">
            <template v-if="inputItem.dataIndex === 'intervalStart'">
              <Col :span="10">
                <Form.Item :label="inputItem.title" :name="inputItem.dataIndex">
                  <Input
                    v-model:value="newAddRuleItem[inputItem.dataIndex]"
                    :placeholder="inputItem.placeholder"
                  />
                </Form.Item>
              </Col>
              <Col :span="10">
                <Form.Item
                  label="TO"
                  :name="'intervalEnd'"
                  :labelCol="{ style: { width: '30px' } }"
                >
                  <Input
                    v-model:value="newAddRuleItem.intervalEnd"
                    :placeholder="inputItem.endPlaceholder"
                  />
                </Form.Item>
              </Col>
            </template>
            <Col :span="20" v-else>
              <Form.Item :label="inputItem.title" :name="inputItem.dataIndex">
                <Input
                  v-model:value="newAddRuleItem[inputItem.dataIndex]"
                  :placeholder="inputItem.placeholder"
                />
              </Form.Item>
            </Col>
          </Row>
        </template>
        <Row justify="center">
          <Button type="primary" @click="handleAddRule">
            {{ t('common.add') }}
          </Button>
        </Row>
      </Form>
    </Card>

    <!-- <template #footer>
      <Button type="primary" @click="handleSubmit">{{ t('common.confirmSubmitText') }}</Button>
    </template> -->
  </Modal>
</template>

<script lang="tsx" setup>
  import { computed, ref, Ref } from 'vue';
  import { Modal, Input, Form, Table, Col, Row, Button, Card, Select } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { getCommissionRuleDetail, saveCommissionRuleDetail } from '/@/api/broker';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { ValidationRule } from 'ant-design-vue/es/form/Form';
  import type { ColumnType } from 'ant-design-vue/lib/table';
  const { t } = useI18n();

  const props = defineProps<{
    rule?: CommissionRuleItem;
  }>();
  const emit = defineEmits<{
    (e: 'hide'): void;
    (e: 'reload'): void;
  }>();

  const visible = computed({
    get() {
      return true;
    },
    set() {
      emit('hide');
    },
  });

  const formData = ref({} as Omit<CommissionRuleDetail, 'commissionRuleItemList'>);
  const ruleList = ref<CommissionRuleItemListItem[]>([]);
  if (props.rule) {
    getCommissionRuleDetail(props.rule.commissionRuleId).then(
      ({ commissionRuleItemList, ...detail }) => {
        formData.value = detail;
        ruleList.value = commissionRuleItemList;
      },
    );
  }
  const commissionRuleTypeList = computed(() => [
    {
      value: '1',
      label: t('routes.broker.rule.ruleTypeByRange'),
    },
    {
      value: '2',
      label: t('routes.broker.rule.ruleTypeByArea'),
    },
    {
      value: '3',
      label: t('routes.broker.rule.ruleTypeByReachLine'),
    },
  ]);

  const newAddRuleItem = ref({} as CommissionRuleItemListItem);
  const handleAddRule = () => {
    ruleList.value.push(newAddRuleItem.value);
    newAddRuleItem.value = {} as CommissionRuleItemListItem;
  };

  const formRules = computed<Record<string, ValidationRule | ValidationRule[]>>(() => ({
    lastName: [
      {
        required: true,
        message: t('common.inputText') + 'Last Name',
      },
    ],
  }));

  const indexColumn: TColumns = {
    title: t('component.table.index'),
    dataIndex: 'index',
    hideInAdd: true,
    customRender: ({ index }) => index + 1,
  };
  const tableColumns = computed(() => {
    let columns: TColumns[] = [];
    if (formData.value.commissionRuleType === '1') {
      columns = [
        indexColumn,
        {
          title: t('routes.broker.rule.range'),
          dataIndex: 'intervalStart',
          placeholder: t('common.inputText') + t('routes.broker.rule.rangeStart'),
          endPlaceholder: t('common.inputText') + t('routes.broker.rule.rangeEnd'),
          customRender({ record }) {
            return record.intervalStart + ' ~ ' + record.intervalEnd;
          },
        },
      ];
    } else if (formData.value.commissionRuleType === '2') {
      columns = [
        {
          title: t('routes.broker.rule.nthYear'),
          dataIndex: 'areaYearNumber',
          placeholder: t('common.inputText') + t('common.inputNumber'),
        },
        {
          title: t('routes.broker.rule.rentPerFeet'),
          dataIndex: 'areaRentPerSquareFoot',
          placeholder: t('common.inputText'),
        },
        {
          title: t('routes.broker.rule.totalRatio'),
          dataIndex: 'areaTotalCommission',
          placeholder: t('common.ratePlaceholder'),
        },
      ];
    } else if (formData.value.commissionRuleType === '3') {
      columns = [
        indexColumn,
        {
          title: t('routes.broker.rule.reachLine'),
          dataIndex: 'singlelReachValue',
          placeholder: t('common.inputText') + t('common.inputNumber'),
        },
      ];
    }
    return columns.concat([
      {
        title: t('routes.broker.rule.sellerFeeRatio'),
        dataIndex: 'sellerCommissionRate',
        placeholder: t('common.ratePlaceholder'),
      },
      {
        title: t('routes.broker.rule.buyerFeeRatio'),
        dataIndex: 'buyerCommissionRate',
        placeholder: t('common.ratePlaceholder'),
      },
      {
        title: t('common.action'),
        dataIndex: 'action',
        hideInAdd: true,
        customRender({ index }) {
          return (
            <Button type="link" onClick={() => deleteTableData(index)}>
              {t('common.delText')}
            </Button>
          );
        },
      },
    ]);
  });
  const deleteTableData = (index: number) => {
    ruleList.value.splice(index, 1);
  };
  const inputItems = computed(() => tableColumns.value.filter(({ hideInAdd }) => !hideInAdd));

  const formRef = ref<FormInstance>() as Ref<FormInstance>;
  // const handleCancelClick = () => {
  //   visible.value = false;
  // };
  const handleSubmit = async () => {
    await formRef.value.validate();
    saveCommissionRuleDetail({ ...formData.value, commissionRuleItemList: ruleList.value }).then(
      () => {
        visible.value = false;
        emit('reload');
      },
    );
    // saveBanner(bannerInfo.value).then(() => {
    //   emit('reload');
    //   visible.value = false;
    // });
  };
  interface TColumns extends ColumnType {
    placeholder?: string;
    endPlaceholder?: string;
    dataIndex: keyof CommissionRuleItemListItem | 'action' | 'index';
    hideInAdd?: true;
  }
</script>
