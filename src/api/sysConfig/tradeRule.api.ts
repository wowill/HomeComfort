import { defHttp } from '/@/utils/http/axios';

export function getPagedTradeRuleList({ createTime, ...params }: GetPagedTradeRuleListParams) {
  const [createDateStart, createDateEnd] = createTime || [];
  // const [editTimeStart, editTimeEnd] = editTime || [];
  return defHttp.get<GetPagedRoleListResult>({
    url: '/hc/transaction-conditions/pageSearch',
    params: {
      ...params,
      createDateStart,
      createDateEnd,
    },
  });
}

// export function changeUserState(id: number, state: number) {
//   return defHttp.put({
//     url: '/sys/role/changeEnableStatus',
//     params: { id, status: state },
//   });
// }

export function saveTradeRule(tradeRule: TradeRuleItem) {
  return defHttp.post({
    url: '/hc/transaction-conditions/saveOrUpdate',
    data: tradeRule,
  });
}

export function getRelatedUserList(roleId: number) {
  return defHttp.get({ url: `/sys/role/getLinkUserList/${roleId}` });
}

export function deleteTradeRule(id: number) {
  return defHttp.delete({ url: `/hc/transaction-conditions/deleteById${id}` });
}
