import { defHttp } from '/@/utils/http/axios';

export function getPagedRoleList({ createTime, editTime, ...params }: GetPagedRoleListParams) {
  const [createTimeStart, createTimeEnd] = createTime || [];
  const [editTimeStart, editTimeEnd] = editTime || [];
  return defHttp.get<GetPagedRoleListResult>({
    url: '/sys/role',
    params: {
      ...params,
      createTimeStart,
      createTimeEnd,
      editTimeStart,
      editTimeEnd,
    },
  });
}

export function changeUserState(id: number, state: number) {
  return defHttp.put({
    url: '/sys/role/changeEnableStatus',
    params: { id, status: state },
  });
}

export function getAllMenuFeatures() {
  return defHttp.get<RoleMenuTree>({ url: '/sys/role/getAllPowers' });
}
export function getAllMenuTree() {
  return defHttp.get<RoleMenuTree>({ url: '/sys/role/getPowerTree' });
}

export function getRoleDetail(id: number) {
  return defHttp.get<RoleDetailResult>({ url: `/sys/role/getById/${id}` });
}

export function saveRole(data: SaveRoleInfo) {
  return defHttp.post({
    url: '/sys/role',
    data,
  });
}

export function getRelatedUserList(roleId: number) {
  return defHttp.get({ url: `/sys/role/getLinkUserList/${roleId}` });
}

export function deleteUserFromRole(roleId: number) {
  return defHttp.delete({ url: `/sys/role/${roleId}` });
}
