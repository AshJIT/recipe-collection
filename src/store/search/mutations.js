const searchMutations = {
    addSearchResults(state, recipes) {
        state.searchResults = recipes;
    },

    setSearchTerm(state, term) {
        state.searchTerm = term;
    }
};

export default searchMutations;