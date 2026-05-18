<template>
  <Header />
  
  <router-view />
  
  <Footer />
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  background-color: #060e27;
  overflow-x: hidden;
}

#app {
  width: 100%;
}
</style>