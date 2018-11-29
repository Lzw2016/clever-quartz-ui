// import lodash from 'lodash';
import { getJobGroupNames, getAllJobClassName } from '../services/quartz-job-detail-controller';
import { getTriggerGroupNames } from '../services/quartz-trigger-controller';
import { allScheduler } from '../services/quartz-scheduler-controller';

export default {
  namespace: 'GlobalEnumModel',

  state: {
    schedulerList: [],    // 所有调度器
    jobClassNameList: [], // 所有的Job类型
    jobGroupList: [],     // 所有的Job Group Name
    triggerGroupList: [], // 所有触发器组 Group Name
    // roleNameList: [],  // 所有的角色名称
  },

  effects: {
    *getAllJobClassName(_, { call, put }) {
      // 请求数据
      const jobClassNameList = yield call(getAllJobClassName);
      if (!jobClassNameList) return;
      yield put({ type: 'save', payload: { jobClassNameList } });
    },
    *getJobGroupNames(_, { call, put }) {
      // 请求数据
      const jobGroupList = yield call(getJobGroupNames);
      if (!jobGroupList) return;
      yield put({ type: 'save', payload: { jobGroupList } });
    },
    *allScheduler(_, { call, put }) {
      // 请求数据
      const schedulerList = yield call(allScheduler);
      if (!schedulerList) return;
      yield put({ type: 'save', payload: { schedulerList } });
    },
    *getTriggerGroupNames(_, { call, put }) {
      // 请求数据
      const triggerGroupList = yield call(getTriggerGroupNames);
      if (!triggerGroupList) return;
      yield put({ type: 'save', payload: { triggerGroupList } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
