
<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="5" sm="12" class="mt-4 transparent">
        <!-- <v-sheet rounded="lg" min-height="268"> -->
        <v-card
          elevation="5"
          class="rounded-lg"
          :loading="registerLoading"
          :disabled="registerLoading"
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
              <p class="hearderTitle">إنشاء حساب جديد</p>
            </div>
            <v-alert
              v-if="errorMessages.register != ''"
              dense
              border="left"
              type="error"
              dismissible
              @input="resetAuthError"
            >
              {{ errorMessages.register }}
            </v-alert>
            <v-text-field
              v-model="registerUserData.username"
              placeholder="اسم االمستخدم"
              outlined
              type="text"
              dense
              color="teal darken-3"
              class="mb-1"
            />
            <v-text-field
              v-model="registerUserData.email"
              placeholder="البريد الإلكتروني"
              outlined
              type="email"
              dense
              color="teal darken-3"
              class="mb-1"
            />
            <v-text-field
              v-model="registerUserData.password"
              placeholder="كلمة السر"
              outlined
              :type="showpass ? 'text' : 'password'"
              :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showpass = !showpass"
              dense
              class="mb-1"
              color="teal darken-3"
            />
            <v-text-field
              v-model="registerUserData.password_confirmation"
              placeholder="تأكيد كلمة السر"
              outlined
              :type="showpassConf ? 'text' : 'password'"
              :append-icon="showpassConf ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showpassConf = !showpassConf"
              dense
              class="mb-1"
              color="teal darken-3"
            />
            <v-btn
              block
              color="teal darken-3 white--text"
              elevation="3"
              @click="register"
              >إنشاء حساب</v-btn
            >
          </div>
          <div class="text-center text-subtitle2 pb-2">
            أو قم<router-link class="LinkNoUnderLine" :to="{ name: 'Login' }">
              بتسجيل الدخول
            </router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "register",
  data: () => {
    return {
      registerUserData: {
        rememberMe: false,
        email: "",
        password: "",
        password_confirmation: "",
      },
      showpass: false,
      showpassConf: false,
    };
  },
  mounted() {},
  methods: {
    ...mapActions("AuthStore", ["registerUser"]),
    ...mapMutations("AuthStore", ["resetAuthError"]),

    register() {
      this.registerUser(this.registerUserData);
    },
  },
  computed: {
    ...mapGetters("AuthStore", ["registerLoading"]),
    ...mapState("AuthStore", ["errorMessages"]),
  },
};
</script>
<style  >
.LinkNoUnderLine {
  text-decoration: none;
}
</style>
