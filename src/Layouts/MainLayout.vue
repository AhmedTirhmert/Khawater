<template>
  <v-app id="inspire">
    <v-app-bar app color="indigo" class="white--text" flat>
      <v-avatar
        v-if="isAuthenticated"
        class="d-md"
        color="grey darken-1 shrink"
        size="32"
        @click="$router.push({ name: 'Profile' })"
      ></v-avatar>
      <v-spacer></v-spacer>
      <v-toolbar-title
        @click="$router.push({ name: 'Home' })"
        class="headerTitle"
        >خواطر</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        v-if="
          !isAuthenticated &&
          currentPage != 'Login' &&
          currentPage != 'Register'
        "
        color="blue accent-4 white--text"
        class="ml-auto"
        :to="{ name: 'Login' }"
      >
        <v-icon left color="white" class="">mdi-login</v-icon>
        دخول
      </v-btn>

      <v-btn
        v-else-if="isAuthenticated && currentPage != 'Login'"
        color="teal lighten-1 white--text"
        class="ml-auto"
        @click="logOutUser"
        :loading="logoutLoading"
      >
        خروج
        <v-icon right color="white" class="rotate180">mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({}),
  mounted() {},
  methods: {
    ...mapActions("AuthStore", ["logOutUser"]),
  },
  computed: {
    ...mapGetters("AuthStore", ["isAuthenticated", "logoutLoading"]),
    ...mapGetters("NotesStore", ["response"]),
    currentPage() {
      return this.$route.name;
    },
  },
};
</script>
<style lang='scss' scoped>
.rotate90 {
  transform: rotate(90deg);
}
.rotate180 {
  transform: rotate(180deg);
}

@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css");

.face-button {
  $height: 40px;
  $accentColor: #e43;

  height: $height;
  display: inline-block;
  border: 3px solid $accentColor;
  font-size: 20px;
  font-weight: 500;
  text-align: end;
  text-decoration: none;
  color: $accentColor;
  background-color: ivory;
  overflow: hidden;

  .icon {
    margin-right: 6px;
  }

  .face-primary,
  .face-secondary {
    display: block;
    padding: 0 20px;
    line-height: $height;
    transition: margin 0.4s;
  }

  .face-primary {
    background-color: $accentColor;

    color: #fff;
  }

  &:hover .face-primary {
    margin-top: -$height;
  }
}
</style>