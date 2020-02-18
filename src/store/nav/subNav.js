import api from '@/api';

const state = {
  items: Array
};

const getters = {
  items: state => (state.items !== undefined ? state.items : [])
};

const mutations = {
  SET_SUBNAV_ITEMS(state, items) {
    state.items = items;
  }
};

const actions = {
  async fetch({ commit }, slug) {
    let parent = await api.contentful.bySlug(slug);
    commit(
      'SET_SUBNAV_ITEMS',
      parent.fields.subPages.map(item => {
        return {
          id: item.sys.id,
          slug: item.fields.slug,
          pageName: item.fields.pageName
        };
      })
    );
  },
  update({ commit }, items) {
    debugger;
    commit(
      'SET_SUBNAV_ITEMS',
      items.map(item => {
        return {
          id: item.sys.id,
          slug: item.fields.slug,
          pageName: item.fields.pageName
        };
      })
    );
  }
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
