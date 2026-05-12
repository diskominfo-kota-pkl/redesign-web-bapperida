<!-- HomePage.vue -->
<template>
  <div class="home-page">
    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="hero-bg">
        <img src="https://picsum.photos/seed/bapperida-hero2/1920/1080.jpg" alt="">
      </div>
      <div class="hero-gradient"></div>

      <!-- Geometri dekoratif -->
      <div class="hero-deco hero-deco--1"></div>
      <div class="hero-deco hero-deco--2"></div>
      <div class="hero-deco hero-deco--3"></div>

      <!-- Partikel -->
      <div class="hero-particles">
        <span v-for="p in particles" :key="p.id" class="hp"
          :style="{left:p.x+'%',top:p.y+'%',width:p.s+'px',height:p.s+'px',animationDelay:p.d+'s',animationDuration:p.t+'s'}"></span>
      </div>

      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-badge anim" data-d="0">
            <span class="hero-badge-dot"></span>
            PEMERINTAH KOTA SAMARINDA
          </div>
          <h1 class="hero-title anim" data-d="1">
            Badan Perencanaan<br>Pembangunan, Riset &<br><span>Inovasi Daerah</span>
          </h1>
          <p class="hero-loc anim" data-d="2">Kota Samarinda — Kalimantan Timur</p>
          <div class="hero-quote anim" data-d="3">
            <i class="fas fa-quote-left hero-quote-icon"></i>
            <div>
              <p>Sebuah tujuan tanpa rencana hanyalah sebuah keinginan</p>
              <span>— Antoine de Saint-Exupéry</span>
            </div>
          </div>
          <div class="hero-btns anim" data-d="4">
            <router-link to="/artikel" class="hbtn hbtn--gold">
              Jelajahi Berita <i class="fas fa-arrow-right"></i>
            </router-link>
            <button class="hbtn hbtn--glass" @click="scrollTo('berita')">
              <i class="fas fa-newspaper"></i> Berita Terkini
            </button>
          </div>
        </div>

        <div class="hero-right anim" data-d="3">
          <div v-for="(s,i) in heroStats" :key="i" class="hs-card">
            <div class="hs-icon" :style="{background:s.bg,color:s.c}">
              <i :class="s.icon"></i>
            </div>
            <div class="hs-text">
              <div class="hs-val">{{ s.val }}</div>
              <div class="hs-lbl">{{ s.lbl }}</div>
            </div>
          </div>
          <div class="kd-card">
            <div class="kd-avatar"><i class="fas fa-user-tie"></i></div>
            <div class="kd-text">
              <span class="kd-role">Kepala Dinas</span>
              <span class="kd-name">MARNABAS, S.Sos, M.Si</span>
            </div>
            <router-link to="/profil-kepala" class="kd-go" aria-label="Profil Lengkap">
              <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>

      <div class="hero-ticker">
        <div class="ticker-track">
          <span v-for="(m,i) in ticker" :key="'t'+i" class="ticker-item"><i class="fas fa-circle"></i>{{m}}</span>
          <span v-for="(m,i) in ticker" :key="'u'+i" class="ticker-item"><i class="fas fa-circle"></i>{{m}}</span>
        </div>
      </div>
    </section>

    <!-- ===== STATS ===== -->
    <div class="stats-strip">
      <div class="stats-wrap">
        <div v-for="(s,i) in statsBar" :key="i" class="ss-item anim" :data-d="i">
          <div class="ss-val">{{ s.val }}</div>
          <div class="ss-lbl">{{ s.lbl }}</div>
        </div>
      </div>
    </div>

    <!-- ===== BERITA TERKINI ===== -->
    <section id="berita" class="sec sec--alt">
      <div class="wrap">
        <div class="sec-head anim" data-d="0">
          <div>
            <div class="sec-label">Informasi Terbaru</div>
            <h2 class="sec-title">Berita Terkini</h2>
          </div>
          <router-link to="/artikel" class="sec-link">Lihat Semua <i class="fas fa-arrow-right" style="font-size:.7rem"></i></router-link>
        </div>
        <div class="bt-grid">
          <div class="bt-main anim" data-d="1" @click="showToast(beritaTerkini[0].title)">
            <img :src="`/src/assets/images/galeri1.jpg`" @error="fb($event,'smd-bt1')" alt="">
            <div class="bt-main-ov">
              <div class="bt-tag"><i class="fas fa-bolt"></i> Utama</div>
              <h3>{{ beritaTerkini[0].title }}</h3>
              <div class="bt-meta"><span><i class="far fa-calendar"></i> {{ beritaTerkini[0].date }}</span><span><i class="far fa-user"></i> {{ beritaTerkini[0].author }}</span></div>
            </div>
          </div>
          <div v-for="(b,i) in beritaTerkini.slice(1)" :key="b.id"
            class="bt-side anim" :data-d="i+2" @click="showToast(b.title)">
            <div class="bt-side-img"><img :src="`/src/assets/images/galeri${i+2}.jpg`" @error="fb($event,'smd-bt'+(i+2))" alt=""></div>
            <div class="bt-side-body">
              <div class="bt-tag bt-tag--sm">{{ b.tag }}</div>
              <h4>{{ b.title }}</h4>
              <div class="bt-meta bt-meta--sm"><span><i class="far fa-calendar"></i> {{ b.date }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== GALERI ===== -->
    <section class="sec">
      <div class="wrap">
        <div class="sec-head anim" data-d="0">
          <div>
            <div class="sec-label">Dokumentasi</div>
            <h2 class="sec-title">Galeri Kegiatan</h2>
          </div>
          <router-link to="/galeri" class="sec-link">Lihat Semua <i class="fas fa-arrow-right" style="font-size:.7rem"></i></router-link>
        </div>
        <div class="gal-grid">
          <div v-for="(g,i) in galeriItems" :key="i"
            class="gal-card anim" :data-d="i+1"
            :class="{'gal-card--lg':i===0}"
            @click="showToast('Galeri: '+g.label)">
            <img :src="g.src" @error="fb($event,g.fb)" alt="">
            <div class="gal-ov">
              <div class="gal-ov-inner">
                <i class="fas fa-images"></i>
                <span>{{ g.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== ARTIKEL ===== -->
    <section id="artikel" class="sec sec--alt">
      <div class="wrap">
        <div class="sec-head anim" data-d="0">
          <div>
            <div class="sec-label">Kabar & Opini</div>
            <h2 class="sec-title">Artikel Pilihan</h2>
          </div>
          <router-link to="/artikel" class="sec-link">Semua Artikel <i class="fas fa-arrow-right" style="font-size:.7rem"></i></router-link>
        </div>
        <div class="art-tabs anim" data-d="1">
          <button v-for="t in artikelTabs" :key="t" class="art-tab" :class="{active:activeTab===t}" @click="activeTab=t">{{t}}</button>
        </div>
        <div class="art-grid">
          <div v-for="(a,i) in filteredArtikel" :key="a.title" class="art-card anim" :data-d="(i%3)+1" @click="showToast(a.title)">
            <div class="art-img">
              <img :src="a.img" @error="fb($event,a.fb)" alt="">
              <div class="art-cat">{{ a.cat }}</div>
            </div>
            <div class="art-body">
              <h4>{{ a.title }}</h4>
              <p>{{ a.excerpt }}</p>
              <div class="art-foot">
                <div class="art-author"><span class="art-av">{{ a.ini }}</span><span class="art-an">{{ a.author }}</span></div>
                <span class="art-date">{{ a.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== BERITA DAERAH ===== -->
    <section class="sec sec--dark">
      <div class="sec-dark-glow"></div>
      <div class="wrap">
        <div class="sec-head anim" data-d="0">
          <div>
            <div class="sec-label sec-label--l">Dari Daerah</div>
            <h2 class="sec-title sec-title--l">Berita Daerah</h2>
          </div>
          <router-link to="/berita-daerah" class="sec-link sec-link--g">Selengkapnya <i class="fas fa-arrow-right" style="font-size:.7rem"></i></router-link>
        </div>
        <div class="dr-grid">
          <div v-for="(d,i) in beritaDaerah" :key="i" class="dr-card anim" :data-d="(i%4)+1" @click="showToast(d.title)">
            <img :src="d.img" @error="fb($event,d.fb)" alt="">
            <div class="dr-ov">
              <div class="dr-loc"><i class="fas fa-map-marker-alt"></i> {{ d.loc }}</div>
              <h4>{{ d.title }}</h4>
              <span class="dr-date">{{ d.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== BERITA LAINNYA ===== -->
    <section class="sec">
      <div class="wrap wrap--sm">
        <div class="sec-head anim" data-d="0">
          <div>
            <div class="sec-label">Terkini Lainnya</div>
            <h2 class="sec-title">Artikel & Berita Lainnya</h2>
          </div>
          <router-link to="/artikel" class="sec-link">Arsip Berita <i class="fas fa-arrow-right" style="font-size:.7rem"></i></router-link>
        </div>
        <div class="bl-list">
          <div v-for="(l,i) in beritaLainnya" :key="i" class="bl-item anim" :data-d="(i%5)+1" @click="showToast(l.title)">
            <div class="bl-num">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="bl-img"><img :src="l.img" @error="fb($event,l.fb)" alt=""></div>
            <div class="bl-info">
              <h4>{{ l.title }}</h4>
              <div class="bl-meta"><span><i class="far fa-calendar"></i> {{ l.date }}</span><span><i class="far fa-folder"></i> {{ l.cat }}</span></div>
            </div>
            <div class="bl-arrow"><i class="fas fa-arrow-right"></i></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== MENU INDEX ===== -->
    <section class="sec sec--alt">
      <div class="wrap">
        <div class="sec-head anim" data-d="0">
          <div>
            <div class="sec-label">Navigasi Cepat</div>
            <h2 class="sec-title">Menu Induk</h2>
          </div>
        </div>
        <div class="mi-grid">
          <router-link v-for="(m,i) in menuIndex" :key="i" :to="m.to" class="mi-card anim" :data-d="(i%6)+1">
            <div class="mi-icon" :style="{background:m.bg,color:m.c}"><i :class="m.icon"></i></div>
            <span class="mi-label">{{ m.label }}</span>
            <span class="mi-arrow"><i class="fas fa-arrow-right"></i></span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Toast -->
    <Transition name="toast-t">
      <div v-if="toastMsg" class="hp-toast"><i class="fas fa-check-circle"></i> {{ toastMsg }}</div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const particles = Array.from({length:22},(_,i)=>({
  id:i, x:Math.random()*100, y:Math.random()*100,
  s:2+Math.random()*4, d:Math.random()*6, t:4+Math.random()*5
}))

const heroStats = [
  {val:'843.468',lbl:'Jumlah Penduduk',icon:'fas fa-users',bg:'rgba(78,184,114,.15)',c:'#4CB872'},
  {val:'727 km²',lbl:'Luas Wilayah',icon:'fas fa-map',bg:'rgba(212,168,67,.15)',c:'#D4A843'},
  {val:'10 Kec.',lbl:'Kecamatan',icon:'fas fa-building',bg:'rgba(125,212,160,.15)',c:'#7DD4A0'},
  {val:'46 Kel.',lbl:'Kelurahan',icon:'fas fa-home',bg:'rgba(226,195,107,.15)',c:'#E2C36B'}
]

const ticker = [
  'Forum RPJMD 2025-2045 Resmi Dibuka',
  'Bapperida Raih Penghargaan Inovasi Daerah',
  'Musrenbang Kelurahan Tahap II Dimulai',
  'Rakor Percepatan Pengentasan Kemiskinan',
  'Peluncuran Dashboard Data Terbuka Samarinda'
]

const statsBar = [
  {val:'2.847',lbl:'Berita Dipublikasi'},
  {val:'156',lbl:'Program Pembangunan'},
  {val:'312',lbl:'Pengaduan Ditangani'},
  {val:'89%',lbl:'Kepuasan Masyarakat'}
]

const beritaTerkini = [
  {id:1,title:'Semarak Lomba 17an Bapperida Kota Samarinda Meriahkan HUT ke-80 RI',date:'08 Agustus 2025',author:'ARIADHY, S.Kom',tag:'Kegiatan'},
  {id:2,title:'Peringatan Hari Ibu Nasional 2024: Perempuan Menginspirasi Menuju Indonesia Emas 2045',date:'23 Desember 2024',author:'ARIADHY, S.Kom',tag:'Peringatan'},
  {id:3,title:'Rakor TKPK Samarinda: Komitmen Bersama Menghapus Kemiskinan Ekstrem',date:'18 November 2024',author:'ARIADHY, S.Kom',tag:'Rapat'}
]

const galeriItems = [
  {src:'/src/assets/images/galeri1.jpg',fb:'smd-g1',label:'Rapat Koordinasi Bapperida'},
  {src:'/src/assets/images/galeri2.jpg',fb:'smd-g2',label:'Kunjungan Lapangan'},
  {src:'/src/assets/images/galeri3.jpg',fb:'smd-g3',label:'Pelatihan Inovasi Daerah'},
  {src:'/src/assets/images/galeri4.jpg',fb:'smd-g4',label:'Forum RPJMD 2025'}
]

const artikelTabs = ['Semua','Pembangunan','Lingkungan','Pendidikan']
const allArtikel = [
  {title:'Transformasi Samarinda Menuju Kota Pintar Berkelanjutan',excerpt:'Teknologi dan kebijakan hijau mengubah wajah kota tepian menjadi kota masa depan.',img:'https://picsum.photos/seed/smd-a1/600/400.jpg',fb:'smd-a1',cat:'Pembangunan',author:'Ahmad Fauzi',ini:'AF',date:'22 Jun 2025'},
  {title:'Konservasi Mangrove Sungai Mahakam: Harapan Baru Lingkungan Kota',excerpt:'Ekosistem mangrove di tepian Mahakam menjadi penyangga kehidupan warga pesisir.',img:'https://picsum.photos/seed/smd-a2/600/400.jpg',fb:'smd-a2',cat:'Lingkungan',author:'Siti Nurhaliza',ini:'SN',date:'20 Jun 2025'},
  {title:'Revitalisasi Sekolah Dasar: Dari Rusak Menjadi Berstandar Nasional',excerpt:'Program renovasi massal sekolah dasar menunjukkan hasil nyata peningkatan mutu pendidikan.',img:'https://picsum.photos/seed/smd-a3/600/400.jpg',fb:'smd-a3',cat:'Pendidikan',author:'Budi Santoso',ini:'BS',date:'18 Jun 2025'},
  {title:'Pembangunan Jalan Lingkar Utara Samarinda Capai 70 Persen',excerpt:'Proyek strategis penghubung kecamatan utara ditargetkan selesai akhir 2025.',img:'https://picsum.photos/seed/smd-a4/600/400.jpg',fb:'smd-a4',cat:'Pembangunan',author:'Ir. Hendra',ini:'IH',date:'14 Jun 2025'},
  {title:'Samarinda Green City: Penghargaan Kota Paling Hijau di Kaltim',excerpt:'Penghijauan dan pengelolaan sampah konsisten membawa Samarinda raih penghargaan.',img:'https://picsum.photos/seed/smd-a5/600/400.jpg',fb:'smd-a5',cat:'Lingkungan',author:'Maya Sari',ini:'MS',date:'12 Jun 2025'},
  {title:'Digitalisasi Sekolah: 50 Ribu Siswa Dapat Akses Platform Belajar',excerpt:'Kerjasama dengan Kemendikbud memperluas akses digital bagi pelajar Samarinda.',img:'https://picsum.photos/seed/smd-a6/600/400.jpg',fb:'smd-a6',cat:'Pendidikan',author:'Dra. Lina',ini:'DL',date:'10 Jun 2025'}
]
const activeTab = ref('Semua')
const filteredArtikel = computed(()=>{
  if(activeTab.value==='Semua') return allArtikel
  return allArtikel.filter(a=>a.cat===activeTab.value)
})

const beritaDaerah = [
  {title:'Kecamatan Samarinda Ilir Gelar Festival Budaya Melayu',img:'https://picsum.photos/seed/smd-d1/500/600.jpg',fb:'smd-d1',loc:'Samarinda Ilir',date:'21 Jun 2025'},
  {title:'Sungai Kunjang Bangun Taman Baca Masyarakat',img:'https://picsum.photos/seed/smd-d2/500/600.jpg',fb:'smd-d2',loc:'Sungai Kunjang',date:'19 Jun 2025'},
  {title:'Loa Janan Latih UMKM Masuk Marketplace Digital',img:'https://picsum.photos/seed/smd-d3/500/600.jpg',fb:'smd-d3',loc:'Loa Janan',date:'17 Jun 2025'},
  {title:'Palaran Sukses Gelar Posyandu Keliling Digital',img:'https://picsum.photos/seed/smd-d4/500/600.jpg',fb:'smd-d4',loc:'Palaran',date:'15 Jun 2025'}
]

const beritaLainnya = [
  {title:'Kota Samarinda Teken MoU dengan IKN untuk Kawasan Penyangga',img:'https://picsum.photos/seed/smd-l1/200/150.jpg',fb:'smd-l1',date:'24 Jun 2025',cat:'Kerjasama'},
  {title:'Anggaran Pendidikan 2025 Naik 15 Persen dari Tahun Sebelumnya',img:'https://picsum.photos/seed/smd-l2/200/150.jpg',fb:'smd-l2',date:'23 Jun 2025',cat:'APBD'},
  {title:'Peluncuran Aplikasi Sampah Digital untuk Warga Samarinda',img:'https://picsum.photos/seed/smd-l3/200/150.jpg',fb:'smd-l3',date:'22 Jun 2025',cat:'Teknologi'},
  {title:'Turnamen Sepakbola Antar Kelurahan Piala Wali Kota Dibuka',img:'https://picsum.photos/seed/smd-l4/200/150.jpg',fb:'smd-l4',date:'21 Jun 2025',cat:'Olahraga'},
  {title:'Workshop Penulisan Kebijakan Publik untuk ASN Pemkot',img:'https://picsum.photos/seed/smd-l5/200/150.jpg',fb:'smd-l5',date:'20 Jun 2025',cat:'Kepegawaian'}
]

const menuIndex = [
  {label:'Artikel',to:'/artikel',icon:'fas fa-file-alt',bg:'rgba(27,94,48,.1)',c:'#1B5E30'},
  {label:'Berita Daerah',to:'/berita-daerah',icon:'fas fa-map-marked-alt',bg:'rgba(212,168,67,.12)',c:'#D4A843'},
  {label:'Berita Nasional',to:'/berita-nasional',icon:'fas fa-flag',bg:'rgba(35,122,62,.1)',c:'#237A3E'},
  {label:'Siaran Pers',to:'/siaran-pers',icon:'fas fa-bullhorn',bg:'rgba(78,184,114,.12)',c:'#4CB872'},
  {label:'Jurnal',to:'/jurnal',icon:'fas fa-book-open',bg:'rgba(226,195,107,.15)',c:'#B8860B'},
  {label:'Penelitian & Pengembangan',to:'/penelitian',icon:'fas fa-flask',bg:'rgba(125,212,160,.15)',c:'#1B5E30'}
]

const toastMsg = ref('')
let tt = null
function showToast(m){toastMsg.value=m;if(tt)clearTimeout(tt);tt=setTimeout(()=>{toastMsg.value=''},2500)}
function scrollTo(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})}
function fb(e,s){e.target.src=`https://picsum.photos/seed/${s}/600/400.jpg`}

function onScroll(){
  document.querySelectorAll('.anim').forEach(el=>{
    const r=el.getBoundingClientRect()
    if(r.top<window.innerHeight-50){
      el.style.transitionDelay=(parseInt(el.dataset.d||0)*.1)+'s'
      el.classList.add('v')
    }
  })
}
onMounted(()=>{window.addEventListener('scroll',onScroll,{passive:true});onScroll()})
onUnmounted(()=>{window.removeEventListener('scroll',onScroll)})
</script>

<style scoped>
:root{
  --g9:#0A2E1A;--g8:#143D26;--g7:#1B5E30;--g6:#237A3E;
  --g5:#2E964F;--g4:#4CB872;--g3:#7DD4A0;--g2:#B5E6C8;
  --g1:#E0F3E8;--g0:#F0FAF3;
  --au:#D4A843;--au-l:#E2C36B;--au-p:#F0D98A;
  --dk:#0F1A14;
  --r8:#1A1F1C;--r7:#3D4842;--r6:#556159;--r5:#6B7A72;
  --r4:#8A9992;--r3:#B0BDB7;--r2:#D4DDD9;--r1:#E8EDEB;--r0:#F4F7F6;
}
*{margin:0;padding:0;box-sizing:border-box}

/* Scroll animation */
.anim{opacity:0;transform:translateY(32px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.anim.v{opacity:1;transform:translateY(0)}

.wrap{max-width:1200px;margin:0 auto;padding:0 24px}
.wrap--sm{max-width:900px}

/* ===== HERO ===== */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:var(--g9)}
.hero-bg{position:absolute;inset:0;z-index:0}
.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.3;filter:saturate(.8)}
.hero-gradient{position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(10,46,26,.97) 0%,rgba(10,46,26,.7) 40%,rgba(10,46,26,.35) 75%,rgba(10,46,26,.2) 100%)}

/* Dekorasi geometris */
.hero-deco{position:absolute;z-index:1;pointer-events:none;border-radius:50%}
.hero-deco--1{width:600px;height:600px;top:-200px;right:-200px;background:radial-gradient(circle,rgba(46,150,79,.08) 0%,transparent 65%)}
.hero-deco--2{width:300px;height:300px;bottom:10%;left:-80px;background:radial-gradient(circle,rgba(212,168,67,.06) 0%,transparent 65%)}
.hero-deco--3{
  width:200px;height:200px;top:20%;right:15%;
  border:1px solid rgba(255,255,255,.04);border-radius:30px;
  transform:rotate(45deg);
  animation:decoRotate 20s linear infinite;
}
@keyframes decoRotate{from{transform:rotate(45deg)}to{transform:rotate(405deg)}}

.hero-particles{position:absolute;inset:0;z-index:1;overflow:hidden;pointer-events:none}
.hp{position:absolute;background:var(--g3);border-radius:50%;opacity:0;animation:hpFloat 6s ease-in-out infinite}
@keyframes hpFloat{0%,100%{transform:translateY(0);opacity:0}15%{opacity:.35}50%{transform:translateY(-18px);opacity:.25}85%{opacity:.1}}

.hero-inner{position:relative;z-index:2;width:100%;max-width:1200px;margin:0 auto;padding:120px 24px 100px;display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}

.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px 6px 8px;border-radius:99px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);color:var(--g2);font-size:.7rem;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;backdrop-filter:blur(10px);margin-bottom:24px}
.hero-badge-dot{width:8px;height:8px;background:var(--g4);border-radius:50%;position:relative}
.hero-badge-dot::after{content:'';position:absolute;inset:-3px;border-radius:50%;border:1.5px solid var(--g4);animation:dotPulse 2s ease infinite}
@keyframes dotPulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.6);opacity:0}}

.hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,4.5vw,3.6rem);font-weight:800;color:#fff;line-height:1.12;margin-bottom:10px}
.hero-title span{background:linear-gradient(135deg,var(--au-p),var(--au));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-loc{font-size:1rem;color:var(--g2);font-weight:400;margin-bottom:28px;letter-spacing:.5px}

.hero-quote{display:flex;gap:16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:22px 24px;margin-bottom:32px;backdrop-filter:blur(10px)}
.hero-quote-icon{color:var(--au);font-size:.9rem;margin-top:3px;flex-shrink:0;opacity:.7}
.hero-quote p{font-style:italic;font-size:.95rem;color:var(--g2);line-height:1.6;margin-bottom:4px}
.hero-quote span{font-size:.75rem;color:var(--g4);font-weight:500}

.hero-btns{display:flex;gap:14px;flex-wrap:wrap}
.hbtn{display:inline-flex;align-items:center;gap:10px;padding:14px 28px;border-radius:12px;font-size:.88rem;font-weight:600;cursor:pointer;transition:all .3s ease;font-family:'Plus Jakarta Sans',sans-serif;text-decoration:none}
.hbtn--gold{background:linear-gradient(135deg,var(--au-l),var(--au));color:var(--g9);box-shadow:0 4px 20px rgba(212,168,67,.35)}
.hbtn--gold:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(212,168,67,.5)}
.hbtn--glass{background:transparent;border:1.5px solid rgba(255,255,255,.16);color:#fff;backdrop-filter:blur(10px)}
.hbtn--glass:hover{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.3);transform:translateY(-2px)}

/* Hero kanan */
.hero-right{display:flex;flex-direction:column;gap:12px}
.hs-card{display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);backdrop-filter:blur(14px);transition:all .35s ease;cursor:default}
.hs-card:hover{background:rgba(255,255,255,.08);transform:translateX(-5px)}
.hs-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
.hs-val{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:#fff;line-height:1.2}
.hs-lbl{font-size:.73rem;color:var(--g2)}

.kd-card{display:flex;align-items:center;gap:14px;padding:16px 20px;border-radius:14px;background:linear-gradient(135deg,rgba(212,168,67,.1),rgba(212,168,67,.03));border:1px solid rgba(212,168,67,.18);backdrop-filter:blur(14px);transition:all .35s ease;margin-top:4px}
.kd-card:hover{background:linear-gradient(135deg,rgba(212,168,67,.16),rgba(212,168,67,.05))}
.kd-avatar{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--au-l),var(--au));display:flex;align-items:center;justify-content:center;color:var(--g9);font-size:1.05rem;flex-shrink:0}
.kd-text{flex:1;display:flex;flex-direction:column;gap:2px}
.kd-role{font-size:.67rem;color:var(--g3);font-weight:500;text-transform:uppercase;letter-spacing:1px}
.kd-name{font-size:.9rem;color:#fff;font-weight:700}
.kd-go{width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:var(--au-l);font-size:.75rem;text-decoration:none;transition:all .3s ease}
.kd-go:hover{background:var(--au);color:var(--g9);border-color:var(--au)}

/* Ticker */
.hero-ticker{position:absolute;bottom:0;left:0;right:0;z-index:3;padding:13px 0;background:rgba(10,46,26,.5);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.04);overflow:hidden}
.ticker-track{display:flex;gap:40px;animation:tickerMove 30s linear infinite;width:max-content}
@keyframes tickerMove{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.ticker-item{display:flex;align-items:center;gap:10px;color:var(--g2);font-size:.76rem;white-space:nowrap;font-weight:500}
.ticker-item i{color:var(--au);font-size:.5rem}

/* ===== STATS ===== */
.stats-strip{background:#fff;border-bottom:1px solid var(--r1);padding:34px 24px}
.stats-wrap{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.ss-item{text-align:center;position:relative}
.ss-item:not(:last-child)::after{content:'';position:absolute;right:-12px;top:12%;height:76%;width:1px;background:var(--r1)}
.ss-val{font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:800;color:var(--g7);line-height:1.1;margin-bottom:3px}
.ss-lbl{font-size:.74rem;color:var(--r5);font-weight:500}

/* ===== SECTION COMMON ===== */
.sec{padding:72px 0}
.sec--alt{background:var(--r0)}
.sec--dark{background:linear-gradient(170deg,var(--g9) 0%,var(--g8) 100%);position:relative;overflow:hidden}
.sec-dark-glow{position:absolute;top:-200px;right:-200px;width:500px;height:500px;background:radial-gradient(circle,rgba(78,184,114,.1) 0%,transparent 70%);border-radius:50%;pointer-events:none}

.sec-head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:36px;gap:16px;flex-wrap:wrap}
.sec-label{display:inline-flex;align-items:center;gap:8px;font-size:.68rem;font-weight:600;color:var(--g6);text-transform:uppercase;letter-spacing:2.5px;margin-bottom:6px}
.sec-label::before{content:'';width:20px;height:2px;background:var(--g5);border-radius:99px}
.sec-label--l{color:var(--g3)}
.sec-label--l::before{background:var(--g4)}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,2.8vw,2.2rem);font-weight:700;color:var(--g9);line-height:1.2}
.sec-title--l{color:#fff}
.sec-link{display:inline-flex;align-items:center;gap:8px;color:var(--g6);font-size:.8rem;font-weight:600;text-decoration:none;padding:8px 18px;border-radius:99px;border:1.5px solid var(--g2);transition:all .3s ease;flex-shrink:0}
.sec-link:hover{background:var(--g7);color:#fff;border-color:var(--g7);transform:translateY(-1px)}
.sec-link--g{color:var(--g2);border-color:rgba(255,255,255,.12)}
.sec-link--g:hover{background:var(--au);color:var(--g9);border-color:var(--au)}

/* ===== BERITA ===== */
.bt-grid{display:grid;grid-template-columns:1.2fr 1fr;grid-template-rows:auto auto;gap:16px}
.bt-main{grid-row:1/3;position:relative;border-radius:16px;overflow:hidden;cursor:pointer;min-height:460px;background:var(--r2)}
.bt-main img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.16,1,.3,1)}
.bt-main:hover img{transform:scale(1.04)}
.bt-main-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,46,26,.95) 0%,rgba(10,46,26,.2) 55%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:30px}
.bt-tag{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:var(--au);color:var(--g9);border-radius:6px;font-size:.64rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;width:fit-content;margin-bottom:12px}
.bt-tag--sm{font-size:.58rem;padding:3px 9px;background:var(--g1);color:var(--g7)}
.bt-main-ov h3{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:#fff;line-height:1.3;margin-bottom:10px}
.bt-meta{display:flex;align-items:center;gap:16px;font-size:.72rem;color:var(--g2)}
.bt-meta span{display:flex;align-items:center;gap:5px}
.bt-meta--sm{color:var(--r5)}

.bt-side{position:relative;border-radius:12px;overflow:hidden;cursor:pointer;display:flex;background:#fff;border:1px solid var(--r1);transition:all .35s ease;height:100%;min-height:221px}
.bt-side:hover{box-shadow:0 8px 30px rgba(10,46,26,.08);transform:translateY(-3px);border-color:transparent}
.bt-side-img{width:165px;flex-shrink:0;overflow:hidden}
.bt-side-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.bt-side:hover .bt-side-img img{transform:scale(1.06)}
.bt-side-body{padding:18px;display:flex;flex-direction:column;justify-content:center}
.bt-side-body .bt-tag{margin-bottom:8px}
.bt-side-body h4{font-family:'Playfair Display',serif;font-size:.92rem;font-weight:700;color:var(--g9);line-height:1.35;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}

/* ===== GALERI ===== */
.gal-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:220px 220px;gap:14px}
.gal-card--lg{grid-column:1/3}
.gal-card{position:relative;border-radius:14px;overflow:hidden;cursor:pointer}
.gal-card img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.gal-card:hover img{transform:scale(1.06)}
.gal-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,46,26,.88) 0%,transparent 55%);display:flex;align-items:flex-end;padding:22px;opacity:0;transition:opacity .35s ease}
.gal-card:hover .gal-ov{opacity:1}
.gal-ov-inner{display:flex;align-items:center;gap:10px}
.gal-ov-inner i{color:var(--au-l);font-size:1.1rem}
.gal-ov-inner span{color:#fff;font-size:.86rem;font-weight:600}

/* ===== ARTIKEL ===== */
.art-tabs{display:flex;gap:6px;margin-bottom:28px;flex-wrap:wrap}
.art-tab{padding:8px 20px;border-radius:99px;border:1.5px solid var(--r2);background:transparent;color:var(--r6);font-size:.78rem;font-weight:600;cursor:pointer;transition:all .3s ease;font-family:'Plus Jakarta Sans',sans-serif}
.art-tab:hover{border-color:var(--g3);color:var(--g7)}
.art-tab.active{background:var(--g7);color:#fff;border-color:var(--g7)}

.art-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.art-card{background:#fff;border-radius:14px;overflow:hidden;border:1px solid var(--r1);transition:all .4s cubic-bezier(.16,1,.3,1);cursor:pointer}
.art-card:hover{box-shadow:0 12px 40px rgba(10,46,26,.1);transform:translateY(-5px);border-color:transparent}
.art-img{position:relative;height:185px;overflow:hidden}
.art-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.art-card:hover .art-img img{transform:scale(1.05)}
.art-cat{position:absolute;top:12px;left:12px;padding:3px 10px;background:rgba(255,255,255,.95);border-radius:6px;font-size:.63rem;font-weight:700;color:var(--g7);text-transform:uppercase;letter-spacing:.5px;backdrop-filter:blur(8px)}
.art-body{padding:20px}
.art-body h4{font-family:'Playfair Display',serif;font-size:.98rem;font-weight:700;color:var(--g9);line-height:1.4;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.art-body p{font-size:.78rem;color:var(--r5);line-height:1.6;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.art-foot{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--r1)}
.art-author{display:flex;align-items:center;gap:8px}
.art-av{width:24px;height:24px;border-radius:6px;background:var(--g1);display:flex;align-items:center;justify-content:center;font-size:.58rem;font-weight:700;color:var(--g7)}
.art-an{font-size:.7rem;font-weight:600;color:var(--r7)}
.art-date{font-size:.68rem;color:var(--r4)}

/* ===== DAERAH ===== */
.dr-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;position:relative;z-index:1}
.dr-card{position:relative;border-radius:14px;overflow:hidden;cursor:pointer;height:310px;background:var(--r8)}
.dr-card img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.dr-card:hover img{transform:scale(1.07)}
.dr-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,46,26,.95) 0%,rgba(10,46,26,.12) 65%,transparent 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:20px;transition:background .3s ease}
.dr-card:hover .dr-ov{background:linear-gradient(to top,rgba(10,46,26,.98) 0%,rgba(10,46,26,.4) 75%,rgba(10,46,26,.06) 100%)}
.dr-loc{display:inline-flex;align-items:center;gap:5px;font-size:.66rem;color:var(--au);font-weight:600;margin-bottom:8px}
.dr-ov h4{font-family:'Playfair Display',serif;font-size:.92rem;font-weight:700;color:#fff;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.dr-date{font-size:.66rem;color:var(--g3);margin-top:8px}

/* ===== LAINNYA ===== */
.bl-list{display:flex;flex-direction:column}
.bl-item{display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid var(--r1);cursor:pointer;transition:all .3s ease}
.bl-item:last-child{border-bottom:none}
.bl-item:hover{padding-left:10px}
.bl-num{font-family:'Playfair Display',serif;font-size:1.7rem;font-weight:800;color:var(--g1);width:42px;flex-shrink:0;text-align:center;line-height:1;transition:color .3s ease}
.bl-item:hover .bl-num{color:var(--g5)}
.bl-img{width:92px;height:66px;border-radius:8px;overflow:hidden;flex-shrink:0}
.bl-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}
.bl-item:hover .bl-img img{transform:scale(1.08)}
.bl-info{flex:1;min-width:0}
.bl-info h4{font-size:.86rem;font-weight:600;color:var(--g9);line-height:1.4;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;transition:color .3s ease}
.bl-item:hover .bl-info h4{color:var(--g6)}
.bl-meta{display:flex;align-items:center;gap:12px;font-size:.68rem;color:var(--r4)}
.bl-arrow{width:32px;height:32px;border-radius:50%;background:var(--g0);display:flex;align-items:center;justify-content:center;color:var(--g5);font-size:.72rem;flex-shrink:0;transition:all .3s ease;opacity:0;transform:translateX(-8px)}
.bl-item:hover .bl-arrow{opacity:1;transform:translateX(0);background:var(--g7);color:#fff}

/* ===== MENU INDEX ===== */
.mi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.mi-card{display:flex;align-items:center;gap:16px;padding:20px 22px;border-radius:14px;background:#fff;text-decoration:none;color:var(--r8);border:1px solid var(--r1);transition:all .35s cubic-bezier(.16,1,.3,1)}
.mi-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(10,46,26,.08);border-color:transparent}
.mi-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;transition:transform .3s ease}
.mi-card:hover .mi-icon{transform:scale(1.1)}
.mi-label{flex:1;font-size:.86rem;font-weight:600;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.mi-arrow{width:28px;height:28px;border-radius:8px;background:var(--g0);display:flex;align-items:center;justify-content:center;color:var(--g5);font-size:.68rem;flex-shrink:0;transition:all .3s ease;opacity:0;transform:translateX(-6px)}
.mi-card:hover .mi-arrow{opacity:1;transform:translateX(0);background:var(--g7);color:#fff}

/* ===== TOAST ===== */
.hp-toast{position:fixed;bottom:24px;right:24px;z-index:9999;padding:14px 24px;background:var(--g7);color:#fff;border-radius:12px;font-size:.84rem;font-weight:500;box-shadow:0 8px 32px rgba(27,94,48,.35);display:flex;align-items:center;gap:10px}
.toast-t-enter-active{animation:toastT .4s cubic-bezier(.16,1,.3,1)}
.toast-t-leave-active{animation:toastT .3s ease reverse}
@keyframes toastT{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}

/* ===== RESPONSIVE ===== */
@media(max-width:1024px){
  .hero-inner{grid-template-columns:1fr;gap:36px}
  .hero-right{flex-direction:row;flex-wrap:wrap}
  .hs-card{flex:1;min-width:170px}
  .kd-card{flex:1;min-width:100%}
  .bt-grid{grid-template-columns:1fr}
  .bt-main{min-height:340px;grid-row:auto}
  .art-grid{grid-template-columns:repeat(2,1fr)}
  .dr-grid{grid-template-columns:repeat(2,1fr)}
  .stats-wrap{grid-template-columns:repeat(2,1fr);gap:20px}
  .ss-item:not(:last-child)::after{display:none}
}
@media(max-width:768px){
  .sec{padding:52px 0}
  .wrap{padding:0 16px}
  .hero-inner{padding:100px 16px 90px}
  .hs-card{min-width:100%}
  .art-grid{grid-template-columns:1fr}
  .dr-grid{grid-template-columns:1fr}
  .dr-card{height:260px}
  .gal-grid{grid-template-columns:1fr;grid-template-rows:auto}
  .gal-card--lg{grid-column:auto}
  .mi-grid{grid-template-columns:1fr}
  .bt-side{flex-direction:column;min-height:auto}
  .bt-side-img{width:100%;height:150px}
  .bl-img{width:72px;height:54px}
  .bl-num{font-size:1.3rem;width:32px}
  .hero-deco--3{display:none}
}
@media(max-width:480px){
  .hero-btns{flex-direction:column}
  .hbtn{width:100%;justify-content:center}
  .sec-head{flex-direction:column;align-items:flex-start}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{transition-duration:.01ms!important;animation-duration:.01ms!important}
  .ticker-track{animation:none}
  .hp{animation:none;opacity:.2}
  .hero-deco--3{animation:none}
}
</style>