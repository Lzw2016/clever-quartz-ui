// import lodash from 'lodash';
import { ModelInitState } from '../utils/constant';
import { getJobKeyByGroup } from '../services/quartz-job-detail-controller';
import { getTriggerKeyByGroup } from '../services/quartz-trigger-controller';
import { findTriggerLogByPage } from '../services/log-controller';

export default {
  namespace: 'TriggerLogModel',

  state: {
    queryParam: {
      ...ModelInitState.queryParam,
      schedName: undefined,
      instanceName: undefined,
      triggerGroup: undefined,
      triggerName: undefined,
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
    triggerKeyNameList: [],
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
    *getTriggerKeyByGroup({ payload }, { call, put }) {
      const { triggerGroup } = payload;
      let triggerKeyNameList = [];
      if (triggerGroup) {
        // 请求数据
        triggerKeyNameList = yield call(getTriggerKeyByGroup, triggerGroup);
      }
      if (!triggerKeyNameList) return;
      yield put({ type: 'save', payload: { triggerKeyNameList } });
    },
    *findByPage({ payload }, { select, call, put }) {
      let queryParam = yield select(state => state.TriggerLogModel.queryParam);
      let pagination = yield select(state => state.TriggerLogModel.pagination);
      queryParam = { ...queryParam, ...payload }
      // 请求数据
      const resultData = yield call(findTriggerLogByPage, queryParam);
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
