<template>
    <span class="recipe-card__label" :style="`background-color: ${bg}; color: ${color};`">{{ text }}</span>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true,
        },
        bg: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        }
    }
}
</script>

<style>
    .recipe-card__label {
        margin: 0.1rem 0.25rem;
        padding: 0.25rem 0.75rem;
        font-size: 0.75rem;
        font-weight: bold;
        display: inline-block;
    }
</style>