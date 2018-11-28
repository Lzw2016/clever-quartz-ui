// import lodash from 'lodash';
import { ModelInitState } from '../utils/constant';
// import { catIndex } from '../services/index-cat-controller';

export default {
  namespace: 'AllTriggerModel',

  state: {
    queryParam: {
      ...ModelInitState.queryParam,
    },
    pagination: {
      ...ModelInitState.pagination,
    },
    data: [],
  },

  effects: {
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
