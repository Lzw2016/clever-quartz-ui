// import lodash from 'lodash';
import { allScheduler } from '../services/quartz-scheduler-controller';

export default {
  namespace: 'SchedulerModel',

  state: {
    queryParam: {
    },
    data: [],
  },

  effects: {
    *findByPage({ payload }, { select, call, put }) {
      let queryParam = yield select(state => state.SchedulerModel.queryParam);
      queryParam = { ...queryParam, ...payload }
      // 请求数据
      const data = yield call(allScheduler, queryParam);
      if (!data) return;
      yield put({ type: 'save', payload: { data, queryParam } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
