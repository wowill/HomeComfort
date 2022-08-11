<template>
  <PageWrapper>
    <template #headerContent>
      <Form layout="horizontal" :model="params" ref="headerFormRef">
        <Row :gutter="32">
          <Col :span="7">
            <FormItem :label="t('routes.sysConfig.account.account')" name="userName">
              <Input v-model:value="params.userName" />
            </FormItem>
          </Col>
          <Col :span="7">
            <FormItem :label="t('common.state')">
              <Select v-model:value="params.enable" :options="enableList" name="enable" />
            </FormItem>
          </Col>
          <Col :span="7">
            <FormItem :label="t('common.createDate')" name="createTime">
              <DatePicker.RangePicker
                v-model:value="params.createTime"
                :valueFormat="dateValueFormat"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="32">
          <Col :span="7">
            <FormItem :label="t('common.creator')" name="createUserName">
              <Input v-model:value="params.createUserName" />
            </FormItem>
          </Col>
          <Col :span="7">
            <FormItem :label="t('common.updater')" name="editUserName">
              <Input v-model:value="params.editUserName" />
            </FormItem>
          </Col>
          <Col :span="7">
            <FormItem :label="t('common.updateDate')" name="editTime">
              <DatePicker.RangePicker
                v-model:value="params.editTime"
                :valueFormat="dateValueFormat"
              />
            </FormItem>
          </Col>
          <Col :span="3">
            <Button type="primary" @click="getRecords()">{{ t('common.queryText') }}</Button>
            <Button type="primary" @click="handleResetClick">{{ t('common.resetText') }}</Button>
          </Col>
        </Row>
        <Row v-if="pageFn.add">
          <Col :span="10">
            <Button type="primary" @click="handleCreateClick">
              <template #icon><PlusOutlined /></template>
              {{ t('common.create', { name: t('routes.sysConfig.account.account') }) }}</Button
            >
          </Col>
        </Row>
      </Form>
    </template>
    <VTableVue
      :total="total"
      :columns="columns"
      :dataSource="records"
      :actionColumnWidth="250"
      :rowSelection="rowSelection"
      :headerPagination="false"
      rowKey="transactionId"
      @page-change="onPageChange"
    >
      <template #actionBodyColumn="{ record }">
        <Button
          class="action-btn"
          type="link"
          @click="handleEditClick(record)"
          v-if="pageFn.edit"
          >{{ t('common.edit') }}</Button
        >
        <Button
          class="action-btn"
          type="link"
          @click="handleToggleUserState(record)"
          v-if="pageFn.disable"
          >{{ record.enable ? t('common.disableText') : t('common.enableText') }}</Button
        >
        <Button
          class="action-btn"
          type="link"
          @click="handleResetUserPwd(record)"
          v-if="pageFn.resetPwd"
          >{{ t('routes.sysConfig.account.resetPwd') }}</Button
        >
        <Button class="action-btn" type="link" @click="handleLoginLogClick(record)">{{
          t('routes.sysConfig.account.loginLog')
        }}</Button>
      </template>
      <template #bodyColumn="{ column, text }">
        <!-- <template v-if="column.key === 'deadlineDate' || column.key === 'takeEffectDate'">
          {{ formatDate(text) }}
        </template> -->
        <template v-if="column.dataIndex === 'enable'">
          {{ text ? t('common.enableText') : t('common.disableText') }}
        </template>
      </template>
    </VTableVue>
    <component
      v-if="visibleModal"
      :is="visibleModal"
      :user="visibleModalUser"
      @hide="visibleModal = undefined"
      @reload="getRecords()"
    />
    <!-- <RecordNoteModal :id="noteModalId" v-model:visible="noteModalVisible" /> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Form, FormItem, Row, Col, Input, Button, Select, DatePicker } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { ref, shallowRef, computed, Ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { getPagedUserList, changeUserState } from '/@/api/sysConfig/user.api';
  import { createUseRecords } from '/@/utils/my/useRecords';
  import VTableVue, { VTableColumnType } from '../trade/VTable.vue';
  import ResetPwdModal from './components/ResetPwdModal.vue';
  import NewUserModal from './components/NewUserModal.vue';
  import LoginLogModal from './components/LoginLogModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import usePageFn from '/@/utils/my/usePageFn';
  const pageFn = usePageFn();
  const { t } = useI18n();

  // const RadioButton = Radio.Button;
  const dateValueFormat = 'YYYY-MM-DD';
  // const tradeType = ref('');
  const enableList = computed(() => [
    {
      label: t('common.enableText'),
      value: 1,
    },
    {
      label: t('common.disableText'),
      value: 0,
    },
  ]);
  const columns = computed<VTableColumnType[]>(() => [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      visible: true,
    },
    {
      title: t('routes.sysConfig.account.account'),
      dataIndex: 'email',
      key: 'email',
      visible: true,
    },
    {
      title: t('routes.sysConfig.account.role'),
      dataIndex: 'roleNames',
      visible: true,
    },
    {
      title: t('common.creator'),
      dataIndex: 'createUserName',
      visible: true,
    },
    {
      title: t('common.createTime'),
      dataIndex: 'createTime',
      visible: true,
    },
    {
      title: t('common.updater'),
      dataIndex: 'editeUserName',
      visible: true,
      // width: 150,
    },
    {
      title: t('common.updateTime'),
      dataIndex: 'editTime',
      visible: true,
    },
    {
      title: t('common.state'),
      dataIndex: 'enable',
      visible: true,
    },
  ]);

  const { total, params, records, getRecords, rowSelection } =
    createUseRecords<UserItem[]>()(getPagedUserList);

  getRecords();

  const onPageChange = (page: number, pageSize: number) => {
    params.value.page = page;
    params.value.limit = pageSize;
    getRecords();
  };

  const headerFormRef = ref<FormInstance>() as Ref<FormInstance>;
  const handleResetClick = () => {
    params.value = {};
    headerFormRef.value.resetFields();
  };
  const handleToggleUserState = (user: UserItem) => {
    changeUserState(user.userId, 1 - user.enable).then(getRecords);
  };
  const visibleModal = shallowRef<typeof ResetPwdModal>();
  const visibleModalUser = ref<UserItem>();
  const handleResetUserPwd = (user: UserItem) => {
    visibleModal.value = ResetPwdModal;
    visibleModalUser.value = user;
  };
  const handleEditClick = (user: UserItem) => {
    visibleModal.value = NewUserModal;
    visibleModalUser.value = user;
  };
  const handleCreateClick = () => {
    visibleModal.value = NewUserModal;
    visibleModalUser.value = void 0;
  };
  const handleLoginLogClick = (user: UserItem) => {
    visibleModal.value = LoginLogModal;
    visibleModalUser.value = user;
  };
</script>
