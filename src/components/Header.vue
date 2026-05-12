<!-- TheHeader.vue -->
<template>
  <header class="main-header">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="container">
        <div class="top-bar-content">
          <div class="contact-info">
            <span class="contact-item">
              <i class="fas fa-phone"></i> 0541-203785
            </span>
            <span class="contact-item">
              <i class="fas fa-envelope"></i> bappedalitbang@samarindakota.go.id
            </span>
            <span class="contact-item">
              <i class="fas fa-map-marker-alt"></i> Jl. Dahlia No.81, Kel. Bugis, Kec. Samarinda Kota
            </span>
          </div>
          <div class="top-actions">
            <a href="https://mail.samarindakota.go.id" target="_blank" class="top-btn">
              <i class="fas fa-envelope-open"></i> Webmail
            </a>
            <a href="https://bapperida.samarindakota.go.id/kontak-kami" class="top-btn">
              <i class="fas fa-comments"></i> Kontak Kami
            </a>
            <a href="https://bapperida.samarindakota.go.id/oauth/sso/authorize" class="top-btn login">
              <i class="fas fa-sign-in-alt"></i> SSO Login
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="header-main">
      <div class="container">
        <div class="header-content">
          <router-link to="/" class="logo">
            <div class="logo-icon">
              <img src="https://bapperida.samarindakota.go.id/storage/Template/logo3.png" alt="Logo Bapperida">
            </div>
            <div class="logo-text">
              <span class="pemerintah">PEMERINTAH KOTA SAMARINDA</span>
              <h1>Bapperida</h1>
              <p>Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah</p>
            </div>
          </router-link>
          <button class="search-toggle" @click="toggleSearch">
            <i class="fas fa-search"></i>
          </button>
          <button class="menu-toggle" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="main-nav" :class="{ active: menuOpen }">
      <div class="container">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Beranda</router-link>
          </li>
          <li class="nav-item has-dropdown">
            <span class="nav-link">Profil <i class="fas fa-chevron-down"></i></span>
            <ul class="dropdown">
              <li><router-link to="/laman/visi-dan-misi">Visi dan Misi</router-link></li>
              <li><router-link to="/laman/tugas-pokok-dan-fungsi">Tugas Pokok dan Fungsi</router-link></li>
              <li><router-link to="/struktur-organisasi">Struktur Organisasi</router-link></li>
              <li><router-link to="/profil-pimpinan">Profil Pimpinan</router-link></li>
              <li><router-link to="/riwayat-pimpinan">Riwayat Pimpinan</router-link></li>
            </ul>
          </li>
          <li class="nav-item has-dropdown">
            <span class="nav-link">Bidang <i class="fas fa-chevron-down"></i></span>
            <ul class="dropdown">
              <li><router-link to="/bidang/kepala-dinas">Kepala Badan</router-link></li>
              <li><router-link to="/bidang/sekretariat">Sekretariat</router-link></li>
              <li><router-link to="/bidang/perencanaan">Bidang Perencanaan</router-link></li>
              <li><router-link to="/bidang/pemerintahan">Bidang Pemerintahan & Pembangunan Manusia</router-link></li>
              <li><router-link to="/bidang/perekonomian">Bidang Perekonomian & Infrastruktur</router-link></li>
              <li><router-link to="/bidang/riset">Bidang Riset dan Inovasi</router-link></li>
            </ul>
          </li>
          <li class="nav-item has-dropdown">
            <span class="nav-link">Berita & Informasi <i class="fas fa-chevron-down"></i></span>
            <ul class="dropdown">
              <li><router-link to="/agenda">Agenda</router-link></li>
              <li><router-link to="/pengumuman">Pengumuman</router-link></li>
              <li><router-link to="/artikel">Artikel</router-link></li>
              <li><router-link to="/berita-daerah">Berita Daerah</router-link></li>
              <li><router-link to="/berita-nasional">Berita Nasional</router-link></li>
              <li><router-link to="/rapat-koordinasi">Rapat Koordinasi</router-link></li>
              <li><router-link to="/siaran-pers">Siaran Pers</router-link></li>
              <li><router-link to="/jurnal">Jurnal</router-link></li>
              <li><router-link to="/litbang">Penelitian & Pengembangan</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link to="/media/foto" class="nav-link">Galeri</router-link>
          </li>
          <li class="nav-item has-dropdown">
            <span class="nav-link">PPID <i class="fas fa-chevron-down"></i></span>
            <ul class="dropdown">
              <li><router-link to="/pengadaan">Pengadaan Barang & Jasa</router-link></li>
              <li><router-link to="/unduhan/peraturan-keputusan-kebijakan">Peraturan & Keputusan</router-link></li>
              <li><router-link to="/unduhan/dokumen-sakip">Dokumen SAKIP</router-link></li>
              <li><router-link to="/unduhan/layanan-informasi">Informasi Berkala</router-link></li>
              <li><router-link to="/unduhan/informasi-serta-merta">Informasi Serta Merta</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link to="/kontak-kami" class="nav-link">Kontak</router-link>
          </li>
        </ul>
        <div class="search-box" :class="{ active: searchOpen }">
          <input type="text" placeholder="Pencarian...">
          <button><i class="fas fa-search"></i></button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
const searchOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const toggleSearch = () => {
  searchOpen.value = !searchOpen.value
}
</script>

<style scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 2px 15px rgba(0,0,0,0.08);
}

/* Top Bar */
.top-bar {
  background: linear-gradient(90deg, #003366 0%, #1a5276 100%);
  padding: 10px 0;
  font-size: 13px;
}

.top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-info {
  display: flex;
  gap: 25px;
  color: rgba(255,255,255,0.9);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-item i {
  color: #ff9900;
}

.top-actions {
  display: flex;
  gap: 10px;
}

.top-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  text-decoration: none;
  color: white;
  font-size: 12px;
  transition: all 0.3s;
  background: rgba(255,255,255,0.1);
}

.top-btn:hover {
  background: #ff9900;
}

.top-btn.login {
  background: #ff9900;
}

.top-btn.login:hover {
  background: #e68a00;
}

/* Main Header */
.header-main {
  padding: 20px 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
}

.logo-icon {
  width: 70px;
  height: 70px;
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.pemerintah {
  font-size: 11px;
  color: #003366;
  font-weight: 600;
  letter-spacing: 1px;
}

.logo-text h1 {
  font-size: 28px;
  color: #003366;
  font-weight: 700;
  line-height: 1;
}

.logo-text p {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.search-toggle, .menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 20px;
  color: #003366;
  cursor: pointer;
  padding: 10px;
}

.menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background: #003366;
  margin: 5px 0;
  border-radius: 2px;
}

/* Navigation */
.main-nav {
  background: #003366;
}

.main-nav .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 15px 18px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s;
}

.nav-link:hover {
  background: rgba(255,153,0,0.2);
  color: #ff9900;
}

.nav-link i {
  font-size: 10px;
}

/* Dropdown */
.has-dropdown:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 220px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  border-radius: 0 0 8px 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li a {
  display: block;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.3s;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown li a:hover {
  background: #f8f9fa;
  color: #003366;
  padding-left: 25px;
}

/* Search Box */
.search-box {
  display: flex;
  background: rgba(255,255,255,0.1);
  border-radius: 25px;
  overflow: hidden;
}

.search-box input {
  background: transparent;
  border: none;
  padding: 10px 15px;
  color: white;
  width: 180px;
  font-size: 13px;
}

.search-box input::placeholder {
  color: rgba(255,255,255,0.6);
}

.search-box button {
  background: #ff9900;
  border: none;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
}

.search-box.active {
  display: flex;
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-info {
    display: none;
  }
}

@media (max-width: 768px) {
  .top-actions {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .search-toggle {
    display: block;
  }

  .main-nav {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    transition: left 0.3s;
  }

  .main-nav.active {
    left: 0;
  }

  .nav-list {
    flex-direction: column;
  }

  .nav-item {
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .dropdown {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    background: rgba(0,0,0,0.2);
  }

  .search-box {
    display: none;
    margin-left: auto;
    margin-right: 20px;
  }

  .search-box.active {
    display: flex;
    margin: 10px 20px;
  }
}
</style>