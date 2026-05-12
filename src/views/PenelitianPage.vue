<template>
  <div class="penelitian-page">
    <div class="container">
      <h1>Penelitian dan Pengembangan</h1>
      <p>Hasil penelitian dan kegiatan litbang Bapperida Kota Samarinda.</p>
      
      <div class="penelitian-grid">
        <div v-for="item in penelitianList" :key="item.id" class="penelitian-card">
          <h3>{{ item.title }}</h3>
          <div class="meta">
            <span>📅 Tahun: {{ item.year }}</span>
            <span>👥 Tim: {{ item.team }}</span>
          </div>
          <p>{{ item.description }}</p>
          <a :href="item.link" class="btn-outline">Lihat Laporan</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const penelitianList = ref([
  {
    id: 1,
    title: 'Kajian Potensi Ekonomi Daerah Samarinda',
    year: '2025',
    team: 'Tim Litbang Bapperida',
    description: 'Studi komprehensif tentang potensi ekonomi dan sektor unggulan Kota Samarinda...',
    link: '#'
  }
])
</script>

<style scoped>
.penelitian-page {
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

.penelitian-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.penelitian-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.penelitian-card h3 {
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
  display: inline-block;
}

.btn-outline {
  display: inline-block;
  margin-top: 15px;
  padding: 8px 20px;
  border: 1px solid #003366;
  color: #003366;
  text-decoration: none;
  border-radius: 5px;
  font-size: 12px;
}
</style>