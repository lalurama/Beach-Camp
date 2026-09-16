# PRD — Website Beach Camp
**Product Requirements Document (Fungsional & Teknikal)**

| Field | Detail |
|---|---|
| Nama Produk | Website Beach Camp |
| Jenis Bisnis | Jasa penyewaan tempat camping di area pantai |
| Tech Stack | Laravel 13 (backend/API) + React (frontend via Inertia) |
| Versi Dokumen | 1.0 |
| Tanggal | 16 September 2026 |

---

## 1. Latar Belakang

Beach Camp adalah tempat wisata yang menyewakan lokasi camping di area pantai kepada tamu/wisatawan. Saat ini bisnis belum memiliki kehadiran digital yang memadai, sehingga calon tamu kesulitan mendapatkan informasi paket, harga, ketersediaan tempat, dan cara melakukan reservasi. Website ini dibangun untuk menjadi kanal informasi dan reservasi utama bagi bisnis Beach Camp.

## 2. Tujuan Produk

1. Memberikan informasi lengkap mengenai lokasi, fasilitas, dan paket camping.
2. Memungkinkan calon tamu melakukan reservasi/booking secara online.
3. Meningkatkan kepercayaan calon tamu melalui galeri foto/video, testimoni, dan informasi yang transparan.
4. Memudahkan pemilik bisnis (admin) mengelola konten, harga, dan reservasi tanpa perlu keahlian teknis.
5. Meningkatkan visibilitas bisnis di mesin pencari (SEO).

## 3. Target Pengguna

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| Calon Tamu (Wisatawan) | Individu/kelompok/keluarga yang mencari lokasi camping pantai | Info paket & harga, foto lokasi, cara booking, kontak cepat |
| Tamu Lama | Pernah camping di Beach Camp | Booking ulang, lihat promo, memberi ulasan |
| Admin/Pemilik (Tante) | Pengelola bisnis | Kelola konten, kelola harga & paket, kelola reservasi, lihat laporan sederhana |

## 4. Lingkup (Scope)

### 4.1 Fitur untuk Pengunjung (Publik)

1. **Landing Page / Beranda**
   - Hero section dengan foto/video utama, tagline, dan CTA "Booking Sekarang".
   - Ringkasan fasilitas unggulan.
   - Highlight paket populer.
2. **Halaman Tentang Kami**
   - Cerita singkat mengenai Beach Camp, lokasi, dan keunikan tempat.
3. **Halaman Paket & Harga**
   - Daftar paket camping (tenda pribadi, family package, group package, dsb).
   - Rincian harga, fasilitas yang didapat, dan kapasitas.
4. **Galeri Foto & Video**
   - Kumpulan foto/video lokasi, fasilitas, dan aktivitas tamu.
5. **Booking / Reservasi Online**
   - Form pemilihan tanggal, jumlah tamu, dan paket.
   - Cek ketersediaan tanggal (kalender).
   - Ringkasan pesanan sebelum konfirmasi.
   - Konfirmasi via email/WhatsApp setelah booking dibuat.
6. **Testimoni & Ulasan**
   - Menampilkan ulasan tamu sebelumnya.
7. **Lokasi & Kontak**
   - Peta lokasi (Google Maps embed).
   - Nomor WhatsApp, email, dan media sosial.
   - Petunjuk arah menuju lokasi.
8. **FAQ**
   - Pertanyaan umum seputar aturan camping, apa yang perlu dibawa, kebijakan pembatalan, dsb.

### 4.2 Fitur untuk Admin (Dashboard)

1. **Login Admin** (autentikasi aman).
2. **Kelola Konten**: edit teks halaman, upload/hapus foto & video galeri.
3. **Kelola Paket & Harga**: tambah/edit/hapus paket, atur harga musiman (high season/low season).
4. **Kelola Reservasi**: lihat daftar booking, ubah status (pending/confirmed/cancelled), lihat detail tamu.
5. **Kelola Ketersediaan**: blokir tanggal tertentu (misal tempat penuh atau maintenance).
6. **Kelola Testimoni**: approve/reject ulasan yang masuk sebelum ditampilkan ke publik.
7. **Laporan Sederhana**: jumlah booking per bulan, pendapatan estimasi (jika ada modul pembayaran).

### 4.3 Fitur Opsional (Fase Berikutnya / Nice to Have)

- Integrasi payment gateway (Midtrans/Xendit) untuk pembayaran DP/booking online.
- Integrasi WhatsApp Business API untuk notifikasi otomatis booking.
- Multi-bahasa (Indonesia & Inggris) untuk menjangkau turis asing.
- Blog/artikel tips camping untuk kebutuhan SEO & konten marketing.
- Program member/loyalty untuk tamu yang sering booking.

## 5. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
|---|---|
| Performa | Waktu load halaman < 3 detik pada koneksi 4G |
| Responsif | Mobile-first, tampil baik di HP, tablet, dan desktop |
| SEO | Meta tag, sitemap, structured data untuk halaman paket & lokasi |
| Keamanan | Enkripsi password, proteksi CSRF/XSS (bawaan Laravel), rate limiting pada form booking |
| Skalabilitas | Arsitektur API (Laravel) terpisah dari frontend (React) agar mudah dikembangkan |
| Aksesibilitas | Kontras warna cukup, alt text pada gambar, navigasi keyboard-friendly |
| Backup Data | Backup database booking & konten secara berkala |

## 6. Arsitektur Teknologi

- **Backend**: Laravel 13 — menangani API, autentikasi, manajemen data (paket, booking, konten, user admin).
- **Frontend**: React — dikonsumsi via Inertia.js agar terintegrasi mulus dengan Laravel (SPA-like experience tanpa perlu REST API terpisah penuh).
- **Database**: MySQL/PostgreSQL (menyesuaikan environment hosting).
- **Storage**: Local storage atau cloud storage (S3-compatible) untuk foto/video galeri.
- **Deployment**: Disesuaikan dengan hosting yang dipilih (VPS, shared hosting berbasis Laravel, atau cloud seperti DigitalOcean/AWS).

## 7. AI Skills yang Digunakan

Skill-skill berikut digunakan untuk membantu proses pengembangan:

1. `npx skills add asyrafhussin/agent-skills --skill laravel-inertia-react`
   Digunakan sebagai panduan best practice pengembangan aplikasi Laravel + Inertia + React (struktur project, konvensi kode, integrasi frontend-backend).
2. `npx skills add dmmulroy/anti-slop --skill install-anti-slop`
   Digunakan untuk menjaga kualitas kode agar tetap bersih, konsisten, dan menghindari kode "asal jadi" (anti pola buruk/slop code).
3. `npx skills add coreyhaines31/marketingskills --skill copywriting`
   Digunakan untuk membantu penulisan copy/teks marketing di landing page, deskripsi paket, dan CTA agar lebih persuasif.

### Saran Skill Tambahan yang Cocok untuk Bisnis Ini

| Skill (contoh) | Kegunaan |
|---|---|
| SEO optimization skill | Membantu optimasi meta tag, struktur URL, dan konten agar mudah ditemukan di Google (penting untuk bisnis wisata lokal) |
| Payment gateway integration (Midtrans/Xendit) | Mempermudah implementasi pembayaran DP/booking online sesuai kebutuhan pasar Indonesia |
| WhatsApp Business API integration | Untuk notifikasi otomatis konfirmasi booking ke tamu & admin, karena WhatsApp adalah kanal komunikasi utama di Indonesia |
| Image/media optimization skill | Mengoptimalkan ukuran foto & video galeri agar loading tetap cepat tanpa mengurangi kualitas visual |
| Laravel testing (Pest/PHPUnit) skill | Memastikan fitur booking & pembayaran teruji dan minim bug sebelum rilis |
| Filament admin panel skill | Mempercepat pembuatan dashboard admin Laravel yang rapi tanpa membangun UI admin dari nol |
| Accessibility (a11y) skill | Memastikan website nyaman diakses oleh berbagai jenis pengguna, termasuk yang menggunakan pembaca layar |
| Analytics integration (Google Analytics/Meta Pixel) skill | Membantu memantau perilaku pengunjung untuk kebutuhan marketing lanjutan |
| Localization/i18n skill | Jika ke depan target juga turis asing, mempermudah menambahkan versi bahasa Inggris |

## 8. Metrik Keberhasilan (KPI)

- Jumlah booking online per bulan.
- Tingkat konversi pengunjung → booking.
- Waktu rata-rata pengunjung di halaman paket & booking.
- Jumlah ulasan/testimoni baru per bulan.
- Peringkat kata kunci terkait "camping pantai [nama lokasi]" di mesin pencari.

## 9. Di Luar Lingkup (Out of Scope) — Fase 1

- Aplikasi mobile native (Android/iOS).
- Sistem multi-cabang/multi-lokasi.
- Program afiliasi/reseller.

## 10. Referensi Dokumen Terkait

- Desain UI/UX & panduan visual: lihat dokumen **PRD-BeachCamp-Design.md**
