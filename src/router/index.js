import { createRouter, createWebHistory } from "vue-router";
import Search from "../pages/Search.vue";
import PageNotFound from "../pages/404.vue";

const routes = [
  {
    path: "/",
    name: "Search",
    component: Search
  },
  {
    path: "/recipe/:id",
    name: "Recipe",
    component: () => import(/* webpackChunkName: "recipe" */ "../pages/Recipe.vue")
  },
  {
    path: "/bookmarks",
    name: "Bookmark",
    component: () => import(/* webpackChunkName: "about" */ "../pages/Bookmarks.vue")
  },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;