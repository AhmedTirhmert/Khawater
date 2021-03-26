<template>
  <main-layout />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MainLayout from "./Layouts/MainLayout";

export default {
  name: "App",

  components: {
    MainLayout,
  },
  methods: {
    ...mapActions("AuthStore", ["getCurrentLoggedInUser"]),
    ...mapActions("NotesStore", ["getCategories", "getProjects"]),
  },
  computed: {
    ...mapGetters("AuthStore", ["isAuthenticated"]),
  },
  created() {
    this.$nextTick(() => {
      this.getCurrentLoggedInUser();
    });
  },
  mounted() {
    this.getProjects();
    this.getCategories();
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped lang='scss'>

</style>
