# Desktop CNC Router 3-Axis — 3D CAD Interactive Showcase

[![Autodesk Inventor](https://img.shields.io/badge/CAD-Autodesk%20Inventor%20Professional-blue.svg)](https://www.autodesk.com/products/inventor)
[![Three.js](https://img.shields.io/badge/3D%20Engine-Three.js%20r128-black.svg)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen.svg)](https://pages.github.com/)

Aplikasi web interaktif 3D CAD untuk menginspeksi hasil perancangan mesin **Desktop CNC Router 3-Axis** karya **Kelompok DESKTOP CNC ROUTER** (Program Studi Sarjana Terapan D4 Teknik Mekatronika, Politeknik Elektronika Negeri Surabaya - PENS).

Dibangun secara khusus agar **Recruiter / HRD dan Engineering Evaluator** dapat berinteraksi langsung dengan model 3D CAD parametrik, simulasi *Exploded View*, membaca 41 item *Bill of Materials* (BOM), serta menelaah 26 lembar gambar kerja manufaktur (*manufacturing blueprints*) berstandar ISO tanpa memerlukan lisensi perangkat lunak CAD komersial.

---

## Fitur Utama Web Showcase

1. **3D CAD WebGL Viewer & Exploded View**:
   - Model perakitan asli dari file Autodesk Inventor: `Assembly CNC Router Desktop.iam` (terdiri dari 438 total *occurrences*, 61 part unik `.ipt`, dan 38 material teknik native).
   - Kontrol *Exploded View* halus (slider terkalibrasi 0% - 100% dan mode animasi otomatis).
   - 3 Mode Tampilan Khusus: **PBR Metal Realistic**, **Wireframe CAD Teknik**, dan **X-Ray Ghost View**.
   - Preset sudut kamera: *Isometric*, *Front*, *Top*, *Side*, dan *Spindle Focus*.
   - *Part Inspector HUD*: Klik pada komponen mana pun untuk memeriksa nama part `.ipt` asli dan fungsi mekanisnya.

2. **Official Bill of Materials (BOM 41 Komponen)**:
   - Diekstrak langsung dari gambar kerja resmi `EXPLODE1.pdf` dan `drawing.pdf Sheet 24`.
   - Fitur pencarian part instan, filter kategori (*Rangka*, *Transmisi*, *Aktuator*, *Fastener*), dan tombol navigasi langsung `"Lihat di 3D"`.

3. **Galeri 26 Lembar Gambar Kerja Manufaktur (Blueprints)**:
   - Set lengkap gambar teknik 2D resmi berstandar PENS ISO dengan etiket, proyeksi ortogonal, toleransi linier/sudut, serta SOP perakitan (Sheet 25-26).
   - Dilengkapi *Modal Lightbox* beresolusi tinggi dengan fitur Zoom In, Zoom Out, dan tombol unduh PDF dokumen asli (26 halaman).

4. **Spesifikasi Rekayasa & Evaluasi HRD**:
   - Analisis *Design for Manufacturing* (DFM), kalkulasi beban dinamis, parameter komponen COTS (*Commercial Off-The-Shelf*), dan profil kolaborasi tim.

---

## Tim Perancang & Dosen Pembimbing

### Kelompok DESKTOP CNC ROUTER
**Program Studi Sarjana Terapan (D4) Teknik Mekatronika**  
**Departemen Teknik Mekanika dan Energi — Politeknik Elektronika Negeri Surabaya (PENS)**

* **Akbar Darma Saputra, S.Tr.T.** (Design & Drafting Engineer / Presenter Portofolio)
* **Adi Prayoga** (Design & Drafting Engineer)
* **Faqih Abdillah Sidqi** (Design & Drafting Engineer)
* **Azwar Anas** (Design & Drafting Engineer)
* **M. Syamsudin Putra** (Design & Drafting Engineer)
* **Heni Eka Saputri** (Design & Drafting Engineer)
* **Wildan Habibi** (Design & Drafting Engineer)
* **Siti Alfathul** (Design & Drafting Engineer)

### Dosen Evaluator & Checker:
* **Moh. Nasyir Tamara, S.ST., M.T.**
* **Novian Fajar Satria, S.ST., M.T.**

---

## Ringkasan Spesifikasi Teknis Mesin

| Parameter | Spesifikasi |
| :--- | :--- |
| **Dimensi Rangka Luar** | 980 × 816 × 650 mm |
| **Travel Efektif (X × Y × Z)** | ~700 mm × ~500 mm × ~120 mm |
| **Profil Struktural** | Aluminium Extrusion 4080 (L=978mm & 816mm) & Bed Slats 2040 |
| **Transmisi Sumbu (X, Y, Z)** | Ball Screw SFU1605 (Diameter 16 mm, Pitch 5 mm, Akurasi Kelas C7) |
| **Sistem Panduan Linier** | Supported Linear Rail SBR12 + 8 unit Bearing Blocks SBR12UU |
| **Penggerak Aktuator** | 4x NEMA 23 Hybrid Stepper Motors (Dual Y-Axis Anti-Racking, 1.9 Nm, 3A) |
| **Dukungan Aksial** | Bearing Support BK12 (Fixed End) & BF12 (Floating End) |
| **Toleransi Manufaktur** | Lubang bantalan H7 (Machining pelat gantry samping 10 mm & end plate 8 mm) |

---

*Hak Cipta Desain & Rekayasa Mekanik © Kelompok DESKTOP CNC ROUTER — D4 Teknik Mekatronika PENS.*
