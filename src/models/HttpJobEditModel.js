// import lodash from 'lodash';

export default {
  namespace: 'HttpJobEditModel',

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
