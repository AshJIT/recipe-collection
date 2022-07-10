import { createStore } from "vuex";
import bookmarkModule from "./bookmarks";
import searchModule from "./search";

const store = createStore({
  modules: {
    bookmarks: bookmarkModule,
    search: searchModule,
  }
});

export default store;