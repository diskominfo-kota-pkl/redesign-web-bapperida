<template>
  <!-- 2. Panggil komponen Header di atas router-view -->
  <HeaderComponent />
  
  <router-view />
</template>

<script setup>
// 1. Impor file Header.vue dari folder components
// import HeaderComponent from './components/Header.vue'
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