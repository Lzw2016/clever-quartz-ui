// import lodash from 'lodash';
import { getJobGroupNames, getAllJobClassName } from '../services/quartz-job-detail-controller';

export default {
  namespace: 'GlobalEnumModel',

  state: {
    jobClassNameList: [], // 获取所有的Job类型
    jobGroupList: [],     // 所有的Job Group Name
    // roleNameList: [], // 所有的角色名称
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
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
