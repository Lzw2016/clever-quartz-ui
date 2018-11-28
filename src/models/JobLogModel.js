// import lodash from 'lodash';
import { ModelInitState } from '../utils/constant';
import { getJobKeyByGroup } from '../services/quartz-job-detail-controller';
import { findJobLogByPage } from '../services/log-controller';

export default {
  namespace: 'JobLogModel',

  state: {
    queryParam: {
      ...ModelInitState.queryParam,
      schedName: undefined,
      instanceName: undefined,
      jobGroup: undefined,
      jobName: undefined,
      jobClassName: undefined,
      processTimeByMin: undefined,
      processTimeByMax: undefined,
      startTimeByStart: undefined,
      startTimeByEnd: undefined,
    },
    pagination: {
      ...ModelInitState.pagination,
    },
    data: [],

    jobKeyNameList: [],
  },

  effects: {
    *getJobKeyByGroup({ payload }, { call, put }) {
      const { jobGroup } = payload;
      let jobKeyNameList = [];
      if (jobGroup) {
        // 请求数据
        jobKeyNameList = yield call(getJobKeyByGroup, jobGroup);
      }
      if (!jobKeyNameList) return;
      yield put({ type: 'save', payload: { jobKeyNameList } });
    },
    *findByPage({ payload }, { select, call, put }) {
      let queryParam = yield select(state => state.JobLogModel.queryParam);
      let pagination = yield select(state => state.JobLogModel.pagination);
      queryParam = { ...queryParam, ...payload }
      // 请求数据
      const resultData = yield call(findJobLogByPage, queryParam);
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
