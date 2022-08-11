import { defHttp } from '/@/utils/http/axios';

export const getDashboardData = () => {
  return defHttp.get<DashboardDataResult>({ url: '/getStatisticsChartsData' });
};
