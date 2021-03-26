import moment from "moment";
moment.locale("ar-ma");
export default {
  filters: {
    carbonJs(date) {
      return moment(date).fromNow();
    },
    toArray(val) {
      let tempArr = [];
      let keysArray = Object.keys(val);
      keysArray.forEach((key) => {
        tempArr.push({
          key: key,
          title: val[key],
        });
      });
      return tempArr;
    },
  },
};
