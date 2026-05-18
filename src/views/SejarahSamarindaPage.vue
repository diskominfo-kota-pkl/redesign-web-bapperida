<template>
  <div class="sj-page">
    <section class="page-hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-inner">
        <div class="hero-badge"><span class="badge-dot"></span> PROFIL</div>
        <h1 class="hero-title">Sejarah<br><span>Samarinda</span></h1>
        <p class="hero-desc">Jejak perjalanan Kota Samarinda dari masa kerajaan hingga menjadi ibukota Provinsi Kalimantan Timur.</p>
        <div class="hero-back">
          <a href="/" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="back-icon"><polyline points="15 18 9 12 15 6"/></svg>
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </section>

    <!-- Cerita Sejarah -->
    <section class="story-section">
      <div class="story-container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-tag">Asal Usul</div>
            <h2 class="section-title">Dari Gowa ke Samarinda</h2>
          </div>
        </div>

        <!-- Timeline Sejarah -->
        <div class="timeline">
          <div v-for="(evt, i) in timeline" :key="i" class="timeline-item anim-target" :data-delay="(i % 3) + 1">
            <div class="tl-dot" :style="{ background: evt.color }"></div>
            <div v-if="i < timeline.length - 1" class="tl-line"></div>
            <div class="tl-content">
              <span class="tl-year" :style="{ color: evt.color }">{{ evt.year }}</span>
              <h3>{{ evt.title }}</h3>
              <p>{{ evt.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Etimologi -->
        <div class="etimologi-card anim-target" data-delay="0">
          <div class="etm-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div class="etm-body">
            <h3>Asal Nama "Samarinda"</h3>
            <p>Dengan rumah rakit yang berada diatas air, harus sama tinggi antara rumah satu dengan yang lainnya, melambangkan tidak ada perbedaan derajat apakah Bangsawan atau tidak — semua sama derajatnya. Lokasi yang berada disekitar muara sungai yang <em>berulak</em> dan dikiri kanan sungai daratan rendah atau <em>"renda"</em> — diperkirakan dari istilah inilah lokasi tersebut dinamakan <strong>"SAMARENDA"</strong> yang lama kelamaan ejaannya menjadi <strong>"SAMARINDA"</strong>.</p>
          </div>
        </div>

        <!-- Hari Jadi -->
        <div class="hj-card anim-target" data-delay="1">
          <div class="hj-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            HARI JADI KOTA
          </div>
          <div class="hj-content">
            <div class="hj-date">
              <span class="hj-day">21</span>
              <span class="hj-month">Januari</span>
              <span class="hj-year">1668 M</span>
            </div>
            <div class="hj-info">
              <p class="hj-hijri">5 Sya'ban 1078 H</p>
              <p class="hj-legal">Ditetapkan Perda Kotamadya Dati II Samarinda Nomor 1 Tahun 1988, Tanggal 21 Januari 1988</p>
            </div>
          </div>
        </div>

        <!-- Pembagian Wilayah -->
        <div class="wilayah-card anim-target" data-delay="2">
          <div class="section-tag">Demografi</div>
          <h3 class="section-title-sm">Perkembangan Wilayah</h3>
          <div class="wilayah-grid">
            <div v-for="(w, i) in wilayah" :key="i" class="wilayah-item">
              <span class="w-year">{{ w.year }}</span>
              <span class="w-desc">{{ w.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Riwayat Pimpinan Kota -->
    <section class="pimpinan-section">
      <div class="pimpinan-container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-tag">Pemerintahan</div>
            <h2 class="section-title">Riwayat Pimpinan Kota Samarinda</h2>
          </div>
        </div>

        <div class="pimpinan-list">
          <div
            v-for="(p, i) in pimpinanKota"
            :key="i"
            class="pimpinan-card anim-target"
            :data-delay="(i % 3) + 1"
            :class="{ current: i === 0 }"
          >
            <div class="pc-num">{{ i + 1 }}</div>
            <div class="pc-info">
              <h4>{{ p.nama }}</h4>
              <span class="pc-period">{{ p.masa }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bottom-cta anim-target" data-delay="0">
      <div class="cta-inner">
        <div class="cta-text">
          <h3>Ingin Tahu Lebih Lanjut?</h3>
          <p>Hubungi BAPPERIDA untuk informasi detail mengenai sejarah Kota Samarinda.</p>
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
import { onMounted, onUnmounted } from 'vue'

const timeline = [
  {
    year: '1667',
    title: 'Perjanjian Bongaja',
    desc: 'Sultan Hasanuddin dari Kerajaan Gowa menandatangani Perjanjian Bongaja pada tanggal 18 November 1667 dengan Belanda. Sebagian orang-orang Bugis Wajo yang tidak mau tunduk terhadap perjanjian ini memilih meneruskan perlawanan secara gerilya atau hijrah ke pulau-pulau lainnya.',
    color: '#f5c832'
  },
  {
    year: '1668',
    title: 'Kedatangan di Muara Karang Mumus',
    desc: 'Rombongan Bugis Wajo dipimpin La Mohang Daeng Mangkona (bergelar Poa Ado yang pertama) hijrah ke Kalimantan Timur dan diterima baik oleh Sultan Kutai. Mereka mula-mula memilih daerah sekitar Muara Karang Mumus (daerah Selili Seberang), tetapi menemui kesulitan pelayaran karena arus berputar (berulak) di sekitar Gunung Selili.',
    color: '#60a5fa'
  },
  {
    year: 'Januari 1668',
    title: 'Permukiman Baru "Samarenda"',
    desc: 'Dengan rumah rakit di atas air yang sama tinggi — melambangkan kesetaraan derajat — lokasi baru di muara sungai yang berulak dengan daratan rendah ("renda") dinamakan "SAMARENDA", yang lama-kelamaan berubah ejaan menjadi "SAMARINDA". Bulan Januari 1668 dijadikan patokan hari jadi kota.',
    color: '#34d399'
  },
  {
    year: '1959',
    title: 'Pembentukan Kota Samarinda',
    desc: 'Pembentukan Pemerintah Kota Samarinda didasarkan pada Undang-Undang Nomor 27 Tahun 1959, menetapkan Samarinda sebagai kotamadya di Kalimantan Timur.',
    color: '#c084fc'
  },
  {
    year: '1988',
    title: 'Penetapan Hari Jadi',
    desc: 'Peraturan Daerah Kotamadya Dati II Samarinda Nomor 1 Tahun 1988 menetapkan hari jadi Kota Samarinda pada tanggal 21 Januari 1668 M bertepatan dengan 5 Sya\'ban 1078 H, ditetapkan pada peringatan hari jadi ke-320.',
    color: '#f5c832'
  }
]

const wilayah = [
  { year: '1987', desc: 'Terbagi menjadi 4 Kecamatan (PP 21/1987)' },
  { year: '1997', desc: 'Dimekarkan menjadi 6 Kecamatan dan 53 Kelurahan' },
  { year: '2010', desc: 'Dimekarkan menjadi 10 Kecamatan (Perda No. 02/2010)' },
  { year: '2014', desc: 'Kelurahan dimekarkan menjadi 59 Kelurahan (Perda No. 6/2014)' }
]

const pimpinanKota = [
  { nama: 'Dr. H. Andi Harun & Dr. H. Rusmadi Wongso', masa: '2021 — Sekarang' },
  { nama: 'H. Syaharie Ja\'ang, SH, M.Si & Ir. H. Nusyirwan Ismail, M.Si', masa: '2010 — 2021' },
  { nama: 'Drs. H. Achmad Amins, MM & H. Syaharie Ja\'ang, SH, M.Si', masa: '2000 — 2010' },
  { nama: 'Kolonel Lukman Said & Drs. H. Achmad Amins, MM', masa: '1995 — 2000' },
  { nama: 'Drs. H.A. Waris Husain', masa: '1985 — 1995' },
  { nama: 'Letkol. Iswanto Rukin', masa: '1985 (Feb — Mar)' },
  { nama: 'Drs. Anang Hasyim', masa: '1980 — 1985' },
  { nama: 'H.M. Kadrie Oening', masa: '1967 — 1980' },
  { nama: 'Mayor Ngudio', masa: '1961 — 1967' },
  { nama: 'Kapten Soedjono AJ.', masa: '1960 — 1961' }
]

function handleScroll() {
  document.querySelectorAll('.anim-target').forEach(el => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight - 60) {
      const delay = parseInt(el.dataset.delay || 0)
      el.style.transitionDelay = delay * 0.1 + 's'
      el.classList.add('visible')
    }
  })
}
onMounted(() => { window.addEventListener('scroll', handleScroll, { passive: true }); handleScroll() })
onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
.sj-page{font-family:'Poppins',sans-serif;background:#060e27;color:#fff;min-height:100vh}
.anim-target{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.anim-target.visible{opacity:1;transform:translateY(0)}

.page-hero{position:relative;padding:140px 48px 80px;overflow:hidden}
.hero-bg-pattern{position:absolute;inset:0;background-image:radial-gradient(rgba(245,195,50,.03) 1px,transparent 1px);background-size:28px 28px}
.hero-bg-pattern::after{content:'';position:absolute;bottom:0;left:0;right:0;height:60%;background:linear-gradient(to top,#060e27,transparent)}
.hero-inner{position:relative;z-index:1;max-width:800px;margin:0 auto;text-align:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 18px 7px 12px;background:rgba(245,195,50,.1);border:1px solid rgba(245,195,50,.25);border-radius:100px;font-size:12px;font-weight:600;color:#f5c832;margin-bottom:24px;animation:fadeUp .7s ease both}
.badge-dot{width:8px;height:8px;border-radius:50%;background:#f5c832;animation:pulse-dot 2s ease-in-out infinite}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
.hero-title{font-size:clamp(28px,4.2vw,48px);font-weight:900;color:#fff;line-height:1.15;letter-spacing:-.5px;margin-bottom:20px;animation:fadeUp .7s .1s ease both;opacity:0}
.hero-title span{background:linear-gradient(135deg,#f5c832,#f59e0b,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-desc{font-size:15px;font-weight:400;color:rgba(255,255,255,.6);line-height:1.8;margin-bottom:32px;animation:fadeUp .7s .2s ease both;opacity:0}
.hero-back{animation:fadeUp .7s .3s ease both;opacity:0}
.back-link{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);text-decoration:none;font-size:13px;font-weight:500;padding:8px 16px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);transition:all .25s}
.back-link:hover{color:#f5c832;border-color:rgba(245,195,50,.3);background:rgba(245,195,50,.08)}
.back-icon{width:16px;height:16px}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

.section-tag{display:inline-block;font-size:11px;font-weight:700;color:#f5c832;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:12px}
.section-title{font-size:clamp(22px,2.8vw,36px);font-weight:800;color:#fff;line-height:1.2}
.section-title-sm{font-size:20px;font-weight:800;color:#fff;margin-bottom:20px}
.section-header{margin-bottom:44px}

/* Story */
.story-section{padding:0 0 60px}
.story-container{max-width:1200px;margin:0 auto;padding:0 48px;display:flex;flex-direction:column;gap:32px}

.timeline{position:relative;padding-left:40px}
.tl-item{position:relative;padding-bottom:36px}
.tl-item:last-child{padding-bottom:0}
.tl-dot{position:absolute;left:-40px;top:6px;width:16px;height:16px;border-radius:50%;border:3px solid rgba(255,255,255,.1);z-index:1}
.tl-line{position:absolute;left:-33px;top:22px;width:2px;bottom:0;background:rgba(255,255,255,.06)}
.tl-content{}
.tl-year{font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;display:block;margin-bottom:6px}
.tl-content h3{font-size:17px;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.3}
.tl-content p{font-size:13.5px;font-weight:400;color:rgba(255,255,255,.6);line-height:1.8}

/* Etimologi */
.etimologi-card{display:flex;gap:24px;background:rgba(245,195,50,.04);border:1px solid rgba(245,195,50,.1);border-radius:20px;padding:32px;overflow:hidden;position:relative}
.etimologi-card::before{content:'';position:absolute;top:-30px;right:-30px;width:140px;height:140px;border-radius:50%;background:rgba(245,195,50,.06);filter:blur(40px)}
.etm-icon{width:52px;height:52px;min-width:52px;border-radius:14px;background:rgba(245,195,50,.1);display:flex;align-items:center;justify-content:center;color:#f5c832;position:relative;z-index:1}
.etm-icon svg{width:24px;height:24px}
.etm-body{position:relative;z-index:1}
.etm-body h3{font-size:18px;font-weight:700;color:#fff;margin-bottom:10px}
.etm-body p{font-size:13.5px;font-weight:400;color:rgba(255,255,255,.65);line-height:1.8;margin:0}
.etm-body strong{color:#f5c832;font-weight:600}
.etm-body em{color:rgba(255,255,255,.85);font-style:italic}

/* Hari Jadi */
.hj-card{background:linear-gradient(135deg,rgba(245,195,50,.06),rgba(245,195,50,.02));border:1px solid rgba(245,195,50,.12);border-radius:20px;padding:36px;overflow:hidden;position:relative}
.hj-card::before{content:'';position:absolute;bottom:-40px;left:-40px;width:180px;height:180px;border-radius:50%;background:rgba(245,195,50,.05);filter:blur(50px)}
.hj-badge{display:inline-flex;align-items:center;gap:8px;padding:5px 16px;background:linear-gradient(135deg,#f5c832,#e6a817);color:#0a0f2e;font-size:10px;font-weight:800;border-radius:100px;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px;position:relative;z-index:1}
.hj-badge svg{width:14px;height:14px}
.hj-content{display:flex;align-items:center;gap:40px;position:relative;z-index:1;flex-wrap:wrap}
.hj-date{display:flex;flex-direction:column;align-items:center;gap:0}
.hj-day{font-size:64px;font-weight:900;color:#f5c832;line-height:1;letter-spacing:-3px}
.hj-month{font-size:18px;font-weight:700;color:#fff;margin-top:4px}
.hj-year{font-size:14px;font-weight:600;color:rgba(255,255,255,.4);margin-top:2px}
.hj-info{flex:1;min-width:200px}
.hj-hijri{font-size:15px;font-weight:600;color:#f5c832;margin-bottom:8px;opacity:.8}
.hj-legal{font-size:12.5px;font-weight:400;color:rgba(255,255,255,.45);line-height:1.7}

/* Wilayah */
.wilayah-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:32px}
.wilayah-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.wilayah-item{display:flex;flex-direction:column;gap:6px;padding:20px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-radius:14px;transition:all .3s}
.wilayah-item:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);transform:translateY(-3px)}
.w-year{font-size:20px;font-weight:900;color:#f5c832;line-height:1}
.w-desc{font-size:12.5px;font-weight:500;color:rgba(255,255,255,.55);line-height:1.6}

/* Pimpinan */
.pimpinan-section{padding:60px 0 100px;background:linear-gradient(180deg,#060e27 0%,#0a1435 100%)}
.pimpinan-container{max-width:1200px;margin:0 auto;padding:0 48px}
.pimpinan-list{display:flex;flex-direction:column;gap:10px}
.pimpinan-card{display:flex;align-items:center;gap:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:18px 24px;transition:all .4s cubic-bezier(.25,.46,.45,.94)}
.pimpinan-card:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);transform:translateX(4px)}
.pimpinan-card.current{border-color:rgba(245,195,50,.2);background:rgba(245,195,50,.04)}
.pc-num{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,.05);color:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0;transition:all .25s}
.pimpinan-card.current .pc-num{background:linear-gradient(135deg,#f5c832,#e6a817);color:#0a0f2e}
.pc-info{flex:1;min-width:0}
.pc-info h4{font-size:14px;font-weight:700;color:rgba(255,255,255,.8);line-height:1.4;margin-bottom:3px}
.pimpinan-card.current .pc-info h4{color:#fff}
.pc-period{font-size:12px;font-weight:500;color:rgba(255,255,255,.35)}
.pimpinan-card.current .pc-period{color:rgba(245,195,50,.6)}

.bottom-cta{padding:0 48px 100px;background:#0a1435}
.cta-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:32px;padding:40px 44px;border-radius:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07)}
.cta-text h3{font-size:20px;font-weight:700;color:#fff;margin-bottom:6px}
.cta-text p{font-size:14px;color:rgba(255,255,255,.5);line-height:1.6}
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:linear-gradient(135deg,#f5c832,#e6a817);color:#0a0f2e;font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:12px;border:none;cursor:pointer;transition:all .3s;white-space:nowrap;box-shadow:0 4px 20px rgba(245,195,50,.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(245,195,50,.45)}
.btn-icon{width:18px;height:18px;transition:transform .25s}
.btn-primary:hover .btn-icon{transform:translateX(3px)}

@media(max-width:1024px){
  .story-container,.pimpinan-container,.bottom-cta{padding-left:24px;padding-right:24px}
  .wilayah-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:768px){
  .page-hero{padding:120px 20px 60px}
  .story-container,.pimpinan-container,.bottom-cta{padding-left:20px;padding-right:20px}
  .etimologi-card{flex-direction:column;gap:16px;padding:24px 20px}
  .hj-content{gap:24px}
  .hj-day{font-size:48px}
  .wilayah-grid{grid-template-columns:1fr}
  .pimpinan-card{padding:14px 18px;gap:14px}
  .pc-info h4{font-size:13px}
  .cta-inner{flex-direction:column;text-align:center;padding:32px 24px}
  .bottom-cta{padding:0 20px 80px;background:#0a1435}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>