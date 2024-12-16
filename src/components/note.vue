<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey mt-2">
          <small class="column">{{ dateFormatted }}</small>
          <small class="column has-text-right">
            {{ note.content.length }} {{ characterDescription }}
          </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/edit/${note.id}`" class="card-footer-item">Edit</RouterLink>
      <button class="card-footer-item" @click="showDeleteModal = true">Delete</button>
    </footer>
  </div>

  <DeleteModal v-if="showDeleteModal" v-model="showDeleteModal" :note-id="note.id" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useDateFormat } from '@vueuse/core'

  import DeleteModal from '@/components/DeleteModal.vue'

  type Note = {
    id: string
    content: string
    date: string
  }

  interface Props {
    note: Note
  }

  const showDeleteModal = ref(false)

  const { note } = defineProps<Props>()

  const characterDescription = computed(() =>
    note.content.length > 1 ? 'characters' : 'character',
  )

  const dateFormatted = computed(() => {
    const date = new Date(+note.date)
    return useDateFormat(date, 'DD/MM/YYYY @ HH:mm:ss')
  })
</script>
