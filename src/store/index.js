import Vue from 'vue';
import Vuex from 'vuex';

import { getProject, postDonation } from '@/api';

Vue.use(Vuex);

const actions = {
  getProject: ({ commit }) => getProject().then(project => commit('getProject', project)),
  postDonation: ({ commit }, amount) => postDonation(amount).then(donation => commit('postDonation', donation)),
};

const mutations = {
  getProject(state, project) {
    // eslint-disable-next-line
    state.project = project;
  },
  postDonation(state, donation) {
    // eslint-disable-next-line
    state.donation = donation;
  },
};

const state = {
  donation: null,
  project: null,
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
});
