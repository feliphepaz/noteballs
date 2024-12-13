<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            ref="newNoteRef"
            class="textarea"
            placeholder="Add a new note"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-link has-background-success"
            :disabled="!newNote"
            @click="addNote"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <Note v-for="(note, index) in notes" :key="index" :note="note" @delete="delNote(note.id)" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import Note from '@/components/note.vue'

  const newNote = ref('')
  const newNoteRef = ref()
  const notes = ref([
    {
      id: 0,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.',
    },
    {
      id: 1,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.',
    },
  ])

  function addNote() {
    const time = new Date().getTime()

    const note = {
      id: time,
      content: newNote.value,
    }

    notes.value.unshift(note)

    newNote.value = ''
    newNoteRef.value.focus()
  }

  function delNote(id: number) {
    notes.value = notes.value.filter((note) => note.id !== id)
  }
</script>
