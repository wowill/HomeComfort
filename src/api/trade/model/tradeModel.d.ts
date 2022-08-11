interface GetRecordParams {
  abortDateEnd: string; // 中止日起时间段结束
  abortDateStart: string; // 中止日起时间段开始
  brokerPersonName: string; // 代理人名称
  effectiveDateEnd: string; // 生效日期时间段结束
  effectiveDateStart: string; // 生效日期时间段开始
  estateAddress: string; // 房产地址
  recordCode: string; // 记录编码
  transactionType?: string; // 交易类型
  limit: number;
  page: number;
}

interface GetRecordItem {
  transactionId: number; //记录id
  transactionCode: string; //记录编码
  transactionType: number; //交易记录类型标志位
  transactionTypeName: string; //交易记录类型名称
  transactionStatus: number; //交易记录状态标志位
  transactionStatusName: string; //交易记录状态名称
  effectiveDate: string; //交易记录生效日期
  abortDate: string; //交易记录中止日期
  brokerageCalType: number;
  estateRecordId: number;
  sellerId: number;
  buyerId: number;
  brokeragePrice: number;
  brokerageRate: number;
  buyerName: string;
  sellerName: string;
  buyerLawyer: string;
  sellerLawyer: string;
  buyerLawyerPhone: string;
  sellerLawyerPhone: string;
  buyerFilePath: null;
  sellerFilePath: null;
  sellerBrokerCompanyId: number;
  sellerBrokerPersonId: number;
  sellerBrokerBrokerageRate: number;
  sellerBrokerFilePath: null;
  buyerBrokerCompanyId: number;
  buyerBrokerPersonId: number;
  buyerBrokerBrokerageRate: number;
  buyerBrokerFilePath: null;
  depositCustody: number;
  depositAmount: number;
  enable: true;
  createTime: string;
  createUser: number;
  editTime: string;
  editUser: number;
  estateAddress: string; //房屋地址
  houseNumber: string; //房屋门牌号
  city: string;
  province: string;
  rentSellPrice: string;
  taxRate: string;
  postCode: string;
  hrefUrls: null; //房屋的图片
  mark: string;
  buyerBrokerCompanyName: string; //买方经纪公司
  sellerBrokerCompanyName: string; //卖方经纪公司
  buyerBrokerFirstName: string; //买方经纪人名称firstName
  buyerBrokerLastName: string; //买方经纪人名称lastName
  sellerBrokerFirstName: string; //卖方经纪人名称firstName
  sellerBrokerLastName: string; //卖方经纪人名称lastName
}

interface TradeTypeMap {
  lease: number;
  sale: number;
  total: number;
}
interface GetRecordResult {
  records: {
    transactionRecordList: GetRecordItem[];
    transactionTypeCountDtoList: TradeTypeMap;
  };
  total: number;
}

interface GetRecordDetail {
  abortDate: string;
  brokerageCalType: number;
  brokeragePrice: string;
  brokerageRate: string;
  buyerBrokerBrokerageRate: string;
  buyerBrokerCompanyId: 1;
  buyerBrokerCompanyName: string;
  buyerBrokerFilePathModel: UploadItem;
  buyerBrokerFirstName: string;
  buyerBrokerLastName: string;
  buyerBrokerPersonId?: 1;
  buyerFilePathModel: UploadItem;
  buyerId: 1;
  buyerLawyer: string;
  buyerLawyerPhone: string;
  buyerName: string;
  city: string;
  createTime: string;
  createUser: 1;
  depositAmount: string;
  depositCustody: string;
  editTime: string;
  editUser: 1;
  effectiveDate: string;
  enable: true;
  estateAddress: string;
  estateRecordId: 4;
  houseNumber: string;
  hrefUrlsList: UploadItem[];
  mark: string;
  postCode: string;
  province: string;
  rentSellPrice: string;
  sellerBrokerBrokerageRate: 1;
  sellerBrokerCompanyId: 1;
  sellerBrokerCompanyName: string;
  sellerBrokerFilePathModel: UploadItem;
  sellerBrokerFirstName: string;
  sellerBrokerLastName: string;
  sellerBrokerPersonId?: 1;
  sellerFilePathModel: UploadItem;
  sellerId: 2;
  sellerLawyer: string;
  sellerLawyerPhone: string;
  sellerName: string;
  taxRate: string;
  transactionCode: string;
  transactionId: 4;
  transactionStatus: 0;
  transactionStatusName: string;
  transactionType: 2;
  transactionTypeName: string;
}

interface PageInfo {
  current: number;
  size: number;
}

interface GetRecordNotesParam extends PageInfo {
  transactionId: number;
}

interface GetRecordNotesItem {
  createTime: '2022-03-17 22:30:27';
  enable: true;
  hcTransactionMarkId: 5;
  mark: string;
  markUserId: 1;
  markUserName: 'admin';
  transactionId: 1;
}

interface GetRecordNotesResult {
  searchCount: true;
  size: 2;
  total: 5;
  records: GetRecordNotesItem[];
}
