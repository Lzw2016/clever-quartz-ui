// import lodash from 'lodash';
import { ModelInitState } from '../utils/constant';
import { getJobKeyByGroup, findJobDetail } from '../services/quartz-job-detail-controller';

export default {
  namespace: 'AllJobModel',

  state: {
    queryParam: {
      ...ModelInitState.queryParam,
      jobGroup: undefined,
      jobName: undefined,
      jobClassName: undefined,
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
      let queryParam = yield select(state => state.AllJobModel.queryParam);
      let pagination = yield select(state => state.AllJobModel.pagination);
      queryParam = { ...queryParam, ...payload }
      // 请求数据
      const resultData = yield call(findJobDetail, queryParam);
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
