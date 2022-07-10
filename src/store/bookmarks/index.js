import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const bookmarkModule = {
    namespaced: true,

    state() {
      return {
        bookmarkedRecipes: [],
      }
    },

    getters: getters,
    mutations: mutations,
    actions: actions
  };
  
  export default bookmarkModule;