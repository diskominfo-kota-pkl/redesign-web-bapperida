export const navigation = [
  { name: 'Beranda', path: '/' },
  { name: 'Profil', path: '/profil', children: [
    { name: 'Visi Misi', path: '/profil/visi-misi' },
    { name: 'Sejarah', path: '/profil/sejarah' },
    { name: 'Struktur Organisasi', path: '/profil/struktur' }
  ]},
  { name: 'Program', path: '/program', children: [
    { name: 'Renstra', path: '/program/renstra' },
    { name: 'RKPD', path: '/program/rkpd' },
    { name: 'RPJMD', path: '/program/rpjmd' }
  ]},
  { name: 'Berita', path: '/berita' },
  { name: 'Galeri', path: '/galeri' },
  { name: 'Kontak', path: '/kontak' }
]

export const socialLinks = [
  { name: 'Facebook', url: 'https://facebook.com/bappeda', icon: 'facebook' },
  { name: 'Twitter', url: 'https://twitter.com/bappeda', icon: 'twitter' },
  { name: 'Instagram', url: 'https://instagram.com/bappeda', icon: 'instagram' },
  { name: 'Youtube', url: 'https://youtube.com/bappeda', icon: 'youtube' }
]