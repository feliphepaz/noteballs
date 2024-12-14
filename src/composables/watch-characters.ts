import { watch, type Ref } from 'vue'

export function useWatchCharacters(target: Ref<string>) {
  watch(target, (newValue) => {
    if (newValue.length > 100) alert('Only 100 characters allowed!')
  })
}
