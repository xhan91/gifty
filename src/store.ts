import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      Vue.set(state, 'user', user);
    },
  },
  actions: {
    setUser(context, user: object) {
      context.commit('setUser', user);
    },
  },
});
