<template>
  <div class="edit-note">
    <FieldNote v-model="noteContent" ref="fieldNoteRef" placeholder="Edit note">
      <template #buttons>
        <RouterLink to="/" class="button is-link mr-4">Cancel</RouterLink>
        <button
          class="button is-link has-background-success"
          :disabled="!noteContent"
          @click="editNote"
        >
          Edit Note
        </button>
      </template>
    </FieldNote>
  </div>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { ref } from 'vue'
  import { useNotesStore } from '@/store/notes'

  import FieldNote from '@/components/field-note.vue'

  const notes = useNotesStore()
  const route = useRoute()
  const router = useRouter()

  const noteContent = ref('')

  const id = route.params.id.toString()

  function editNote() {
    notes.editNote(id, noteContent.value)

    router.push('/')
  }

  noteContent.value = notes.getNoteContent(id)
</script>
