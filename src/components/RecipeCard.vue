<template>
    <router-link class="recipe-card" :to="{ path: `/recipe/${id}` }">
        <img class="recipe-card__image" :src="recipe.recipe.image" :alt="recipe.recipe.label">
        <div class="recipe-card__details">
            <h2>{{ recipe.recipe.label }}</h2>
            <p><strong>Calories:</strong> {{ recipe.recipe.calories ? (Math.round(recipe.recipe.calories * 100) / 100) : '' }}</p>
            <p v-if="recipe.recipe.healthLabels.length > 0"><strong>Health Labels:</strong></p>
            <p><Label v-for="healthLabel in recipe.recipe.healthLabels" :text="healthLabel" bg="dodgerblue" color="white" /></p>
            <p v-if="recipe.recipe.dietLabels.length > 0"><strong>Diet Labels:</strong></p>
            <p><Label v-for="dietLabel in recipe.recipe.dietLabels" :text="dietLabel" bg="#AFE1AF" color="black" /></p>
        </div>
    </router-link>
</template>

<script>
import Label from "./Label.vue";

export default {
    props: {
        recipe: {
            type: Object,
            required: true,
        }
    },

    components: {
        Label
    },

    computed: {
        id: function() {
            return this.recipe.recipe.uri.split("#recipe_").pop();
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
        text-decoration: none;
        color: #2c3e50;

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

        &__details {
            padding: 0 1em;
            flex: 1;
        }
    }
</style>