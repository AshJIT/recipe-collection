const bookmarkActions = {
    addBookmark(context, recipe) {
        context.commit("addBookmark", recipe);
    },

    removeBookmark(context, recipe) {
        context.commit("removeBookmark", recipe);
    }
};

export default bookmarkActions;