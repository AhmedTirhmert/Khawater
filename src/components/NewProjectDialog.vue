<template>
  <v-dialog
    v-model="newPro"
    max-width="400"
    persistent
    transition="dialog-top-transition"
  >
    <v-card>
      <v-card-title class="headline font-weight-black d-flex justify-center">
        إضافة مشروع جديد
      </v-card-title>
      <v-divider class="mx-5 mb-4" />

      <v-card-text>
        <v-alert
          dense
          dismissible
          border="left"
          v-if="getAddProResponse.Message != null"
          :type="getAddProResponse.Type"
          >{{ getAddProResponse.Message }}</v-alert
        >
        <v-text-field
          dense
          hide-details
          label="إسم المشروع"
          color="green darken-4"
          outlined
          v-model="newProjectName"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          small
          color="white"
          text
          elevation="2"
          class="teal darken-3"
          @click="newProject"
          :loading="getAddProLoading"
          :disabled="newProjectName == '' || newProjectName == null"
        >
          إضافة
        </v-btn>
        <v-btn
          small
          color="white"
          text
          outlined
          elevation="2"
          class="red lighten-1"
          @click="$emit('showAddProDialog', false)"
        >
          إلغاء
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "newProjectDialog",
  props: {
    newPro: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newProjectName: null,
    };
  },

  methods: {
    ...mapActions("ProjectsStore", ["addNewProject"]),
    ...mapMutations("ProjectsStore", ["setNewProResponseMessage"]),
    newProject() {
      this.addNewProject(this.newProjectName);
    },
  },
  computed: {
    ...mapGetters("ProjectsStore", ["getAddProLoading", "getAddProResponse"]),
  },

  watch: {
    "getAddProResponse.Message"(newVal) {
      if (newVal != null) {
        this.newProjectName = null;
        setTimeout(() => {
          this.setNewProResponseMessage(null);
        }, 3000);
      }
    },
  },
};
</script>

<style>
</style>