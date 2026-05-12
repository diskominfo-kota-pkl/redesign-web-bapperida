<template>
  <div class="siaran-pers-page">
    <div class="container">
      <h1>Siaran Pers</h1>
      <p>Rilis resmi dari Bapperida Kota Samarinda.</p>
      
      <div class="siaran-list">
        <div v-for="siaran in siaranList" :key="siaran.id" class="siaran-item">
          <h3>{{ siaran.title }}</h3>
          <div class="meta">
            <span>📅 {{ siaran.date }}</span>
            <span>📢 Nomor: {{ siaran.number }}</span>
          </div>
          <p>{{ siaran.content }}</p>
          <a :href="siaran.link" class="download-link">📄 Baca Selengkapnya →</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const siaranList = ref([
  {
    id: 1,
    title: 'Siaran Pers: Capaian Pembangunan Samarinda Tahun 2025',
    date: '31 Desember 2025',
    number: '001/BAPPERIDA/SP/XII/2025',
    content: 'Bapperida menyampaikan capaian pembangunan Kota Samarinda sepanjang tahun 2025...',
    link: '#'
  }
])
</script>

<style scoped>
.siaran-pers-page {
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

.siaran-list {
  margin-top: 30px;
}

.siaran-item {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.siaran-item h3 {
  color: #003366;
  margin-bottom: 10px;
}

.meta {
  font-size: 12px;
  color: #666;
  margin-bottom: 15px;
}

.download-link {
  display: inline-block;
  margin-top: 10px;
  color: #ff9900;
  text-decoration: none;
}
</style>