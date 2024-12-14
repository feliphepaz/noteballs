<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>{{ note.content.length }} {{ characterDescription }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/edit/${note.id}`" class="card-footer-item">Edit</RouterLink>
      <a href="#" class="card-footer-item" @click="showDeleteModal = true">Delete</a>
    </footer>
  </div>

  <DeleteModal v-if="showDeleteModal" v-model="showDeleteModal" :note-id="note.id" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import DeleteModal from '@/components/delete-modal.vue'

  type Note = {
    id: number
    content: string
  }

  interface Props {
    note: Note
  }

  const showDeleteModal = ref(false)

  const { note } = defineProps<Props>()

  const characterDescription = computed(() =>
    note.content.length > 1 ? 'characters' : 'character',
  )
</script>
