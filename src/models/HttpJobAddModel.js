// import lodash from 'lodash';

export default {
    namespace: 'HttpJobAddModel',
  
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
  