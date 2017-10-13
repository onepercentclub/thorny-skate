import Vue from 'vue';
import Vuex from 'vuex';

import { getFundraiser, getOrder, getProject, postDonation } from '@/api';

Vue.use(Vuex);

const actions = {
  getFundraiser: ({ commit }, id) => getFundraiser(id)
    .then(fundraiser => commit('getFundraiser', fundraiser)),
  getOrder: ({ commit }, id) => getOrder(id)
    .then(order => commit('getOrder', order)),
  getProject: ({ commit }, slug) => getProject(slug)
    .then(project => commit('getProject', project)),
  postDonation: ({ commit }, { amount, fundraiser, slug }) => postDonation(amount, fundraiser, slug)
    .then(donation => commit('postDonation', donation)),
};

const mutations = {
  getFundraiser(state, fundraiser) {
    // eslint-disable-next-line
    state.fundraiser = fundraiser;
  },
  getOrder(state, order) {
    // eslint-disable-next-line
    state.order = order;
  },
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
  fundraiser: null,
  order: null,
  project: null,
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
});
