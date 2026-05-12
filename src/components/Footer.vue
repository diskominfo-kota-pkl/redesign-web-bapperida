<!-- TheFooter.vue -->
<template>
  <footer class="main-footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">
          <!-- Logo & About -->
          <div class="footer-column about">
            <div class="footer-logo">
              <img src="https://bapperida.samarindakota.go.id/storage/Template/logo3.png" alt="Logo Bapperida">
              <div class="logo-text">
                <span class="pemerintah">PEMERINTAH KOTA SAMARINDA</span>
                <h3>Badan Perencanaan Pembangunan,<br>Riset dan Inovasi Daerah</h3>
              </div>
            </div>
            <p class="footer-desc">
              Website resmi Bapperida Kota Samarinda sebagai sumber informasi publik terkait perencanaan pembangunan, riset dan inovasi daerah.
            </p>
            <div class="social-media">
              <a href="https://facebook.com/bappedalitbang.smd" target="_blank" class="social-link" title="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/@bapp_smr" target="_blank" class="social-link" title="Twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/bapperida.kotasmr/" target="_blank" class="social-link" title="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@bapperida.samarinda" target="_blank" class="social-link" title="YouTube">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-column">
            <h4>Link Cepat</h4>
            <ul class="footer-links">
              <li><router-link to="/profil-pimpinan">Profil Pimpinan</router-link></li>
              <li><router-link to="/struktur-organisasi">Struktur Organisasi</router-link></li>
              <li><router-link to="/laman/visi-dan-misi">Visi dan Misi</router-link></li>
              <li><router-link to="/laman/tugas-pokok-dan-fungsi">Tugas Pokok dan Fungsi</router-link></li>
              <li><router-link to="/pengadaan">Pengadaan Barang & Jasa</router-link></li>
            </ul>
          </div>

          <!-- Services -->
          <div class="footer-column">
            <h4>Layanan</h4>
            <ul class="footer-links">
              <li><router-link to="/artikel">Artikel</router-link></li>
              <li><router-link to="/berita-daerah">Berita Daerah</router-link></li>
              <li><router-link to="/jurnal">Jurnal Riset</router-link></li>
              <li><router-link to="/litbang">Penelitian & Pengembangan</router-link></li>
              <li><router-link to="/galeri">Galeri Foto & Video</router-link></li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer-column contact">
            <h4>Kontak Kami</h4>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>Jl. Dahlia No.81, Kel. Bugis,<br>Kec. Samarinda Kota,<br>Kota Samarinda, Kalimantan Timur 75121</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <span>0541-203785</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>bappedalitbang@samarindakota.go.id</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-globe"></i>
              <span>bapperida.samarindakota.go.id</span>
            </div>
            <a href="tel:112" class="emergency-btn">
              <i class="fas fa-exclamation-triangle"></i> DARURAT: 112
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <div class="bottom-content">
          <p class="copyright">
            &copy; 2026 <strong>Bapperida Kota Samarinda</strong>. All Rights Reserved.
          </p>
          <div class="footer-badges">
            <span class="badge">Dispertahub Samarinda</span>
            <span class="badge">Pemerintah Kota Samarinda</span>
            <span class="badge">Kota Samarinda</span>
          </div>
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
.main-footer {
  background: linear-gradient(180deg, #002244 0%, #003366 100%);
  color: white;
}

.footer-top {
  padding: 60px 0 40px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 40px;
}

.footer-column h4 {
  font-size: 16px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ff9900;
  display: inline-block;
}

/* About Column */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.footer-logo img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.logo-text .pemerintah {
  font-size: 10px;
  letter-spacing: 1px;
  color: #ff9900;
}

.logo-text h3 {
  font-size: 16px;
  line-height: 1.3;
  margin-top: 5px;
}

.footer-desc {
  font-size: 13px;
  line-height: 1.7;
  color: rgba(255,255,255,0.8);
  margin-bottom: 20px;
}

/* Social Media */
.social-media {
  display: flex;
  gap: 10px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s;
}

.social-link:hover {
  background: #ff9900;
  transform: translateY(-3px);
}

/* Footer Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  font-size: 13px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.footer-links a::before {
  content: '›';
  margin-right: 8px;
  color: #ff9900;
  font-size: 16px;
}

.footer-links a:hover {
  color: #ff9900;
  padding-left: 5px;
}

/* Contact */
.contact-item {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
  font-size: 13px;
  color: rgba(255,255,255,0.8);
}

.contact-item i {
  color: #ff9900;
  margin-top: 3px;
}

.emergency-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #e74c3c;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 10px;
  transition: all 0.3s;
}

.emergency-btn:hover {
  background: #c0392b;
}

/* Footer Bottom */
.footer-bottom {
  background: rgba(0,0,0,0.2);
  padding: 20px 0;
}

.bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-size: 13px;
  color: rgba(255,255,255,0.7);
}

.copyright strong {
  color: #ff9900;
}

.footer-badges {
  display: flex;
  gap: 10px;
}

.footer-badges .badge {
  background: rgba(255,255,255,0.1);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 11px;
  color: rgba(255,255,255,0.8);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  
  .bottom-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .footer-badges {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>