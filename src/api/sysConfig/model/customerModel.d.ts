interface GetPagedCustomerListParams extends LimitPageInfo {
  createTime?: [string, string];
  companyName?: string;
  customerId?: string;
  customerName?: string;
  editTime?: [string, string];
  editUserName?: string;
  // enable?: number;
  // roleName?: string;
}

interface CustomerInfoItem {
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
  lawyerName?: string;
  phone?: string;
  postCode?: string;
  province?: string;
  transactionRecordNumber?: 3;
}
interface GetPagedCustomerListResult {
  records: CustomerInfo[];
  total: number;
}

interface GetCustomerTransactionRecordResult {
  transactionCode: '000001';
  transactionId: 1;
  transactionStatus: 1;
  transactionStatusName: 'open';
}
