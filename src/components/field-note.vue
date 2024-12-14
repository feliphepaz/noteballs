<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
        <textarea v-bind="$attrs" v-model="model" ref="textareaRef" class="textarea" />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  defineOptions({
    inheritAttrs: false,
  })

  const model = defineModel<string>()

  const textareaRef = ref()

  function focusTextarea() {
    textareaRef.value.focus()
  }

  defineExpose({
    focusTextarea,
  })
</script>
