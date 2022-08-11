interface BrokerItem {
  accountStatus: '正常';
  address: string;
  brokerCompanyId: string;
  brokerPersonId: 1;
  brokerTeamId: string;
  brokerTeamMemberQoList: string;
  city: string;
  commissionDistributionRatio: string;
  commissionPlanId: string;
  companyName: '测试公司1';
  createTime: '2022-03-17 20:04:19';
  createUser: string;
  editTime: '2022-03-17 20:04:22';
  editUser: string;
  email: 'jjiaper@qq.com';
  employTime: string;
  enable: true;
  firstName: 'firstname1';
  homeNumber: string;
  lastLoginTime: '2022-03-14 19:49:35';
  lastName: 'lastname1';
  license: string;
  licenseExpiredDate: string;
  loginAccount: string;
  pause: false;
  paymentType: string;
  phone: '18266669999';
  postCode: string;
  province: string;
  registrationNumber: string;
  role: string;
  taxAccountName: string;
  taxBankAccount: string;
  taxBankName: string;
  taxHst: string;
  taxSinSsn: string;
  teamName: 'team1';
  transactionRecordNumber: string;
}

interface AllBrokerResult {
  d: any[];
}

interface BrokerStatusMap {
  disable: 0;
  normal: 2;
  pause: 2;
  total: 4;
}
interface PagedBrokerResult {
  records: {
    brokerPersonRecordList: BrokerItem[];
    brokerPersonStatusList: BrokerStatusMap;
  };
  total: number;
}

interface PagedBrokerParams extends LimitPageInfo {
  brokerPersonId?: number;
  brokerPersonName?: string;
  companyId?: string;
  createTime?: [string, string];
  editTime?: [string, string];
  /**
   * 账号状态 0：全部；1：正常；2：暂停；3：禁用
   */
  status?: number;
}

type GetBrokerTransactionRecordParams = BrokerItem & LimitPageInfo;

interface BrokerTeamMember {
  brokerPersonId: number;
  brokerPersonName: string;
  commissionDistributionRatio: string;
}
interface BrokerDetail {
  accountStatus: string;
  address: string;
  brokerCompanyId: 1;
  brokerPersonId: 1;
  brokerTeamId: 1;
  brokerTeamMemberQoList: BrokerTeamMember[];
  city: 'ct1';
  commissionDistributionRatio: string;
  commissionPlanId: string;
  companyName: string;
  createTime: '2022-03-17 20:04:19';
  createUser: 1;
  editTime: '2022-03-17 20:04:22';
  editUser: 1;
  email: '132@123.cn';
  employTime: '2022-03-17 20:04:25';
  enable: true;
  firstName: 'firstname1';
  homeNumber: string;
  lastLoginTime: string;
  lastName: 'lastname1';
  license: string;
  licenseExpiredDate: string;
  loginAccount: 'jjiaper@qq.com';
  pause: false;
  paymentType: string;
  phone: '18266669999';
  postCode: '123号';
  province: 'pro1';
  registrationNumber: string;
  role: 1;
  taxAccountName: string;
  taxBankAccount: string;
  taxBankName: string;
  taxHst: string;
  taxSinSsn: string;
  teamName: string;
  transactionRecordNumber: string;
}

interface BrokerTeam {
  id: number;
}

interface CommissionRuleItem {
  commissionRuleId: 1;
  commissionRuleItemList: null;
  commissionRuleName: 'testrule1';
  commissionRuleType: '1' | '2' | '3';
  commissionRuleTypeName: null;
  createTime: '2022-04-04 21:52:49';
  createUser: 1;
  createUserName: '超级管理员';
  editTime: '2022-04-04 21:52:52';
  editUser: 1;
  editeUserName: '超级管理员';
  enable: true;
}
interface PagedCommissionRuleResult {
  records: CommissionRuleItem[];
  total: number;
}

interface CommissionRuleItemListItem {
  areaRentPerSquareFoot: 0;
  areaTotalCommission: '';
  areaYearNumber: 0;
  buyerCommissionRate: 0;
  commissionRuleId: 7;
  commissionRuleItemId: 3;
  createTime: '2022-04-30 15:01:18';
  createUser: 16;
  editTime: '2022-04-30 15:01:18';
  editUser: 16;
  enable: true;
  intervalEnd: 0;
  intervalSerialNumber: 0;
  intervalStart: 0;
  sellerCommissionRate: 0;
  singlelReachValue: 12;
  singlelSerialNumber: 31;
}
interface CommissionRuleDetail {
  commissionRuleId: 7;
  commissionRuleItemList: CommissionRuleItemListItem[];
  commissionRuleName: 'testRule';
  commissionRuleType: '1';
  commissionRuleTypeName: null;
  createTime: '2022-04-30 15:01:09';
  createUser: 16;
  createUserName: null;
  editTime: '2022-04-30 15:01:09';
  editUser: 16;
  editeUserName: null;
  enable: true;
}
