<template>
  <div class="header-wrapper">
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="navbar-brand">
        <div class="logo-wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lambang_Kota_Samarinda.png/240px-Lambang_Kota_Samarinda.png"
            alt="Logo BAPPERIDA Samarinda"
            class="logo-img"
          />
        </div>
        <div class="brand-text">
          <span class="brand-name">BAPPERIDA</span>
          <span class="brand-city">Kota Samarinda</span>
        </div>
      </div>

      <ul class="nav-links">
        <li
          v-for="(link, i) in navLinks"
          :key="i"
          :class="{ 'has-dropdown': link.dropdown }"
          @mouseenter="link.dropdown && (activeNav = i)"
          @mouseleave="link.dropdown && (activeNav = -1)"
        >
          <router-link
            :to="link.to"
            class="nav-link"
            :class="{ active: activeNav === i }"
            @click="mobileOpen = false"
          >
            {{ link.label }}
            <svg v-if="link.dropdown" class="chevron" :class="{ rotated: activeNav === i }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </router-link>

          <Transition name="dropdown">
            <div v-if="link.dropdown && activeNav === i" class="dropdown-panel">
              <router-link
                v-for="(sub, j) in link.subs"
                :key="j"
                :to="sub.to"
                class="dropdown-item"
                @click="activeNav = -1"
              >
                <span class="dropdown-dot"></span>
                {{ sub.label }}
              </router-link>
            </div>
          </Transition>
        </li>
      </ul>

      <div class="navbar-right">
        <div class="lang-switch">
          <span class="lang" :class="{ 'lang-active': lang === 'id' }" @click="lang = 'id'">ID</span>
          <span class="lang-divider">/</span>
          <span class="lang" :class="{ 'lang-active': lang === 'en' }" @click="lang = 'en'">EN</span>
        </div>
        <router-link to="/" class="btn-akses">
          <span>Akses Layanan</span>
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </router-link>
      </div>

      <button class="hamburger" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition name="mobileMenu">
      <div class="mobile-menu" v-if="mobileOpen">
        <router-link
          v-for="(link, i) in navLinks"
          :key="i"
          :to="link.to"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </router-link>
        <div class="mobile-menu-bottom">
          <div class="lang-switch mobile-lang">
            <span class="lang" :class="{ 'lang-active': lang === 'id' }" @click="lang = 'id'">ID</span>
            <span class="lang-divider">/</span>
            <span class="lang" :class="{ 'lang-active': lang === 'en' }" @click="lang = 'en'">EN</span>
          </div>
          <router-link to="/" class="btn-akses mobile-btn">Akses Layanan</router-link>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const mobileOpen = ref(false);
const lang = ref('id');
const activeNav = ref(-1);
const isScrolled = ref(false);

const navLinks = [
  {
    label: 'Beranda',
    to: '/'
  },
  {
    label: 'Profil',
    to: '/profil/10-program-unggulan',
    dropdown: true,
    subs: [
      { label: '10 Program Unggulan Walikota Samarinda', to: '/profil/10-program-unggulan' },
      { label: 'Dasar Hukum', to: '/profil/dasar-hukum' },
      { label: 'Visi & Misi', to: '/profil/visi-misi' },
      { label: 'Struktur Organisasi', to: '/profil/struktur-organisasi' },
      { label: 'Tupoksi', to: '/profil/tupoksi' },
      { label: 'Profil Kepala Badan', to: '/profil-kepala' },
      { label: 'Profil Sekretaris', to: '/profil/sekretaris' },
      { label: 'Maklumat Pelayanan', to: '/profil/maklumat-pelayanan' },
      { label: 'Sejarah Samarinda', to: '/profil/sejarah-samarinda' },
    ]
  },
  {
    label: 'Bidang',
    to: '/bidang/perencanaan',
    dropdown: true,
    subs: [
      { label: 'Kepala Badan', to: '/profil-kepala' },
      { label: 'Sekretariat', to: '/bidang/sekretariat' },
      { label: 'Bidang Perencanaan', to: '/bidang/perencanaan' },
      { label: 'Bidang Riset & Pengembangan', to: '/bidang/riset' },
      { label: 'Bidang Pengendalian Pembangunan', to: '/bidang/pengendalian' },
      { label: 'Bidang Statistik & Informasi', to: '/bidang/statistik' }
    ]
  },
  {
    label: 'Berita & Informasi',
    to: '/artikel',
    dropdown: true,
    subs: [
      { label: 'Agenda', to: '/artikel' },
      { label: 'Pengumuman', to: '/artikel' },
      { label: 'Berita', to: '/berita-daerah' },
      { label: 'Artikel', to: '/artikel' },
      { label: 'Galeri', to: '/galeri' },
      { label: 'Video', to: '/artikel' },
      { label: 'Download', to: '/artikel' }
    ]
  },
  {
    label: 'PPID Pelaksana',
    to: '/ppid',
    dropdown: true,
    subs: [
      { label: 'Profil PPID', to: '/ppid' },
      { label: 'Mekanisme Permohonan Informasi', to: '/ppid' },
      { label: 'Pengadaan Barang dan Jasa', to: '/ppid' },
      { label: 'Peraturan, Keputusan & Kebijakan', to: '/ppid' },
      { label: 'Dokumen SAKIP', to: '/ppid' },
      { label: 'Laporan Kinerja', to: '/ppid' },
      { label: 'Laporan Keuangan', to: '/ppid' },
      { label: 'Rencana Kerja', to: '/ppid' }
    ]
  },
  {
    label: 'DARURAT',
    to: '/'
  }
];

function onScroll() {
  isScrolled.value = window.scrollY > 40;
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header-wrapper {
  font-family: 'Poppins', sans-serif;
}

.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 999;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
}
.navbar.scrolled {
  background: rgba(6, 14, 39, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: rgba(255,255,255,0.06);
  box-shadow: 0 4px 30px rgba(0,0,0,0.3);
}

.navbar-brand { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
.logo-wrapper {
  width: 46px; height: 46px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  border: 2px solid rgba(245,195,50,0.5);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.logo-wrapper:hover {
  border-color: rgba(245,195,50,0.9);
  box-shadow: 0 0 20px rgba(245,195,50,0.2);
}
.logo-img { width: 34px; height: 34px; object-fit: contain; }
.brand-text { display: flex; flex-direction: column; line-height: 1.15; }
.brand-name { font-size: 15px; font-weight: 800; color: #fff; letter-spacing: 1.5px; }
.brand-city { font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.55); }

.nav-links { display: flex; align-items: center; list-style: none; gap: 2px; }
.nav-links > li { position: relative; }
.nav-link {
  display: inline-flex; align-items: center; gap: 4px;
  color: rgba(255,255,255,0.72);
  text-decoration: none;
  font-size: 13px; font-weight: 500;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.25s;
  white-space: nowrap;
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 2px; left: 50%; transform: translateX(-50%) scaleX(0);
  width: 18px; height: 2px;
  background: #f5c832;
  border-radius: 2px;
  transition: transform 0.25s;
}
.nav-link:hover, .nav-link.active { color: #fff; background: rgba(255,255,255,0.08); }
.nav-link:hover::after, .nav-link.active::after { transform: translateX(-50%) scaleX(1); }
.chevron {
  width: 13px; height: 13px; opacity: 0.5;
  transition: transform 0.25s, opacity 0.25s;
}
.chevron.rotated { transform: rotate(180deg); opacity: 1; }

.dropdown-panel {
  position: absolute;
  top: calc(100% + 8px); left: 0;
  min-width: 260px;
  background: rgba(10, 20, 55, 0.96);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 16px 48px rgba(0,0,0,0.4);
}
.dropdown-item {
  display: flex; align-items: flex-start; gap: 12px;
  color: rgba(255,255,255,0.75);
  text-decoration: none;
  font-size: 13px; font-weight: 500;
  padding: 10px 14px;
  border-radius: 8px;
  transition: all 0.2s;
  text-align: left;
  line-height: 1.5;
}
.dropdown-dot {
  width: 5px; height: 5px; min-width: 5px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
  transition: background 0.2s;
  margin-top: 7px;
}
.dropdown-item:hover .dropdown-dot { background: #f5c832; }

.dropdown-enter-active { transition: all 0.25s ease-out; }
.dropdown-leave-active { transition: all 0.15s ease-in; }
.dropdown-enter-from { opacity: 0; transform: translateY(-8px) scale(0.96); }
.dropdown-leave-to { opacity: 0; transform: translateY(-4px) scale(0.98); }

.navbar-right { display: flex; align-items: center; gap: 20px; flex-shrink: 0; }
.lang-switch { display: flex; align-items: center; gap: 5px; }
.lang { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.4); cursor: pointer; transition: color 0.2s; }
.lang-active { color: #fff; font-weight: 700; }
.lang-divider { color: rgba(255,255,255,0.25); font-size: 13px; }

.btn-akses {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 22px;
  border: 1.5px solid rgba(255,255,255,0.3);
  border-radius: 10px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 13px; font-weight: 600;
  text-decoration: none;
  background: transparent;
  transition: all 0.3s;
  cursor: pointer;
}
.btn-akses:hover {
  background: rgba(245,195,50,0.12);
  border-color: rgba(245,195,50,0.6);
  color: #f5c832;
}
.btn-arrow { width: 15px; height: 15px; transition: transform 0.25s; }
.btn-akses:hover .btn-arrow { transform: translateX(3px); }

.hamburger {
  display: none;
  flex-direction: column; justify-content: center;
  gap: 5px; width: 36px; height: 36px;
  background: transparent; border: none; cursor: pointer; padding: 4px;
}
.hamburger span {
  display: block; width: 22px; height: 2px;
  background: #fff; border-radius: 2px;
  transition: all 0.3s;
}
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

.mobile-menu {
  position: fixed; top: 72px; left: 0; right: 0; z-index: 998;
  background: rgba(6, 14, 39, 0.98);
  backdrop-filter: blur(20px);
  display: flex; flex-direction: column;
  padding: 16px 24px 24px; gap: 2px;
}
.mobile-menu a {
  color: rgba(255,255,255,0.75); text-decoration: none;
  font-size: 14px; font-weight: 500;
  padding: 12px 14px; border-radius: 10px;
  transition: all 0.2s;
}
.mobile-menu a:hover { background: rgba(255,255,255,0.08); color: #fff; }
.mobile-menu-bottom {
  display: flex; align-items: center; gap: 16px;
  margin-top: 12px; padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.mobile-btn { border-color: rgba(245,195,50,0.5); color: #f5c832; }
.mobileMenu-enter-active { transition: all 0.3s ease-out; }
.mobileMenu-leave-active { transition: all 0.2s ease-in; }
.mobileMenu-enter-from { opacity: 0; transform: translateY(-16px); }
.mobileMenu-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 768px) {
  .nav-links, .navbar-right { display: none; }
  .hamburger { display: flex; }
}
@media (max-width: 1024px) {
  .navbar { padding: 0 24px; }
}
</style>