import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import swData from "./modules/swData";

export const store = new Vuex.Store({
  modules: {
    swData
  }
});
