<template>
  <v-sheet min-height="70vh" rounded="lg" class="scrollableNotesSheet">
    <div
      class="d-flex pa-2"
      :class="isAuth ? 'justify-space-between' : 'justify-center'"
    >
      <p class="text-h4 text-center my-3 secondary--text headerTitle">
        {{ title }}
      </p>
      <v-btn
        v-if="isAuth"
        class="my-3"
        small
        fab
        dark
        color="teal darken-3"
        @click="$emit('setNewDialog', true)"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </div>
    <v-divider class="mb-3 mx-2 dividerShadow"  />

    <template>
      <v-row class="mx-0 mb-6">
        <v-col
          v-for="(note, index) in Notes"
          :key="index"
          cols="12"
          class="px-2 py-1"
          :md="isAuth ? '6' : '4'"
          sm="12"
          :lg="isAuth ? '6' : '4'"
        >
          <v-card class="mx-auto my-1" outlined elevation="2">
            <v-card-title class="text-lg-h6 font-weight-bold">
              <div class="d-flex justify-space-between full-width">
                <div class="d-flex flex-column">
                  {{ note.title }}
                  <div class="text-caption grey--text">
                    <b class="indigo--text font-italic text--darken-4">{{
                      note.author.name
                    }}</b>
                    <span class="black--text font-weight-black mx-1"> | </span>

                    <span class="font-italic">
                      {{ note.created_at | carbonJs }}
                    </span>
                    <span class="black--text font-weight-black mx-1">
                      |{{ index }}
                    </span>
                    <v-icon v-if="note.public" size="1rem"> mdi-earth </v-icon>
                    <v-icon v-if="!note.public" size="1rem"> mdi-lock </v-icon>
                  </div>
                </div>
                <v-spacer></v-spacer>
                <v-menu v-if="Editable">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" icon v-on="on">
                      <v-icon> mdi-dots-vertical </v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      link
                      class="blue--text"
                      @click="$emit('editNote', note.id)"
                    >
                      <v-list-item-title class="ml-3">نعديل</v-list-item-title>
                      <v-icon color="blue"> mdi-pencil </v-icon>
                    </v-list-item>

                    <v-list-item
                      link
                      class="red--text"
                      @click="$emit('deleteNote', note.id)"
                    >
                      <v-list-item-title class="ml-3">حذف</v-list-item-title>
                      <v-icon color="red"> mdi-trash-can </v-icon>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text class="text-body-2">
              <div class="">
                {{ note.body }}
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-text class="text-caption">
              <div class="d-flex justify-space-arround">
                <div>
                  الصنف:
                  <span class="font-weight-black">{{
                    note.category ? note.category.title : "غير محدد"
                  }}</span>
                </div>
                <v-spacer></v-spacer>
                <div>
                  المشروع:
                  <span class="font-weight-black">{{
                    note.project ? note.project.name : "غير محدد"
                  }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-sheet>
</template>

<script>
import filters from "../Mixins/filters";

export default {
  mixins: [filters],
  name: "notes",
  components: {},
  props: {
    Notes: null,
    title: {
      type: String,
    },
    isAuth: null,
    Editable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },

  methods: {
    shownewnote() {
      this.newNoteDialog = true;
    },
  },
  computed: {},
};
</script>

<style>
</style>