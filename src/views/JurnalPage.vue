<template>
  <div class="jurnal-page">
    <div class="container">
      <h1>Jurnal</h1>
      <p>Publikasi ilmiah dan jurnal riset Bapperida Kota Samarinda.</p>
      
      <div class="jurnal-highlight">
        <h2>Jurnal Riset Inossa</h2>
        <p>Edisi: 02 April 2023 | Penulis: IRWAN GUNIAWAN, SH</p>
      </div>
      
      <div class="jurnal-list">
        <div v-for="jurnal in jurnalList" :key="jurnal.id" class="jurnal-item">
          <h3>{{ jurnal.title }}</h3>
          <div class="meta">
            <span>📅 {{ jurnal.date }}</span>
            <span>✍️ {{ jurnal.author }}</span>
          </div>
          <p>{{ jurnal.abstract }}</p>
          <a :href="jurnal.link" class="btn-outline">Download PDF</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const jurnalList = ref([
  {
    id: 1,
    title: 'Analisis Efektivitas Perencanaan Pembangunan di Samarinda',
    date: '2024-10-15',
    author: 'Dr. Budi Santoso',
    abstract: 'Penelitian ini menganalisis efektivitas sistem perencanaan pembangunan di Kota Samarinda...',
    link: '#'
  }
])
</script>

<style scoped>
.jurnal-page {
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
}

.jurnal-highlight {
  background: linear-gradient(135deg, #003366, #1a5276);
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0 30px;
}

.jurnal-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
}

.jurnal-item {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.jurnal-item h3 {
  color: #003366;
  margin-bottom: 10px;
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