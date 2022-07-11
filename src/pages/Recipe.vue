<template>
    <div class="recipe" v-if="!loading && recipe">
        <div class="recipe__container -top">
            <div class="recipe__preview">
                <img class="recipe__image" :src="recipe.image" :alt="recipe.label">
                <button class="recipe__bookmark-button" @click="addBookmark(recipe)" v-if="!savedRecipe">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>

                    <span class="recipe__bookmark-button-text">Bookmark this recipe!</span>
                </button>

                <div class="recipe__bookmarked" v-if="savedRecipe">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <span>This recipe is already bookmarked!</span>
                </div>
            </div>

            <div class="recipe__details">
                <h2 class="recipe__label">{{ recipe.label }}</h2>
                <ul>
                    <li v-for="ingredient in recipe.ingredientLines">{{ ingredient }}</li>
                </ul>
                <p><strong>Calories:</strong> {{ recipe.calories ? (Math.round(recipe.calories * 100) / 100) : '' }}</p>
            </div>
        </div>

        <div class="recipe__container -bottom">
            <p v-if="recipe.healthLabels.length > 0"><strong>Health Labels:</strong></p>
            <p>
                <Label v-for="healthLabel in recipe.healthLabels" :text="healthLabel" bg="dodgerblue" color="white" />
            </p>

            <p v-if="recipe.dietLabels.length > 0"><strong>Diet Labels:</strong></p>
            <p>
                <Label v-for="dietLabel in recipe.dietLabels" :text="dietLabel" bg="#AFE1AF" color="black" />
            </p>

            <p class="recipe__nutrient-container"><strong>Nutrients:</strong>
                <ul class="recipe__nutrient-list">
                    <li class="recipe__nutrient" v-for="nutrient in recipe.totalNutrients">
                        {{ nutrient.label + ' ' + (Math.round(nutrient.quantity * 100) / 100) + nutrient.unit }}
                    </li>
                </ul>
            </p>

            <p class="recipe__nutrient-container"><strong>Daily Digest:</strong>
                <ul class="recipe__nutrient-list">
                    <li class="recipe__nutrient" v-for="digest in recipe.digest">
                        {{ digest.label + ' ' + (Math.round(digest.daily * 100) / 100) + digest.unit }}
                    </li>
                </ul>
            </p>
        </div>

    </div>

    <Loader v-if="loading"/>
</template>

<script>
import Loader from "../components/Loader.vue";
import Label from "../components/Label.vue";
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("bookmarks");

export default {
    components: {
        Loader,
        Label
    },

    data: function() {
        return {
            loading: true,
            recipe: null,
        }
    },

    computed: {
        ...mapState({
            bookmarks: state => state.bookmarkedRecipes,
        }),

        savedRecipe: function() {
            return this.bookmarks.find(bookmark => bookmark.uri === this.recipe.uri);
        }
    },

    mounted() {
        this.getRecipe();
    },

    methods: {
        getRecipe: async function() {
            try {
                const res = await axios({
                    method: "get",
                    url: `/api/recipes/v2/${this.$route.params.id}`,
                    params: {
                        q: this.searchTerm,
                    }
                });

                this.recipe = res.data.recipe;
                this.loading = false;
            } catch(e) {
                console.error(e);
            }
        },

        ...mapActions([
            "addBookmark",
        ]),
    }
}
</script>

<style lang="scss">
    .recipe {
        &__container {
            &.-top {
                display: flex;
                flex-direction: column;

                @media only screen and (min-width: 768px) {
                    flex-direction: row;
                }
            }
        }

        &__label {
            margin: 0;
        }

        &__image {
            width: 300px;
            height: 300px;
            margin: 0 auto;

            @media only screen and (min-width: 768px) {
                margin: 0 1rem 0 0;
            }
        }

        &__details, &__preview {
            margin-right: 1rem;
            margin: 0 auto;

            @media only screen and (min-width: 768px) {
                margin: 0;
            }
        }

        &__preview {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__nutrient {
            margin: 0.5rem 1rem;
            flex: 1 0 calc(50% - 2rem);
            font-size: 0.75rem;
            padding: 0;

            &-list {
                display: flex;
                flex-wrap: wrap;
                list-style: none;
                padding: 0;
            }

            &-container {
                max-width: 40rem;
            }
        }

        &__bookmark-button {
            background: none;
            border: none;
            padding: 0.5rem 1rem;
            margin: 0.5rem;
            display: flex;
            align-items: center;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.1s ease;
            font-size: 1em;
            background-color: black;
            color: white;
            border-radius: 5px;
            
            svg {
                width: 25px;
                height: 25px;
                fill: red;
            }
            
            &:hover {
                transform: scale(1.1);
            }
        }

        &__bookmarked {
            display: flex;
            align-items: center;
            margin: 0.5rem;

            svg {
                width: 25px;
                height: 25px;
                fill:  #FFC300;
            }
        }
    }
</style>