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

    <Note
      v-for="(note, index) in notes.notes"
      :key="index"
      :note="note"
      @delete="notes.delNote(note.id)"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useNotesStore } from '@/store/notes'

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
</script>
