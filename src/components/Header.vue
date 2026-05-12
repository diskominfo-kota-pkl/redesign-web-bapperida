<template>
  <header>
    <div class="top-bar">
      <div class="container">
        <div class="contact">
          <span>📞 0541-203785</span>
          <span>✉️ bappedalitbang@samarindakota.go.id</span>
        </div>
      </div>
    </div>
    <div class="main-header">
      <div class="container">
        <div class="logo">
          <h1>BAPERIDA</h1>
          <p>Kota Samarinda</p>
        </div>
        <nav>
          <router-link to="/">Beranda</router-link>
          <router-link to="/artikel">Artikel</router-link>
          <router-link to="/berita-daerah">Berita Daerah</router-link>
          <router-link to="/berita-nasional">Berita Nasional</router-link>
          <router-link to="/siaran-pers">Siaran Pers</router-link>
          <router-link to="/jurnal">Jurnal</router-link>
          <router-link to="/penelitian">Penelitian</router-link>
          <router-link to="/galeri">Galeri</router-link>
          <router-link to="/profil-kepala">Profil Kepala</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.top-bar {
  background-color: #003366;
  color: white;
  padding: 8px 0;
  font-size: 13px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact span {
  margin-right: 20px;
}

.main-header {
  background: white;
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.logo h1 {
  color: #003366;
  font-size: 28px;
}

.logo p {
  color: #666;
  font-size: 12px;
}

nav {
  margin-top: 15px;
}

nav a {
  color: #333;
  text-decoration: none;
  margin-right: 25px;
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover, nav a.router-link-active {
  color: #003366;
}

@media (min-width: 768px) {
  .main-header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav {
    margin-top: 0;
  }
}
</style>