<template>
  <div class="berita-nasional-page">
    <div class="container">
      <h1>Berita Nasional</h1>
      <p>Informasi nasional terkait pembangunan, riset, dan inovasi.</p>
      
      <div class="berita-list">
        <div v-for="berita in beritaList" :key="berita.id" class="berita-item">
          <h3>{{ berita.title }}</h3>
          <div class="meta">
            <span>📅 {{ berita.date }}</span>
            <span>📰 {{ berita.source }}</span>
          </div>
          <p>{{ berita.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const beritaList = ref([
  {
    id: 1,
    title: 'Pemerintah Pusat Luncurkan Program Inovasi Daerah 2026',
    date: '01 Maret 2026',
    source: 'Kemendagri',
    content: 'Pemerintah pusat meluncurkan program penguatan inovasi daerah untuk percepatan pembangunan...'
  },
  {
    id: 2,
    title: 'Rakornas Bappeda Se-Indonesia Bahas Perencanaan Pembangunan',
    date: '15 Februari 2026',
    source: 'Bappenas',
    content: 'Rapat Koordinasi Nasional Bappeda seluruh Indonesia membahas sinkronisasi perencanaan...'
  }
])
</script>

<style scoped>
.berita-nasional-page {
  padding: 40px 0;
  min-height: calc(100vh - 300px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  color: #003366;
  margin-bottom: 10px;
}

.berita-list {
  margin-top: 30px;
}

.berita-item {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.berita-item h3 {
  color: #003366;
  margin-bottom: 10px;
}

.meta {
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
}

.meta span {
  margin-right: 15px;
}
</style>