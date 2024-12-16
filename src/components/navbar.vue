<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace" href="https://bulma.io">
          Noteballs
        </div>

        <a
          role="button"
          ref="burgerButtonRef"
          :class="['navbar-burger', { 'is-active': showMobileNav }]"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click.prevent="showMobileNav = !showMobileNav"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        ref="menuRef"
        :class="['navbar-menu', { 'is-active': showMobileNav }]"
      >
        <div class="navbar-start">
          <button
            v-if="auth.loggedUser.id"
            class="button is-small is-info mt-3 ml-3 mb-3"
            @click="logout"
          >
            Log out {{ auth.loggedUser.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink
            to="/"
            class="navbar-item"
            active-class="is-active"
            @click="showMobileNav = false"
          >
            Notes
          </RouterLink>
          <RouterLink
            to="/stats"
            class="navbar-item"
            active-class="is-active"
            @click="showMobileNav = false"
          >
            Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { useAuthStore } from '@/stores/Auth'

  const auth = useAuthStore()

  const showMobileNav = ref(false)
  const menuRef = ref()
  const burgerButtonRef = ref()

  onClickOutside(
    menuRef,
    () => {
      showMobileNav.value = false
    },
    {
      ignore: [burgerButtonRef],
    },
  )

  function logout() {
    showMobileNav.value = false
    auth.logoutUser()
  }
</script>

<style scoped>
  .navbar {
    height: 54px;
  }

  @media (max-width: 1023px) {
    .navbar-menu {
      position: absolute;
      left: 0;
      width: 100%;
    }
  }
</style>
