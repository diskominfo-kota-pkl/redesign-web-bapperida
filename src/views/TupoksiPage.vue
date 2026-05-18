<template>
  <div class="tupoksi-page">
    <section class="page-hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-inner">
        <div class="hero-badge"><span class="badge-dot"></span> PROFIL</div>
        <h1 class="hero-title">Tugas Pokok &<br><span>Fungsi</span></h1>
        <p class="hero-desc">Berdasarkan Peraturan Walikota Samarinda Nomor 6 Tahun 2024 tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi, serta Tata Kerja Badan di Lingkungan Pemerintah Daerah.</p>
        <div class="hero-back">
          <a href="/" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="back-icon"><polyline points="15 18 9 12 15 6"/></svg>
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </section>

    <section class="tupoksi-section">
      <div class="tupoksi-container">
        <div class="tupoksi-list">
          <div
            v-for="(unit, idx) in tupoksi"
            :key="idx"
            class="tupoksi-card anim-target"
            :data-delay="(idx % 3) + 1"
            :class="{ open: openIdx === idx }"
          >
            <button class="tupoksi-header" @click="openIdx = openIdx === idx ? -1 : idx">
              <div class="header-left">
                <span class="header-num">{{ idx + 1 }}</span>
                <div>
                  <span class="header-role">{{ unit.role }}</span>
                  <h3>{{ unit.nama }}</h3>
                </div>
              </div>
              <svg class="header-chevron" :class="{ rotated: openIdx === idx }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <Transition name="accordion">
              <div v-show="openIdx === idx" class="tupoksi-body">
                <div class="tugas-block">
                  <div class="block-label">Tugas Pokok</div>
                  <p>{{ unit.tugas }}</p>
                </div>
                <div class="fungsi-block">
                  <div class="block-label">Fungsi ({{ unit.fungsi.length }})</div>
                  <ol class="fungsi-list">
                    <li v-for="(f, i) in unit.fungsi" :key="i">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"/></svg>
                      <span>{{ f }}</span>
                    </li>
                  </ol>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <section class="bottom-cta anim-target" data-delay="0">
      <div class="cta-inner">
        <div class="cta-text">
          <h3>Butuh Informasi Lebih Lengkap?</h3>
          <p>Hubungi BAPPERIDA untuk mendapatkan dokumen uraian tugas lengkap.</p>
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
import { ref, onMounted, onUnmounted } from 'vue'

const openIdx = ref(0)

const tupoksi = [
  {
    role: 'BADAN',
    nama: 'Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah',
    tugas: 'Badan mempunyai tugas membantu Wali Kota dalam melaksanakan fungsi penunjang urusan pemerintahan bidang perencanaan serta bidang penelitian dan pengembangan yang meliputi penelitian, pengembangan, pengkajian dan penerapan, serta invensi dan inovasi yang terintegrasi di Daerah.',
    fungsi: [
      'Pengoordinasian penyusunan rancangan dan pelaksanaan kebijakan, program dan kegiatan pada lingkup Badan',
      'Pengoordinasian penyusunan kebijakan teknis di bidang perencanaan serta bidang penelitian dan pengembangan yang meliputi penelitian, pengembangan, pengkajian dan penerapan, serta invensi dan inovasi yang terintegrasi di Daerah',
      'Pengoordinasian pelaksanaan tugas dukungan teknis di bidang perencanaan serta bidang penelitian dan pengembangan yang meliputi penelitian, pengembangan, pengkajian dan penerapan, serta invensi dan inovasi yang terintegrasi di Daerah',
      'Pengoordinasian pelaksanaan pemantauan, evaluasi, dan pelaporan pelaksanaan tugas dukungan teknis di bidang perencanaan serta bidang penelitian dan pengembangan yang meliputi penelitian, pengembangan, pengkajian dan penerapan, serta invensi dan inovasi yang terintegrasi di Daerah',
      'Pengoordinasian pelaksanaan pembinaan teknis penyelenggaraan fungsi-fungsi penunjang urusan pemerintahan Daerah di bidang perencanaan serta di bidang penelitian dan pengembangan yang meliputi penelitian, pengembangan, pengkajian dan penerapan, serta invensi dan inovasi yang terintegrasi di Daerah',
      'Pengoordinasian penyusunan Rencana Pembangunan Jangka Panjang Daerah (RPJPD), Rencana Pembangunan Jangka Menengah Daerah (RPJMD), dan Rencana Kerja Pemerintah Daerah (RKPD)',
      'Pengoordinasian pelaksanaan pembinaan dan pendampingan penyusunan Rencana Strategis (Renstra) dan Rencana Kerja (Renja) Perangkat Daerah',
      'Pengoordinasian fasilitasi pelaksanaan Musyawarah Perencanaan Pembangunan (Musrenbang) tingkat kota',
      'Pelaporan dan pertanggungjawaban pelaksanaan tugas dan fungsi',
      'Pelaksanaan fungsi lainnya yang diberikan oleh Wali Kota sesuai ketentuan peraturan perundang-undangan'
    ]
  },
  {
    role: 'SEKRETARIAT',
    nama: 'Sekretariat',
    tugas: 'Sekretariat mempunyai tugas menyelenggarakan kesekretariatan Badan.',
    fungsi: [
      'Pengoordinasian penyusunan dan pelaksanaan rencana program dan kegiatan kesekretariatan',
      'Pengoordinasian dan perumusan kebijakan teknis sesuai bidang tugasnya',
      'Pelaksanaan manajemen kinerja pegawai dalam lingkup tanggung jawabnya',
      'Pengoordinasian pengumpulan bahan dan penyusunan dokumen SAKIP, LKPJ Wali Kota, dan LPPD',
      'Pengoordinasian penyusunan dokumen perencanaan dan dokumen anggaran Badan',
      'Pengoordinasian pelaksanaan pengelolaan data dan dokumentasi hasil pelaksanaan program dan kegiatan',
      'Pengoordinasian fasilitasi pelaksanaan kegiatan evaluasi kinerja Badan',
      'Pengoordinasian pelaksanaan kegiatan pengelolaan dan penatausahaan keuangan serta verifikasi pertanggungjawaban keuangan Badan',
      'Pengoordinasian pelaksanaan dan pembinaan ketatausahaan, ketatalaksanaan, kelembagaan, kepustakaan dan kearsipan',
      'Pengoordinasian pengelolaan urusan kehumasan, keprotokolan, pengaduan, dan pelaksanaan fungsi PPID Pembantu',
      'Pengoordinasian pelaksanaan administrasi dan pembinaan kepegawaian',
      'Pengoordinasian pengelolaan urusan rumah tangga dan perlengkapan',
      'Pengoordinasian pelaksanaan kegiatan pengelolaan dan penatausahaan aset dan barang milik Daerah di lingkungan Badan',
      'Pengoordinasian pelaksanaan penyusunan SOP, Standar Pelayanan, Maklumat Pelayanan dan SKM',
      'Pengoordinasian fasilitasi pelaksanaan Reformasi Birokrasi, pembangunan Zona Integritas dan pengembangan inovasi Badan',
      'Pelaksanaan pemantauan, pengendalian, evaluasi, dan penyusunan laporan program kerja Sekretariat',
      'Pelaksanaan sistem pengendalian intern pemerintah',
      'Pelaksanaan fungsi lainnya yang diberikan oleh pimpinan sesuai dengan peraturan perundang-undangan'
    ]
  },
  {
    role: 'SUB BAGIAN',
    nama: 'Sub Bagian Umum dan Kepegawaian',
    tugas: 'Melaksanakan perencanaan, pengorganisasian, pelaksanaan dan pengendalian, serta evaluasi kegiatan kesekretariatan di bidang administrasi umum dan kepegawaian Badan.',
    fungsi: [
      'Penyusunan dan pelaksanaan rencana program dan kegiatan sesuai bidang tugasnya',
      'Penyiapan bahan perumusan kebijakan teknis sesuai bidang tugasnya',
      'Pelaksanaan manajemen kinerja pegawai dalam lingkup tanggung jawabnya',
      'Pelaksanaan pengelolaan administrasi umum, ketatalaksanaan, dan fasilitasi kelembagaan',
      'Pelaksanaan pengelolaan ketatausahaan, kepustakaan dan kearsipan',
      'Pelaksanaan urusan rumah tangga dan perlengkapan Badan',
      'Pelaksanaan pengadaan dan pemeliharaan sarana dan prasarana Badan',
      'Pelaksanaan pencatatan, pengadministrasian dan pengelolaan barang milik Daerah dan aset Daerah yang menjadi tanggung jawab Badan',
      'Pelaksanaan fasilitasi kegiatan Reformasi Birokrasi, pembangunan Zona Integritas dan pengembangan inovasi Badan',
      'Pelaksanaan kegiatan peningkatan kompetensi pegawai',
      'Pelaksanaan penyelenggaran administrasi kepegawaian dan penyusunan bahan pembinaan kedisiplinan pegawai',
      'Pelaksanaan tugas kehumasan dan keprotokolan, pengelolaan pengaduan dan pelaksanaan fungsi PPID Pembantu',
      'Pelaksanaan penyusunan SOP, Standar Pelayanan, Maklumat Pelayanan dan SKM',
      'Pelaksanaan pemantauan, pengendalian, evaluasi, dan penyusunan laporan program kerja sesuai bidang tugasnya',
      'Pelaksanaan sistem pengendalian intern pemerintah',
      'Pelaksanaan fungsi lainnya yang diberikan oleh pimpinan sesuai dengan peraturan perundang-undangan'
    ]
  },
  {
    role: 'SUB BAGIAN',
    nama: 'Sub Bagian Keuangan',
    tugas: 'Melaksanakan perencanaan, pengorganisasian, pelaksanaan, pengendalian dan evaluasi kegiatan kesekretariatan di bidang pengelolaan keuangan Badan.',
    fungsi: [
      'Penyusunan rencana program dan kegiatan sesuai bidang tugasnya',
      'Penyiapan bahan perumusan kebijakan teknis sesuai bidang tugasnya',
      'Pelaksanaan manajemen kinerja pegawai dalam lingkup tanggung jawabnya',
      'Penyusunan rencana usulan kebutuhan anggaran Badan',
      'Pelaksanaan penatausahaan keuangan dan perbendaharaan Badan',
      'Pelaksanaan verifikasi dan penyusunan pertanggungjawaban keuangan Badan',
      'Pelaksanaan sistem akuntansi pengelolaan keuangan Badan',
      'Penyusunan rekapitulasi penyerapan keuangan sebagai bahan evaluasi kinerja keuangan Badan',
      'Penyusunan neraca dan laporan keuangan Badan',
      'Pelaksanaan pemantauan, pengendalian, evaluasi, dan pelaporan program kerja sesuai bidang tugasnya',
      'Pelaksanaan sistem pengendalian intern pemerintah',
      'Pelaksanaan fungsi lainnya yang diberikan oleh pimpinan sesuai dengan ketentuan peraturan perundang-undangan'
    ]
  },
  {
    role: 'BIDANG',
    nama: 'Bidang Perencanaan, Pengendalian dan Evaluasi Pembangunan Daerah',
    tugas: 'Melaksanakan perumusan dan pelaksanaan kebijakan, pengaturan, pengendalian, pembinaan dan pengawasan di bidang perencanaan pembangunan, pengendalian dan evaluasi pembangunan Daerah.',
    fungsi: [
      'Pengoordinasian penyusunan dan pelaksanaan rencana program dan kegiatan sesuai bidang tugasnya',
      'Pengoordinasian dan perumusan kebijakan teknis sesuai bidang tugasnya',
      'Pelaksanaan manajemen kinerja pegawai dalam lingkup tanggung jawabnya',
      'Pengoordinasian pelaksanaan analisis dan pengkajian perencanaan dan pendanaan pembangunan Daerah',
      'Pengoordinasian pelaksanaan analisis dan pengkajian kewilayahan',
      'Pengoordinasian pelaksanaan pengumpulan dan analisis data dan informasi pembangunan untuk perencanaan pembangunan Daerah',
      'Pengoordinasian pengintegrasian dan harmonisasi program-program pembangunan di Daerah',
      'Pengoordinasian dan sinkronisasi pelaksanaan kebijakan perencanaan dan penganggaran di Daerah',
      'Pengoordinasian pelaksanaan evaluasi terhadap kebijakan perencanaan pembangunan Daerah dan pelaksanaan rencana pembangunan Daerah, serta hasil rencana pembangunan Daerah',
      'Pengoordinasian pelaksanaan pengendalian melalui pemantauan, supervisi dan tindak lanjut penyimpangan terhadap pencapaian tujuan agar program dan kegiatan sesuai dengan kebijakan pembangunan Daerah',
      'Pengoordinasian pelaksanaan identifikasi permasalahan pembangunan Daerah berdasarkan data untuk mengetahui perkembangan pembangunan',
      'Pengoordinasian penyajian dan pengamanan data informasi pembangunan Daerah',
      'Pengoordinasian pelaksanaan pengamanan data melalui bahan cetak dan elektronik sebagai bahan dokumentasi',
      'Pengoordinasian pelaksanaan evaluasi dan pelaporan program dan kegiatan pembangunan Daerah',
      'Pengoordinasian pengelolaan hasil evaluasi untuk penyiapan pelaporan program dan kegiatan pembangunan Daerah',
      'Pelaksanaan pemantauan, pengendalian, evaluasi, dan penyusunan laporan program kerja sesuai bidang tugasnya',
      'Pelaksanaan sistem pengendalian intern pemerintah',
      'Pelaksanaan fungsi lainnya yang diberikan oleh pimpinan sesuai dengan ketentuan peraturan perundang-undangan'
    ]
  },
  {
    role: 'BIDANG',
    nama: 'Bidang Pemerintahan dan Pembangunan Manusia',
    tugas: 'Melaksanakan perumusan dan pelaksanaan kebijakan, pengaturan, pengendalian, pembinaan dan pengawasan di bidang pemerintahan dan pembangunan manusia.',
    fungsi: [
      'Pengoordinasian penyusunan dan pelaksanaan rencana program dan kegiatan sesuai bidang tugasnya',
      'Pengoordinasian dan perumusan kebijakan teknis sesuai bidang tugasnya',
      'Pelaksanaan manajemen kinerja pegawai dalam lingkup tanggung jawabnya',
      'Pengoordinasian penyusunan dokumen perencanaan pembangunan Daerah (RPJPD, RPJMD dan RKPD) sesuai bidang tugasnya',
      'Pengoordinasian penyusunan Renstra Perangkat Daerah dan Renja Perangkat Daerah sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan musrenbang (RPJPD, RPJMD dan RKPD) sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan kesepakatan dengan DPRD terkait RPJPD, RPJMD, dan RKPD sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan kesepakatan dengan DPRD terkait APBD sesuai bidang tugasnya',
      'Pengoordinasian sinergitas dan harmonisasi kegiatan Perangkat Daerah sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan sinergitas dan harmonisasi kegiatan Kementerian/Lembaga di provinsi dan kota sesuai bidang tugasnya',
      'Pengoordinasian dukungan pelaksanaan kegiatan pusat untuk prioritas nasional sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan kesepakatan bersama kerja sama antar Daerah sesuai bidang tugasnya',
      'Pengoordinasian pembinaan teknis perencanaan kepada Perangkat Daerah sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan tugas melalui rapat/pertemuan untuk penyatuan pendapat',
      'Pelaksanaan pemantauan, pengendalian, evaluasi, dan penyusunan laporan program kerja sesuai bidang tugasnya',
      'Pelaksanaan sistem pengendalian intern pemerintah',
      'Pelaksanaan fungsi lainnya yang diberikan oleh pimpinan sesuai dengan ketentuan peraturan perundang-undangan'
    ]
  },
  {
    role: 'BIDANG',
    nama: 'Bidang Perekonomian, Sumber Daya Alam, Infrastruktur dan Kewilayahan',
    tugas: 'Melaksanakan perumusan dan pelaksanaan kebijakan, pengaturan, pengendalian, pembinaan dan pengawasan di bidang perekonomian, SDA, infrastruktur dan kewilayahan.',
    fungsi: [
      'Penyusunan dan pelaksanaan rencana program dan kegiatan sesuai bidang tugasnya',
      'Pengoordinasian dan perumusan kebijakan teknis sesuai bidang tugasnya',
      'Pelaksanaan manajemen kinerja pegawai dalam lingkup tanggung jawabnya',
      'Pelaksanaan koordinasi dengan instansi dan pihak terkait',
      'Pengoordinasian penyusunan dokumen perencanaan pembangunan Daerah (RPJPD, RPJMD dan RKPD) sesuai bidang tugasnya',
      'Pengoordinasian penyusunan Renstra Perangkat Daerah dan Renja Perangkat Daerah sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan musrenbang (RPJPD, RPJMD dan RKPD) sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan kesepakatan dengan DPRD terkait RPJPD, RPJMD, dan RKPD sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan kesepakatan dengan DPRD terkait APBD sesuai bidang tugasnya',
      'Pengoordinasian sinergitas dan harmonisasi kegiatan Perangkat Daerah sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan sinergitas dan harmonisasi kegiatan Kementerian/Lembaga di provinsi dan kota sesuai bidang tugasnya',
      'Pengoordinasian dukungan pelaksanaan kegiatan pusat untuk prioritas nasional sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan kesepakatan bersama kerja sama antar Daerah sesuai bidang tugasnya',
      'Pengoordinasian pembinaan teknis perencanaan kepada Perangkat Daerah sesuai bidang tugasnya',
      'Pengoordinasian pelaksanaan tugas melalui rapat/pertemuan untuk penyatuan pendapat',
      'Pelaksanaan pemantauan, pengendalian, evaluasi, dan penyusunan laporan program kerja sesuai bidang tugasnya',
      'Pelaksanaan sistem pengendalian intern pemerintah',
      'Pelaksanaan tugas lainnya yang diberikan oleh pimpinan sesuai dengan ketentuan peraturan perundang-undangan'
    ]
  },
  {
    role: 'BIDANG',
    nama: 'Bidang Riset dan Inovasi Daerah',
    tugas: 'Melaksanakan perumusan dan pelaksanaan kebijakan, pengaturan, pengendalian, pembinaan dan pengawasan penelitian, pengembangan, pengkajian, dan penerapan, serta invensi dan inovasi di Daerah secara menyeluruh dan berkelanjutan, dan melaksanakan penyusunan rencana induk dan peta jalan pemajuan ilmu pengetahuan dan teknologi di Daerah sebagai landasan dalam perencanaan pembangunan Daerah di segala bidang kehidupan yang berpedoman pada nilai Pancasila.',
    fungsi: [
      'Pengoordinasian penyusunan dan pelaksanaan rencana program dan kegiatan sesuai bidang tugasnya',
      'Pengoordinasian dan perumusan kebijakan teknis sesuai bidang tugasnya',
      'Pelaksanaan manajemen kinerja pegawai dalam lingkup tanggung jawabnya',
      'Pengoordinasian pelaksanaan kebijakan, fasilitasi, dan pembinaan pelaksanaan penelitian, pengembangan, pengkajian, dan penerapan, serta invensi dan inovasi di Daerah yang memperkuat fungsi dan kedudukan ilmu pengetahuan dan teknologi di Daerah sebagai landasan dalam perencanaan pembangunan Daerah di segala bidang kehidupan yang berpedoman pada nilai Pancasila',
      'Pengoordinasian penyusunan perencanaan, program, anggaran, kelembagaan, dan sumber daya penelitian, pengembangan, pengkajian, dan penerapan, serta invensi dan inovasi di Daerah yang berpedoman pada nilai Pancasila',
      'Pengoordinasian pelaksanaan koordinasi dan sinkronisasi pelaksanaan kebijakan di bidang riset dan inovasi, kerja sama pembangunan ilmu pengetahuan dan teknologi, serta kemitraan penelitian, pengembangan, pengkajian, dan penerapan, serta invensi dan inovasi di Daerah',
      'Pengoordinasian pemberian bimbingan teknis dan supervisi di bidang riset dan inovasi, kerja sama pembangunan ilmu pengetahuan dan teknologi, serta kemitraan penelitian, pengembangan, pengkajian, dan penerapan, serta invensi dan inovasi di Daerah',
      'Pengoordinasian pelaksanaan pemantauan dan evaluasi penelitian, pengembangan, penyelenggaraan pengkajian, dan penerapan, serta invensi dan inovasi di Daerah',
      'Pengoordinasian pelaksanaan pembangunan, pengembangan, pengelolaan dan pemanfaatan system informasi ilmu pengetahuan dan teknologi di Daerah',
      'Pengoordinasian pelaksanaan penelitian dan pengabdian kepada masyarakat berbasis penelitian, pengembangan, pengkajian, dan penerapan ilmu pengetahuan dan teknologi yang dihasilkan oleh lembaga/pusat/organisasi penelitian lainnya di Daerah',
      'Pengoordinasian pengelolaan sistem ilmu pengetahuan dan teknologi di Daerah',
      'Pelaksanaan pemantauan, pengendalian, evaluasi, dan penyusunan laporan program kerja sesuai bidang tugasnya',
      'Pelaksanaan sistem pengendalian intern pemerintah',
      'Pelaksanaan fungsi lainnya yang diberikan oleh pimpinan sesuai dengan ketentuan peraturan perundang-undangan'
    ]
  }
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
.tupoksi-page{font-family:'Poppins',sans-serif;background:#060e27;color:#fff;min-height:100vh}
.anim-target{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.anim-target.visible{opacity:1;transform:translateY(0)}

.page-hero{position:relative;padding:140px 48px 80px;overflow:hidden}
.hero-bg-pattern{position:absolute;inset:0;background-image:radial-gradient(rgba(245,195,50,.03) 1px,transparent 1px);background-size:28px 28px}
.hero-bg-pattern::after{content:'';position:absolute;bottom:0;left:0;right:0;height:60%;background:linear-gradient(to top,#060e27,transparent)}
.hero-inner{position:relative;z-index:1;max-width:860px;margin:0 auto;text-align:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 18px 7px 12px;background:rgba(245,195,50,.1);border:1px solid rgba(245,195,50,.25);border-radius:100px;font-size:12px;font-weight:600;color:#f5c832;margin-bottom:24px;animation:fadeUp .7s ease both}
.badge-dot{width:8px;height:8px;border-radius:50%;background:#f5c832;animation:pulse-dot 2s ease-in-out infinite}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
.hero-title{font-size:clamp(28px,4.2vw,48px);font-weight:900;color:#fff;line-height:1.15;letter-spacing:-.5px;margin-bottom:20px;animation:fadeUp .7s .1s ease both;opacity:0}
.hero-title span{background:linear-gradient(135deg,#f5c832,#f59e0b,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-desc{font-size:14px;font-weight:400;color:rgba(255,255,255,.55);line-height:1.8;margin-bottom:32px;animation:fadeUp .7s .2s ease both;opacity:0}
.hero-back{animation:fadeUp .7s .3s ease both;opacity:0}
.back-link{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.55);text-decoration:none;font-size:13px;font-weight:500;padding:8px 16px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);transition:all .25s}
.back-link:hover{color:#f5c832;border-color:rgba(245,195,50,.3);background:rgba(245,195,50,.08)}
.back-icon{width:16px;height:16px}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

.tupoksi-section{padding:0 0 100px}
.tupoksi-container{max-width:1200px;margin:0 auto;padding:0 48px}
.tupoksi-list{display:flex;flex-direction:column;gap:12px}

.tupoksi-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;overflow:hidden;transition:all .4s cubic-bezier(.25,.46,.45,.94)}
.tupoksi-card.open{border-color:rgba(245,195,50,.2)}
.tupoksi-card:hover{background:rgba(255,255,255,.05)}

.tupoksi-header{display:flex;align-items:center;justify-content:space-between;width:100%;padding:20px 28px;background:none;border:none;cursor:pointer;text-align:left;font-family:'Poppins',sans-serif;transition:background .2s}
.tupoksi-header:hover{background:rgba(255,255,255,.02)}
.header-left{display:flex;align-items:center;gap:16px}
.header-num{width:36px;height:36px;border-radius:10px;background:rgba(245,195,50,.1);color:#f5c832;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0;transition:all .25s}
.tupoksi-card.open .header-num{background:linear-gradient(135deg,#f5c832,#e6a817);color:#0a0f2e}
.header-role{font-size:9px;font-weight:700;color:rgba(255,255,255,.3);letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:2px}
.tupoksi-header h3{font-size:14px;font-weight:700;color:#fff;margin:0;line-height:1.4}
.header-chevron{width:20px;height:20px;color:rgba(255,255,255,.3);transition:transform .3s,color .3s;flex-shrink:0}
.header-chevron.rotated{transform:rotate(180deg);color:#f5c832}

.tupoksi-body{padding:0 28px 28px 80px}
.tugas-block{margin-bottom:24px;padding:20px 24px;background:rgba(245,195,50,.04);border:1px solid rgba(245,195,50,.1);border-radius:12px}
.block-label{font-size:10px;font-weight:700;color:#f5c832;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px}
.tugas-block p{font-size:13.5px;font-weight:500;color:rgba(255,255,255,.7);line-height:1.75;margin:0}
.fungsi-block{}
.fungsi-list{list-style:none;display:flex;flex-direction:column;gap:10px;padding:0;margin:0}
.fungsi-list li{display:flex;align-items:flex-start;gap:12px;font-size:13px;font-weight:400;color:rgba(255,255,255,.6);line-height:1.7}
.check-icon{width:20px;height:20px;min-width:20px;border-radius:6px;background:rgba(52,211,153,.12);color:#34d399;padding:2px;margin-top:2px}

.accordion-enter-active,.accordion-leave-active{transition:all .3s ease;overflow:hidden}
.accordion-enter-from,.accordion-leave-to{opacity:0;max-height:0}
.accordion-enter-to,.accordion-leave-from{opacity:1;max-height:3000px}

.bottom-cta{padding:0 48px 100px}
.cta-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:32px;padding:40px 44px;border-radius:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07)}
.cta-text h3{font-size:20px;font-weight:700;color:#fff;margin-bottom:6px}
.cta-text p{font-size:14px;color:rgba(255,255,255,.5);line-height:1.6}
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:linear-gradient(135deg,#f5c832,#e6a817);color:#0a0f2e;font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:12px;border:none;cursor:pointer;transition:all .3s;white-space:nowrap;box-shadow:0 4px 20px rgba(245,195,50,.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(245,195,50,.45)}
.btn-icon{width:18px;height:18px;transition:transform .25s}
.btn-primary:hover .btn-icon{transform:translateX(3px)}

@media(max-width:1024px){.tupoksi-container,.bottom-cta{padding-left:24px;padding-right:24px}}
@media(max-width:768px){
  .page-hero{padding:120px 20px 60px}
  .tupoksi-container,.bottom-cta{padding-left:20px;padding-right:20px}
  .tupoksi-header{padding:16px 20px}
  .tupoksi-body{padding:0 20px 20px 20px}
  .tugas-block{padding:16px 18px}
  .cta-inner{flex-direction:column;text-align:center;padding:32px 24px}
  .bottom-cta{padding-bottom:80px}
}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>