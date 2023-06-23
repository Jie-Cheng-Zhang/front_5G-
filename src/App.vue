<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { useRouter, RouterView } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
