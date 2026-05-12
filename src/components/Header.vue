<template>
  <header class="header-wrapper" :class="{ scrolled: isScrolled }">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="top-bar-inner">
        <div class="top-left">
          <span class="top-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            (0541) 741 055
          </span>
          <span class="top-divider">|</span>
          <span class="top-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            bappeda@samarindakota.go.id
          </span>
        </div>
        <div class="top-right">
          <span class="live-clock">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {{ currentTime }}
          </span>
          <span class="top-divider">|</span>
          <span class="top-date">{{ currentDate }}</span>
          <div class="top-social">
            <a href="#" class="social-icon" title="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" class="social-icon" title="Twitter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" class="social-icon" title="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="main-nav">
      <div class="nav-inner">
        <div class="nav-brand">
          <div class="brand-icon">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <circle cx="21" cy="21" r="20" stroke="#D4A843" stroke-width="2"/>
              <path d="M21 6L8 14v14l13 8 13-8V14L21 6z" fill="none" stroke="#D4A843" stroke-width="1.5"/>
              <path d="M21 11l-8 5v10l8 5 8-5V16l-8-5z" fill="#D4A843" opacity="0.2" stroke="#D4A843" stroke-width="1"/>
              <path d="M21 16l-4 2.5v5L21 26l4-2.5v-5L21 16z" fill="#D4A843" opacity="0.5"/>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-title">BADAN PERENCANAAN PEMBANGUNAN</span>
            <span class="brand-subtitle">KOTA SAMARINDA</span>
          </div>
        </div>

        <!-- Desktop Menu -->
        <ul class="nav-menu" :class="{ active: mobileOpen }">
          <li><a href="#" class="nav-link active">Beranda</a></li>
          <li class="has-dropdown" @mouseenter="openDropdown(0)" @mouseleave="closeDropdown">
            <a href="#" class="nav-link">Profil
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </a>
            <div class="dropdown-menu" :class="{ show: activeDropdown === 0 }">
              <a href="#">Visi & Misi</a>
              <a href="#">Struktur Organisasi</a>
              <a href="#">Tupoksi</a>
              <a href="#">Sejarah</a>
            </div>
          </li>
          <li class="has-dropdown" @mouseenter="openDropdown(1)" @mouseleave="closeDropdown">
            <a href="#" class="nav-link">Berita
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </a>
            <div class="dropdown-menu" :class="{ show: activeDropdown === 1 }">
              <a href="#">Berita Terkini</a>
              <a href="#">Pengumuman</a>
              <a href="#">Agenda Kegiatan</a>
            </div>
          </li>
          <li><a href="#" class="nav-link">Galeri</a></li>
          <li><a href="#" class="nav-link">Layanan</a></li>
          <li><a href="#" class="nav-link">Kontak</a></li>
          <li><a href="#" class="nav-link">PPID</a></li>
        </ul>

        <!-- Search & Hamburger -->
        <div class="nav-actions">
          <button class="search-toggle" @click="searchOpen = !searchOpen">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button class="hamburger" :class="{ active: mobileOpen }" @click="mobileOpen = !mobileOpen">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <transition name="slide-down">
        <div class="search-bar" v-if="searchOpen">
          <div class="search-inner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Cari informasi..." v-model="searchQuery" />
            <button @click="searchOpen = false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </transition>
    </nav>

    <!-- Mobile Overlay -->
    <transition name="fade">
      <div class="mobile-overlay" v-if="mobileOpen" @click="mobileOpen = false"></div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const activeDropdown = ref(-1)
const currentTime = ref('')
const currentDate = ref('')

let clockInterval = null

const updateClock = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
  currentDate.value = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

const openDropdown = (index) => {
  activeDropdown.value = index
}

const closeDropdown = () => {
  activeDropdown.value = -1
}

onMounted(() => {
  updateClock()
  clockInterval = setInterval(updateClock, 1000)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  clearInterval(clockInterval)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* ===== TOP BAR ===== */
.top-bar {
  background: linear-gradient(135deg, #0B1D33 0%, #14325A 100%);
  color: rgba(255,255,255,0.8);
  font-size: 12px;
  padding: 6px 0;
  position: relative;
  z-index: 1001;
}
.top-bar-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-left, .top-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.top-item {
  display: flex;
  align-items: center;
  gap: 5px;
}
.top-divider {
  opacity: 0.3;
  font-size: 10px;
}
.top-social {
  display: flex;
  gap: 6px;
  margin-left: 8px;
}
.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7);
  transition: all 0.3s;
  text-decoration: none;
}
.social-icon:hover {
  background: #D4A843;
  color: #0B1D33;
  transform: translateY(-1px);
}
.live-clock {
  display: flex;
  align-items: center;
  gap: 5px;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  color: #D4A843;
}

/* ===== MAIN NAV ===== */
.main-nav {
  background: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}
.header-wrapper.scrolled .main-nav {
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}
.brand-icon {
  flex-shrink: 0;
}
.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.brand-title {
  font-size: 13px;
  font-weight: 700;
  color: #0B1D33;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.brand-subtitle {
  font-size: 15px;
  font-weight: 800;
  color: #D4A843;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Menu */
.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2px;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 16px;
  font-size: 13.5px;
  font-weight: 600;
  color: #374151;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.25s ease;
  position: relative;
}
.nav-link:hover, .nav-link.active {
  color: #0B1D33;
  background: #F0F4F8;
}
.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: #D4A843;
  border-radius: 2px;
}

/* Dropdown */
.has-dropdown {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 200px;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.12);
  padding: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: all 0.25s ease;
  z-index: 100;
}
.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 24px;
  width: 16px;
  height: 8px;
  background: transparent;
}
.dropdown-menu a {
  display: block;
  padding: 10px 14px;
  font-size: 13px;
  color: #4A5568;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
}
.dropdown-menu a:hover {
  background: #F0F4F8;
  color: #0B1D33;
  padding-left: 18px;
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.search-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  background: transparent;
  color: #4A5568;
  cursor: pointer;
  transition: all 0.25s;
}
.search-toggle:hover {
  border-color: #D4A843;
  color: #D4A843;
  background: rgba(212,168,67,0.05);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  padding: 10px;
  transition: all 0.3s;
}
.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: #374151;
  border-radius: 2px;
  transition: all 0.3s;
}
.hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Search Bar */
.search-bar {
  background: #F8FAFC;
  border-top: 1px solid #E2E8F0;
  padding: 16px 0;
}
.search-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #FFFFFF;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  padding: 8px 16px;
  transition: border-color 0.3s;
}
.search-inner:focus-within {
  border-color: #D4A843;
}
.search-inner input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #1A202C;
  font-family: inherit;
}
.search-inner input::placeholder {
  color: #A0AEC0;
}
.search-inner button {
  display: flex;
  align-items: center;
  color: #718096;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
}
.search-inner button:hover {
  color: #E53E3E;
}

/* Mobile Overlay */
.mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  z-index: 998;
}

/* Transitions */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .hamburger {
    display: flex;
  }
  .nav-menu {
    position: fixed;
    top: 0;
    right: -320px;
    width: 300px;
    height: 100vh;
    flex-direction: column;
    align-items: stretch;
    background: #FFFFFF;
    box-shadow: -10px 0 40px rgba(0,0,0,0.15);
    padding: 80px 16px 24px;
    gap: 0;
    transition: right 0.35s cubic-bezier(0.4,0,0.2,1);
    z-index: 999;
    overflow-y: auto;
  }
  .nav-menu.active {
    right: 0;
  }
  .nav-link {
    padding: 14px 16px;
    font-size: 14px;
    border-radius: 10px;
  }
  .nav-link.active::after {
    display: none;
  }
  .nav-link.active {
    background: rgba(212,168,67,0.1);
    color: #D4A843;
  }
  .has-dropdown .dropdown-menu {
    position: static;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    padding-left: 16px;
    display: none;
    background: #F8FAFC;
    border-radius: 10px;
    margin-top: 4px;
  }
  .dropdown-menu.show {
    display: block;
  }
  .mobile-overlay {
    display: block;
  }
  .brand-title {
    font-size: 11px;
  }
  .brand-subtitle {
    font-size: 13px;
  }
}
@media (max-width: 640px) {
  .top-left {
    display: none;
  }
  .top-bar-inner {
    justify-content: flex-end;
  }
  .nav-inner {
    height: 64px;
  }
  .brand-text {
    display: none;
  }
}
</style>