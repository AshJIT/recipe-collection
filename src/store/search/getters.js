const searchGetters = {
    getSearchResults(state) {
        return state.searchResults;
    },

    getSearchTerm(state) {
        return state.searchTerm;
    }
};

export default searchGetters;