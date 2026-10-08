# Panduan Menjalankan Aplikasi Beach Camp Menggunakan Docker

Dokumen ini menjelaskan arsitektur containerization, struktur file, dan panduan lengkap langkah demi langkah untuk menjalankan aplikasi **Beach Camp** (Laravel 13 + React Inertia + Tailwind CSS) di dalam lingkungan Docker.

---

## 1. Arsitektur Docker

Aplikasi ini menggunakan arsitektur **Multi-Container Microservices** yang dikoordinasikan melalui **Docker Compose**, terdiri dari:

```
                  +----------------------------------------+
                  |         Client / Browser               |
                  |     http://localhost:8000              |
                  +-------------------+--------------------+
                                      |
                                      v
                        +-------------+------------+
                        |  Web Server: Nginx       |
                        |  (docker/nginx)          |
                        |  Port 8000 -> 80         |
                        +-------------+------------+
                                      |
                      Static Files    |   FastCGI (.php)
                      (public/build)  |   Pass to app:9000
                                      v
                        +-------------+------------+
                        |  App: PHP 8.3-FPM        |
                        |  (Laravel 13 + Inertia)  |
                        +-------------+------------+
                                      |
                                      | MySQL / SQLite
                                      v
                        +-------------+------------+
                        |  DB: MySQL 8.0           |
                        |  (Volume: dbdata)        |
                        |  Port 3306               |
                        +--------------------------+
```

### Komponen Utama:
1. **`app` (PHP 8.3-FPM Application Service)**:
   - Dibangun menggunakan **Multi-Stage Build**:
     - **Stage 1 (Node.js 20 Builder)**: Mengompilasi frontend React, Inertia, dan Tailwind CSS via Vite ke folder `public/build`.
     - **Stage 2 (PHP 8.3 FPM Alpine)**: Image PHP 8.3 yang ringan dan aman, dilengkapi ekstensi penting (`pdo_mysql`, `pdo_sqlite`, `sqlite3`, `zip`, `gd`, `intl`, `bcmath`, `opcache`, `pcntl`), Composer 2, serta Node.js & NPM untuk keperluan development di dalam container.
2. **`web` (Nginx Web Server)**:
   - Menggunakan image `nginx:alpine` yang sangat ringan.
   - Berfungsi sebagai reverse proxy dan web server utama: melayani file statis (`public/build`, css, js, gambar) secara langsung, dan meneruskan request dinamis PHP ke container `app:9000`.
   - Dilengkapi kompresi Gzip, security header (`X-Frame-Options`, `X-Content-Type-Options`), dan limit upload hingga 64MB.
3. **`db` (MySQL 8.0 Database)**:
   - Database server mandiri dengan volume persisten (`dbdata`) sehingga data reservasi, paket, dan akun admin tetap tersimpan meskipun container dihentikan atau dihapus.
   - Dilengkapi *Healthcheck* bawaan untuk memastikan PHP baru terkoneksi setelah database benar-benar siap menerima koneksi.
4. **`entrypoint.sh` (Automated Bootstrapper)**:
   - Otomatis membuat file `.env` jika belum ada.
   - Otomatis men-generate `APP_KEY`.
   - Mengatur hak akses (permissions) folder `storage` dan `bootstrap/cache`.
   - Menjalankan `php artisan storage:link`.
   - Menunggu hingga database MySQL siap (*ready check* via netcat).

---

## 2. Struktur File Docker yang Dibuat

Berikut adalah berkas-berkas konfigurasi Docker yang telah ditambahkan ke proyek:

```
Beach Camp/
├── Dockerfile                  # Multi-stage build (Node.js builder + PHP 8.3-FPM)
├── docker-compose.yml          # Konfigurasi orkestrasi service (app, web, db)
├── .dockerignore               # Mencegah file lokal yang tidak perlu masuk ke build context
├── .env.docker.example         # Template environment khusus container Docker
├── docker/
│   ├── entrypoint.sh           # Script startup otomatis saat container dijalankan
│   ├── nginx/
│   │   └── default.conf        # Konfigurasi virtual host Nginx untuk Laravel & Inertia
│   └── php/
│       └── local.ini           # Kustomisasi php.ini (upload_max_filesize, memory_limit, opcache)
└── Docs/
    ├── README.md               # Dokumentasi direktori Docs
    └── DOCKER-GUIDE.md         # Dokumen panduan ini
```

---

## 3. Prasyarat Sistem

Sebelum menjalankan aplikasi menggunakan Docker, pastikan komputer Anda telah terpasang:
- **Docker Desktop** (untuk Windows atau macOS) dengan fitur **WSL 2 Backend** aktif.
  - Unduh di: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
- Verifikasi instalasi di terminal / PowerShell:
  ```bash
  docker --version
  docker compose version
  ```

---

## 4. Panduan Langkah demi Langkah (Step-by-Step)

### Langkah 1: Siapkan File Environment (.env)
Salin file template `.env.docker.example` menjadi `.env`:
```bash
# PowerShell (Windows):
Copy-Item .env.docker.example .env

# Bash / Command Prompt:
cp .env.docker.example .env
```

> **Catatan:** File `.env.docker.example` sudah disesuaikan dengan konfigurasi Docker:
> - `DB_CONNECTION=mysql`
> - `DB_HOST=db`
> - `DB_PORT=3306`
> - `DB_DATABASE=beachcamp`
> - `DB_USERNAME=beachcamp`
> - `DB_PASSWORD=secret`

### Langkah 2: Build & Jalankan Container
Jalankan perintah berikut pada direktori root proyek:
```bash
docker compose up -d --build
```
*Flag `-d` menjalankan container di latar belakang (detached mode), dan `--build` memastikan image dikompilasi ulang sesuai kode terbaru.*

Periksa status container yang sedang berjalan:
```bash
docker compose ps
```
Pastikan ketiga container (`beachcamp_app`, `beachcamp_web`, `beachcamp_db`) berstatus `Up` / `healthy`.

### Langkah 3: Jalankan Database Migration & Seeder
Setelah container berjalan, lakukan inisialisasi tabel database dan data awal (paket camping, foto galeri, testimoni, dan akun admin default):
```bash
docker compose exec app php artisan migrate:fresh --seed
```

### Langkah 4: Akses Aplikasi di Browser
Buka browser Anda dan kunjungi:
- **Website Publik**: [http://localhost:8000](http://localhost:8000)
- **Halaman Login Admin**: [http://localhost:8000/login](http://localhost:8000/login)

**Kredensial Akun Admin Default:**
- **Email**: `admin@beachcamp.id`
- **Password**: `password`

---

## 5. Perintah-Perintah Operasional Harian

Berikut kumpulan perintah yang sering digunakan saat mengelola aplikasi di Docker:

### 1. Menjalankan Perintah Artisan
Gunakan awalan `docker compose exec app` untuk menjalankan perintah di dalam container Laravel:
```bash
# Cek daftar route
docker compose exec app php artisan route:list

# Menjalankan database migration
docker compose exec app php artisan migrate

# Menjalankan tinker
docker compose exec app php artisan tinker

# Membersihkan cache aplikasi
docker compose exec app php artisan optimize:clear
```

### 2. Menjalankan Automated Test
```bash
docker compose exec app php artisan test --compact
```

### 3. Kompilasi Ulang Frontend (Vite)
Jika Anda melakukan perubahan pada file React/JSX atau Tailwind:
```bash
docker compose exec app npm run build
```

### 4. Melihat Log Container (Troubleshooting)
Untuk melihat log realtime dari seluruh service atau service tertentu:
```bash
# Log seluruh container
docker compose logs -f

# Hanya log Laravel / PHP
docker compose logs -f app

# Hanya log Web Server Nginx
docker compose logs -f web

# Hanya log Database MySQL
docker compose logs -f db
```

### 5. Masuk ke Terminal Container (Interactive Shell)
```bash
# Terminal container aplikasi (PHP)
docker compose exec app sh

# Terminal container database (MySQL client)
docker compose exec db mysql -u beachcamp -psecret beachcamp
```

### 6. Menghentikan Container
```bash
# Menghentikan container tanpa menghapus data database
docker compose down

# Menghentikan container dan menghapus volume database (Reset total)
docker compose down -v
```

---

## 6. Pilihan Opsi Database: MySQL vs SQLite

Aplikasi ini sangat fleksibel dan mendukung dua jenis database di dalam Docker:

### Opsi A: Menggunakan MySQL (Bawaan Docker Compose)
Konfigurasi di `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=beachcamp
DB_USERNAME=beachcamp
DB_PASSWORD=secret
```

### Opsi B: Menggunakan SQLite (Lebih Ringan, Tanpa Container DB)
Jika Anda ingin menghemat resource RAM dan hanya ingin menjalankan container `app` dan `web`:
1. Ubah file `.env`:
   ```env
   DB_CONNECTION=sqlite
   DB_DATABASE=/var/www/html/database/database.sqlite
   ```
2. Jalankan migrasi:
   ```bash
   docker compose exec app php artisan migrate --seed
   ```
3. Script `docker/entrypoint.sh` akan secara otomatis membuat berkas `database.sqlite` dan mengatur hak aksesnya.

---

## 7. Tips Mengatasi Kendala Umum (Troubleshooting)

1. **Port 8000 atau 3306 Bentrok (Port Already in Use)**:
   - Jika port 8000 sedang dipakai aplikasi lain di komputer lokal Anda, buka file `docker-compose.yml`, lalu ubah port Nginx:
     ```yaml
     ports:
       - "8080:80"  # Ubah dari 8000 ke 8080
     ```
   - Aplikasi dapat diakses di `http://localhost:8080`.

2. **Perubahan Kode Tidak Langsung Muncul**:
   - Direktori root proyek telah di-mount secara realtime (`.:/var/www/html`), sehingga perubahan PHP langsung aktif.
   - Jika perubahan terdapat pada React/JSX, jalankan `docker compose exec app npm run build` untuk mengompilasi ulang bundle Vite.

3. **Line Endings Script Bash di Windows**:
   - Jika `docker/entrypoint.sh` memunculkan pesan error seperti `/usr/local/bin/entrypoint.sh: line 2: $'\r': command not found`, pastikan line endings file tersebut berformat **LF** (bukan CRLF). Hal ini sudah diproteksi pada repositori ini.

---
*Dokumen ini dibuat otomatis sebagai panduan resmi setup containerization Beach Camp.*
