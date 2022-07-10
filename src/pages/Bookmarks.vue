<template>
    <h2>Bookmarked Recipes</h2>

    <div class="recipe-card__container" v-if="bookmarks.length > 0">
        <div class="bookmark__recipe-wrapper" v-for="(recipe, index) in bookmarks">
            <RecipeCard :recipe="recipe" :key="index" />
            <button class="bookmark__button -remove" aria-label="Remove" @click="removeBookmark(recipe)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span class="sr-only">Remove</span>
            </button>
        </div>
    </div>

    <div class="search__no-results" v-if="bookmarks.length === 0">
        No Bookmarks Saved...
    </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("bookmarks");

export default {
    components: {
        RecipeCard,
    },

    computed: {
        ...mapState({
            bookmarks: state => state.bookmarkedRecipes,
        })
    },

    methods: {
        ...mapActions([
            "removeBookmark",
        ])
    }
};
</script>

<style lang="scss">
    .bookmark {
        &__recipe-wrapper {
            position: relative;
            max-width: 300px;
            margin: 0 auto;

            @media only screen and (min-width: 768px) {
                max-width: none;
                margin: 0;
            }
        }

        &__button {
            background: none;
            border: none;
            padding: 1rem 0;
            display: flex;
            align-items: center;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.1s ease;
            font-size: 1em;

            svg {
                width: 25px;
                height: 25px;
                fill: red;
            }

            &:hover {
                transform: scale(1.1);
            }

            &.-remove {
                position: absolute;
                top: -0.5rem;
                right: -0.5rem;
                padding: 0.25rem;
                background-color: red;
                color: white;
                border-radius: 50%;
            }
        }
    }
</style>