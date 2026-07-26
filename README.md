# 📄 ATS CV Maker

**Buat CV ATS-Friendly profesional secara gratis, cepat, dan 100% offline-first.**

🔗 **Live Demo:** [cv-ats-maker.vercel.app](https://cv-ats-maker.vercel.app)

---

## ✨ Fitur Unggulan

| Fitur | Detail |
|---|---|
| 🎨 **5 Template ATS-Ready** | Classic, Modern, Minimal, Executive, Clean |
| 🖼️ **Kontrol Foto Profil** | Bentuk bulat/kotak, rasio 1:1 / 3x4 / 4x6 |
| 📞 **Tata Letak Kontak** | Horizontal, Vertikal, atau 2 Kolom |
| 🌐 **Bilingual** | Header CV dalam Bahasa Indonesia atau English |
| 🔤 **6 Pilihan Font ATS** | Arial, Calibri, Times New Roman, Georgia, Garamond, Inter |
| 🎨 **Warna Kustom** | Aksen & nama bebas diubah + color picker |
| 💾 **Simpan Lokal** | Auto-save & riwayat CV di localStorage browser |
| 📤 **Export PDF & Word** | Unduh sebagai `.pdf` atau `.docx` siap edit |
| 🛡️ **Privasi Terjaga** | Data tidak pernah dikirim ke server manapun |

---

## 🖼️ Preview Template

### Classic
Header dengan foto + info kontak horizontal, section dengan garis aksen berwarna.

### Modern
Layout dua kolom — sidebar berwarna (kontak & skill) + konten utama putih.

### Minimal
Garis tipis atas berwarna, typografi Georgia elegan, italic summary.

### Executive
Header penuh warna, layout dua kolom (main + aside) untuk tampilan senior.

### Clean ✨ *New*
Nama besar di tengah, kontak sejajar dengan separator `|`, section dengan garis hitam tegas — persis seperti standar CV internasional.

---

## 🚀 Cara Penggunaan

1. **Buka** aplikasi di browser
2. **Pilih template** dan sesuaikan warna aksen
3. **Isi data** di panel kiri (data pribadi, pengalaman, pendidikan, skill, dll.)
4. **Preview** langsung terlihat di kanan
5. **Export** ke PDF atau Word

> Semua data tersimpan otomatis di browser lokal — tidak ada akun, tidak ada server.

---

## 🛠️ Tech Stack

- **HTML5** — Struktur semantik
- **CSS3** — Vanilla CSS, animasi, dark-mode ready
- **JavaScript** — Vanilla JS, tanpa framework
- **[html2pdf.js](https://github.com/eKoopmans/html2pdf.js)** — Export PDF
- **[html-docx-js](https://github.com/evidenceprime/html-docx-js)** — Export Word

---

## 📁 Struktur Project

```
cv-ats-maker/
├── index.html      # Struktur UI & sidebar editor
├── app.js          # Logic: render template, export, state management
├── style.css       # Seluruh styling UI & template CV
├── qris.png        # QR donasi (opsional)
└── README.md
```

---

## 💡 Tips ATS

- Gunakan font **Arial** atau **Calibri** untuk kompatibilitas ATS terbaik
- Hindari tabel, kolom, atau grafik — pilih template **Classic** atau **Clean**
- Isi semua field dengan kata kunci yang relevan dengan lowongan
- Ukuran file PDF ideal: **< 2MB**

---

## ☕ Dukung Pengembangan

Kalau tool ini bermanfaat, traktir kopi via QRIS yang tersedia di aplikasi. Tidak ada paksaan — tapi sangat berarti! 🙏

---

## 📝 Lisensi

MIT License — bebas digunakan dan dimodifikasi.

---

<div align="center">
  Dibuat dengan ❤️ untuk para pencari kerja Indonesia
</div>
