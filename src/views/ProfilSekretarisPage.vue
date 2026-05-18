<template>
  <div class="ps-page">
    <section class="page-hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-inner">
        <div class="hero-badge"><span class="badge-dot"></span> PROFIL</div>
        <h1 class="hero-title">Profil<br><span>Sekretaris</span></h1>
        <p class="hero-desc">Profil Sekretaris Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah Kota Samarinda.</p>
        <div class="hero-back">
          <a href="/" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="back-icon"><polyline points="15 18 9 12 15 6"/></svg>
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </section>

    <section class="ps-section">
      <div class="ps-container">
        <div class="ps-placeholder anim-target" data-delay="0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="placeholder-icon"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          <h3>Data Belum Tersedia</h3>
          <p>Profil Sekretaris BAPPERIDA Kota Samarinda akan ditampilkan setelah data diperbarui.</p>
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
.ps-page{font-family:'Poppins',sans-serif;background:#060e27;color:#fff;min-height:100vh}
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
.hero-title span{background:linear-gradient(135deg,#60a5fa,#3b82f6,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-desc{font-size:15px;font-weight:400;color:rgba(255,255,255,.6);line-height:1.8;margin-bottom:32px;animation:fadeUp .7s .2s ease both;opacity:0}
.hero-back{animation:fadeUp .7s .3s ease both;opacity:0}
.back-link{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);text-decoration:none;font-size:13px;font-weight:500;padding:8px 16px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);transition:all .25s}
.back-link:hover{color:#f5c832;border-color:rgba(245,195,50,.3);background:rgba(245,195,50,.08)}
.back-icon{width:16px;height:16px}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

.ps-section{padding:0 0 100px}
.ps-container{max-width:1200px;margin:0 auto;padding:0 48px}
.ps-placeholder{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:24px;padding:80px 40px;text-align:center}
.placeholder-icon{width:48px;height:48px;color:rgba(255,255,255,.2);margin-bottom:20px}
.ps-placeholder h3{font-size:20px;font-weight:700;color:#fff;margin-bottom:10px}
.ps-placeholder p{font-size:14px;color:rgba(255,255,255,.45);line-height:1.7;max-width:400px;margin:0 auto}

@media(max-width:768px){
  .page-hero{padding:120px 20px 60px}
  .ps-container{padding:0 20px}
  .ps-placeholder{padding:60px 24px}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>