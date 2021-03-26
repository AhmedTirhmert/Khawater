import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import AuthStore from "../store";
// import store from "../store/index";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  AuthStore._actions["AuthStore/getCurrentLoggedInUser"]
    [0]()
    .then((res) => {
      if (to.meta.requireAuth) {
        if (res) {
          next();
        } else {
          next({ name: "Home" });
        }
      } else if (to.meta.guest) {
        if (res) {
          next({ name: "Home" });
        } else {
          next();
        }
      } else {
        next();
      }
    })
    .catch(() => {
      if (to.meta.requireAuth) {
        next({ name: "Home" });
      } else {
        next();
      }
    });
});

export default router;
