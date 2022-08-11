import { defHttp } from '/@/utils/http/axios';

export const getAllBroker = () => {
  return defHttp.get<AllBrokerResult>({ url: '/hc/broker-company/getSelectionList' });
};

export const getPagedBrokerList = (params: PagedBrokerParams) => {
  return defHttp.get<PagedBrokerResult>({ url: '/hc/broker-person/pageSearch', params });
};

export const deleteBroker = (params) => {
  return defHttp.get<PagedBrokerResult>({ url: '/hc/broker-person/pageSearch', params });
};

export function getBrokerTradeList({
  brokerPersonId,
  limit,
  page,
}: GetBrokerTransactionRecordParams) {
  return defHttp.get({
    url: `/hc/broker-person/getTransactionRecordByBrokerId/${brokerPersonId}`,
    params: { limit, page },
  });
}

export function getBrokerDetail(id: string) {
  return defHttp.get<BrokerDetail>({
    url: `/hc/broker-person/getById/${id}`,
  });
}

export function saveBroker(broker: Partial<BrokerDetail>) {
  return defHttp.post({
    url: '/hc/broker-person/saveOrUpdate',
    data: broker,
  });
}

export function getTeamListByBrokerCompanyId(brokerCompanyId: number) {
  return defHttp.get<BrokerTeam[]>({
    url: `/hc/broker-person/getById/${brokerCompanyId}`,
  });
}

export function getBrokerListByBrokerCompanyId(brokerCompanyId: number) {
  return defHttp.get<AOptionItem[]>({
    url: `/hc/broker-person/getSelectionList`,
    params: {
      companyId: brokerCompanyId,
    },
  });
}

export const getPagedCommissionRuleList = (params: LimitPageInfo) => {
  return defHttp.get<PagedCommissionRuleResult>({ url: '/hc/commission-rule/pageSearch', params });
};

export const toggleCommissionRuleStatus = (id: number) => {
  return defHttp.post({
    url: `/hc/commission-rule/changeEnableStatus/${id}`,
  });
};

export const getCommissionRuleDetail = (id: number) => {
  return defHttp.get<CommissionRuleDetail>({
    url: `/hc/commission-rule/getById/${id}`,
  });
};

export const saveCommissionRuleDetail = (commissionRuleDetail: CommissionRuleDetail) => {
  return defHttp.post({
    url: `/hc/commission-rule/saveOrUpdate`,
    data: commissionRuleDetail,
  });
};
