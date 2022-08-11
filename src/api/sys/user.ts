import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/api/v1/login',
  Logout = '/api/v1/loginOut',
  GetUserInfo = '/api/v1/userInfo',
  GetPermCode = '/getPermCode',
  GetMailVerifyCode = '/api/v1/getMailCaptcha',
  ResetPassword = '/api/v1/resetPassword',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      data: params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function getMailVerifyCode(email: string) {
  return defHttp.get({ url: Api.GetMailVerifyCode, params: { mailAccount: email } });
}

export function resetPassword(resetData) {
  return defHttp.get({
    url: Api.ResetPassword,
    params: {
      mailAccount: resetData.email,
      password: resetData.password,
      captcha: resetData.emailCode,
    },
  });
}
