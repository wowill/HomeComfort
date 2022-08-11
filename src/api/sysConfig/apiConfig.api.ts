import { defHttp } from '/@/utils/http/axios';

export const getApiConfigList = () => {
  return defHttp.get<GetApiConfigListResult>({ url: '/hc/api-mange/getList' });
};

export const getApiSyncLog = (params: { id: number }) => {
  return defHttp.get<ApiSyncLogResult>({
    url: `/hc/api-mange/getLogListById/${params.id}`,
  });
};

export const startApiSync = (apiID: number) => {
  return defHttp.get<string>({
    url: `/hc/api-mange/startSync/`,
    params: { id: apiID },
  });
};

export const batchApiSync = (apiIDs: number[]) => {
  return defHttp.get<string>({
    url: `/hc/api-mange/startBatchSync/`,
    params: { ids: apiIDs },
  });
};

export function changeApiState(id: number, state: number) {
  return defHttp.get({
    url: '/hc/api-mange/changeStatus',
    params: { id, status: state },
  });
}
