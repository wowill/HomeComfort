<template>
  <PageWrapper>
    <template #headerContent>
      <Form layout="horizontal" :model="queryState" ref="headerFormRef">
        <Row :gutter="32">
          <Col :span="8">
            <FormItem :label="t('routes.sysConfig.banner.bannerName')" name="bannerName">
              <Input v-model:value="queryState.bannerName" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem :label="t('routes.sysConfig.banner.bannerStatus')" name="status">
              <Select v-model:value="queryState.status">
                <SelectOption
                  v-for="state in bannerStatusList"
                  :key="state.value"
                  :value="state.value"
                >
                  {{ state.label }}
                </SelectOption>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <Button class="action-btn" type="primary" @click="handleQueryClick">{{
              t('common.searchText')
            }}</Button>
            <Button class="action-btn" type="primary" @click="handleResetClick">{{
              t('common.resetText')
            }}</Button>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <Button
              type="primary"
              class="action-btn"
              @click="showBannerModal()"
              v-if="pageFn.add"
              >{{ t('common.addNew', { name: 'Banner' }) }}</Button
            >
            <Button
              class="action-btn"
              @click="handleBatchChangeState(1)"
              v-if="pageFn.batchOnline"
              >{{ t('common.batch', { name: t('routes.sysConfig.banner.onlineState') }) }}</Button
            >
            <Button
              class="action-btn"
              @click="handleBatchChangeState(0)"
              v-if="pageFn.batchOffline"
              >{{ t('common.batch', { name: t('routes.sysConfig.banner.offlineState') }) }}</Button
            >
          </Col>
        </Row>
      </Form>
    </template>
    <VTableVue
      :total="total"
      :columns="columns"
      :dataSource="dataSource"
      :actionColumnWidth="125"
      :rowSelection="rowSelection"
      rowKey="bannerId"
      @page-change="onPageChange"
    >
      <template #bodyColumn="{ column, text }">
        <template v-if="column.key === 'state'">
          {{
            text
              ? t('routes.sysConfig.banner.onlineState')
              : t('routes.sysConfig.banner.offlineState')
          }}
        </template>
        <template v-else-if="column.key === 'pic'">
          <Image :src="text.filePath" class="banner-pic-thumb" />
        </template>
      </template>
      <template #actionBodyColumn="{ record }" v-if="pageFn.edit || pageFn.onlineState">
        <Button
          class="action-btn"
          type="link"
          @click="showBannerModal(record)"
          v-if="pageFn.edit"
          >{{ t('common.edit') }}</Button
        >
        <Button
          class="action-btn"
          type="link"
          @click="handleToggleDisableClick(record)"
          v-if="pageFn.onlineState"
          >{{
            record.status
              ? t('routes.sysConfig.banner.offlineState')
              : t('routes.sysConfig.banner.onlineState')
          }}</Button
        >
      </template>
    </VTableVue>
    <NewBanner :banner="editBanner" v-model:visible="bannerModalVisible" @reload="getRecordList" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import {
    Form,
    FormItem,
    Row,
    Col,
    Input,
    Button,
    Image,
    Select,
    SelectOption,
  } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';

  import { reactive, computed, ref, Ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import VTableVue, { VTableColumnType } from '../trade/VTable.vue';
  import {
    getBannerList,
    changeBannerStatus,
    batchChangeBannerStatus,
  } from '/@/api/sysConfig/banner';
  import { useI18n } from '/@/hooks/web/useI18n';
  import NewBanner from './components/NewBanner.vue';
  import usePageFn from '/@/utils/my/usePageFn';
  const pageFn = usePageFn();
  const { t } = useI18n();

  const bannerModalVisible = ref(false);
  const editBanner = ref<BannerItem>();
  const queryState = reactive<GetBannerListParams>({
    bannerName: '',
    status: '',
    current: 1,
    size: 10,
  });

  // 0是下架1是上架
  const bannerStatusList = computed(() => [
    {
      value: '1',
      label: t('routes.sysConfig.banner.onlineState'),
    },
    {
      value: '0',
      label: t('routes.sysConfig.banner.offlineState'),
    },
  ]);

  const columns = computed<VTableColumnType[]>(() => [
    {
      title: 'ID',
      dataIndex: 'bannerId',
      key: 'ID',
      visible: true,
      width: '100px',
    },
    {
      title: t('routes.sysConfig.banner.bannerName'),
      dataIndex: 'bannerName',
      key: 'bannerName',
      visible: true,
    },
    {
      title: t('routes.sysConfig.banner.pic'),
      dataIndex: 'fileModel',
      key: 'pic',
      visible: true,
    },
    {
      title: t('routes.sysConfig.banner.picLink'),
      dataIndex: 'hrefType',
      key: 'picLink',
      visible: true,
    },
    {
      title: t('routes.sysConfig.banner.clickCount'),
      dataIndex: 'clickCount',
      key: 'clickCount',
      visible: true,
    },
    {
      title: t('common.creator'),
      dataIndex: 'createUser',
      key: 'creator',
      visible: true,
      minWidth: 150,
      // width: 150,
    },
    {
      title: t('common.createDate'),
      dataIndex: 'createTime',
      key: 'createDate',
      visible: true,
    },
    {
      title: t('common.updater'),
      dataIndex: 'editUser',
      key: 'updater',
      visible: true,
    },
    {
      title: t('common.updateDate'),
      dataIndex: 'editTime',
      key: 'updateDate',
      visible: true,
    },
    {
      title: t('common.state'),
      dataIndex: 'status',
      key: 'state',
      visible: true,
    },
  ]);
  const dataSource = ref<BannerItem[]>([]);
  const checkedRowKeys = ref<number[]>([]);
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys: (string | number)[], _selectedRows: GetRecordItem[]) => {
      checkedRowKeys.value = selectedRowKeys as number[];
    },
    // onSelect: (record: GetRecordItem, selected: boolean, selectedRows: GetRecordItem[]) => {
    //   console.log(record, selected, selectedRows);
    // },
    // onSelectAll: (
    //   selected: boolean,
    //   selectedRows: GetRecordItem[],
    //   changeRows: GetRecordItem[],
    // ) => {
    //   console.log(selected, selectedRows, changeRows);
    // },
  });
  const total = ref(0);
  const getRecordList = () => {
    getBannerList(queryState).then((res) => {
      dataSource.value = res.records;
      total.value = res.total;
    });
  };
  getRecordList();
  const onPageChange = (page: number, pageSize: number) => {
    queryState.current = page;
    queryState.size = pageSize;
    getRecordList();
  };
  const showBannerModal = (banner?: BannerItem) => {
    editBanner.value = banner;
    bannerModalVisible.value = true;
  };
  const headerFormRef = ref<FormInstance>() as Ref<FormInstance>;
  const handleQueryClick = () => {
    getRecordList();
  };
  const handleResetClick = () => {
    headerFormRef.value.resetFields();
  };

  const handleToggleDisableClick = (banner: BannerItem) => {
    changeBannerStatus(banner.bannerId, 1 - banner.status).then(() => {
      getRecordList();
    });
  };
  const handleBatchChangeState = (state: number) => {
    console.log('handleBatchChangeState', state, checkedRowKeys.value);
    if (checkedRowKeys.value.length === 0) {
      return;
    }
    batchChangeBannerStatus(checkedRowKeys.value, state).then(() => {
      getRecordList();
    });
  };
</script>

<style lang="less">
  .banner-pic-thumb {
    width: 250px;
    height: 160px;
    object-fit: contain;
  }
</style>
