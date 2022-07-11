const bookmarkMutations = {
    addBookmark(state, recipe) {
        state.bookmarkedRecipes.push(recipe);

        localStorage.setItem("bookmarks", JSON.stringify(state));
    },

    removeBookmark(state, recipe) {
        state.bookmarkedRecipes = state.bookmarkedRecipes.filter((bookmark) => {
            return recipe.uri !== bookmark.uri;
        });

        localStorage.setItem("bookmarks", JSON.stringify(state));
    },
};

export default bookmarkMutations;