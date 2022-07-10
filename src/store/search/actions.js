const searchActions = {
    addSearchResults(context, recipes) {
        context.commit("addSearchResults", recipes);
    },

    setSearchTerm(context, term) {
        context.commit("setSearchTerm", term);
    },

};

export default searchActions;