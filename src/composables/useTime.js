import { ref, onMounted, onUnmounted } from 'vue'

export function useTime() {
  const currentTime = ref(new Date())
  let interval = null

  onMounted(() => {
    interval = setInterval(() => {
      currentTime.value = new Date()
    }, 1000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  const formattedTime = () => {
    return currentTime.value.toLocaleTimeString('id-ID')
  }

  const formattedDate = () => {
    return currentTime.value.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return {
    currentTime,
    formattedTime,
    formattedDate
  }
}