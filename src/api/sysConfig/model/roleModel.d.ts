interface GetPagedRoleListParams extends LimitPageInfo {
  createTime?: [string, string];
  createUserName?: string;
  editTime?: [string, string];
  editUserName?: string;
  enable?: number;
  roleName?: string;
}

interface RoleItem {
  checked: false;
  createTime: '2022-03-13 23:14:26';
  createUser: 1;
  createUserName: '超级管理员';
  details: '';
  editTime: '2022-03-13 23:14:26';
  editUser: 1;
  editeUserName: '超级管理员';
  enable: true;
  enableName: '启用';
  roleCode: 'admin';
  roleId: 5;
  roleName: '管理员';
  roleType: 1;
}

type GetPagedRoleListResult = {
  records: RoleItem[];
  total: number;
};

interface SaveRoleInfo {
  powerList: number[];
  roleId?: number;
  roleName?: string;
}

interface RoleMenuTreeItem {
  children: RoleMenuTreeItem[];
  i18n: string;
  id: number;
  name: string;
  path: string;
  pid: number;
  key: string; // not exists, only for type check
}

type RoleMenuTree = RoleMenuTreeItem[];

interface RoleDetailResult {
  powerList: number[];
  roleId: 5;
  roleName: '管理员';
}
