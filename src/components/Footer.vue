<!-- TheFooter.vue -->
<template>
  <footer class="app-footer">
    <!-- Wave -->
    <div class="footer-wave">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,30 1440,60 L1440,100 L0,100 Z" fill="#0C1F14"/>
        <path d="M0,75 C360,95 720,55 1080,80 C1260,90 1380,70 1440,80 L1440,100 L0,100 Z" fill="#0F1A14"/>
      </svg>
    </div>

    <div class="footer-main">
      <!-- Dekorasi -->
      <div class="footer-glow footer-glow--1"></div>
      <div class="footer-glow footer-glow--2"></div>

      <div class="footer-inner">
        <!-- Brand -->
        <div class="footer-col footer-col--brand">
          <div class="footer-brand">
            <div class="footer-brand-icon">
              <svg viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="url(#f-grad)"/><path d="M20 8L12 16H16V30H24V16H28L20 8Z" fill="#0A2E1A" opacity=".9"/><path d="M14 22H26V32H14V22Z" fill="#0A2E1A" opacity=".6"/><defs><linearGradient id="f-grad" x1="0" y1="0" x2="40" y2="40"><stop stop-color="#F0D98A"/><stop offset="1" stop-color="#D4A843"/></linearGradient></defs></svg>
            </div>
            <div>
              <div class="footer-brand-title">BAPPERIDA</div>
              <div class="footer-brand-sub">Kota Samarinda</div>
            </div>
          </div>
          <p class="footer-desc">
            Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah — merencanakan pembangunan berkelanjutan untuk masyarakat Kota Samarinda di tepian Sungai Mahakam.
          </p>
          <div class="footer-socials">
            <a href="#" class="footer-social" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="footer-social" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="footer-social" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="#" class="footer-social" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
          </div>
        </div>

        <!-- Navigasi -->
        <div class="footer-col">
          <h4 class="footer-heading">Navigasi</h4>
          <ul class="footer-links">
            <li v-for="link in navMain" :key="link.to">
              <router-link :to="link.to">{{ link.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Kontak -->
        <div class="footer-col">
          <h4 class="footer-heading">Hubungi Kami</h4>
          <ul class="footer-contact">
            <li><i class="fas fa-map-marker-alt"></i><span>Jl. Dahlia No.81, Kel. Bugis, Kec. Samarinda Kota, Kalimantan Timur</span></li>
            <li><i class="fas fa-phone-alt"></i><span>0541-203785</span></li>
            <li><i class="fas fa-envelope"></i><span>bappedalitbang@samarindakota.go.id</span></li>
            <li><i class="fas fa-globe"></i><a href="https://bapperida.samarindakota.go.id" target="_blank" rel="noopener">bapperida.samarindakota.go.id</a></li>
          </ul>
        </div>

        <!-- Tautan -->
        <div class="footer-col">
          <h4 class="footer-heading">Tautan Terkait</h4>
          <ul class="footer-links">
            <li><a href="https://samarindakota.go.id" target="_blank" rel="noopener">Pemkot Samarinda</a></li>
            <li><a href="https://kaltimprov.go.id" target="_blank" rel="noopener">Pemprov Kaltim</a></li>
            <li><a href="https://ikn.go.id" target="_blank" rel="noopener">IKN Nusantara</a></li>
            <li><a href="https://kemendagri.go.id" target="_blank" rel="noopener">Kemendagri RI</a></li>
            <li><a href="https://www.bps.go.id" target="_blank" rel="noopener">BPS Indonesia</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <div class="footer-bottom-left">
          <span class="footer-copy">&copy; 2025 BAPPERIDA Kota Samarinda</span>
          <span class="footer-sep">|</span>
          <span class="footer-kemendagri">Kemendagri Republik Indonesia</span>
        </div>
        <div class="footer-bottom-right">
          <a href="#">Kebijakan Privasi</a>
          <a href="#">Peta Situs</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navMain = [
  { label: 'Beranda', to: '/' },
  { label: 'Artikel', to: '/artikel' },
  { label: 'Berita Daerah', to: '/berita-daerah' },
  { label: 'Berita Nasional', to: '/berita-nasional' },
  { label: 'Siaran Pers', to: '/siaran-pers' },
  { label: 'Jurnal', to: '/jurnal' },
  { label: 'Penelitian', to: '/penelitian' },
  { label: 'Galeri', to: '/galeri' },
  { label: 'Profil Kepala', to: '/profil-kepala' }
]
</script>

<style scoped>
:root{
  --g900:#0A2E1A;--g800:#143D26;--g700:#1B5E30;--g600:#237A3E;
  --g500:#2E964F;--g400:#4CB872;--g300:#7DD4A0;--g200:#B5E6C8;
  --g100:#E0F3E8;--g50:#F0FAF3;
  --gold:#D4A843;--gold-light:#E2C36B;--gold-pale:#F0D98A;
  --dark:#0F1A14;
  --gr6:#556159;--gr5:#6B7A72;--gr4:#8A9992;--gr3:#B0BDB7;
  --gr2:#D4DDD9;--gr1:#E8EDEB;--gr0:#F4F7F6;
}
*{margin:0;padding:0;box-sizing:border-box}

.footer-wave{line-height:0;margin-bottom:-2px}
.footer-wave svg{width:100%;height:70px;display:block}

.footer-main{
  background:var(--dark);position:relative;overflow:hidden;
  padding:56px 0 40px;
}
.footer-glow{
  position:absolute;border-radius:50%;pointer-events:none;
}
.footer-glow--1{
  width:500px;height:500px;top:-200px;right:-150px;
  background:radial-gradient(circle,rgba(46,150,79,.06) 0%,transparent 70%);
}
.footer-glow--2{
  width:400px;height:400px;bottom:-100px;left:-100px;
  background:radial-gradient(circle,rgba(212,168,67,.04) 0%,transparent 70%);
}

.footer-inner{
  max-width:1280px;margin:0 auto;padding:0 24px;
  display:grid;grid-template-columns:1.4fr .85fr 1fr .85fr;gap:44px;
  position:relative;z-index:1;
}

/* Brand */
.footer-brand{display:flex;align-items:center;gap:12px;margin-bottom:20px}
.footer-brand-icon{width:38px;height:38px;flex-shrink:0}
.footer-brand-icon svg{width:100%;height:100%;display:block}
.footer-brand-title{
  font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;
  color:#fff;line-height:1.15;
}
.footer-brand-sub{font-size:.58rem;color:var(--gr4);letter-spacing:2.5px;text-transform:uppercase;font-weight:500}
.footer-desc{font-size:.8rem;color:var(--gr4);line-height:1.75;margin-bottom:22px}
.footer-socials{display:flex;gap:8px}
.footer-social{
  width:36px;height:36px;border-radius:10px;
  border:1px solid rgba(255,255,255,.06);
  display:flex;align-items:center;justify-content:center;
  color:var(--gr4);font-size:.82rem;text-decoration:none;
  transition:all .3s ease;background:transparent;
}
.footer-social:hover{
  background:var(--g700);color:#fff;border-color:var(--g700);
  transform:translateY(-3px);box-shadow:0 4px 16px rgba(27,94,48,.3);
}

/* Heading */
.footer-heading{
  font-size:.7rem;font-weight:700;color:#fff;
  text-transform:uppercase;letter-spacing:2.5px;
  margin-bottom:22px;position:relative;padding-bottom:14px;
}
.footer-heading::after{
  content:'';position:absolute;bottom:0;left:0;
  width:22px;height:2px;background:var(--gold);border-radius:99px;
}

/* Links */
.footer-links{list-style:none;display:flex;flex-direction:column;gap:7px}
.footer-links a{
  color:var(--gr4);text-decoration:none;font-size:.79rem;
  transition:all .25s ease;display:flex;align-items:center;gap:8px;
}
.footer-links a::before{
  content:'';width:3px;height:3px;border-radius:50%;
  background:var(--gr6);transition:all .25s ease;flex-shrink:0;
}
.footer-links a:hover{color:var(--g300);transform:translateX(4px)}
.footer-links a:hover::before{background:var(--g400);width:5px;height:5px}

/* Contact */
.footer-contact{list-style:none;display:flex;flex-direction:column;gap:16px}
.footer-contact li{
  display:flex;align-items:flex-start;gap:12px;
  font-size:.79rem;color:var(--gr4);line-height:1.55;
}
.footer-contact li i{
  color:var(--g400);font-size:.72rem;margin-top:4px;
  flex-shrink:0;width:16px;text-align:center;
}
.footer-contact a{color:var(--gr3);text-decoration:none;transition:color .25s ease}
.footer-contact a:hover{color:var(--gold-light)}

/* Bottom */
.footer-bottom{
  background:rgba(0,0,0,.3);border-top:1px solid rgba(255,255,255,.04);
  padding:18px 0;
}
.footer-bottom-inner{
  max-width:1280px;margin:0 auto;padding:0 24px;
  display:flex;align-items:center;justify-content:space-between;gap:16px;
}
.footer-bottom-left{display:flex;align-items:center;gap:10px;font-size:.7rem;color:var(--gr5)}
.footer-copy{color:var(--gr4)}
.footer-sep{color:rgba(255,255,255,.08)}
.footer-kemendagri{color:var(--gr5);font-weight:500;letter-spacing:.5px}
.footer-bottom-right{display:flex;gap:20px}
.footer-bottom-right a{color:var(--gr5);text-decoration:none;font-size:.7rem;transition:color .25s ease}
.footer-bottom-right a:hover{color:var(--g300)}

@media(max-width:1024px){
  .footer-inner{grid-template-columns:1fr 1fr;gap:32px}
}
@media(max-width:640px){
  .footer-inner{grid-template-columns:1fr;gap:28px}
  .footer-bottom-inner{flex-direction:column;text-align:center;gap:10px}
  .footer-bottom-left{flex-direction:column;gap:4px}
  .footer-bottom-right{justify-content:center}
  .footer-wave svg{height:45px}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{transition-duration:.01ms!important;animation-duration:.01ms!important}
}
</style>