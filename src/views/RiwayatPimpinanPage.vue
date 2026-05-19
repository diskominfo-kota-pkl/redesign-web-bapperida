<template>
  <div class="rp-page">
    <section class="page-hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-inner">
        <div class="hero-badge"><span class="badge-dot"></span> PROFIL</div>
        <h1 class="hero-title">Riwayat<br><span>Pimpinan</span></h1>
        <p class="hero-desc">Daftar pimpinan Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah Kota Samarinda dari masa ke masa.</p>
        <div class="hero-back">
          <a href="/" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="back-icon"><polyline points="15 18 9 12 15 6"/></svg>
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-section">
      <div class="stats-container">
        <div class="stats-grid">
          <div v-for="(s, i) in stats" :key="i" class="stat-card anim-target" :data-delay="i">
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabel -->
    <section class="table-section">
      <div class="table-container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-tag">Sejarah</div>
            <h2 class="section-title">Daftar Pimpinan BAPPERIDA</h2>
          </div>
        </div>

        <div class="pimpinan-table-wrap anim-target" data-delay="1">
          <table class="pimpinan-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Pimpinan</th>
                <th>Jabatan</th>
                <th>Mulai</th>
                <th>Akhir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in riwayatPimpinan" :key="i" :class="{ current: i === 0 }">
                <td>{{ i + 1 }}</td>
                <td class="nama">{{ p.nama }}</td>
                <td class="jabatan">{{ p.jabatan }}</td>
                <td>{{ p.mulai }}</td>
                <td>{{ p.akhir }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-note anim-target" data-delay="2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="note-icon"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          <p>Data diurutkan dari yang terbaru. Baris yang disorot merupakan pimpinan yang menjabat saat ini.</p>
        </div>
      </div>
    </section>

    <section class="bottom-cta anim-target" data-delay="0">
      <div class="cta-inner">
        <div class="cta-text">
          <h3>Butuh Informasi Lebih Lanjut?</h3>
          <p>Hubungi BAPPERIDA untuk informasi detail mengenai riwayat pimpinan.</p>
        </div>
        <a href="#" class="btn-primary">
          <span>Hubungi Kami</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'

const riwayatPimpinan = [
  { nama: 'Marnabas, S.Sos., M.Si', jabatan: 'Plt. Kepala BAPPERIDA', mulai: '27 Feb 2026', akhir: '26 Mei 2026' },
  { nama: 'H. Ananta Fathurrozi, S.Sos., M.Si', jabatan: 'Kepala BAPPERIDA', mulai: '5 Mar 2024', akhir: '27 Feb 2026' },
  { nama: 'H. Ananta Fathurrozi, S.Sos., M.Si', jabatan: 'Kepala Bapperida, Penelitian dan Pengembangan', mulai: '14 Feb 2022', akhir: '5 Mar 2024' },
  { nama: 'H. Ananta Fathurrozi, S.Sos., M.Si', jabatan: 'Kepala Bapperida', mulai: '26 Mar 2019', akhir: '14 Feb 2022' },
  { nama: 'Dr. H. Asli Nuryadin, S.Pd., MM.', jabatan: 'Kepala Bapperida', mulai: '30 Des 2016', akhir: '26 Mar 2019' },
  { nama: 'Dr. H. Sugeng Chairuddin, M.Si', jabatan: 'Kepala Bapperida', mulai: '9 Okt 2014', akhir: '30 Des 2016' },
  { nama: 'H. Ismansyah, S.E., M.Si', jabatan: 'Kepala Bapperida', mulai: '18 Jan 2012', akhir: '9 Okt 2014' },
  { nama: 'Drs. H. Ali Fitri Noor, MM.', jabatan: 'Kepala Bapperida', mulai: '13 Jul 2010', akhir: '18 Jan 2012' },
  { nama: 'Dr. Mugni Baharuddin, S.H., MM., MH.', jabatan: 'Kepala Bapperida', mulai: '30 Okt 2008', akhir: '13 Jul 2010' },
  { nama: 'Drs. H. Maryadi S, M.Si', jabatan: 'Ketua Bapperida', mulai: '16 Des 2005', akhir: '30 Okt 2008' },
  { nama: 'Ir. H. Arfan Zainal', jabatan: 'Ketua Bapperida', mulai: '12 Jan 2004', akhir: '16 Des 2005' },
  { nama: 'Ir. H. Mochdar Hasan', jabatan: 'Ketua Bapperida Dati II', mulai: '15 Des 1998', akhir: '12 Jan 2004' },
  { nama: 'Drs. H. Mardiansyah Marhat', jabatan: 'Ketua Bapperida Dati II', mulai: '25 Jan 1992', akhir: '15 Des 1998' },
  { nama: 'Ir. Razak Rahim', jabatan: 'Ketua Bapperida Dati II', mulai: '3 Jan 1981', akhir: '25 Jan 1992' },
  { nama: 'Drs. Sofyan Muhammad', jabatan: 'Ketua Persiapan Bapperida KOMAS', mulai: '5 Jan 1979', akhir: '3 Jan 1981' }
]

const stats = [
  { value: riwayatPimpinan.length, label: 'Total Pimpinan' },
  { value: '47+', label: 'Tahun Sejarah (1979–2026)' },
  { value: '3', label: 'Era Nama Badan' },
  { value: '2', label: 'Pimpinan Aktif Saat Ini' }
]

function handleScroll() {
  document.querySelectorAll('.anim-target').forEach(el => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight - 60 && !el.classList.contains('visible')) {
      const delay = parseInt(el.dataset.delay || 0)
      el.style.transitionDelay = delay * 0.1 + 's'
      el.classList.add('visible')
    }
  })
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  setTimeout(handleScroll, 100)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
.rp-page{font-family:'Poppins',sans-serif;background:#060e27;color:#fff;min-height:100vh}
.anim-target{opacity:1;transform:translateY(0)}

.page-hero{position:relative;padding:140px 48px 80px;overflow:hidden}
.hero-bg-pattern{position:absolute;inset:0;background-image:radial-gradient(rgba(245,195,50,.03) 1px,transparent 1px);background-size:28px 28px}
.hero-bg-pattern::after{content:'';position:absolute;bottom:0;left:0;right:0;height:60%;background:linear-gradient(to top,#060e27,transparent)}
.hero-inner{position:relative;z-index:1;max-width:800px;margin:0 auto;text-align:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 18px 7px 12px;background:rgba(245,195,50,.1);border:1px solid rgba(245,195,50,.25);border-radius:100px;font-size:12px;font-weight:600;color:#f5c832;margin-bottom:24px;animation:fadeUp .7s ease both}
.badge-dot{width:8px;height:8px;border-radius:50%;background:#f5c832;animation:pulse-dot 2s ease-in-out infinite}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
.hero-title{font-size:clamp(28px,4.2vw,48px);font-weight:900;color:#fff;line-height:1.15;letter-spacing:-.5px;margin-bottom:20px;animation:fadeUp .7s .1s ease both;opacity:0}
.hero-title span{background:linear-gradient(135deg,#60a5fa,#3b82f6,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-desc{font-size:15px;font-weight:400;color:rgba(255,255,255,.6);line-height:1.8;margin-bottom:32px;animation:fadeUp .7s .2s ease both;opacity:0}
.hero-back{animation:fadeUp .7s .3s ease both;opacity:0}
.back-link{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);text-decoration:none;font-size:13px;font-weight:500;padding:8px 16px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);transition:all .25s}
.back-link:hover{color:#f5c832;border-color:rgba(245,195,50,.3);background:rgba(245,195,50,.08)}
.back-icon{width:16px;height:16px}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

.section-tag{display:inline-block;font-size:11px;font-weight:700;color:#f5c832;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:12px}
.section-title{font-size:clamp(22px,2.8vw,36px);font-weight:800;color:#fff;line-height:1.2}
.section-header{margin-bottom:32px}

/* Stats */
.stats-section{padding:0 48px;margin-top:-40px;position:relative;z-index:2}
.stats-container{max-width:1200px;margin:0 auto}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.stat-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:24px;text-align:center;transition:all .4s cubic-bezier(.25,.46,.45,.94)}
.stat-card:hover{background:rgba(255,255,255,.06);transform:translateY(-4px);border-color:rgba(255,255,255,.12)}
.stat-value{font-size:32px;font-weight:900;color:#f5c832;line-height:1;margin-bottom:6px}
.stat-label{font-size:12px;font-weight:500;color:rgba(255,255,255,.45)}

/* Table */
.table-section{padding:60px 0 100px}
.table-container{max-width:1200px;margin:0 auto;padding:0 48px}
.pimpinan-table-wrap{overflow-x:auto;border-radius:16px;border:1px solid rgba(255,255,255,.06)}
.pimpinan-table{width:100%;border-collapse:collapse;font-size:13px}
.pimpinan-table thead{background:rgba(245,195,50,.08)}
.pimpinan-table th{padding:16px 20px;text-align:left;font-size:11px;font-weight:700;color:#f5c832;letter-spacing:1px;text-transform:uppercase;white-space:nowrap}
.pimpinan-table td{padding:14px 20px;color:rgba(255,255,255,.6);border-top:1px solid rgba(255,255,255,.04);white-space:nowrap}
.pimpinan-table tbody tr{transition:background .2s}
.pimpinan-table tbody tr:hover{background:rgba(255,255,255,.03)}
.pimpinan-table .nama{color:rgba(255,255,255,.85);font-weight:600}
.pimpinan-table .jabatan{color:rgba(255,255,255,.45);font-size:12px}
.pimpinan-table tr.current{background:rgba(245,195,50,.06)}
.pimpinan-table tr.current td{color:rgba(255,255,255,.85)}
.pimpinan-table tr.current .nama{color:#f5c832}

.table-note{display:flex;align-items:flex-start;gap:12px;padding:18px 24px;margin-top:20px;background:rgba(245,195,50,.06);border:1px solid rgba(245,195,50,.12);border-radius:14px;color:rgba(255,255,255,.6);font-size:13px;line-height:1.7}
.note-icon{width:20px;height:20px;color:#f5c832;flex-shrink:0;margin-top:2px}
.table-note p{margin:0}

.bottom-cta{padding:0 48px 100px}
.cta-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:32px;padding:40px 44px;border-radius:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07)}
.cta-text h3{font-size:20px;font-weight:700;color:#fff;margin-bottom:6px}
.cta-text p{font-size:14px;color:rgba(255,255,255,.5);line-height:1.6}
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:linear-gradient(135deg,#f5c832,#e6a817);color:#0a0f2e;font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:12px;border:none;cursor:pointer;transition:all .3s;white-space:nowrap;box-shadow:0 4px 20px rgba(245,195,50,.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(245,195,50,.45)}
.btn-icon{width:18px;height:18px;transition:transform .25s}
.btn-primary:hover .btn-icon{transform:translateX(3px)}

@media(max-width:1024px){
  .stats-section{padding:0 24px;margin-top:-40px}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .table-container{padding:0 24px}
  .bottom-cta{padding:0 24px 100px}
}
@media(max-width:768px){
  .page-hero{padding:120px 20px 60px}
  .stats-section{padding:0 20px}
  .table-container{padding:0 20px}
  .pimpinan-table{font-size:11px}
  .pimpinan-table th,.pimpinan-table td{padding:10px 14px}
  .bottom-cta{padding:0 20px 80px}
  .cta-inner{flex-direction:column;text-align:center;padding:32px 24px}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>