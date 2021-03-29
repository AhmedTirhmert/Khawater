import Vue from "vue";
import axios from "../axios/index";
// Global Variables
//where the auth data goes
const state = {
  Loadings: {
    addNewPro: false,
  },
  Responses: {
    addNewPro: {
      Type: "success",
      Message: null,
    },
  },
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setNewProLoading(state, loading) {
    Vue.set(state.Loadings, "addNewPro", loading);
  },
  setNewProResponseType(state, response) {
    Vue.set(state.Responses.addNewPro, "Type", response);
  },
  setNewProResponseMessage(state, response) {
    Vue.set(state.Responses.addNewPro, "Message", response);
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  addNewProject({ commit }, name) {
    commit("setNewProLoading", true);
    axios({
      method: "POST",
      url: "/api/addnewproject",
      params: {
        name: name,
      },
    })
      .then((response) => {
        commit("setNewProResponseType", "success");
        commit("setNewProResponseMessage", response.data.Message);
        commit("setNewProLoading", false);
        commit(
          "NotesStore/setProjects",
          {
            projectKey: response.data.createdProject.id,
            project: {
              name: response.data.createdProject.name,
              notesCount: 0,
            },
          },
          { root: true }
        );
      })
      .catch((err) => {
        console.log(err.response);
        let errortype = Object.keys(err.response.data.errors)[0];
        let message = err.response.data.errors[errortype][0];

        commit("setNewProResponseType", "error");
        commit("setNewProResponseMessage", message);
        commit("setNewProLoading", false);
      });
  },
};
//methods to get data from state object and make availible in vue components
const getters = {
  getAddProLoading: (state) => {
    return state.Loadings.addNewPro;
  },
  getAddProResponse: (state) => {
    return state.Responses.addNewPro;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
