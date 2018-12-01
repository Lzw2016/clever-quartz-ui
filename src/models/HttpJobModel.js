// import lodash from 'lodash';
import { ModelInitState } from '../utils/constant';
import { queryJobAndTrigger } from '../services/query-controller';
import { getJobKeyByGroup, pauseJob, resumeJob, triggerJob, deleteJobDetail } from '../services/quartz-job-detail-controller';

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
    *pauseJob({ payload, successCallBack }, { call, put }) {
      // 请求数据
      const resultData = yield call(pauseJob, payload);
      if (!resultData) return;
      yield put({ type: 'findByPage' });
      // 回调
      if (successCallBack instanceof Function) {
        successCallBack(resultData);
      }
    },
    *resumeJob({ payload, successCallBack }, { call, put }) {
      // 请求数据
      const resultData = yield call(resumeJob, payload);
      if (!resultData) return;
      yield put({ type: 'findByPage' });
      // 回调
      if (successCallBack instanceof Function) {
        successCallBack(resultData);
      }
    },
    *triggerJob({ payload, successCallBack }, { call, put }) {
      // 请求数据
      const resultData = yield call(triggerJob, payload);
      if (!resultData) return;
      yield put({ type: 'findByPage' });
      // 回调
      if (successCallBack instanceof Function) {
        successCallBack(resultData);
      }
    },
    *deleteJobDetail({ payload, successCallBack }, { call, put }) {
      // 请求数据
      const resultData = yield call(deleteJobDetail, payload);
      if (!resultData) return;
      yield put({ type: 'findByPage' });
      // 回调
      if (successCallBack instanceof Function) {
        successCallBack(resultData);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
