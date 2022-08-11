// import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { message as Message } from 'ant-design-vue';

/**
 * @description: Upload interface
 */
export function uploadFile(
  params: UploadFileParams,
  // onUploadProgress: (progressEvent: ProgressEvent) => void,
): Promise<UploadItem> {
  return defHttp
    .uploadFile(
      {
        url: '/basic-api/sys/file/upload',
        // onUploadProgress,
      },
      params,
    )
    .then(({ data: res }) => {
      if (res.code === '0') {
        return res.data;
      } else {
        Message.error(res.msg);
      }
    });
}
