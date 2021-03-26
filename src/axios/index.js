import axios from "axios";

export default axios.create({
  baseURL: "http://khawater.test/",
  withCredentials: true,
});
