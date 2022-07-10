<template>
    <label for="searchbar">Search for a Recipe:</label>
    <div class="search__container">
        <input class="search" type="text" name="searchbar" placeholder="Search by name..." v-model="searchTerm" @keyup="debouncedSearch">
        <svg xmlns="http://www.w3.org/2000/svg" class="search__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>

    <div class="recipe-card__container" v-if="recipes && recipes?.length > 0">
        <RecipeCard v-for="recipe in recipes" :recipe="recipe" :key="recipe.id" />
    </div>

    <div class="search__no-results" v-if="recipes !== null && recipes?.length === 0">
        No Results Found...
    </div>

    <Loader v-if="loading" />
</template>

<script>
import axios from "axios";
import { debounce } from "lodash";
import Loader from "../components/Loader.vue";
import RecipeCard from "../components/RecipeCard.vue";

export default {
    components: {
        Loader,
        RecipeCard,
    },

    data: function() {
        return {
            loading: false,
            searchTerm: null,
            recipes: null,
        }
    },

    created: function() {
        this.debouncedSearch = debounce(event => {
            this.doSearch();
        }, 500);
    },

    beforeUnmount: function() {
        this.debouncedSearch.cancel();
    },

    methods: {
        doSearch: async function() {
            this.loading = true;
            this.recipes = null;

            const res = await axios({
                method: "get",
                url: "/api/recipes/v2",
                params: {
                    q: this.searchTerm,
                }
            });

            this.recipes = res.data.hits;
            this.loading = false;
        }
    }
}
</script>

<style lang="scss">
    .search {
        width: 100%;
        padding: 0.5rem 0.5rem 0.5rem 2rem;
        border-radius: 4pt;
        border: 1px solid grey;

        &__container {
            margin: 0.5rem 0;
            position: relative;
        }

        &__icon {
            position: absolute;
            top: 0;
            left: 0.5rem;
            height: 2rem;
            width: 1rem;
        }

        &__no-results {
            margin-top: 1rem;
            margin-left: 1rem;
        }
    }
</style>