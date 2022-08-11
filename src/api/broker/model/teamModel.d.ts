interface GetPagedTeamListParams extends LimitPageInfo {
  createTime?: [string, string];
  editTime?: [string, string];
  brokerTeamName?: string;
  companyId?: string;
}

interface TeamItem {
  brokerCompanyId: 1;
  brokerTeamId: 1;
  brokerTeamMemberQoList: BrokerTeamMember[];
  commissionDistributionRatio: string;
  createTime: '2022-03-19 11:48:25';
  createUser: 1;
  editTime: '2022-03-19 11:48:22';
  editUser: 1;
  enable: true;
  memberNumber: 1;
  teamName: 'team1';
}

interface pagedInfo {
  size: 10;
  pages: 1;
  total: 4;
}

interface GetPagedTeamListResult extends pagedInfo {
  records: TeamItem[];
}
