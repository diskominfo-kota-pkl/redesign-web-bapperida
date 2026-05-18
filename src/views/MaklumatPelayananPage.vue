<template>
  <div class="mp-page">
    <section class="page-hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-inner">
        <div class="hero-badge"><span class="badge-dot"></span> PROFIL</div>
        <h1 class="hero-title">Maklumat<br><span>Pelayanan</span></h1>
        <p class="hero-desc">Maklumat pelayanan BAPPERIDA Kota Samarinda sesuai standar pelayanan publik.</p>
        <div class="hero-back">
          <a href="/" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="back-icon"><polyline points="15 18 9 12 15 6"/></svg>
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </section>

    <section class="mp-section">
      <div class="mp-container">
        <div class="mp-img-wrap anim-target" data-delay="0">
          <!-- ═══ GANTI DIV INI DENGAN TAG IMG ═══ -->
          <!-- Contoh: <img src="/path/to/maklumat.jpg" alt="Maklumat Pelayanan" class="mp-img" /> -->
          <div class="mp-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="mp-ph-icon"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            <p>Gambar Maklumat Pelayanan<br><span>akan ditampilkan di sini</span></p>
          </div>
          <!-- ═══ SAMPAI SINI ═══ -->
        </div>

        <div class="mp-note anim-target" data-delay="1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="note-icon"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          <p>Gambar maklumat pelayanan akan ditampilkan setelah dokumen diperbarui. Untuk sementara, hubungi BAPPERIDA untuk informasi maklumat pelayanan terbaru.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
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
.mp-page{font-family:'Poppins',sans-serif;background:#060e27;color:#fff;min-height:100vh}
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

.mp-section{padding:0 0 100px}
.mp-container{max-width:1200px;margin:0 auto;padding:0 48px;display:flex;flex-direction:column;gap:24px}

.mp-img-wrap{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:24px;padding:48px;overflow:hidden}
.mp-img{width:100%;height:auto;border-radius:16px;display:block}
.mp-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:500px;border:2px dashed rgba(255,255,255,.08);border-radius:16px}
.mp-ph-icon{width:56px;height:56px;color:rgba(255,255,255,.15);margin-bottom:20px}
.mp-placeholder p{font-size:16px;font-weight:600;color:rgba(255,255,255,.3);text-align:center;line-height:1.6;margin:0}
.mp-placeholder span{font-size:13px;font-weight:400;color:rgba(255,255,255,.18);display:block;margin-top:6px}

.mp-note{display:flex;align-items:flex-start;gap:12px;padding:18px 24px;background:rgba(245,195,50,.06);border:1px solid rgba(245,195,50,.12);border-radius:14px;color:rgba(255,255,255,.65);font-size:13px;line-height:1.7}
.note-icon{width:20px;height:20px;color:#f5c832;flex-shrink:0;margin-top:2px}
.mp-note p{margin:0}

@media(max-width:768px){
  .page-hero{padding:120px 20px 60px}
  .mp-container{padding:0 20px}
  .mp-img-wrap{padding:24px 16px}
  .mp-placeholder{min-height:300px}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>