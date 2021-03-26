export default {
  methods: {
    filterByCatId(id) {
      this.Selected.categoryId = id;
      console.log(this.Selected.categoryId);
      let filteredNotes = {};
      if (id == 0) {
        if (this.Selected.projectId == 0) {
          filteredNotes = this.locallyStorredNotes;
        } else {
          for (const notekey in this.locallyStorredNotes) {
            if (
              this.locallyStorredNotes[notekey].project_id ==
              this.Selected.projectId
            ) {
              filteredNotes[notekey] = this.locallyStorredNotes[notekey];
            }
          }
        }
      } else if (this.Selected.projectId == 0) {
        for (const notekey in this.locallyStorredNotes) {
          if (
            this.locallyStorredNotes[notekey].category_id ==
            this.Selected.categoryId
          ) {
            filteredNotes[notekey] = this.locallyStorredNotes[notekey];
          }
        }
      } else {
        for (const notekey in this.locallyStorredNotes) {
          if (
            this.locallyStorredNotes[notekey].category_id ==
              this.Selected.categoryId &&
            this.locallyStorredNotes[notekey].project_id ==
              this.Selected.projectId
          ) {
            filteredNotes[notekey] = this.locallyStorredNotes[notekey];
          }
        }
      }
      this.passedNotes = filteredNotes;
    },

    showAddCatDialog(state) {
      this.Dialogs.newCat = state;
    },
  },
};
