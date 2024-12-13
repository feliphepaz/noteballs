<template>
  <Navbar />

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import Navbar from '@/components/navbar.vue'
</script>

<style>
  @import 'bulma/css/bulma.min.css';
</style>
