import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { db } from '@/ts/firebase'
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore'

const notesCollectionRef = collection(db, 'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

export const useNotesStore = defineStore('notes', () => {
  type Note = {
    id: string
    content: string
    date: string
  }

  const notes = ref<Note[]>([])
  const isNotesLoading = ref(false)
  const totalNotes = computed(() => notes.value.length)
  const totalCharacters = computed(() => {
    let sum = 0
    notes.value.forEach((note) => {
      sum += note.content.length
    })
    return sum
  })

  async function getNotes() {
    isNotesLoading.value = true

    onSnapshot(notesCollectionQuery, (query) => {
      const allNotes: Note[] = []

      query.forEach((doc) => {
        const note = {
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date,
        }
        allNotes.push(note)
      })

      notes.value = allNotes
      isNotesLoading.value = false
    })
  }

  function getNoteContent(id: string) {
    return notes.value.filter((note) => note.id === id)[0].content
  }

  async function addNote(content: string) {
    const time = new Date().getTime()
    const date = time.toString()

    await addDoc(notesCollectionRef, {
      content,
      date,
    })
  }

  async function editNote(id: string, content: string) {
    await updateDoc(doc(notesCollectionRef, id), {
      content,
    })
  }

  async function delNote(id: string) {
    await deleteDoc(doc(notesCollectionRef, id))
  }

  return {
    notes,
    isNotesLoading,
    totalNotes,
    totalCharacters,
    getNotes,
    getNoteContent,
    addNote,
    editNote,
    delNote,
  }
})
