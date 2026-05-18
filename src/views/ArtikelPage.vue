<template>
  <div class="artikel-page">
    <!-- Page Header -->
    <section class="page-hero">
      <div class="page-hero-inner">
        <div class="page-hero-badge">
          <span class="badge-dot"></span>
          KABAR & OPINI
        </div>
        <h1 class="page-hero-title">Artikel</h1>
        <p class="page-hero-desc">Kumpulan artikel, opini, dan analisis dari Bapperida Kota Samarinda seputar perencanaan pembangunan, riset, dan inovasi daerah.</p>
        <div class="page-hero-stats">
          <div v-for="(s, i) in pageStats" :key="i" class="page-hero-stat">
            <span class="phs-value">{{ s.value }}</span>
            <span class="phs-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
      <div class="page-hero-particles">
        <span v-for="p in particles" :key="p.id" class="particle"
          :style="{
            left: p.x + '%', top: p.y + '%',
            width: p.size + 'px', height: p.size + 'px',
            animationDelay: p.delay + 's', animationDuration: p.dur + 's'
          }"></span>
      </div>
    </section>

    <!-- Artikel List -->
    <section class="section artikel-list-section">
      <div class="container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-label">Arsip Artikel</div>
            <h2 class="section-title">Semua Artikel</h2>
          </div>
          <div class="header-right">
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" v-model="searchQuery" placeholder="Cari artikel...">
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="artikel-tabs anim-target" data-delay="1">
          <button v-for="tab in artikelTabs" :key="tab"
            class="artikel-tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab">
            {{ tab }}
          </button>
        </div>

        <!-- Featured -->
        <div v-if="filteredArtikel.length > 0" class="artikel-featured anim-target" data-delay="2"
          @click="showToast('Membuka artikel: ' + filteredArtikel[0].title)">
          <div class="af-img">
            <img :src="filteredArtikel[0].img" @error="fallbackImg($event, filteredArtikel[0].fallback)" :alt="filteredArtikel[0].title">
          </div>
          <div class="af-body">
            <div class="af-cat">{{ filteredArtikel[0].category }}</div>
            <h3>{{ filteredArtikel[0].title }}</h3>
            <p class="af-excerpt">{{ filteredArtikel[0].excerpt }}</p>
            <div class="af-foot">
              <div class="artikel-author">
                <span class="author-avatar">{{ filteredArtikel[0].initial }}</span>
                <span class="author-name">{{ filteredArtikel[0].author }}</span>
              </div>
              <span class="artikel-date"><i class="far fa-calendar"></i> {{ filteredArtikel[0].date }}</span>
            </div>
          </div>
        </div>

        <!-- Grid -->
        <div class="artikel-grid">
          <div v-for="(a, i) in filteredArtikel.slice(1)" :key="a.title"
            class="artikel-card anim-target"
            :data-delay="((i % 3) + 1)"
            @click="showToast('Membuka artikel: ' + a.title)">
            <div class="artikel-card-img">
              <img :src="a.img" @error="fallbackImg($event, a.fallback)" :alt="a.title">
              <div class="artikel-card-cat">{{ a.category }}</div>
            </div>
            <div class="artikel-card-body">
              <h4>{{ a.title }}</h4>
              <p>{{ a.excerpt }}</p>
              <div class="artikel-card-foot">
                <div class="artikel-author">
                  <span class="author-avatar">{{ a.initial }}</span>
                  <span class="author-name">{{ a.author }}</span>
                </div>
                <span class="artikel-date">{{ a.date }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredArtikel.length === 0" class="empty-state anim-target" data-delay="1">
          <div class="empty-icon">
            <i class="fas fa-search"></i>
          </div>
          <h4>Artikel tidak ditemukan</h4>
          <p>Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
        </div>

        <!-- Load More -->
        <div v-if="filteredArtikel.length > 0" class="load-more anim-target" data-delay="1">
          <button class="btn-gold-outline" @click="showToast('Memuat lebih banyak artikel...')">
            Muat Lebih Banyak <i class="fas fa-arrow-down"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toastMsg" class="toast">
        <i class="fas fa-check-circle"></i> {{ toastMsg }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* ========== DATA ========== */

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 3,
  delay: Math.random() * 6,
  dur: 4 + Math.random() * 5
}))

const pageStats = [
  { value: '24', label: 'Total Artikel' },
  { value: '5', label: 'Kategori' },
  { value: '12', label: 'Penulis' }
]

const artikelTabs = ['Semua', 'Pembangunan', 'Lingkungan', 'Pendidikan', 'Inovasi']

const allArtikel = [
  {
    title: 'Transformasi Samarinda Menuju Kota Pintar Berkelanjutan',
    excerpt: 'Teknologi dan kebijakan hijau mengubah wajah kota tepian menjadi kota masa depan yang layak huni bagi seluruh lapisan masyarakat.',
    img: 'https://picsum.photos/seed/smd-a1/600/400.jpg', fallback: 'smd-a1',
    category: 'Pembangunan', author: 'Ahmad Fauzi', initial: 'AF', date: '22 Jun 2025'
  },
  {
    title: 'Konservasi Mangrove Sungai Mahakam: Harapan Baru Lingkungan Kota',
    excerpt: 'Ekosistem mangrove di tepian Mahakam menjadi penyangga kehidupan warga pesisir dan pariwisata alam.',
    img: 'https://picsum.photos/seed/smd-a2/600/400.jpg', fallback: 'smd-a2',
    category: 'Lingkungan', author: 'Siti Nurhaliza', initial: 'SN', date: '20 Jun 2025'
  },
  {
    title: 'Revitalisasi Sekolah Dasar: Dari Rusak Menjadi Berstandar Nasional',
    excerpt: 'Program renovasi massal sekolah dasar menunjukkan hasil nyata peningkatan mutu pendidikan di Samarinda.',
    img: 'https://picsum.photos/seed/smd-a3/600/400.jpg', fallback: 'smd-a3',
    category: 'Pendidikan', author: 'Budi Santoso', initial: 'BS', date: '18 Jun 2025'
  },
  {
    title: 'Pembangunan Jalan Lingkar Utara Samarinda Capai 70 Persen',
    excerpt: 'Proyek strategis penghubung kecamatan utara ditargetkan selesai akhir 2025 untuk mengurai kemacetan.',
    img: 'https://picsum.photos/seed/smd-a4/600/400.jpg', fallback: 'smd-a4',
    category: 'Pembangunan', author: 'Ir. Hendra', initial: 'IH', date: '14 Jun 2025'
  },
  {
    title: 'Samarinda Green City: Penghargaan Kota Paling Hijau di Kaltim',
    excerpt: 'Penghijauan dan pengelolaan sampah konsisten membawa Samarinda raih penghargaan provinsi.',
    img: 'https://picsum.photos/seed/smd-a5/600/400.jpg', fallback: 'smd-a5',
    category: 'Lingkungan', author: 'Maya Sari', initial: 'MS', date: '12 Jun 2025'
  },
  {
    title: 'Digitalisasi Sekolah: 50 Ribu Siswa Dapat Akses Platform Belajar',
    excerpt: 'Kerjasama dengan Kemendikbud memperluas akses digital bagi pelajar Samarinda dari pelosok.',
    img: 'https://picsum.photos/seed/smd-a6/600/400.jpg', fallback: 'smd-a6',
    category: 'Pendidikan', author: 'Dra. Lina', initial: 'DL', date: '10 Jun 2025'
  },
  {
    title: 'Strategi Perencanaan Pembangunan Kota Samarinda 2025-2030',
    excerpt: 'Bapperida Samarinda merumuskan strategi baru dalam perencanaan pembangunan jangka menengah daerah yang terintegrasi.',
    img: 'https://picsum.photos/seed/smd-a7/600/400.jpg', fallback: 'smd-a7',
    category: 'Pembangunan', author: 'Tim Bapperida', initial: 'TB', date: '08 Jun 2025'
  },
  {
    title: 'Inovasi Riset untuk Pembangunan Berkelanjutan di Kalimantan',
    excerpt: 'Pemanfaatan riset dan inovasi dalam mendukung pembangunan daerah yang berkelanjutan dan berdaya saing.',
    img: 'https://picsum.photos/seed/smd-a8/600/400.jpg', fallback: 'smd-a8',
    category: 'Inovasi', author: 'Dr. Ahmad Suherman', initial: 'AS', date: '05 Jun 2025'
  },
  {
    title: 'Lab Inovasi Bapperida: Inkubator Ide Warga Samarinda',
    excerpt: 'Fasilitas baru untuk menampung dan mengembangkan ide inovasi dari masyarakat luas.',
    img: 'https://picsum.photos/seed/smd-a9/600/400.jpg', fallback: 'smd-a9',
    category: 'Inovasi', author: 'Rizki Pratama', initial: 'RP', date: '02 Jun 2025'
  }
]

const activeTab = ref('Semua')
const searchQuery = ref('')

const filteredArtikel = computed(() => {
  let result = allArtikel
  if (activeTab.value !== 'Semua') {
    result = result.filter(a => a.category === activeTab.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q)
    )
  }
  return result
})

/* ========== INTERAKSI ========== */

const toastMsg = ref('')
let toastTimer = null

function showToast(msg) {
  toastMsg.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 2500)
}

function fallbackImg(e, seed) {
  e.target.src = `https://picsum.photos/seed/${seed}/600/400.jpg`
}

/* ========== SCROLL ANIMATION ========== */

function handleScroll() {
  document.querySelectorAll('.anim-target').forEach(el => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight - 60) {
      const delay = parseInt(el.dataset.delay || 0)
      el.style.transitionDelay = delay * 0.1 + 's'
      el.classList.add('visible')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* ========== CSS VARIABLES ========== */
:root {
  --g900: #0A2E1A; --g800: #143D26; --g700: #1B5E30;
  --g600: #237A3E; --g500: #2E964F; --g400: #4CB872;
  --g300: #7DD4A0; --g200: #B5E6C8; --g100: #E0F3E8; --g50: #F0FAF3;
  --gold: #D4A843; --gold-light: #E2C36B; --gold-pale: #F0D98A;
  --dark: #0F1A14;
  --gray-800: #1A1F1C; --gray-700: #3D4842; --gray-600: #556159;
  --gray-500: #6B7A72; --gray-400: #8A9992; --gray-300: #B0BDB7;
  --gray-200: #D4DDD9; --gray-100: #E8EDEB; --gray-50: #F4F7F6;
  --radius: 14px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ========== SCROLL ANIMATION ========== */
.anim-target {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
              transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
.anim-target.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ========== PAGE HERO ========== */
.page-hero {
  position: relative;
  padding: 80px 24px 60px;
  background: linear-gradient(170deg, var(--g900) 0%, var(--g800) 60%, var(--g700) 100%);
  overflow: hidden;
}
.page-hero::before {
  content: '';
  position: absolute;
  top: -120px;
  right: -120px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(212,168,67,0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.page-hero::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: -80px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(78,184,114,0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.page-hero-particles {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.particle {
  position: absolute;
  background: var(--g300);
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat 6s ease-in-out infinite;
}
@keyframes particleFloat {
  0%, 100% { transform: translateY(0); opacity: 0; }
  20% { opacity: 0.35; }
  50% { transform: translateY(-14px); opacity: 0.25; }
  80% { opacity: 0.1; }
}

.page-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.page-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px 6px 8px;
  border-radius: 99px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--g200);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
  animation: fadeUp 0.7s ease forwards;
}
.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--g400);
  border-radius: 50%;
  position: relative;
}
.badge-dot::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1.5px solid var(--g400);
  animation: pulseRing 2s ease infinite;
}
@keyframes pulseRing {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 14px;
  animation: fadeUp 0.7s 0.1s ease forwards;
  opacity: 0;
}

.page-hero-desc {
  font-size: 0.95rem;
  color: var(--g200);
  line-height: 1.7;
  max-width: 640px;
  margin-bottom: 28px;
  animation: fadeUp 0.7s 0.2s ease forwards;
  opacity: 0;
}

.page-hero-stats {
  display: flex;
  gap: 32px;
  animation: fadeUp 0.7s 0.3s ease forwards;
  opacity: 0;
}
.page-hero-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.phs-value {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gold-light);
  line-height: 1.2;
}
.phs-label {
  font-size: 0.72rem;
  color: var(--g300);
  font-weight: 500;
}

/* ========== SECTION COMMON ========== */
.section { padding: 72px 0; }
.artikel-list-section { background: var(--gray-50); }

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
  gap: 16px;
  flex-wrap: wrap;
}
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--g600);
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin-bottom: 6px;
}
.section-label::before {
  content: '';
  width: 22px;
  height: 2px;
  background: var(--g500);
  border-radius: 99px;
}
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  font-weight: 700;
  color: var(--g900);
  line-height: 1.2;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border-radius: 99px;
  background: #fff;
  border: 1.5px solid var(--gray-200);
  transition: all 0.3s ease;
  min-width: 240px;
}
.search-box:focus-within {
  border-color: var(--g400);
  box-shadow: 0 0 0 3px rgba(78,184,114,0.12);
}
.search-box i {
  color: var(--gray-400);
  font-size: 0.82rem;
  flex-shrink: 0;
}
.search-box input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.84rem;
  color: var(--gray-800);
  width: 100%;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.search-box input::placeholder {
  color: var(--gray-400);
}

/* ========== TABS ========== */
.artikel-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.artikel-tab {
  padding: 8px 20px;
  border-radius: 99px;
  border: 1.5px solid var(--gray-200);
  background: transparent;
  color: var(--gray-600);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.artikel-tab:hover {
  border-color: var(--g300);
  color: var(--g700);
}
.artikel-tab.active {
  background: var(--g700);
  color: #fff;
  border-color: var(--g700);
}

/* ========== FEATURED ARTIKEL ========== */
.artikel-featured {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  border-radius: var(--radius);
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--gray-100);
  cursor: pointer;
  margin-bottom: 32px;
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.artikel-featured:hover {
  box-shadow: 0 12px 40px rgba(10,46,26,0.12);
  transform: translateY(-4px);
  border-color: transparent;
}
.af-img {
  height: 100%;
  min-height: 320px;
  overflow: hidden;
}
.af-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.artikel-featured:hover .af-img img { transform: scale(1.05); }
.af-body {
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.af-cat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: var(--g100);
  color: var(--g700);
  border-radius: 6px;
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: fit-content;
  margin-bottom: 16px;
}
.af-body h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--g900);
  line-height: 1.35;
  margin-bottom: 12px;
}
.af-excerpt {
  font-size: 0.84rem;
  color: var(--gray-500);
  line-height: 1.7;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.af-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 18px;
  border-top: 1px solid var(--gray-100);
}

/* ========== ARTIKEL GRID ========== */
.artikel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.artikel-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--gray-100);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  cursor: pointer;
}
.artikel-card:hover {
  box-shadow: 0 12px 40px rgba(10,46,26,0.12);
  transform: translateY(-5px);
  border-color: transparent;
}
.artikel-card-img {
  position: relative;
  height: 190px;
  overflow: hidden;
}
.artikel-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.artikel-card:hover .artikel-card-img img { transform: scale(1.05); }
.artikel-card-cat {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 3px 10px;
  background: rgba(255,255,255,0.95);
  border-radius: 6px;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--g700);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(8px);
}
.artikel-card-body { padding: 20px; }
.artikel-card-body h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--g900);
  line-height: 1.4;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.artikel-card-body p {
  font-size: 0.8rem;
  color: var(--gray-500);
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.artikel-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid var(--gray-100);
}

/* ========== AUTHOR / DATE (shared) ========== */
.artikel-author {
  display: flex;
  align-items: center;
  gap: 8px;
}
.author-avatar {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--g100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--g700);
}
.author-name {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--gray-700);
}
.artikel-date {
  font-size: 0.7rem;
  color: var(--gray-400);
  display: flex;
  align-items: center;
  gap: 5px;
}

/* ========== EMPTY STATE ========== */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}
.empty-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: var(--gray-400);
  font-size: 1.4rem;
}
.empty-state h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--g900);
  margin-bottom: 8px;
}
.empty-state p {
  font-size: 0.84rem;
  color: var(--gray-500);
}

/* ========== LOAD MORE ========== */
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 44px;
}
.btn-gold-outline {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  border: 1.5px solid var(--gold);
  color: var(--gold);
  font-size: 0.86rem;
  font-weight: 700;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: all 0.3s ease;
}
.btn-gold-outline:hover {
  background: linear-gradient(135deg, var(--gold-light), var(--gold));
  color: var(--g900);
  box-shadow: 0 4px 20px rgba(212,168,67,0.35);
  transform: translateY(-2px);
}

/* ========== TOAST ========== */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  padding: 14px 24px;
  background: var(--g700);
  color: #fff;
  border-radius: 12px;
  font-size: 0.84rem;
  font-weight: 500;
  box-shadow: 0 8px 32px rgba(27,94,48,0.35);
  display: flex;
  align-items: center;
  gap: 10px;
}
.toast-enter-active { animation: toastIn 0.4s cubic-bezier(0.16,1,0.3,1); }
.toast-leave-active { animation: toastIn 0.3s ease reverse; }
@keyframes toastIn {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}

/* ========== RESPONSIVE ========== */
@media (max-width: 1024px) {
  .artikel-featured {
    grid-template-columns: 1fr;
  }
  .af-img {
    min-height: 240px;
  }
  .artikel-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section { padding: 52px 0; }
  .container { padding: 0 16px; }
  .page-hero { padding: 60px 16px 48px; }
  .page-hero-stats { gap: 24px; }
  .phs-value { font-size: 1.25rem; }
  .artikel-grid { grid-template-columns: 1fr; }
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .search-box { min-width: 100%; }
  .af-body { padding: 24px 20px; }
}

@media (max-width: 480px) {
  .page-hero-stats {
    flex-direction: column;
    gap: 12px;
  }
  .page-hero-stat {
    flex-direction: row;
    gap: 8px;
    align-items: baseline;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .particle { animation: none; opacity: 0.2; }
}
</style>