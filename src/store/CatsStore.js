import Vue from "vue";
import axios from "../axios/index";
// Global Variables
//where the auth data goes
const state = {
  Loadings: {
    addNewCat: false,
  },
  Responses: {
    addNewCat: {
      Type: "success",
      Message: null,
    },
  },
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setNewCatLoading(state, loading) {
    Vue.set(state.Loadings, "addNewCat", loading);
  },
  setNewCatResponseType(state, response) {
    Vue.set(state.Responses.addNewCat, "Type", response);
  },
  setNewCatResponseMessage(state, response) {
    Vue.set(state.Responses.addNewCat, "Message", response);
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  addNewCategory({ commit }, name) {
    commit("setNewCatLoading", true);
    axios({
      method: "POST",
      url: "/api/addnewcategory",
      params: {
        title: name,
      },
    })
      .then((response) => {
        commit("setNewCatResponseType", "success");
        commit("setNewCatResponseMessage", response.data.Message);
        commit("setNewCatLoading", false);
        console.log(response.data.createdCat);
        commit(
          "NotesStore/setCategories",
          {
            categoryKey: response.data.createdCat.id,
            categoryTitle: response.data.createdCat.title,
          },
          { root: true }
        );
      })
      .catch((err) => {
        console.log(err.response);
        let errortype = Object.keys(err.response.data.errors)[0];
        let message = err.response.data.errors[errortype][0];

        commit("setNewCatResponseType", "error");
        commit("setNewCatResponseMessage", message);
        commit("setNewCatLoading", false);
      });
  },
};
//methods to get data from state object and make availible in vue components
const getters = {
  getAddCatLoading: (state) => {
    return state.Loadings.addNewCat;
  },
  getAddCatResponse: (state) => {
    return state.Responses.addNewCat;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
