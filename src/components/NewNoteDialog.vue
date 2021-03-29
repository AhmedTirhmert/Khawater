<template>
  <v-dialog
    transition="dialog-top-transition"
    v-model="newNoteDialog"
    persistent
    width="800"
    origin="bottom"
    class="purple darken-2"
  >
    <v-card
      class="rounded-sm"
      :loading="addNewNoteLoading"
      :disabled="addNewNoteLoading"
    >
      <template slot="progress">
        <v-progress-linear
          color="teal darken-3"
          height="7"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title class="justify-center mb-5">
        <span class="headline text-center font-weight-black"
          >أضف مذكرة جديدة</span
        >
      </v-card-title>
      <v-card-text>
        <v-alert
          v-if="response.responseMessage != null"
          border="left"
          :type="response.type"
          dismissible
          @input="resetError"
        >
          {{ response.responseMessage }}
        </v-alert>

        <v-row>
          <v-col md="8" cols="12">
            <v-text-field
              v-model="newNoteData.title"
              label="عنوان المذكرة"
              outlined
              dense
              class="mb-2"
              color="teal darken-3"
            ></v-text-field>
            <v-textarea
              v-model="newNoteData.body"
              outlined
              auto-grow
              dense
              name="input-7-4"
              label="أدخل نص المذكرة"
              color="teal darken-3"
            ></v-textarea>
          </v-col>
          <v-col md="4" cols="12">
            <v-row>
              <v-col md="4" cols="12">
                <v-row>
                  <v-col cols="12" class="mb-2 pt-1 d-flex">
                    <span class="my-auto text-font-cairo font-weight-black"
                      >خاص</span
                    >
                    <v-switch
                      v-model="newNoteData.public"
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
                </v-row>
              </v-col>
              <v-col cols="12" class="py-0 d-flex">
                <v-select
                  class="mb-4"
                  dense
                  clearable
                  hide-details
                  :items="Projects"
                  v-model="newNoteData.project"
                  item-text="title.name"
                  item-value="key"
                  label="إختر مشروع"
                  outlined
                  color="teal darken-3"
                ></v-select>
                <v-col class="pl-0 pr-1 d-flex justify-end pt-1" cols="auto">
                  <v-btn
                    color="teal darken-1"
                    elevation="2"
                    class="white--text"
                    x-small
                    outlined
                    fab
                    @click="$emit('showAddProDialog', true)"
                  >
                    <v-icon> mdi-plus </v-icon>
                  </v-btn>
                </v-col>
              </v-col>
              <v-col cols="12" class="py-0 d-flex">
                <v-select
                  class="mb-4"
                  dense
                  clearable
                  hide-details
                  :items="Categories"
                  v-model="newNoteData.category"
                  item-text="title.title"
                  item-value="key"
                  label="إختر صنف"
                  outlined
                  color="teal darken-3"
                ></v-select>
                <v-col class="pl-0 pr-1 d-flex justify-end pt-1" cols="auto">
                  <v-btn
                    color="teal darken-1"
                    elevation="2"
                    class="white--text"
                    x-small
                    outlined
                    fab
                    @click="$emit('showAddCatDialog', true)"
                  >
                    <v-icon> mdi-plus </v-icon>
                  </v-btn>
                </v-col>
              </v-col>
              <v-col cols="12"> </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn
          elevation="3"
          color="teal darken-3"
          @click="Save"
          class="white--text px-8"
          dense
        >
          حفظ
        </v-btn>
        <v-btn
          elevation="3"
          class="white--text px-8"
          color="red lighten-1 "
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
    newNoteDialog: {
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
  },

  data() {
    return {
      newNoteData: {
        public: false,
        project: null,
        category: null,
        title: null,
        body: null,
      },
    };
  },
  mounted() {},
  watch: {
    "response.type"(newVal) {
      if (this.newNoteDialog) {
        setTimeout(() => {
          this.resetError();
        }, 2000);
      }

      if (newVal == "success") {
        this.resetNote();
      }
    },
  },
  methods: {
    ...mapActions("NotesStore", ["addNewNote"]),
    Save() {
      if (!this.newNoteData.title || !this.newNoteData.body) {
        this.response.responseMessage = "المرجو تعبئة الحقول أعلاه";
        this.response.type = "error";
      } else {
        this.addNewNote(this.newNoteData);
      }
    },
    resetError() {
      this.response.responseMessage = null;
      this.response.type = "error";
    },
    resetNote() {
      this.newNoteData.public = false;
      this.newNoteData.category = null;
      this.newNoteData.project = null;
      this.newNoteData.body = null;
      this.newNoteData.title = null;
    },
    closeDialog() {
      this.resetError();
      this.resetNote();
      this.$emit("setNewDialog", false);
    },
  },

  computed: {
    ...mapGetters("NotesStore", ["addNewNoteLoading", "response"]),
  },
};
</script>

<style>
</style>