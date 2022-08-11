import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
// import { RoleInfo } from '/@/api/sys/model/userModel';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
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

  // userId: string | number;
  // userName: string;
  // realName: string;
  // avatar: string;
  // desc?: string;
  // homePath?: string;
  // roles: RoleInfo[];
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}

interface PermissionInfo {
  i18n: 'routes.broker.list.title';
  id: 1;
  name: 'Broker';
  path: '/broker';
  pid: 0;
  children: PermissionInfo[];
}
