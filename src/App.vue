<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Search from './components/Search.vue'
</script>

<template>
  <h1>The Recipe Collection</h1>
  <Search />
</template>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0 2em;
  max-width: 80rem;
  margin: 0 auto;
}
</style>
