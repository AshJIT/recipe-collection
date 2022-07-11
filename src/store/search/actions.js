const searchActions = {
    addSearchResults(context, recipes) {
        context.commit("addSearchResults", recipes);
    },

    removeSearchResults(context) {
        context.commit("removeSearchResults");
    },

    setSearchTerm(context, term) {
        context.commit("setSearchTerm", term);
    },

};

export default searchActions;