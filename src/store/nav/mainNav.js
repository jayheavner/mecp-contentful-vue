import api from '@/api';

const state = {
  items: Array
};

const getters = {
  items: state => (state.items !== undefined ? state.items : [])
};

const mutations = {
  SET_NAV_ITEMS(state, items) {
    state.items = items;
  }
};

const actions = {
  async fetch({ commit } ) {
    let parent = await api.contentful.getMainNav();
    commit(
      'SET_NAV_ITEMS',
      parent.fields.subNav.map(item => {
        return {
          id: item.sys.id,
          slug: item.fields.slug,
          pageName: item.fields.pageName
        };
      })
    );
  },
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
