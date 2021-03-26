import Vue from "vue";
import axios from "../axios/index";
import router from "../router/index";

// Global Variables
//where the auth data goes
const state = {
  currentUser: {},
  loadings: {
    login: false,
    logout: false,
    register: false,
  },
  errorMessages: {
    login: "",
    register: "",
  },
};
//methods to manipulate state data can't be async INSTANT CHANGES
const mutations = {
  resetCurrentUser(state) {
    state.currentUser = {};
  },
  setCurrentUserInfos(state, currentUser) {
    Vue.set(state.currentUser, "infos", currentUser);
  },
  setLoginLoading(state, loadingstate) {
    Vue.set(state.loadings, "login", loadingstate);
  },
  setRegisterLoading(state, loadingstate) {
    Vue.set(state.loadings, "register", loadingstate);
  },
  setLogoutLoading(state, loadingstate) {
    Vue.set(state.loadings, "logout", loadingstate);
  },
  setCurrentUserAuthentication(state, authenticated) {
    Vue.set(state.currentUser, "isAuthenticated", authenticated);
  },
  setLoginError(state, errorMessage) {
    Vue.set(state.errorMessages, "login", errorMessage);
  },
  setRegisterError(state, errorMessage) {
    Vue.set(state.errorMessages, "register", errorMessage);
  },
};
//methods to manipulate state data and triger mutations  can be async REQUESTS TO SERVERS
const actions = {
  getCurrentLoggedInUser({ commit, state }) {
    return new Promise((reject, resolve) => {
      if (typeof state.currentUser.isAuthenticated != "undefined") {
        reject(state.currentUser.isAuthenticated);
      } else {
        axios
          .get("/api/getCurrentLoggedInUser")
          .then((response) => {
            commit("setCurrentUserInfos", response.data);
            commit("setCurrentUserAuthentication", true);
            reject(state.currentUser.isAuthenticated);
          })
          .catch((error) => {
            resolve(error.response.data);
          });
      }
    });
  },
  loginUser({ commit, dispatch }, payload) {
    commit("setLoginError", "");
    commit("setLoginLoading", true);
    axios.get("/sanctum/csrf-cookie").then(() => {
      axios
        .post("/login", {
          email: payload.email,
          password: payload.password,
          remember: payload.rememberMe,
        })
        .then((response) => {
          if (response.data.Success) {
            dispatch("NotesStore/getCategories", null, { root: true });
            dispatch("NotesStore/getProjects", null, { root: true });
            router.push({ name: "Profile" });
            commit("setLoginLoading", false);
          }
        })
        .catch(() => {
          commit("setLoginLoading", false);
          commit("setLoginError", "البريد الإلكتروني أو كلمة المرور غير صحيحة");
        });
    });
  },
  logOutUser({ commit }) {
    commit("setLogoutLoading", true);
    axios
      .post("/logout")
      .then((response) => {
        if (response.data.Success) {
          commit("resetCurrentUser");
          commit("NotesStore/resetCurrentUserNotes", null, { root: true });
          commit("NotesStore/resetCurrentUserCats", null, { root: true });
          commit("NotesStore/resetCurrentUserPros", null, { root: true });
          commit("setLogoutLoading", false);
          router.push({ name: "Home" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
//methods to get data from state object and make availible in vue components
const getters = {
  isAuthenticated: (state) => {
    return state.currentUser.isAuthenticated;
  },
  loginLoading: (state) => {
    return state.loadings.login;
  },
  logoutLoading: (state) => {
    return state.loadings.logout;
  },
  registerLoading: (state) => {
    return state.loadings.register;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
