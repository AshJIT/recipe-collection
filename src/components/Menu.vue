<template>
    <nav class="navigation__container">
        <ul class="navigation" role="tablist">
            <router-link :to="{ path: tab.link }" v-slot="{ isActive, navigate, href }" v-for="tab in menuItems" custom>
                <li class="navigation__tab">
                    <a class="navigation__link" :class="isActive ? '-active' : ''" :aria-selected="isActive" role="tab" :href="href" @click="navigate">
                        {{ tab.name }}
                    </a>
                </li>
            </router-link>
        </ul>
    </nav>
</template>

<script>
export default {
    data: function() {
        return {
            menuItems: [
                {
                    name: "Search",
                    link: "/",
                },
                {
                    name: "Bookmarks",
                    link: "/bookmarks",
                }
            ]
        }
    }
}
</script>

<style lang="scss">
    .navigation {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        border-bottom: 1px solid black;

        &__container {
            margin-bottom: 1rem;
        }

        &__tab {
            margin-right: 0.5rem;
            padding: 0.25rem 0;
        }

        &__link {
            text-decoration: none;
            padding: 0.25rem 1rem;
            border-radius: 5px 5px 0 0;
            border: 1px solid black;
            border-bottom: none;
            background-color: black;
            color: white;

            &.-active {
                background-color: white;
                color: black;
                border-top: 5px solid black;
                z-index: 1;
                border-bottom: 1px solid white;
            }

            &:hover {
                border-top: 5px solid black;
            }
        }
    }
</style>