interface GetPagedUserListParams extends LimitPageInfo {
  createTime?: [string, string];
  createUserName?: string;
  editTime?: [string, string];
  editUserName?: string;
  enable?: number;
  userName?: string;
}

interface LimitPageInfo {
  limit?: number;
  page?: number;
}

interface UserItem {
  avatar: ' ';
  createTime: '2022-03-19 20:13:04';
  createUser: 1;
  createUserName: '超级管理员';
  dept: number;
  deptId: number;
  deptName: null;
  editTime: '2022-03-19 20:13:07';
  editUser: 1;
  editeUserName: '超级管理员';
  email: 'wowill.wang@gmail.com';
  enable: 1;
  enableName: '启用';
  nickName: '管理员';
  phone: '13256565656';
  roleIds: string;
  roleNames: null;
  sex: 1;
  userId: number;
  userName: 'wangchegnxiang';
}
interface GetPagedUserListResult {
  records: UserItem[];
  total: number;
}

interface GetRoleItem {
  checked: false;
  createTime: '2022-03-13 23:14:26';
  createUser: 1;
  createUserName: null;
  details: '';
  editTime: '2022-03-13 23:14:26';
  editUser: 1;
  editeUserName: null;
  enable: true;
  enableName: null;
  roleCode: 'admin';
  roleId: 5;
  roleName: '管理员';
  roleType: 1;
}

type GetRoleListResult = GetRoleItem[];

interface SaveUserInfo {
  avatar?: string;
  deptId?: number;
  email?: string;
  nickName?: string;
  password?: string;
  roleIds?: string;
  userId?: number;
  userName?: string;
}

interface GetLoginLogParams extends LimitPageInfo {
  userId: number;
}
interface GetLoginLogItem {
  createTime: '2022-03-27 18:09:47';
  loginAdress: '0.0.内网IP';
  loginIp: '127.0.0.1';
  loginlogId: 83;
  userId: 16;
}
interface GetLoginLogResult {
  records: GetLoginLogItem[];
  total: number;
}
