<!-- TheFooter.vue -->
<template>
  <footer class="app-footer">
    <!-- Wave Separator -->
    <div class="footer-wave">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#0F1A14"/>
      </svg>
    </div>

    <div class="footer-main">
      <div class="footer-inner">
        <!-- Kolom 1: Brand -->
        <div class="footer-col footer-col--brand">
          <div class="footer-brand">
            <div class="footer-brand-icon"><span>B</span></div>
            <div>
              <div class="footer-brand-title">BAPPERIDA</div>
              <div class="footer-brand-sub">Kota Samarinda</div>
            </div>
          </div>
          <p class="footer-desc">
            Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah Kota Samarinda — merencanakan pembangunan yang berkelanjutan untuk masyarakat tepian.
          </p>
          <div class="footer-socials">
            <a href="#" class="footer-social" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="footer-social" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="footer-social" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
            <a href="#" class="footer-social" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
          </div>
        </div>

        <!-- Kolom 2: Navigasi -->
        <div class="footer-col">
          <h4 class="footer-heading">Navigasi</h4>
          <ul class="footer-links">
            <li v-for="link in navLinks" :key="link.to">
              <router-link :to="link.to">{{ link.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Kolom 3: Kontak -->
        <div class="footer-col">
          <h4 class="footer-heading">Kontak Kami</h4>
          <ul class="footer-contact">
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <span>Jl. Dahlia No.81, Kel. Bugis, Kec. Samarinda Kota</span>
            </li>
            <li>
              <i class="fas fa-phone-alt"></i>
              <span>0541-203785</span>
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              <span>bappedalitbang@samarindakota.go.id</span>
            </li>
            <li>
              <i class="fas fa-globe"></i>
              <a href="https://bapperida.samarindakota.go.id" target="_blank" rel="noopener">
                bapperida.samarindakota.go.id
              </a>
            </li>
          </ul>
        </div>

        <!-- Kolom 4: Terkait -->
        <div class="footer-col">
          <h4 class="footer-heading">Tautan Terkait</h4>
          <ul class="footer-links">
            <li><a href="https://samarindakota.go.id" target="_blank" rel="noopener">Pemkot Samarinda</a></li>
            <li><a href="https://kaltimprov.go.id" target="_blank" rel="noopener">Pemprov Kaltim</a></li>
            <li><a href="https://ikn.go.id" target="_blank" rel="noopener">IKN Nusantara</a></li>
            <li><a href="https://bungkarangka.bps.go.id" target="_blank" rel="noopener">BPS Samarinda</a></li>
            <li><a href="https://kemendagri.go.id" target="_blank" rel="noopener">Kemendagri RI</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <span>&copy; 2025 BAPPERIDA Kota Samarinda. Hak Cipta Dilindungi.</span>
        <div class="footer-bottom-links">
          <a href="#">Kebijakan Privasi</a>
          <a href="#">Syarat & Ketentuan</a>
          <a href="#">Peta Situs</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navLinks = [
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
/* ========== VARIABEL ========== */
:root {
  --g900: #0A2E1A; --g800: #143D26; --g700: #1B5E30;
  --g600: #237A3E; --g500: #2E964F; --g400: #4CB872;
  --g300: #7DD4A0; --g200: #B5E6C8; --g100: #E0F3E8; --g50: #F0FAF3;
  --gold: #D4A843; --gold-light: #E2C36B;
  --dark: #0F1A14;
  --gray-600: #556159; --gray-500: #6B7A72;
  --gray-400: #8A9992; --gray-300: #B0BDB7;
}

/* ========== WAVE ========== */
.footer-wave {
  line-height: 0;
  margin-bottom: -2px;
}
.footer-wave svg {
  width: 100%;
  height: 60px;
  display: block;
}

/* ========== FOOTER MAIN ========== */
.footer-main {
  background: var(--dark);
  padding: 48px 0 36px;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.4fr 0.9fr 1fr 0.9fr;
  gap: 40px;
}

/* ========== BRAND COL ========== */
.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}
.footer-brand-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--gold-light), var(--gold));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(212,168,67,0.25);
  flex-shrink: 0;
}
.footer-brand-icon span {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--g900);
}
.footer-brand-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.15;
}
.footer-brand-sub {
  font-size: 0.6rem;
  color: var(--gray-400);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
}
.footer-desc {
  font-size: 0.8rem;
  color: var(--gray-400);
  line-height: 1.7;
  margin-bottom: 20px;
}
.footer-socials {
  display: flex;
  gap: 8px;
}
.footer-social {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  font-size: 0.82rem;
  text-decoration: none;
  transition: all 0.3s ease;
}
.footer-social:hover {
  background: var(--g700);
  color: #fff;
  border-color: var(--g700);
  transform: translateY(-2px);
}

/* ========== HEADING ========== */
.footer-heading {
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 12px;
}
.footer-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 24px;
  height: 2px;
  background: var(--gold);
  border-radius: 99px;
}

/* ========== LINKS ========== */
.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.footer-links a {
  color: var(--gray-400);
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}
.footer-links a::before {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gray-600);
  transition: all 0.25s ease;
  flex-shrink: 0;
}
.footer-links a:hover {
  color: var(--g300);
  transform: translateX(4px);
}
.footer-links a:hover::before {
  background: var(--g400);
}

/* ========== KONTAK ========== */
.footer-contact {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.footer-contact li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 0.8rem;
  color: var(--gray-400);
  line-height: 1.5;
}
.footer-contact li i {
  color: var(--g400);
  font-size: 0.75rem;
  margin-top: 4px;
  flex-shrink: 0;
  width: 16px;
  text-align: center;
}
.footer-contact a {
  color: var(--gray-300);
  text-decoration: none;
  transition: color 0.25s ease;
}
.footer-contact a:hover { color: var(--gold-light); }

/* ========== BOTTOM BAR ========== */
.footer-bottom {
  background: rgba(0,0,0,0.25);
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 20px 0;
}
.footer-bottom-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 0.72rem;
  color: var(--gray-500);
}
.footer-bottom-links {
  display: flex;
  gap: 20px;
}
.footer-bottom-links a {
  color: var(--gray-500);
  text-decoration: none;
  transition: color 0.25s ease;
}
.footer-bottom-links a:hover { color: var(--g300); }

/* ========== RESPONSIVE ========== */
@media (max-width: 1024px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 640px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .footer-bottom-inner {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  .footer-bottom-links { justify-content: center; }
  .footer-wave svg { height: 40px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>