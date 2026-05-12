<!-- TheHeader.vue -->
<template>
  <header class="app-header" :class="{ scrolled: isScrolled, 'at-top': !isScrolled }">
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="top-inner">
        <div class="top-contact">
          <span class="top-item">
            <i class="fas fa-phone-alt"></i> 0541-203785
          </span>
          <span class="top-sep"></span>
          <span class="top-item">
            <i class="fas fa-envelope"></i> bappedalitbang@samarindakota.go.id
          </span>
          <span class="top-sep"></span>
          <span class="top-item">
            <i class="fas fa-map-marker-alt"></i> Jl. Dahlia No.81, Samarinda Kota
          </span>
        </div>
        <div class="top-right">
          <a href="https://bapperida.samarindakota.go.id" target="_blank" rel="noopener" class="top-web">
            <i class="fas fa-external-link-alt"></i> Website Resmi
          </a>
        </div>
      </div>
    </div>

    <!-- Navbar -->
    <div class="navbar">
      <div class="nav-inner">
        <!-- Brand -->
        <router-link to="/" class="nav-brand">
          <div class="brand-mark">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="url(#brand-grad)"/>
              <path d="M20 8L12 16H16V30H24V16H28L20 8Z" fill="#0A2E1A" opacity="0.9"/>
              <path d="M14 22H26V32H14V22Z" fill="#0A2E1A" opacity="0.6"/>
              <defs>
                <linearGradient id="brand-grad" x1="0" y1="0" x2="40" y2="40">
                  <stop stop-color="#F0D98A"/>
                  <stop offset="1" stop-color="#D4A843"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-title">BAPPERIDA</span>
            <span class="brand-sub">Kota Samarinda</span>
          </div>
        </router-link>

        <!-- Desktop Nav -->
        <nav class="nav-links">
          <div v-for="link in navLinks" :key="link.to" class="nav-item" :class="{ 'has-children': link.children }">
            <router-link :to="link.to" class="nav-link" :class="{ active: isExactActive(link) }">
              <span>{{ link.label }}</span>
              <i v-if="link.children" class="fas fa-chevron-down nav-chevron"></i>
            </router-link>
            <!-- Dropdown -->
            <div v-if="link.children" class="nav-dropdown">
              <router-link v-for="child in link.children" :key="child.to" :to="child.to" class="dropdown-link">
                <i :class="child.icon"></i>
                <span>{{ child.label }}</span>
              </router-link>
            </div>
          </div>
        </nav>

        <!-- Actions -->
        <div class="nav-actions">
          <button class="action-btn" @click="searchOpen = true" aria-label="Cari">
            <i class="fas fa-search"></i>
          </button>
          <button class="action-btn action-btn--cta" @click="showToast('Mengarahkan ke halaman layanan...')">
            <i class="fas fa-concierge-bell"></i>
            <span class="action-label">Layanan</span>
          </button>
          <button class="hamburger" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="drawer">
      <div v-if="mobileOpen" class="mobile-drawer">
        <div class="drawer-header">
          <div class="drawer-brand">BAPPERIDA</div>
          <button class="drawer-close" @click="mobileOpen = false"><i class="fas fa-times"></i></button>
        </div>
        <div class="drawer-body">
          <router-link v-for="link in flatLinks" :key="link.to" :to="link.to"
            class="drawer-link" @click="mobileOpen = false">
            <i :class="link.icon || 'fas fa-chevron-right'"></i>
            <span>{{ link.label }}</span>
          </router-link>
        </div>
        <div class="drawer-footer">
          <button class="drawer-cta" @click="mobileOpen = false; showToast('Mengarahkan ke halaman layanan...')">
            <i class="fas fa-concierge-bell"></i> Akses Layanan Publik
          </button>
        </div>
      </div>
    </Transition>
    <Transition name="overlay">
      <div v-if="mobileOpen" class="drawer-mask" @click="mobileOpen = false"></div>
    </Transition>

    <!-- Search Modal -->
    <Transition name="modal">
      <div v-if="searchOpen" class="search-modal" @click.self="searchOpen = false">
        <div class="search-card">
          <div class="search-row">
            <i class="fas fa-search search-icon"></i>
            <input ref="searchInput" v-model="searchQuery" type="text"
              placeholder="Cari berita, artikel, layanan..." @keyup.esc="searchOpen = false">
            <button class="search-close-btn" @click="searchOpen = false"><i class="fas fa-times"></i></button>
          </div>
          <div class="search-footer">
            <span>Tekan <kbd>Enter</kbd> untuk mencari</span>
            <span><kbd>Esc</kbd> untuk menutup</span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toastMsg" class="header-toast">
        <i class="fas fa-check-circle"></i> {{ toastMsg }}
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
  { label: 'Beranda', to: '/' },
  {
    label: 'Informasi', to: '/artikel', children: [
      { label: 'Artikel', to: '/artikel', icon: 'fas fa-file-alt' },
      { label: 'Berita Daerah', to: '/berita-daerah', icon: 'fas fa-map-marked-alt' },
      { label: 'Berita Nasional', to: '/berita-nasional', icon: 'fas fa-flag' },
      { label: 'Siaran Pers', to: '/siaran-pers', icon: 'fas fa-bullhorn' }
    ]
  },
  { label: 'Jurnal', to: '/jurnal' },
  { label: 'Penelitian', to: '/penelitian' },
  { label: 'Galeri', to: '/galeri' },
  { label: 'Profil Kepala', to: '/profil-kepala' }
]

const flatLinks = computed(() => {
  const links = []
  navLinks.forEach(l => {
    links.push({ label: l.label, to: l.to, icon: l.icon })
    if (l.children) l.children.forEach(c => links.push(c))
  })
  return links
})

function isExactActive(link) {
  if (link.children) return link.children.some(c => route.path === c.to)
  return route.path === link.to
}

const isScrolled = ref(false)
const mobileOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const toastMsg = ref('')
let toastTimer = null

function showToast(msg) {
  toastMsg.value = msg
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 2500)
}

function handleScroll() { isScrolled.value = window.scrollY > 40 }

function handleKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); searchOpen.value = true }
  if (e.key === 'Escape') { searchOpen.value = false; mobileOpen.value = false }
}

watch(searchOpen, v => {
  if (v) { nextTick(() => searchInput.value?.focus()); document.body.style.overflow = 'hidden' }
  else document.body.style.overflow = ''
})
watch(mobileOpen, v => { document.body.style.overflow = v ? 'hidden' : '' })

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
:root {
  --g900:#0A2E1A;--g800:#143D26;--g700:#1B5E30;--g600:#237A3E;
  --g500:#2E964F;--g400:#4CB872;--g300:#7DD4A0;--g200:#B5E6C8;
  --g100:#E0F3E8;--g50:#F0FAF3;
  --gold:#D4A843;--gold-light:#E2C36B;--gold-pale:#F0D98A;
  --dark:#0F1A14;
  --gr8:#1A1F1C;--gr7:#3D4842;--gr6:#556159;--gr5:#6B7A72;
  --gr4:#8A9992;--gr3:#B0BDB7;--gr2:#D4DDD9;--gr1:#E8EDEB;--gr0:#F4F7F6;
}
*{margin:0;padding:0;box-sizing:border-box}

/* ===== TOP BAR ===== */
.top-bar{
  background:var(--g900);padding:0;overflow:hidden;
  max-height:42px;transition:max-height .4s ease,opacity .3s ease;
}
.app-header.scrolled .top-bar{max-height:0;opacity:0}
.top-inner{
  max-width:1280px;margin:0 auto;padding:9px 24px;
  display:flex;align-items:center;justify-content:space-between;
}
.top-contact{display:flex;align-items:center;gap:0}
.top-item{
  display:inline-flex;align-items:center;gap:6px;
  color:var(--g200);font-size:.72rem;font-weight:400;
}
.top-item i{color:var(--g400);font-size:.65rem}
.top-sep{width:1px;height:12px;background:rgba(255,255,255,.1);margin:0 14px}
.top-web{
  display:inline-flex;align-items:center;gap:6px;
  color:var(--g300);text-decoration:none;font-size:.72rem;font-weight:500;
  transition:color .3s ease;
}
.top-web i{font-size:.6rem}
.top-web:hover{color:var(--gold-light)}

/* ===== NAVBAR ===== */
.navbar{
  position:sticky;top:0;z-index:1000;
  background:rgba(255,255,255,.6);backdrop-filter:blur(24px) saturate(1.4);
  border-bottom:1px solid transparent;
  transition:all .4s cubic-bezier(.16,1,.3,1);
}
.app-header.scrolled .navbar{
  background:rgba(255,255,255,.92);
  border-bottom-color:var(--gr1);
  box-shadow:0 1px 24px rgba(10,46,26,.06);
}
.app-header.at-top .navbar{border-bottom-color:rgba(255,255,255,.08)}
.nav-inner{
  max-width:1280px;margin:0 auto;padding:0 24px;
  display:flex;align-items:center;justify-content:space-between;
  height:68px;gap:20px;
}

/* ===== BRAND ===== */
.nav-brand{
  display:flex;align-items:center;gap:12px;text-decoration:none;flex-shrink:0;
}
.brand-mark{width:40px;height:40px;flex-shrink:0}
.brand-mark svg{width:100%;height:100%;display:block}
.brand-text{display:flex;flex-direction:column}
.brand-title{
  font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;
  color:var(--g900);line-height:1.15;letter-spacing:.5px;
}
.brand-sub{
  font-size:.58rem;color:var(--gr5);letter-spacing:2.5px;
  text-transform:uppercase;font-weight:500;
}

/* ===== NAV LINKS ===== */
.nav-links{display:flex;align-items:center;gap:0}
.nav-item{position:relative}
.nav-link{
  position:relative;display:inline-flex;align-items:center;gap:5px;
  color:var(--gr6);text-decoration:none;font-size:.8rem;font-weight:500;
  padding:8px 14px;border-radius:8px;white-space:nowrap;
  transition:all .25s ease;
}
.nav-link:hover{color:var(--g700);background:var(--g50)}
.nav-link.active{color:var(--g700);font-weight:600;background:var(--g50)}
.nav-link.active::after{
  content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);
  width:18px;height:2.5px;background:var(--gold);border-radius:99px;
}
.nav-chevron{font-size:.55rem;transition:transform .25s ease}
.nav-item:hover .nav-chevron{transform:rotate(180deg)}

/* Dropdown */
.nav-dropdown{
  position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(8px);
  min-width:220px;padding:8px;
  background:rgba(255,255,255,.97);backdrop-filter:blur(20px);
  border:1px solid var(--gr1);border-radius:14px;
  box-shadow:0 12px 40px rgba(10,46,26,.1);
  opacity:0;pointer-events:none;
  transition:all .3s cubic-bezier(.16,1,.3,1);
}
.nav-item:hover .nav-dropdown{opacity:1;pointer-events:all;transform:translateX(-50%) translateY(0)}
.dropdown-link{
  display:flex;align-items:center;gap:10px;
  padding:10px 14px;border-radius:9px;
  color:var(--gr6);text-decoration:none;font-size:.8rem;font-weight:500;
  transition:all .2s ease;
}
.dropdown-link i{width:16px;text-align:center;font-size:.78rem;color:var(--g400)}
.dropdown-link:hover{background:var(--g50);color:var(--g700)}

/* ===== ACTIONS ===== */
.nav-actions{display:flex;align-items:center;gap:8px;flex-shrink:0}
.action-btn{
  width:38px;height:38px;border-radius:10px;
  border:1.5px solid var(--gr2);background:transparent;
  color:var(--gr5);cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  font-size:.85rem;transition:all .25s ease;
}
.action-btn:hover{background:var(--g50);color:var(--g700);border-color:var(--g200)}
.action-btn--cta{
  width:auto;padding:0 16px;gap:8px;
  background:linear-gradient(135deg,var(--gold-light),var(--gold));
  border:none;color:var(--g900);font-weight:600;
  font-size:.76rem;font-family:'Plus Jakarta Sans',sans-serif;
  box-shadow:0 2px 12px rgba(212,168,67,.25);
}
.action-btn--cta:hover{
  transform:translateY(-1px);
  box-shadow:0 4px 20px rgba(212,168,67,.4);
  background:linear-gradient(135deg,var(--gold-light),var(--gold));
  color:var(--g900);
}
.action-label{display:inline}
.hamburger{
  display:none;width:38px;height:38px;border-radius:10px;
  border:1.5px solid var(--gr2);background:transparent;
  cursor:pointer;flex-direction:column;align-items:center;justify-content:center;gap:5px;
}
.hamburger span{
  display:block;width:18px;height:2px;background:var(--gr6);
  border-radius:99px;transition:all .3s ease;
}
.hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}

/* ===== MOBILE DRAWER ===== */
.drawer-mask{
  position:fixed;inset:0;z-index:998;
  background:rgba(10,46,26,.4);backdrop-filter:blur(4px);
}
.mobile-drawer{
  position:fixed;top:0;right:0;bottom:0;width:300px;z-index:999;
  background:#fff;
  display:flex;flex-direction:column;
  box-shadow:-8px 0 40px rgba(0,0,0,.1);
}
.drawer-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:20px 24px;border-bottom:1px solid var(--gr1);
}
.drawer-brand{
  font-family:'Playfair Display',serif;font-size:1.2rem;
  font-weight:700;color:var(--g900);
}
.drawer-close{
  width:36px;height:36px;border-radius:10px;border:1px solid var(--gr2);
  background:transparent;color:var(--gr5);cursor:pointer;
  display:flex;align-items:center;justify-content:center;font-size:.9rem;
}
.drawer-body{flex:1;overflow-y:auto;padding:12px}
.drawer-link{
  display:flex;align-items:center;gap:12px;
  padding:13px 16px;border-radius:10px;
  color:var(--gr6);text-decoration:none;font-size:.88rem;font-weight:500;
  transition:all .2s ease;
}
.drawer-link i{width:18px;text-align:center;font-size:.8rem;color:var(--g400)}
.drawer-link:hover,.drawer-link.router-link-exact-active{background:var(--g50);color:var(--g700)}
.drawer-footer{padding:16px 24px;border-top:1px solid var(--gr1)}
.drawer-cta{
  width:100%;padding:13px;border-radius:12px;border:none;cursor:pointer;
  background:linear-gradient(135deg,var(--gold-light),var(--gold));
  color:var(--g900);font-size:.88rem;font-weight:600;
  font-family:'Plus Jakarta Sans',sans-serif;
  display:flex;align-items:center;justify-content:center;gap:8px;
}

/* ===== SEARCH ===== */
.search-modal{
  position:fixed;inset:0;z-index:9999;
  background:rgba(10,46,26,.7);backdrop-filter:blur(16px);
  display:flex;align-items:flex-start;justify-content:center;padding-top:14vh;
}
.search-card{
  width:100%;max-width:600px;margin:0 20px;
  background:#fff;border-radius:20px;overflow:hidden;
  box-shadow:0 24px 80px rgba(0,0,0,.2);
}
.search-row{
  display:flex;align-items:center;gap:14px;padding:18px 24px;
}
.search-icon{color:var(--gr4);font-size:1.1rem;flex-shrink:0}
.search-row input{
  flex:1;border:none;outline:none;font-size:1.05rem;
  font-family:'Plus Jakarta Sans',sans-serif;color:var(--gr8);background:transparent;
}
.search-row input::placeholder{color:var(--gr4)}
.search-close-btn{
  width:32px;height:32px;border-radius:8px;border:none;
  background:var(--gr0);color:var(--gr5);cursor:pointer;
  display:flex;align-items:center;justify-content:center;font-size:.8rem;
  transition:all .2s ease;
}
.search-close-btn:hover{background:var(--gr2);color:var(--gr8)}
.search-footer{
  display:flex;justify-content:space-between;
  padding:10px 24px 14px;font-size:.72rem;color:var(--gr4);
  border-top:1px solid var(--gr1);
}
.search-footer kbd{
  padding:1px 6px;background:var(--gr0);border-radius:4px;
  font-size:.66rem;font-weight:600;border:1px solid var(--gr2);
}

/* ===== TOAST ===== */
.header-toast{
  position:fixed;bottom:24px;right:24px;z-index:99999;
  padding:14px 24px;background:var(--g700);color:#fff;
  border-radius:12px;font-size:.84rem;font-weight:500;
  box-shadow:0 8px 32px rgba(27,94,48,.35);
  display:flex;align-items:center;gap:10px;
}
.toast-enter-active{animation:toastSlide .4s cubic-bezier(.16,1,.3,1)}
.toast-leave-active{animation:toastSlide .3s ease reverse}
@keyframes toastSlide{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
.modal-enter-active{animation:fadeIn .25s ease}
.modal-leave-active{animation:fadeIn .2s ease reverse}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.drawer-enter-active{animation:drawerIn .35s cubic-bezier(.16,1,.3,1)}
.drawer-leave-active{animation:drawerIn .25s ease reverse}
@keyframes drawerIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
.overlay-enter-active{animation:fadeIn .25s ease}
.overlay-leave-active{animation:fadeIn .2s ease reverse}

/* ===== RESPONSIVE ===== */
@media(max-width:1024px){
  .top-web{display:none}
  .nav-link{font-size:.76rem;padding:8px 10px}
}
@media(max-width:860px){
  .nav-links{display:none}
  .hamburger{display:flex}
  .action-label{display:none}
  .action-btn--cta{padding:0}
}
@media(max-width:480px){
  .top-sep{margin:0 8px}
  .top-item{font-size:.66rem}
  .brand-title{font-size:1rem}
  .brand-mark{width:34px;height:34px}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{transition-duration:.01ms!important;animation-duration:.01ms!important}
}
</style>