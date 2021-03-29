<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="5" sm="12" class="mt-4 transparent">
        <!-- <v-sheet rounded="lg" min-height="268"> -->
        <v-card
          elevation="5"
          class="rounded-lg"
          :loading="loginLoading"
          :disabled="loginLoading"
        >
          <template slot="progress">
            <v-progress-linear
              color="teal darken-3"
              height="7"
              indeterminate
            ></v-progress-linear>
          </template>
          <div class="px-3 py-5" div>
            <div class="text-h4 text-center font-weight-black py-5">
              <p class="hearderTitle">تسجيل الدخول</p>
            </div>
            <v-alert
              v-show="errorMessages.login != ''"
              dense
              border="left"
              type="error"
              dismissible
              @input="resetAuthError"
            >
              {{ errorMessages.login }}
            </v-alert>
            <v-text-field
              v-model="loginUserData.email"
              placeholder="البريد الإلكتروني"
              outlined
              type="email"
              dense
              color="teal darken-3"
              class="mb-1"
            />
            <v-text-field
              v-model="loginUserData.password"
              placeholder="كلمه السر"
              outlined
              :type="showpass ? 'text' : 'password'"
              :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showpass = !showpass"
              dense
              class="mb-1"
              color="teal darken-3"
            />
            <v-checkbox
              v-model="loginUserData.rememberMe"
              label="تذكرني"
              color="teal darken-3"
              class="mb-1"
            ></v-checkbox>
            <v-btn
              block
              color="teal darken-3 white--text"
              elevation="3"
              @click="Login"
              >تسجيل الدخول</v-btn
            >
          </div>
          <div class="text-center text-subtitle2 pb-2">
            أو قم<router-link
              class="LinkNoUnderLine"
              :to="{ name: 'Register' }"
            >
              بالتسجيل
            </router-link>
          </div>
        </v-card>
        <!-- </v-sheet> -->
        <!-- <v-card elevation="5" class="px-5 py-3 rounded-lg my-3">
          <div class="text-h4 text-center font-weight-black py-5">
            <p class="hearderTitle">تسجيل</p>
          </div>
          <v-text-field
            v-model="registerUser.username"
            placeholder="إسم المستعمل"
            outlined
            dense
            class="mb-1"
          />
          <v-text-field
            v-model="registerUser.email"
            placeholder="البريد الإلكتروني"
            outlined
            type="email"
            dense
            class="mb-1"
          />
          <v-text-field
            v-model="registerUser.password"
            type="password"
            placeholder="كلمه السر"
            outlined
            dense
            class="mb-1"
          />

          <v-btn block color="primary" elevation="3">تسجيل</v-btn>
        </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "Login",
  data: () => {
    return {
      loginUserData: {
        rememberMe: false,
        email: "",
        password: "",
      },
      registerUser: {
        username: "",
        email: "",
        password: "",
      },
      showpass: false,
    };
  },
  mounted() {},
  methods: {
    ...mapActions("AuthStore", ["loginUser"]),
    ...mapMutations("AuthStore", ["resetAuthError"]),
    Login() {
      this.loginUser(this.loginUserData);
    },
    // Register() {
    //   axios.get("/sanctum/csrf-cookie").then((response) => {
    //     console.log(response);
    //     axios
    //       .post("/register", {
    //         email: this.registerUser.email,
    //         password: this.registerUser.password,
    //         password_confirmation: this.registerUser.password,
    //         name: this.registerUser.username,
    //       })
    //       .then((res) => {
    //         console.log(res);
    //       });
    //   });
    // },
  },
  computed: {
    ...mapGetters("AuthStore", ["loginLoading"]),
    ...mapState("AuthStore", ["errorMessages"]),
  },
};
</script>
<style  >
.LinkNoUnderLine {
  text-decoration: none;
}
</style>
