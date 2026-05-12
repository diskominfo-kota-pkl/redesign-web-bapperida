<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="pemerintah">PEMERINTAH KOTA SAMARINDA</div>
          <h1>Badan Perencanaan Pembangunan,<br>Riset dan Inovasi Daerah</h1>
          <h2>Kota Samarinda</h2>
          <div class="quote">
            <p>"Sebuah tujuan tanpa rencana hanyalah sebuah keinginan"</p>
            <span>— Antoine de Saint-Exupéry —</span>
          </div>
          <div class="kepala-dinas">
            <h3>Kepala Dinas</h3>
            <p class="nama">MARNABAS, S.Sos, M.Si</p>
            <router-link to="/profil-kepala" class="btn-profile">Profil Lengkap →</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Berita Terkini -->
    <section class="berita-terkini">
      <div class="container">
        <div class="section-header">
          <h2>BERITA TERKINI</h2>
          <router-link to="/artikel" class="link-all">Lihat Semua →</router-link>
        </div>
        <div class="berita-grid">
          <BeritaCard 
            v-for="berita in beritaTerkini" 
            :key="berita.id"
            :id="berita.id"
            :title="berita.title"
            :date="berita.date"
            :author="berita.author"
          />
        </div>
      </div>
    </section>

    <!-- Galeri Kegiatan -->
    <section class="galeri">
      <div class="container">
        <div class="section-header">
          <h2>GALERI KEGIATAN</h2>
          <router-link to="/galeri" class="link-all">Lihat Semua →</router-link>
        </div>
        <div class="galeri-grid">
          <div v-for="i in 4" :key="i" class="galeri-item">
            <img :src="`/src/assets/images/galeri${i}.jpg`" alt="Kegiatan Bapperida">
            <div class="overlay">Kegiatan Bapperida</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu Index -->
    <section class="index-section">
      <div class="container">
        <div class="index-grid">
          <router-link to="/artikel" class="index-card">
            <span>Artikel</span>
            <span class="badge">+ INDEX</span>
          </router-link>
          <router-link to="/berita-daerah" class="index-card">
            <span>Berita Daerah</span>
            <span class="badge">+ INDEX</span>
          </router-link>
          <router-link to="/berita-nasional" class="index-card">
            <span>Berita Nasional</span>
            <span class="badge">+ INDEX</span>
          </router-link>
          <router-link to="/siaran-pers" class="index-card">
            <span>Siaran Pers</span>
            <span class="badge">+ INDEX</span>
          </router-link>
          <router-link to="/jurnal" class="index-card">
            <span>Jurnal</span>
            <span class="badge">+ INDEX</span>
          </router-link>
          <router-link to="/penelitian" class="index-card">
            <span>Penelitian dan Pengembangan</span>
            <span class="badge">+ INDEX</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import BeritaCard from '../components/BeritaCard.vue'

const beritaTerkini = [
  {
    id: 1,
    title: 'Semarak Lomba 17an Bapperida Kota Samarinda Meriahkan HUT ke-80 RI',
    date: '08 Agustus 2025',
    author: 'ARIADHY, S.Kom'
  },
  {
    id: 2,
    title: 'Peringatan Hari Ibu Nasional 2024: Perempuan Menginspirasi Menuju Indonesia Emas 2045',
    date: '23 Desember 2024',
    author: 'ARIADHY, S.Kom'
  },
  {
    id: 3,
    title: 'Rakor TKPK Samarinda : Komitmen Bersama Menghapus Kemiskinan Ekstrem',
    date: '18 November 2024',
    author: 'ARIADHY, S.Kom'
  }
]
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #003366 0%, #1a5276 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.pemerintah {
  font-size: 14px;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.hero h1 {
  font-size: 32px;
  margin-bottom: 15px;
}

.hero h2 {
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 30px;
}

.quote {
  background: rgba(255,255,255,0.1);
  padding: 20px;
  border-radius: 10px;
  margin: 30px 0;
}

.quote p {
  font-style: italic;
  font-size: 18px;
}

.kepala-dinas {
  margin-top: 30px;
}

.kepala-dinas h3 {
  font-size: 18px;
  font-weight: normal;
}

.nama {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
}

.btn-profile {
  display: inline-block;
  background: #ff9900;
  color: white;
  padding: 10px 25px;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 10px;
}

.berita-terkini, .galeri, .index-section {
  padding: 60px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  color: #003366;
  font-size: 24px;
}

.link-all {
  color: #ff9900;
  text-decoration: none;
}

.berita-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.galeri-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.galeri-item {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
}

.galeri-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 10px;
  text-align: center;
}

.index-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.index-card {
  background: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.index-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.index-card .badge {
  display: block;
  font-size: 12px;
  color: #ff9900;
  margin-top: 8px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
