<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <RouterLink to="#login" @click.prevent="register = false">Login</RouterLink>
        </li>
        <li :class="{ 'is-active': register }">
          <RouterLink to="#register" @click.prevent="register = true">Register</RouterLink>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="credentials.email"
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model="credentials.password"
                class="input"
                type="password"
                placeholder="Enter a password"
              />
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">{{ formTitle }}</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()

  const register = ref(false)
  const credentials = reactive({
    email: '',
    password: '',
  })

  const formTitle = computed(() => (register.value ? 'Register' : 'Login'))

  function submitForm() {
    if (!credentials.email || !credentials.password) {
      alert('Please enter an email and password!')
      return
    }
    if (register.value) {
      auth.registerUser(credentials)
      return
    }
    auth.loginUser(credentials)
  }
</script>

<style scoped>
  .auth-form {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
