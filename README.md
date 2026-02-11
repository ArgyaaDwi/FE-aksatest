# Frontend

Frontend aplikasi ini dibangun meggunakan pendekatan modern single-page application (SPA) dengan arsitektur terpisah dari backend (microservice-style architecture). Frontend dan backend berjalan secara independen dan berkomunikasi melalui REST API.

---

## 🛠 Tech Stack

- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🔀 React Router
- 📡 Axios
- ☁️ Deploy: Vercel

---

## 🧠 Arsitektur

Frontend ini berdiri sendiri (decoupled architecture) dan tidak memiliki ketergantungan langsung terhadap server backend dalam satu environment yang sama.

Struktur sistem:

Frontend (Vercel)
->
REST API
->
Backend (Shared Hosting)

Pendekatan ini memungkinkan:

- Scalability terpisah antara FE dan BE
- Deployment independen
- Maintenance lebih fleksibel
- Mendukung pola microservices

---

## ⚙️ Installation (Local Development)

```bash
git clone https://github.com/username/frontend-repo.git
cd frontend-repo
npm install
npm run dev
buat .env
```

## Pastikan file .env sudah berisi:

VITE_API_URL=https://aksa-test.argyadwi.site/api

## Environment

Development
Semua fitur berjalan normal saat backend dijalankan secara lokal. Fitur upload image, delete image, update data, dan authentication berfungsi 100%.

Production
Frontend dideploy menggunakan Vercel dan terhubung ke backend yang dihosting secara terpisah.

## ⚠️ Catatan Penting

Karena backend di-host pada shared hosting dengan keterbatasan konfigurasi:
Tidak mendukung php artisan storage:link
File upload tetap berjalan saat development
Namun pada production, symbolic link storage tidak tersedia
Hal ini menyebabkan:
Image tetap terupload ke folder storage, Tetapi tidak bisa diakses publik melalui /storage. Secara fungsional sistem tetap berjalan dengan baik untuk kebutuhan CRUD dan API communication.
