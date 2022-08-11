interface DashboardDataResult {
  indexPageBrokersChartModel: BrokersChartModel;
  indexPageTransactionRecordsChartModel: TransactionRecordsChartModel;
  newTrendOfTransactionRecordsList: TrendOfTransactionRecordsItem[];
  newTrendsOfBrokersList: TrendsOfBrokersItem[];
}

interface BrokersChartModel {
  hasRecordBrokerNumber: number;
  noRecordBrokerNumber: number;
  totalBrokerNumber: number;
  chatList: Array<BrokersChartModelItem>;
}

interface BrokersChartModelItem {
  companyName: string;
  number: number;
  percent: number;
}

interface TransactionRecordsChartModel {
  cxRecords: number;
  leaseRecords: number;
  saleRecords: number;
  totalAmountOfTransactions: number;
  totalRecords: number;
  chatList: Array<TransactionRecordsChartModelItem>;
}

interface TransactionRecordsChartModelItem {
  amountOfTransactions: number;
  companyName: string;
  recordNumber: number;
}

interface TrendOfTransactionRecordsItem {
  addNumber: number;
  monthOfYear: number;
  yearMonth: string;
}

interface TrendsOfBrokersItem {
  addNumber: number;
  monthOfYear: number;
  yearMonth: string;
}
