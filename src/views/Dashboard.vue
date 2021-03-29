<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="12" lg="12" md="12">
        <notes
          :Editable="false"
          :title="'مذكرات عامة'"
          :Notes="passedNotes ? passedNotes : publicNotes"
          @setNewDialog="setNewDialog"
          :isAuth="isAuthenticated"
        />
      </v-col>
    </v-row>
    <new-note-dialog
      :newNoteDialog="Dialogs.newNote"
      @setNewDialog="setNewDialog"
      :Projects="currentUserProjects | toArray"
      :Categories="currentUserCatgeories | toArray"
      @showAddProDialog="showAddProDialog"
      @showAddCatDialog="showAddCatDialog"
    ></new-note-dialog>

    <new-cat-dialog
      :newCat="Dialogs.newCat"
      @showAddCatDialog="showAddCatDialog"
    />
    <new-pro-dialog
      :newPro="Dialogs.newPro"
      @showAddProDialog="showAddProDialog"
    />
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import Notes from "../components/notesVsheet";
import newNoteDialog from "../components/NewNoteDialog.vue";
import newCatDialog from "../components/NewCategoryDialog.vue";
import newProDialog from "../components/NewProjectDialog.vue";
import filters from "../Mixins/filters";
import CatsMethods from "../Mixins/CatsFunctions";
import ProsMethods from "../Mixins/ProsFunctions";

export default {
  name: "Dashboard",
  mixins: [filters, CatsMethods, ProsMethods],
  components: {
    Notes,
    newNoteDialog,
    newCatDialog,
    newProDialog,
  },
  data() {
    return {
      locallyStorredNotes: null,
      passedNotes: null,
      Dialogs: {
        newNote: false,
        newCat: false,
        newPro: false,
      },
      Selected: {
        projectId: 0,
        categoryId: 0,
      },
    };
  },
  watch: {},
  methods: {
    ...mapActions("NotesStore", ["getCurrentUserNotes", "getPublicNotes"]),
    setNewDialog(state) {
      this.Dialogs.newNote = state;
    },
  },
  computed: {
    ...mapGetters("AuthStore", ["isAuthenticated", "publicNotes"]),
    ...mapGetters("NotesStore", [
      "publicNotes",
      "currentUserCatgeories",
      "currentUserProjects",
    ]),
  },
  filters: {},
  created() {
    this.getPublicNotes();
  },
  mounted() {
    this.locallyStorredNotes = this.publicNotes;
    this.passedNotes = this.publicNotes;
  },
};
</script>
<style >
</style>
