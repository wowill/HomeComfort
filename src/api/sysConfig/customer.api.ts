import { defHttp } from '/@/utils/http/axios';

export function getPagedCustomerList({
  createTime,
  editTime,
  ...params
}: GetPagedCustomerListParams) {
  const [createDateStart, createDateEnd] = createTime || [];
  const [editDateStart, editDateEnd] = editTime || [];
  return defHttp.get<GetPagedCustomerListResult>({
    url: '/hc/customer/pageSearch',
    params: {
      ...params,
      createDateStart,
      createDateEnd,
      editDateStart,
      editDateEnd,
    },
  });
}

export function getCustomerOptionList(name?: string) {
  return defHttp.get({ url: '/hc/customer/getSelectionList', params: { name } });
}

export function saveCustomer(customer: CustomerInfoItem) {
  return defHttp.post({
    url: '/hc/customer/saveOrUpdate',
    data: customer,
  });
}

export function getCustomerTradeList({ customerId, limit, page }: GetTransactionRecordParams) {
  return defHttp.get({
    url: `/hc/customer/getTransactionRecordByCustomerId/${customerId}`,
    params: { limit, page },
  });
}
