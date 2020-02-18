import Vue from 'vue';
import Vuex from 'vuex';

// nav
import subNav from './nav/subNav';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    subNav,
  },
  strict: debug
});
