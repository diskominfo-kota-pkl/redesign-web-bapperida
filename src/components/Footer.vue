<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>BAPERIDA Kota Samarinda</h3>
          <p>Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah</p>
        </div>
        <div class="footer-section">
          <h3>Kontak Kami</h3>
          <p>📍 Jl. Dahlia No.81, Kel. Bugis, Kec. Samarinda Kota</p>
          <p>📞 0541-203785</p>
          <p>✉️ bappedalitbang@samarindakota.go.id</p>
        </div>
        <div class="footer-section">
          <h3>Website</h3>
          <p>https://bapperida.samarindakota.go.id</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 BAPERIDA Kota Samarinda. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #003366;
  color: white;
  padding: 40px 0 20px;
  margin-top: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.footer-section h3 {
  margin-bottom: 15px;
  font-size: 18px;
}

.footer-section p {
  line-height: 1.6;
  font-size: 14px;
  margin-bottom: 8px;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.2);
  font-size: 12px;
}
</style>