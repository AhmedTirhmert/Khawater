import Vue from "vue";
import axios from "../axios/index";
// Global Variables
let errors = [];
let success = [];
//where the auth data goes
const state = {
  publicNotes: {},
  currentUserNotes: {},
  Projects: {},
  Categories: {},
  Loadings: {
    addNewNoteLoading: false,
    editNote: false,
    deleteNote: false,
  },
  response: {
    responseMessage: null,
    type: "error",
  },

  //  pagination: {
  //   Pages: null,
  //   currentPage: 1,
  // },
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  setCurrentUserNotes(state, payload) {
    Vue.set(state.currentUserNotes, payload.noteKey, payload.noteContent);
  },
  deleteNote(state, payload) {
    Vue.delete(state.currentUserNotes, payload);
  },
  resetCurrentUserNotes(state) {
    state.currentUserNotes = {};
  },
  setPublicNotes(state, payload) {
    Vue.set(state.publicNotes, payload.noteKey, payload.noteContent);
  },
  setCategories(state, payload) {
    Vue.set(state.Categories, payload.categoryKey, payload.category);
  },
  setProjects(state, payload) {
    Vue.set(state.Projects, payload.projectKey, payload.project);
  },
  setLoadings(state, payload) {
    Vue.set(state.Loadings, payload.loadingKey, payload.loadingState);
  },
  setResponse(state, payload) {
    Vue.set(state.response, "responseMessage", payload.responseMessage);
    Vue.set(state.response, "type", payload.type);
  },
  resetCurrentUserPros(state) {
    state.Projects = {};
  },
  resetCurrentUserCats(state) {
    state.Categories = {};
  },
  decrementProCount(state, payload) {
    Vue.set(
      state.Projects[payload],
      "notesCount",
      state.Projects[payload].notesCount - 1
    );
  },
  incrementProCount(state, payload) {
    Vue.set(
      state.Projects[payload],
      "notesCount",
      state.Projects[payload].notesCount + 1
    );
  },
  // setPages(state, payload) {
  //   state.pagination.Pages = payload;
  // },
  // setCurrentPage(state, payload) {
  //   Vue.set(state.pagination, "currentPage", payload);
  // },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  getCurrentUserNotes({ commit, rootState }) {
    // commit("setCurrentPage", payload);
    axios({
      method: "get",
      url: "/api/currentUserNotes",
      params: {
        userId: rootState.AuthStore.currentUser.infos.id,
      },
    })
      .then((response) => {
        console.log(response);
        // commit("setPages", response.data.Notes.last_page);
        // commit("resetCurrentUserNotes");
        response.data.Notes.forEach((element) => {
          // console.log(element.id);
          commit("setCurrentUserNotes", {
            noteKey: element.id,
            noteContent: element,
          });
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  },
  getPublicNotes({ commit }) {
    axios({
      method: "get",
      url: "/api/publicNotes",
    })
      .then((response) => {
        response.data.Notes.forEach((element) => {
          commit("setPublicNotes", {
            noteKey: element.id,
            noteContent: element,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getCategories({ commit }) {
    axios({
      method: "get",
      url: "/api/currentUserCategories",
    })
      .then((response) => {
        response.data.Categories.forEach((element) => {
          commit("setCategories", {
            categoryKey: element.id,
            category: {
              title: element.title,
              notesCount: element.notes_count,
            },
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getProjects({ commit }) {
    axios({
      method: "get",
      url: "/api/currentUserProjects",
    })
      .then((response) => {
        response.data.Projects.forEach((element) => {
          commit("setProjects", {
            projectKey: element.id,
            project: {
              name: element.name,
              notesCount: element.notes_count,
            },
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addNewNote({ rootState, commit }, payload) {
    commit("setLoadings", {
      loadingKey: "addNewNoteLoading",
      loadingState: true,
    });
    let tempNote = payload;
    tempNote["userId"] = rootState.AuthStore.currentUser.infos.id;

    axios({
      method: "post",
      url: "/api/addNewNote",
      params: {
        Note: tempNote,
      },
    })
      .then((response) => {
        if (response.data.Success) {
          commit("setResponse", {
            responseMessage: response.data.Message,
            type: "success",
          });
          commit("setLoadings", {
            loadingKey: "addNewNoteLoading",
            loadingState: false,
          });
          let CreatedNote = response.data.newNote;
          commit("setCurrentUserNotes", {
            noteKey: response.data.newNote.id,
            noteContent: CreatedNote,
          });
          commit("incrementProCount", CreatedNote.project_id);
          if (CreatedNote.public) {
            commit("setPublicNotes", {
              noteKey: response.data.newNote.id,
              noteContent: CreatedNote,
            });
          }
        }
      })
      .catch((error) => {
        commit("setResponse", {
          responseMessage: error.response.Message,
          type: "error",
        });
        commit("setLoadings", {
          loadingKey: "addNewNoteLoading",
          loadingState: false,
        });
      });
  },
  updateNote({ commit }, payload) {
    commit("setLoadings", {
      loadingKey: "editNote",
      loadingState: true,
    });
    axios({
      method: "PUT",
      url: `/api/updatenote/${payload.id}`,
      params: {
        note: payload,
      },
    })
      .then((response) => {
        commit("setCurrentUserNotes", {
          noteKey: response.data.edittedNote.id,
          noteContent: response.data.edittedNote,
        });
        success = [];
        success.push(response.data.Message);
        commit("setResponse", {
          responseMessage: success,
          type: "success",
        });
        commit("setLoadings", {
          loadingKey: "editNote",
          loadingState: false,
        });
      })
      .catch((error) => {
        errors = [];
        error.response.data.errors.forEach((elm) => {
          errors.push(elm);
        });

        commit("setResponse", {
          responseMessage: errors,
          type: "error",
        });
        commit("setLoadings", {
          loadingKey: "editNote",
          loadingState: false,
        });
      });
  },
  deleteNote({ commit, state }, payload) {
    commit("setLoadings", {
      loadingKey: "deleteNote",
      loadingState: true,
    });
    axios({
      method: "PUT",
      url: `api/deletenote/${payload}`,
    })
      .then((response) => {
        commit("setLoadings", {
          loadingKey: "deleteNote",
          loadingState: false,
        });
        commit("setResponse", {
          responseMessage: response.data.Message,
          type: "success",
        });
        commit("decrementProCount", state.currentUserNotes[payload].project_id);
        commit("deleteNote", payload);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },
};
//methods to get data from state object and make availible in vue components
const getters = {
  publicNotes: (state) => {
    return state.publicNotes;
  },
  currentUserNotes: (state) => {
    return state.currentUserNotes;
  },
  currentUserProjects: (state) => {
    return state.Projects;
  },
  currentUserCatgeories: (state) => {
    return state.Categories;
  },
  addNewNoteLoading: (state) => {
    return state.Loadings.addNewNoteLoading;
  },
  response: (state) => {
    return state.response;
  },
  editNoteLoading: (state) => {
    return state.Loadings.editNote;
  },
  getPages: (state) => {
    return state.pagination.Pages;
  },
  getCurrentPage: (state) => {
    return state.pagination.currentPage;
  },
  deleteNoteLoading: (state) => {
    return state.Loadings.deleteNote;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
