import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Authorization: "",
  },
  mutations: {
    set_Authorization(state, Authorization) {
      state.Authorization = Authorization;
      localStorage.Authorization = Authorization;
    },
    del_Authorization(state) {
      state.Authorization = "";
      localStorage.removeItem("Authorization");
    },
  },
});
