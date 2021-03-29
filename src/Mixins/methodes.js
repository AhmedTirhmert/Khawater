export default {
  methods: {
    AddAll(Val) {
      let localVals = {};
      localVals[0] = { name: "الكل", title: "الكل" };
      for (const key in Val) {
        localVals[key] = Val[key];
      }
      return localVals;
    },
  },
};
