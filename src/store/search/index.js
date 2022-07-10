import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const searchModule = {
    namespaced: true,

    state() {
      return {
        searchResults: [],
        searchTerm: null,
      }
    },

    getters: getters,
    mutations: mutations,
    actions: actions
  };
  
  export default searchModule;