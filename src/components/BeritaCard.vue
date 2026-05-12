<template>
  <div class="berita-card">
    <div class="card-image">
      <img :src="imageUrl" alt="Thumbnail berita" @error="handleImageError">
    </div>
    <div class="card-content">
      <h3>{{ title }}</h3>
      <div class="meta">
        <span>📅 {{ date }}</span>
        <span>✍️ {{ author }}</span>
      </div>
      <router-link :to="`/artikel/${id}`" class="read-more">Baca Selengkapnya →</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: { type: Number, default: 1 },
  title: String,
  date: String,
  author: String,
  image: { type: String, default: '' }
})

const imageUrl = computed(() => {
  return props.image || 'https://via.placeholder.com/300x180?text=Bapperida'
})

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/300x180?text=Gambar+Berita'
}
</script>

<style scoped>
.berita-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.berita-card:hover {
  transform: translateY(-5px);
}

.card-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-content h3 {
  color: #003366;
  font-size: 18px;
  margin-bottom: 12px;
  line-height: 1.4;
}

.meta {
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
}

.meta span {
  margin-right: 15px;
}

.read-more {
  color: #ff9900;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
}

.read-more:hover {
  text-decoration: underline;
}
</style>