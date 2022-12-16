import Vue from "vue";
// import Vuex from "vuex";
import Vuex from "../vuex/index";
import app from "./app";
import font from "./font";
Vue.use(Vuex);

export default new Vuex.Store({
  ...app,
  modules: {
    // app,
    font,
  },
});
