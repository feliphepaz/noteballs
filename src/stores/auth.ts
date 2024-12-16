import { reactive } from 'vue'
import { defineStore } from 'pinia'

import { auth } from '@/ts/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useNotesStore } from './notes'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  type LoggedUser = {
    id: null | string
    email: null | string
  }

  const loggedUser = reactive<LoggedUser>({
    id: null,
    email: null,
  })

  type Credentials = {
    email: string
    password: string
  }

  function init() {
    const notes = useNotesStore()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        loggedUser.id = user.uid
        loggedUser.email = user.email
        router.push('/')
        notes.init()
      } else {
        loggedUser.id = null
        loggedUser.email = null
        router.push('/auth')
        notes.clearNotes()
      }
    })
  }

  function registerUser(credentials: Credentials) {
    const { email } = credentials
    const { password } = credentials

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  function loginUser(credentials: Credentials) {
    const { email } = credentials
    const { password } = credentials

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  function logoutUser() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        alert(error.message)
      })
  }

  return { loggedUser, init, registerUser, loginUser, logoutUser }
})
