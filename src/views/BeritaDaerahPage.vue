<template>
  <div class="berita-daerah-page">
    <div class="container">
      <h1>Berita Daerah</h1>
      <p>Informasi terkini seputar pembangunan dan kegiatan di Kota Samarinda.</p>
      
      <div class="berita-list">
        <div v-for="berita in beritaList" :key="berita.id" class="berita-item">
          <h3>{{ berita.title }}</h3>
          <div class="meta">
            <span>📅 {{ berita.date }}</span>
            <span>📍 {{ berita.location }}</span>
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
    title: 'Musrenbang Kecamatan Samarinda Kota Tahun 2026',
    date: '05 Maret 2026',
    location: 'Kecamatan Samarinda Kota',
    content: 'Bapperida menggelar Musyawarah Perencanaan Pembangunan (Musrenbang) tingkat kecamatan...'
  },
  {
    id: 2,
    title: 'Sosialisasi Peraturan Daerah tentang RPJMD',
    date: '20 Februari 2026',
    location: 'Aula Bapperida',
    content: 'Bapperida mengadakan sosialisasi Perda RPJMD kepada seluruh perangkat daerah...'
  }
])
</script>

<style scoped>
.berita-daerah-page {
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