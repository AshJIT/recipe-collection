const bookmarkMutations = {
    addBookmark(state, recipe) {
        state.bookmarkedRecipes.push(recipe);
    },

    removeBookmark(state, recipe) {
        state.bookmarkedRecipes = state.bookmarkedRecipes.filter((bookmark) => {
            return recipe.uri !== bookmark.uri;
        });
    }
};

export default bookmarkMutations;