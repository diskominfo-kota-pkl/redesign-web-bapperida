<template>
  <div class="profil-kepala-page">
    <div class="container">
      <h1>Profil Kepala Dinas</h1>
      
      <div class="profile-card">
        <div class="profile-image">
          <!-- Ganti dengan placeholder image -->
          <div class="image-placeholder">
            <svg width="100%" height="300" viewBox="0 0 300 350" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="350" fill="#e0e0e0"/>
              <circle cx="150" cy="120" r="60" fill="#b0b0b0"/>
              <rect x="100" y="200" width="100" height="20" rx="10" fill="#b0b0b0"/>
              <rect x="80" y="230" width="140" height="15" rx="7" fill="#c0c0c0"/>
              <rect x="90" y="255" width="120" height="12" rx="6" fill="#c0c0c0"/>
            </svg>
            <p class="placeholder-text">Foto Kepala Dinas</p>
          </div>
        </div>
        <div class="profile-info">
          <h2>MARNABAS, S.Sos, M.Si</h2>
          <p class="position">Kepala Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah</p>
          <p class="position">Kota Samarinda</p>
          
          <div class="quote-box">
            <p>"Sebuah tujuan tanpa rencana hanyalah sebuah keinginan"</p>
            <span>— Antoine de Saint-Exupéry —</span>
          </div>
          
          <div class="bio">
            <h3>Biografi Singkat</h3>
            <p>Marnabas, S.Sos, M.Si lahir di Samarinda. Beliau memiliki latar belakang pendidikan di bidang sosial dan perencanaan pembangunan. Sebelum menjabat sebagai Kepala Bapperida, beliau telah memiliki pengalaman panjang di lingkungan Pemerintah Kota Samarinda.</p>
          </div>
          
          <div class="contact-info">
            <h3>Kontak</h3>
            <p>📧: marnabas@samarindakota.go.id</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Hapus atau comment handleImageError
// const handleImageError = (e) => {
//   e.target.src = 'https://via.placeholder.com/300x350?text=Foto+Kepala+Dinas'
// }
</script>

<style scoped>
.profil-kepala-page {
  padding: 40px 0;
  min-height: calc(100vh - 300px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  color: #003366;
  margin-bottom: 30px;
}

.profile-card {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.image-placeholder {
  text-align: center;
}

.placeholder-text {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.profile-info h2 {
  color: #003366;
  font-size: 28px;
  margin-bottom: 10px;
}

.position {
  color: #666;
  font-size: 16px;
  margin-bottom: 5px;
}

.quote-box {
  background: #f0f7ff;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  text-align: center;
}

.quote-box p {
  font-style: italic;
  font-size: 16px;
  color: #003366;
}

.quote-box span {
  font-size: 12px;
  color: #666;
}

.bio h3, .contact-info h3 {
  color: #003366;
  margin: 20px 0 10px;
}

@media (max-width: 768px) {
  .profile-card {
    grid-template-columns: 1fr;
  }
}
</style>