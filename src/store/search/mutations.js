const searchMutations = {
    addSearchResults(state, recipes) {
        state.searchResults = recipes;
        localStorage.setItem("search", JSON.stringify(state));
    },

    removeSearchResults(state) {
        state.searchResults = null;
        localStorage.setItem("search", JSON.stringify(state));
    },

    setSearchTerm(state, term) {
        state.searchTerm = term;
        localStorage.setItem("search", JSON.stringify(state));
    },
};

export default searchMutations;