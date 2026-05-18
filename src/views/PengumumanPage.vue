<template>
  <div class="Pengumuman">

    <!-- ══════════════ HERO ══════════════ -->
    <section class="pg-hero">
      <div class="pg-hero-bg"></div>
      <div class="pg-hero-overlay"></div>
      <div class="pg-hero-glow pg-hero-glow--1"></div>
      <div class="pg-hero-glow pg-hero-glow--2"></div>
      <div class="pg-hero-content">
        <nav class="pg-breadcrumb" :class="{ show: pageReady }">
          <router-link to="/" class="pg-breadcrumb__link">Beranda</router-link>
          <svg class="pg-breadcrumb__sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
          <span class="pg-breadcrumb__current">Pengumuman</span>
        </nav>
        <div class="pg-hero__icon" :class="{ show: pageReady }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </div>
        <h1 class="pg-hero__title" :class="{ show: pageReady }">Pengumuman</h1>
        <p class="pg-hero__desc" :class="{ show: pageReady }">Informasi resmi, peraturan, edaran, dan pengumuman penting dari BAPPERIDA Kota Samarinda.</p>
        <div class="pg-hero__stats" :class="{ show: pageReady }">
          <div class="pg-hero__stat">
            <span class="pg-hero__stat-num">{{ pengumumanData.length }}</span>
            <span class="pg-hero__stat-label">Total</span>
          </div>
          <div class="pg-hero__stat-divider"></div>
          <div class="pg-hero__stat">
            <span class="pg-hero__stat-num">{{ countTahunIni }}</span>
            <span class="pg-hero__stat-label">Tahun {{ currentYear }}</span>
          </div>
          <div class="pg-hero__stat-divider"></div>
          <div class="pg-hero__stat">
            <span class="pg-hero__stat-num">{{ count30Hari }}</span>
            <span class="pg-hero__stat-label">30 Hari Terakhir</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════ CONTENT ══════════════ -->
    <section class="pg-main" ref="mainEl">

      <!-- ─── Toolbar ─── -->
      <div class="pg-toolbar" :class="{ show: mainReady }" style="transition-delay:.05s">
        <div class="pg-toolbar__left">
          <div class="pg-search">
            <svg class="pg-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="q" class="pg-search__input" placeholder="Cari pengumuman..." />
            <button v-if="q" class="pg-search__clear" @click="q = ''">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
        <div class="pg-toolbar__right">
          <div class="pg-sort">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="8" y2="18"/></svg>
            <select v-model="sort" class="pg-sort__select">
              <option value="terbaru">Terbaru</option>
              <option value="terlama">Terlama</option>
              <option value="populer">Terpopuler</option>
            </select>
          </div>
          <div class="pg-views">
            <button class="pg-vbtn" :class="{ active: view === 'card' }" @click="view = 'card'">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
            <button class="pg-vbtn" :class="{ active: view === 'list' }" @click="view = 'list'">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- ─── Filter Tags ─── -->
      <div class="pg-tags" :class="{ show: mainReady }" style="transition-delay:.1s">
        <button v-for="c in cats" :key="c.key" class="pg-tag" :class="{ active: cat === c.key }" @click="cat = c.key; page = 1">
          <span class="pg-tag__dot" :style="{ background: c.color }"></span>
          {{ c.label }}
          <span class="pg-tag__count">{{ catCount(c.key) }}</span>
        </button>
      </div>

      <!-- ─── Info ─── -->
      <div class="pg-info" :class="{ show: mainReady }" style="transition-delay:.12s">
        Menampilkan <strong>{{ filtered.length }}</strong> dari <strong>{{ pengumumanData.length }}</strong> pengumuman
      </div>

      <!-- ═══ CARD VIEW ═══ -->
      <div v-if="view === 'card'" class="pg-cards">
        <a
          v-for="(item, i) in paged"
          :key="item.id"
          href="#"
          class="pg-card"
          :class="{ show: mainReady }"
          :style="{ transitionDelay: `${0.14 + i * 0.04}s` }"
          @click.prevent="open(item)"
        >
          <div class="pg-card__head">
            <span class="pg-badge" :class="'is-' + item.type">{{ item.typeLabel }}</span>
            <span class="pg-card__date">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {{ item.dateStr }}
            </span>
          </div>
          <h3 class="pg-card__title">{{ item.title }}</h3>
          <p class="pg-card__excerpt">{{ item.excerpt }}</p>
          <div class="pg-card__foot">
            <div class="pg-card__meta">
              <span class="pg-card__mi">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {{ item.publisher }}
              </span>
              <span class="pg-card__mi">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {{ item.views }}
              </span>
            </div>
            <span class="pg-card__arrow">
              Baca
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
          <!-- File indicator -->
          <div v-if="item.file" class="pg-card__file">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            {{ item.file.name }}
          </div>
        </a>
      </div>

      <!-- ═══ LIST VIEW ═══ -->
      <div v-if="view === 'list'" class="pg-list">
        <div class="pg-list__head" :class="{ show: mainReady }" style="transition-delay:.14s">
          <span>Jenis</span><span>Judul</span><span>Tanggal</span><span>Penerbit</span><span>Dilihat</span><span></span>
        </div>
        <a
          v-for="(item, i) in paged"
          :key="item.id"
          href="#"
          class="pg-list__row"
          :class="{ show: mainReady }"
          :style="{ transitionDelay: `${0.14 + i * 0.03}s` }"
          @click.prevent="open(item)"
        >
          <span class="pg-list__type">
            <span class="pg-list__dot" :class="'is-' + item.type"></span>
            {{ item.typeLabel }}
          </span>
          <span class="pg-list__title">{{ item.title }}</span>
          <span class="pg-list__date">{{ item.dateShort }}</span>
          <span class="pg-list__pub">{{ item.publisher }}</span>
          <span class="pg-list__views">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {{ item.views }}
          </span>
          <span class="pg-list__go">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </a>
      </div>

      <!-- ─── Empty ─── -->
      <div v-if="filtered.length === 0" class="pg-empty" :class="{ show: mainReady }">
        <svg viewBox="0 0 120 120" fill="none" class="pg-empty__svg"><rect x="20" y="30" width="80" height="65" rx="8" stroke="currentColor" stroke-width="2" opacity="0.15"/><line x1="35" y1="48" x2="85" y2="48" stroke="currentColor" stroke-width="2" opacity="0.1"/><line x1="35" y1="58" x2="75" y2="58" stroke="currentColor" stroke-width="2" opacity="0.08"/><line x1="35" y1="68" x2="65" y2="68" stroke="currentColor" stroke-width="2" opacity="0.06"/><circle cx="60" cy="18" r="12" stroke="currentColor" stroke-width="2" opacity="0.12"/></svg>
        <p class="pg-empty__title">Tidak ada pengumuman ditemukan</p>
        <p class="pg-empty__desc">Coba ubah filter atau kata kunci pencarian.</p>
        <button class="pg-empty__btn" @click="resetFilter">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Reset Filter
        </button>
      </div>

      <!-- ─── Pagination ─── -->
      <div v-if="totalPages > 1" class="pg-pages" :class="{ show: mainReady }" style="transition-delay:.3s">
        <button class="pg-pg" :class="{ off: page === 1 }" @click="go(page - 1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 6 9 12 15 18"/></svg>
        </button>
        <template v-for="p in pageList" :key="p">
          <span v-if="p === '...'" class="pg-pg__dots">...</span>
          <button v-else class="pg-pg" :class="{ active: p === page }" @click="go(p)">{{ p }}</button>
        </template>
        <button class="pg-pg" :class="{ off: page === totalPages }" @click="go(page + 1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
      </div>

    </section>

    <!-- ═══════ DETAIL MODAL ═══════ -->
    <Teleport to="body">
      <div class="pg-modal-bg" :class="{ open: modal }" @click.self="close">
        <div class="pg-modal" :class="{ open: modal }">
          <button class="pg-modal__x" @click="close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div v-if="sel" class="pg-modal__body">
            <div class="pg-modal__head">
              <span class="pg-badge" :class="'is-' + sel.type">{{ sel.typeLabel }}</span>
              <span class="pg-modal__date">{{ sel.dateStr }}</span>
            </div>
            <h2 class="pg-modal__title">{{ sel.title }}</h2>
            <div class="pg-modal__meta">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {{ sel.publisher }}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                {{ sel.views }} kali dilihat
              </span>
            </div>
            <div class="pg-modal__line"></div>
            <div class="pg-modal__content" v-html="sel.content"></div>

            <!-- File Download -->
            <div v-if="sel.file" class="pg-modal__dl">
              <div class="pg-modal__dl-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div class="pg-modal__dl-info">
                <span class="pg-modal__dl-name">{{ sel.file.name }}</span>
                <span class="pg-modal__dl-size">{{ sel.file.size }}</span>
              </div>
              <a :href="sel.file.src" :download="sel.file.name" class="pg-modal__dl-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Unduh PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const pageReady = ref(false);
const mainReady = ref(false);
const mainEl = ref(null);
const q = ref('');
const sort = ref('terbaru');
const cat = ref('all');
const view = ref('card');
const page = ref(1);
const perPage = 6;
const modal = ref(false);
const sel = ref(null);
const now = new Date();
const currentYear = now.getFullYear();

const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const bulanShort = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

function fmtDate(d) {
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtShort(d) {
  return `${d.getDate()} ${bulanShort[d.getMonth()]} ${d.getFullYear()}`;
}

/* ═══════════════════════════════════
   ISI PDF Peraturan Wali Kota No.31/2022
   dijadikan konten HTML untuk modal
   ═══════════════════════════════════ */
const pdfContent = `
<p style="text-align:center;margin-bottom:4px;"><strong>PEMERINTAH KOTA SAMARINDA</strong></p>
<p style="text-align:center;margin-bottom:4px;"><strong>PROVINSI KALIMANTAN TIMUR</strong></p>
<p style="text-align:center;margin-bottom:24px;"><strong>PERATURAN WALI KOTA SAMARINDA NOMOR 31 TAHUN 2022</strong></p>
<p style="text-align:center;margin-bottom:24px;"><strong>TENTANG</strong></p>
<p style="text-align:center;margin-bottom:24px;font-size:15px;"><strong>KETENTUAN HARI KERJA DAN JAM KERJA DI LINGKUNGAN PEMERINTAH DAERAH</strong></p>
<p style="text-align:center;margin-bottom:24px;"><strong>DENGAN RAHMAT TUHAN YANG MAHA ESA</strong></p>
<p style="margin-bottom:4px;"><strong>WALI KOTA SAMARINDA,</strong></p>
<p style="margin-bottom:16px;"><strong>Menimbang:</strong></p>
<ol style="padding-left:20px;margin-bottom:16px;">
  <li style="margin-bottom:8px;">Bahwa untuk meningkatkan integritas, mendorong profesionalitas dan akuntabilitas, meningkatkan disiplin kerja pegawai dan kualitas pelayanan publik, serta mewujudkan kelancaran pelaksanaan tugas, diperlukan pengaturan mengenai hari kerja dan jam kerja di lingkungan Pemerintah Daerah;</li>
  <li style="margin-bottom:8px;">Bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a, perlu menetapkan Peraturan Wali Kota tentang Ketentuan Hari Kerja dan Jam Kerja di Lingkungan Pemerintah Daerah.</li>
</ol>
<p style="margin-bottom:16px;"><strong>Menetapkan:</strong> PERATURAN WALI KOTA TENTANG KETENTUAN HARI KERJA DAN JAM KERJA DI LINGKUNGAN PEMERINTAH DAERAH.</p>

<p style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);margin:24px 0 12px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">BAB I — KETENTUAN UMUM</p>

<p style="margin-bottom:12px;"><strong>Pasal 1</strong></p>
<p style="margin-bottom:8px;">Dalam Peraturan Wali Kota ini yang dimaksud dengan:</p>
<ol style="padding-left:20px;margin-bottom:16px;">
  <li style="margin-bottom:4px;">Daerah adalah Kota Samarinda.</li>
  <li style="margin-bottom:4px;">Wali Kota adalah Wali Kota Samarinda.</li>
  <li style="margin-bottom:4px;">Pemerintah Daerah adalah Wali Kota sebagai unsur penyelenggara Pemerintahan Daerah yang memimpin pelaksanaan urusan pemerintahan yang menjadi kewenangan daerah otonom Kota Samarinda.</li>
  <li style="margin-bottom:4px;">Hari Kerja adalah hari kerja yang ditetapkan sesuai dengan ketentuan peraturan perundang-undangan.</li>
  <li style="margin-bottom:4px;">Jam Kerja adalah rentang waktu yang digunakan pegawai untuk bekerja di kantor sebagaimana ditentukan peraturan perundang-undangan.</li>
  <li style="margin-bottom:4px;">Jumlah Jam Kerja Efektif adalah jumlah jam kerja minimal dalam 1 (satu) minggu.</li>
  <li style="margin-bottom:4px;">Pegawai adalah Pegawai ASN, CPNS, dan Pegawai Non ASN yang bekerja di lingkungan Pemerintah Kota Samarinda.</li>
  <li style="margin-bottom:4px;">TPP adalah Tambahan Penghasilan Pegawai yang diberikan dalam rangka peningkatan kesejahteraan pegawai.</li>
  <li style="margin-bottom:4px;">Keadaan Kahar (force majeure) adalah suatu kejadian yang terjadi di luar kemampuan dan kendali manusia.</li>
</ol>

<p style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);margin:24px 0 12px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">BAB II — HARI KERJA DAN JAM KERJA</p>

<p style="margin-bottom:12px;"><strong>Pasal 3</strong></p>
<ol style="padding-left:20px;margin-bottom:16px;">
  <li style="margin-bottom:8px;">Setiap Pegawai wajib mematuhi ketentuan Hari Kerja dan Jam Kerja.</li>
  <li style="margin-bottom:8px;">Hari Kerja Pegawai di lingkungan Pemerintah Daerah yaitu <strong>5 (lima) Hari Kerja</strong> yang dimulai pada hari Senin sampai dengan hari Jumat dengan jumlah Jam Kerja Efektif selama <strong>37 jam 30 menit</strong> dalam 1 minggu.</li>
  <li style="margin-bottom:8px;">Rincian Hari Kerja dan Jam Kerja:
    <ul style="padding-left:20px;margin-top:8px;">
      <li style="margin-bottom:4px;">Senin sampai dengan Kamis: pukul <strong>07.30 - 16.00 Wita</strong></li>
      <li style="margin-bottom:4px;">Jumat: pukul <strong>07.30 - 11.00 Wita</strong></li>
    </ul>
  </li>
</ol>

<p style="margin-bottom:12px;"><strong>Pasal 4</strong></p>
<p style="margin-bottom:8px;">Dikecualikan dari ketentuan Pasal 3, Perangkat Daerah/Unit Kerja yang melaksanakan <strong>6 (enam) Hari Kerja</strong> dengan rincian:</p>
<ul style="padding-left:20px;margin-bottom:16px;">
  <li style="margin-bottom:4px;">Senin sampai dengan Kamis: pukul 07.30 - 14.30 Wita</li>
  <li style="margin-bottom:4px;">Jumat: pukul 07.30 - 11.30 Wita</li>
  <li style="margin-bottom:4px;">Sabtu: pukul 07.30 - 13.00 Wita</li>
</ul>

<p style="margin-bottom:12px;"><strong>Pasal 5</strong></p>
<p style="margin-bottom:8px;">Bagi Perangkat Daerah/Unit Kerja yang memberikan pelayanan kepada masyarakat secara terus-menerus selama 24 jam termasuk pada hari libur, dapat menerapkan <strong>Hari Kerja dan Jam Kerja khusus</strong> yang ditetapkan dengan Keputusan Kepala Perangkat Daerah.</p>

<p style="margin-bottom:12px;"><strong>Pasal 7</strong></p>
<p style="margin-bottom:16px;">Jam Kerja pada bulan Ramadan diatur tersendiri pada setiap bulan Ramadan yang pelaksanaannya mengacu pada ketentuan yang berlaku.</p>

<p style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);margin:24px 0 12px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">BAB III — PELAKSANAAN APEL PAGI</p>

<p style="margin-bottom:12px;"><strong>Pasal 8</strong></p>
<ol style="padding-left:20px;margin-bottom:16px;">
  <li style="margin-bottom:6px;">Setiap Pegawai wajib mengikuti Apel pagi dan mengisi Daftar Hadir Apel pagi.</li>
  <li style="margin-bottom:6px;">Apel pagi dilaksanakan setiap hari <strong>Senin</strong> setelah mengisi Daftar Hadir masuk kerja pada pukul 07.30 Wita.</li>
  <li style="margin-bottom:6px;">Perangkat Daerah/Unit Kerja yang berada di komplek perkantoran dapat dilaksanakan terpadu di satu tempat.</li>
  <li style="margin-bottom:6px;">Perangkat Daerah/Unit Kerja yang berada di luar komplek perkantoran dapat dilaksanakan di halaman kantor masing-masing.</li>
</ol>

<p style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);margin:24px 0 12px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">BAB IV — DAFTAR HADIR</p>

<p style="margin-bottom:12px;"><strong>Pasal 9</strong></p>
<ol style="padding-left:20px;margin-bottom:16px;">
  <li style="margin-bottom:6px;">Setiap Pegawai wajib mengisi Daftar Hadir secara <strong>elektronik</strong>.</li>
  <li style="margin-bottom:6px;">Pengisian Daftar Hadir Elektronik dinyatakan sah dilakukan paling sedikit <strong>2 (dua) kali</strong> yaitu saat masuk kerja dan pulang kerja.</li>
  <li style="margin-bottom:6px;">Daftar Hadir Elektronik dibuka <strong>90 menit</strong> sebelum jam masuk kerja dan ditutup <strong>240 menit</strong> setelah jam pulang kerja.</li>
  <li style="margin-bottom:6px;">Daftar Hadir Elektronik dapat berupa: sistem biometrik pengenalan wajah, sidik jari/telapak tangan, dan/atau sistem elektronik lainnya.</li>
</ol>

<p style="margin-bottom:12px;"><strong>Pasal 10</strong></p>
<p style="margin-bottom:8px;">Pengisian Daftar Hadir dapat dilakukan secara <strong>manual</strong> apabila:</p>
<ul style="padding-left:20px;margin-bottom:16px;">
  <li style="margin-bottom:4px;">Sistem Daftar Hadir Elektronik mengalami kerusakan/kegagalan fungsi;</li>
  <li style="margin-bottom:4px;">Terjadi gagal rekam dikarenakan kondisi jaringan atau aspek teknis lainnya;</li>
  <li style="margin-bottom:4px;">Pegawai belum terdaftar dalam sistem;</li>
  <li style="margin-bottom:4px;">Kondisi geografis/lokasi tempat kerja tidak memungkinkan;</li>
  <li style="margin-bottom:4px;">Kondisi anggota tubuh tidak memungkinkan; atau</li>
  <li style="margin-bottom:4px;">Terjadi Keadaan Kahar (force majeure).</li>
</ul>

<p style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);margin:24px 0 12px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">BAB V — IZIN MENINGGALKAN KANTOR PADA JAM KERJA</p>

<p style="margin-bottom:12px;"><strong>Pasal 12</strong></p>
<ol style="padding-left:20px;margin-bottom:16px;">
  <li style="margin-bottom:6px;">Izin meninggalkan kantor pada Jam Kerja diatur oleh Kepala Perangkat Daerah/Unit Kerja atau atasan langsung sesuai kebutuhan, urgensi dan tingkat kepentingan.</li>
  <li style="margin-bottom:6px;">Pegawai yang meninggalkan kantor wajib mendapatkan izin dan mengisi buku kendali/pencatatan.</li>
  <li style="margin-bottom:6px;">Pegawai yang tidak berada di kantor pada Jam Kerja dan tidak mengisi buku kendali dianggap <strong>meninggalkan kantor tanpa izin</strong>.</li>
  <li style="margin-bottom:6px;">Izin meninggalkan kantor hanya dapat diberikan paling lama <strong>2 jam per hari</strong> dan paling banyak <strong>8 jam per minggu</strong>.</li>
</ol>

<p style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);margin:24px 0 12px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">BAB VI — SANKSI</p>

<p style="margin-bottom:12px;"><strong>Pasal 13 — Sanksi Pegawai ASN</strong></p>
<div style="overflow-x:auto;margin-bottom:16px;">
<table style="width:100%;border-collapse:collapse;font-size:12.5px;">
<thead>
<tr style="background:rgba(245,195,50,0.08);">
<th style="padding:10px 12px;text-align:left;border-bottom:2px solid rgba(245,195,50,0.3);color:#f5c832;font-weight:700;">Pelanggaran</th>
<th style="padding:10px 12px;text-align:left;border-bottom:2px solid rgba(245,195,50,0.3);color:#f5c832;font-weight:700;">Sanksi TPP</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Tidak masuk kerja tanpa keterangan</td><td style="padding:8px 12px;"><strong>7%</strong> per hari</td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Terlambat 1-30 menit</td><td style="padding:8px 12px;"><strong>2,5%</strong> × jumlah hari</td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Terlambat 31-60 menit</td><td style="padding:8px 12px;"><strong>3%</strong> × jumlah hari</td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Terlambat 61-90 menit</td><td style="padding:8px 12px;"><strong>4%</strong> × jumlah hari</td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Terlambat ≥ 91 menit</td><td style="padding:8px 12px;"><strong>5%</strong> × jumlah hari</td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Tidak mengisi daftar hadir</td><td style="padding:8px 12px;"><strong>6%</strong> (dikonversi 120 menit)</td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Meninggalkan kantor tanpa izin</td><td style="padding:8px 12px;"><strong>2,5%</strong> per jam</td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Tidak mengikuti apel pagi</td><td style="padding:8px 12px;"><strong>3%</strong> per ketidakhadiran</td></tr>
<tr><td style="padding:8px 12px;">Akumulasi > 780 menit/bulan</td><td style="padding:8px 12px;"><strong>Penundaan TPP</strong> 1 bulan</td></tr>
</tbody>
</table>
</div>
<p style="font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:16px;">* Pengurangan TPP diakumulasikan paling banyak 100% dalam 1 bulan.</p>

<p style="margin-bottom:12px;"><strong>Pasal 14 — Sanksi Pegawai Non ASN</strong></p>
<div style="overflow-x:auto;margin-bottom:16px;">
<table style="width:100%;border-collapse:collapse;font-size:12.5px;">
<thead>
<tr style="background:rgba(96,165,250,0.08);">
<th style="padding:10px 12px;text-align:left;border-bottom:2px solid rgba(96,165,250,0.3);color:#60a5fa;font-weight:700;">Pelanggaran Kumulatif</th>
<th style="padding:10px 12px;text-align:left;border-bottom:2px solid rgba(96,165,250,0.3);color:#60a5fa;font-weight:700;">Sanksi</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Tidak masuk 3-5 hari kerja/tahun</td><td style="padding:8px 12px;">Teguran tertulis</td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Tidak masuk 6-9 hari kerja/tahun</td><td style="padding:8px 12px;">Surat peringatan</td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Tidak masuk 10 hari berturut-turut / 28 hari kumulatif</td><td style="padding:8px 12px;"><strong>Pemutusan hubungan kerja</strong></td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Ketidakhadiran kumulatif 1.530 menit/tahun</td><td style="padding:8px 12px;">Teguran tertulis</td></tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:8px 12px;">Ketidakhadiran kumulatif 4.590 menit/tahun</td><td style="padding:8px 12px;">Surat peringatan</td></tr>
<tr><td style="padding:8px 12px;">Ketidakhadiran kumulatif 9.000 menit/tahun</td><td style="padding:8px 12px;"><strong>Pemutusan hubungan kerja</strong></td></tr>
</tbody>
</table>
</div>

<p style="margin-bottom:12px;"><strong>Pasal 15 — Pengecualian Sanksi</strong></p>
<ul style="padding-left:20px;margin-bottom:16px;">
  <li style="margin-bottom:4px;">Pegawai yang melaksanakan tugas kedinasan (dibuktikan dengan surat tugas/undangan);</li>
  <li style="margin-bottom:4px;">Pegawai yang tidak masuk karena sakit (dibuktikan surat keterangan dokter);</li>
  <li style="margin-bottom:4px;">Pegawai ASN yang sedang menjalani cuti;</li>
  <li style="margin-bottom:4px;">Pegawai yang mendapatkan dispensasi mengikuti kegiatan luar kedinasan (atlet, wasit, juri, dll);</li>
  <li style="margin-bottom:4px;">Pegawai yang tidak mengikuti apel karena sakit, hamil, berhalangan tetap, atau penyandang disabilitas;</li>
  <li style="margin-bottom:4px;">Keadaan Kahar (force majeure) yang dibuktikan dengan dokumentasi foto dan surat keterangan.</li>
</ul>

<p style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);margin:24px 0 12px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">BAB VII — PENGHARGAAN</p>
<p style="margin-bottom:16px;">Wali Kota dapat memberikan penghargaan kepada Pegawai yang memiliki tingkat disiplin kerja terbaik dalam kurun waktu 1 tahun berjalan.</p>

<p style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);margin:24px 0 12px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">BAB VIII — PEMBINAAN DAN PENGAWASAN</p>
<p style="margin-bottom:8px;">Wali Kota melakukan pembinaan dan pengawasan terhadap pelaksanaan ketentuan Hari Kerja dan Jam Kerja, yang didelegasikan kepada setiap Kepala Perangkat Daerah/Unit Kerja.</p>

<p style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);margin:24px 0 12px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">BAB IX — KETENTUAN PENUTUP</p>
<p style="margin-bottom:8px;"><strong>Pasal 18</strong> — Pada saat Peraturan Wali Kota ini mulai berlaku, Peraturan Walikota Samarinda Nomor 9 Tahun 2013 tentang Ketentuan Hari Kerja dan Jam Kerja SKPD dicabut dan dinyatakan tidak berlaku.</p>
<p style="margin-bottom:24px;"><strong>Pasal 19</strong> — Peraturan Wali Kota ini mulai berlaku pada tanggal <strong>1 Agustus 2022</strong>.</p>

<div style="text-align:right;margin-top:32px;">
  <p style="margin-bottom:4px;">Ditetapkan di Samarinda</p>
  <p style="margin-bottom:16px;">pada tanggal 1 Juli 2022</p>
  <p style="margin-bottom:4px;font-weight:700;">WALI KOTA SAMARINDA,</p>
  <p style="margin-bottom:24px;font-weight:700;letter-spacing:2px;">ANDI HARUN</p>
  <p style="margin-bottom:4px;">Diundangkan di Samarinda</p>
  <p style="margin-bottom:16px;">pada tanggal 18 Mei 2022</p>
  <p style="margin-bottom:4px;font-weight:700;">PLH. SEKRETARIS DAERAH KOTA SAMARINDA,</p>
  <p style="font-weight:700;letter-spacing:2px;">ALI FITRI NOOR</p>
</div>
<p style="text-align:center;margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:rgba(255,255,255,0.3);">BERITA DAERAH KOTA SAMARINDA TAHUN 2022 NOMOR: 338</p>
`;

/* ═══════ DATA PENGUMUMAN ═══════ */
const pengumumanData = [
  {
    id: 1,
    title: 'Peraturan Wali Kota Samarinda Nomor 31 Tahun 2022 tentang Ketentuan Hari Kerja dan Jam Kerja di Lingkungan Pemerintah Daerah',
    type: 'peraturan',
    date: new Date(2022, 6, 1),
    publisher: 'Wali Kota Samarinda',
    views: 5842,
    excerpt: 'Peraturan Wali Kota yang mengatur ketentuan hari kerja dan jam kerja bagi seluruh pegawai di lingkungan Pemerintah Daerah Kota Samarinda, termasuk sanksi kedisiplinan dan penghargaan.',
    content: pdfContent,
    file: {
      name: 'Perwali_No31_2022_Hari_Kerja_Jam_Kerja.pdf',
      size: '2.8 MB',
      src: '/assets/docs/perwali-no31-2022-hari-kerja-jam-kerja.pdf'
    }
  },
  {
    id: 2,
    title: 'Edaran Sekretaris Daerah tentang Penyusunan Laporan Kinerja Instansi Pemerintah (LKjIP) Tahun 2024',
    type: 'edaran',
    date: new Date(2024, 11, 10),
    publisher: 'Sekretaris Daerah',
    views: 876,
    excerpt: 'Edaran tentang tata cara penyusunan LKjIP untuk seluruh OPD di lingkungan Pemerintah Kota Samarinda. Batas waktu pengumpulan: 31 Januari 2025.',
    content: '<p>Edaran ini ditujukan kepada seluruh Kepala OPD di lingkungan Pemerintah Kota Samarinda untuk segera menyusun Laporan Kinerja Instansi Pemerintah (LKjIP) Tahun 2024.</p><p style="margin-top:12px;"><strong>Batas waktu pengumpulan:</strong> 31 Januari 2025</p><p style="margin-top:12px;">Laporan disampaikan kepada Sekretaris Daerah melalui Bagian Organisasi Sekretariat Daerah Kota Samarinda.</p>',
    file: null
  },
  {
    id: 3,
    title: 'Pengumuman Jadwal Musrenbang RKPD Kota Samarinda Tahun 2026',
    type: 'pengumuman',
    date: new Date(2025, 0, 20),
    publisher: 'Bidang Perencanaan',
    views: 2130,
    excerpt: 'Jadwal resmi pelaksanaan Musyawarah Perencanaan Pembangunan (Musrenbang) RKPD Kota Samarinda Tahun 2026 tingkat kecamatan.',
    content: '<p>Berdasarkan Peraturan Menteri Dalam Negeri Nomor 86 Tahun 2017, bersama ini diumumkan jadwal pelaksanaan Musrenbang RKPD Kota Samarinda Tahun 2026:</p><table style="width:100%;margin-top:12px;border-collapse:collapse;"><tr style="background:rgba(255,255,255,0.05);"><th style="padding:10px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">No</th><th style="padding:10px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Kecamatan</th><th style="padding:10px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Tanggal</th><th style="padding:10px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);">Tempat</th></tr><tr><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);">1</td><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);">Samarinda Kota</td><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);">3 Feb 2025</td><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);">Aula Kecamatan</td></tr><tr><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);">2</td><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);">Sungai Kunjang</td><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);">5 Feb 2025</td><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.05);">Aula Kecamatan</td></tr><tr><td style="padding:10px;">3</td><td style="padding:10px;">Samarinda Ulu</td><td style="padding:10px;">7 Feb 2025</td><td style="padding:10px;">Aula Kecamatan</td></tr></table>',
    file: null
  },
  {
    id: 4,
    title: 'Undangan Rapat Koordinasi Penyusunan RPJMD Kota Samarinda 2026-2031',
    type: 'undangan',
    date: new Date(2025, 0, 18),
    publisher: 'Sekretariat BAPPERIDA',
    views: 654,
    excerpt: 'Undangan rapat koordinasi awal penyusunan Rencana Pembangunan Jangka Menengah Daerah periode 2026-2031.',
    content: '<p>Sehubungan dengan berakhirnya RPJMD Kota Samarinda Tahun 2016-2021 yang diperpanjang hingga 2025, bersama ini kami mengundang Bapak/Ibu untuk hadir pada Rapat Koordinasi Penyusunan RPJMD Kota Samarinda 2026-2031.</p><p style="margin-top:16px;"><strong>Hari/Tanggal:</strong> Selasa, 28 Januari 2025<br><strong>Waktu:</strong> 09.00 - 12.00 WITA<br><strong>Tempat:</strong> Ruang Rapat Utama Lt. 3 BAPPERIDA</p>',
    file: null
  },
  {
    id: 5,
    title: 'Peraturan Wali Kota Samarinda Nomor 28 Tahun 2024 tentang Peta Jalan Smart City',
    type: 'peraturan',
    date: new Date(2024, 10, 5),
    publisher: 'Sekretariat BAPPERIDA',
    views: 1897,
    excerpt: 'Peraturan Wali Kota yang menetapkan peta jalan (roadmap) pengembangan Smart City Kota Samarinda mencakup 6 pilar utama.',
    content: '<p>Peraturan Wali Kota ini menetapkan peta jalan Smart City Kota Samarinda yang mencakup:</p><ol style="padding-left:20px;margin-top:12px;"><li style="margin-bottom:6px;">Smart Governance</li><li style="margin-bottom:6px;">Smart Branding</li><li style="margin-bottom:6px;">Smart Economy</li><li style="margin-bottom:6px;">Smart Living</li><li style="margin-bottom:6px;">Smart Society</li><li style="margin-bottom:6px;">Smart Environment</li></ol>',
    file: {
      name: 'Perwali_No28_2024_Smart_City.pdf',
      size: '3.8 MB',
      src: '/assets/docs/perwali-no28-2024-smart-city.pdf'
    }
  },
  {
    id: 6,
    title: 'Pengumuman Penerimaan PPNPN BAPPERIDA Tahun Anggaran 2025',
    type: 'pengumuman',
    date: new Date(2025, 0, 8),
    publisher: 'Sub Bagian Kepegawaian',
    views: 4521,
    excerpt: 'Pengumuman resmi tentang penerimaan Pegawai Pemerintah Non Pegawai Negeri di lingkungan BAPPERIDA Kota Samarinda.',
    content: '<p>BAPPERIDA Kota Samarinda membuka kesempatan bagi WNI yang berintegritas untuk bergabung sebagai PPNPN.</p><p style="margin-top:12px;"><strong>Formasi:</strong></p><ul style="padding-left:20px;margin-top:8px;"><li style="margin-bottom:4px;">Analis Kebijakan — 2 orang</li><li style="margin-bottom:4px;">Perencana — 3 orang</li><li style="margin-bottom:4px;">Pranata Komputer — 1 orang</li><li style="margin-bottom:4px;">Pengelola Data — 2 orang</li></ul><p style="margin-top:12px;"><strong>Pendaftaran:</strong> 15 - 30 Januari 2025</p>',
    file: {
      name: 'Pengumuman_PPNPN_2025.pdf',
      size: '1.6 MB',
      src: '/assets/docs/pengumuman-ppnpn-2025.pdf'
    }
  },
  {
    id: 7,
    title: 'Edaran Penegakan Disiplin Kerja di Lingkungan BAPPERIDA',
    type: 'edaran',
    date: new Date(2025, 0, 5),
    publisher: 'Kepala BAPPERIDA',
    views: 723,
    excerpt: 'Edaran penegakan disiplin kerja dan peningkatan kinerja ASN di lingkungan BAPPERIDA Kota Samarinda.',
    content: '<p>Dalam rangka peningkatan kinerja dan pelayanan publik, Kepala BAPPERIDA mengeluarkan edaran tentang penegakan disiplin kerja bagi seluruh ASN di lingkungan BAPPERIDA Kota Samarinda.</p><p style="margin-top:12px;">Edaran ini mengacu pada Peraturan Pemerintah Nomor 94 Tahun 2021 tentang Disiplin Pegawai Negeri Sipil dan Peraturan Wali Kota Samarinda Nomor 31 Tahun 2022.</p>',
    file: null
  },
  {
    id: 8,
    title: 'Undangan Sosialisasi Aplikasi SIAP BAPPERIDA v2.0',
    type: 'undangan',
    date: new Date(2025, 0, 25),
    publisher: 'Bidang Riset dan Inovasi',
    views: 489,
    excerpt: 'Undangan sosialisasi aplikasi Sistem Informasi Perencanaan BAPPERIDA versi terbaru kepada seluruh OPD.',
    content: '<p>Kepada Yth. Kepala OPD di Lingkungan Pemerintah Kota Samarinda,</p><p style="margin-top:12px;">Bersama ini kami mengundang untuk hadir pada kegiatan Sosialisasi Aplikasi SIAP BAPPERIDA v2.0.</p><p style="margin-top:16px;"><strong>Hari/Tanggal:</strong> Rabu, 5 Februari 2025<br><strong>Waktu:</strong> 09.00 - 15.00 WITA<br><strong>Tempat:</strong> Aula Serbaguna Lt. 1 BAPPERIDA</p>',
    file: null
  },
  {
    id: 9,
    title: 'Pengumuman Hasil Evaluasi Inovasi Daerah Tahun 2024',
    type: 'pengumuman',
    date: new Date(2024, 11, 20),
    publisher: 'Bidang Riset dan Inovasi',
    views: 1567,
    excerpt: 'Pengumuman hasil evaluasi dan peringkat inovasi daerah Kota Samarinda tahun 2024.',
    content: '<p>Berdasarkan hasil evaluasi oleh Tim Independent, berikut peringkat inovasi daerah Kota Samarinda Tahun 2024:</p><ol style="padding-left:20px;margin-top:12px;"><li style="margin-bottom:8px;"><strong>Samarinda Smart Map</strong> — Bidang Perencanaan (Skor: 92)</li><li style="margin-bottom:8px;"><strong>e-Musrenbang</strong> — Bidang Perencanaan (Skor: 88)</li><li style="margin-bottom:8px;"><strong>SiPANDAI</strong> — Bidang Riset dan Inovasi (Skor: 85)</li></ol>',
    file: null
  },
  {
    id: 10,
    title: 'Undangan Rapat Finalisasi LPPD Tahun 2024',
    type: 'undangan',
    date: new Date(2025, 1, 3),
    publisher: 'Sekretariat BAPPERIDA',
    views: 298,
    excerpt: 'Undangan rapat finalisasi penyusunan Laporan Penyelenggaraan Pemerintah Daerah Tahun 2024.',
    content: '<p>Diundang untuk hadir pada rapat finalisasi LPPD Tahun 2024:</p><p style="margin-top:12px;"><strong>Hari/Tanggal:</strong> Senin, 10 Februari 2025<br><strong>Waktu:</strong> 09.00 - 16.00 WITA<br><strong>Tempat:</strong> Ruang Sidang Lt. 3</p>',
    file: null
  },
];

pengumumanData.forEach((item) => {
  const tc = typeMap[item.type];
  item.typeLabel = tc.label;
  item.dateStr = fmtDate(item.date);
  item.dateShort = fmtShort(item.date);
});

const typeMap = {
  peraturan: { label: 'Peraturan', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  edaran: { label: 'Edaran', color: '#c084fc', bg: 'rgba(192,132,252,0.12)' },
  pengumuman: { label: 'Pengumuman', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  undangan: { label: 'Undangan', color: '#f5c832', bg: 'rgba(245,195,50,0.12)' },
};

const cats = [
  { key: 'all', label: 'Semua', color: '#f5c832' },
  { key: 'peraturan', label: 'Peraturan', color: '#60a5fa' },
  { key: 'edaran', label: 'Edaran', color: '#c084fc' },
  { key: 'pengumuman', label: 'Pengumuman', color: '#34d399' },
  { key: 'undangan', label: 'Undangan', color: '#f5c832' },
];

const countTahunIni = computed(() => pengumumanData.filter((i) => i.date.getFullYear() === currentYear).length);
const count30Hari = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return pengumumanData.filter((i) => i.date >= d).length;
});

const filtered = computed(() => {
  let r = [...pengumumanData];
  if (cat.value !== 'all') r = r.filter((i) => i.type === cat.value);
  if (q.value.trim()) {
    const s = q.value.toLowerCase();
    r = r.filter((i) => i.title.toLowerCase().includes(s) || i.excerpt.toLowerCase().includes(s) || i.publisher.toLowerCase().includes(s));
  }
  if (sort.value === 'terbaru') r.sort((a, b) => b.date - a.date);
  else if (sort.value === 'terlama') r.sort((a, b) => a.date - b.date);
  else if (sort.value === 'populer') r.sort((a, b) => b.views - a.views);
  return r;
});

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)));
const paged = computed(() => {
  const s = (page.value - 1) * perPage;
  return filtered.value.slice(s, s + perPage);
});
const pageList = computed(() => {
  const t = totalPages.value, c = page.value;
  if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1);
  const p = [1];
  if (c > 3) p.push('...');
  for (let i = Math.max(2, c - 1); i <= Math.min(t - 1, c + 1); i++) p.push(i);
  if (c < t - 2) p.push('...');
  p.push(t);
  return p;
});

function go(p) { if (p >= 1 && p <= totalPages.value) { page.value = p; window.scrollTo({ top: mainEl.value?.offsetTop - 80, behavior: 'smooth' }); } }
function catCount(k) { return k === 'all' ? pengumumanData.length : pengumumanData.filter((i) => i.type === k).length; }
function resetFilter() { q.value = ''; cat.value = 'all'; sort.value = 'terbaru'; page.value = 1; }
function open(item) { sel.value = item; modal.value = true; document.body.style.overflow = 'hidden'; }
function close() { modal.value = false; document.body.style.overflow = ''; }

function setupObs() {
  pageReady.value = true;
  const obs = new IntersectionObserver((e) => { e.forEach((en) => { if (en.isIntersecting) mainReady.value = true; }); }, { threshold: 0.05 });
  if (mainEl.value) obs.observe(mainEl.value);
}
onMounted(() => nextTick(setupObs));
onUnmounted(() => { document.body.style.overflow = ''; });
</script>

<style>
html, body { margin: 0; padding: 0; background: #060e27; overflow-x: hidden; }
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

.pengumuman-page {
  font-family: 'Poppins', sans-serif;
  width: 100%;
  min-height: 100vh;
  background: #060e27;
  color: #fff;
}

/* ═══ HERO ═══ */
.pg-hero {
  position: relative;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.pg-hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80') center/cover no-repeat;
  transform: scale(1.1);
}
.pg-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6,14,39,0.7) 0%, rgba(6,14,39,0.96) 100%);
}
.pg-hero-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.pg-hero-glow--1 {
  width: 300px; height: 300px;
  top: -80px; right: 10%;
  background: radial-gradient(circle, rgba(245,195,50,0.08) 0%, transparent 70%);
  animation: glow-float 8s ease-in-out infinite;
}
.pg-hero-glow--2 {
  width: 200px; height: 200px;
  bottom: -60px; left: 15%;
  background: radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%);
  animation: glow-float 10s ease-in-out infinite reverse;
}
@keyframes glow-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -20px) scale(1.1); }
}
.pg-hero-content {
  position: relative; z-index: 1;
  text-align: center;
  max-width: 700px;
  padding: 0 24px;
}
.pg-breadcrumb {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  margin-bottom: 20px;
  opacity: 0; transform: translateY(15px);
  transition: all 0.6s ease;
}
.pg-breadcrumb.show { opacity: 1; transform: translateY(0); }
.pg-breadcrumb__link { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s; }
.pg-breadcrumb__link:hover { color: #f5c832; }
.pg-breadcrumb__sep { width: 14px; height: 14px; color: rgba(255,255,255,0.25); }
.pg-breadcrumb__current { font-size: 12px; font-weight: 600; color: #f5c832; }

.pg-hero__icon {
  width: 64px; height: 64px; border-radius: 18px;
  background: rgba(245,195,50,0.1);
  border: 1.5px solid rgba(245,195,50,0.3);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
  opacity: 0; transform: translateY(15px) scale(0.9);
  transition: all 0.6s ease 0.05s;
}
.pg-hero__icon.show { opacity: 1; transform: translateY(0) scale(1); }
.pg-hero__icon svg { width: 28px; height: 28px; color: #f5c832; }

.pg-hero__title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900; color: #fff; line-height: 1.15; margin-bottom: 12px;
  opacity: 0; transform: translateY(20px);
  transition: all 0.7s ease 0.1s;
}
.pg-hero__title.show { opacity: 1; transform: translateY(0); }
.pg-hero__desc {
  font-size: 14px; font-weight: 400; color: rgba(255,255,255,0.5); line-height: 1.7; margin-bottom: 28px;
  opacity: 0; transform: translateY(20px);
  transition: all 0.7s ease 0.2s;
}
.pg-hero__desc.show { opacity: 1; transform: translateY(0); }

.pg-hero__stats {
  display: inline-flex; align-items: center; gap: 24px;
  padding: 14px 32px; border-radius: 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  opacity: 0; transform: translateY(20px);
  transition: all 0.7s ease 0.3s;
}
.pg-hero__stats.show { opacity: 1; transform: translateY(0); }
.pg-hero__stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.pg-hero__stat-num { font-size: 22px; font-weight: 900; color: #f5c832; line-height: 1; }
.pg-hero__stat-label { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.4); white-space: nowrap; }
.pg-hero__stat-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.1); }

/* ═══ MAIN ═══ */
.pg-main {
  position: relative;
  padding: 48px 0 80px;
}
.pg-main > * {
  max-width: 1200px;
  margin-left: auto; margin-right: auto;
  padding-left: 48px; padding-right: 48px;
}

/* ═══ TOOLBAR ═══ */
.pg-toolbar {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  margin-bottom: 20px;
  opacity: 0; transform: translateY(20px);
  transition: all 0.6s ease;
}
.pg-toolbar.show { opacity: 1; transform: translateY(0); }
.pg-toolbar__left { flex: 1; max-width: 400px; }
.pg-toolbar__right { display: flex; align-items: center; gap: 10px; }

.pg-search { position: relative; display: flex; align-items: center; }
.pg-search__icon { position: absolute; left: 14px; width: 16px; height: 16px; color: rgba(255,255,255,0.3); pointer-events: none; }
.pg-search__input {
  width: 100%; padding: 10px 38px 10px 42px; border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);
  color: #fff; font-family: 'Poppins', sans-serif; font-size: 13px; outline: none;
  transition: all 0.25s;
}
.pg-search__input::placeholder { color: rgba(255,255,255,0.3); }
.pg-search__input:focus { border-color: rgba(245,195,50,0.4); background: rgba(255,255,255,0.05); box-shadow: 0 0 0 3px rgba(245,195,50,0.08); }
.pg-search__clear {
  position: absolute; right: 8px; width: 24px; height: 24px; border-radius: 6px;
  border: none; background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.5);
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
}
.pg-search__clear:hover { background: rgba(255,255,255,0.15); color: #fff; }
.pg-search__clear svg { width: 12px; height: 12px; }

.pg-sort {
  display: flex; align-items: center; gap: 6px;
  padding: 0 12px; height: 40px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);
}
.pg-sort svg { width: 14px; height: 14px; color: rgba(255,255,255,0.35); flex-shrink: 0; }
.pg-sort__select {
  border: none; background: transparent; color: rgba(255,255,255,0.6);
  font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 500; outline: none; cursor: pointer; appearance: none;
}
.pg-sort__select option { background: #0f1a3a; color: #fff; }

.pg-views { display: flex; gap: 4px; }
.pg-vbtn {
  width: 38px; height: 38px; border-radius: 9px;
  border: 1px solid rgba(255,255,255,0.08); background: transparent;
  color: rgba(255,255,255,0.35);
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s;
}
.pg-vbtn svg { width: 16px; height: 16px; }
.pg-vbtn:hover { border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.7); }
.pg-vbtn.active { background: rgba(245,195,50,0.1); border-color: rgba(245,195,50,0.3); color: #f5c832; }

/* ═══ TAGS ═══ */
.pg-tags {
  display: flex; align-items: center; gap: 6px; margin-bottom: 16px; flex-wrap: wrap;
  opacity: 0; transform: translateY(15px); transition: all 0.6s ease;
}
.pg-tags.show { opacity: 1; transform: translateY(0); }
.pg-tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.08); background: transparent;
  color: rgba(255,255,255,0.5);
  font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all 0.25s; white-space: nowrap;
}
.pg-tag:hover { border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.8); }
.pg-tag.active { border-color: transparent; background: rgba(245,195,50,0.12); color: #f5c832; }
.pg-tag__dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.pg-tag__count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 18px; padding: 0 6px; border-radius: 100px;
  background: rgba(255,255,255,0.06); font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.4);
}
.pg-tag.active .pg-tag__count { background: rgba(245,195,50,0.2); color: #f5c832; }

/* ═══ INFO ═══ */
.pg-info {
  margin-bottom: 20px; font-size: 12px; color: rgba(255,255,255,0.35);
  opacity: 0; transform: translateY(10px); transition: all 0.5s ease;
}
.pg-info.show { opacity: 1; transform: translateY(0); }
.pg-info strong { color: rgba(255,255,255,0.6); font-weight: 700; }

/* ═══ BADGE ═══ */
.pg-badge {
  padding: 4px 12px; border-radius: 100px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.3px; text-transform: uppercase; white-space: nowrap;
}
.is-peraturan { background: rgba(96,165,250,0.12); color: #60a5fa; }
.is-edaran { background: rgba(192,132,252,0.12); color: #c084fc; }
.is-pengumuman { background: rgba(52,211,153,0.12); color: #34d399; }
.is-undangan { background: rgba(245,195,50,0.12); color: #f5c832; }

/* ═══ CARDS ═══ */
.pg-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px; margin-bottom: 32px;
}
.pg-card {
  display: flex; flex-direction: column;
  padding: 22px; border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.025);
  text-decoration: none; color: #fff; cursor: pointer;
  opacity: 0; transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
}
.pg-card.show { opacity: 1; transform: translateY(0); }
.pg-card:hover {
  border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.04);
  transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.3);
}
.pg-card__head {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
}
.pg-card__date {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.35);
}
.pg-card__date svg { width: 13px; height: 13px; }
.pg-card__title {
  font-size: 14px; font-weight: 700; color: rgba(255,255,255,0.9); line-height: 1.5;
  margin-bottom: 10px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  transition: color 0.2s;
}
.pg-card:hover .pg-card__title { color: #f5c832; }
.pg-card__excerpt {
  font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.35); line-height: 1.65;
  margin-bottom: 18px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  flex: 1;
}
.pg-card__foot {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.05);
}
.pg-card__meta { display: flex; align-items: center; gap: 12px; }
.pg-card__mi {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.3);
}
.pg-card__mi svg { width: 12px; height: 12px; }
.pg-card__arrow {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.3); transition: all 0.25s;
}
.pg-card__arrow svg { width: 14px; height: 14px; }
.pg-card:hover .pg-card__arrow { color: #f5c832; gap: 8px; }

.pg-card__file {
  display: flex; align-items: center; gap: 6px;
  margin-top: 12px; padding-top: 12px;
  border-top: 1px dashed rgba(255,255,255,0.08);
  font-size: 11px; font-weight: 500; color: rgba(96,165,250,0.6);
}
.pg-card__file svg { width: 13px; height: 13px; flex-shrink: 0; }

/* ═══ LIST ═══ */
.pg-list {
  border-radius: 18px; border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.015); overflow: hidden; margin-bottom: 32px;
}
.pg-list__head {
  display: grid; grid-template-columns: 120px 1fr 130px 160px 80px 40px; gap: 12px;
  padding: 14px 24px; background: rgba(255,255,255,0.04);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.3);
  text-transform: uppercase; letter-spacing: 0.8px;
  opacity: 0; transform: translateY(15px); transition: all 0.5s ease;
}
.pg-list__head.show { opacity: 1; transform: translateY(0); }
.pg-list__row {
  display: grid; grid-template-columns: 120px 1fr 130px 160px 80px 40px; gap: 12px;
  padding: 16px 24px; text-decoration: none; color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.04); transition: all 0.25s; cursor: pointer;
  opacity: 0; transform: translateY(10px);
}
.pg-list__row.show { opacity: 1; transform: translateY(0); }
.pg-list__row:last-child { border-bottom: none; }
.pg-list__row:hover { background: rgba(255,255,255,0.04); }
.pg-list__type { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5); }
.pg-list__dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.pg-list__dot.is-peraturan { background: #60a5fa; }
.pg-list__dot.is-edaran { background: #c084fc; }
.pg-list__dot.is-pengumuman { background: #34d399; }
.pg-list__dot.is-undangan { background: #f5c832; }
.pg-list__title {
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
  transition: color 0.2s;
}
.pg-list__row:hover .pg-list__title { color: #f5c832; }
.pg-list__date, .pg-list__pub { font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.35); }
.pg-list__views {
  display: flex; align-items: center; gap: 4px;
  font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.35);
}
.pg-list__views svg { width: 13px; height: 13px; }
.pg-list__go { display: flex; align-items: center; justify-content: center; }
.pg-list__go svg { width: 16px; height: 16px; color: rgba(255,255,255,0.2); transition: all 0.25s; }
.pg-list__row:hover .pg-list__go svg { color: #f5c832; transform: translateX(3px); }

/* ═══ EMPTY ═══ */
.pg-empty {
  text-align: center; padding: 80px 20px;
  opacity: 0; transform: translateY(20px); transition: all 0.6s ease;
}
.pg-empty.show { opacity: 1; transform: translateY(0); }
.pg-empty__svg { width: 120px; height: 120px; color: rgba(255,255,255,0.12); margin-bottom: 20px; }
.pg-empty__title { font-size: 16px; font-weight: 700; color: rgba(255,255,255,0.5); margin-bottom: 8px; }
.pg-empty__desc { font-size: 13px; color: rgba(255,255,255,0.3); margin-bottom: 24px; }
.pg-empty__btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 24px; border-radius: 100px;
  border: 1px solid rgba(245,195,50,0.3); background: rgba(245,195,50,0.08);
  color: #f5c832; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all 0.25s;
}
.pg-empty__btn svg { width: 14px; height: 14px; }
.pg-empty__btn:hover { background: rgba(245,195,50,0.15); border-color: rgba(245,195,50,0.5); }

/* ═══ PAGINATION ═══ */
.pg-pages {
  display: flex; align-items: center; justify-content: center; gap: 6px; margin-bottom: 48px;
  opacity: 0; transform: translateY(15px); transition: all 0.5s ease;
}
.pg-pages.show { opacity: 1; transform: translateY(0); }
.pg-pg {
  min-width: 40px; height: 40px; padding: 0 6px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08); background: transparent;
  color: rgba(255,255,255,0.5); font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s;
}
.pg-pg svg { width: 16px; height: 16px; }
.pg-pg:hover:not(.off) { border-color: rgba(245,195,50,0.3); color: #f5c832; background: rgba(245,195,50,0.06); }
.pg-pg.active { background: rgba(245,195,50,0.15); border-color: rgba(245,195,50,0.4); color: #f5c832; }
.pg-pg.off { opacity: 0.25; cursor: not-allowed; }
.pg-pg__dots { width: 40px; text-align: center; font-size: 14px; color: rgba(255,255,255,0.25); font-weight: 600; }

/* ═══ MODAL ═══ */
.pg-modal-bg {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(6,14,39,0.85); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; padding: 24px;
  opacity: 0; visibility: hidden; transition: all 0.35s ease;
}
.pg-modal-bg.open { opacity: 1; visibility: visible; }
.pg-modal {
  width: 100%; max-width: 780px; max-height: 88vh;
  border-radius: 24px; border: 1px solid rgba(255,255,255,0.1);
  background: linear-gradient(180deg, #0d1735 0%, #0a1230 100%);
  overflow: hidden; position: relative;
  display: flex; flex-direction: column;
  transform: translateY(30px) scale(0.97);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.pg-modal.open { transform: translateY(0) scale(1); }
.pg-modal__x {
  position: sticky; top: 16px; float: right; margin-right: 16px; z-index: 2;
  width: 40px; height: 40px; border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.5);
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.25s;
}
.pg-modal__x svg { width: 18px; height: 18px; }
.pg-modal__x:hover { background: rgba(255,255,255,0.12); color: #fff; }

.pg-modal__body {
  padding: 32px; overflow-y: auto; flex: 1;
}
.pg-modal__body::-webkit-scrollbar { width: 4px; }
.pg-modal__body::-webkit-scrollbar-track { background: transparent; }
.pg-modal__body::-webkit-scrollbar-thumb { background: rgba(245,195,50,0.3); border-radius: 4px; }

.pg-modal__head {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;
}
.pg-modal__date { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.4); }
.pg-modal__title { font-size: 20px; font-weight: 800; color: #fff; line-height: 1.4; margin-bottom: 16px; }
.pg-modal__meta {
  display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
  font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.4);
}
.pg-modal__meta span { display: inline-flex; align-items: center; gap: 6px; }
.pg-modal__meta svg { width: 14px; height: 14px; }
.pg-modal__line { height: 1px; background: rgba(255,255,255,0.08); margin: 20px 0; }
.pg-modal__content {
  font-size: 13.5px; font-weight: 400; color: rgba(255,255,255,0.55); line-height: 1.8;
}
.pg-modal__content :deep(p) { margin-bottom: 10px; }
.pg-modal__content :deep(strong) { color: rgba(255,255,255,0.8); }
.pg-modal__content :deep(ol), .pg-modal__content :deep(ul) { margin-bottom: 12px; }
.pg-modal__content :deep(table) { border-collapse: collapse; }
.pg-modal__content :deep(th), .pg-modal__content :deep(td) { font-size: 12.5px; }

/* Download box */
.pg-modal__dl {
  display: flex; align-items: center; gap: 14px;
  margin-top: 28px; padding: 18px; border-radius: 14px;
  background: rgba(96,165,250,0.04); border: 1px solid rgba(96,165,250,0.15);
}
.pg-modal__dl-icon {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(96,165,250,0.12); color: #60a5fa;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.pg-modal__dl-icon svg { width: 22px; height: 22px; }
.pg-modal__dl-info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.pg-modal__dl-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); line-height: 1.3; word-break: break-all; }
.pg-modal__dl-size { font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.35); }
.pg-modal__dl-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 20px; border-radius: 10px; flex-shrink: 0;
  border: 1px solid rgba(96,165,250,0.3); background: rgba(96,165,250,0.1);
  color: #60a5fa; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
  text-decoration: none; cursor: pointer; transition: all 0.25s; white-space: nowrap;
}
.pg-modal__dl-btn svg { width: 14px; height: 14px; }
.pg-modal__dl-btn:hover { background: rgba(96,165,250,0.2); border-color: rgba(96,165,250,0.5); }

/* ═══ RESPONSIVE ═══ */
@media (max-width: 1024px) {
  .pg-main > * { padding-left: 24px; padding-right: 24px; }
  .pg-cards { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
}
@media (max-width: 768px) {
  .pg-hero { height: 300px; }
  .pg-hero__stats { gap: 16px; padding: 12px 20px; }
  .pg-hero__stat-num { font-size: 18px; }
  .pg-hero__stat-label { font-size: 9px; }
  .pg-main > * { padding-left: 20px; padding-right: 20px; }
  .pg-toolbar { flex-direction: column; align-items: stretch; }
  .pg-toolbar__left { max-width: none; }
  .pg-toolbar__right { justify-content: space-between; }
  .pg-tags { justify-content: center; }
  .pg-cards { grid-template-columns: 1fr; }
  .pg-list__head { display: none; }
  .pg-list__row { display: flex; flex-direction: column; gap: 8px; padding: 16px 20px; }
  .pg-list__title { -webkit-line-clamp: 2; }
  .pg-list__go { display: none; }
  .pg-modal { max-height: 92vh; border-radius: 18px; }
  .pg-modal__body { padding: 24px 20px; }
  .pg-modal__title { font-size: 17px; }
  .pg-modal__dl { flex-wrap: wrap; }
  .pg-modal__dl-btn { margin-left: 0; width: 100%; text-align: center; justify-content: center; }
}
@media (max-width: 480px) {
  .pg-hero { height: 280px; }
  .pg-hero__stats { flex-direction: column; gap: 12px; }
  .pg-hero__stat-divider { width: 40px; height: 1px; }
  .pg-hero__stat { flex-direction: row; gap: 8px; }
  .pg-pg { min-width: 36px; height: 36px; font-size: 12px; }
}
</style>