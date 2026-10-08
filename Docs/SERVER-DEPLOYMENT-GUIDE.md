# Panduan Setup & Deployment Server (VPS) Menggunakan Docker

Panduan ini ditujukan bagi Anda yang telah memiliki server (seperti VPS Ubuntu 22.04/24.04 LTS, Debian, atau cloud provider seperti DigitalOcean, Linode, AWS EC2, Contabo, dsb) dan telah menginstal Docker & Docker Compose.

---

## 1. Persiapan Awal di Server

Pastikan Anda telah login ke server via SSH:
```bash
ssh user@IP_SERVER_ANDA
```

Pastikan Docker & Docker Compose sudah aktif dan berjalan:
```bash
docker --version
docker compose version
```

Pastikan firewall mengizinkan port web dan SSH:
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 2. Langkah-Langkah Setup Aplikasi di Server

### Langkah 1: Pindahkan / Clone Kode ke Server

Anda dapat melakukan `git clone` atau meng-upload file proyek ke direktori server (misal `/var/www/beachcamp`):

```bash
# Buat direktori (jika belum ada)
sudo mkdir -p /var/www/beachcamp
sudo chown -R $USER:$USER /var/www/beachcamp

# Clone repositori (ganti dengan URL repo Git Anda)
git clone https://github.com/username/beachcamp.git /var/www/beachcamp

# Masuk ke direktori proyek
cd /var/www/beachcamp
```

---

### Langkah 2: Konfigurasi File Environment Produksi (`.env`)

Salin berkas template environment:
```bash
cp .env.docker.example .env
```

Buka dan sesuaikan file `.env` menggunakan editor teks (misal `nano`):
```bash
nano .env
```

**Konfigurasi penting untuk Server Production:**
```env
APP_NAME="Beach Camp"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domain-anda.com    # Atau http://IP_SERVER jika belum ada domain

# Port Nginx Docker:
# Gunakan 80 jika Nginx Docker langsung menerima traffic internet.
# Gunakan 8000 jika Anda memasang Nginx Host + Certbot SSL di server.
APP_PORT=80

# Kredensial Database MySQL (Ganti dengan password kuat Anda):
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=beachcamp
DB_USERNAME=beachcamp
DB_PASSWORD=PasswordDatabaseSangatAman123!
DB_ROOT_PASSWORD=RootPasswordDatabaseSangatAman123!

# Nomor WhatsApp Admin & Kontak (Muncul di website):
MAIL_FROM_ADDRESS="halo@domain-anda.com"
```
*Simpan perubahan dengan menekan `Ctrl + O`, lalu `Enter`, lalu keluar dengan `Ctrl + X`.*

---

### Langkah 3: Build & Jalankan Container

Jalankan perintah ini untuk membangun image dan mengaktifkan service di latar belakang:
```bash
docker compose up -d --build
```

Periksa status container:
```bash
docker compose ps
```
Pastikan ketiga container berstatus running (`Up` / `healthy`):
- `beachcamp_app`
- `beachcamp_web`
- `beachcamp_db`

---

### Langkah 4: Migrasi Database & Seeder Data Awal

Setelah container aktif, jalankan migrasi database dan seed data awal:
```bash
docker compose exec app php artisan migrate --force --seed
```

> Kredensial Admin Bawaan:
> - **URL Login**: `http://IP_SERVER/login` atau `https://domain-anda.com/login`
> - **Email**: `admin@beachcamp.id`
> - **Password**: `password` *(Harap segera ganti password di profil admin)*

---

### Langkah 5: Optimasi Cache Produksi Laravel

Jalankan optimasi performa Laravel (meng-cache config, route, dan view):
```bash
docker compose exec app php artisan optimize
docker compose exec app php artisan storage:link
```

---

## 3. Menghubungkan Domain & Setup SSL Gratis (HTTPS)

Untuk mengamankan website dengan HTTPS (`https://domain-anda.com`), ada dua metode yang sangat disarankan:

### METODE A (Paling Populer & Aman): Nginx Reverse Proxy di Host Server

Pada metode ini, Nginx di server host menerima traffic 80 & 443 dengan SSL Certbot, lalu mem-proxy request ke container Docker yang berjalan di port `8000`.

1. Di file `.env`, ubah port Docker menjadi 8000:
   ```env
   APP_PORT=8000
   ```
   Lalu restart container:
   ```bash
   docker compose up -d
   ```

2. Pasang Nginx dan Certbot di server Ubuntu:
   ```bash
   sudo apt update
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```

3. Buat konfigurasi Nginx host:
   ```bash
   sudo nano /etc/nginx/sites-available/beachcamp
   ```
   Isi dengan konfigurasi berikut:
   ```nginx
   server {
       server_name domain-anda.com www.domain-anda.com;

       client_max_body_size 64M;

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. Aktifkan konfigurasi dan periksa:
   ```bash
   sudo ln -s /etc/nginx/sites-available/beachcamp /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. Dapatkan sertifikat SSL otomatis dari Let's Encrypt:
   ```bash
   sudo certbot --nginx -d domain-anda.com -d www.domain-anda.com
   ```
   Certbot akan otomatis memperbarui SSL setiap 90 hari!

---

### METODE B: Menggunakan Cloudflare (Tanpa Setup Nginx di Host)

1. Arahkan DNS domain Anda ke Cloudflare.
2. Buat **DNS A Record** mengarah ke IP Server VPS Anda dengan status **Proxied (Awan Oranye)**.
3. Di dashboard Cloudflare -> tab **SSL/TLS**, pilih mode **Flexible** atau **Full**.
4. Biarkan `APP_PORT=80` di `.env` dan jalankan `docker compose up -d`. Website Anda otomatis mendapatkan SSL gratis dari Cloudflare.

---

## 4. Menjadwalkan Task Scheduler & Background Jobs

Laravel memiliki scheduled tasks (seperti pembersihan cache, cek reservasi, dsb). Agar berjalan otomatis di server, tambahkan ke crontab server host:

```bash
crontab -e
```

Tambahkan baris berikut di baris paling bawah:
```cron
* * * * * cd /var/www/beachcamp && docker compose exec -T app php artisan schedule:run >> /dev/null 2>&1
```

---

## 5. Prosedur Update Kode di Masa Depan (Deployment Update)

Setiap kali Anda meng-update fitur atau kode aplikasi:

```bash
cd /var/www/beachcamp

# 1. Ambil kode terbaru dari Git
git pull origin main

# 2. Rebuild container jika ada penambahan package/dependensi baru
docker compose up -d --build

# 3. Jalankan migrasi database jika ada tabel baru
docker compose exec app php artisan migrate --force

# 4. Refresh cache produksi
docker compose exec app php artisan optimize
```

---

## 6. Backup Database MySQL Berkala

Untuk membuat backup database sewaktu-waktu:
```bash
docker compose exec -T db mysqldump -u beachcamp -pPasswordDatabaseSangatAman123! beachcamp > backup_$(date +%F).sql
```
Untuk merestore database dari file backup:
```bash
cat backup_nama_file.sql | docker compose exec -T db mysql -u beachcamp -pPasswordDatabaseSangatAman123! beachcamp
```

---

## 7. Troubleshooting Masalah Umum di Server

### Error: `failed to bind host port 0.0.0.0:80/tcp: address already in use`
Pesan ini berarti **port 80 di server host sudah dipakai oleh proses/layanan lain** sebelum Docker mencoba menggunakannya.

#### 1. Cara Cek Siapa yang Memakai Port 80:
```bash
sudo ss -tulpn | grep :80
# atau
sudo lsof -i :80
```
Biasanya pelakunya adalah:
- Service **Apache2** (`apache2`) yang otomatis berjalan saat instalasi OS Ubuntu.
- Service **Nginx** bawaan OS (`nginx`) yang sudah berjalan di background.
- Container Docker lain yang belum dimatikan.

#### 2. Solusi A: Matikan Web Server Bawaan OS (Jika Ingin Port 80 Murni untuk Docker)
Jika Anda tidak memerlukan Apache2 atau Nginx bawaan host:
```bash
# Matikan Apache2:
sudo systemctl stop apache2
sudo systemctl disable apache2

# ATAU matikan Nginx bawaan host:
sudo systemctl stop nginx
sudo systemctl disable nginx

# Lalu jalankan kembali docker:
docker compose up -d
```

#### 3. Solusi B (Direkomendasikan): Alihkan Port Docker ke 8000
Jika server host memang menggunakan Nginx untuk mengelola SSL Let's Encrypt / beberapa domain:
1. Di file `.env`, ubah port Docker menjadi 8000:
   ```env
   APP_PORT=8000
   ```
2. Jalankan kembali Docker:
   ```bash
   docker compose up -d
   ```
3. Nginx bawaan host akan menerima port 80 & 443 lalu meneruskan ke `http://127.0.0.1:8000` (lihat Bagian 3: METODE A).

### Error: `exec /usr/local/bin/entrypoint.sh: exec format error`
Error ini terjadi ketika kernel Linux gagal mengeksekusi script bash karena format karakter Windows (CRLF atau UTF-8 BOM):
- **Penyebab**: Script bash disimpan dengan format baris Windows (`\r\n`) atau karakter tersembunyi UTF-8 BOM (`0xEF 0xBB 0xBF`).
- **Solusi**: Di file `Dockerfile`, baris entrypoint telah dimutakhirkan menjadi:
  ```dockerfile
  RUN tr -d '\r' < /usr/local/bin/entrypoint.sh > /usr/local/bin/entrypoint_clean.sh \
      && mv /usr/local/bin/entrypoint_clean.sh /usr/local/bin/entrypoint.sh \
      && chmod +x /usr/local/bin/entrypoint.sh
  ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]
  ```
### Error: `SQLSTATE[HY000] [1045] Access denied for user 'beachcamp'`
Error ini terjadi ketika password yang dikirim oleh Laravel di `.env` **berbeda** dengan password yang diinisialisasi oleh container MySQL:
- **Penyebab Utama**:
  1. Tanda kutip (`"`) di sekitar password di file `.env` (misal `DB_PASSWORD="secret"`). Docker Compose tidak membuang tanda kutip saat mengoper ke MySQL, sementara Laravel Dotenv membuang tanda kutipnya, sehingga terjadi ketidaksesuaian password.
  2. Karakter khusus (seperti `!`, `$`, `#`) di dalam password yang terpotong/berubah saat interpolasi variabel di shell.
- **Solusi 1 (Paling Cepat - 1 Baris Perintah)**:
  Sinkronkan password user `beachcamp` secara langsung di dalam container database MySQL:
  ```bash
  # Ganti 'PasswordBaruAnda' dengan password yang sama persis di file .env Anda:
  docker compose exec db mysql -u root -prootsecret -e "ALTER USER 'beachcamp'@'%' IDENTIFIED BY 'PasswordBaruAnda'; FLUSH PRIVILEGES;"
  ```
  Lalu jalankan migrasi:
  ```bash
  docker compose exec app php artisan migrate --force --seed
  ```
- **Solusi 2 (Reset Ulang Volume Database Bersih)**:
  1. Di `.env`, pastikan password alfanumerik tanpa tanda kutip:
     ```env
     DB_DATABASE=beachcamp
     DB_USERNAME=beachcamp
     DB_PASSWORD=BeachCampSecure2026
     DB_ROOT_PASSWORD=BeachCampRoot2026
     ```
  2. Reset volume dan nyalakan ulang:
     ```bash
     docker compose down -v
     docker compose up -d
     docker compose exec app php artisan migrate --force --seed
     ```

---
*Dokumentasi ini tersimpan di `Docs/SERVER-DEPLOYMENT-GUIDE.md` pada repositori Beach Camp.*
