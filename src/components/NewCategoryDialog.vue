<template>
  <v-dialog
    v-model="newCat"
    max-width="350"
    persistent
    transition="dialog-top-transition"
  >
    <v-card>
      <v-card-title class="headline font-weight-black d-flex justify-center">
        إضافة تصنيف جديد
      </v-card-title>
      <v-divider class="mx-5 mb-4" />

      <v-card-text>
        <v-alert
          dense
          dismissible
          border="left"
          v-if="getAddCatResponse.Message != null"
          :type="getAddCatResponse.Type"
          >{{ getAddCatResponse.Message }}</v-alert
        >
        <v-text-field
          dense
          hide-details
          label="إسم المشروع"
          color="green darken-4"
          outlined
          v-model="newCategoryName"
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
          @click="newcategory"
          :loading="getAddCatLoading"
          :disabled="newCategoryName == '' || newCategoryName == null"
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
          @click="$emit('showAddCatDialog', false)"
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
  name: "newCategoryDialog",
  props: {
    newCat: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newCategoryName: null,
    };
  },

  methods: {
    ...mapActions("CategoriesStore", ["addNewCategory"]),
    ...mapMutations("CategoriesStore", ["setNewCatResponseMessage"]),
    newcategory() {
      this.addNewCategory(this.newCategoryName);
    },
  },
  computed: {
    ...mapGetters("CategoriesStore", ["getAddCatLoading", "getAddCatResponse"]),
  },

  watch: {
    "getAddCatResponse.Message"(newVal) {
      if (newVal != null) {
        this.newCategoryName = null;
        setTimeout(() => {
          this.setNewCatResponseMessage(null);
        }, 3000);
      }
    },
  },
};
</script>

<style>
</style>