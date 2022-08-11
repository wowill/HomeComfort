/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  email: string;
  password: string;
  isRemeber?: number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  role: RoleInfo;
  saTokenInfo: {
    tokenValue: string;
  };
  userInfoAndPowers: {
    userId: string | number;
  };
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  createUser: 1;
  createUserName: null;
  dept: null;
  deptId: 14;
  deptName: '业务部';
  editUser: 16;
  editeUserName: null;
  email: 'jjiaper@qq.com';
  enable: 1;
  enableName: null;
  nickName: '李哥';
  phone: '1';
  roleIds: null;
  roleNames: null;
  sex: 1;

  userDataPowers: PermissionInfo[];
  // 用户id
  // userId: string | number;
  // // 用户名
  // userName: string;
  // // 真实名字
  // realName: string;
  // // 头像
  // avatar: string;
  // // 介绍
  // desc?: string;
}

interface PermissionInfo {
  i18n: 'routes.broker.list.title';
  id: 1;
  name: 'Broker';
  path: '/broker';
  pid: 0;
  children: PermissionInfo[];
}
