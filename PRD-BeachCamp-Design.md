# PRD — Design (UI/UX) Website Beach Camp
**Product Requirements Document — Desain Visual & Antarmuka**

| Field | Detail |
|---|---|
| Nama Produk | Website Beach Camp |
| Dokumen Terkait | PRD-BeachCamp-Website.md (fungsional & teknikal) |
| Versi Dokumen | 1.0 |
| Tanggal | 16 September 2026 |

---

## 1. Arahan Desain (Design Direction)

Beach Camp adalah tempat wisata camping di pantai, sehingga desain harus terasa **hangat, natural, dan mengundang** — mencerminkan suasana pantai, matahari terbenam, dan pasir. Nada visual: santai, ramah keluarga, sedikit petualangan (adventurous), namun tetap terasa terpercaya dan profesional agar meyakinkan calon tamu untuk melakukan booking.

Kata kunci mood: *warm, sunny, coastal, cozy, adventurous, trustworthy.*

## 2. Palet Warna

Warna dasar yang ditentukan:

| Warna | Hex | Kesan |
|---|---|---|
| Primary | `#E37434` | Oranye terracotta — melambangkan matahari terbenam/api unggun, hangat & energik |
| Secondary | `#F6F3C2` | Krem kekuningan pucat — melambangkan pasir pantai, lembut & natural |

### 2.1 Perluasan Palet (Turunan)

Karena dua warna dasar tersebut sama-sama bernada terang/medium, perlu warna pendukung untuk teks, latar, dan status agar kontras tetap terjaga dan mudah dibaca:

| Peran | Warna yang disarankan | Hex (contoh) |
|---|---|---|
| Primary | Terracotta Orange | `#E37434` |
| Primary Dark (hover/active) | Burnt Orange | `#B85723` |
| Secondary | Sandy Cream | `#F6F3C2` |
| Background | Off-white hangat | `#FFFBF2` |
| Teks Utama | Coklat gelap (bukan hitam pekat, agar tetap hangat) | `#2B2116` |
| Teks Sekunder | Coklat abu-abu | `#6B5D4F` |
| Aksen/Highlight | Teal laut (kontras dengan oranye) | `#1F6E63` *(opsional, untuk elemen seperti badge "Tersedia")* |
| Success | Hijau natural | `#4C7A3D` |
| Warning | Kuning tua | `#C98A1B` |
| Error | Merah bata | `#B3402C` |

> **Catatan kontras**: Hindari menaruh teks putih/terang di atas `#F6F3C2` (krem) karena kontrasnya rendah. Gunakan teks `#2B2116` di atas latar krem, dan teks putih (`#FFFFFF`) hanya di atas warna primary (`#E37434`) atau primary dark yang cukup gelap.

## 3. Tipografi

| Elemen | Rekomendasi Font | Karakter |
|---|---|---|
| Heading/Judul | Font display dengan sedikit karakter organik/hangat (contoh: *Fraunces*, *Poppins Bold*, atau *Recoleta*) | Menonjol, ramah, tidak terlalu formal |
| Body Text | Font sans-serif yang mudah dibaca (contoh: *Inter*, *Nunito Sans*) | Bersih, mudah dibaca di semua ukuran layar |
| Skala Ukuran (contoh) | H1: 40–48px, H2: 28–32px, H3: 20–24px, Body: 16px, Caption: 13–14px | Sesuaikan untuk responsive (skala turun di mobile) |

## 4. Prinsip Layout

- **Mobile-first**: mayoritas calon tamu kemungkinan besar mengakses dari HP.
- Banyak gunakan **foto/video full-width** untuk menonjolkan keindahan lokasi (visual-driven, karena bisnis ini menjual "experience").
- Gunakan **rounded corners** lembut pada card & tombol untuk kesan santai (bukan tajam/kaku).
- Beri **white space** cukup agar halaman tidak terasa sesak, terutama di sekitar CTA booking.
- CTA utama ("Booking Sekarang", "Lihat Paket") harus selalu kontras dan mudah ditemukan di setiap halaman (sticky button di mobile bisa dipertimbangkan).

## 5. Struktur Halaman & Wireframe Konsep

### 5.1 Halaman Beranda (Home)
1. Navbar (logo, menu: Beranda, Paket, Galeri, Tentang, Kontak, tombol "Booking").
2. Hero section: foto/video pantai + tagline + CTA utama.
3. Section "Kenapa Pilih Beach Camp" (ikon + poin fasilitas unggulan).
4. Section highlight paket populer (card 3 paket dengan harga mulai dari).
5. Section galeri singkat (grid foto, link ke halaman galeri lengkap).
6. Section testimoni (carousel).
7. Section CTA booking (banner ajakan booking dengan latar warna primary).
8. Footer (kontak, media sosial, peta kecil, copyright).

### 5.2 Halaman Paket & Harga
- Grid/list card paket, masing-masing menampilkan: nama paket, foto, kapasitas, fasilitas termasuk, harga, tombol "Pilih Paket".
- Filter sederhana (misal: berdasarkan jumlah tamu atau tipe tenda).

### 5.3 Halaman Galeri
- Grid foto/video dengan lightbox (klik untuk perbesar).
- Kategori: Lokasi, Fasilitas, Aktivitas Tamu, Malam/Api Unggun.

### 5.4 Halaman Booking
- Form step-by-step (pilih paket → pilih tanggal → isi data tamu → ringkasan → konfirmasi).
- Kalender visual untuk menunjukkan tanggal tersedia/tidak tersedia.
- Ringkasan biaya jelas sebelum konfirmasi akhir.

### 5.5 Halaman Tentang & Kontak
- Cerita singkat + foto pemilik/tim (opsional, menambah kepercayaan).
- Peta lokasi, nomor WA (tombol klik-untuk-chat), jam operasional.

## 6. Komponen UI Utama

| Komponen | Catatan Desain |
|---|---|
| Navbar | Transparan di atas hero, berubah solid (warna secondary/off-white) saat scroll |
| Tombol Primer | Latar `#E37434`, teks putih, rounded, efek hover ke `#B85723` |
| Tombol Sekunder | Outline warna primary di atas latar terang |
| Card Paket | Shadow lembut, rounded corner, foto di atas + info di bawah |
| Badge Status | Misal "Tersedia" (hijau/teal), "Hampir Penuh" (kuning), "Penuh" (merah bata) |
| Kalender Booking | Tanggal tersedia ditandai warna secondary, tanggal penuh abu-abu/disabled |
| Footer | Latar warna gelap turunan primary atau coklat tua, teks krem |

## 7. Gaya Fotografi & Ilustrasi

- Gunakan foto **asli lokasi** (bukan stok generik) sebisa mungkin — matahari terbenam, tenda, pantai, aktivitas tamu.
- Tone warna foto: hangat, natural, hindari filter yang terlalu pucat/dingin agar selaras dengan palet warna.
- Ikon menggunakan gaya **outline/line-art sederhana** agar terasa ringan dan modern, bukan ikon 3D yang berat.

## 8. Responsif & Aksesibilitas

- Breakpoint disarankan: Mobile (<768px), Tablet (768–1024px), Desktop (>1024px).
- Pastikan rasio kontras teks-terhadap-latar memenuhi standar keterbacaan (terutama teks di atas warna secondary/krem).
- Semua gambar wajib memiliki alt text deskriptif (foto tenda, foto pantai, dsb).
- Form booking harus bisa dioperasikan penuh via keyboard.

## 9. Referensi Dokumen Terkait

- Kebutuhan fungsional & teknikal: lihat dokumen **PRD-BeachCamp-Website.md**
