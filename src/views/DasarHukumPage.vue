<template>
  <div class="dh-page">
    <section class="page-hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-inner">
        <div class="hero-badge"><span class="badge-dot"></span> PROFIL</div>
        <h1 class="hero-title">Dasar<br><span>Hukum</span></h1>
        <p class="hero-desc">Landasan hukum yang menjadi acuan dalam penyelenggaraan tugas dan fungsi BAPPERIDA Kota Samarinda.</p>
        <div class="hero-back">
          <a href="/" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="back-icon"><polyline points="15 18 9 12 15 6"/></svg>
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </section>

    <section class="dh-section">
      <div class="dh-container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-tag">Regulasi</div>
            <h2 class="section-title">Dasar Hukum BAPPERIDA</h2>
          </div>
        </div>

        <div class="dh-list">
          <div
            v-for="(item, i) in dasarHukum"
            :key="i"
            class="dh-item anim-target"
            :data-delay="(i % 3) + 1"
          >
            <span class="dh-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <p class="dh-text">{{ item }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bottom-cta anim-target" data-delay="0">
      <div class="cta-inner">
        <div class="cta-text">
          <h3>Butuh Informasi Lebih Lengkap?</h3>
          <p>Hubungi BAPPERIDA untuk mendapatkan salinan dokumen regulasi terbaru.</p>
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

const dasarHukum = [
  'Pasal 18 ayat (6) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945;',
  'Undang-Undang Nomor 27 Tahun 1959 tentang Penetapan Undang-Undang Darurat Nomor 3 Tahun 1953 tentang Pembentukan Daerah Tingkat II di Kalimantan (Lembaran Negara Republik Indonesia Tahun 1953 Nomor 9) Sebagai Undang-Undang (Lembaran Negara Republik Indonesia Tahun 1959, Tambahan Lembaran Negara Republik Indonesia Nomor 1820);',
  'Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah (Lembaran Negara Republik Indonesia Tahun 2014 Nomor 244, Tambahan Lembaran Negara Republik Indonesia Nomor 5587);',
  'Peraturan Pemerintah Nomor 18 Tahun 2016 tentang Perangkat Daerah (Lembaran Negara Republik Indonesia Tahun 2016 Nomor 114, Tambahan Lembaran Negara Republik Indonesia Nomor 5887);',
  'Peraturan Daerah Kota Samarinda Nomor 3 Tahun 2016 tentang Urusan Pemerintahan Konkuren Yang Menjadi Kewenangan Daerah (Lembaran Daerah Kota Samarinda Tahun 2016 Nomor 3);',
  'Peraturan Pemerintah Nomor 11 Tahun 2017 tentang Manajemen Pegawai Negeri Sipil (Lembaran Negara Republik Indonesia Tahun 2017 Nomor 63, Tambahan Lembaran Negara Republik Indonesia Nomor 6037);',
  'Peraturan Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi Republik Indonesia Nomor 17 Tahun 2021 tentang Penyetaraan Jabatan Administrasi ke Dalam Jabatan Fungsional (Berita Negara Republik Indonesia Tahun 2021 Nomor 525);',
  'Peraturan Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi Republik Indonesia Nomor 25 Tahun 2021 tentang Penyederhanaan Struktur Organisasi pada Instansi Pemerintah untuk Penyederhanaan Birokrasi (Berita Negara Republik Indonesia Tahun 2021 Nomor 546);',
  'Peraturan Daerah Kota Samarinda Nomor 4 Tahun 2016 tentang Pembentukan dan Susunan Perangkat Daerah (Lembaran Daerah Kota Samarinda Tahun 2016 Nomor 4).'
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
.dh-page{font-family:'Poppins',sans-serif;background:#060e27;color:#fff;min-height:100vh}
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

.dh-section{padding:0 0 100px}
.dh-container{max-width:1200px;margin:0 auto;padding:0 48px}
.dh-list{display:flex;flex-direction:column;gap:12px}

.dh-item{
  display:flex;align-items:flex-start;gap:20px;
  background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);
  border-radius:16px;padding:22px 28px;
  transition:all .4s cubic-bezier(.25,.46,.45,.94);
}
.dh-item:hover{background:rgba(14,28,70,.55);border-color:rgba(255,255,255,.12);transform:translateX(4px)}
.dh-num{
  font-size:18px;font-weight:900;color:#f5c832;
  min-width:32px;opacity:.6;flex-shrink:0;
  padding-top:1px;
}
.dh-text{font-size:14px;font-weight:400;color:rgba(255,255,255,.65);line-height:1.75;margin:0}

.bottom-cta{padding:0 48px 100px}
.cta-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:32px;padding:40px 44px;border-radius:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07)}
.cta-text h3{font-size:20px;font-weight:700;color:#fff;margin-bottom:6px}
.cta-text p{font-size:14px;color:rgba(255,255,255,.5);line-height:1.6}
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:linear-gradient(135deg,#f5c832,#e6a817);color:#0a0f2e;font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:12px;border:none;cursor:pointer;transition:all .3s;white-space:nowrap;box-shadow:0 4px 20px rgba(245,195,50,.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(245,195,50,.45)}
.btn-icon{width:18px;height:18px;transition:transform .25s}
.btn-primary:hover .btn-icon{transform:translateX(3px)}

@media(max-width:1024px){.dh-container,.bottom-cta{padding-left:24px;padding-right:24px}}
@media(max-width:768px){
  .page-hero{padding:120px 20px 60px}
  .dh-container,.bottom-cta{padding-left:20px;padding-right:20px}
  .dh-item{flex-direction:column;gap:8px;padding:18px 20px}
  .dh-num{min-width:auto}
  .cta-inner{flex-direction:column;text-align:center;padding:32px 24px}
  .bottom-cta{padding-bottom:80px}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>