<template>
  <div class="vm-page">
    <section class="page-hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-inner">
        <div class="hero-badge"><span class="badge-dot"></span> PROFIL</div>
        <h1 class="hero-title">Visi &<br><span>Misi</span></h1>
        <p class="hero-desc">Arah kebijakan dan tujuan strategis pembangunan Kota Samarinda.</p>
        <div class="hero-back">
          <a href="/" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="back-icon"><polyline points="15 18 9 12 15 6"/></svg>
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </section>

    <!-- Visi -->
    <section class="visi-section">
      <div class="visi-container">
        <div class="visi-card anim-target" data-delay="0">
          <div class="visi-label">VISI</div>
          <blockquote class="visi-quote">"SAMARINDA MAJU UNTUK KALTIM MAJU"</blockquote>
          <div class="maju-breakdown">
            <div class="maju-item" v-for="(m, i) in maju" :key="i">
              <span class="maju-letter">{{ m.letter }}</span>
              <span class="maju-word">{{ m.word }}</span>
            </div>
          </div>
          <div class="visi-meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="visi-meta-icon"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>Walikota & Wakil Walikota Samarinda Periode 2024–2029</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Misi -->
    <section class="misi-section">
      <div class="misi-container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-tag">5 Misi Strategis</div>
            <h2 class="section-title">Misi Pembangunan</h2>
          </div>
        </div>
        <div class="misi-grid">
          <div v-for="(m, i) in misi" :key="i" class="misi-card anim-target" :data-delay="(i % 5) + 1">
            <div class="misi-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="misi-icon" :style="{ background: m.bg }">
              <svg class="misi-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="m.svg"></svg>
            </div>
            <p class="misi-text">{{ m.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6 Program Unggulan -->
    <section class="program-section">
      <div class="program-container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-tag">Prioritas</div>
            <h2 class="section-title">6 Program Unggulan Daerah</h2>
          </div>
        </div>
        <div class="program-grid">
          <div v-for="(p, i) in programUnggulan" :key="i" class="program-card anim-target" :data-delay="(i % 3) + 1">
            <div class="pc-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <p class="pc-text">{{ p }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bottom-cta anim-target" data-delay="0">
      <div class="cta-inner">
        <div class="cta-text">
          <h3>Ingin Tahu Lebih Lanjut?</h3>
          <p>Hubungi BAPPERIDA untuk informasi detail mengenai visi misi pembangunan.</p>
        </div>
        <a href="#" class="btn-primary">
          <span>Hubungi Kami</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const maju = [
  { letter: 'M', word: 'Mandiri' },
  { letter: 'A', word: 'Adil' },
  { letter: 'J', word: 'ber-Jaya' },
  { letter: 'U', word: 'Unggul' }
]

const misi = [
  { text: 'Mewujudkan Sumber Daya Manusia (SDM) Samarinda yang Unggul, Berbudaya dan Berdaya Saing', bg: 'rgba(245,200,50,0.12)', svg: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>' },
  { text: 'Mewujudkan Ekonomi Samarinda yang Inklusif, Mandiri dan Berkelanjutan', bg: 'rgba(52,211,153,0.12)', svg: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
  { text: 'Mewujudkan Infrastruktur yang Berkualitas dan Berkelanjutan', bg: 'rgba(96,165,250,0.12)', svg: '<rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4"/>' },
  { text: 'Mewujudkan Samarinda Layak Huni melalui Stabilitas Kamtibmas, Ketahanan Sosial Budaya dan Ekologis', bg: 'rgba(192,132,252,0.12)', svg: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
  { text: 'Mewujudkan Tata Kelola Pemerintahan Inovatif, Responsif dan Adaptif yang Berintegritas dan Akuntabel', bg: 'rgba(245,195,50,0.12)', svg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' }
]

const programUnggulan = [
  'Melanjutkan dan menuntaskan PROBEBAYA sebagai program pemberdayaan warga Kota Samarinda berbasis lingkungan RT',
  'Melanjutkan Pembangunan Sekolah Terpadu bertaraf International',
  'Melanjutkan dan meningkatkan program pengendalian banjir',
  'Melanjutkan dan menuntaskan Program Penanggulangan Masalah Sosial',
  'Melanjutkan dan menuntaskan Badan Usaha Milik RT',
  'Melanjutkan Pembangunan Penataan Tepian Sungai serta ruang publik berbasis kewilayahan'
]

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
onMounted(() => { window.addEventListener('scroll', handleScroll, { passive: true }); handleScroll() })
onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
.vm-page{font-family:'Poppins',sans-serif;background:#060e27;color:#fff;min-height:100vh}
.anim-target{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.anim-target.visible{opacity:1;transform:translateY(0)}

.page-hero{position:relative;padding:140px 48px 80px;overflow:hidden}
.hero-bg-pattern{position:absolute;inset:0;background-image:radial-gradient(rgba(245,195,50,.03) 1px,transparent 1px);background-size:28px 28px}
.hero-bg-pattern::after{content:'';position:absolute;bottom:0;left:0;right:0;height:60%;background:linear-gradient(to top,#060e27,transparent)}
.hero-inner{position:relative;z-index:1;max-width:800px;margin:0 auto;text-align:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 18px 7px 12px;background:rgba(245,195,50,.1);border:1px solid rgba(245,195,50,.25);border-radius:100px;font-size:12px;font-weight:600;color:#f5c832;margin-bottom:24px;animation:fadeUp .7s ease both}
.badge-dot{width:8px;height:8px;border-radius:50%;background:#f5c832;animation:pulse-dot 2s ease-in-out infinite}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
.hero-title{font-size:clamp(28px,4.2vw,48px);font-weight:900;color:#fff;line-height:1.15;letter-spacing:-.5px;margin-bottom:20px;animation:fadeUp .7s .1s ease both;opacity:0}
.hero-title span{background:linear-gradient(135deg,#f5c832,#f59e0b,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-desc{font-size:15px;font-weight:400;color:rgba(255,255,255,.6);line-height:1.8;margin-bottom:32px;animation:fadeUp .7s .2s ease both;opacity:0}
.hero-back{animation:fadeUp .7s .3s ease both;opacity:0}
.back-link{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);text-decoration:none;font-size:13px;font-weight:500;padding:8px 16px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);transition:all .25s}
.back-link:hover{color:#f5c832;border-color:rgba(245,195,50,.3);background:rgba(245,195,50,.08)}
.back-icon{width:16px;height:16px}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

.section-tag{display:inline-block;font-size:11px;font-weight:700;color:#f5c832;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:12px}
.section-title{font-size:clamp(22px,2.8vw,36px);font-weight:800;color:#fff;line-height:1.2}
.section-header{margin-bottom:44px}

/* Visi */
.visi-section{padding:0 48px}
.visi-container{max-width:1200px;margin:0 auto}
.visi-card{position:relative;background:rgba(245,195,50,.04);border:1px solid rgba(245,195,50,.12);border-radius:24px;padding:56px 48px;text-align:center;overflow:hidden}
.visi-card::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;border-radius:50%;background:rgba(245,195,50,.06);filter:blur(60px)}
.visi-card::after{content:'';position:absolute;bottom:-40px;left:-40px;width:160px;height:160px;border-radius:50%;background:rgba(245,195,50,.04);filter:blur(50px)}
.visi-label{display:inline-block;font-size:11px;font-weight:700;color:#f5c832;letter-spacing:3px;text-transform:uppercase;margin-bottom:24px;position:relative;z-index:1}
.visi-quote{position:relative;z-index:1;font-size:clamp(18px,2.5vw,28px);font-weight:800;color:#fff;line-height:1.4;font-style:normal;border:none;margin:0 0 28px;padding:0;letter-spacing:.5px}
.maju-breakdown{display:flex;justify-content:center;gap:12px;margin-bottom:28px;position:relative;z-index:1;flex-wrap:wrap}
.maju-item{display:flex;align-items:center;gap:8px;padding:8px 18px;background:rgba(245,195,50,.08);border:1px solid rgba(245,195,50,.15);border-radius:100px;transition:all .3s}
.maju-item:hover{background:rgba(245,195,50,.16);transform:translateY(-2px)}
.maju-letter{font-size:18px;font-weight:900;color:#f5c832}
.maju-word{font-size:13px;font-weight:600;color:rgba(255,255,255,.8)}
.visi-meta{display:flex;align-items:center;justify-content:center;gap:8px;color:rgba(255,255,255,.4);font-size:13px;position:relative;z-index:1}
.visi-meta-icon{width:16px;height:16px;opacity:.5}

/* Misi */
.misi-section{padding:80px 0 60px}
.misi-container{max-width:1200px;margin:0 auto;padding:0 48px}
.misi-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.misi-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:28px 24px;transition:all .4s cubic-bezier(.25,.46,.45,.94);position:relative;overflow:hidden}
.misi-card:hover{background:rgba(14,28,70,.55);transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.3);border-color:rgba(255,255,255,.12)}
.misi-num{font-size:36px;font-weight:900;color:rgba(255,255,255,.04);line-height:1;margin-bottom:14px;transition:color .3s}
.misi-card:hover .misi-num{color:rgba(245,195,50,.12)}
.misi-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:#fff}
.misi-icon-svg{width:20px;height:20px}
.misi-text{font-size:13.5px;font-weight:500;color:rgba(255,255,255,.65);line-height:1.75}

/* Program Unggulan */
.program-section{padding:60px 0 100px}
.program-container{max-width:1200px;margin:0 auto;padding:0 48px}
.program-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.program-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:24px 28px;display:flex;align-items:flex-start;gap:16px;transition:all .4s cubic-bezier(.25,.46,.45,.94)}
.program-card:hover{background:rgba(14,28,70,.55);transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,.3);border-color:rgba(255,255,255,.12)}
.pc-num{font-size:28px;font-weight:900;color:#f5c832;opacity:.3;flex-shrink:0;min-width:40px;line-height:1}
.pc-text{font-size:13.5px;font-weight:500;color:rgba(255,255,255,.65);line-height:1.75;margin:0}

.bottom-cta{padding:0 48px 100px}
.cta-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:32px;padding:40px 44px;border-radius:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07)}
.cta-text h3{font-size:20px;font-weight:700;color:#fff;margin-bottom:6px}
.cta-text p{font-size:14px;color:rgba(255,255,255,.5);line-height:1.6}
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:linear-gradient(135deg,#f5c832,#e6a817);color:#0a0f2e;font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:12px;border:none;cursor:pointer;transition:all .3s;white-space:nowrap;box-shadow:0 4px 20px rgba(245,195,50,.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(245,195,50,.45)}
.btn-icon{width:18px;height:18px;transition:transform .25s}
.btn-primary:hover .btn-icon{transform:translateX(3px)}

@media(max-width:1024px){
  .visi-section,.misi-container,.program-container,.bottom-cta{padding-left:24px;padding-right:24px}
  .visi-card{padding:40px 28px}
}
@media(max-width:768px){
  .page-hero{padding:120px 20px 60px}
  .misi-grid,.program-grid{grid-template-columns:1fr}
  .misi-section{padding:60px 0 40px}
  .program-section{padding:40px 0 80px}
  .misi-container,.program-container,.bottom-cta{padding-left:20px;padding-right:20px}
  .cta-inner{flex-direction:column;text-align:center;padding:32px 24px}
  .bottom-cta{padding-bottom:80px}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>