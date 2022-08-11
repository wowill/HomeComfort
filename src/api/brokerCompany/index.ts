import { defHttp } from '/@/utils/http/axios';

export const getAllBrokerCompany = () => {
  return defHttp.get<AOptionItem[]>({ url: '/hc/broker-company/getSelectionList' });
};

export const getPagedBrokerCompany = (params: GetPagedBrokerCompanyListParams) => {
  return defHttp.get<GetPagedBrokerCompanyListResult>({
    url: '/hc/broker-company/pageSearch',
    params,
  });
};

export const toggleBrokerCompanyDisableState = (id: number) => {
  return defHttp.get<GetPagedBrokerCompanyListResult>({
    url: `/hc/broker-company/disableOrBackById/${id}`,
  });
};
export const toggleBrokerCompanyPauseState = (id: number) => {
  return defHttp.get<GetPagedBrokerCompanyListResult>({
    url: `/hc/broker-company/pauseOrBackById/${id}`,
  });
};

export const getBrokerCompanyDetail = (id: string) => {
  return defHttp.get<BrokerCompanyItem>({
    url: `/hc/broker-company/getById/${id}`,
  });
};

export const saveBrokerCompany = (data: BrokerCompanyItem) => {
  return defHttp.post({
    url: `/hc/broker-company/saveOrUpdate`,
    data,
  });
};
