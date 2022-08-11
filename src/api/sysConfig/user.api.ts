import { defHttp } from '/@/utils/http/axios';

export function getPagedUserList({ createTime, editTime, ...params }: GetPagedUserListParams) {
  const [createTimeStart, createTimeEnd] = createTime || [];
  const [editTimeStart, editTimeEnd] = editTime || [];
  return defHttp.get<GetPagedUserListResult>({
    url: '/sys/user',
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
    url: '/sys/user/changeEnableStatus',
    params: { id, status: state },
  });
}

export function resetUserPwd(userId: number, newPassword: string) {
  return defHttp.put({
    url: '/sys/user/resetPwd',
    params: { userId, newPassword },
  });
}

export function saveUser(user: SaveUserInfo) {
  return defHttp.post({ url: '/sys/user/saveOrUpdate', data: user });
}

export function getRoleList(userId?: number) {
  return defHttp.get<GetRoleListResult>({ url: '/sys/user/getRoles', params: { userId: userId } });
}

export function getLoginLogs(params: GetLoginLogParams) {
  return defHttp.get<GetLoginLogResult>({ url: '/sys/user/getLoginLogs', params });
}
