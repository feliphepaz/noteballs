import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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
import { Query, CollectionReference, type DocumentData } from 'firebase/firestore'
import { type Unsubscribe } from 'firebase/auth'
import { useAuthStore } from './Auth'

let notesCollectionRef: CollectionReference<DocumentData, DocumentData>
let notesCollectionQuery: Query<DocumentData, DocumentData>
let unsubscribeSnapshot: Unsubscribe

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

  function init() {
    const auth = useAuthStore()

    if (!auth.loggedUser.id) return

    notesCollectionRef = collection(db, 'users', auth.loggedUser.id, 'notes')
    notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
    getNotes()
  }

  async function getNotes() {
    isNotesLoading.value = true

    if (unsubscribeSnapshot) unsubscribeSnapshot()

    unsubscribeSnapshot = onSnapshot(notesCollectionQuery, (query) => {
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

  function clearNotes() {
    notes.value = []
    if (unsubscribeSnapshot) unsubscribeSnapshot()
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
    init,
    getNotes,
    clearNotes,
    getNoteContent,
    addNote,
    editNote,
    delNote,
  }
})
