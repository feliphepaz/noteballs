<template>
  <div class="notes">
    <FieldNote v-model="noteContent" ref="fieldNoteRef" placeholder="Add new note">
      <template #buttons>
        <button
          class="button is-link has-background-success"
          :disabled="!noteContent"
          @click="addNote"
        >
          Add New Note
        </button>
      </template>
    </FieldNote>

    <progress v-if="notes.isNotesLoading" class="progress is-large is-success" max="100" />

    <template v-else>
      <div
        v-if="!notes.notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        <p>No notes here yet...</p>
      </div>

      <Note v-for="(note, index) in notes.notes" :key="index" :note="note" />
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useNotesStore } from '@/store/notes'
  import { useWatchCharacters } from '@/composables/watch-characters'

  import Note from '@/components/note.vue'
  import FieldNote from '@/components/field-note.vue'

  const notes = useNotesStore()

  const noteContent = ref('')
  const fieldNoteRef = ref()

  function addNote() {
    notes.addNote(noteContent.value)

    noteContent.value = ''
    fieldNoteRef.value.focusTextarea()
  }

  useWatchCharacters(noteContent)
  notes.getNotes()
</script>
