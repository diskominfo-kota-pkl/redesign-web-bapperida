import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  const isVisible = ref(false)
  const elementRef = ref(null)

  const handleScroll = () => {
    if (!elementRef.value) return
    const rect = elementRef.value.getBoundingClientRect()
    isVisible.value = rect.top < window.innerHeight * 0.85
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isVisible,
    elementRef
  }
}