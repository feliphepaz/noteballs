<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete note?</p>
        <button class="delete" aria-label="close" @click="model = false"></button>
      </header>
      <section class="modal-card-body">Are you sure you want to delete this note?</section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button class="button" @click="model = false">Cancel</button>
          <button class="button is-danger" @click="delNote">Delete</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { useNotesStore } from '@/store/notes'

  interface Props {
    noteId: string
  }

  const { noteId } = defineProps<Props>()

  const model = defineModel()
  const notes = useNotesStore()

  const modalCardRef = ref()

  onClickOutside(modalCardRef, () => {
    model.value = false
  })

  function delNote() {
    notes.delNote(noteId)

    model.value = false
  }

  function closeModalWithEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') model.value = false
  }

  onMounted(() => {
    document.addEventListener('keyup', closeModalWithEsc)
  })

  onUnmounted(() => {
    document.removeEventListener('keyup', closeModalWithEsc)
  })
</script>
