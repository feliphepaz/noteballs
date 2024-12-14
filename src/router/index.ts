import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'

const router = createRouter({
  history: createWebHashHistory(),
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
  ],
})

export default router
