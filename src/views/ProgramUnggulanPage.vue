<template>
  <div class="program-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-inner">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          PROFIL
        </div>
        <h1 class="hero-title">10 Program Unggulan<br><span>Walikota Samarinda</span></h1>
        <p class="hero-desc">Program strategis untuk mewujudkan Samarinda sebagai kota pusat peradaban yang berkelanjutan, inklusif, dan berdaya saing.</p>
        <div class="hero-back">
          <a href="/" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="back-icon">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Kembali ke Profil
          </a>
        </div>
      </div>
    </section>

    <!-- Overview Stats -->
    <section class="overview-section">
      <div class="overview-container">
        <div
          v-for="(s, i) in overviewStats"
          :key="i"
          class="overview-card anim-target"
          :data-delay="i"
        >
          <div class="overview-icon" :style="{ background: s.bg }">
            <svg class="ov-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="s.svg"></svg>
          </div>
          <div class="overview-value">{{ s.value }}</div>
          <div class="overview-label">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <!-- Program Grid -->
    <section class="program-section">
      <div class="program-container">
        <div class="section-header anim-target" data-delay="0">
          <div>
            <div class="section-tag">10 Program Strategis</div>
            <h2 class="section-title">Program Unggulan</h2>
          </div>
        </div>

        <div class="program-grid">
          <div
            v-for="(prog, i) in programs"
            :key="i"
            class="program-card anim-target"
            :data-delay="(i % 3) + 1"
            @click="openModal(i)"
          >
            <div class="card-glow" :class="`glow-${i % 4}`"></div>
            <div class="card-number">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="card-icon-wrap" :style="{ background: prog.iconBg, borderColor: prog.iconBorder }">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="prog.svg"></svg>
            </div>
            <h3 class="card-title">{{ prog.shortTitle }}</h3>
            <p class="card-desc">{{ prog.excerpt }}</p>
            <div class="card-footer">
              <span class="card-category">{{ prog.category }}</span>
              <span class="card-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="bottom-cta anim-target" data-delay="0">
      <div class="cta-inner">
        <div class="cta-text">
          <h3>Ingin Tahu Lebih Lanjut?</h3>
          <p>Hubungi BAPPERIDA untuk informasi detail mengenai pelaksanaan program unggulan.</p>
        </div>
        <a href="#" class="btn-primary">
          <span>Hubungi Kami</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </section>

    <!-- Detail Modal -->
    <Transition name="modal">
      <div v-if="modalOpen !== null" class="modal-overlay" @click.self="modalOpen = null">
        <div class="modal-box">
          <button class="modal-close" @click="modalOpen = null">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div v-if="modalOpen !== null" class="modal-content">
            <div class="modal-number">{{ String(modalOpen + 1).padStart(2, '0') }}</div>
            <div class="modal-icon" :style="{ background: programs[modalOpen].iconBg, borderColor: programs[modalOpen].iconBorder }">
              <svg class="modal-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="programs[modalOpen].svg"></svg>
            </div>
            <span class="modal-category">{{ programs[modalOpen].category }}</span>
            <h2 class="modal-title">{{ programs[modalOpen].fullTitle }}</h2>
            <p class="modal-desc">{{ programs[modalOpen].description }}</p>
            <ul class="modal-points">
              <li v-for="(p, j) in programs[modalOpen].points" :key="j">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="point-check">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ p }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const modalOpen = ref(null)

const overviewStats = [
  {
    value: '10',
    label: 'Program Strategis',
    bg: 'rgba(245,200,50,0.12)',
    svg: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>'
  },
  {
    value: '10',
    label: 'Kecamatan Tercover',
    bg: 'rgba(52,211,153,0.12)',
    svg: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
  },
  {
    value: '46',
    label: 'Kelurahan Target',
    bg: 'rgba(96,165,250,0.12)',
    svg: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'
  },
  {
    value: '843K+',
    label: 'Penduduk Terdampak',
    bg: 'rgba(192,132,252,0.12)',
    svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  }
]

const programs = [
  {
    shortTitle: 'PRO-BEBAYA',
    fullTitle: 'Program Pembangunan Dan Pemberdayaan Masyarakat (PRO-BEBAYA)',
    excerpt: 'Pemberdayaan ekonomi masyarakat melalui pendekatan bottom-up berbasis kelurahan.',
    description: 'PRO-BEBAYA merupakan program holistik yang bertujuan meningkatkan kesejahteraan masyarakat melalui pelatihan keterampilan, akses permodalan, dan pendampingan usaha mikro kecil menengah secara langsung di tingkat kelurahan.',
    category: 'Pemberdayaan',
    iconBg: 'rgba(245,200,50,0.12)',
    iconBorder: 'rgba(245,195,50,0.25)',
    svg: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/><circle cx="12" cy="12" r="3"/>',
    points: [
      'Pelatihan keterampilan kerja untuk warga kurang mampu',
      'Akses permodalan usaha mikro dan kecil',
      'Pendampingan usaha berkelanjutan',
      'Penguatan BUMKel dan koperasi kelurahan'
    ]
  },
  {
    shortTitle: 'Pengendalian Banjir',
    fullTitle: 'Program Pengendalian Banjir dan Pembangunan Sistem Drainase Modern',
    excerpt: 'Solusi komprehensif penanganan banjir dengan infrastruktur drainase terintegrasi.',
    description: 'Program ini mengintegrasikan pembangunan drainase modern, normalisasi sungai, pembuatan sumur resapan, dan sistem polder untuk mengatasi permasalahan banjir yang kerap melanda Kota Samarinda secara sistematis.',
    category: 'Infrastruktur',
    iconBg: 'rgba(96,165,250,0.12)',
    iconBorder: 'rgba(96,165,250,0.25)',
    svg: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M8 16l-2 2m8-2l2 2M12 12v6"/>',
    points: [
      'Normalisasi saluran drainase utama dan sekunder',
      'Pembangunan sistem polder dan pompa otomatis',
      'Pembuatan sumur resapan dan biopori massal',
      'Sistem monitoring banjir berbasis IoT real-time'
    ]
  },
  {
    shortTitle: 'Transportasi Massal',
    fullTitle: 'Program Pembangunan Sistem Transportasi Massal Modern dan Ramah Lingkungan',
    excerpt: 'Mewujudkan mobilitas urban dengan Subway dan Skytrain-Monorail yang terintegrasi.',
    description: 'Program visioner untuk membangun sistem transportasi massal modern berupa Subway bawah tanah dan Skytrain-Monorail yang terintegrasi dengan angkutan umum eksisting, mengurangi kemacetan dan polusi udara di Kota Samarinda.',
    category: 'Infrastruktur',
    iconBg: 'rgba(52,211,153,0.12)',
    iconBorder: 'rgba(52,211,153,0.25)',
    svg: '<rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    points: [
      'Feasibility study jalur Subway dan Monorail',
      'Integrasi dengan transportasi umum eksisting',
      'Stasiun transit-oriented development (TOD)',
      'Mengurangi kepadatan kendaraan pribadi 40%'
    ]
  },
  {
    shortTitle: 'Satu Kartu Layanan',
    fullTitle: 'Program Social Security Number (Satu Kartu Untuk Semua Layanan)',
    excerpt: 'Satu kartu digital untuk akses seluruh layanan publik kota secara terintegrasi.',
    description: 'Program inovasi layanan publik berupa satu kartu terintegrasi yang memungkinkan warga mengakses layanan kesehatan, pendidikan, sosial, perizinan, dan transportasi dalam satu platform digital yang aman dan efisien.',
    category: 'Smart City',
    iconBg: 'rgba(245,195,50,0.12)',
    iconBorder: 'rgba(245,195,50,0.25)',
    svg: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
    points: [
      'Integrasi data kependudukan satu sumber',
      'Akses layanan kesehatan dan pendidikan',
      'Sistem pembayaran transportasi terintegrasi',
      'Verifikasi identitas digital yang aman'
    ]
  },
  {
    shortTitle: 'Smart City Plus',
    fullTitle: 'Program Smart City Plus',
    excerpt: 'Transformasi kota cerdas dengan teknologi data, IoT, dan kecerdasan buatan.',
    description: 'Pengembangan ekosistem kota cerdas yang memanfaatkan teknologi Internet of Things (IoT), Big Data, dan Artificial Intelligence untuk pengelolaan kota yang efisien, transparan, dan berbasis data real-time.',
    category: 'Smart City',
    iconBg: 'rgba(192,132,252,0.12)',
    iconBorder: 'rgba(192,132,252,0.25)',
    svg: '<circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
    points: [
      'Command Center pengawasan kota 24/7',
      'Sensor IoT untuk monitoring lingkungan',
      'Dashboard data terbuka untuk publik',
      'AI untuk prediksi dan pengambilan keputusan'
    ]
  },
  {
    shortTitle: 'Doctor On Call',
    fullTitle: 'Program "Doctor On Call" untuk Kondisi Darurat, Lansia dan Balita',
    excerpt: 'Layanan kesehatan darurat 24 jam yang datang langsung ke lokasi pasien.',
    description: 'Program layanan kesehatan proaktif yang menyediakan tenaga medis siaga 24 jam untuk merespons kondisi darurat, memberikan pendampingan kesehatan bagi lansia, dan pemantauan tumbuh kembang balita langsung ke rumah warga.',
    category: 'Kesehatan',
    iconBg: 'rgba(239,68,68,0.12)',
    iconBorder: 'rgba(239,68,68,0.25)',
    svg: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/><path d="M12 12v6"/><circle cx="12" cy="12" r="10"/>',
    points: [
      'Tim medis siaga 24/7 via telepon dan aplikasi',
      'Pendampingan rutin lansia di rumah',
      'Monitoring tumbuh kembang balita berkala',
      'Ambulans cepat untuk kondisi darurat'
    ]
  },
  {
    shortTitle: 'Pendidikan Gratis',
    fullTitle: 'Program Bantuan Peralatan dan Sarana Pendidikan untuk Pendidikan Gratis 12 Tahun',
    excerpt: 'Menjamin akses pendidikan 12 tahun tanpa biaya dengan sarana memadai.',
    description: 'Program komitmen pemenuhan hak pendidikan dengan menyediakan bantuan peralatan sekolah lengkap, buku pelajaran, seragam, dan perbaikan sarana prasarana sekolah agar seluruh anak Samarinda dapat menikmati pendidikan gratis berkualitas hingga SMA.',
    category: 'Pendidikan',
    iconBg: 'rgba(96,165,250,0.12)',
    iconBorder: 'rgba(96,165,250,0.25)',
    svg: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    points: [
      'Bantuan peralatan sekolah lengkap per tahun',
      'Penyediaan buku pelajaran gratis',
      'Renovasi ruang kelas dan laboratorium',
      'Program beasiswa bagi siswa berprestasi'
    ]
  },
  {
    shortTitle: 'BUMKel',
    fullTitle: 'Pengembangan Badan Usaha Milik RT (Berbasis Kelurahan)',
    excerpt: 'Menguatkan ekonomi grassroots melalui Badan Usaha Milik Kelurahan.',
    description: 'Program pemberdayaan ekonomi berbasis kelurahan dengan membentuk dan mengembangkan Badan Usaha Milik Kelurahan (BUMKel) sebagai penggerak roda perekonomian di tingkat RT/RW yang dikelola secara profesional dan transparan.',
    category: 'Pemberdayaan',
    iconBg: 'rgba(52,211,153,0.12)',
    iconBorder: 'rgba(52,211,153,0.25)',
    svg: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/><rect x="1" y="1" width="8" height="8" rx="1"/><path d="M3 5h4M3 3h4"/>',
    points: [
      'Pembentukan BUMKel di seluruh kelurahan',
      'Pelatihan manajemen usaha untuk pengelola',
      'Modal awal dan pendampingan bisnis',
      'Integrasi produk BUMKel dengan pasar digital'
    ]
  },
  {
    shortTitle: 'Ruang Terbuka Hijau',
    fullTitle: 'Program Pengembangan Ruang Terbuka Hijau, Taman Rekreasi dan 1 Kelurahan 1 Playground',
    excerpt: 'Menciptakan kota hijau dengan taman dan playground di setiap kelurahan.',
    description: 'Program penghijauan kota yang bertujuan meningkatkan kualitas udara, menyediakan ruang rekreasi publik yang layak, dan memastikan setiap kelurahan memiliki setidaknya satu playground anak sebagai wujud kota ramah anak dan ramah lingkungan.',
    category: 'Lingkungan',
    iconBg: 'rgba(52,211,153,0.12)',
    iconBorder: 'rgba(52,211,153,0.25)',
    svg: '<path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z"/><path d="M12 13V7m-3 3h6"/><path d="M8 17h8"/>',
    points: [
      'Pembangunan taman kota di setiap kecamatan',
      '1 kelurahan 1 playground anak berkualitas',
      'Penanaman pohon peneduh dan penyerap polusi',
      'Pengelolaan taman berbasis partisipasi warga'
    ]
  },
  {
    shortTitle: '10.000 Wirausaha Baru',
    fullTitle: 'Program Penciptaan 10.000 Wira Usaha Baru (Start Up)',
    excerpt: 'Mencetak 10.000 pengusaha baru untuk menggerakkan roda ekonomi kota.',
    description: 'Program akselerasi kewirausahaan massal yang menargetkan penciptaan 10.000 wirausaha baru (start up) melalui pelatihan, inkubasi, mentoring, akses pendanaan, dan ekosistem pendukung yang memungkinkan UMKM Samarinda naik kelas.',
    category: 'Ekonomi',
    iconBg: 'rgba(245,200,50,0.12)',
    iconBorder: 'rgba(245,195,50,0.25)',
    svg: '<path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/><path d="M12 8v4l3 3"/>',
    points: [
      'Pelatihan kewirausahaan intensif berjenjang',
      'Inkubator start up dengan pendampingan mentor',
      'Akses pendanaan dan connect ke investor',
      'Ekosistem UMKM digital marketplace terintegrasi'
    ]
  }
]

function openModal(i) {
  modalOpen.value = i
  document.body.style.overflow = 'hidden'
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    modalOpen.value = null
    document.body.style.overflow = ''
  }
}

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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after {
  margin: 0; padding: 0; box-sizing: border-box;
}

.program-page {
  font-family: 'Poppins', sans-serif;
  background: #060e27;
  color: #fff;
  min-height: 100vh;
}

/* ═══════ SCROLL ANIMATION ═══════ */
.anim-target {
  opacity: 0; transform: translateY(36px);
  transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
.anim-target.visible { opacity: 1; transform: translateY(0); }

/* ═══════ HERO ═══════ */
.page-hero {
  position: relative;
  padding: 140px 48px 80px;
  overflow: hidden;
}
.hero-bg-pattern {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(245,195,50,0.03) 1px, transparent 1px);
  background-size: 28px 28px;
}
.hero-bg-pattern::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 60%;
  background: linear-gradient(to top, #060e27, transparent);
}
.hero-inner {
  position: relative; z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 18px 7px 12px;
  background: rgba(245,195,50,0.1);
  border: 1px solid rgba(245,195,50,0.25);
  border-radius: 100px;
  font-size: 12px; font-weight: 600; color: #f5c832;
  margin-bottom: 24px;
  animation: fadeUp 0.7s ease both;
}
.badge-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #f5c832;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.7); }
}
.hero-title {
  font-size: clamp(28px, 4.2vw, 48px);
  font-weight: 900; color: #fff;
  line-height: 1.15; letter-spacing: -0.5px;
  margin-bottom: 20px;
  animation: fadeUp 0.7s 0.1s ease both;
  opacity: 0;
}
.hero-title span {
  background: linear-gradient(135deg, #f5c832, #f59e0b, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-desc {
  font-size: 15px; font-weight: 400;
  color: rgba(255,255,255,0.6); line-height: 1.8;
  margin-bottom: 32px;
  animation: fadeUp 0.7s 0.2s ease both;
  opacity: 0;
}
.hero-back { animation: fadeUp 0.7s 0.3s ease both; opacity: 0; }
.back-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: rgba(255,255,255,0.55); text-decoration: none;
  font-size: 13px; font-weight: 500;
  padding: 8px 16px; border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.25s;
}
.back-link:hover { color: #f5c832; border-color: rgba(245,195,50,0.3); background: rgba(245,195,50,0.08); }
.back-icon { width: 16px; height: 16px; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ═══════ OVERVIEW ═══════ */
.overview-section {
  padding: 0 48px;
  margin-top: -40px;
  position: relative; z-index: 2;
}
.overview-container {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}
.overview-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.overview-card:hover {
  background: rgba(255,255,255,0.06);
  transform: translateY(-4px);
  border-color: rgba(255,255,255,0.12);
}
.overview-icon {
  width: 46px; height: 46px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
}
.ov-svg { width: 22px; height: 22px; color: #fff; }
.overview-value {
  font-size: 28px; font-weight: 900; color: #f5c832;
  line-height: 1; margin-bottom: 4px;
}
.overview-label {
  font-size: 12px; font-weight: 500;
  color: rgba(255,255,255,0.45);
}

/* ═══════ SECTION HEADER ═══════ */
.section-tag {
  display: inline-block; font-size: 11px; font-weight: 700;
  color: #f5c832; letter-spacing: 2.5px;
  text-transform: uppercase; margin-bottom: 12px;
}
.section-title {
  font-size: clamp(22px, 2.8vw, 36px);
  font-weight: 800; color: #fff; line-height: 1.2;
}
.section-header {
  margin-bottom: 44px;
}

/* ═══════ PROGRAM GRID ═══════ */
.program-section {
  padding: 80px 0 100px;
}
.program-container {
  max-width: 1200px; margin: 0 auto; padding: 0 48px;
}
.program-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
}

.program-card {
  position: relative;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 28px 24px 24px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  display: flex; flex-direction: column;
}
.program-card::before {
  content: '';
  position: absolute; inset: 0; border-radius: 20px; padding: 1px;
  background: linear-gradient(160deg, rgba(245,195,50,0.4) 0%, transparent 50%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  opacity: 0; transition: opacity 0.4s;
}
.program-card:hover::before { opacity: 1; }
.program-card:hover {
  background: rgba(14, 28, 70, 0.55);
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

.card-glow {
  position: absolute; top: -30px; right: -30px;
  width: 100px; height: 100px; border-radius: 50%;
  filter: blur(40px); opacity: 0; transition: opacity 0.4s;
}
.program-card:hover .card-glow { opacity: 1; }
.glow-0 { background: rgba(245,195,50,0.2); }
.glow-1 { background: rgba(96,165,250,0.2); }
.glow-2 { background: rgba(52,211,153,0.2); }
.glow-3 { background: rgba(192,132,252,0.2); }

.card-number {
  font-family: 'Poppins', sans-serif;
  font-size: 42px; font-weight: 900;
  color: rgba(255,255,255,0.04);
  line-height: 1; margin-bottom: 12px;
  transition: color 0.3s;
}
.program-card:hover .card-number { color: rgba(245,195,50,0.12); }

.card-icon-wrap {
  width: 48px; height: 48px; border-radius: 14px;
  border: 1px solid transparent;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 18px; color: #fff;
  transition: all 0.35s;
}
.program-card:hover .card-icon-wrap { transform: scale(1.08); }
.card-icon { width: 22px; height: 22px; }

.card-title {
  font-size: 16px; font-weight: 700; color: #fff;
  line-height: 1.35; margin-bottom: 10px;
}
.card-desc {
  font-size: 13px; font-weight: 400;
  color: rgba(255,255,255,0.45); line-height: 1.7;
  margin-bottom: auto; padding-bottom: 18px;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.card-category {
  font-size: 11px; font-weight: 600;
  color: rgba(255,255,255,0.35);
  padding: 4px 12px;
  background: rgba(255,255,255,0.05);
  border-radius: 100px;
  letter-spacing: 0.5px;
}
.card-arrow {
  width: 32px; height: 32px; border-radius: 8px;
  background: rgba(255,255,255,0.05);
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.3); transition: all 0.3s;
  opacity: 0; transform: translateX(-6px);
}
.program-card:hover .card-arrow {
  opacity: 1; transform: translateX(0);
  background: rgba(245,195,50,0.15); color: #f5c832;
}
.card-arrow svg { width: 14px; height: 14px; }

/* ═══════ BOTTOM CTA ═══════ */
.bottom-cta {
  padding: 0 48px 100px;
}
.cta-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  gap: 32px; padding: 40px 44px;
  border-radius: 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
}
.cta-text h3 {
  font-size: 20px; font-weight: 700; color: #fff;
  margin-bottom: 6px;
}
.cta-text p {
  font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.6;
}
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #f5c832, #e6a817);
  color: #0a0f2e; font-family: 'Poppins', sans-serif;
  font-size: 14px; font-weight: 700;
  text-decoration: none; border-radius: 12px;
  border: none; cursor: pointer;
  transition: all 0.3s; white-space: nowrap;
  box-shadow: 0 4px 20px rgba(245,195,50,0.3);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(245,195,50,0.45); }
.btn-icon { width: 18px; height: 18px; transition: transform 0.25s; }
.btn-primary:hover .btn-icon { transform: translateX(3px); }

/* ═══════ MODAL ═══════ */
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(6, 14, 39, 0.85);
  backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.modal-box {
  position: relative;
  width: 100%; max-width: 620px;
  max-height: 85vh; overflow-y: auto;
  background: rgba(10, 20, 55, 0.98);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.5);
}
.modal-box::-webkit-scrollbar { width: 6px; }
.modal-box::-webkit-scrollbar-track { background: transparent; }
.modal-box::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

.modal-close {
  position: absolute; top: 16px; right: 16px;
  width: 36px; height: 36px; border-radius: 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.5); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.25s;
}
.modal-close:hover { background: rgba(239,68,68,0.15); color: #ef4444; border-color: rgba(239,68,68,0.3); }
.modal-close svg { width: 16px; height: 16px; }

.modal-content { display: flex; flex-direction: column; align-items: center; text-align: center; }
.modal-number {
  font-size: 56px; font-weight: 900;
  color: rgba(245,195,50,0.1); line-height: 1; margin-bottom: 16px;
}
.modal-icon {
  width: 60px; height: 60px; border-radius: 16px;
  border: 1px solid transparent;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px; color: #fff;
}
.modal-icon-svg { width: 28px; height: 28px; }
.modal-category {
  font-size: 11px; font-weight: 700;
  color: #f5c832; letter-spacing: 2px;
  text-transform: uppercase; margin-bottom: 12px;
}
.modal-title {
  font-size: 22px; font-weight: 800; color: #fff;
  line-height: 1.3; margin-bottom: 16px;
}
.modal-desc {
  font-size: 14px; font-weight: 400;
  color: rgba(255,255,255,0.55); line-height: 1.75;
  margin-bottom: 28px;
}
.modal-points {
  list-style: none; width: 100%; text-align: left;
  display: flex; flex-direction: column; gap: 14px;
}
.modal-points li {
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 13.5px; font-weight: 500;
  color: rgba(255,255,255,0.75); line-height: 1.6;
}
.point-check {
  width: 20px; height: 20px; min-width: 20px;
  border-radius: 6px; background: rgba(52,211,153,0.15);
  color: #34d399; padding: 2px; margin-top: 1px;
}

.modal-enter-active { transition: all 0.3s ease-out; }
.modal-leave-active { transition: all 0.2s ease-in; }
.modal-enter-from { opacity: 0; }
.modal-enter-from .modal-box { transform: scale(0.92) translateY(20px); }
.modal-leave-to { opacity: 0; }
.modal-leave-to .modal-box { transform: scale(0.98); }

/* ═══════ RESPONSIVE ═══════ */
@media (max-width: 1024px) {
  .program-grid { grid-template-columns: repeat(2, 1fr); }
  .overview-container { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .page-hero { padding: 120px 20px 60px; }
  .overview-section { padding: 0 20px; }
  .program-container { padding: 0 20px; }
  .program-section { padding: 60px 0 80px; }
  .program-grid { grid-template-columns: 1fr; gap: 16px; }
  .cta-inner { flex-direction: column; text-align: center; padding: 32px 24px; }
  .bottom-cta { padding: 0 20px 80px; }
  .modal-box { padding: 32px 24px; }
  .modal-title { font-size: 18px; }
}

@media (max-width: 480px) {
  .overview-container { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .overview-card { padding: 18px; }
  .overview-value { font-size: 22px; }
  .card-number { font-size: 32px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>