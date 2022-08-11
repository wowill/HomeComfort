interface GetBannerListParams extends PageInfo {
  bannerName: string;
  status: string;
}

interface BannerItem {
  bannerId: 1;
  bannerName: '1231321';
  clickCount: 3;
  enable: true;
  fileModel: UploadItem;
  href: '1213';
  hrefType: 1;
  sort: 0;
  status: 0;
  statusName: '下架';
}

interface GetBannerListResult {
  records: BannerItem[];
  total: number;
}
