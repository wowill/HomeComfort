import { defHttp } from '/@/utils/http/axios';

export const getPagedTeamList = ({ createTime, editTime, ...params }: GetPagedTeamListParams) => {
  const [createDateStart, createDateEnd] = createTime || [];
  const [editDateStart, editDateEnd] = editTime || [];
  return defHttp.get<GetPagedTeamListResult>({
    url: '/hc/broker-team/pageSearch',
    params: {
      createDateStart,
      createDateEnd,
      editDateStart,
      editDateEnd,
      ...params,
    },
  });
};

export const getTeamDetail = (id: number) => {
  return defHttp.get<TeamItem>({
    url: `/hc/broker-team/getById/${id}`,
  });
};

export const saveTeam = (data: Partial<TeamItem>) => {
  return defHttp.post({
    url: '/hc/broker-team/saveOrUpdate',
    data,
  });
};
