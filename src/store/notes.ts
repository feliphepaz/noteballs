import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotesStore = defineStore('notes', () => {
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

  const totalNotes = computed(() => notes.value.length)
  const totalCharacters = computed(() => {
    let sum = 0
    notes.value.forEach((note) => {
      sum += note.content.length
    })
    return sum
  })

  function getNoteContent(id: number) {
    return notes.value.filter((note) => note.id === id)[0].content
  }

  function addNote(content: string) {
    const time = new Date().getTime()

    const note = {
      id: time,
      content: content,
    }

    notes.value.unshift(note)
  }

  function editNote(id: number, content: string) {
    const note = notes.value.find((note) => note.id === id)

    if (note) note.content = content
  }

  function delNote(id: number) {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  return { notes, totalNotes, totalCharacters, getNoteContent, addNote, editNote, delNote }
})
