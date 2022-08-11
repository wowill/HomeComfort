interface ApiConfigItem {
  apiId: 1;
  apiName: '交易记录同步';
  apiStatus: '0';
  apiStatusName: '停用';
  createTime: '2022-04-18 21:47:15';
  createUser: 1;
  editTime: '2022-04-18 21:47:18';
  editUser: 1;
  enable: true;
  lastSyncTime: '2022-04-15 21:47:08';
}

interface GetApiConfigListResult {
  records: ApiConfigItem[];
  warming: string;
}

interface ApiSyncLogItem {
  apiId: '1';
  apiSyncId: 1;
  createTime: '2022-04-13 22:17:16';
  endtime: '2022-04-14 22:17:10';
  operateAccount: '935009@98.com';
  operateId: 1;
  starttime: '2022-04-13';
  syncResult: 'result1111';
  syncStatus: '同步失败';
}

type ApiSyncLogResult = ApiSyncLogItem[];
