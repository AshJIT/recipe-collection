import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const searchModule = {
    namespaced: true,

    state() {
      return {
        searchResults: localStorage.getItem("search") ? JSON.parse(localStorage.getItem("search")).searchResults : [],
        searchTerm: localStorage.getItem("search") ? JSON.parse(localStorage.getItem("search")).searchTerm : null
      }
    },

    getters: getters,
    mutations: mutations,
    actions: actions
  };
  
  export default searchModule;