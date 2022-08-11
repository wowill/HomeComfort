interface GetPagedTradeRuleListParams extends LimitPageInfo {
  createTime?: [string, string];
  createUserName?: string;
  // editTime?: [string, string];
  // editUserName?: string;
  // enable?: number;
  transactionConditionsName?: string;
}

interface TradeRuleItem {
  createTime?: string;
  createUser?: 16;
  createUserName?: string;
  editTime?: string;
  editUser?: 16;
  editUserName?: string;
  enable?: true;
  transactionConditionsDetail?: string;
  transactionConditionsId?: 1;
  transactionConditionsName?: string;
}
