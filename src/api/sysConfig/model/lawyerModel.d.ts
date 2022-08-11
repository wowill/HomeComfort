interface GetPagedLawyerListParams extends LimitPageInfo {
  createTime?: [string, string];
  companyName?: string;
  customerId?: string;
  customerName?: string;
  editTime?: [string, string];
  editUserName?: string;
  // enable?: number;
  // roleName?: string;
}

interface LawyerInfoItem {
  adress?: string;
  city?: string;
  companyName?: string;
  createTime?: string;
  createUser?: 1;
  customerId?: 1;
  editTime?: string;
  editUser?: 1;
  email?: string;
  enable?: true;
  firstName?: string;
  homeNumber?: string;
  lastName?: string;
  lawyerId?: 1;
  phone?: string;
  postCode?: string;
  province?: string;
  transactionRecordNumber?: 3;
}
interface GetPagedLawyerListResult {
  records: LawyerInfoItem[];
  total: number;
}

type GetTransactionRecordParams = LawyerInfoItem & LimitPageInfo;
// interface GetTransactionRecordParams extends LimitPageInfo {
// }
