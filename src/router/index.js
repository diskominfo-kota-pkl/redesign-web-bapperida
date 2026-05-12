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

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/artikel', name: 'Artikel', component: ArtikelPage },
    { path: '/berita-daerah', name: 'BeritaDaerah', component: BeritaDaerahPage },
    { path: '/berita-nasional', name: 'BeritaNasional', component: BeritaNasionalPage },
    { path: '/siaran-pers', name: 'SiaranPers', component: SiaranPersPage },
    { path: '/jurnal', name: 'Jurnal', component: JurnalPage },
    { path: '/penelitian', name: 'Penelitian', component: PenelitianPage },
    { path: '/galeri', name: 'Galeri', component: GaleriPage },
    { path: '/profil-kepala', name: 'ProfilKepala', component: ProfilKepalaPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router