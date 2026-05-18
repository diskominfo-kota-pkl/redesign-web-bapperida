<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo-row">
            <div class="logo-wrapper">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lambang_Kota_Samarinda.png/240px-Lambang_Kota_Samarinda.png" alt="Logo" class="logo-img" />
            </div>
            <div class="brand-text">
              <span class="brand-name">BAPPERIDA</span>
              <span class="brand-city">Kota Samarinda</span>
            </div>
          </div>
          <p class="footer-desc">Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah Kota Samarinda — Membangun Samarinda menuju Kota Pusat Peradaban.</p>
          <div class="footer-socials">
            <a href="#" class="social-icon" v-for="s in socials" :key="s.label" :aria-label="s.label">
              <svg viewBox="0 0 24 24" fill="currentColor" v-html="s.path"></svg>
            </a>
          </div>
        </div>
        <div class="footer-links-group" v-for="group in footerGroups" :key="group.title">
          <h4 class="footer-group-title">{{ group.title }}</h4>
          <a v-for="link in group.links" :key="link.label" :href="link.to" class="footer-link">{{ link.label }}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; {{ new Date().getFullYear() }} BAPPERIDA Kota Samarinda. Hak cipta dilindungi.</span>
        <div class="footer-bottom-links">
          <a href="#">Kebijakan Privasi</a>
          <a href="#">Syarat &amp; Ketentuan</a>
          <a href="#">Peta Situs</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { label: 'Facebook', path: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
  { label: 'Instagram', path: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
  { label: 'YouTube', path: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>' },
  { label: 'X/Twitter', path: '<path d="M4 4l16 16M20 4L4 20"/>' }
];

const footerGroups = [
  {
    title: 'Profil',
    links: [
      { label: '10 Program Unggulan', to: '/profil/10-program-unggulan' },
      { label: 'Dasar Hukum', to: '/profil/dasar-hukum' },
      { label: 'Visi & Misi', to: '/profil/visi-misi' },
      { label: 'Struktur Organisasi', to: '/profil/struktur-organisasi' },
      { label: 'Tupoksi', to: '/profil/tupoksi' },
      { label: 'Profil Kepala Badan', to: '/profil/profil-kepala' },
      { label: 'Sejarah Samarinda', to: '/profil/sejarah-samarinda' }
    ]
  },
  {
    title: 'Layanan',
    links: [
      { label: 'Maklumat Pelayanan', to: '/profil/maklumat-pelayanan' },
      { label: 'PPID Pelaksana', to: '/ppid' },
      { label: 'Pengadaan Barang/Jasa', to: '/ppid' },
      { label: 'Permohonan Informasi', to: '/ppid' },
      { label: 'Download Dokumen', to: '/artikel' },
      { label: 'FAQ', to: '#' }
    ]
  },
  {
    title: 'Berita',
    links: [
      { label: 'Berita Daerah', to: '/berita-daerah' },
      { label: 'Berita Nasional', to: '/berita-nasional' },
      { label: 'Artikel', to: '/artikel' },
      { label: 'Siaran Pers', to: '/siaran-pers' },
      { label: 'Galeri', to: '/galeri' },
      { label: 'Jurnal', to: '/jurnal' }
    ]
  },
  {
    title: 'Terkait',
    links: [
      { label: 'Pemkot Samarinda', to: '#' },
      { label: 'DPRD Samarinda', to: '#' },
      { label: 'BPS Kaltim', to: '#' },
      { label: 'Kemenkeu RI', to: '#' },
      { label: 'Kemendagri', to: '#' }
    ]
  }
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.footer {
  font-family: 'Poppins', sans-serif;
  background: #040a1e;
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 60px 0 0;
}
.footer-container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
.footer-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.footer-logo-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.logo-wrapper {
  width: 46px; height: 46px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  border: 2px solid rgba(245,195,50,0.5);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.logo-img { width: 34px; height: 34px; object-fit: contain; }
.brand-text { display: flex; flex-direction: column; line-height: 1.15; }
.brand-name { font-size: 15px; font-weight: 800; color: #fff; letter-spacing: 1.5px; }
.brand-city { font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.55); }
.footer-desc {
  font-size: 13px; font-weight: 400;
  color: rgba(255,255,255,0.4);
  line-height: 1.75; margin-bottom: 24px;
}
.footer-socials { display: flex; gap: 10px; }
.social-icon {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: all 0.25s;
}
.social-icon svg { width: 16px; height: 16px; }
.social-icon:hover {
  background: rgba(245,195,50,0.12);
  border-color: rgba(245,195,50,0.3);
  color: #f5c832;
  transform: translateY(-2px);
}
.footer-group-title { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 18px; }
.footer-links-group { display: flex; flex-direction: column; gap: 4px; }
.footer-link {
  font-size: 13px; font-weight: 400;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  padding: 4px 0;
  transition: color 0.2s, padding-left 0.2s;
}
.footer-link:hover { color: #f5c832; padding-left: 4px; }
.footer-bottom {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 0;
  font-size: 12px; font-weight: 400;
  color: rgba(255,255,255,0.3);
}
.footer-bottom-links { display: flex; gap: 24px; }
.footer-bottom-links a {
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-bottom-links a:hover { color: rgba(255,255,255,0.7); }

@media (max-width: 1200px) {
  .footer-top { grid-template-columns: 1fr 1fr 1fr; }
  .footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 768px) {
  .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
  .footer-brand { grid-column: 1 / -1; }
  .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
}
@media (max-width: 480px) {
  .footer-top { grid-template-columns: 1fr; }
  .footer-brand { grid-column: auto; }
}
@media (max-width: 1024px) {
  .footer-container { padding: 0 24px; }
}
</style>