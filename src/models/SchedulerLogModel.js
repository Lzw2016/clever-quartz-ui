// import lodash from 'lodash';
import { ModelInitState } from '../utils/constant';
import { findSchedulerLogByPage } from '../services/log-controller';

export default {
  namespace: 'SchedulerLogModel',

  state: {
    queryParam: {
      ...ModelInitState.queryParam,
      schedName: undefined,
      instanceName: undefined,
      methodName: undefined,
      logTimeStart: undefined,
      logTimeEnd: undefined,
    },
    pagination: {
      ...ModelInitState.pagination,
    },
    data: [],
  },

  effects: {
    *findByPage({ payload }, { select, call, put }) {
      let queryParam = yield select(state => state.SchedulerLogModel.queryParam);
      let pagination = yield select(state => state.SchedulerLogModel.pagination);
      queryParam = { ...queryParam, ...payload }
      // 请求数据
      const resultData = yield call(findSchedulerLogByPage, queryParam);
      if (!resultData) return;
      const { records, total, size, current } = resultData;
      if (!records) return;
      // 保存数据
      pagination = { ...pagination, pageSize: size, current, total };
      yield put({ type: 'save', payload: { data: records, queryParam, pagination } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
