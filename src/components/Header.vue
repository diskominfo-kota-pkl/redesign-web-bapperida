<!-- TheHeader.vue -->
<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="top-inner">
        <div class="top-contact">
          <span class="top-item">
            <i class="fas fa-phone-alt"></i> 0541-203785
          </span>
          <span class="top-divider"></span>
          <span class="top-item">
            <i class="fas fa-envelope"></i> bappedalitbang@samarindakota.go.id
          </span>
        </div>
        <div class="top-right">
          <a href="https://bapperida.samarindakota.go.id" target="_blank" rel="noopener" class="top-web">
            <i class="fas fa-globe"></i> bapperida.samarindakota.go.id
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navbar -->
    <div class="navbar">
      <div class="nav-inner">
        <!-- Logo -->
        <router-link to="/" class="nav-brand">
          <div class="brand-icon">
            <span>B</span>
          </div>
          <div class="brand-text">
            <span class="brand-title">BAPPERIDA</span>
            <span class="brand-sub">Kota Samarinda</span>
          </div>
        </router-link>

        <!-- Desktop Nav -->
        <nav class="nav-menu" :class="{ open: mobileOpen }">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </router-link>
        </nav>

        <!-- Nav Actions -->
        <div class="nav-actions">
          <button class="nav-search-btn" @click="searchOpen = true" aria-label="Cari">
            <i class="fas fa-search"></i>
          </button>
          <button class="nav-mobile-btn" @click="mobileOpen = !mobileOpen" aria-label="Menu">
            <i :class="mobileOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Overlay -->
    <Transition name="drawer-fade">
      <div v-if="mobileOpen" class="drawer-overlay" @click="mobileOpen = false"></div>
    </Transition>

    <!-- Search Modal -->
    <Transition name="modal-fade">
      <div v-if="searchOpen" class="search-overlay" @click.self="searchOpen = false">
        <div class="search-box">
          <div class="search-input-row">
            <i class="fas fa-search"></i>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Cari berita, artikel, layanan..."
              @keyup.esc="searchOpen = false"
            >
            <span class="search-kbd">ESC</span>
          </div>
          <div class="search-hint">Tekan <strong>Enter</strong> untuk mencari &middot; <strong>Esc</strong> untuk menutup</div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

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

const isScrolled = ref(false)
const mobileOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

function handleKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    searchOpen.value = true
  }
  if (e.key === 'Escape') {
    searchOpen.value = false
    mobileOpen.value = false
  }
}

watch(searchOpen, (val) => {
  if (val) {
    nextTick(() => searchInput.value?.focus())
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

watch(mobileOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ========== VARIABEL ========== */
:root {
  --g900: #0A2E1A; --g800: #143D26; --g700: #1B5E30;
  --g600: #237A3E; --g500: #2E964F; --g400: #4CB872;
  --g300: #7DD4A0; --g200: #B5E6C8; --g100: #E0F3E8; --g50: #F0FAF3;
  --gold: #D4A843; --gold-light: #E2C36B; --gold-pale: #F0D98A;
  --dark: #0F1A14;
  --gray-800: #1A1F1C; --gray-600: #556159;
  --gray-500: #6B7A72; --gray-400: #8A9992; --gray-300: #B0BDB7;
  --gray-200: #D4DDD9; --gray-100: #E8EDEB; --gray-50: #F4F7F6;
}

/* ========== TOP BAR ========== */
.top-bar {
  background: var(--g900);
  padding: 0;
  font-size: 0.74rem;
  transition: all 0.4s ease;
  overflow: hidden;
  max-height: 40px;
}
.app-header.scrolled .top-bar {
  max-height: 0;
  padding: 0;
  opacity: 0;
}
.top-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.top-contact {
  display: flex;
  align-items: center;
  gap: 0;
}
.top-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--g200);
  font-weight: 400;
}
.top-item i {
  color: var(--g400);
  font-size: 0.68rem;
}
.top-divider {
  width: 1px;
  height: 14px;
  background: rgba(255,255,255,0.1);
  margin: 0 16px;
}
.top-right {}
.top-web {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--g300);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}
.top-web i { font-size: 0.68rem; }
.top-web:hover { color: var(--gold-light); }

/* ========== MAIN NAVBAR ========== */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255,255,255,0.97);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
  padding: 0;
}
.app-header.scrolled .navbar {
  background: rgba(255,255,255,0.98);
  border-bottom-color: var(--gray-100);
  box-shadow: 0 2px 20px rgba(10,46,26,0.06);
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* ========== BRAND ========== */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex-shrink: 0;
}
.brand-icon {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: linear-gradient(135deg, var(--gold-light), var(--gold));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 12px rgba(212,168,67,0.3);
  transition: transform 0.3s ease;
}
.nav-brand:hover .brand-icon { transform: scale(1.05); }
.brand-icon span {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--g900);
}
.brand-text {
  display: flex;
  flex-direction: column;
}
.brand-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--g900);
  line-height: 1.15;
  letter-spacing: 0.5px;
}
.brand-sub {
  font-size: 0.62rem;
  color: var(--gray-500);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
}

/* ========== NAV LINKS ========== */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
}
.nav-menu::-webkit-scrollbar { display: none; }

.nav-link {
  position: relative;
  color: var(--gray-600);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 8px 13px;
  border-radius: 8px;
  white-space: nowrap;
  transition: all 0.25s ease;
}
.nav-link:hover {
  color: var(--g700);
  background: var(--g50);
}
.nav-link.router-link-exact-active {
  color: var(--g700);
  font-weight: 600;
  background: var(--g50);
}
.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 2.5px;
  background: var(--gold);
  border-radius: 99px;
}

/* ========== NAV ACTIONS ========== */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.nav-search-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1.5px solid var(--gray-200);
  background: transparent;
  color: var(--gray-500);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  transition: all 0.25s ease;
}
.nav-search-btn:hover {
  background: var(--g50);
  color: var(--g700);
  border-color: var(--g200);
}
.nav-mobile-btn {
  display: none;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1.5px solid var(--gray-200);
  background: transparent;
  color: var(--gray-600);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.25s ease;
}
.nav-mobile-btn:hover {
  background: var(--g50);
  color: var(--g700);
  border-color: var(--g200);
}

/* ========== SEARCH MODAL ========== */
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10,46,26,0.75);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 14vh;
}
.search-box {
  width: 100%;
  max-width: 600px;
  margin: 0 20px;
  background: #fff;
  border-radius: 18px;
  padding: 6px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}
.search-input-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
}
.search-input-row i {
  color: var(--gray-400);
  font-size: 1.1rem;
  flex-shrink: 0;
}
.search-input-row input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.05rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--gray-800);
  background: transparent;
}
.search-input-row input::placeholder { color: var(--gray-400); }
.search-kbd {
  padding: 3px 10px;
  background: var(--gray-100);
  border-radius: 6px;
  font-size: 0.68rem;
  color: var(--gray-500);
  font-weight: 600;
  border: 1px solid var(--gray-200);
  flex-shrink: 0;
}
.search-hint {
  padding: 10px 20px 14px;
  font-size: 0.76rem;
  color: var(--gray-400);
  border-top: 1px solid var(--gray-100);
}
.modal-fade-enter-active { animation: modalIn 0.25s ease; }
.modal-fade-leave-active { animation: modalIn 0.2s ease reverse; }
@keyframes modalIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ========== MOBILE ========== */
.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 998;
  background: rgba(10,46,26,0.5);
  backdrop-filter: blur(6px);
}
.drawer-fade-enter-active { animation: modalIn 0.25s ease; }
.drawer-fade-leave-active { animation: modalIn 0.2s ease reverse; }

@media (max-width: 1024px) {
  .top-web { display: none; }
  .nav-link { font-size: 0.76rem; padding: 8px 10px; }
}

@media (max-width: 860px) {
  .nav-mobile-btn { display: flex; }
  .nav-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    z-index: 999;
    background: #fff;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 70px 12px 24px;
    overflow-y: auto;
    box-shadow: -8px 0 40px rgba(0,0,0,0.12);
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-menu.open {
    transform: translateX(0);
  }
  .nav-link {
    font-size: 0.92rem;
    padding: 14px 16px;
    border-radius: 10px;
    border-bottom: 1px solid var(--gray-50);
  }
  .nav-link.router-link-exact-active::after {
    bottom: auto;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
    width: 3px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .top-divider { margin: 0 10px; }
  .top-item { font-size: 0.68rem; }
  .brand-title { font-size: 1rem; }
  .brand-icon { width: 36px; height: 36px; border-radius: 9px; }
  .brand-icon span { font-size: 1.1rem; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>