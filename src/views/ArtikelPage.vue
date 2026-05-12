<template>
  <div class="artikel-page">
    <div class="container">
      <h1>Artikel</h1>
      <p>Kumpulan artikel dari Bapperida Kota Samarinda.</p>
      
      <div class="artikel-grid">
        <div v-for="artikel in artikelList" :key="artikel.id" class="artikel-card">
          <div class="card-content">
            <h3>{{ artikel.title }}</h3>
            <div class="meta">
              <span>📅 {{ artikel.date }}</span>
              <span>✍️ {{ artikel.author }}</span>
            </div>
            <p class="excerpt">{{ artikel.excerpt }}</p>
            <router-link :to="`/artikel/${artikel.id}`" class="read-more">Baca Selengkapnya →</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const artikelList = ref([
  {
    id: 1,
    title: 'Strategi Perencanaan Pembangunan Kota Samarinda 2025-2030',
    date: '10 Januari 2025',
    author: 'Tim Bapperida',
    excerpt: 'Bapperida Samarinda merumuskan strategi baru dalam perencanaan pembangunan jangka menengah daerah...'
  },
  {
    id: 2,
    title: 'Inovasi Riset untuk Pembangunan Berkelanjutan',
    date: '15 Februari 2025',
    author: 'Dr. Ahmad Suherman',
    excerpt: 'Pemanfaatan riset dan inovasi dalam mendukung pembangunan daerah yang berkelanjutan...'
  }
])
</script>

<style scoped>
.artikel-page {
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

.artikel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.artikel-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.artikel-card h3 {
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

.excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.read-more {
  color: #ff9900;
  text-decoration: none;
  font-weight: 500;
}
</style>