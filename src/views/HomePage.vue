<template>
  <main class="home-page">
    <!-- ===== HERO SLIDER ===== -->
    <section class="hero-slider" @mouseenter="pauseSlider" @mouseleave="resumeSlider">
      <div class="slider-track">
        <transition-group name="hero-fade">
          <div
            v-for="(slide, i) in slides"
            :key="slide.id"
            v-show="currentSlide === i"
            class="hero-slide"
          >
            <img :src="slide.image" :alt="slide.title" />
            <div class="hero-overlay"></div>
            <div class="hero-content">
              <span class="hero-badge">{{ slide.badge }}</span>
              <h1 class="hero-title">{{ slide.title }}</h1>
              <p class="hero-desc">{{ slide.desc }}</p>
              <a href="#" class="hero-btn">
                Selengkapnya
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Arrows -->
      <button class="slider-arrow slider-prev" @click="prevSlide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="slider-arrow slider-next" @click="nextSlide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <!-- Dots -->
      <div class="slider-dots">
        <button
          v-for="(slide, i) in slides"
          :key="slide.id"
          class="slider-dot"
          :class="{ active: currentSlide === i }"
          @click="goToSlide(i)"
        >
          <span class="dot-progress" :style="{ width: currentSlide === i ? progress + '%' : '0%' }"></span>
        </button>
      </div>

      <!-- Slide Counter -->
      <div class="slide-counter">
        <span class="counter-current">{{ String(currentSlide + 1).padStart(2, '0') }}</span>
        <span class="counter-sep">/</span>
        <span class="counter-total">{{ String(slides.length).padStart(2, '0') }}</span>
      </div>
    </section>

    <!-- ===== WELCOME SECTION ===== -->
    <section class="welcome-section" ref="welcomeRef">
      <div class="welcome-inner">
        <div class="welcome-icon" :class="{ animate: welcomeVisible }">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4A843" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <h2 class="welcome-title" :class="{ animate: welcomeVisible }">Selamat Datang di Website Resmi</h2>
        <p class="welcome-subtitle" :class="{ animate: welcomeVisible }">
          Badan Perencanaan Pembangunan Kota Samarinda
        </p>
        <p class="welcome-desc" :class="{ animate: welcomeVisible }">
          Website ini merupakan media informasi dan komunikasi resmi Badan Perencanaan Pembangunan Kota Samarinda
          dalam menyampaikan informasi terkait perencanaan pembangunan daerah, kegiatan, dan layanan publik
          kepada masyarakat Kota Samarinda.
        </p>
      </div>
    </section>

    <!-- ===== STATS BAR ===== -->
    <section class="stats-bar" ref="statsRef">
      <div class="stats-inner">
        <div class="stat-item" v-for="stat in stats" :key="stat.label" :class="{ animate: statsVisible }">
          <div class="stat-number">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- ===== MAIN CONTENT: BERITA + SIDEBAR ===== -->
    <section class="content-section" ref="contentRef">
      <div class="content-inner">
        <!-- Left: Berita Terkini -->
        <div class="content-main">
          <div class="section-header" :class="{ animate: contentVisible }">
            <div class="section-header-left">
              <span class="section-badge">Informasi</span>
              <h2 class="section-title">Berita Terkini</h2>
            </div>
            <a href="#" class="section-link">
              Lihat Semua
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>

          <!-- Featured News -->
          <div class="news-featured" :class="{ animate: contentVisible }">
            <div class="news-featured-img">
              <img :src="news[0].image" :alt="news[0].title" />
              <span class="news-category">{{ news[0].category }}</span>
            </div>
            <div class="news-featured-body">
              <span class="news-date">{{ news[0].date }}</span>
              <h3 class="news-featured-title">
                <a href="#">{{ news[0].title }}</a>
              </h3>
              <p class="news-featured-excerpt">{{ news[0].excerpt }}</p>
              <a href="#" class="news-read-more">
                Baca Selengkapnya
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>

          <!-- News Grid -->
          <div class="news-grid">
            <article
              v-for="(item, i) in news.slice(1)"
              :key="item.title"
              class="news-card"
              :class="{ animate: contentVisible }"
              :style="{ transitionDelay: (i * 100) + 'ms' }"
            >
              <div class="news-card-img">
                <img :src="item.image" :alt="item.title" />
                <span class="news-category">{{ item.category }}</span>
              </div>
              <div class="news-card-body">
                <span class="news-date">{{ item.date }}</span>
                <h3 class="news-card-title"><a href="#">{{ item.title }}</a></h3>
                <p class="news-card-excerpt">{{ item.excerpt }}</p>
              </div>
            </article>
          </div>

          <!-- ===== GALERI KEGIATAN ===== -->
          <div class="section-header" style="margin-top: 56px;" :class="{ animate: contentVisible }">
            <div class="section-header-left">
              <span class="section-badge">Dokumentasi</span>
              <h2 class="section-title">Galeri Kegiatan</h2>
            </div>
            <a href="#" class="section-link">
              Lihat Semua
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>

          <div class="gallery-grid">
            <div
              v-for="(img, i) in gallery"
              :key="i"
              class="gallery-item"
              :class="{ 'gallery-large': i === 0, animate: contentVisible }"
              :style="{ transitionDelay: (i * 80) + 'ms' }"
            >
              <img :src="img.src" :alt="img.caption" />
              <div class="gallery-overlay">
                <div class="gallery-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                </div>
                <span class="gallery-caption">{{ img.caption }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Sidebar -->
        <aside class="content-sidebar">
          <!-- QR Code -->
          <div class="sidebar-card" :class="{ animate: contentVisible }">
            <div class="sidebar-card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><line x1="21" y1="14" x2="21" y2="14.01"/><line x1="21" y1="21" x2="21" y2="21.01"/></svg>
              <span>Scan QR Code</span>
            </div>
            <div class="qr-code-area">
              <div class="qr-placeholder">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(11,29,51,0.25)" stroke-width="1"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="4" height="4"/><rect x="18" y="18" width="4" height="4"/><rect x="14" y="18" width="4" height="4"/><rect x="18" y="14" width="4" height="4"/></svg>
              </div>
              <p class="qr-text">Scan untuk akses cepat website kami</p>
            </div>
          </div>

          <!-- Pejabat / Official Info -->
          <div class="sidebar-card" :class="{ animate: contentVisible }" style="transition-delay: 100ms;">
            <div class="sidebar-card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Pejabat Bappeda</span>
            </div>
            <div class="official-card">
              <div class="official-photo">
                <img src="https://picsum.photos/seed/pejabat-bappeda/200/250.jpg" alt="Kepala Bappeda" />
              </div>
              <div class="official-info">
                <span class="official-position">Kepala Bappeda</span>
                <h4 class="official-name">Dr. H. Muhammad Faisal, M.Si</h4>
                <p class="official-nip">NIP. 196805151993031005</p>
              </div>
            </div>
          </div>

          <!-- Pengumuman -->
          <div class="sidebar-card" :class="{ animate: contentVisible }" style="transition-delay: 200ms;">
            <div class="sidebar-card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              <span>Pengumuman</span>
            </div>
            <ul class="announcement-list">
              <li v-for="ann in announcements" :key="ann.title">
                <a href="#">
                  <span class="ann-dot"></span>
                  <span class="ann-text">{{ ann.title }}</span>
                  <span class="ann-date">{{ ann.date }}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Link Terkait -->
          <div class="sidebar-card" :class="{ animate: contentVisible }" style="transition-delay: 300ms;">
            <div class="sidebar-card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              <span>Link Terkait</span>
            </div>
            <div class="related-links">
              <a href="#" v-for="link in relatedLinks" :key="link.name" class="related-link-item">
                <div class="related-link-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
                <span>{{ link.name }}</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ===== SLIDER =====
const slides = ref([
  {
    id: 1,
    image: 'https://picsum.photos/seed/samarinda-hero1/1400/600.jpg',
    badge: 'Perencanaan Pembangunan',
    title: 'Mewujudkan Samarinda Kota Pusat Ekonomi yang Berkelanjutan',
    desc: 'Melalui perencanaan pembangunan yang terintegrasi dan berbasis data untuk kesejahteraan masyarakat.'
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/samarinda-hero2/1400/600.jpg',
    badge: 'Musrenbang 2025',
    title: 'Musrenbang Kota Samarinda Tahun 2025',
    desc: 'Forum musyawarah perencanaan pembangunan daerah sebagai wujud partisipasi masyarakat.'
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/samarinda-hero3/1400/600.jpg',
    badge: 'RPJMD 2021-2026',
    title: 'Rencana Pembangunan Jangka Menengah Daerah',
    desc: 'Dokumen perencanaan pembangunan daerah untuk periode lima tahunan Kota Samarinda.'
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/samarinda-hero4/1400/600.jpg',
    badge: 'Smart City',
    title: 'Samarinda Menuju Kota Cerdas',
    desc: 'Transformasi digital dalam pelayanan publik dan perencanaan pembangunan berbasis teknologi.'
  }
])

const currentSlide = ref(0)
const progress = ref(0)
let sliderInterval = null
let progressInterval = null
const SLIDE_DURATION = 6000

const startSlider = () => {
  progress.value = 0
  progressInterval = setInterval(() => {
    progress.value += (100 / (SLIDE_DURATION / 30))
    if (progress.value > 100) progress.value = 100
  }, 30)
  sliderInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
    progress.value = 0
  }, SLIDE_DURATION)
}

const pauseSlider = () => {
  clearInterval(sliderInterval)
  clearInterval(progressInterval)
}

const resumeSlider = () => {
  startSlider()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
  progress.value = 0
  pauseSlider()
  resumeSlider()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
  progress.value = 0
  pauseSlider()
  resumeSlider()
}

const goToSlide = (i) => {
  currentSlide.value = i
  progress.value = 0
  pauseSlider()
  resumeSlider()
}

// ===== SCROLL ANIMATIONS =====
const welcomeRef = ref(null)
const statsRef = ref(null)
const contentRef = ref(null)
const welcomeVisible = ref(false)
const statsVisible = ref(false)
const contentVisible = ref(false)

let observer = null

const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target === welcomeRef.value) welcomeVisible.value = true
        if (entry.target === statsRef.value) statsVisible.value = true
        if (entry.target === contentRef.value) contentVisible.value = true
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })

  if (welcomeRef.value) observer.observe(welcomeRef.value)
  if (statsRef.value) observer.observe(statsRef.value)
  if (contentRef.value) observer.observe(contentRef.value)
}

// ===== DATA =====
const stats = ref([
  { value: '47', label: 'Kecamatan & Kelurahan' },
  { value: '1.200+', label: 'Program Pembangunan' },
  { value: '850+', label: 'Kegiatan Tahun 2024' },
  { value: '3,8 Jt', label: 'Populasi Samarinda' }
])

const news = ref([
  {
    image: 'https://picsum.photos/seed/bappeda-news1/800/450.jpg',
    category: 'Rapat',
    date: '15 Desember 2024',
    title: 'Rapat Koordinasi Penyusunan RKPD Tahun Anggaran 2025',
    excerpt: 'Bappeda Kota Samarinda menggelar rapat koordinasi penyusunan Rencana Kerja Pemerintah Daerah (RKPD) tahun 2025 yang dihadiri oleh seluruh Perangkat Daerah.'
  },
  {
    image: 'https://picsum.photos/seed/bappeda-news2/600/400.jpg',
    category: 'Sosialisasi',
    date: '12 Desember 2024',
    title: 'Sosialisasi Peraturan Daerah tentang RTRW Kota Samarinda',
    excerpt: 'Kegiatan sosialisasi Perda RTRW dilaksanakan untuk membangun pemahaman bersama terkait tata ruang wilayah kota.'
  },
  {
    image: 'https://picsum.photos/seed/bappeda-news3/600/400.jpg',
    category: 'Forum',
    date: '08 Desember 2024',
    title: 'Forum Konsultasi Publik Penyusunan RPJMD Kota Samarinda',
    excerpt: 'Forum konsultasi publik ini melibatkan berbagai elemen masyarakat dalam penyusunan dokumen RPJMD.'
  },
  {
    image: 'https://picsum.photos/seed/bappeda-news4/600/400.jpg',
    category: 'Penghargaan',
    date: '05 Desember 2024',
    title: 'Bappeda Samarinda Raih Penghargaan Penyelenggaraan Musrenbang Terbaik',
    excerpt: 'Penghargaan diberikan oleh Kementerian Dalam Negeri atas keberhasilan penyelenggaraan Musrenbang tahun 2024.'
  }
])

const gallery = ref([
  { src: 'https://picsum.photos/seed/galeri-bappeda1/800/500.jpg', caption: 'Musrenbang Kota 2024' },
  { src: 'https://picsum.photos/seed/galeri-bappeda2/400/300.jpg', caption: 'Rapat Koordinasi OPD' },
  { src: 'https://picsum.photos/seed/galeri-bappeda3/400/300.jpg', caption: 'Forum Konsultasi Publik' },
  { src: 'https://picsum.photos/seed/galeri-bappeda4/400/300.jpg', caption: 'Sosialisasi Program' },
  { src: 'https://picsum.photos/seed/galeri-bappeda5/400/300.jpg', caption: 'Kunjungan Kerja' },
  { src: 'https://picsum.photos/seed/galeri-bappeda6/400/300.jpg', caption: 'Penandatanganan MoU' }
])

const announcements = ref([
  { title: 'Pengumuman Jadwal Musrenbang Kecamatan', date: '20 Des' },
  { title: 'Rekrutmen Tenaga Ahli Bappeda', date: '18 Des' },
  { title: 'Permohonan Data Pembangunan 2024', date: '15 Des' },
  { title: 'Publikasi Laporan Kinerja 2024', date: '10 Des' },
  { title: 'Survey Kepuasan Masyarakat', date: '05 Des' }
])

const relatedLinks = ref([
  { name: 'Pemerintah Kota Samarinda' },
  { name: 'BPS Kota Samarinda' },
  { name: 'Kemendagri RI' },
  { name: 'Bappenas RI' },
  { name: 'Pemerintah Provinsi Kaltim' }
])

// ===== LIFECYCLE =====
onMounted(() => {
  startSlider()
  setupObserver()
})

onUnmounted(() => {
  pauseSlider()
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* ===== HERO SLIDER ===== */
.hero-slider {
  position: relative;
  width: 100%;
  height: 560px;
  overflow: hidden;
  background: #0B1D33;
}
.slider-track {
  position: relative;
  width: 100%;
  height: 100%;
}
.hero-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
}
.hero-slide img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(11,29,51,0.95) 0%,
    rgba(11,29,51,0.6) 40%,
    rgba(11,29,51,0.2) 70%,
    rgba(11,29,51,0.3) 100%
  );
}
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px 64px;
  width: 100%;
}
.hero-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(212,168,67,0.2);
  border: 1px solid rgba(212,168,67,0.4);
  color: #D4A843;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-radius: 6px;
  margin-bottom: 16px;
  backdrop-filter: blur(8px);
}
.hero-title {
  font-size: 36px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.2;
  margin: 0 0 14px;
  max-width: 700px;
}
.hero-desc {
  font-size: 15px;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  margin: 0 0 28px;
  max-width: 550px;
}
.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: #D4A843;
  color: #0B1D33;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s;
  letter-spacing: 0.3px;
}
.hero-btn:hover {
  background: #E8BE5A;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212,168,67,0.35);
}

/* Slider Controls */
.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(11,29,51,0.4);
  backdrop-filter: blur(8px);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0;
}
.hero-slider:hover .slider-arrow {
  opacity: 1;
}
.slider-arrow:hover {
  background: rgba(212,168,67,0.8);
  border-color: #D4A843;
  color: #0B1D33;
}
.slider-prev { left: 24px; }
.slider-next { right: 24px; }

/* Dots */
.slider-dots {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 8px;
}
.slider-dot {
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.2);
  border: none;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  transition: all 0.3s;
}
.slider-dot.active {
  background: rgba(255,255,255,0.15);
  width: 56px;
}
.dot-progress {
  display: block;
  height: 100%;
  background: #D4A843;
  border-radius: 2px;
  transition: width 0.1s linear;
}

/* Counter */
.slide-counter {
  position: absolute;
  bottom: 24px;
  right: 24px;
  z-index: 10;
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-variant-numeric: tabular-nums;
}
.counter-current {
  font-size: 24px;
  font-weight: 700;
  color: #D4A843;
}
.counter-sep {
  font-size: 14px;
  color: rgba(255,255,255,0.3);
  margin: 0 2px;
}
.counter-total {
  font-size: 14px;
  color: rgba(255,255,255,0.4);
}

/* Hero Transition */
.hero-fade-enter-active, .hero-fade-leave-active {
  transition: opacity 0.8s ease;
}
.hero-fade-enter-from, .hero-fade-leave-to {
  opacity: 0;
}

/* ===== WELCOME SECTION ===== */
.welcome-section {
  background: #FFFFFF;
  padding: 80px 24px;
  text-align: center;
}
.welcome-inner {
  max-width: 720px;
  margin: 0 auto;
}
.welcome-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(212,168,67,0.08);
  margin-bottom: 28px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s cubic-bezier(0.4,0,0.2,1);
}
.welcome-title {
  font-size: 30px;
  font-weight: 700;
  color: #0B1D33;
  margin: 0 0 8px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s;
}
.welcome-subtitle {
  font-size: 16px;
  font-weight: 600;
  color: #D4A843;
  margin: 0 0 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s;
}
.welcome-desc {
  font-size: 15px;
  color: #64748B;
  line-height: 1.8;
  margin: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s cubic-bezier(0.4,0,0.2,1) 0.2s;
}
.welcome-icon.animate, .welcome-title.animate, .welcome-subtitle.animate, .welcome-desc.animate {
  opacity: 1;
  transform: translateY(0);
}

/* ===== STATS BAR ===== */
.stats-bar {
  background: linear-gradient(135deg, #0B1D33 0%, #1a3a5c 100%);
  padding: 0;
  position: relative;
  overflow: hidden;
}
.stats-bar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.stats-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.stat-item {
  padding: 40px 24px;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.06);
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
}
.stat-item:last-child {
  border-right: none;
}
.stat-item.animate {
  opacity: 1;
  transform: translateY(0);
}
.stat-item:nth-child(2).animate { transition-delay: 0.1s; }
.stat-item:nth-child(3).animate { transition-delay: 0.2s; }
.stat-item:nth-child(4).animate { transition-delay: 0.3s; }
.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #D4A843;
  line-height: 1;
  margin-bottom: 8px;
}
.stat-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.stat-item:hover .stat-number {
  transform: scale(1.05);
  transition: transform 0.3s;
}

/* ===== CONTENT SECTION ===== */
.content-section {
  background: #F5F7FA;
  padding: 64px 0 80px;
}
.content-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 40px;
  align-items: start;
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
}
.section-header.animate {
  opacity: 1;
  transform: translateY(0);
}
.section-header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.section-badge {
  padding: 5px 12px;
  background: rgba(212,168,67,0.1);
  color: #D4A843;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 6px;
}
.section-title {
  font-size: 22px;
  font-weight: 700;
  color: #0B1D33;
  margin: 0;
}
.section-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #D4A843;
  text-decoration: none;
  transition: all 0.25s;
  padding: 8px 16px;
  border-radius: 8px;
}
.section-link:hover {
  background: rgba(212,168,67,0.08);
  color: #B8922E;
}

/* ===== NEWS FEATURED ===== */
.news-featured {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04);
  margin-bottom: 28px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s;
}
.news-featured.animate {
  opacity: 1;
  transform: translateY(0);
}
.news-featured-img {
  position: relative;
  min-height: 280px;
  overflow: hidden;
}
.news-featured-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.news-featured:hover .news-featured-img img {
  transform: scale(1.05);
}
.news-featured-body {
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.news-category {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 5px 12px;
  background: rgba(212,168,67,0.9);
  color: #0B1D33;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 6px;
  backdrop-filter: blur(4px);
}
.news-date {
  font-size: 12px;
  color: #94A3B8;
  font-weight: 500;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.news-date::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #D4A843;
}
.news-featured-title {
  font-size: 20px;
  font-weight: 700;
  color: #0B1D33;
  line-height: 1.35;
  margin: 0 0 14px;
}
.news-featured-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.25s;
}
.news-featured-title a:hover {
  color: #D4A843;
}
.news-featured-excerpt {
  font-size: 13.5px;
  color: #64748B;
  line-height: 1.7;
  margin: 0 0 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.news-read-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #D4A843;
  text-decoration: none;
  transition: all 0.25s;
}
.news-read-more:hover {
  gap: 10px;
  color: #B8922E;
}

/* ===== NEWS GRID ===== */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.news-card {
  background: #FFFFFF;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
  opacity: 0;
  transform: translateY(20px);
}
.news-card.animate {
  opacity: 1;
  transform: translateY(0);
}
.news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
}
.news-card-img {
  position: relative;
  height: 180px;
  overflow: hidden;
}
.news-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.news-card:hover .news-card-img img {
  transform: scale(1.08);
}
.news-card-body {
  padding: 20px;
}
.news-card-title {
  font-size: 15px;
  font-weight: 700;
  color: #0B1D33;
  line-height: 1.4;
  margin: 0 0 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.news-card-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.25s;
}
.news-card-title a:hover {
  color: #D4A843;
}
.news-card-excerpt {
  font-size: 13px;
  color: #64748B;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ===== GALLERY ===== */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 12px;
}
.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
}
.gallery-item.animate {
  opacity: 1;
  transform: translateY(0);
}
.gallery-large {
  grid-column: span 2;
  grid-row: span 2;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.gallery-item:hover img {
  transform: scale(1.08);
}
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11,29,51,0.85), rgba(11,29,51,0.1));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.35s ease;
}
.gallery-item:hover .gallery-overlay {
  opacity: 1;
}
.gallery-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(212,168,67,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.7);
  transition: transform 0.35s ease;
}
.gallery-item:hover .gallery-icon {
  transform: scale(1);
}
.gallery-caption {
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

/* ===== SIDEBAR ===== */
.content-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 96px;
}
.sidebar-card {
  background: #FFFFFF;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
}
.sidebar-card.animate {
  opacity: 1;
  transform: translateX(0);
}
.sidebar-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  border-bottom: 1px solid #F1F5F9;
  font-size: 13px;
  font-weight: 700;
  color: #0B1D33;
}
.sidebar-card-header svg {
  color: #D4A843;
  flex-shrink: 0;
}

/* QR Code */
.qr-code-area {
  padding: 24px 20px;
  text-align: center;
}
.qr-placeholder {
  width: 120px;
  height: 120px;
  margin: 0 auto 14px;
  border: 2px dashed #E2E8F0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F8FAFC;
}
.qr-text {
  font-size: 12px;
  color: #94A3B8;
  margin: 0;
}

/* Official Card */
.official-card {
  padding: 20px;
  text-align: center;
}
.official-photo {
  width: 100px;
  height: 125px;
  margin: 0 auto 16px;
  border-radius: 12px;
  overflow: hidden;
  border: 3px solid rgba(212,168,67,0.2);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.official-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.official-position {
  font-size: 11px;
  font-weight: 600;
  color: #D4A843;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.official-name {
  font-size: 16px;
  font-weight: 700;
  color: #0B1D33;
  margin: 6px 0 4px;
}
.official-nip {
  font-size: 11px;
  color: #94A3B8;
  margin: 0;
  font-variant-numeric: tabular-nums;
}

/* Announcements */
.announcement-list {
  list-style: none;
  padding: 8px 0;
  margin: 0;
}
.announcement-list li {
  border-bottom: 1px solid #F1F5F9;
}
.announcement-list li:last-child {
  border-bottom: none;
}
.announcement-list a {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 20px;
  text-decoration: none;
  transition: all 0.2s;
}
.announcement-list a:hover {
  background: #F8FAFC;
}
.ann-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #D4A843;
  flex-shrink: 0;
  margin-top: 7px;
}
.ann-text {
  flex: 1;
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
}
.announcement-list a:hover .ann-text {
  color: #0B1D33;
}
.ann-date {
  font-size: 11px;
  color: #94A3B8;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Related Links */
.related-links {
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.related-link-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  font-size: 13px;
  color: #4A5568;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
}
.related-link-item:hover {
  background: #F8FAFC;
  color: #0B1D33;
  padding-left: 16px;
}
.related-link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(212,168,67,0.08);
  color: #D4A843;
  flex-shrink: 0;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) {
  .content-inner {
    grid-template-columns: 1fr 320px;
    gap: 32px;
  }
}
@media (max-width: 1024px) {
  .hero-slider {
    height: 440px;
  }
  .hero-title {
    font-size: 28px;
  }
  .content-inner {
    grid-template-columns: 1fr;
  }
  .content-sidebar {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .hero-slider {
    height: 400px;
  }
  .hero-title {
    font-size: 22px;
  }
  .hero-desc {
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .hero-content {
    padding-bottom: 56px;
  }
  .slide-counter {
    display: none;
  }
  .stats-inner {
    grid-template-columns: repeat(2, 1fr);
  }
  .stat-item:nth-child(2) {
    border-right: none;
  }
  .news-featured {
    grid-template-columns: 1fr;
  }
  .news-featured-img {
    min-height: 200px;
  }
  .news-grid {
    grid-template-columns: 1fr;
  }
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 160px;
  }
  .gallery-large {
    grid-column: span 2;
    grid-row: span 1;
  }
  .content-sidebar {
    grid-template-columns: 1fr;
  }
  .welcome-section {
    padding: 56px 24px;
  }
  .welcome-title {
    font-size: 24px;
  }
}
@media (max-width: 480px) {
  .hero-slider {
    height: 360px;
  }
  .hero-title {
    font-size: 20px;
  }
  .hero-btn {
    padding: 12px 22px;
    font-size: 12px;
  }
  .slider-dots {
    bottom: 20px;
  }
  .gallery-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 180px;
  }
  .gallery-large {
    grid-column: span 1;
  }
  .stats-inner {
    grid-template-columns: 1fr;
  }
  .stat-item {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 28px 24px;
  }
  .stat-item:last-child {
    border-bottom: none;
  }
}
</style>