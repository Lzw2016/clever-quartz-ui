// import lodash from 'lodash';
// import { catIndex } from '../services/index-cat-controller';

export default {
  namespace: 'AllJobModel',

  state: {
  },

  effects: {
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
