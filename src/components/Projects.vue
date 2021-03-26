<template>
  <v-sheet rounded="lg" min-height="268" class="mb-3 pa-2">
    <v-row class="d-flex justify-center my-0 px-5">
      <p class="text-h6 text-center font-weight-black mt-2 secondary--text">
        المشاريع
      </p>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        class="mt-4 mb-5"
        icon
        outlined
        elevation="2"
        x-small
        @click="$emit('showAddProDialog', true)"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="mx-4"></v-divider>
    <v-list dense class="scrollable" max-height="300">
      <v-list-item-group v-model="SelectedPro" color="primary">
        <v-list-item
          class="text-subtitle-2 font-weight-bold"
          v-for="(project, key, index) in localProjects"
          :key="key"
          @click="$emit('filterNotesByProject', key)"
        >
          <v-list-item-icon>
            <v-icon>mdi-clipboard-check-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="project.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon class="my-auto">
            <div class="py-auto">
              <v-chip x-small color="grey lighten-2"
                ><span class="">
                  {{ index == 0 ? totalNotes : project.notesCount }}
                </span>
              </v-chip>
            </div>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";
import methodes from "../Mixins/methodes";

export default {
  name: "projects",
  props: {},
  mixins: [methodes],
  mounted() {
    this.localProjects = this.AddAll(this.currentUserProjects);
  },
  data() {
    return {
      SelectedPro: 0,
      localProjects: [],
    };
  },
  computed: {
    ...mapGetters("NotesStore", ["currentUserProjects"]),
    totalNotes() {
      let total = 0;
      for (const pro in this.currentUserProjects) {
        total += this.currentUserProjects[pro].notesCount;
        console.log(total);
      }
      return total;
    },
  },
  watch: {
    currentUserProjects() {
      this.localProjects = this.AddAll(this.currentUserProjects);
    },
  },
};
</script>

<style  scoped>
</style>>
