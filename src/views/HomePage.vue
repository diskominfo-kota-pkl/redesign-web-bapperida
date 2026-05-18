<template>
  <div class="homepage" ref="homepageRef">

    <!-- ══════════════ HERO ══════════════ -->
    <section class="hero" @mousemove="onHeroMouseMove" @mouseleave="heroParallax = { x: 0, y: 0 }">
      <div class="hero-bg" :style="heroBgStyle">
        <img
          src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1920&q=80"
          alt="Kota Samarinda"
          class="hero-img"
        />
      </div>

      <canvas ref="particleCanvas" class="particle-canvas"></canvas>

      <div class="overlay-left"></div>
      <div class="overlay-bottom"></div>

      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>

      <div class="hero-content" :style="heroContentStyle">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Portal Resmi Pemerintah Kota
        </div>
        <h1 class="hero-title">
          <span class="title-line" v-for="(line, i) in heroLines" :key="i" :style="{ animationDelay: `${0.3 + i * 0.15}s` }">
            {{ line }}
          </span>
        </h1>
        <p class="hero-subtitle">
          Portal terpadu untuk perencanaan, riset, dan pembangunan daerah<br class="br-desktop" />
          yang berkelanjutan, inovatif, dan berbasis data.
        </p>
        <div class="hero-actions">
          <a href="#" class="btn-primary">
            <span>Jelajahi Portal</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a href="#" class="btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon-sm">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span>Tonton Profil</span>
          </a>
        </div>
      </div>

      <div class="scroll-indicator">
        <div class="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>

    <!-- ══════════════ FEATURE CARDS ══════════════ -->
    <section class="features-section" ref="featuresSection">
      <div class="features-container">
        <div class="section-header" :class="{ visible: featuresVisible }">
          <span class="section-tag">Layanan Kami</span>
          <h2 class="section-title">Pilar Pembangunan<br/>Kota Samarinda</h2>
        </div>
        <div class="cards-grid">
          <div
            class="card"
            v-for="(item, i) in features"
            :key="item.title"
            :class="[{ visible: featuresVisible }, { 'card-active': activeCard === i }]"
            :style="{ transitionDelay: `${0.15 + i * 0.1}s` }"
            @mouseenter="activeCard = i"
            @mouseleave="activeCard = -1"
          >
            <div class="card-glow" :class="`glow-${i}`"></div>
            <div class="card-icon-wrap">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="item.svgPaths"></svg>
            </div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.desc }}</p>
            <div class="card-link">
              <span>Selengkapnya</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="link-arrow">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════ STATISTIK ══════════════ -->
    <section class="stats-section" ref="statsSection">
      <div class="stats-bg-pattern"></div>
      <div class="stats-container">
        <div class="section-header" :class="{ visible: statsVisible }">
          <span class="section-tag">Data & Statistik</span>
          <h2 class="section-title">Capaian Pembangunan<br/>Kota Samarinda</h2>
        </div>
        <div class="stats-grid">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="stat-card"
            :class="{ visible: statsVisible }"
            :style="{ transitionDelay: `${0.1 + i * 0.1}s` }"
          >
            <div class="stat-icon-wrap" :style="{ background: stat.iconBg }">
              <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="stat.svg"></svg>
            </div>
            <div class="stat-value">{{ statsVisible ? stat.display : '0' }}{{ stat.suffix }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" :style="{ width: statsVisible ? stat.bar + '%' : '0%', background: stat.barColor }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════ BERITA TERKINI ══════════════ -->
    <section class="news-section" ref="newsSection">
      <div class="news-container">
        <div class="section-header" :class="{ visible: newsVisible }">
          <span class="section-tag">Publikasi</span>
          <h2 class="section-title">Berita & Pengumuman<br/>Terkini</h2>
        </div>
        <div class="news-grid">
          <div
            v-for="(news, i) in newsItems"
            :key="i"
            class="news-card"
            :class="{ visible: newsVisible }"
            :style="{ transitionDelay: `${0.15 + i * 0.12}s` }"
          >
            <div class="news-img-wrap">
              <img :src="news.img" :alt="news.title" class="news-img" loading="lazy" />
              <div class="news-category">{{ news.category }}</div>
            </div>
            <div class="news-body">
              <div class="news-meta">
                <span class="news-date">{{ news.date }}</span>
                <span class="news-dot"></span>
                <span class="news-read">{{ news.readTime }}</span>
              </div>
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-excerpt">{{ news.excerpt }}</p>
              <a href="#" class="news-link">
                Baca selengkapnya
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="link-arrow-sm">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="news-cta" :class="{ visible: newsVisible }" style="transition-delay: 0.55s">
          <router-link to="/berita-daerah" class="btn-outline">
            <span>Lihat Semua Berita</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon-sm">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ══════════════ CTA SECTION ══════════════ -->
    <section class="cta-section" ref="ctaSection">
      <div class="cta-glow"></div>
      <div class="cta-content" :class="{ visible: ctaVisible }">
        <h2 class="cta-title">Siap Berpartisipasi dalam<br/>Pembangunan Samarinda?</h2>
        <p class="cta-desc">Akses layanan perencanaan dan pembangunan daerah secara transparan dan akuntabel.</p>
        <div class="cta-buttons">
          <a href="#" class="btn-primary btn-lg">
            <span>Mulai Sekarang</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a href="#" class="btn-ghost btn-lg">Hubungi Kami</a>
        </div>
      </div>
    </section>

    <Transition name="fadeScale">
      <button v-if="showBackToTop" class="back-to-top" @click="scrollToTop" aria-label="Kembali ke atas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </Transition>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from 'vue';

const activeCard = ref(-1);
const showBackToTop = ref(false);
const featuresVisible = ref(false);
const statsVisible = ref(false);
const newsVisible = ref(false);
const ctaVisible = ref(false);
const heroParallax = reactive({ x: 0, y: 0 });
const homepageRef = ref(null);
const particleCanvas = ref(null);
const featuresSection = ref(null);
const statsSection = ref(null);
const newsSection = ref(null);
const ctaSection = ref(null);

const heroLines = ['Membangun Samarinda', 'Menuju Kota Pusat', 'Peradaban'];

const features = [
  {
    title: 'Inovasi Daerah',
    desc: 'Mendorong inovasi pelayanan publik dan tata kelola pemerintahan yang modern.',
    svgPaths: '<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  },
  {
    title: 'Perencanaan',
    desc: 'Menyusun rencana pembangunan jangka menengah dan panjang yang terukur.',
    svgPaths: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  },
  {
    title: 'Riset & Data',
    desc: 'Penelitian mendalam berbasis data untuk mendukung kebijakan pembangunan.',
    svgPaths: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6M8 11h6"/>',
  },
  {
    title: 'Pembangunan',
    desc: 'Mengawal dan mengevaluasi pelaksanaan program pembangunan kota.',
    svgPaths: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>',
  },
];

const stats = reactive([
  { value: 843, display: '0', suffix: '+', label: 'Program Pembangunan Aktif', bar: 87, barColor: 'linear-gradient(90deg, #f5c832, #f59e0b)', iconBg: 'rgba(245,200,50,0.12)', svg: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>' },
  { value: 96, display: '0', suffix: '%', label: 'Tingkat Realisasi Anggaran', bar: 96, barColor: 'linear-gradient(90deg, #34d399, #10b981)', iconBg: 'rgba(52,211,153,0.12)', svg: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>' },
  { value: 156, display: '0', suffix: '', label: 'Kecamatan & Kelurahan Terlayani', bar: 72, barColor: 'linear-gradient(90deg, #60a5fa, #3b82f6)', iconBg: 'rgba(96,165,250,0.12)', svg: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>' },
  { value: 47, display: '0', suffix: '', label: 'Inovasi Pelayanan Publik', bar: 58, barColor: 'linear-gradient(90deg, #c084fc, #a855f7)', iconBg: 'rgba(192,132,252,0.12)', svg: '<path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>' },
]);

const newsItems = [
  {
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    category: 'Perencanaan',
    date: '15 Des 2024',
    readTime: '5 menit',
    title: 'Musrenbang 2025: Warga Samarinda Ikut Suarakan Prioritas Pembangunan',
    excerpt: 'Lebih dari 3.000 warga turut berpartisipasi dalam Musyawarah Perencanaan Pembangunan tahun ini.',
  },
  {
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    category: 'Inovasi',
    date: '10 Des 2024',
    readTime: '3 menit',
    title: 'Samarinda Raih Penghargaan Smart City Nasional 2024',
    excerpt: 'Kota Samarinda meraih predikat sebagai salah satu kota cerdas terbaik di Indonesia.',
  },
  {
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80',
    category: 'Pembangunan',
    date: '5 Des 2024',
    readTime: '4 menit',
    title: 'Progres Pembangunan Jembatan Mahakam IV Capai 78 Persen',
    excerpt: 'Pembangunan infrastruktur strategis terus dikebut untuk meningkatkan konektivitas kawasan.',
  },
];

const heroBgStyle = computed(() => ({
  transform: `translate(${heroParallax.x * 0.015}px, ${heroParallax.y * 0.015}px) scale(1.05)`,
}));
const heroContentStyle = computed(() => ({
  transform: `translate(${heroParallax.x * 0.02}px, ${heroParallax.y * 0.02}px)`,
}));

function onHeroMouseMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  heroParallax.x = (e.clientX - rect.left - rect.width / 2);
  heroParallax.y = (e.clientY - rect.top - rect.height / 2);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function animateCounters() {
  stats.forEach(stat => {
    const duration = 2000;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      stat.display = Math.round(stat.value * eased).toLocaleString('id-ID');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

let particles = [];
let animFrame = null;

function initParticles() {
  const canvas = particleCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const count = Math.min(80, Math.floor(window.innerWidth / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.15,
  }));

  let mouse = { x: -9999, y: -9999 };
  canvas.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      const boost = dist < 150 ? (1 - dist / 150) * 0.6 : 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + boost * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 200, 50, ${p.opacity + boost})`;
      ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(245, 200, 50, ${0.08 * (1 - d / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    animFrame = requestAnimationFrame(draw);
  }
  draw();
}

function setupObservers() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target === featuresSection.value) featuresVisible.value = true;
        if (entry.target === statsSection.value) {
          statsVisible.value = true;
          nextTick(animateCounters);
        }
        if (entry.target === newsSection.value) newsVisible.value = true;
        if (entry.target === ctaSection.value) ctaVisible.value = true;
      }
    });
  }, { threshold: 0.15 });

  if (featuresSection.value) observer.observe(featuresSection.value);
  if (statsSection.value) observer.observe(statsSection.value);
  if (newsSection.value) observer.observe(newsSection.value);
  if (ctaSection.value) observer.observe(ctaSection.value);
}

function onScroll() {
  showBackToTop.value = window.scrollY > 600;
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  initParticles();
  nextTick(setupObservers);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  if (animFrame) cancelAnimationFrame(animFrame);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.homepage {
  font-family: 'Poppins', sans-serif;
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #060e27;
  color: #fff;
}

/* ═══════════ HERO ═══════════ */
.hero {
  position: relative; width: 100%; height: 100vh;
  min-height: 660px;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute; inset: -40px; z-index: 0;
  transition: transform 0.15s ease-out;
  will-change: transform;
}
.hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.particle-canvas { position: absolute; inset: 0; z-index: 1; pointer-events: auto; }
.overlay-left {
  position: absolute; inset: 0; z-index: 2;
  background: radial-gradient(ellipse at 40% 50%, rgba(6,14,39,0.7) 0%, rgba(6,14,39,0.92) 70%);
}
.overlay-bottom {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 40%; z-index: 2;
  background: linear-gradient(to top, #060e27 0%, transparent 100%);
}
.glow-orb {
  position: absolute; border-radius: 50%; z-index: 2;
  filter: blur(80px); pointer-events: none;
}
.orb-1 { width: 350px; height: 350px; background: rgba(245,195,50,0.07); top: 15%; left: 20%; animation: orbFloat 8s ease-in-out infinite; }
.orb-2 { width: 250px; height: 250px; background: rgba(59,130,246,0.05); bottom: 25%; right: 20%; animation: orbFloat 10s ease-in-out infinite reverse; }
@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(25px, -18px); }
}
.hero-content {
  position: relative; z-index: 3; text-align: center;
  max-width: 820px; padding: 0 24px;
  transition: transform 0.15s ease-out;
  will-change: transform;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 18px 7px 12px;
  background: rgba(245,195,50,0.1);
  border: 1px solid rgba(245,195,50,0.25);
  border-radius: 100px;
  font-size: 12px; font-weight: 600; color: #f5c832;
  margin-bottom: 24px;
  animation: fadeUp 0.7s ease both; animation-delay: 0.1s;
}
.badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #f5c832; animation: pulse-dot 2s ease-in-out infinite; }
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.7); }
}
.hero-title { margin-bottom: 20px; }
.title-line {
  display: block; font-size: clamp(28px, 4.2vw, 54px); font-weight: 900;
  color: #fff; line-height: 1.15; letter-spacing: -0.5px;
  text-shadow: 0 4px 30px rgba(0,0,0,0.4);
  animation: fadeUp 0.7s ease both;
}
.title-line:nth-child(2) {
  background: linear-gradient(135deg, #f5c832, #f59e0b, #fbbf24);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-subtitle {
  font-size: clamp(13px, 1.25vw, 15px); font-weight: 400;
  color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 32px;
  animation: fadeUp 0.7s ease both; animation-delay: 0.65s;
}
.hero-actions {
  display: flex; align-items: center; justify-content: center; gap: 14px;
  animation: fadeUp 0.7s ease both; animation-delay: 0.8s;
}
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; background: linear-gradient(135deg, #f5c832, #e6a817);
  color: #0a0f2e; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
  text-decoration: none; border-radius: 12px; border: none; cursor: pointer;
  transition: all 0.3s; box-shadow: 0 4px 20px rgba(245,195,50,0.3);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(245,195,50,0.45); }
.btn-icon { width: 18px; height: 18px; transition: transform 0.25s; }
.btn-primary:hover .btn-icon { transform: translateX(3px); }
.btn-lg { padding: 16px 34px; font-size: 15px; border-radius: 14px; }
.btn-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 24px; background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.85);
  font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
  text-decoration: none; border-radius: 12px; cursor: pointer; transition: all 0.3s;
}
.btn-secondary:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.3); color: #fff; }
.btn-icon-sm { width: 18px; height: 18px; }
.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 16px 30px; background: transparent;
  border: 1.5px solid rgba(255,255,255,0.25); color: rgba(255,255,255,0.85);
  font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600;
  text-decoration: none; border-radius: 14px; cursor: pointer; transition: all 0.3s;
}
.btn-ghost:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.06); color: #fff; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.scroll-indicator {
  position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
  z-index: 5; display: flex; flex-direction: column; align-items: center; gap: 8px;
  animation: fadeUp 0.7s ease both; animation-delay: 1.2s;
}
.scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
  position: relative; overflow: hidden;
}
.scroll-line::after {
  content: ''; position: absolute; top: -100%; left: 0;
  width: 100%; height: 50%; background: rgba(245,195,50,0.8);
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse { 0% { top: -50%; } 100% { top: 150%; } }
.scroll-indicator span { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.35); letter-spacing: 2px; text-transform: uppercase; }

/* ═══════════ FEATURES ═══════════ */
.features-section { position: relative; padding: 80px 0 90px; background: #060e27; }
.features-container { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 48px; }
.cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.card {
  position: relative; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07); border-radius: 20px;
  padding: 30px 24px 26px; color: #fff; cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0; transform: translateY(30px); overflow: hidden;
}
.card.visible { opacity: 1; transform: translateY(0); }
.card::before {
  content: ''; position: absolute; inset: 0; border-radius: 20px; padding: 1px;
  background: linear-gradient(160deg, rgba(245,195,50,0.4) 0%, transparent 50%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  opacity: 0; transition: opacity 0.4s;
}
.card:hover::before { opacity: 1; }
.card:hover { background: rgba(14, 28, 70, 0.55); transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.card-glow { position: absolute; top: -30px; right: -30px; width: 100px; height: 100px; border-radius: 50%; filter: blur(40px); opacity: 0; transition: opacity 0.4s; }
.card:hover .card-glow { opacity: 1; }
.glow-0 { background: rgba(245,195,50,0.2); }
.glow-1 { background: rgba(52,211,153,0.2); }
.glow-2 { background: rgba(96,165,250,0.2); }
.glow-3 { background: rgba(192,132,252,0.2); }
.card-icon-wrap {
  width: 52px; height: 52px; border-radius: 14px;
  background: rgba(245,195,50,0.08); border: 1px solid rgba(245,195,50,0.18);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px; color: #f5c832; transition: all 0.35s;
}
.card:hover .card-icon-wrap { background: rgba(245,195,50,0.16); border-color: rgba(245,195,50,0.35); transform: scale(1.08); }
.card-icon { width: 24px; height: 24px; }
.card-title { font-size: 16px; font-weight: 700; margin-bottom: 10px; }
.card-desc { font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.5); line-height: 1.75; margin-bottom: 18px; }
.card-link { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.35); transition: color 0.25s; }
.card:hover .card-link { color: #f5c832; }
.link-arrow { width: 14px; height: 14px; transition: transform 0.25s; }
.card:hover .link-arrow { transform: translateX(4px); }

/* ═══════════ STATS ═══════════ */
.stats-section {
  position: relative; padding: 90px 0 80px;
  background: linear-gradient(180deg, #060e27 0%, #0a1435 100%); overflow: hidden;
}
.stats-bg-pattern {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(245,195,50,0.025) 1px, transparent 1px);
  background-size: 32px 32px;
}
.stats-container { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 48px; }
.section-header { margin-bottom: 48px; opacity: 0; transform: translateY(20px); transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.section-header.visible { opacity: 1; transform: translateY(0); }
.section-tag { display: inline-block; font-size: 11px; font-weight: 700; color: #f5c832; letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 12px; }
.section-title { font-size: clamp(22px, 2.8vw, 38px); font-weight: 800; color: #fff; line-height: 1.2; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.stat-card {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px; padding: 28px 24px;
  opacity: 0; transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.stat-card.visible { opacity: 1; transform: translateY(0); }
.stat-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); transform: translateY(-4px); }
.stat-icon-wrap { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.stat-icon { width: 22px; height: 22px; color: #fff; }
.stat-value { font-size: 34px; font-weight: 900; color: #fff; line-height: 1; margin-bottom: 6px; letter-spacing: -1px; }
.stat-label { font-size: 12.5px; font-weight: 500; color: rgba(255,255,255,0.45); line-height: 1.5; margin-bottom: 18px; }
.stat-bar-track { height: 4px; border-radius: 4px; background: rgba(255,255,255,0.06); overflow: hidden; }
.stat-bar-fill { height: 100%; border-radius: 4px; transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); }

/* ═══════════ NEWS ═══════════ */
.news-section { position: relative; padding: 80px 0 100px; background: #0a1435; }
.news-container { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 48px; }
.news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 48px; }
.news-card {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px; overflow: hidden;
  opacity: 0; transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); cursor: pointer;
}
.news-card.visible { opacity: 1; transform: translateY(0); }
.news-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.12); box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.news-img-wrap { position: relative; overflow: hidden; height: 200px; }
.news-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.news-card:hover .news-img { transform: scale(1.06); }
.news-category { position: absolute; top: 14px; left: 14px; padding: 5px 14px; background: rgba(245,195,50,0.9); color: #0a0f2e; font-size: 11px; font-weight: 700; border-radius: 100px; }
.news-body { padding: 22px 24px 26px; }
.news-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.news-date { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.4); }
.news-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.25); }
.news-read { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.4); }
.news-title { font-size: 16px; font-weight: 700; color: #fff; line-height: 1.45; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.news-excerpt { font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.4); line-height: 1.7; margin-bottom: 18px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.news-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #f5c832; text-decoration: none; transition: gap 0.25s; }
.news-link:hover { gap: 10px; }
.link-arrow-sm { width: 15px; height: 15px; }
.news-cta { text-align: center; opacity: 0; transform: translateY(20px); transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.news-cta.visible { opacity: 1; transform: translateY(0); }
.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 32px; background: transparent;
  border: 1.5px solid rgba(245,195,50,0.4); color: #f5c832;
  font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
  text-decoration: none; border-radius: 14px; cursor: pointer; transition: all 0.3s;
}
.btn-outline:hover { background: rgba(245,195,50,0.1); border-color: rgba(245,195,50,0.7); transform: translateY(-2px); box-shadow: 0 8px 25px rgba(245,195,50,0.15); }

/* ═══════════ CTA ═══════════ */
.cta-section {
  position: relative; padding: 100px 48px; background: #060e27;
  overflow: hidden; display: flex; align-items: center; justify-content: center;
}
.cta-glow {
  position: absolute; width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(245,195,50,0.08) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none;
}
.cta-content {
  position: relative; z-index: 1; text-align: center; max-width: 680px;
  opacity: 0; transform: translateY(30px);
  transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.cta-content.visible { opacity: 1; transform: translateY(0); }
.cta-title { font-size: clamp(22px, 2.8vw, 36px); font-weight: 800; color: #fff; line-height: 1.25; margin-bottom: 16px; }
.cta-desc { font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.5); line-height: 1.75; margin-bottom: 36px; }
.cta-buttons { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }

/* ═══════════ BACK TO TOP ═══════════ */
.back-to-top {
  position: fixed; bottom: 32px; right: 32px; z-index: 900;
  width: 46px; height: 46px; border-radius: 14px;
  background: rgba(245,195,50,0.9); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; color: #0a0f2e;
  box-shadow: 0 4px 20px rgba(245,195,50,0.35); transition: all 0.3s;
}
.back-to-top svg { width: 20px; height: 20px; }
.back-to-top:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(245,195,50,0.5); }
.fadeScale-enter-active { transition: all 0.3s ease-out; }
.fadeScale-leave-active { transition: all 0.2s ease-in; }
.fadeScale-enter-from { opacity: 0; transform: scale(0.8) translateY(10px); }
.fadeScale-leave-to { opacity: 0; transform: scale(0.9); }

/* ═══════════ RESPONSIVE ═══════════ */
@media (max-width: 1200px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 1024px) {
  .features-container, .stats-container, .news-container { padding: 0 24px; }
  .cta-section { padding: 80px 24px; }
  .cards-grid { gap: 16px; }
}
@media (max-width: 768px) {
  .hero-content { padding: 0 20px; }
  .cards-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .card { padding: 22px 18px; }
  .card-link { display: none; }
  .scroll-indicator { display: none; }
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
  .news-grid { grid-template-columns: 1fr; gap: 18px; }
  .cta-buttons { flex-direction: column; }
  .br-desktop { display: none; }
  .hero-actions { flex-direction: column; align-items: center; }
}
@media (max-width: 480px) {
  .cards-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr; }
  .stat-value { font-size: 28px; }
  .hero-badge { font-size: 11px; }
}
</style>