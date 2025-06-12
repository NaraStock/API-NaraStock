
# 📈 NaraStock API - Capstone Project DBS Foundation

**NaraStock API** adalah backend RESTful API yang dibangun menggunakan **Node.js** dan **Hapi.js**, sebagai bagian dari proyek capstone Coding Camp DBS Foundation. API ini menyediakan berbagai fitur seperti artikel prediksi saham, komentar, bookmark, autentikasi, dan sistem notifikasi.

---

## 🚀 Prasyarat

- Node.js (versi terbaru direkomendasikan)
- Database: MySQL
- Postman (opsional, untuk testing API)

---

## 🛠️ Fitur Utama

- ✅ **Autentikasi Admin & User (JWT)**
- 📝 **CRUD Artikel**
- 💬 **Komentar Artikel**
- 📌 **Bookmark Artikel**
- 🔔 **Sistem Notifikasi**
- 📬 **Form Kontak (Feedback)**
- 📰 **Fetch Berita Otomatis**
- 🧪 **Dokumentasi API via Postman**

---

## 🗂️ Struktur Folder

```bash
naraDev-backend/
├── config/
│   └── db.js
├── handlers/
│   ├── admin-authHandler.js
│   ├── articleHandler.js
│   ├── bookmarksHandler.js
│   └── ...
├── middlewares/
│   ├── authStrategy.js
│   └── verifyRole.js
├── models/
│   ├── admins.js
│   ├── articles.js
│   └── ...
├── routes/
│   └── *.js
├── .env
├── server.js
├── package.json
└── TEST NARA.postman_collection.json
```

---

## 📌 Endpoint API (Ringkasan)

Berikut beberapa endpoint utama dari Postman Collection:

### 🔐 Auth
- `POST /auth/register/user` – Register user
- `POST /auth/login/user` – Login user
- `POST /auth/register/admin` – Register admin
- `POST /auth/login/admin` – Login admin

### 📄 Artikel
- `POST /articles` – Tambah artikel
- `GET /articles` – Lihat semua artikel
- `GET /articles/:id` – Detail artikel
- `POST /articles/:id` – Edit artikel
- `DELETE /articles/:id` – Hapus artikel

### 💬 Komentar
- `GET /articles/:id/comments` – Ambil komentar
- `POST /articles/:id/comments` – Tambah komentar

### 📌 Bookmark
- `POST /bookmarks` – Tambah bookmark
- `GET /bookmarks` – Lihat bookmark

### 📞 Kontak
- `POST /contacts` – Kirim pesan kontak
- `GET /contacts` – Lihat pesan masuk (admin)

### 🔔 Notifikasi
- `POST /notifications/broadcast` – Kirim notifikasi ke semua user

---

## ▶️ Cara Menjalankan Project

### 1. Clone Repositori
```bash
git clone https://github.com/NaraStock/API-NaraStock.git
cd naraDev-backend
```

### 2. Install Dependency
```bash
npm install
```

### 3. Konfigurasi `.env`
Buat file `.env` dan isi dengan variabel seperti:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=nara_stock_db
JWT_SECRET=your_jwt_secret
NOTIF_API_KEY=your_api_key
```

### 4. Jalankan Server
```bash
# Untuk development
npm run start:dev

# Untuk production
npm run start
```

---

## 🧪 Testing API

Import file berikut ke Postman:
```
TEST NARA.postman_collection.json
```

Lakukan pengujian endpoint sesuai dengan kebutuhan frontend.

---

## 🛠 Teknologi yang Digunakan

- Node.js
- Hapi.js
- MySQL
- JWT (JSON Web Token)
- dotenv
- Nodemon
- Postman

---

## 👨‍💻 Kontributor

- Reyhan Dwi Wira Allofadieka
- Amanda Priscilia ([@GitHub](https://github.com/orgs/NaraStock/people/AmandaPriscilia))

---

## 📄 Lisensi

Open-source – bebas digunakan untuk pengembangan dan pembelajaran.
