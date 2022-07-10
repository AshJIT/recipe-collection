<template>
    <label for="searchbar">Search for a Recipe:</label>
    <div class="search__container">
        <input class="search" type="text" name="searchbar" placeholder="Search by name..." v-model="searchTerm" @keyup="debouncedSearch">
        <svg xmlns="http://www.w3.org/2000/svg" class="search__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>

    <div class="recipe-card__container" v-if="recipes && recipes.length > 0">
        <div class="recipe-card" v-for="recipe in recipes">
            <img class="recipe-card__image" :src="recipe.recipe.image" :alt="recipe.recipe.label">
            <div class="recipe-card__details">
                <h2>{{ recipe.recipe.label }}</h2>
                <p><strong>Calories:</strong> {{ recipe.recipe.calories ? recipe.recipe.calories.toFixed(2) : '' }}</p>
                <p v-if="recipe.recipe.healthLabels.length > 0"><strong>Health Labels:</strong></p>
                <p><span class="recipe-card__label -health" v-for="healthLabel in recipe.recipe.healthLabels">{{ healthLabel }}</span></p>
                <p v-if="recipe.recipe.dietLabels.length > 0"><strong>Diet Labels:</strong></p>
                <p><span class="recipe-card__label -diet" v-for="dietLabel in recipe.recipe.dietLabels">{{ dietLabel }}</span></p>
            </div>
        </div>
    </div>

    <div class="search__no-results" v-if="recipes.length === 0">
        No Results Found...
    </div>

    <Loader v-if="loading" />
</template>

<script>
import axios from "axios";
import { debounce } from "lodash";
import Loader from "./Loader.vue";

export default {
    components: {
        Loader,
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
    .recipe-card {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        margin: 1.25rem auto;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        border-radius: 5px;

        @media only screen and (min-width: 768px) {
            flex-direction: row;
            max-width: none;
        }

        &:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }

        &__image {
            width: 100%;
            height: 300px;
            display: inline-block;
            border-radius: 5px 5px 0 0;

            @media only screen and (min-width: 768px) {
                width: 300px;
                height: auto;
                border-radius: 5px 0 0 5px;
            }
        }

        &__label {
            margin: 0.1rem 0.25rem;
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
            font-weight: bold;
            color: white;
            display: inline-block;

            &.-health {
                background-color: dodgerblue;
            }

            &.-diet {
                background-color: yellowgreen;
                color: black;
            }
        }

        &__details {
            padding: 0 1em;
            flex: 1;
        }
    }

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