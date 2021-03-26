import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import customCss from "./css/main.scss";
import VueMasonry from "vue-masonry-css";

Vue.use(VueMasonry);
Vue.config.productionTip = false;
Vue.use(customCss);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
