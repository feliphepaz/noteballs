import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import ViewNotes from '@/views/view-notes.vue'
import ViewStats from '@/views/view-stats.vue'
import ViewEditNote from '@/views/view-edit-note.vue'
import ViewAuth from '@/views/view-auth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ViewNotes,
    },
    {
      path: '/stats',
      name: 'stats',
      component: ViewStats,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: ViewEditNote,
    },
    {
      path: '/auth',
      name: 'auth',
      component: ViewAuth,
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (!auth.loggedUser.id && to.name !== 'auth') return { name: 'auth' }
  if (auth.loggedUser.id && to.name === 'auth') return false
})

export default router
