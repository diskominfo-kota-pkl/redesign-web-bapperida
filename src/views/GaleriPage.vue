<template>
  <div class="galeri-page">
    <div class="container">
      <h1>Galeri Kegiatan</h1>
      <p>Dokumentasi kegiatan Bapperida Kota Samarinda.</p>
      
      <div class="galeri-grid">
        <div v-for="item in galeriList" :key="item.id" class="galeri-item">
          <img :src="item.image" :alt="item.title" @error="handleImageError">
          <div class="info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const galeriList = ref([
  { id: 1, title: 'Rapat Koordinasi Pembangunan', date: '2025-01-15', image: '' },
  { id: 2, title: 'Kunjungan Kerja ke Kecamatan', date: '2025-01-20', image: '' },
  { id: 3, title: 'Seminar Riset dan Inovasi', date: '2025-02-01', image: '' },
  { id: 4, title: 'Lomba 17an Bapperida', date: '2025-08-08', image: '' },
  { id: 5, title: 'Rakor TKPK Samarinda', date: '2024-11-18', image: '' },
  { id: 6, title: 'Peringatan Hari Ibu', date: '2024-12-23', image: '' },
])

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/300x200?text=Galeri+Bapperida'
}
</script>

<style scoped>
.galeri-page {
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

p {
  color: #666;
  margin-bottom: 30px;
}

.galeri-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.galeri-item {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.galeri-item:hover {
  transform: translateY(-5px);
}

.galeri-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.galeri-item .info {
  padding: 15px;
}

.galeri-item h3 {
  color: #003366;
  font-size: 16px;
  margin-bottom: 5px;
}

.galeri-item p {
  font-size: 12px;
  color: #999;
  margin: 0;
}
</style>