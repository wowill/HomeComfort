import { defHttp } from '/@/utils/http/axios';

export const getBannerList = (params: GetBannerListParams) => {
  return defHttp.get<GetBannerListResult>({ url: '/sys/banner/pageSearch', params });
};

export const saveBanner = (banner: BannerItem) => {
  return defHttp.post({ url: '/sys/banner/saveOrUpdate', data: banner });
};

export const changeBannerStatus = (id: number, status: number) => {
  return defHttp.get({ url: '/sys/banner/changeStatus', params: { id: id, status: status } });
};

export const batchChangeBannerStatus = (ids: number[], status: number) => {
  return defHttp.get({ url: '/sys/banner/batchChangeStatus', params: { ids, status: status } });
};

export const getBannerListForLogin = () => {
  return defHttp.get<GetBannerListResult>({ url: '/sys/banner/bannerList' });
};

export const addBannerClick = (id: number) => {
  return defHttp.get({ url: '/sys/banner/addBannerClickCount', params: { id } });
};
