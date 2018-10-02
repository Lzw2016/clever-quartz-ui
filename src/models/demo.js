// import { queryCurrent } from '../services/api';
import { ModelInitState } from '../utils/constant';

export default {
  namespace: 'demo',

  state: {
    queryFlag: true,
    // 日期范围、字典下拉框、行政区划、文字
    queryParam: {
      _start: 0,
      _limit: 10,
      startTime: null,
      endTime: null,
      rangeTime: null,
      select: null,
      address: null,
      text: null,
    },
    data: [],
    pagination: {
      ...ModelInitState.pagination,
      pageSizeOptions: ['2', '50', '100'],
      pageSize: 50,
    },
  },

  effects: {
    *queryPage({ payload }, { select, put }) {
      let queryParam = yield select(state => state.demo.queryParam);
      const pagination = yield select(state => state.demo.pagination);
      queryParam = { ...queryParam, ...payload };
      // 请求数据
      // const response = yield call(findStaffInfoByPage, queryParam);
      // if (!response) return;
      // const { list, pageSize, pageNum, total } = response;
      // 保存数据
      pagination.total = 100000;
      if (queryParam.pageNo) {
        pagination.current = queryParam.pageNo;
      }
      if (queryParam.pageSize) {
        pagination.pageSize = queryParam.pageSize;
      }
      console.log('查询参数', queryParam);
      // 构造数据
      const data = [];
      for (let i = (pagination.current - 1) * pagination.pageSize + 1; i <= pagination.current * pagination.pageSize; i++) {
        const row = {};
        for (let j = 1; j <= 20; j++) {
          row[`col${j}`] = `${i}行，${j}列`;
        }
        data.push(row);
      }
      yield put({ type: 'save', payload: { queryParam, data, pagination } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
