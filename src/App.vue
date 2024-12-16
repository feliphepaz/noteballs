<template>
  <NavBar />

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'

  import NavBar from '@/components/nav-bar.vue'

  const auth = useAuthStore()

  auth.init()
</script>

<style>
  @import 'bulma/css/bulma.min.css';
</style>
