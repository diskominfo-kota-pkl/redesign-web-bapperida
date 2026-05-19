<template>
  <div class="pk-page">
    <section class="page-hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-inner">
        <div class="hero-badge"><span class="badge-dot"></span> PROFIL</div>
        <h1 class="hero-title">Profil<br><span>Kepala Badan</span></h1>
        <p class="hero-desc">Profil pimpinan tertinggi Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah Kota Samarinda.</p>
        <div class="hero-back">
          <a href="/" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="back-icon"><polyline points="15 18 9 12 15 6"/></svg>
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </section>

    <section class="pk-section">
      <div class="pk-container">
        <!-- Profile Card -->
        <div class="pk-card anim-target" data-delay="0">
          <div class="pk-left">
            <div class="pk-foto">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </div>
          <div class="pk-right">
            <div class="pk-badge">PLT. KEPALA BADAN</div>
            <h2 class="pk-nama">Marnabas, S.Sos., M.Si</h2>
            <p class="pk-jabatan">Plt. Kepala Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah Kota Samarinda</p>
            <div class="pk-meta">
              <div class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                <div><span class="meta-label">Pendidikan Terakhir</span><span class="meta-value">S2 Manajemen Kebijakan Publik (2003)</span></div>
              </div>
              <div class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <div><span class="meta-label">Masa Jabatan</span><span class="meta-value">27 Februari 2026 — 26 Mei 2026</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Riwayat Pendidikan -->
        <div class="riwayat-card anim-target" data-delay="1">
          <div class="section-tag">Akademik</div>
          <h3 class="section-title-sm">Riwayat Pendidikan</h3>
          <div class="edu-list">
            <div v-for="(e, i) in pendidikan" :key="i" class="edu-item">
              <span class="edu-num">{{ i + 1 }}</span>
              <span class="edu-text">{{ e }}</span>
            </div>
          </div>
        </div>

        <!-- Riwayat Pekerjaan -->
        <div class="riwayat-card anim-target" data-delay="2">
          <div class="section-tag">Karier</div>
          <h3 class="section-title-sm">Riwayat Pekerjaan</h3>
          <div class="kerja-timeline">
            <div v-for="(k, i) in pekerjaan" :key="i" class="kerja-item">
              <div class="timeline-dot"></div>
              <div v-if="i < pekerjaan.length - 1" class="timeline-line"></div>
              <div class="kerja-content">
                <span class="kerja-periode">{{ k.periode }}</span>
                <h4>{{ k.uraian }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bottom-cta anim-target" data-delay="0">
      <div class="cta-inner">
        <div class="cta-text">
          <h3>Butuh Informasi Lebih Lanjut?</h3>
          <p>Hubungi BAPPERIDA untuk informasi detail mengenai profil pimpinan.</p>
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

const pendidikan = [
  'TK',
  'SD (1981)',
  'SMP (1984)',
  'SMA (1987)',
  'S1 Administrasi Negara — Universitas (1994)',
  'S2 Manajemen Kebijakan Publik — Universitas (2003)'
]

const pekerjaan = [
  { periode: '2024 — Sekarang', uraian: 'Asisten Perekonomian dan Pembangunan' },
  { periode: '2026', uraian: 'Plt. Kepala Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah Kota Samarinda' }
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
.pk-page{font-family:'Poppins',sans-serif;background:#060e27;color:#fff;min-height:100vh}
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
.section-title-sm{font-size:20px;font-weight:800;color:#fff;margin-bottom:24px}

.pk-section{padding:0 0 100px}
.pk-container{max-width:1200px;margin:0 auto;padding:0 48px;display:flex;flex-direction:column;gap:24px}

.pk-card{display:flex;gap:32px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:24px;padding:40px;position:relative;overflow:hidden}
.pk-card::before{content:'';position:absolute;top:-40px;right:-40px;width:160px;height:160px;border-radius:50%;background:rgba(245,195,50,.06);filter:blur(50px)}
.pk-foto{width:180px;height:220px;border-radius:20px;background:linear-gradient(135deg,rgba(245,195,50,.1),rgba(245,195,50,.03));border:1px solid rgba(245,195,50,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pk-foto svg{width:64px;height:64px;color:rgba(245,195,50,.25)}
.pk-badge{display:inline-block;padding:5px 16px;background:linear-gradient(135deg,#f5c832,#e6a817);color:#0a0f2e;font-size:11px;font-weight:700;border-radius:100px;letter-spacing:1px;margin-bottom:14px}
.pk-nama{font-size:28px;font-weight:900;color:#fff;margin-bottom:8px;letter-spacing:-.3px}
.pk-jabatan{font-size:13px;color:rgba(255,255,255,.5);line-height:1.7;margin-bottom:24px;max-width:520px}
.pk-meta{display:flex;flex-direction:column;gap:12px}
.meta-item{display:flex;align-items:center;gap:12px}
.meta-item svg{width:20px;height:20px;color:#f5c832;flex-shrink:0;opacity:.7}
.meta-label{display:block;font-size:10px;font-weight:600;color:rgba(255,255,255,.3);letter-spacing:1px;text-transform:uppercase}
.meta-value{font-size:13px;font-weight:600;color:rgba(255,255,255,.8)}

.riwayat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:32px}

.edu-list{display:flex;flex-direction:column;gap:8px}
.edu-item{display:flex;align-items:center;gap:14px;padding:10px 16px;background:rgba(255,255,255,.02);border-radius:10px;transition:background .2s}
.edu-item:hover{background:rgba(255,255,255,.05)}
.edu-num{width:28px;height:28px;border-radius:8px;background:rgba(245,195,50,.1);color:#f5c832;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0}
.edu-text{font-size:13.5px;color:rgba(255,255,255,.7);font-weight:500}

.kerja-timeline{position:relative;padding-left:32px}
.kerja-item{position:relative;padding-bottom:28px}
.kerja-item:last-child{padding-bottom:0}
.timeline-dot{position:absolute;left:-32px;top:4px;width:14px;height:14px;border-radius:50%;background:rgba(245,195,50,.3);border:3px solid rgba(245,195,50,.15)}
.kerja-item:not(:last-child)::after{content:'';position:absolute;left:-26px;top:18px;width:2px;bottom:0;background:rgba(255,255,255,.06)}
.kerja-periode{font-size:11px;font-weight:700;color:#f5c832;letter-spacing:1px;text-transform:uppercase}
.kerja-content h4{font-size:14px;font-weight:600;color:rgba(255,255,255,.75);margin:4px 0 0}

.bottom-cta{padding:0 48px 100px}
.cta-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:32px;padding:40px 44px;border-radius:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07)}
.cta-text h3{font-size:20px;font-weight:700;color:#fff;margin-bottom:6px}
.cta-text p{font-size:14px;color:rgba(255,255,255,.5);line-height:1.6}
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:linear-gradient(135deg,#f5c832,#e6a817);color:#0a0f2e;font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:12px;border:none;cursor:pointer;transition:all .3s;white-space:nowrap;box-shadow:0 4px 20px rgba(245,195,50,.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(245,195,50,.45)}
.btn-icon{width:18px;height:18px;transition:transform .25s}
.btn-primary:hover .btn-icon{transform:translateX(3px)}

@media(max-width:1024px){.pk-container,.bottom-cta{padding-left:24px;padding-right:24px}}
@media(max-width:768px){
  .page-hero{padding:120px 20px 60px}
  .pk-container,.bottom-cta{padding-left:20px;padding-right:20px}
  .pk-card{flex-direction:column;align-items:center;text-align:center;padding:28px 20px}
  .pk-jabatan{max-width:100%}
  .pk-meta{align-items:center}
  .meta-item{text-align:left;width:100%;max-width:320px}
  .riwayat-card{padding:24px 16px}
  .cta-inner{flex-direction:column;text-align:center;padding:32px 24px}
  .bottom-cta{padding-bottom:80px}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>