<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ notes.totalNotes }}</td>
        </tr>
        <tr>
          <td>Number of Characters</td>
          <td>{{ notes.totalCharacters }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { useNotesStore } from '@/store/notes'

  const notes = useNotesStore()
</script>
