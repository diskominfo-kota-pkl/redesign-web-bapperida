<template>
  <div class="berita-daerah">

    <!-- ══════════════ PAGE HERO ══════════════ -->
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <nav class="breadcrumb" :class="{ visible: pageVisible }">
          <a href="#" class="breadcrumb-link">Beranda</a>
          <svg class="breadcrumb-sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
          <span class="breadcrumb-current">Berita Daerah</span>
        </nav>
        <h1 class="page-hero-title" :class="{ visible: pageVisible }">Berita Daerah</h1>
        <p class="page-hero-desc" :class="{ visible: pageVisible }">Informasi terkini seputar kegiatan, program, dan perkembangan pembangunan Kota Samarinda.</p>
      </div>
    </section>

    <!-- ══════════════ MAIN LAYOUT ══════════════ -->
    <section class="berita-main" ref="beritaMain">
      <div class="berita-container">

        <!-- ─── LEFT: News List ─── -->
        <div class="berita-list-col">

          <!-- Filter bar -->
          <div class="filter-bar" :class="{ visible: listVisible }">
            <div class="filter-left">
              <button
                v-for="cat in filterCategories"
                :key="cat"
                class="filter-btn"
                :class="{ active: activeFilter === cat }"
                @click="activeFilter = cat"
              >
                {{ cat }}
                <span v-if="cat === 'Semua'" class="filter-count">{{ allNews.length }}</span>
              </button>
            </div>
            <div class="filter-search">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Cari berita..."
                class="search-input"
                v-model="searchQuery"
              />
            </div>
          </div>

          <!-- Featured news -->
          <a
            v-if="featuredNews"
            href="#"
            class="featured-news"
            :class="{ visible: listVisible }"
            style="transition-delay: 0.1s"
          >
            <div class="featured-news-img-wrap">
              <img :src="featuredNews.img" :alt="featuredNews.title" class="featured-news-img" loading="lazy" />
              <div class="featured-news-overlay-grad"></div>
              <div class="featured-news-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="badge-icon-sm">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Berita Utama
              </div>
            </div>
            <div class="featured-news-body">
              <div class="news-meta-row">
                <span class="news-category-tag" :style="{ background: featuredNews.catBg, color: featuredNews.catColor }">{{ featuredNews.category }}</span>
                <span class="news-meta-date">{{ featuredNews.date }}</span>
                <span class="news-meta-dot"></span>
                <span class="news-meta-read">{{ featuredNews.readTime }}</span>
              </div>
              <h2 class="featured-news-title">{{ featuredNews.title }}</h2>
              <p class="featured-news-excerpt">{{ featuredNews.excerpt }}</p>
              <div class="featured-news-author">
                <div class="author-avatar" :style="{ background: featuredNews.authorBg }">{{ featuredNews.authorInitial }}</div>
                <div class="author-detail">
                  <span class="author-detail-name">{{ featuredNews.author }}</span>
                  <span class="author-detail-role">{{ featuredNews.authorRole }}</span>
                </div>
              </div>
            </div>
          </a>

          <!-- News list items -->
          <a
            v-for="(news, i) in filteredNews"
            :key="news.id"
            href="#"
            class="news-list-card"
            :class="{ visible: listVisible }"
            :style="{ transitionDelay: `${0.15 + i * 0.06}s` }"
          >
            <div class="news-list-img-wrap">
              <img :src="news.img" :alt="news.title" class="news-list-img" loading="lazy" />
              <div class="news-category-tag news-cat-float" :style="{ background: news.catBg, color: news.catColor }">{{ news.category }}</div>
            </div>
            <div class="news-list-body">
              <div class="news-meta-row">
                <span class="news-meta-date">{{ news.date }}</span>
                <span class="news-meta-dot"></span>
                <span class="news-meta-read">{{ news.readTime }}</span>
              </div>
              <h3 class="news-list-title">{{ news.title }}</h3>
              <p class="news-list-excerpt">{{ news.excerpt }}</p>
              <div class="news-list-footer">
                <div class="news-list-author">
                  <div class="author-avatar-sm" :style="{ background: news.authorBg }">{{ news.authorInitial }}</div>
                  <span class="author-name-sm">{{ news.author }}</span>
                </div>
                <span class="news-list-read-link">
                  Baca selengkapnya
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-sm"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
            </div>
          </a>

          <!-- Empty state -->
          <div v-if="filteredNews.length === 0" class="empty-state" :class="{ visible: listVisible }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="empty-icon">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            <p class="empty-text">Tidak ada berita ditemukan untuk filter ini.</p>
          </div>

          <!-- Pagination -->
          <div class="pagination" :class="{ visible: listVisible }" style="transition-delay: 0.5s">
            <button class="page-btn" :class="{ disabled: currentPage === 1 }" @click="currentPage = Math.max(1, currentPage - 1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 6 9 12 15 18"/></svg>
            </button>
            <button
              v-for="p in totalPages"
              :key="p"
              class="page-btn page-num"
              :class="{ active: currentPage === p }"
              @click="currentPage = p"
            >{{ p }}</button>
            <button class="page-btn" :class="{ disabled: currentPage === totalPages }" @click="currentPage = Math.min(totalPages, currentPage + 1)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
            </button>
          </div>
        </div>

        <!-- ─── RIGHT: Sidebar ─── -->
        <aside class="berita-sidebar">

          <!-- Kategori -->
          <div class="sidebar-card" :class="{ visible: sidebarVisible }" style="transition-delay: 0.1s">
            <h3 class="sidebar-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-title-icon">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
              Kategori
            </h3>
            <ul class="category-list">
              <li v-for="cat in sidebarCategories" :key="cat.name" class="category-item" :class="{ active: activeFilter === cat.name }">
                <a href="#" class="category-link" @click.prevent="activeFilter = cat.name">
                  <span class="category-dot" :style="{ background: cat.color }"></span>
                  <span class="category-name">{{ cat.name }}</span>
                  <span class="category-count">{{ cat.count }}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Berita Populer -->
          <div class="sidebar-card" :class="{ visible: sidebarVisible }" style="transition-delay: 0.2s">
            <h3 class="sidebar-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-title-icon">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              Berita Populer
            </h3>
            <div class="popular-list">
              <a v-for="(pop, i) in popularNews" :key="i" href="#" class="popular-item">
                <div class="popular-number" :style="{ color: pop.numColor }">{{ String(i + 1).padStart(2, '0') }}</div>
                <div class="popular-content">
                  <h4 class="popular-title">{{ pop.title }}</h4>
                  <span class="popular-date">{{ pop.date }}</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Tags -->
          <div class="sidebar-card" :class="{ visible: sidebarVisible }" style="transition-delay: 0.3s">
            <h3 class="sidebar-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-title-icon">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              Tag Populer
            </h3>
            <div class="tag-cloud">
              <a v-for="tag in tags" :key="tag" href="#" class="tag-pill">{{ tag }}</a>
            </div>
          </div>

          <!-- Kontak -->
          <div class="sidebar-card sidebar-contact" :class="{ visible: sidebarVisible }" style="transition-delay: 0.4s">
            <h3 class="sidebar-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sidebar-title-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Hubungi Kami
            </h3>
            <div class="contact-list">
              <div class="contact-item">
                <div class="contact-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div class="contact-text">
                  <span class="contact-label">Alamat</span>
                  <span class="contact-value">Jl. Kesuma Bangsa No. 1, Samarinda</span>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div class="contact-text">
                  <span class="contact-label">Telepon</span>
                  <span class="contact-value">(0541) 741 055</span>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div class="contact-text">
                  <span class="contact-label">Email</span>
                  <span class="contact-value">bapperida@samarindakota.go.id</span>
                </div>
              </div>
            </div>
            <div class="contact-socials">
              <a href="#" class="contact-social-btn" v-for="s in socials" :key="s.label" :aria-label="s.label">
                <svg viewBox="0 0 24 24" fill="currentColor" v-html="s.path"></svg>
              </a>
            </div>
          </div>
        </aside>

      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const pageVisible = ref(false);
const listVisible = ref(false);
const sidebarVisible = ref(false);
const beritaMain = ref(null);
const activeFilter = ref('Semua');
const searchQuery = ref('');
const currentPage = ref(1);
const perPage = 4;

const filterCategories = ['Semua', 'Penghargaan', 'Pembangunan', 'Keuangan', 'Sosial', 'Inovasi'];

const catColors = {
  'Penghargaan': { bg: 'rgba(245,195,50,0.15)', color: '#f5c832' },
  'Pembangunan': { bg: 'rgba(96,165,250,0.15)', color: '#60a5fa' },
  'Keuangan': { bg: 'rgba(52,211,153,0.15)', color: '#34d399' },
  'Sosial': { bg: 'rgba(192,132,252,0.15)', color: '#c084fc' },
  'Inovasi': { bg: 'rgba(251,146,60,0.15)', color: '#fb923c' },
};

function getCatStyle(cat) {
  return catColors[cat] || { bg: 'rgba(255,255,255,0.1)', color: '#fff' };
}

const allNews = [
  {
    id: 1, featured: true,
    img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80',
    category: 'Penghargaan',
    date: '20 Des 2024', readTime: '6 menit',
    title: 'Wali Kota Samarinda Raih Penghargaan Terbaik I Regional Kalimantan dalam Pengendalian Inflasi dan Creative Financing',
    excerpt: 'Pencapaian gemilang ditorehkan Pemerintah Kota Samarinda dalam ajang penghargaan tingkat regional Kalimantan berkat keberhasilan pengendalian inflasi daerah yang konsisten dan inovatif.',
    author: 'Humas BAPPERIDA', authorInitial: 'HB', authorRole: 'Tim Redaksi',
    authorBg: 'linear-gradient(135deg, #f5c832, #e6a817)',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    category: 'Sosial',
    date: '18 Des 2024', readTime: '4 menit',
    title: 'Selamat Memasuki Masa Purna Tugas — Pelepasan Pegawai BAPPERIDA yang Telah Mengabdi Selama 35 Tahun',
    excerpt: 'Upacara pelepasan digelar untuk menghormati dedikasi dan pengabdian pegawai senior yang telah membangun Samarinda selama lebih dari tiga dekade.',
    author: 'Admin', authorInitial: 'AD', authorRole: 'Redaksi',
    authorBg: 'linear-gradient(135deg, #c084fc, #a855f7)',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    category: 'Pembangunan',
    date: '15 Des 2024', readTime: '5 menit',
    title: 'Musrenbang 2025: Lebih dari 3.000 Warga Samarinda Suarakan Prioritas Pembangunan Daerah',
    excerpt: 'Partisipasi masyarakat dalam Musyawarah Perencanaan Pembangunan meningkat signifikan dibanding tahun sebelumnya.',
    author: 'Tim Perencanaan', authorInitial: 'TP', authorRole: 'Bidang Perencanaan',
    authorBg: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    category: 'Keuangan',
    date: '12 Des 2024', readTime: '4 menit',
    title: 'Realisasi APBD 2024 Capai 96 Persen — BAPPERIDA Catatkan Prestasi Tertinggi dalam Lima Tahun Terakhir',
    excerpt: 'Tingkat realisasi anggaran yang tinggi menunjukkan efektivitas perencanaan dan pengawasan pembangunan daerah.',
    author: 'Bidang Keuangan', authorInitial: 'BK', authorRole: 'Sekretariat',
    authorBg: 'linear-gradient(135deg, #34d399, #10b981)',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    category: 'Inovasi',
    date: '10 Des 2024', readTime: '3 menit',
    title: 'Samarinda Raih Penghargaan Smart City Nasional 2024 — Satu-satunya dari Kalimantan',
    excerpt: 'Kota Samarinda berhasil meraih predikat kota cerdas terbaik dan menjadi satu-satunya perwakilan Kalimantan.',
    author: 'Tim Inovasi', authorInitial: 'TI', authorRole: 'Bidang Riset',
    authorBg: 'linear-gradient(135deg, #fb923c, #ea580c)',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80',
    category: 'Pembangunan',
    date: '5 Des 2024', readTime: '4 menit',
    title: 'Progres Pembangunan Jembatan Mahakam IV Capai 78 Persen — Target Selesai Akhir 2025',
    excerpt: 'Pembangunan infrastruktur strategis terus dikebut untuk meningkatkan konektivitas kawasan.',
    author: 'Tim Infrastruktur', authorInitial: 'TI', authorRole: 'Bidang Pengendalian',
    authorBg: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
  },
  {
    id: 7,
    img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
    category: 'Sosial',
    date: '1 Des 2024', readTime: '3 menit',
    title: 'BAPPERIDA Gelar Workshop Penyusunan RPJMD 2026-2031 Melibatkan Seluruh Stakeholder',
    excerpt: 'Workshop dihadiri ratusan perwakilan masyarakat, akademisi, dan organisasi kemasyarakatan.',
    author: 'Admin', authorInitial: 'AD', authorRole: 'Redaksi',
    authorBg: 'linear-gradient(135deg, #c084fc, #a855f7)',
  },
  {
    id: 8,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    category: 'Penghargaan',
    date: '28 Nov 2024', readTime: '5 menit',
    title: 'BAPPERIDA Terima Anugerah Proper Hijau dari Kementerian LHK untuk Pengelolaan Lingkungan',
    excerpt: 'Penghargaan diberikan atas komitmen Pemkot Samarinda dalam mengintegrasikan aspek lingkungan dalam perencanaan pembangunan.',
    author: 'Humas BAPPERIDA', authorInitial: 'HB', authorRole: 'Tim Redaksi',
    authorBg: 'linear-gradient(135deg, #f5c832, #e6a817)',
  },
];

allNews.forEach((n) => {
  const c = getCatStyle(n.category);
  n.catBg = c.bg;
  n.catColor = c.color;
});

const featuredNews = computed(() => allNews.find((n) => n.featured));

const filteredNews = computed(() => {
  let result = allNews.filter((n) => !n.featured);
  if (activeFilter.value !== 'Semua') {
    result = allNews.filter((n) => n.category === activeFilter.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q));
  }
  return result;
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredNews.value.length / perPage)));

const pagedNews = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredNews.value.slice(start, start + perPage);
});

const sidebarCategories = computed(() => {
  const counts = {};
  allNews.forEach((n) => { counts[n.category] = (counts[n.category] || 0) + 1; });
  return [
    { name: 'Semua', count: allNews.length, color: '#f5c832' },
    ...Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      color: getCatStyle(name).color,
    })),
  ];
});

const popularNews = [
  { title: 'Wali Kota Raih Penghargaan Terbaik I Regional Kalimantan', date: '20 Des 2024', numColor: '#f5c832' },
  { title: 'Samarinda Smart City Nasional 2024 — Satu-satunya dari Kalimantan', date: '10 Des 2024', numColor: '#60a5fa' },
  { title: 'Realisasi APBD 2024 Capai 96 Persen', date: '12 Des 2024', numColor: '#34d399' },
  { title: 'Progres Jembatan Mahakam IV Capai 78 Persen', date: '5 Des 2024', numColor: '#c084fc' },
  { title: 'Workshop RPJMD 2026-2031 Melibatkan Seluruh Stakeholder', date: '1 Des 2024', numColor: '#fb923c' },
];

const tags = ['Inflasi', 'APBD', 'RPJMD', 'Smart City', 'Musrenbang', 'Infrastruktur', 'Inovasi', 'Lingkungan', 'Mahakam', 'Digital', 'Pelayanan Publik', 'Kependudukan'];

const socials = [
  { label: 'Facebook', path: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
  { label: 'Instagram', path: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
  { label: 'YouTube', path: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>' },
  { label: 'X', path: '<path d="M4 4l16 16M20 4L4 20"/>' },
];

function setupObservers() {
  pageVisible.value = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        listVisible.value = true;
        sidebarVisible.value = true;
      }
    });
  }, { threshold: 0.05 });
  if (beritaMain.value) observer.observe(beritaMain.value);
}

onMounted(() => {
  nextTick(setupObservers);
});
</script>

<!-- ═══════ GLOBAL RESET ═══════ -->
<style>
html, body {
  margin: 0;
  padding: 0;
  background: #060e27;
  overflow-x: hidden;
}
</style>

<!-- ═══════ SCOPED STYLES ═══════ -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.berita-daerah {
  font-family: 'Poppins', sans-serif;
  width: 100%;
  min-height: 100vh;
  background: #060e27;
  color: #fff;
}

/* ═══════════ PAGE HERO ═══════════ */
.page-hero {
  position: relative;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.page-hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1920&q=80') center/cover no-repeat;
  transform: scale(1.1);
}
.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6,14,39,0.75) 0%, rgba(6,14,39,0.95) 100%);
}
.page-hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  padding: 0 24px;
}
.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.6s ease;
}
.breadcrumb.visible { opacity: 1; transform: translateY(0); }
.breadcrumb-link {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb-link:hover { color: #f5c832; }
.breadcrumb-sep { width: 14px; height: 14px; color: rgba(255,255,255,0.25); }
.breadcrumb-current { font-size: 12px; font-weight: 600; color: #f5c832; }
.page-hero-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 12px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease 0.1s;
}
.page-hero-title.visible { opacity: 1; transform: translateY(0); }
.page-hero-desc {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease 0.2s;
}
.page-hero-desc.visible { opacity: 1; transform: translateY(0); }

/* ═══════════ MAIN LAYOUT ═══════════ */
.berita-main {
  position: relative;
  padding: 60px 0 80px;
}
.berita-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 36px;
  align-items: start;
}

/* ═══════════ FILTER BAR ═══════════ */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
  padding: 16px 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}
.filter-bar.visible { opacity: 1; transform: translateY(0); }
.filter-left {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.filter-btn {
  padding: 7px 16px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 100px;
  background: transparent;
  color: rgba(255,255,255,0.5);
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
  white-space: nowrap;
}
.filter-btn:hover {
  border-color: rgba(245,195,50,0.3);
  color: rgba(255,255,255,0.8);
}
.filter-btn.active {
  background: rgba(245,195,50,0.12);
  border-color: rgba(245,195,50,0.4);
  color: #f5c832;
}
.filter-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 100px;
  background: rgba(255,255,255,0.08);
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.5);
  margin-left: 4px;
}
.filter-btn.active .filter-count {
  background: rgba(245,195,50,0.2);
  color: #f5c832;
}
.filter-search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  background: rgba(255,255,255,0.03);
  flex-shrink: 0;
}
.search-icon { width: 16px; height: 16px; color: rgba(255,255,255,0.3); flex-shrink: 0; }
.search-input {
  border: none;
  background: transparent;
  outline: none;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 500;
  width: 160px;
}
.search-input::placeholder { color: rgba(255,255,255,0.3); }

/* ═══════════ FEATURED NEWS ═══════════ */
.featured-news {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 22px;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
}
.featured-news.visible { opacity: 1; transform: translateY(0); }
.featured-news:hover {
  border-color: rgba(245,195,50,0.2);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  transform: translateY(-4px);
}
.featured-news-img-wrap {
  position: relative;
  overflow: hidden;
  min-height: 320px;
}
.featured-news-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.featured-news:hover .featured-news-img { transform: scale(1.04); }
.featured-news-overlay-grad {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 50%, rgba(6,14,39,0.4) 100%);
}
.featured-news-badge {
  position: absolute;
  top: 18px;
  left: 18px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px 6px 10px;
  background: rgba(6,14,39,0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(245,195,50,0.3);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  color: #f5c832;
}
.badge-icon-sm { width: 13px; height: 13px; }
.featured-news-body {
  padding: 32px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.news-meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.news-category-tag {
  padding: 3px 12px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.news-meta-date { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.4); }
.news-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.2); }
.news-meta-read { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.35); }
.featured-news-title {
  font-size: 20px;
  font-weight: 800;
  line-height: 1.4;
  margin-bottom: 12px;
  transition: color 0.25s;
}
.featured-news:hover .featured-news-title { color: #f5c832; }
.featured-news-excerpt {
  font-size: 13px;
  font-weight: 400;
  color: rgba(255,255,255,0.45);
  line-height: 1.75;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.featured-news-author {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.author-avatar {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  color: #0a0f2e;
  flex-shrink: 0;
}
.author-detail { display: flex; flex-direction: column; line-height: 1.3; }
.author-detail-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.75); }
.author-detail-role { font-size: 10px; font-weight: 400; color: rgba(255,255,255,0.35); }

/* ═══════════ NEWS LIST CARDS ═══════════ */
.news-list-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  text-decoration: none;
  color: #fff;
  margin-bottom: 16px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
}
.news-list-card.visible { opacity: 1; transform: translateY(0); }
.news-list-card:hover {
  background: rgba(255,255,255,0.045);
  border-color: rgba(255,255,255,0.1);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.2);
}
.news-list-img-wrap {
  position: relative;
  width: 200px;
  min-width: 200px;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}
.news-list-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.news-list-card:hover .news-list-img { transform: scale(1.05); }
.news-cat-float {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.news-list-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}
.news-list-title {
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
  margin-bottom: 8px;
  color: rgba(255,255,255,0.9);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.25s;
}
.news-list-card:hover .news-list-title { color: #f5c832; }
.news-list-excerpt {
  font-size: 12.5px;
  font-weight: 400;
  color: rgba(255,255,255,0.38);
  line-height: 1.65;
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.news-list-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.news-list-author {
  display: flex;
  align-items: center;
  gap: 8px;
}
.author-avatar-sm {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 800;
  color: #0a0f2e;
  flex-shrink: 0;
}
.author-name-sm { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5); }
.news-list-read-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.3);
  transition: color 0.25s, gap 0.25s;
}
.news-list-card:hover .news-list-read-link { color: #f5c832; gap: 8px; }
.arrow-sm { width: 13px; height: 13px; }

/* ═══════════ EMPTY STATE ═══════════ */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}
.empty-state.visible { opacity: 1; transform: translateY(0); }
.empty-icon { width: 48px; height: 48px; color: rgba(255,255,255,0.15); margin-bottom: 16px; }
.empty-text { font-size: 14px; color: rgba(255,255,255,0.35); }

/* ═══════════ PAGINATION ═══════════ */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 36px;
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.6s ease;
}
.pagination.visible { opacity: 1; transform: translateY(0); }
.page-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.5);
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
}
.page-btn svg { width: 16px; height: 16px; }
.page-btn:hover:not(.disabled) {
  border-color: rgba(245,195,50,0.3);
  color: #f5c832;
  background: rgba(245,195,50,0.06);
}
.page-btn.active {
  background: linear-gradient(135deg, #f5c832, #e6a817);
  border-color: transparent;
  color: #0a0f2e;
  box-shadow: 0 4px 15px rgba(245,195,50,0.3);
}
.page-btn.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ═══════════ SIDEBAR ═══════════ */
.sidebar-card {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.sidebar-card.visible { opacity: 1; transform: translateX(0); }
.sidebar-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.sidebar-title-icon { width: 18px; height: 18px; color: #f5c832; }

/* --- Categories --- */
.category-list { list-style: none; }
.category-item { margin-bottom: 2px; }
.category-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: rgba(255,255,255,0.6);
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
}
.category-link:hover {
  background: rgba(255,255,255,0.05);
  color: #fff;
}
.category-item.active .category-link {
  background: rgba(245,195,50,0.08);
  color: #f5c832;
}
.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.category-name { flex: 1; }
.category-count {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.05);
  padding: 2px 8px;
  border-radius: 100px;
}
.category-item.active .category-count {
  color: #f5c832;
  background: rgba(245,195,50,0.12);
}

/* --- Popular News --- */
.popular-list { display: flex; flex-direction: column; }
.popular-item {
  display: flex;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  text-decoration: none;
  color: #fff;
  transition: all 0.2s;
}
.popular-item:last-child { border-bottom: none; }
.popular-item:hover .popular-title { color: #f5c832; }
.popular-number {
  font-size: 26px;
  font-weight: 900;
  line-height: 1;
  flex-shrink: 0;
  width: 30px;
  opacity: 0.4;
  transition: opacity 0.25s;
}
.popular-item:hover .popular-number { opacity: 0.8; }
.popular-content { flex: 1; min-width: 0; }
.popular-title {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.45;
  color: rgba(255,255,255,0.75);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 4px;
  transition: color 0.25s;
}
.popular-date { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.3); }

/* --- Tags --- */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-pill {
  padding: 6px 14px;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.08);
  background: transparent;
  color: rgba(255,255,255,0.5);
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s;
}
.tag-pill:hover {
  border-color: rgba(245,195,50,0.35);
  background: rgba(245,195,50,0.08);
  color: #f5c832;
}

/* --- Contact --- */
.contact-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 20px; }
.contact-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.contact-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(245,195,50,0.08);
  border: 1px solid rgba(245,195,50,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #f5c832;
}
.contact-icon-wrap svg { width: 16px; height: 16px; }
.contact-text { display: flex; flex-direction: column; }
.contact-label { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
.contact-value { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.6); line-height: 1.4; }
.contact-socials { display: flex; gap: 8px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); }
.contact-social-btn {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  transition: all 0.25s;
}
.contact-social-btn svg { width: 14px; height: 14px; }
.contact-social-btn:hover {
  background: rgba(245,195,50,0.1);
  border-color: rgba(245,195,50,0.3);
  color: #f5c832;
  transform: translateY(-2px);
}

/* ═══════════ RESPONSIVE ═══════════ */
@media (max-width: 1100px) {
  .berita-container {
    grid-template-columns: 1fr;
  }
  .berita-sidebar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .sidebar-contact {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .berita-container { padding: 0 20px; }
  .berita-main { padding: 40px 0 60px; }
  .page-hero { height: 240px; }
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .filter-search { width: 100%; }
  .search-input { width: 100%; }
  .featured-news {
    grid-template-columns: 1fr;
  }
  .featured-news-img-wrap { min-height: 200px; }
  .featured-news-body { padding: 24px 20px; }
  .featured-news-title { font-size: 17px; }
  .news-list-card {
    flex-direction: column;
  }
  .news-list-img-wrap {
    width: 100%;
    min-width: unset;
    height: 180px;
  }
  .berita-sidebar {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .filter-left { gap: 4px; }
  .filter-btn { padding: 6px 12px; font-size: 11px; }
}
</style>