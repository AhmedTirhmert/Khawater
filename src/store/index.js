import Vue from "vue";
import Vuex from "vuex";
import AuthStore from "./AuthStore";
import NotesStore from "./NotesStore";
import CategoriesStore from "./CatsStore";
import ProjectsStore from "./ProsStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    AuthStore,
    NotesStore,
    CategoriesStore,
    ProjectsStore,
  },
});
