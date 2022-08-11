import { defHttp } from '/@/utils/http/axios';

export function getPagedLawyerList({ createTime, editTime, ...params }: GetPagedLawyerListParams) {
  const [createDateStart, createDateEnd] = createTime || [];
  const [editDateStart, editDateEnd] = editTime || [];
  return defHttp.get<GetPagedLawyerListResult>({
    url: '/hc/lawyer/pageSearch',
    params: {
      ...params,
      createDateStart,
      createDateEnd,
      editDateStart,
      editDateEnd,
    },
  });
}

export function getLawyerOptionList(name?: string) {
  return defHttp.get({ url: '/hc/lawyer/getSelectionList', params: { name } });
}

export function saveLawyer(lawyer: LawyerInfoItem) {
  return defHttp.post({
    url: '/hc/lawyer/saveOrUpdate',
    data: lawyer,
  });
}

export function getLawyerTradeList({ lawyerId, limit, page }: GetTransactionRecordParams) {
  return defHttp.get({
    url: `/hc/lawyer/getTransactionRecordByLawyerId/${lawyerId}`,
    params: { limit, page },
  });
}
