import Vue from "vue";
import axios from "axios";

Vue.prototype._ = require("lodash");

Vue.prototype.$axios = axios.create({
  // baseURL: "http://localhost:8116"
  baseURL: "/"
});
