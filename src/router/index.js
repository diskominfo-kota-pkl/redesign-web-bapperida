import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ArtikelPage from '../views/ArtikelPage.vue'
import BeritaDaerahPage from '../views/BeritaDaerahPage.vue'
import BeritaNasionalPage from '../views/BeritaNasionalPage.vue'
import SiaranPersPage from '../views/SiaranPersPage.vue'
import JurnalPage from '../views/JurnalPage.vue'
import PenelitianPage from '../views/PenelitianPage.vue'
import GaleriPage from '../views/GaleriPage.vue'
import ProfilKepalaPage from '../views/ProfilKepalaPage.vue'
import ProgramUnggulanPage from '../views/ProgramUnggulanPage.vue'
import DasarHukumPage from '../views/DasarHukumPage.vue'
import VisiMisiPage from '../views/VisiMisiPage.vue'
import StrukturOrganisasiPage from '../views/StrukturOrganisasiPage.vue'
import TupoksiPage from '../views/TupoksiPage.vue'
import ProfilSekretarisPage from '../views/ProfilSekretarisPage.vue'
import MaklumatPelayananPage from '../views/MaklumatPelayananPage.vue'
import SejarahSamarindaPage from '../views/SejarahSamarindaPage.vue'

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/artikel', name: 'Artikel', component: ArtikelPage },
    { path: '/berita-daerah', name: 'BeritaDaerah', component: BeritaDaerahPage },
    { path: '/berita-nasional', name: 'BeritaNasional', component: BeritaNasionalPage },
    { path: '/siaran-pers', name: 'SiaranPers', component: SiaranPersPage },
    { path: '/jurnal', name: 'Jurnal', component: JurnalPage },
    { path: '/penelitian', name: 'Penelitian', component: PenelitianPage },
    { path: '/galeri', name: 'Galeri', component: GaleriPage },
    { path: '/profil/10-program-unggulan', name: 'ProgramUnggulan', component: ProgramUnggulanPage },
    { path: '/profil/dasar-hukum', name: 'DasarHukum', component: DasarHukumPage },
    { path: '/profil/visi-misi', name: 'VisiMisi', component: VisiMisiPage },
    { path: '/profil/struktur-organisasi', name: 'StrukturOrganisasi', component: StrukturOrganisasiPage },
    { path: '/profil/tupoksi', name: 'Tupoksi', component: TupoksiPage },
    { path: '/profil/profil-kepala', name: 'ProfilKepala', component: ProfilKepalaPage },
    { path: '/profil/sekretaris', name: 'ProfilSekretaris', component: ProfilSekretarisPage },
    { path: '/profil/maklumat-pelayanan', name: 'MaklumatPelayanan', component: MaklumatPelayananPage },
    { path: '/profil/sejarah-samarinda', name: 'SejarahSamarinda', component: SejarahSamarindaPage },
    { path: '/profil-kepala', redirect: '/profil/profil-kepala' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router