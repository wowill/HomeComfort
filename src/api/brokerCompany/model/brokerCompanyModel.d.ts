interface BrokerCompanyItem {
  accountStatus: '1';
  accountStatusName: string;
  address: string;
  brokerCompanyId: 2;
  city: string;
  companyName: '测试公司2';
  createTime: '2022-03-17 20:01:17';
  createUser: string;
  editTime: '2022-03-17 20:01:20';
  editUser: string;
  email: 'wangwei@qdcares.cn';
  enable: string;
  fax: '222';
  homeNumber: string;
  lastLoginTime: '2022-03-14 19:39:16';
  loginAccount: string;
  personNumber: '2';
  phone: '18266669999';
  postCode: string;
  province: string;
  taxAccountName: string;
  taxBankAccount: string;
  taxBankCode: string;
  taxBankName: string;
  taxHst: string;
  taxRate: string;
}

type AllBrokerCompanyResult = BrokerCompanyItem[];

interface GetPagedBrokerCompanyListParams extends LimitPageInfo {
  companyName?: string;
}
interface GetPagedBrokerCompanyListResult {
  records: BrokerCompanyItem[];
  total: number;
}

interface AOptionItem {
  id: number;
  name: string;
  title: string;
}
