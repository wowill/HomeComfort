import { defHttp } from '/@/utils/http/axios';

export const getRecords = (params: GetRecordParams) => {
  return defHttp.get<GetRecordResult>({ url: '/hc/transaction-record/pageSearch', params });
};

export const deleteRecord = (recordId: number) => {
  return defHttp.delete({ url: `/hc/transaction-record/deleteById/${recordId}` });
};

export const addRecordNote = (transactionId: number, content: string) => {
  return defHttp.post({
    url: `/hc/transaction-mark-record/saveOrUpdate`,
    params: {
      transactionId,
      mark: content,
    },
  });
};

export const getRecordNotes = (params: GetRecordNotesParam) => {
  return defHttp.get<GetRecordNotesResult>({
    url: `/hc/transaction-mark-record/pageSearch`,
    params,
  });
};

export const getRecordDetail = (recordId: string) => {
  return defHttp.get<GetRecordDetail>({ url: `/hc/transaction-record/getById/${recordId}` });
};

export const saveRecord = (data: GetRecordDetail) => {
  return defHttp.post({ url: '/hc/transaction-record/saveOrUpdate', data: data });
};
