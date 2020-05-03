import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import characterData from "./modules/characterData";

export const store = new Vuex.Store({
  modules: {
    characterData
  }
});
