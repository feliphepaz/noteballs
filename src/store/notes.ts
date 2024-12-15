import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { db } from '@/ts/firebase'
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'

export const useNotesStore = defineStore('notes', () => {
  type Note = {
    id: number
    content: string
  }

  const notes = ref<Note[]>([])

  async function getNotes() {
    onSnapshot(collection(db, 'notes'), (query) => {
      const allNotes: Note[] = []

      query.forEach((doc) => {
        const note = {
          id: +doc.id,
          content: doc.data().content,
        }
        allNotes.push(note)
      })

      notes.value = allNotes
    })
  }

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

  async function addNote(content: string) {
    const time = new Date().getTime()
    const id = time.toString()

    await setDoc(doc(db, 'notes', id), {
      content,
    })
  }

  async function editNote(id: number, content: string) {
    const stringifyId = id.toString()

    await updateDoc(doc(db, 'notes', stringifyId), {
      content,
    })
  }

  async function delNote(id: number) {
    const stringifyId = id.toString()

    await deleteDoc(doc(db, 'notes', stringifyId))
  }

  return {
    notes,
    totalNotes,
    totalCharacters,
    getNotes,
    getNoteContent,
    addNote,
    editNote,
    delNote,
  }
})
