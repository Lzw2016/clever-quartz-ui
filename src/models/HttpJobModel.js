// import lodash from 'lodash';
import { ModelInitState } from '../utils/constant';
import { queryJobAndTrigger } from '../services/query-controller';
import { getJobKeyByGroup } from '../services/quartz-job-detail-controller';

export default {
  namespace: 'HttpJobModel',

  state: {
    queryParam: {
      ...ModelInitState.queryParam,
      jobGroup: undefined,
      jobName: undefined,
      jobClassName: 'org.clever.quartz.jobs.HttpServiceJob',
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
      let queryParam = yield select(state => state.HttpJobModel.queryParam);
      let pagination = yield select(state => state.HttpJobModel.pagination);
      queryParam = { ...queryParam, ...payload }
      // 请求数据
      const resultData = yield call(queryJobAndTrigger, queryParam);
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
