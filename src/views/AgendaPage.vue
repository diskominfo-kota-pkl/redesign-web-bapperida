<template>
  <div class="Agenda">

    <!-- ══════════════ PAGE HERO ══════════════ -->
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <nav class="breadcrumb" :class="{ visible: pageVisible }">
          <router-link to="/" class="breadcrumb-link">Beranda</router-link>
          <svg class="breadcrumb-sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
          <router-link to="/artikel" class="breadcrumb-link">Berita & Informasi</router-link>
          <svg class="breadcrumb-sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
          <span class="breadcrumb-current">Agenda Kegiatan</span>
        </nav>
        <h1 class="page-hero-title" :class="{ visible: pageVisible }">Agenda Kegiatan</h1>
        <p class="page-hero-desc" :class="{ visible: pageVisible }">Jadwal kegiatan, rapat, dan acara resmi BAPPERIDA Kota Samarinda.</p>
      </div>
    </section>

    <!-- ══════════════ MAIN CONTENT ══════════════ -->
    <section class="agenda-main" ref="agendaMain">

      <!-- ─── Filter Bar ─── -->
      <div class="filter-bar" :class="{ visible: mainVisible }" style="transition-delay: 0.05s">
        <div class="filter-left">
          <button
            v-for="cat in categories"
            :key="cat.key"
            class="filter-btn"
            :class="{ active: activeCat === cat.key }"
            @click="activeCat = cat.key"
          >
            <span class="filter-dot" :style="{ background: cat.color }"></span>
            {{ cat.label }}
            <span class="filter-count">{{ getCatCount(cat.key) }}</span>
          </button>
        </div>
        <div class="filter-right">
          <button class="view-toggle" :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'" title="Tampilan List">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button class="view-toggle" :class="{ active: viewMode === 'calendar' }" @click="viewMode = 'calendar'" title="Tampilan Kalender">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="21" y1="14" x2="3" y2="14"/></svg>
          </button>
        </div>
      </div>

      <!-- ═══════ CALENDAR VIEW ═══════ -->
      <div v-if="viewMode === 'calendar'" class="calendar-layout" :class="{ visible: mainVisible }" style="transition-delay: 0.1s">

        <div class="calendar-panel">
          <!-- Month Nav -->
          <div class="cal-month-nav">
            <button class="cal-nav-btn" @click="prevMonth" :class="{ disabled: isCurrentMonth }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 6 9 12 15 18"/></svg>
            </button>
            <div class="cal-month-label">
              <span class="cal-month-name">{{ monthName }}</span>
              <span class="cal-month-year">{{ currentYear }}</span>
            </div>
            <button class="cal-nav-btn" @click="nextMonth">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
            </button>
          </div>

          <!-- Weekday Headers -->
          <div class="cal-weekdays">
            <div v-for="d in weekdays" :key="d" class="cal-weekday" :class="{ 'cal-weekend': d === 'Min' || d === 'Sab' }">{{ d }}</div>
          </div>

          <!-- Calendar Grid -->
          <div class="cal-grid">
            <!-- Empty cells before day 1 -->
            <div v-for="n in firstDayOffset" :key="'empty-' + n" class="cal-day cal-empty"></div>

            <!-- Day cells -->
            <div
              v-for="(day, i) in daysInMonth"
              :key="'day-' + i"
              class="cal-day"
              :class="{
                'cal-today': isToday(day),
                'cal-weekend-day': isWeekend(day),
                'cal-selected': selectedDay === day,
                'cal-has-event': hasEvents(day),
                'cal-other-month': isOtherMonth(day),
              }"
              @click="selectDay(day)"
              @mouseenter="hoveredDay = day"
              @mouseleave="hoveredDay = null"
            >
              <span class="cal-day-num">{{ day }}</span>
              <div class="cal-event-dots">
                <span
                  v-for="(ev, j) in getEventsForDay(day).slice(0, 3)"
                  :key="j"
                  class="cal-event-dot"
                  :style="{ background: ev.color }"
                ></span>
              </div>
            </div>

            <!-- Empty cells after last day -->
            <div v-for="n in lastDayOffset" :key="'empty-end-' + n" class="cal-day cal-empty"></div>
          </div>

          <!-- Today button -->
          <div v-if="!isCurrentMonth" class="cal-today-btn-wrap">
            <button class="cal-today-btn" @click="goToToday">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 12 12 12"/></svg>
              Kembali ke Bulan Ini
            </button>
          </div>
        </div>

        <!-- Selected Day Detail -->
        <div class="cal-detail-panel" :class="{ 'cal-detail-open': selectedDay !== null }">
          <div v-if="selectedDay !== null && selectedDayEvents.length > 0" class="cal-detail-content">
            <div class="cal-detail-header">
              <div class="cal-detail-date-badge">
                <span class="cal-detail-day-big">{{ selectedDay }}</span>
                <span class="cal-detail-month-sm">{{ monthName }} {{ currentYear }}</span>
              </div>
              <span class="cal-detail-event-count">{{ selectedDayEvents.length }} kegiatan</span>
            </div>
            <div class="cal-detail-list">
              <div
                v-for="(ev, i) in selectedDayEvents"
                :key="i"
                class="cal-detail-event"
              >
                <div class="cal-detail-time">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cal-time-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 6 12 6 12"/></svg>
                  {{ ev.time }}
                </div>
                <div class="cal-detail-info">
                  <div class="cal-detail-title-row">
                    <span class="cal-detail-cat-dot" :style="{ background: ev.color }"></span>
                    <span class="cal-detail-title">{{ ev.title }}</span>
                  </div>
                  <p class="cal-detail-loc">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="cal-loc-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {{ ev.location }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="selectedDay !== null" class="cal-detail-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="cal-empty-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            <p>Tidak ada kegiatan pada tanggal ini.</p>
          </div>
          <div v-else class="cal-detail-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="cal-ph-icon"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3m6-3l-3-3m0 0l-3 3m6-3l3 3m-9 3h18"/></svg>
            <p>Pilih tanggal untuk melihat kegiatan.</p>
          </div>
        </div>
      </div>

      <!-- ═══════ LIST VIEW ═══════ -->
      <div v-if="viewMode === 'list'" class="list-layout" :class="{ visible: mainVisible }" style="transition-delay: 0.1s">
        <div class="event-list">
          <a
            v-for="(ev, i) in filteredEvents"
            :key="ev.id"
            href="#"
            class="event-card"
            :style="{ transitionDelay: `${0.05 + i * 0.04}s` }"
            @click.prevent="goToDate(ev.date); viewMode = 'calendar'"
          >
            <div class="event-card-date-col">
              <div class="event-date-box" :style="{ background: ev.color }">
                <span class="event-date-day">{{ getDay(ev.date) }}</span>
                <span class="event-date-month">{{ getMonthShort(ev.date) }}</span>
              </div>
            </div>
            <div class="event-card-body">
              <div class="event-card-meta">
                <span class="event-cat-tag" :style="{ background: ev.bgColor, color: ev.color }">{{ ev.category }}</span>
                <span class="event-time-tag">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ev-time-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 6 12 6 12"/></svg>
                  {{ ev.time }}
                </span>
              </div>
              <h3 class="event-card-title">{{ ev.title }}</h3>
              <p class="event-card-desc">{{ ev.description }}</p>
              <div class="event-card-footer">
                <span class="event-card-loc">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="ev-loc-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {{ ev.location }}
                </span>
                <span class="event-card-arrow">
                  Lihat
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
            </div>
          </a>
        </div>

        <div v-if="filteredEvents.length === 0" class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          <p>Tidak ada kegiatan untuk filter ini.</p>
        </div>
      </div>

      <!-- ═══════ CONTACT SECTION ═══════ -->
      <div class="contact-section" :class="{ visible: mainVisible }" style="transition-delay: 0.25s">
        <div class="contact-card">
          <div class="contact-left">
            <div class="contact-org">
              <div class="contact-logo-wrap">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lambang_Kota_Samarinda.png/240px-Lambang_Kota_Samarinda.png" alt="Logo" class="contact-logo" />
              </div>
              <div class="contact-org-text">
                <h3 class="contact-org-name">PEMERINTAH KOTA SAMARINDA</h3>
                <p class="contact-org-sub">Badan Perencanaan Pembangunan, Riset dan Inovasi Daerah</p>
              </div>
            </div>
            <div class="contact-socials">
              <a href="#" class="contact-social-btn" v-for="s in socials" :key="s.label" :aria-label="s.label">
                <svg viewBox="0 0 24 24" fill="currentColor" v-html="s.path"></svg>
              </a>
            </div>
          </div>
          <div class="contact-right">
            <div class="contact-info-item">
              <div class="contact-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="contact-info-text">
                <span class="contact-info-label">Alamat</span>
                <span class="contact-info-value">Jl. Dahlia No. 81, Samarinda Kota, Kalimantan Timur 75121</span>
              </div>
            </div>
            <div class="contact-info-item">
              <div class="contact-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 1 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div class="contact-info-text">
                <span class="contact-info-label">Telepon</span>
                <span class="contact-info-value">(0541) 203785</span>
              </div>
            </div>
            <div class="contact-info-item">
              <div class="contact-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,14.01 9,11.01"/></svg>
              </div>
              <div class="contact-info-text">
                <span class="contact-info-label">Email</span>
                <span class="contact-info-value">bappedalitbang@samarindakota.go.id</span>
              </div>
            </div>
            <div class="contact-info-item">
              <div class="contact-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/><circle cx="12" cy="12" r="4"/></svg>
              </div>
              <div class="contact-info-text">
                <span class="contact-info-label">Website</span>
                <span class="contact-info-value contact-info-link">https://bapperida.samarindakota.go.id</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

const pageVisible = ref(false);
const mainVisible = ref(false);
const agendaMain = ref(null);
const activeCat = ref('all');
const viewMode = ref('calendar');
const selectedDay = ref(null);
const hoveredDay = ref(null);

const now = new Date();
const currentYear = ref(now.getFullYear());
const currentMonth = ref(now.getMonth());

const categories = [
  { key: 'all', label: 'Semua', color: '#f5c832' },
  { key: 'rapat', label: 'Rapat', color: '#60a5fa' },
  {  key: 'upacara', label: 'Upacara', color: '#c084fc' },
  { key: 'sosial', label: 'Sosial', color: '#34d399' },
];

const weekdays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const monthShorts = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

const catColors = {
  rapat: { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  upacara: { color: '#c084fc', bg: 'rgba(192,132,252,0.12)' },
  sosial: { color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
};

const allEvents = [
  { id: 1, title: 'Rapat Koordinasi Perencanaan', date: new Date(2025, 4, 2), time: '09.00', category: 'rapat', description: 'Koordinasi seluruh program kerja bidang perencanaan pembangunan untuk triwulan II tahun 2025.', location: 'Ruang Rapat Utama Lt. 3' },
  { id: 2, title: 'Rapat Tim Penyusunan RPJMD 2026-2031', date: new Date(2025, 4, 5), time: '10.00', category: 'rapat', description: 'Pembahasan draft awal Rencana Pembangunan Jangka Menengah Daerah Kota Samarinda periode 2026-2031.', location: 'Ruang Sidang Lt. 3' },
  { id: 3, title: 'Musrenbang Kecamatan Sungai Kunjang', date: new Date(2025, 4, 8), time: '08.30', category: 'sosial', description: 'Musyawarah perencanaan pembangunan tingkat kecamatan bersama masyarakat dan tokoh masyarakat Sungai Kunjang.', location: 'Aula Kecamatan Sungai Kunjang' },
  { id: 4, title: 'Upacara Hari Jadi Kota Samarinda ke-358', date: new Date(2025, 4, 11), time: '07.30', category: 'upacara', description: 'Upacara peringatan hari jadi Kota Samarinda ke-358 bertempat di Bundaran MTC', location: 'Bundaran MTC Samarinda' },
  { id: 5, title: 'Focus Group Discussion: Ekonomi Digital', date: new Date(2025, 4, 14), time: '13.00', category: 'rapat', description: 'Diskusi kelompok terfokus terkait pengembangan ekonomi digital dan UMKM di Kota Samarinda.', location: 'Ruang Rapat Lt. 2' },
  { id: 6, title: 'Peluncuran Aplikasi SIAP BAPPERIDA v2.0', date: new Date(2025, 4, 16), time: '10.00', category: 'upacara', description: 'Peluncuran aplikasi Sistem Informasi Perencanaan BAPPERIDA versi terbaru untuk publikasi data dan informasi pembangunan.', location: 'Aula Serbaguna Lt. 1' },
  { id: 7, title: 'Konsultasi Publikasi Data Statistik', date: new Date(202, 4, 18), time: '14.00', category: 'sosial', description: 'Konsultasi dengan BPS Kota Samarinda terkait penyusunan publikasi statistik daerah triwulan I.', location: 'Ruang Bidang Statistik' },
  { id: 8, title: 'Rapat Evaluasi Realisasi Q1 2025', date: new Date(202, 4, 21), time: '09.00', category: 'rapat', description: 'Evaluasi capaian realisasi program dan kegiatan pembangunan triwulan pertama tahun 2025.', location: 'Ruang Rapat Utama Lt. 3' },
  { id: 9, title: 'Sosialisasi Program Inovasi Daerah', date: new Date(2025, 4, 23), time: '09.00', category: 'sosial', description: 'Sosialisasi program inovasi daerah kepada seluruh OPD dan stakeholder terkait di Kota Samarinda.', location: 'Aula Serbaguna Lt. 1' },
  { id: 10, title: 'Rapat Penyusunan LPPD 2025', date: new Date(202, 5, 5), time: '09.00', category: 'rapat', description: 'Penyusunan Laporan Penyelenggaraan Pemerintah Daerah (LPPD) akhir tahun 2024.', location: 'Ruang Sidang Lt. 3' },
  { id: 11, title: 'Workshop Smart City Samarinda', date: new Date(2025, 5, 8), time: '08.00', category: 'rapat', description: 'Workshop penyusunan roadmap Smart City Samarinda melibatkan ahli dari Kemenkominfo.', location: 'Hotel Neo GSS' },
  { id: 12, title: 'Upacara Puncak Hardiknas 2025', date: new Date(202, 5, 20), time: '07.00', category: 'upacara', description: 'Upacara peringatan Hari Kebangkitan Nasional ke-120 di tingkat Kota Samarinda.', location: 'Halaman Kantor Walikota' },
  { id: 13, title: 'Presentasi Data Kependudukan Kota', date: new Date(2025, 5, 22), time: '10.00', category: 'rapat', description: 'Presentasi data kependudukan terbaru dari BPS dan Dinas Kependudukan Kota Samarinda.', location: 'Ruang Rapat Utama Lt. 3' },
  { id: 14, title: 'Rapat Finalisasi RKPD 2025', date: new Date(202, 5, 27), time: 9.00, category: 'rapat', description: 'Finalisasi Rencana Kerja Pemerintah Daerah tahun 2025 sebelum pengiriman ke provinsi.', location: 'Ruang Sidang Lt. 3' },
  { id: 15, title: 'Forum Diskusi: Pariwisata Berkelanjutan', date: new Date(2025, 6, 3), time: 13.00, category: 'sosial', description: 'Forum diskusi publik bertema pariwisata berkelanjutan dan pengembangan destinasi wisata di Samarinda.', location: 'Ballroom Hotel Borneo' },
  { id: 16, title: 'Rapat Evaluasi Inovasi 2025', date: new Date(2025, 6, 5), time: 10.00, category: 'rapat', description: 'Evaluasi progres pelaksanaan program inovasi daerah semester pertama tahun 2025.', location: 'Ruang Bidang Riset' },
  { id: 17, title: 'Pelantikan Pejabat Sekretaris Baru', date: new Date(2025, 6, 10), time: 8.00, category: 'upacara', description: 'Pelantikan pejabat Sekretaris BAPPERIDA yang baru di hadapan Walikota Samarinda.', location: 'Ruang Serbaguna Lt. 1' },
  { id: 18, title: 'Rapat Koordinasi Lintas OPD', date: new Date(2025, 6, 16), time: 13.00, category: 'rapat', description: 'Koordinasi lintas Organisasi Perangkat Daerah terkait program prioritas pembangunan.', location: 'Ruang Rapat Utama Lt. 3' },
  { id: 19, title: 'Workshop Penyusunan RPIJM 2025', date: new Date(2025, 6, 19), time: 8.00, category: 'rapat', description: 'Workshop penyusunan Rencana Peningkatan Indikator Pembangunan Muara (RPIJM) tahun 2025.', location: 'Ruang Bidang Perencanaan' },
  { id: 20, title: 'Rapat Paripurna Pembahasan', date: new Date(2025, 6, 26), time: 9.00, category: 'upacara', description: 'Paripurna pembahasan RPJMD dan dokumen perencanaan pembangunan lainnya di hadapan DPRD Kota Samarinda.', location: 'Ruang Sidang DPRD' },
];

allEvents.forEach((ev) => {
  const c = catColors[ev.category] || { color: '#f5c832', bg: 'rgba(245,195,50,0.12)' };
  ev.color = c.color;
  ev.bgColor = c.bg;
});

const monthName = computed(() => monthNames[currentMonth.value]);

function isCurrentMonth() {
  return currentYear.value === now.getFullYear() && currentMonth.value === now.getMonth();
}

const daysInMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate());

const firstDayOffset = computed(() => {
  const day = new Date(currentYear.value, currentMonth.value, 1).getDay();
  return day === 0 ? 6 : day - 1;
});

const lastDayOffset = computed(() => {
  const totalCells = firstDayOffset.value + daysInMonth.value;
  return (7 - (totalCells % 7)) % 7;
});

function prevMonth() {
  if (currentMonth.value === 0) {
    currentYear.value--;
    currentMonth.value = 11;
  } else {
    currentMonth.value--;
  }
  selectedDay.value = null;
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentYear.value++;
    currentMonth.value = 0;
  } else {
    currentMonth.value++;
  }
  selectedDay.value = null;
}

function goToToday() {
  currentYear.value = now.getFullYear();
  currentMonth.value = now.getMonth();
  selectedDay.value = now.getDate();
}

function selectDay(day) {
  selectedDay.value = selectedDay.value === day ? null : day;
}

function goToDate(date) {
  currentYear.value = date.getFullYear();
  currentMonth.value = date.getMonth();
  selectedDay.value = date.getDate();
  viewMode.value = 'calendar';
}

function isToday(day) {
  return day === now.getDate() && isCurrentMonth();
}

function isWeekend(day) {
  const d = new Date(currentYear.value, currentMonth.value, day).getDay();
  return d === 0 || d === 6;
}

function isOtherMonth(day) {
  return false;
}

function hasEvents(day) {
  return allEvents.some((ev) => {
    const ed = ev.date;
    return ed.getFullYear() === currentYear.value && ed.getMonth() === currentMonth.value && ed.getDate() === day;
  });
}

function getEventsForDay(day) {
  return allEvents.filter((ev) => {
    const ed = ev.date;
    return ed.getFullYear() === currentYear.value && ed.getMonth() === currentMonth.value && ed.getDate() === day;
  });
}

const filteredEvents = computed(() => {
  let result = allEvents;
  if (activeCat.value !== 'all') {
    result = allEvents.filter((ev) => ev.category === activeCat.value);
  }
  return result.sort((a, b) => a.date - b.date);
});

function getCatCount(key) {
  if (key === 'all') return allEvents.length;
  return allEvents.filter((ev) => ev.category === key).length;
}

function getDay(date) {
  return date.getDate();
}

function getMonthShort(date) {
  return monthShorts[date.getMonth()];
}

const socials = [
  { label: 'Facebook', path: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h-4V7a1 1 0 0 1 1-1h3z"/>' },
  { label: 'Instagram', path: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>' },
  { label: 'YouTube', path: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>' },
  { label: 'X', path: '<path d="M4 4l16 16M20 4L4 20"/>' },
];

let resizeHandler = null;

function setupObservers() {
  pageVisible.value = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        mainVisible.value = true;
      }
    });
  }, { threshold: 0.05 });
  if (agendaMain.value) observer.observe(agendaMain.value);
}

onMounted(() => {
  nextTick(setupObservers);
  resizeHandler = () => {
    selectedDay.value = null;
  };
  window.addEventListener('resize', resizeHandler);
});

onUnmounted(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler);
});
</script>

<!-- ═══════ GLOBAL RESET ═══════ -->
<style>
html, body {
  margin: 0;
  padding: 0;
  background: #060e27;
  overflow-x: hidden;
}
</style>

<!-- ═══════ SCOPED STYLES ═══════ -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.agenda-page {
  font-family: 'Poppins', sans-serif;
  width: 100%;
  min-height: 100vh;
  background: #060e27;
  color: #fff;
}

/* ═══════════ PAGE HERO ═══════════ */
.page-hero {
  position: relative;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.page-hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1920&q=80') center/cover no-repeat;
  transform: scale(1.1);
}
.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6,14,39,0.75) 0%, rgba(6,14,39,0.98) 100%);
}
.page-hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  padding: 0 24px;
}
.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.6s ease;
}
.breadcrumb.visible { opacity: 1; transform: translateY(0); }
.breadcrumb-link {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb-link:hover { color: #f5c832; }
.breadcrumb-sep { width: 14px; height: 14px; color: rgba(255,255,255,0.25); }
.breadcrumb-current { font-size: 12px; font-weight: 600; color: #f5c832; }
.page-hero-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 12px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease 0.1s;
}
.page-hero-title.visible { opacity: 1; transform: translateY(0); }
.page-hero-desc {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease 0.2s;
}
.page-hero-desc.visible { opacity: 1; transform: translateY(0); }

/* ═══════════ FILTER BAR ═══════════ */
.agenda-main {
  position: relative;
  padding: 56px 0 80px;
}
.agenda-main > *:not(:first-child) {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 48px;
  padding-right: 48px;
}
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 14px 20px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}
.filter-bar.visible { opacity: 1; transform: translateY(0); }
.filter-left {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 100px;
  background: transparent;
  color: rgba(255,255,255,0.5);
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
  white-space: nowrap;
}
.filter-btn:hover {
  border-color: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.8);
}
.filter-btn.active {
  border-color: transparent;
  background: rgba(245,195,50,0.12);
  color: #f5c832;
}
.filter-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.filter-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 18px;
  padding: 0 6px;
  border-radius: 100px;
  background: rgba(255,255,255,0.06);
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.4);
}
.filter-btn.active .filter-count {
  background: rgba(245,195,50,0.2);
  color: #f5c832;
}
.filter-right {
  display: flex;
  align-items: center;
  gap: 6px;
}
.view-toggle {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
  background: transparent;
  color: rgba(255,255,255,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s;
}
.view-toggle svg { width: 18px; height: 18px; }
.view-toggle:hover {
  border-color: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.7);
}
.view-toggle.active {
  background: rgba(245,195,50,0.1);
  border-color: rgba(245,195,50,0.3);
  color: #f5c832;
}

/* ═══════════ CALENDAR LAYOUT ═══════════ */
.calendar-layout {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 48px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 0;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.6s ease;
}
.calendar-layout.visible { opacity: 1; transform: translateY(0); }

.calendar-panel {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 22px;
  padding: 28px;
  position: sticky;
  top: 56px;
}

.cal-month-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.cal-nav-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
  background: transparent;
  color: rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s;
}
.cal-nav-btn:hover:not(.disabled) {
  border-color: rgba(245,195,50,0.3);
  color: #f5c832;
}
.cal-nav-btn.disabled { opacity: 0.3; cursor: not-allowed; }
.cal-nav-btn svg { width: 16px; height: 16px; }
.cal-month-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.cal-month-name {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-transform: capitalize;
}
.cal-month-year {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.4);
}

.cal-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  margin-bottom: 8px;
}
.cal-weekday {
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.3);
  padding: 8px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.cal-weekend.cal-weekend { color: rgba(245,195,50,0.4); }

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.cal-day {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.cal-empty { cursor: default; }
.cal-day:not(.cal-empty):hover {
  background: rgba(255,255,255,0.06);
}
.cal-day-num {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  transition: all 0.2s;
}
.cal-day:not(.cal-empty):hover .cal-day-num { color: #fff; }
.cal-today {
  background: rgba(245,195,50,0.1);
  border: 1.5px solid rgba(245,195,50,0.5);
}
.cal-today .cal-day-num { color: #f5c832; font-weight: 800; }
.cal-selected {
  background: rgba(245,195,50,0.15);
  border: 1.5px solid rgba(245,195,50,0.6);
  transform: scale(1.08);
}
.cal-selected .cal-day-num { color: #f5c832; font-weight: 800; }
.cal-weekend-day .cal-day-num { color: rgba(245,195,50,0.45); }
.cal-has-event .cal-day-num { color: #fff; }
.cal-other-month {
  opacity: 0.25;
}

.cal-event-dots {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 3px;
}
.cal-event-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.cal-today-btn-wrap {
  padding-top: 16px;
  text-align: center;
}
.cal-today-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border: 1px solid rgba(245,195,50,0.3);
  border-radius: 100px;
  background: rgba(245,195,50,0.06);
  color: #f5c832;
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
}
.cal-today-btn:hover {
  background: rgba(245,195,50,0.15);
  border-color: rgba(245,195,50,0.5);
}
.cal-today-btn svg { width: 14px; height: 14px; }

/* ═══════════ DETAIL PANEL ═══════════ */
.cal-detail-panel {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.4s ease;
}
.cal-detail-open {
  max-height: 600px;
  opacity: 1;
}
.cal-detail-content,
.cal-detail-empty,
.cal-detail-placeholder {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  overflow-y: auto;
}
.cal-detail-content::-webkit-scrollbar { width: 4px; }
.cal-detail-content::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 4px; }
.cal-detail-content::-webkit-scrollbar-thumb { background: rgba(245,195,50,0.3); border-radius: 4px; }

.cal-detail-content { padding: 24px; }
.cal-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.cal-detail-date-badge {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.cal-detail-day-big {
  font-size: 42px;
  font-weight: 900;
  color: #f5c832;
  line-height: 1;
}
.cal-detail-month-sm {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  text-transform: capitalize;
}
.cal-detail-event-count {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.35);
  padding: 3px 12px;
  border-radius: 100px;
  background: rgba(255,255,255,0.06);
}
.cal-detail-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cal-detail-event {
  display: flex;
  gap: 14px;
  padding: 14px;
  border-radius: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  transition: background 0.2s;
}
.cal-detail-event:hover {
  background: rgba(255,255,255,0.06);
}
.cal-detail-time {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(245,195,50,0.08);
}
.cal-time-icon { width: 14px; height: 14px; color: #f5c832; }
.cal-detail-time span {
  font-size: 12px;
  font-weight: 700;
  color: #f5c832;
  font-family: monospace;
}
.cal-detail-info {
  flex: 1;
  min-width: 0;
}
.cal-detail-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.cal-detail-cat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.cal-detail-title {
  font-size: 13.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  line-height: 1.4;
}
.cal-detail-loc {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 500;
  color: rgba(255,255,255,0.35);
}
.cal-loc-icon { width: 13px; height: 13px; color: rgba(255,255,255,0.25); flex-shrink: 0; }

.cal-detail-empty,
.cal-detail-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 40px;
  text-align: center;
}
.cal-empty-icon,
.cal-ph-icon {
  width: 40px;
  height: 40px;
  color: rgba(255,255,255,0.1);
  margin-bottom: 12px;
}
.cal-detail-empty p,
.cal-detail-placeholder p {
  font-size: 13px;
  color: rgba(255,255,255,0.3);
}

/* ═══════════ LIST LAYOUT ═══════════ */
.list-layout {
  max-width: 1200px;
  margin: 0 auto 48px;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.6s ease;
}
.list-layout.visible { opacity: 1; transform: translateY(0); }

.event-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.event-card {
  display: flex;
  gap: 0;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
}
.event-card.visible { opacity: 1; transform: translateY(0); }
.event-card:hover {
  border-color: rgba(255,255,255,0.12);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.25);
}
.event-card-date-col {
  padding: 24px 20px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-right: 1px solid rgba(255,255,255,0.05);
}
.event-date-box {
  width: 64px;
  height: 72px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}
.event-card:hover .event-date-box { transform: scale(1.05); }
.event-date-day {
  font-size: 26px;
  font-weight: 900;
  color: #0a0f2e;
  line-height: 1;
}
.event-date-month {
  font-size: 10px;
  font-weight: 700;
  color: rgba(10,15,46,0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.event-card-body {
  flex: 1;
  padding: 20px 20px 20px 24px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.event-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.event-cat-tag {
  padding: 3px 12px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.event-time-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  font-family: monospace;
}
.ev-time-icon { width: 13px; height: 13px; color: rgba(255,255,255,0.35); }
.event-card-title {
  font-size: 14.5px;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
  line-height: 1.45;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.event-card-desc {
  font-size: 12.5px;
  font-weight: 400;
  color: rgba(255,255,255,0.38);
  line-height: 1.65;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.event-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.event-card-loc {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255,255,255,0.3);
}
.ev-loc-icon { width: 12px; height: 12px; color: rgba(255,255,255,0.2); flex-shrink: 0; }
.event-card-arrow {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.3);
  transition: all 0.25s;
}
.event-card:hover .event-card-arrow {
  color: #f5c832;
  gap: 8px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}
.empty-state.visible { opacity: 1; transform: translateY(0); }
.empty-icon { width: 48px; height: 48px; color: rgba(255,255,255,0.12); margin-bottom: 12px; }
.empty-state p { font-size: 14px; color: rgba(255,255,255,0.3); }

/* ═══════════ CONTACT SECTION ═══════════ */
.contact-section {
  max-width: 1200px;
  margin: 0 auto 0 48px;
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.6s ease;
}
.contact-section.visible { opacity: 1; transform: translateY(0); }
.contact-card {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 22px;
  padding: 36px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 36px;
}
.contact-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 36px;
  border-right: 1px solid rgba(255,255,255,0.06);
}
.contact-org {
  text-align: center;
  margin-bottom: 24px;
}
.contact-logo-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  border: 2px solid rgba(245,195,50,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.contact-logo { width: 48px; height: 48px; object-fit: contain; }
.contact-org-text { display: flex; flex-direction: column; line-height: 1.2; }
.contact-org-name { font-size: 13px; font-weight: 800; color: #fff; letter-spacing: 1.5px; }
.contact-org-sub { font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.5); }
.contact-socials {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.contact-social-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  transition: all 0.25s;
}
.contact-social-btn svg { width: 14px; height: 14px; }
.contact-social-btn:hover {
  background: rgba(245,195,50,0.1);
  border-color: rgba(245,195,50,0.3);
  color: #f5c832;
  transform: translateY(-2px);
}

.contact-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}
.contact-info-item {
  display: flex;
  gap: 12px;
  align-items: center;
}
.contact-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(245,195,50,0.08);
  border: 1px solid rgba(245,195,50,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.contact-icon-wrap svg { width: 16px; height: 16px; color: #f5c832; }
.contact-info-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.contact-info-label {
  font-size: 9px;
  font-weight: 700;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.contact-info-value {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.6);
}
.contact-info-link {
  color: #60a5fa;
  text-decoration: none;
  transition: color 0.2s;
}
.contact-info-link:hover { color: #93c5fd; text-decoration: underline; }

/* ═══════════ RESPONSIVE ═══════════ */
@media (max-width: 1024px) {
  .agenda-main > *:not(:first-child) { padding-left: 24px; padding-right: 24px; }
  .filter-bar { margin-left: 24px; margin-right: 24px; }
  .calendar-layout { grid-template-columns: 1fr 320px; padding: 0 24px; margin: 0 auto 32px; }
  .calendar-panel { position: static; top: 0; }
  .contact-section { padding: 0 24px; margin: 0 auto 48px; }
}

@media (max-width: 768px) {
  .agenda-main > *:not(:first-child) { padding-left: 20px; padding-right: 20px; }
  .filter-bar { margin-left: 20px; margin-right: 20px; flex-wrap: wrap; justify-content: center; }
  .filter-left { justify-content: center; }
  .calendar-layout {
    grid-template-columns: 1fr;
    padding: 0 20px;
    margin: 0 auto 32px;
  }
  .cal-day { height: 56px; border-radius: 10px; }
  .cal-day-num { font-size: 12px; }
  .cal-detail-panel {
    position: static;
    max-height: none;
    opacity: 1;
    margin-top: 24px;
  }
  .list-layout { padding: 0 20px; margin: 0 auto 48px; }
  .event-card {
    flex-direction: column;
  }
  .event-card-date-col {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding: 16px 20px;
  }
  .event-date-box {
    width: 56px;
    height: 56px;
  }
  .event-date-day { font-size: 22px; }
  .contact-card {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .contact-left {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding-right: 0;
  }
  .contact-right { gap: 12px; }
  .contact-info-item { gap: 10px; }
  .contact-icon-wrap { width: 34px; height: 34px; border-radius: 8px; }
  .contact-icon-wrap svg { width: 14px; height: 14px; }
  .contact-info-value { font-size: 12px; }
}

@media (max-width: 480px) {
  .filter-left { gap: 4px; }
  .filter-btn { padding: 6px 12px; font-size: 11px; }
  .filter-count { min-width: 18px; height: 16px; padding: 0 5px; font-size: 9px; }
  .cal-day { height: 48px; }
  .cal-day-num { font-size: 11px; }
  .cal-event-dots { bottom: 3px; gap: 2px; }
  .cal-event-dot { width: 4px; height: 4px; }
  .event-date-box { width: 48px; height: 52px; }
  .event-date-day { font-size: 20px; }
  .event-date-month { font-size: 9px; }
  .contact-info-item { flex-direction: column; align-items: flex-start; gap: 2px; }
  .contact-icon-wrap { width: 100%; height: 34px; border-radius: 8px; }
  .contact-info-value { font-size: 11px; }
}
</style>