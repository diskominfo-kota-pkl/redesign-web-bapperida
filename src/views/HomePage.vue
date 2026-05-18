<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <img src="https://picsum.photos/seed/bapperida-smd/1920/1080.jpg" alt="Bapperida Samarinda">
      </div>
      <div class="hero-particles">
        <span v-for="p in particles" :key="p.id" class="particle"
          :style="{
            left: p.x + '%', top: p.y + '%',
            width: p.size + 'px', height: p.size + 'px',
            animationDelay: p.delay + 's', animationDuration: p.dur + 's'
          }"></span>
      </div>

      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            PEMERINTAH KOTA SAMARINDA
          </div>
          <h1 class="hero-title">
            Badan Perencanaan<br>Pembangunan, Riset &<br><span>Inovasi Daerah</span>
          </h1>
          <h2 class="hero-subtitle">Kota Samarinda</h2>
          <div class="hero-quote">
            <p>"Sebuah tujuan tanpa rencana hanyalah sebuah keinginan"</p>
            <span>— Antoine de Saint-Exupéry</span>
          </div>
          <div class="hero-actions">
            <router-link to="/artikel" class="btn-gold">
              Jelajahi Berita <i class="fas fa-arrow-right"></i>
            </router-link>
            <button class="btn-glass" @click="scrollTo('berita-terkini')">
              <i class="fas fa-newspaper"></i> Berita Terkini
            </button>
          </div>
        </div>

        <div class="hero-right">
          <div v-for="(s, i) in heroStats" :key="i" class="hero-stat">
            <div class="hero-stat-icon" :style="{ background: s.bg, color: s.color }">
              <i :class="s.icon"></i>
            </div>
            <div class="hero-stat-text">
              <div class="hero-stat-value">{{ s.value }}</div>
              <div class="hero-stat-label">{{ s.label }}</div>
            </div>
          </div>

          <div class="kepala-dinas-card">
            <div class="kd-avatar">
              <i class="fas fa-user-tie"></i>
            </div>
            <div class="kd-info">
              <span class="kd-role">Kepala Dinas</span>
              <span class="kd-name">MARNABAS, S.Sos, M.Si</span>
            </div>
            <router-link to="/profil-kepala" class="kd-link" aria-label="Profil Lengkap">
              <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>

      <div class="hero-marquee">
        <div class="marquee-track">
          <span v-for="(m, i) in marqueeItems" :key="'a'+i" class="marquee-item">
            <i class="fas fa-circle"></i> {{ m }}
          </span>
          <span v-for="(m, i) in marqueeItems" :key="'b'+i" class="marquee-item">
            <i class="fas fa-circle"></i> {{ m }}
          </span>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <div class="stats-bar">
      <div class="stats-inner">
        <div v-for="(s, i) in statsBar" :key="i" class="stat-item anim-target" :data-delay="i">
          <div class="stat-value">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- Berita Terkini -->
    <section id="berita-terkini" class="section berita-section">
      <div class="container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-label">Informasi Terbaru</div>
            <h2 class="section-title">Berita Terkini</h2>
          </div>
          <router-link to="/artikel" class="section-link">
            Lihat Semua <i class="fas fa-arrow-right" style="font-size:0.7rem"></i>
          </router-link>
        </div>

        <div class="berita-grid">
          <div class="berita-featured anim-target" data-delay="1"
            @click="showToast('Membuka berita: ' + beritaTerkini[0].title)">
            <img :src="`/src/assets/images/galeri1.jpg`"
              @error="fallbackImg($event, 'smd-bt1')" alt="Berita Utama">
            <div class="berita-featured-overlay">
              <div class="berita-tag"><i class="fas fa-bolt"></i> Utama</div>
              <h3>{{ beritaTerkini[0].title }}</h3>
              <div class="berita-meta">
                <span><i class="far fa-calendar"></i> {{ beritaTerkini[0].date }}</span>
                <span><i class="far fa-user"></i> {{ beritaTerkini[0].author }}</span>
              </div>
            </div>
          </div>

          <div v-for="(b, i) in beritaTerkini.slice(1)" :key="b.id"
            class="berita-side anim-target" :data-delay="i + 2"
            @click="showToast('Membuka berita: ' + b.title)">
            <div class="berita-side-img">
              <img :src="`/src/assets/images/galeri${i + 2}.jpg`"
                @error="fallbackImg($event, `smd-bt${i + 2}`)" :alt="b.title">
            </div>
            <div class="berita-side-body">
              <div class="berita-tag tag-sm">{{ b.tag }}</div>
              <h4>{{ b.title }}</h4>
              <div class="berita-meta meta-sm">
                <span><i class="far fa-calendar"></i> {{ b.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Galeri Kegiatan -->
    <section class="section galeri-section">
      <div class="container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-label">Dokumentasi</div>
            <h2 class="section-title">Galeri Kegiatan</h2>
          </div>
          <router-link to="/galeri" class="section-link">
            Lihat Semua <i class="fas fa-arrow-right" style="font-size:0.7rem"></i>
          </router-link>
        </div>

        <div class="galeri-grid">
          <div v-for="(g, i) in galeriItems" :key="i"
            class="galeri-card anim-target"
            :data-delay="i + 1"
            :class="{ 'galeri-card--wide': i === 0 }"
            @click="showToast('Membuka galeri: ' + g.label)">
            <img :src="g.src" @error="fallbackImg($event, g.fallback)" :alt="g.label">
            <div class="galeri-card-overlay">
              <i class="fas fa-images"></i>
              <span>{{ g.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Artikel Pilihan -->
    <section id="artikel" class="section artikel-section">
      <div class="container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-label">Kabar & Opini</div>
            <h2 class="section-title">Artikel Pilihan</h2>
          </div>
          <router-link to="/artikel" class="section-link">
            Semua Artikel <i class="fas fa-arrow-right" style="font-size:0.7rem"></i>
          </router-link>
        </div>

        <div class="artikel-tabs anim-target" data-delay="1">
          <button v-for="tab in artikelTabs" :key="tab"
            class="artikel-tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab">
            {{ tab }}
          </button>
        </div>

        <div class="artikel-grid">
          <div v-for="(a, i) in filteredArtikel" :key="a.title"
            class="artikel-card anim-target"
            :data-delay="(i % 3) + 1"
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
      </div>
    </section>

    <!-- Berita Daerah -->
    <section id="daerah" class="section daerah-section">
      <div class="container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-label section-label--light">Dari Daerah</div>
            <h2 class="section-title section-title--light">Berita Daerah</h2>
          </div>
          <router-link to="/berita-daerah" class="section-link section-link--gold">
            Selengkapnya <i class="fas fa-arrow-right" style="font-size:0.7rem"></i>
          </router-link>
        </div>

        <div class="daerah-grid">
          <div v-for="(d, i) in beritaDaerah" :key="i"
            class="daerah-card anim-target"
            :data-delay="(i % 4) + 1"
            @click="showToast('Membuka: ' + d.title)">
            <img :src="d.img" @error="fallbackImg($event, d.fallback)" :alt="d.title">
            <div class="daerah-card-overlay">
              <div class="daerah-loc"><i class="fas fa-map-marker-alt"></i> {{ d.location }}</div>
              <h4>{{ d.title }}</h4>
              <span class="daerah-date">{{ d.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Berita Lainnya -->
    <section id="lainnya" class="section lainnya-section">
      <div class="container container--narrow">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-label">Terkini Lainnya</div>
            <h2 class="section-title">Artikel & Berita Lainnya</h2>
          </div>
          <router-link to="/artikel" class="section-link">
            Arsip Berita <i class="fas fa-arrow-right" style="font-size:0.7rem"></i>
          </router-link>
        </div>

        <div class="lainnya-list">
          <div v-for="(l, i) in beritaLainnya" :key="i"
            class="lainnya-item anim-target"
            :data-delay="(i % 5) + 1"
            @click="showToast('Membuka: ' + l.title)">
            <div class="lainnya-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="lainnya-img">
              <img :src="l.img" @error="fallbackImg($event, l.fallback)" :alt="l.title">
            </div>
            <div class="lainnya-info">
              <h4>{{ l.title }}</h4>
              <div class="lainnya-meta">
                <span><i class="far fa-calendar"></i> {{ l.date }}</span>
                <span><i class="far fa-folder"></i> {{ l.category }}</span>
              </div>
            </div>
            <div class="lainnya-arrow"><i class="fas fa-arrow-right"></i></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Menu Index -->
    <section class="section index-section">
      <div class="container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-label">Navigasi Cepat</div>
            <h2 class="section-title">Menu Induk</h2>
          </div>
        </div>
        <div class="index-grid">
          <router-link v-for="(m, i) in menuIndex" :key="i"
            :to="m.to"
            class="index-card anim-target"
            :data-delay="(i % 6) + 1">
            <div class="index-icon" :style="{ background: m.bg, color: m.color }">
              <i :class="m.icon"></i>
            </div>
            <span class="index-label">{{ m.label }}</span>
            <span class="index-arrow"><i class="fas fa-arrow-right"></i></span>
          </router-link>
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

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 6,
  dur: 4 + Math.random() * 5
}))

const heroStats = [
  { value: '843.468', label: 'Jumlah Penduduk', icon: 'fas fa-users', bg: 'rgba(78,184,114,0.15)', color: '#4CB872' },
  { value: '727 km²', label: 'Luas Wilayah', icon: 'fas fa-map', bg: 'rgba(212,168,67,0.15)', color: '#D4A843' },
  { value: '10 Kec.', label: 'Kecamatan', icon: 'fas fa-building', bg: 'rgba(125,212,160,0.15)', color: '#7DD4A0' },
  { value: '46 Kel.', label: 'Kelurahan', icon: 'fas fa-home', bg: 'rgba(226,195,107,0.15)', color: '#E2C36B' }
]

const marqueeItems = [
  'Forum RPJMD 2025-2045 Resmi Dibuka',
  'Bapperida Raih Penghargaan Inovasi Daerah',
  'Musrenbang Kelurahan Tahap II Dimulai',
  'Rakor Percepatan Pengentasan Kemiskinan',
  'Peluncuran Dashboard Data Terbuka Samarinda'
]

const statsBar = [
  { value: '2.847', label: 'Berita Dipublikasi' },
  { value: '156', label: 'Program Pembangunan' },
  { value: '312', label: 'Pengaduan Ditangani' },
  { value: '89%', label: 'Kepuasan Masyarakat' }
]

const beritaTerkini = [
  {
    id: 1,
    title: 'Semarak Lomba 17an Bapperida Kota Samarinda Meriahkan HUT ke-80 RI',
    date: '08 Agustus 2025',
    author: 'ARIADHY, S.Kom',
    tag: 'Kegiatan'
  },
  {
    id: 2,
    title: 'Peringatan Hari Ibu Nasional 2024: Perempuan Menginspirasi Menuju Indonesia Emas 2045',
    date: '23 Desember 2024',
    author: 'ARIADHY, S.Kom',
    tag: 'Peringatan'
  },
  {
    id: 3,
    title: 'Rakor TKPK Samarinda: Komitmen Bersama Menghapus Kemiskinan Ekstrem',
    date: '18 November 2024',
    author: 'ARIADHY, S.Kom',
    tag: 'Rapat'
  }
]

const galeriItems = [
  { src: '/src/assets/images/galeri1.jpg', fallback: 'smd-g1', label: 'Rapat Koordinasi Bapperida' },
  { src: '/src/assets/images/galeri2.jpg', fallback: 'smd-g2', label: 'Kunjungan Lapangan' },
  { src: '/src/assets/images/galeri3.jpg', fallback: 'smd-g3', label: 'Pelatihan Inovasi Daerah' },
  { src: '/src/assets/images/galeri4.jpg', fallback: 'smd-g4', label: 'Forum RPJMD 2025' }
]

const artikelTabs = ['Semua', 'Pembangunan', 'Lingkungan', 'Pendidikan']

const allArtikel = [
  {
    title: 'Transformasi Samarinda Menuju Kota Pintar Berkelanjutan',
    excerpt: 'Teknologi dan kebijakan hijau mengubah wajah kota tepian menjadi kota masa depan yang layak huni.',
    img: 'https://picsum.photos/seed/smd-a1/600/400.jpg', fallback: 'smd-a1',
    category: 'Pembangunan', author: 'Ahmad Fauzi', initial: 'AF', date: '22 Jun 2025'
  },
  {
    title: 'Konservasi Mangrove Sungai Mahakam: Harapan Baru Lingkungan Kota',
    excerpt: 'Ekosistem mangrove di tepian Mahakam menjadi penyangga kehidupan warga pesisir.',
    img: 'https://picsum.photos/seed/smd-a2/600/400.jpg', fallback: 'smd-a2',
    category: 'Lingkungan', author: 'Siti Nurhaliza', initial: 'SN', date: '20 Jun 2025'
  },
  {
    title: 'Revitalisasi Sekolah Dasar: Dari Rusak Menjadi Berstandar Nasional',
    excerpt: 'Program renovasi massal sekolah dasar menunjukkan hasil nyata peningkatan mutu pendidikan.',
    img: 'https://picsum.photos/seed/smd-a3/600/400.jpg', fallback: 'smd-a3',
    category: 'Pendidikan', author: 'Budi Santoso', initial: 'BS', date: '18 Jun 2025'
  },
  {
    title: 'Pembangunan Jalan Lingkar Utara Samarinda Capai 70 Persen',
    excerpt: 'Proyek strategis penghubung kecamatan utara ditargetkan selesai akhir 2025.',
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
    excerpt: 'Kerjasama dengan Kemendikbud memperluas akses digital bagi pelajar Samarinda.',
    img: 'https://picsum.photos/seed/smd-a6/600/400.jpg', fallback: 'smd-a6',
    category: 'Pendidikan', author: 'Dra. Lina', initial: 'DL', date: '10 Jun 2025'
  }
]

const activeTab = ref('Semua')
const filteredArtikel = computed(() => {
  if (activeTab.value === 'Semua') return allArtikel
  return allArtikel.filter(a => a.category === activeTab.value)
})

const beritaDaerah = [
  {
    title: 'Kecamatan Samarinda Ilir Gelar Festival Budaya Melayu',
    img: 'https://picsum.photos/seed/smd-d1/500/600.jpg', fallback: 'smd-d1',
    location: 'Samarinda Ilir', date: '21 Jun 2025'
  },
  {
    title: 'Sungai Kunjang Bangun Taman Baca Masyarakat',
    img: 'https://picsum.photos/seed/smd-d2/500/600.jpg', fallback: 'smd-d2',
    location: 'Sungai Kunjang', date: '19 Jun 2025'
  },
  {
    title: 'Loa Janan Latih UMKM Masuk Marketplace Digital',
    img: 'https://picsum.photos/seed/smd-d3/500/600.jpg', fallback: 'smd-d3',
    location: 'Loa Janan', date: '17 Jun 2025'
  },
  {
    title: 'Palaran Sukses Gelar Posyandu Keliling Digital',
    img: 'https://picsum.photos/seed/smd-d4/500/600.jpg', fallback: 'smd-d4',
    location: 'Palaran', date: '15 Jun 2025'
  }
]

const beritaLainnya = [
  {
    title: 'Kota Samarinda Teken MoU dengan IKN untuk Kawasan Penyangga',
    img: 'https://picsum.photos/seed/smd-l1/200/150.jpg', fallback: 'smd-l1',
    date: '24 Jun 2025', category: 'Kerjasama'
  },
  {
    title: 'Anggaran Pendidikan 2025 Naik 15 Persen dari Tahun Sebelumnya',
    img: 'https://picsum.photos/seed/smd-l2/200/150.jpg', fallback: 'smd-l2',
    date: '23 Jun 2025', category: 'APBD'
  },
  {
    title: 'Peluncuran Aplikasi Sampah Digital untuk Warga Samarinda',
    img: 'https://picsum.photos/seed/smd-l3/200/150.jpg', fallback: 'smd-l3',
    date: '22 Jun 2025', category: 'Teknologi'
  },
  {
    title: 'Turnamen Sepakbola Antar Kelurahan Piala Wali Kota Dibuka',
    img: 'https://picsum.photos/seed/smd-l4/200/150.jpg', fallback: 'smd-l4',
    date: '21 Jun 2025', category: 'Olahraga'
  },
  {
    title: 'Workshop Penulisan Kebijakan Publik untuk ASN Pemkot',
    img: 'https://picsum.photos/seed/smd-l5/200/150.jpg', fallback: 'smd-l5',
    date: '20 Jun 2025', category: 'Kepegawaian'
  }
]

const menuIndex = [
  { label: 'Artikel', to: '/artikel', icon: 'fas fa-file-alt', bg: 'rgba(27,94,48,0.1)', color: '#1B5E30' },
  { label: 'Berita Daerah', to: '/berita-daerah', icon: 'fas fa-map-marked-alt', bg: 'rgba(212,168,67,0.12)', color: '#D4A843' },
  { label: 'Berita Nasional', to: '/berita-nasional', icon: 'fas fa-flag', bg: 'rgba(35,122,62,0.1)', color: '#237A3E' },
  { label: 'Siaran Pers', to: '/siaran-pers', icon: 'fas fa-bullhorn', bg: 'rgba(78,184,114,0.12)', color: '#4CB872' },
  { label: 'Jurnal', to: '/jurnal', icon: 'fas fa-book-open', bg: 'rgba(226,195,107,0.15)', color: '#B8860B' },
  { label: 'Penelitian & Pengembangan', to: '/penelitian', icon: 'fas fa-flask', bg: 'rgba(125,212,160,0.15)', color: '#1B5E30' }
]

/* ========== INTERAKSI ========== */

const toastMsg = ref('')
let toastTimer = null

function showToast(msg) {
  toastMsg.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 2500)
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
.container--narrow { max-width: 900px; }

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

/* ========== HERO ========== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--g900);
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
}
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10,46,26,0.95) 0%,
    rgba(10,46,26,0.65) 45%,
    rgba(10,46,26,0.3) 100%
  );
}

.hero-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
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
  20% { opacity: 0.4; }
  50% { transform: translateY(-16px); opacity: 0.3; }
  80% { opacity: 0.15; }
}

.hero-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 100px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
}

.hero-badge {
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
  margin-bottom: 24px;
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

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 4.5vw, 3.6rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.12;
  margin-bottom: 12px;
  animation: fadeUp 0.7s 0.1s ease forwards;
  opacity: 0;
}
.hero-title span {
  background: linear-gradient(135deg, var(--gold-pale), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero-subtitle {
  font-size: 1.05rem;
  color: var(--g200);
  font-weight: 400;
  margin-bottom: 28px;
  animation: fadeUp 0.7s 0.2s ease forwards;
  opacity: 0;
}

.hero-quote {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  padding: 22px 28px;
  margin-bottom: 32px;
  backdrop-filter: blur(10px);
  animation: fadeUp 0.7s 0.3s ease forwards;
  opacity: 0;
}
.hero-quote p {
  font-style: italic;
  font-size: 1rem;
  color: var(--g200);
  line-height: 1.6;
  margin-bottom: 6px;
}
.hero-quote span {
  font-size: 0.78rem;
  color: var(--g400);
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  animation: fadeUp 0.7s 0.4s ease forwards;
  opacity: 0;
}
.btn-gold {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 12px;
  text-decoration: none;
  background: linear-gradient(135deg, var(--gold-light), var(--gold));
  color: var(--g900);
  font-size: 0.88rem;
  font-weight: 700;
  box-shadow: 0 4px 20px rgba(212,168,67,0.35);
  transition: all 0.3s ease;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(212,168,67,0.5);
}
.btn-glass {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  border: 1.5px solid rgba(255,255,255,0.18);
  color: #fff;
  font-size: 0.88rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.btn-glass:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.35);
  transform: translateY(-2px);
}

/* Hero kanan */
.hero-right {
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: slideL 0.9s 0.45s ease forwards;
  opacity: 0;
}
@keyframes slideL {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

.hero-stat {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  border-radius: var(--radius);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(14px);
  transition: all 0.35s ease;
  cursor: default;
}
.hero-stat:hover {
  background: rgba(255,255,255,0.09);
  transform: translateX(-5px);
}
.hero-stat-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  flex-shrink: 0;
}
.hero-stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.hero-stat-label {
  font-size: 0.76rem;
  color: var(--g200);
}

.kepala-dinas-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 22px;
  border-radius: var(--radius);
  background: linear-gradient(135deg, rgba(212,168,67,0.12), rgba(212,168,67,0.04));
  border: 1px solid rgba(212,168,67,0.2);
  backdrop-filter: blur(14px);
  transition: all 0.35s ease;
}
.kepala-dinas-card:hover {
  background: linear-gradient(135deg, rgba(212,168,67,0.18), rgba(212,168,67,0.06));
}
.kd-avatar {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--gold-light), var(--gold));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--g900);
  font-size: 1.1rem;
  flex-shrink: 0;
}
.kd-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.kd-role {
  font-size: 0.7rem;
  color: var(--g300);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.kd-name {
  font-size: 0.92rem;
  color: #fff;
  font-weight: 700;
}
.kd-link {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gold-light);
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
}
.kd-link:hover {
  background: var(--gold);
  color: var(--g900);
  border-color: var(--gold);
}

/* Marquee */
.hero-marquee {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  padding: 14px 0;
  background: rgba(10,46,26,0.55);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255,255,255,0.05);
  overflow: hidden;
}
.marquee-track {
  display: flex;
  gap: 44px;
  animation: marquee 28s linear infinite;
  width: max-content;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--g200);
  font-size: 0.78rem;
  white-space: nowrap;
  font-weight: 500;
}
.marquee-item i {
  color: var(--gold);
  font-size: 0.55rem;
}

/* ========== STATS BAR ========== */
.stats-bar {
  background: #fff;
  border-bottom: 1px solid var(--gray-100);
  padding: 36px 24px;
}
.stats-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}
.stat-item {
  text-align: center;
  position: relative;
}
.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -14px;
  top: 12%;
  height: 76%;
  width: 1px;
  background: var(--gray-100);
}
.stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--g700);
  line-height: 1.1;
  margin-bottom: 4px;
}
.stat-label {
  font-size: 0.76rem;
  color: var(--gray-500);
  font-weight: 500;
}

/* ========== SECTION COMMON ========== */
.section {
  padding: 72px 0;
}
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
.section-label--light { color: var(--g300); }
.section-label--light::before { background: var(--g400); }
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  font-weight: 700;
  color: var(--g900);
  line-height: 1.2;
}
.section-title--light { color: #fff; }
.section-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--g600);
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 18px;
  border-radius: 99px;
  border: 1.5px solid var(--g200);
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.section-link:hover {
  background: var(--g700);
  color: #fff;
  border-color: var(--g700);
  transform: translateY(-1px);
}
.section-link--gold {
  color: var(--g200);
  border-color: rgba(255,255,255,0.15);
}
.section-link--gold:hover {
  background: var(--gold);
  color: var(--g900);
  border-color: var(--gold);
}

/* ========== BERITA TERKINI ========== */
.berita-section { background: var(--gray-50); }
.berita-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-template-rows: auto auto;
  gap: 18px;
}
.berita-featured {
  grid-row: 1 / 3;
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  min-height: 460px;
  background: var(--gray-200);
}
.berita-featured img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.berita-featured:hover img { transform: scale(1.04); }
.berita-featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,46,26,0.95) 0%, rgba(10,46,26,0.25) 55%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
}
.berita-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: var(--gold);
  color: var(--g900);
  border-radius: 6px;
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: fit-content;
  margin-bottom: 12px;
}
.tag-sm {
  font-size: 0.6rem;
  padding: 3px 9px;
  background: var(--g100);
  color: var(--g700);
}
.berita-featured-overlay h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 10px;
}
.berita-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.74rem;
  color: var(--g200);
}
.berita-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}
.meta-sm { color: var(--gray-500); }

.berita-side {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  background: #fff;
  border: 1px solid var(--gray-100);
  transition: all 0.35s ease;
  height: 100%;
  min-height: 221px;
}
.berita-side:hover {
  box-shadow: 0 8px 30px rgba(10,46,26,0.1);
  transform: translateY(-3px);
  border-color: transparent;
}
.berita-side-img {
  width: 170px;
  flex-shrink: 0;
  overflow: hidden;
}
.berita-side-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.berita-side:hover .berita-side-img img { transform: scale(1.06); }
.berita-side-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.berita-side-body .berita-tag { margin-bottom: 8px; }
.berita-side-body h4 {
  font-family: 'Playfair Display', serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--g900);
  line-height: 1.35;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ========== GALERI ========== */
.galeri-section { background: #fff; }
.galeri-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 220px 220px;
  gap: 16px;
}
.galeri-card--wide { grid-column: 1 / 3; }
.galeri-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}
.galeri-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.galeri-card:hover img { transform: scale(1.06); }
.galeri-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,46,26,0.85) 0%, transparent 60%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.galeri-card:hover .galeri-card-overlay { opacity: 1; }
.galeri-card-overlay i {
  color: var(--gold-light);
  font-size: 1.2rem;
  margin-bottom: 6px;
}
.galeri-card-overlay span {
  color: #fff;
  font-size: 0.88rem;
  font-weight: 600;
}

/* ========== ARTIKEL ========== */
.artikel-section { background: var(--gray-50); }
.artikel-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 28px;
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
}

/* ========== BERITA DAERAH ========== */
.daerah-section {
  background: linear-gradient(170deg, var(--g900) 0%, var(--g800) 100%);
  position: relative;
  overflow: hidden;
}
.daerah-section::before {
  content: '';
  position: absolute;
  top: -180px;
  right: -180px;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(78,184,114,0.12) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.daerah-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  position: relative;
  z-index: 1;
}
.daerah-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 310px;
  background: var(--gray-800);
}
.daerah-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.daerah-card:hover img { transform: scale(1.07); }
.daerah-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,46,26,0.95) 0%, rgba(10,46,26,0.15) 65%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  transition: background 0.3s ease;
}
.daerah-card:hover .daerah-card-overlay {
  background: linear-gradient(to top, rgba(10,46,26,0.98) 0%, rgba(10,46,26,0.4) 75%, rgba(10,46,26,0.08) 100%);
}
.daerah-loc {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.68rem;
  color: var(--gold);
  font-weight: 600;
  margin-bottom: 8px;
}
.daerah-card-overlay h4 {
  font-family: 'Playfair Display', serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.daerah-date {
  font-size: 0.68rem;
  color: var(--g300);
  margin-top: 8px;
}

/* ========== BERITA LAINNYA ========== */
.lainnya-section { background: #fff; }
.lainnya-list { display: flex; flex-direction: column; }
.lainnya-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--gray-100);
  cursor: pointer;
  transition: all 0.3s ease;
}
.lainnya-item:last-child { border-bottom: none; }
.lainnya-item:hover { padding-left: 10px; }
.lainnya-num {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--g100);
  width: 44px;
  flex-shrink: 0;
  text-align: center;
  line-height: 1;
  transition: color 0.3s ease;
}
.lainnya-item:hover .lainnya-num { color: var(--g500); }
.lainnya-img {
  width: 96px;
  height: 68px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}
.lainnya-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.lainnya-item:hover .lainnya-img img { transform: scale(1.08); }
.lainnya-info { flex: 1; min-width: 0; }
.lainnya-info h4 {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--g900);
  line-height: 1.4;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}
.lainnya-item:hover .lainnya-info h4 { color: var(--g600); }
.lainnya-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.7rem;
  color: var(--gray-400);
}
.lainnya-arrow {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--g50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--g500);
  font-size: 0.75rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-8px);
}
.lainnya-item:hover .lainnya-arrow {
  opacity: 1;
  transform: translateX(0);
  background: var(--g700);
  color: #fff;
}

/* ========== MENU INDEX ========== */
.index-section { background: var(--gray-50); }
.index-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.index-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 22px;
  border-radius: 12px;
  background: #fff;
  text-decoration: none;
  color: var(--gray-800);
  border: 1px solid var(--gray-100);
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
}
.index-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(10,46,26,0.1);
  border-color: transparent;
}
.index-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}
.index-card:hover .index-icon { transform: scale(1.1); }
.index-label {
  flex: 1;
  font-size: 0.88rem;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.index-arrow {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--g50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--g500);
  font-size: 0.7rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-6px);
}
.index-card:hover .index-arrow {
  opacity: 1;
  transform: translateX(0);
  background: var(--g700);
  color: #fff;
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
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .hero-right {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .hero-stat { flex: 1; min-width: 180px; }
  .kepala-dinas-card { flex: 1; min-width: 100%; }
  .berita-grid { grid-template-columns: 1fr; }
  .berita-featured { min-height: 340px; grid-row: auto; }
  .artikel-grid { grid-template-columns: repeat(2, 1fr); }
  .daerah-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-inner {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .stat-item:not(:last-child)::after { display: none; }
}

@media (max-width: 768px) {
  .section { padding: 52px 0; }
  .container { padding: 0 16px; }
  .hero-inner { padding: 100px 16px 90px; }
  .hero-stat { min-width: 100%; }
  .artikel-grid { grid-template-columns: 1fr; }
  .daerah-grid { grid-template-columns: 1fr; }
  .daerah-card { height: 260px; }
  .galeri-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .galeri-card--wide { grid-column: auto; }
  .index-grid { grid-template-columns: 1fr; }
  .berita-side {
    flex-direction: column;
    min-height: auto;
  }
  .berita-side-img { width: 100%; height: 150px; }
  .lainnya-img { width: 76px; height: 56px; }
  .lainnya-num { font-size: 1.3rem; width: 32px; }
  .stats-inner { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .hero-actions { flex-direction: column; }
  .btn-gold, .btn-glass {
    width: 100%;
    justify-content: center;
  }
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .marquee-track { animation: none; }
  .particle { animation: none; opacity: 0.2; }
}
</style>