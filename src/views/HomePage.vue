<template>
  <div class="home-page">
    <!-- Hero Section with Slider -->
    <section class="hero-section">
      <div class="hero-slider">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="slide"
          :class="{ active: currentSlide === index }"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div class="hero-overlay"></div>
          <div class="container">
            <div class="hero-content">
              <span class="pemerintah">{{ slide.pemerintah }}</span>
              <h1>{{ slide.title }}</h1>
              <p class="subtitle">{{ slide.subtitle }}</p>
              <div class="quote-box">
                <p><em>"{{ slide.quote }}"</em></p>
                <span>— {{ slide.quoteAuthor }} —</span>
              </div>
            </div>
          </div>
        </div>
        <div class="slider-nav">
          <button 
            v-for="(slide, index) in slides" 
            :key="index"
            class="nav-dot"
            :class="{ active: currentSlide === index }"
            @click="currentSlide = index"
          ></button>
        </div>
      </div>
    </section>

    <!-- Sambutan Kepala Dinas -->
    <section class="kepala-dinas-section">
      <div class="container">
        <div class="kepala-card">
          <div class="kepala-foto">
            <div class="foto-placeholder">
              <span>MARNABAS, S.Sos, M.Si</span>
            </div>
          </div>
          <div class="kepala-content">
            <h3>Kepala Badan</h3>
            <p class="nama">MARNABAS, S.Sos, M.Si</p>
            <div class="sambutan">
              <p>"Sebuah tujuan tanpa rencana hanyalah sebuah keinginan"</p>
              <span>— Antoine de Saint-Exupéry —</span>
            </div>
            <router-link to="/profil-kepala" class="btn-selengkapnya">
              Profil Lengkap <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Berita Utama -->
    <section class="berita-section">
      <div class="container">
        <div class="section-title">
          <h2><span class="icon">📰</span> BERITA TERKINI</h2>
          <router-link to="/artikel" class="lihat-semua">Lihat Semua →</router-link>
        </div>
        <div class="berita-grid">
          <div v-for="berita in beritaUtama" :key="berita.id" class="berita-card">
            <div class="berita-image">
              <img :src="berita.image" :alt="berita.title">
              <span class="kategori">{{ berita.kategori }}</span>
            </div>
            <div class="berita-content">
              <div class="berita-meta">
                <span class="tanggal">{{ berita.date }}</span>
                <span class="penulis">{{ berita.author }}</span>
              </div>
              <h3>{{ berita.title }}</h3>
              <router-link :to="`/artikel/${berita.id}`" class="baca-selengkapnya">
                Baca Selengkapnya →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu Index Cards -->
    <section class="menu-index-section">
      <div class="container">
        <div class="section-title">
          <h2><span class="icon">📂</span> KATEGORI INFORMASI</h2>
        </div>
        <div class="menu-grid">
          <router-link 
            v-for="menu in menuIndex" 
            :key="menu.path" 
            :to="menu.path" 
            class="menu-card"
          >
            <div class="menu-icon">{{ menu.icon }}</div>
            <span class="menu-label">{{ menu.label }}</span>
            <span class="menu-arrow">→</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Galeri Kegiatan -->
    <section class="galeri-section">
      <div class="container">
        <div class="section-title">
          <h2><span class="icon">📷</span> GALERI KEGIATAN</h2>
          <router-link to="/galeri" class="lihat-semua">Lihat Semua →</router-link>
        </div>
        <div class="galeri-grid">
          <div v-for="galeri in galeriItems" :key="galeri.id" class="galeri-item">
            <img :src="galeri.image" :alt="galeri.title">
            <div class="galeri-overlay">
              <span>{{ galeri.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistik & Tautan Cepat -->
    <section class="tautan-section">
      <div class="container">
        <div class="tautan-grid">
          <div class="tautan-column">
            <h3>TAUTAN PENTING</h3>
            <div class="tautan-links">
              <a href="https://samarindakota.go.id" target="_blank" class="tautan-item">
                <img src="https://bapperida.samarindakota.go.id/storage/Tautan/2021-05/31/portal-samarinda.png" alt="Portal Samarinda">
                <span>Portal Samarinda</span>
              </a>
              <a href="https://www.kemendagri.go.id/" target="_blank" class="tautan-item">
                <img src="https://bapperida.samarindakota.go.id/storage/Tautan/2021-05/31/kementerian-dalam-negeri.png" alt="Kemendagri">
                <span>Kemendagri</span>
              </a>
              <a href="https://www.bappenas.go.id" target="_blank" class="tautan-item">
                <img src="https://bapperida.samarindakota.go.id/storage/Tautan/2024-03/18/bappenas.png" alt="Bappenas">
                <span>Bappenas</span>
              </a>
            </div>
          </div>
          <div class="tautan-column">
            <h3>STATISTIK PENGUNJUNG</h3>
            <div class="statistik-box">
              <div class="stat-item">
                <span class="stat-value">12,847</span>
                <span class="stat-label">Pengunjung Hari Ini</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">156,234</span>
                <span class="stat-label">Total Pengunjung</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pengumuman Bar -->
    <section class="pengumuman-bar">
      <div class="container">
        <div class="pengumuman-content">
          <span class="label">📢 PENGUMUMAN</span>
          <div class="pengumuman-text">
            <marquee>
              <span 
                v-for="pengumuman in pengumumans" 
                :key="pengumuman.id"
                class="pengumuman-item"
              >
                {{ pengumuman.text }} | 
              </span>
            </marquee>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let slideInterval = null

const slides = [
  {
    image: 'https://bapperida.samarindakota.go.id/storage/Slider/2025-12/16/2ae8e21e-da15-11f0-977f-88d7f6ae79f3.JPG',
    pemerintah: 'PEMERINTAH KOTA SAMARINDA',
    title: 'Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah',
    subtitle: 'Kota Samarinda',
    quote: 'Sebuah tujuan tanpa rencana hanyalah sebuah keinginan',
    quoteAuthor: 'Antoine de Saint-Exupéry'
  },
  {
    image: 'https://bapperida.samarindakota.go.id/storage/Slider/2022-05/15/33bdc9d6-d479-11ec-abe1-7ed30a6821af.jpg',
    pemerintah: 'PEMERINTAH KOTA SAMARINDA',
    title: 'Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah',
    subtitle: 'Kota Samarinda',
    quote: 'Inovasi untuk kemajuan daerah',
    quoteAuthor: 'Bapperida Samarinda'
  }
]

const beritaUtama = [
  {
    id: 1,
    title: 'Pemenang Lomba Inovasi Baimbai Tahun 2025',
    date: '06 Mei 2026',
    author: 'ARIADHY, S.Kom',
    kategori: 'Jurnal',
    image: 'https://bapperida.samarindakota.go.id/storage/Berita/2026-05/06/pemenang-lomba-inovasi-baimbai-tahun-2025_m.jpeg'
  },
  {
    id: 2,
    title: 'Bapperida Samarinda Gelar Sinkronisasi Penginputan Aksi Konvergensi Percepatan Penurunan Stunting',
    date: '06 Mei 2026',
    author: 'ARIADHY, S.Kom',
    kategori: 'Rapat Koordinasi',
    image: 'https://bapperida.samarindakota.go.id/storage/Berita/2026-05/06/bapperida-samarinda-gelar-sinkronisasi-penginputan-aksi-konvergensi-percepatan-penurunan-stunting_s.png'
  },
  {
    id: 3,
    title: 'Wali Kota Samarinda Raih Penghargaan Terbaik I Regional Kalimantan dalam Pengendalian Inflasi dan Creative Financing',
    date: '06 Mei 2026',
    author: 'ARIADHY, S.Kom',
    kategori: 'Berita Daerah',
    image: 'https://bapperida.samarindakota.go.id/storage/Berita/2026-05/06/wali-kota-samarinda-raih-penghargaan-terbaik-i-regional-kalimantan-dalam-pengendalian-inflasi-dan-creative-financing_s.jpeg'
  }
]

const menuIndex = [
  { path: '/artikel', label: 'Artikel', icon: '📄' },
  { path: '/berita-daerah', label: 'Berita Daerah', icon: '🏛️' },
  { path: '/berita-nasional', label: 'Berita Nasional', icon: '🇮🇩' },
  { path: '/siaran-pers', label: 'Siaran Pers', icon: '📣' },
  { path: '/jurnal', label: 'Jurnal Riset', icon: '📚' },
  { path: '/penelitian', label: 'Penelitian & Pengembangan', icon: '🔬' },
  { path: '/galeri', label: 'Galeri Foto & Video', icon: '🎬' },
  { path: '/profil-kepala', label: 'Profil Pimpinan', icon: '👤' }
]

const galeriItems = [
  { id: 1, title: 'Forum Lintas Perangkat Daerah', image: 'https://bapperida.samarindakota.go.id/storage/Media/Galeri/2025-05/15/forum-lintas-perangkat-daerah-dalam-rangka-penyusunan-renstra-perangkat-daerah-kota-samarinda-tahun-2025-2029-niEHi_m.png' },
  { id: 2, title: 'Penyusunan RKPD 2026', image: 'https://bapperida.samarindakota.go.id/storage/Media/Galeri/2025-05/15/forum-lintas-perangkat-daerah-dalam-rangka-penyusunan-rkpd-kota-samarinda-tahun-2026-misi-mewujudkan-tata-kelola-pemerintahan-inovatif-responsif-adaptif-yang-integritas-akuntabel-wYQum_m.png' },
  { id: 3, title: 'Pawai Tahun 2018', image: 'https://bapperida.samarindakota.go.id/storage/Media/Galeri/2018-11/29/pawai-tahun-2018-va3kn_m.jpg' },
  { id: 4, title: ' Kegiatan Metrologi', image: 'https://bapperida.samarindakota.go.id/storage/Media/Galeri/2018-09/17/kegiatan-tera-ulang-uttp-dan-operasional-uptd-metrologi-di-kota-samarinda-2017-gQtgm_m.png' }
]

const pengumumans = [
  { id: 1, text: 'Pembukaan Konsultasi Publik RKPD Kota Samarinda Tahun 2027' },
  { id: 2, text: 'Pendaftaran Lomba Inovasi Daerah BAIMBAI 2026' },
  { id: 3, text: 'Sosialisasi Program Desa Cantik 2026' }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.hero-slider {
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.slide.active {
  opacity: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,51,102,0.85) 0%, rgba(26,82,118,0.75) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 100px 0;
  text-align: center;
}

.pemerintah {
  display: inline-block;
  background: rgba(255,153,0,0.2);
  color: #ff9900;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.hero-content h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.2;
}

.subtitle {
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 30px;
  opacity: 0.9;
}

.quote-box {
  display: inline-block;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 25px 40px;
  border-radius: 15px;
}

.quote-box p {
  font-size: 18px;
  margin-bottom: 10px;
}

.quote-box span {
  font-size: 14px;
  opacity: 0.7;
}

.slider-nav {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 10px;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-dot.active {
  background: #ff9900;
  border-color: #ff9900;
}

/* Kepala Dinas Section */
.kepala-dinas-section {
  padding: 40px 0;
  background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
}

.kepala-card {
  display: flex;
  gap: 40px;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0,51,102,0.1);
}

.kepala-foto .foto-placeholder {
  width: 180px;
  height: 220px;
  background: linear-gradient(135deg, #003366 0%, #1a5276 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 20px;
  font-weight: 600;
}

.kepala-content {
  flex: 1;
}

.kepala-content h3 {
  color: #666;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nama {
  color: #003366;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}

.sambutan {
  background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%);
  padding: 20px 25px;
  border-left: 4px solid #003366;
  border-radius: 0 10px 10px 0;
  margin-bottom: 20px;
}

.sambutan p {
  font-size: 16px;
  color: #333;
  font-style: italic;
}

.sambutan span {
  display: block;
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}

.btn-selengkapnya {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #003366;
  color: white;
  padding: 12px 25px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-selengkapnya:hover {
  background: #ff9900;
  transform: translateX(5px);
}

/* Section Title */
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-title h2 {
  font-size: 22px;
  color: #003366;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title .icon {
  font-size: 24px;
}

.lihat-semua {
  color: #ff9900;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.lihat-semua:hover {
  color: #003366;
}

/* Berita Section */
.berita-section {
  padding: 60px 0;
  background: white;
}

.berita-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.berita-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  transition: all 0.3s;
}

.berita-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0,51,102,0.15);
}

.berita-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.berita-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.berita-card:hover .berita-image img {
  transform: scale(1.1);
}

.kategori {
  position: absolute;
  top: 15px;
  left: 15px;
  background: #ff9900;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.berita-content {
  padding: 20px;
}

.berita-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
}

.berita-content h3 {
  font-size: 16px;
  color: #333;
  line-height: 1.4;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.baca-selengkapnya {
  color: #003366;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}

.baca-selengkapnya:hover {
  color: #ff9900;
}

/* Menu Index Section */
.menu-index-section {
  padding: 60px 0;
  background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.menu-card {
  display: flex;
  align-items: center;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 3px 15px rgba(0,0,0,0.08);
  transition: all 0.3s;
  border: 2px solid transparent;
}

.menu-card:hover {
  border-color: #003366;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,51,102,0.15);
}

.menu-icon {
  font-size: 28px;
}

.menu-label {
  flex: 1;
  font-weight: 600;
  color: #333;
}

.menu-arrow {
  color: #ff9900;
  font-size: 18px;
  transition: transform 0.3s;
}

.menu-card:hover .menu-arrow {
  transform: translateX(5px);
}

/* Galeri Section */
.galeri-section {
  padding: 60px 0;
  background: white;
}

.galeri-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.galeri-item {
  position: relative;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}

.galeri-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.galeri-item:hover img {
  transform: scale(1.1);
}

.galeri-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,51,102,0.9));
  color: white;
  padding: 30px 15px 15px;
  opacity: 0;
  transition: opacity 0.3s;
}

.galeri-item:hover .galeri-overlay {
  opacity: 1;
}

/* Tautan Section */
.tautan-section {
  padding: 60px 0;
  background: #003366;
  color: white;
}

.tautan-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.tautan-column h3 {
  font-size: 18px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ff9900;
}

.tautan-links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.tautan-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.1);
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: all 0.3s;
}

.tautan-item:hover {
  background: #ff9900;
}

.tautan-item img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.statistik-box {
  display: flex;
  gap: 30px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: #ff9900;
}

.stat-label {
  font-size: 12px;
  opacity: 0.8;
}

/* Pengumuman Bar */
.pengumuman-bar {
  background: linear-gradient(90deg, #ff9900 0%, #ffb84d 100%);
  padding: 15px 0;
}

.pengumuman-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.pengumuman-content .label {
  font-weight: 700;
  white-space: nowrap;
}

.pengumuman-text {
  flex: 1;
  color: #333;
  font-weight: 500;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Responsive */
@media (max-width: 1024px) {
  .berita-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .galeri-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 400px;
  }
  .hero-content h1 {
    font-size: 28px;
  }
  .kepala-card {
    flex-direction: column;
    text-align: center;
  }
  .berita-grid, .menu-grid, .galeri-grid {
    grid-template-columns: 1fr;
  }
  .tautan-grid {
    grid-template-columns: 1fr;
  }
  .statistik-box {
    justify-content: center;
  }
}
</style>
