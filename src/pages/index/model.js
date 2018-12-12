
// import Taro from '@tarojs/taro';
import * as indexApi from './service';

export default {
  namespace: 'index',
  state: {
  },

  effects: {
    *test() {
      console.log(222)
    }

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }

}
