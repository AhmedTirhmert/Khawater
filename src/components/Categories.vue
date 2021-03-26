<template>
  <v-sheet rounded="lg" min-height="268" class="pa-2">
    <v-row class="d-flex justify-center my-0 px-5">
      <p class="text-h6 text-center font-weight-black mt-2 secondary--text">
        التصنيفات
      </p>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        class="mt-4 mb-5"
        icon
        outlined
        elevation="2"
        x-small
        @click="$emit('showAddCatDialog', true)"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-divider class="mx-4"></v-divider>

    <v-list dense class="scrollable" max-height="300">
      <v-list-item-group v-model="SelectedCat" color="primary">
        <v-list-item
          v-for="(category, key) in localCats"
          :key="key"
          @click="$emit('filterNotesByCategory', key)"
        >
          <v-list-item-icon>
            <v-icon>mdi-collage</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="category"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";
import methodes from "../Mixins/methodes";

export default {
  name: "Categories",
  mixins: [methodes],
  props: {},
  mounted() {
    this.localCats = this.AddAll(this.currentUserCatgeories);
  },
  data() {
    return {
      SelectedCat: 0,
      localCats: [],
    };
  },
  computed: {
    ...mapGetters("NotesStore", ["currentUserCatgeories"]),
  },
  methods: {},
  filters: {},
  watch: {
    currentUserCatgeories() {
      this.localCats = this.AddAll(this.currentUserCatgeories);
    },
  },
};
</script>

<style>
</style>