<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Search from './components/Search.vue'
</script>

<template>
  <div class="heading">
    <div class="heading__logo">
      <svg role="img" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    </div>

      <h1>The Recipe Collection</h1>
  </div>

  <div class="content">
    <Search />
  </div>

</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  max-width: 80rem;
  margin: 0 auto;
}

.heading {
  background-color: black;
  color: white;
  padding: 2em;
  display: flex;
  margin-bottom: 1rem;
  
  &__logo {
    width: 75px;
    height: 75px;
    margin-right: 1rem;
    background-color: dodgerblue;
    border-radius: 50%;
    padding: 2rem;
    position: relative;
  }

  svg {
    width: 50px;
    height: 70px;
    position: absolute;
    left: 0.75rem;
    bottom: 0.25rem;
  }
}

.content {
  padding: 0 2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
