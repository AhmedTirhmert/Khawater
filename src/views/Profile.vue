<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="12" lg="3" md="12">
        <projects
          v-if="isAuthenticated"
          @filterNotesByProject="filterByProId"
          @showAddProDialog="showAddProDialog"
        />
        <categories
          @filterNotesByCategory="filterByCatId"
          v-if="isAuthenticated"
          @showAddCatDialog="showAddCatDialog"
        />
      </v-col>
      <v-col cols="12" sm="12" lg="9" md="12">
        <notes
          :Editable="true"
          :title="'مذكرات خاصة'"
          :Notes="passedNotes ? passedNotes : currentUserNotes"
          @setNewDialog="setNewDialog"
          :isAuth="isAuthenticated"
          @editNote="editNote"
          @deleteNote="deleteNote"
        />
      </v-col>
    </v-row>
    <new-note-dialog
      :newNoteDialog="Dialogs.newNote"
      @setNewDialog="setNewDialog"
      :Projects="currentUserProjects | toArray"
      :Categories="currentUserCatgeories | toArray"
    ></new-note-dialog>
    <new-cat-dialog
      :newCat="Dialogs.newCat"
      @showAddCatDialog="showAddCatDialog"
    />
    <new-pro-dialog
      :newPro="Dialogs.newPro"
      @showAddProDialog="showAddProDialog"
    />
    <edit-note-dialog
      :editNoteDialog="Dialogs.editNote"
      @setNewDialog="Dialogs.editNote = false"
      :Projects="currentUserProjects | toArray"
      :Categories="currentUserCatgeories | toArray"
      :selectedNote="selectedNote"
    />
    <delete-note-dialog
      :deleteNoteDialog="Dialogs.deleteNote"
      :noteToDelete="selectedNote"
      @closeEditNoteDialog="Dialogs.deleteNote = false"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import filters from "../Mixins/filters";
import CatsMethods from "../Mixins/CatsFunctions";
import ProsMethods from "../Mixins/ProsFunctions";

// @ is an alias to /src
export default {
  name: "Profile",
  mixins: [filters, CatsMethods, ProsMethods],
  components: {
    Notes: () => import("../components/notesVsheet"),
    Categories: () => import("../components/Categories"),
    projects: () => import("../components/Projects"),
    newNoteDialog: () => import("../components/NewNoteDialog"),
    newCatDialog: () => import("../components/NewCategoryDialog"),
    newProDialog: () => import("../components/NewProjectDialog"),
    editNoteDialog: () => import("../components/EditNoteDialog"),
    deleteNoteDialog: () => import("../components/deleteNoteDialog"),
  },
  data() {
    return {
      locallyStorredNotes: null,

      passedNotes: null,
      Dialogs: {
        newNote: false,
        newCat: false,
        newPro: false,
        editNote: false,
        deleteNote: false,
      },
      Selected: {
        projectId: 0,
        categoryId: 0,
      },
      selectedNote: {},
    };
  },

  methods: {
    ...mapActions("AuthStore", ["logOutUser"]),
    ...mapActions("NotesStore", ["getCurrentUserNotes"]),

    setNewDialog(state) {
      this.Dialogs.newNote = state;
    },
    editNote(id) {
      this.Dialogs.editNote = true;
      this.selectedNote = this.locallyStorredNotes[id];
    },
    deleteNote(id) {
      this.Dialogs.deleteNote = true;
      this.selectedNote = {
        id: this.locallyStorredNotes[id].id,
        title: this.locallyStorredNotes[id].title,
      };
    },
  },
  mounted() {
    this.getCurrentUserNotes();
    this.locallyStorredNotes = this.currentUserNotes;
  },

  computed: {
    ...mapGetters("AuthStore", ["isAuthenticated"]),
    ...mapGetters("NotesStore", [
      "currentUserNotes",
      "currentUserCatgeories",
      "currentUserProjects",
    ]),
  },
  watch: {},
};
</script>
