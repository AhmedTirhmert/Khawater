<template>
  <v-dialog v-model="deleteNoteDialog" max-width="290" class="" persistent>
    <v-card :loading="deleteNoteLoading" :disabled="deleteNoteLoading">
      <template slot="progress">
        <v-progress-linear
          color="red accent-3"
          height="5"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-card-title class="d-block">
        <div class="text-center mb-5">
          <v-icon
            v-if="response.responseMessage === null"
            color="red accent-2 "
            size="90px"
          >
            mdi-trash-can
          </v-icon>
          <v-icon v-else color="teal darken-3 " size="90px">
            mdi-check-circle-outline
          </v-icon>
        </div>
        <div class="text-center">
          <span v-if="response.responseMessage === null" class="text-font-cairo"
            >حذف المذكرة</span
          >
          <span v-else class="text-font-cairo">{{
            response.responseMessage
          }}</span>

          <br />
          <span class="grey--text font-italic"
            >- {{ noteToDelete.title }} -
          </span>
        </div>
      </v-card-title>
      <v-card-actions class="d-flex justify-center">
        <v-btn
          v-if="response.responseMessage === null"
          color="red lighten-2"
          outlined
          @click="deleteNote(noteToDelete.id)"
        >
          حذف
        </v-btn>

        <v-btn color="primary" outlined @click="closeDialog"> غلق </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    deleteNoteDialog: {
      type: Boolean,
      required: true,
      default: false,
    },
    noteToDelete: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("NotesStore", ["deleteNote"]),
    closeDialog() {
      this.response.responseMessage = null;
      this.$emit("closeEditNoteDialog");
      this.$emit("NoteDeleted");
    },
  },
  computed: {
    ...mapGetters("NotesStore", ["deleteNoteLoading", "response"]),
  },
};
</script>

<style>
</style>