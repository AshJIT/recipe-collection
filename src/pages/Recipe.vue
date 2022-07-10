<template>
    <div class="recipe" v-if="!loading && recipe">
        <div class="recipe__container -top">
            <div class="recipe__preview">
                <img class="recipe__image" :src="recipe.image" :alt="recipe.label">
                <button class="bookmark__button" v-if="!bookmarked">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    <span class="bookmark__button-text">Bookmark this recipe!</span>
                </button>
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

    },

    mounted() {
        this.getRecipe();
    },

    methods: {
        getRecipe: async function() {
            const res = await axios({
                method: "get",
                url: `/api/recipes/v2/${this.$route.params.id}`,
                params: {
                    q: this.searchTerm,
                }
            });

            console.log(res.data);

            this.recipe = res.data.recipe;
            this.loading = false;
        }
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

            &.-bottom {

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
    }

    .bookmark {
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
        }
    }
</style>