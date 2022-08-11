import { ref, Ref } from 'vue';

export function createUseRecords<R extends Array<any>>() {
  return function useRecords<P extends Record<string, any>, AP extends Record<string, any>>(
    api: (p?: P) => Promise<AP>,
    setDataFn?: (res: AP, r: Ref<R>, t: Ref<number>) => void,
  ) {
    const params = ref<P>() as Ref<P>;
    const records = ref<R>() as Ref<R>;
    const total = ref(0);
    params.value = {} as P;
    records.value = [] as unknown as R;
    const getRecords = (p?: P, setValue = false) => {
      if (setValue && p) {
        params.value = p;
      }
      return api(p || params.value).then((res) => {
        if (setDataFn) {
          setDataFn(res, records, total);
        } else {
          records.value = res.records;
          total.value = res.total;
        }
      });
    };

    const checkedRowKeys = ref<(string | number)[]>([]);
    const rowSelection = ref({
      checkStrictly: false,
      onChange: (selectedRowKeys: (string | number)[], selectedRows: GetRecordItem[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        checkedRowKeys.value = selectedRowKeys;
      },
      // onSelect: (record: GetRecordItem, selected: boolean, selectedRows: GetRecordItem[]) => {
      //   console.log(record, selected, selectedRows);
      // },
      // onSelectAll: (
      //   selected: boolean,
      //   selectedRows: GetRecordItem[],
      //   changeRows: GetRecordItem[],
      // ) => {
      //   console.log(selected, selectedRows, changeRows);
      // },
    });

    return {
      params,
      records,
      total,
      getRecords,
      checkedRowKeys,
      rowSelection,
    };
  };
}
