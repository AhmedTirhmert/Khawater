<template>
  <v-dialog
    v-model="editNoteDialog"
    persistent
    width="800"
    origin="bottom"
    class="purple darken-2"
  >
    <v-card
      class="rounded-sm"
      :loading="editNoteLoading"
      :disabled="editNoteLoading"
    >
      <template slot="progress">
        <v-progress-linear
          color="teal darken-3"
          height="7"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-card-title class="justify-center mb-5">
        <span class="headline text-center font-weight-bold headerTitle">
          تعديل المذكرة
        </span>
        <span class="subtitle-1 text-center grey--text px-3 headerTitle">
          {{ "- " + passedNote.title + " -" }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-alert
          v-if="response.responseMessage != null"
          border="left"
          :type="response.type"
          dismissible
          @input="resetError"
        >
          <span
            v-for="error in response.responseMessage"
            :key="error"
            class="d-block"
          >
            - {{ error }}
          </span>
        </v-alert>

        <v-row>
          <v-col md="8" cols="12">
            <v-text-field
              v-model="passedNote.title"
              label="عنوان المذكرة"
              outlined
              dense
              class="mb-2"
            ></v-text-field>
            <v-textarea
              v-model="passedNote.body"
              outlined
              auto-grow
              dense
              color="primary"
              name="input-7-4"
              label="أدخل نص المذكرة"
              hide-details=""
            ></v-textarea>
          </v-col>
          <v-col md="4" cols="12">
            <v-row>
              <v-col cols="12" class="mb-2 pt-1 d-flex">
                <!-- <v-checkbox
                  class="mb-4"
                  hide-details
                  v-model="passedNote.public"
                  :label="passedNote.public ? 'عام' : 'خاص'"
                ></v-checkbox> -->
                <span class="my-auto text-font-cairo font-weight-black"
                  >خاص</span
                >
                <v-switch
                  v-model="passedNote.public"
                  inset
                  dense
                  color="teal darken-3"
                  class="mx-3 my-auto"
                  hide-details
                ></v-switch>
                <span class="my-auto text-font-cairo font-weight-black"
                  >عام</span
                >
              </v-col>
              <v-col cols="12" class="py-0">
                <v-select
                  class="mb-4"
                  dense
                  clearable
                  hide-details
                  :items="Projects"
                  v-model="passedNote.project_id"
                  :value="passedNote.project_id"
                  selected
                  item-text="title"
                  item-value="key"
                  label="إختر مشروع"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-select
                  class="mb-4"
                  dense
                  clearable
                  hide-details
                  :items="Categories"
                  v-model="passedNote.category_id"
                  :value="passedNote.category_id"
                  item-text="title"
                  item-value="key"
                  label="إختر صنف"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12"> </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer class="d-xs-none d-sm-flex" />
        <v-btn
          elevation="3"
          color="teal darken-3"
          @click="Save"
          class="white--text px-8"
          dense
        >
          تعديل
        </v-btn>
        <v-btn
          elevation="3"
          class="white--text px-8"
          color="red darken-4 "
          @click="closeDialog"
        >
          إلغاء
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    editNoteDialog: {
      type: Boolean,
      default: false,
    },
    Projects: {
      type: Array,
      required: true,
    },
    Categories: {
      type: Array,
      required: true,
    },
    selectedNote: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      passedNote: {},
    };
  },
  mounted() {},
  watch: {
    "response.type"(newVal) {
      if (this.editNoteDialog) {
        console.log("edit is reseting the error");
        setTimeout(() => {
          this.resetError();
        }, 2000);
      }

      if (newVal == "success") {
        return;
      }
    },
    editNoteDialog(newVal) {
      if (newVal) {
        this.passedNote.id = this.selectedNote.id;
        this.passedNote.category_id = this.selectedNote.category_id;
        this.passedNote.project_id = this.selectedNote.project_id;
        this.passedNote.title = this.selectedNote.title;
        this.passedNote.body = this.selectedNote.body;
        this.passedNote.public = this.selectedNote.public;

        this.passedNote.category_id = this.passedNote.category_id.toString();
        this.passedNote.project_id = this.passedNote.project_id.toString();
      } else {
        this.passedNote = {};
      }
    },
  },
  methods: {
    ...mapActions("NotesStore", ["updateNote"]),
    Save() {
      this.updateNote(this.passedNote);
      // if (!this.passedNote.title || !this.passedNote.body) {
      //   this.response.responseMessage = "المرجو تعبئة الحقول أعلاه";
      //   this.response.type = "error";
      // } else {
      //   this.addNewNote(this.passedNote);
      // }
    },
    resetError() {
      this.response.responseMessage = null;
      this.response.type = "error";
    },
    closeDialog() {
      this.resetError();
      this.$emit("setNewDialog", false);
    },
  },

  computed: {
    ...mapGetters("NotesStore", ["editNoteLoading", "response"]),
  },
};
</script>

<style>
</style>