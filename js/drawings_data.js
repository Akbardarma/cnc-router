// Technical Blueprint Data for Akbar's CNC Router Project (26 Sheets + Exploded View)
// Source: C:\Tugas Kampus\pak nasir\CNC Router\drawing.pdf & EXPLODE1.pdf
// Standard: Mekatronika PENS, ISO Metric, Evaluator: Moh. Nasyir Tamara, S.ST., M.T. & Novian Fajar Satria, S.ST., M.T. (Kelompok DESKTOP CNC ROUTER)

const DRAWINGS_DATA = [
  {
    sheet: 1,
    file: "sheet_01.png",
    title: "End Plate (Pelat Penutup Rangka Utama)",
    category: "frame",
    categoryLabel: "Rangka & Struktur",
    scale: "1 : 4",
    paper: "A3",
    dims: "250 × 956.61 × 8 mm",
    desc: "Pelat ujung struktural tebal 8 mm yang mengikat aluminium profil 4080 membujur, dilengkapi lubang presisi M5x0.8 dan counterbore untuk bearing support SFU1605."
  },
  {
    sheet: 2,
    file: "sheet_02.png",
    title: "Gantry Plate (Pelat Samping Gantry Kanan & Kiri)",
    category: "gantry",
    categoryLabel: "Gantry & Motion",
    scale: "1 : 4",
    paper: "A3",
    dims: "400.20 × 170.51 × 10 mm",
    desc: "Komponen utama pembawa beban sumbu X dan Z. Memiliki dudukan untuk 4x SBR12UU bearing blocks, dudukan motor stepper NEMA 23, dan lubang alignment leadscrew."
  },
  {
    sheet: 3,
    file: "sheet_03.png",
    title: "Base Z-Axis (Pelat Rangka Sumbu Z)",
    category: "zaxis",
    categoryLabel: "Sumbu Z & Spindle",
    scale: "1 : 2",
    paper: "A4",
    dims: "248 × 83 × 8 mm",
    desc: "Pelat dasar penggerak vertikal sumbu Z. Menghubungkan linear block sumbu X dengan rel pendek sumbu Z dan rumah ball nut DSG16H."
  },
  {
    sheet: 4,
    file: "sheet_04.png",
    title: "Aluminium Corner Bracket 4040/2028",
    category: "frame",
    categoryLabel: "Rangka & Struktur",
    scale: "2 : 1",
    paper: "A4",
    dims: "28 × 28 × 20 mm",
    desc: "Siku penguat sudut sambungan ekstrusi aluminium 4080 dan 2040 untuk memastikan ketegaklurusan (perpendicularity) rangka mesin."
  },
  {
    sheet: 5,
    file: "sheet_05.png",
    title: "Leadscrew SFU1605 - 300 mm (Sumbu Z)",
    category: "transmission",
    categoryLabel: "Transmisi Presisi",
    scale: "1 : 2",
    paper: "A4",
    dims: "Ø16 mm, Pitch 5 mm, P=300 mm",
    desc: "Poros ball screw presisi kelas C7 untuk gerakan vertikal sumbu Z, dengan machining ujung jurnal untuk fixed bearing BK10/BK12 dan snap ring."
  },
  {
    sheet: 6,
    file: "sheet_06.png",
    title: "Leadscrew SFU1605 - 1000 mm (Sumbu X & Y)",
    category: "transmission",
    categoryLabel: "Transmisi Presisi",
    scale: "1 : 8",
    paper: "A4",
    dims: "Ø16 mm, Pitch 5 mm, P=1000 mm",
    desc: "Ball screw panjang untuk penggerak sumbu longitudinal dan transversal, minim backlash untuk akurasi pemotongan kayu dan akrilik."
  },
  {
    sheet: 7,
    file: "sheet_07.png",
    title: "Ball Screw Nut Housing DSG16H",
    category: "transmission",
    categoryLabel: "Transmisi Presisi",
    scale: "1 : 1",
    paper: "A4",
    dims: "40 × 38 × 28 mm",
    desc: "Rumah dudukan aluminium anodized untuk mengunci ball nut SFU1605 ke pelat gantry dan carriage sumbu Z."
  },
  {
    sheet: 8,
    file: "sheet_08.png",
    title: "Bearing Support BF12 (Floating Side)",
    category: "transmission",
    categoryLabel: "Transmisi Presisi",
    scale: "1 : 1",
    paper: "A4",
    dims: "60 × 43 × 20 mm, ID 10 mm",
    desc: "Unit bantalan sisi bebas (floating side) dengan deep groove ball bearing dan snap ring untuk menahan defleksi termal poros ballscrew."
  },
  {
    sheet: 9,
    file: "sheet_09.png",
    title: "Bearing Support BK12 (Fixed Side)",
    category: "transmission",
    categoryLabel: "Transmisi Presisi",
    scale: "1 : 1",
    paper: "A4",
    dims: "60 × 43 × 24 mm, ID 12 mm",
    desc: "Unit bantalan sisi tetap (fixed side) dengan angular contact ball bearings bertimbal dan locknut presisi untuk menahan gaya aksial dorong pemotongan."
  },
  {
    sheet: 10,
    file: "sheet_10.png",
    title: "Flexible Jaw Coupling SRB-22 (8x10 mm)",
    category: "transmission",
    categoryLabel: "Transmisi Presisi",
    scale: "2 : 1",
    paper: "A4",
    dims: "Ø20 × 24 mm, Bore 8 mm / 10 mm",
    desc: "Kopling fleksibel aluminium dengan peredam torsi elastomer untuk menghubungkan shaft motor stepper NEMA 23 (8 mm) ke jurnal ballscrew (10 mm)."
  },
  {
    sheet: 11,
    file: "sheet_11.png",
    title: "Holder Ball Nut Housing Adapter",
    category: "transmission",
    categoryLabel: "Transmisi Presisi",
    scale: "1 : 1",
    paper: "A4",
    dims: "40 × 40 × 10 mm",
    desc: "Pelat adaptor custom perantara antara rumah ball nut DSG16H dengan struktur rangka gantry aluminium."
  },
  {
    sheet: 12,
    file: "sheet_12.png",
    title: "Linear Guide Block SBR12UU",
    category: "gantry",
    categoryLabel: "Gantry & Motion",
    scale: "1 : 1",
    paper: "A4",
    dims: "39 × 40 × 28 mm, ID 12 mm",
    desc: "Bantalan linier model terbuka (open type) dengan 4 sirkulasi bola baja untuk meluncur mulus pada rel silinder SBR12."
  },
  {
    sheet: 13,
    file: "sheet_13.png",
    title: "Linear Rail Supported SBR12 (Long - 978 mm)",
    category: "gantry",
    categoryLabel: "Gantry & Motion",
    scale: "2 : 1 (Detail Section)",
    paper: "A4",
    dims: "L=978 mm, Rel Ø12 mm + Dudukan Aluminium",
    desc: "Rel linier bertumpu sepanjang 978 mm untuk sumbu X dan Y, mencegah lendingan (sagging) di bawah beban kerja spindel."
  },
  {
    sheet: 14,
    file: "sheet_14.png",
    title: "Linear Rail Supported SBR12 (Short - 260 mm)",
    category: "zaxis",
    categoryLabel: "Sumbu Z & Spindle",
    scale: "2 : 1 (Detail Section)",
    paper: "A4",
    dims: "L=260 mm, Rel Ø12 mm",
    desc: "Rel linier presisi sumbu Z vertikal untuk memandu naik-turunnya unit spindle pemotong dengan rigiditas tinggi."
  },
  {
    sheet: 15,
    file: "sheet_15.png",
    title: "Bantalan Base Spindle Spacer",
    category: "zaxis",
    categoryLabel: "Sumbu Z & Spindle",
    scale: "1 : 1",
    paper: "A4",
    dims: "41 × 39 × 2.5 mm",
    desc: "Pelat spacer ganjal dudukan spindle untuk mencapai kerataan alignment tegak lurus mata pisau terhadap meja kerja."
  },
  {
    sheet: 16,
    file: "sheet_16.png",
    title: "Stepper Motor Mount Bracket (NEMA 23)",
    category: "motor",
    categoryLabel: "Motor & Braket",
    scale: "1 : 1",
    paper: "A4",
    dims: "70 × 70 × 47 mm (NEMA 23 standard)",
    desc: "Braket dudukan motor stepper 57 mm dengan lubang tengah Ø26 mm dan 4x slot M5 untuk tensioning & alignment sumbu X/Y."
  },
  {
    sheet: 17,
    file: "sheet_17.png",
    title: "Stepper Motor Bracket Z-Axis",
    category: "zaxis",
    categoryLabel: "Sumbu Z & Spindle",
    scale: "1 : 1",
    paper: "A4",
    dims: "58.22 × 56.40 × 8 mm",
    desc: "Braket pelat atas sumbu Z yang menopang motor penggerak vertikal, terhubung langsung di atas modul bantalan BK12."
  },
  {
    sheet: 18,
    file: "sheet_18.png",
    title: "Spindle Clamp Base (Dudukan Motor Spindle)",
    category: "zaxis",
    categoryLabel: "Sumbu Z & Spindle",
    scale: "1 : 2",
    paper: "A4",
    dims: "113.12 × 106 × 10 mm",
    desc: "Pelat penjepit utama motor spindle dengan radius penjepit R10 dan lubang counterbore berkekuatan tinggi meredam getaran putaran 24.000 RPM."
  },
  {
    sheet: 19,
    file: "sheet_19.png",
    title: "Aluminium Profile 40x80 Membujur (Frame Utama)",
    category: "frame",
    categoryLabel: "Rangka & Struktur",
    scale: "1 : 11",
    paper: "A4",
    dims: "40 × 80 × 979.91 mm",
    desc: "Profil aluminium struktural berat dengan konfigurasi 6 slot T-Nut. Menopang seluruh lintasan sumbu Y gantry dan beban kerja."
  },
  {
    sheet: 20,
    file: "sheet_20.png",
    title: "Aluminium Profile 40x80 Melintang (Gantry Beam)",
    category: "frame",
    categoryLabel: "Rangka & Struktur",
    scale: "1 : 9",
    paper: "A4",
    dims: "40 × 80 × 816.36 mm",
    desc: "Balok lintang gantry utama yang menopang kereta sumbu X dan Z, memiliki momen inersia penampang tinggi terhadap gaya tekuk."
  },
  {
    sheet: 21,
    file: "sheet_21.png",
    title: "Aluminium Profile 40x20 Bed Support dengan Lubang Tapped",
    category: "frame",
    categoryLabel: "Rangka & Struktur",
    scale: "2 : 1",
    paper: "A4",
    dims: "20 × 40 × 979.91 mm (6 batang)",
    desc: "Profil penyusun bidang meja kerja bed CNC dengan lubang tapped M5 pada interval 441.46 mm untuk penguncian material kerja (clamping)."
  },
  {
    sheet: 22,
    file: "sheet_22.png",
    title: "EXPLODE 1: Assembly Exploded View (3D Isometric)",
    category: "assembly",
    categoryLabel: "Perakitan & SOP",
    scale: "1 : 5",
    paper: "A3",
    dims: "Isometric Assembly Exploded View",
    desc: "Gambar proyeksi isometrik terurai dari keseluruhan mesin CNC Desktop, memvisualisasikan urutan perakitan dan interaksi antarsub-sistem."
  },
  {
    sheet: 23,
    file: "sheet_23.png",
    title: "Sub-Assembly Z-Axis & Spindle Carriage",
    category: "assembly",
    categoryLabel: "Perakitan & SOP",
    scale: "1 : 3",
    paper: "A3",
    dims: "Carriage Assembly Sub-System",
    desc: "Detail perakitan modul sumbu Z yang mengintegrasikan linear guide SBR12UU, ball nut DSG16H, clamping spindel, dan braket motor NEMA 23."
  },
  {
    sheet: 24,
    file: "sheet_24.png",
    title: "Explode Balloon Callout & Official 41-Item Bill of Materials",
    category: "assembly",
    categoryLabel: "Perakitan & SOP",
    scale: "1 : 7",
    paper: "A2",
    dims: "Full Engineering Bill of Materials",
    desc: "Lembar etiket resmi PENS berisi nomor balon indeks (1 s.d. 41) yang menghubungkan visual 3D perakitan dengan spesifikasi part number dan kuantitas."
  },
  {
    sheet: 25,
    file: "sheet_25.png",
    title: "Assembly SOP Part 1: Instalasi Rel & Spindle Carriage",
    category: "assembly",
    categoryLabel: "Perakitan & SOP",
    scale: "N/A (Prosedur)",
    paper: "A2",
    dims: "Standard Operating Procedure PENS",
    desc: "Petunjuk urutan kerja presisi: pemasangan rel linier SBR12 pada base Z, perakitan linear block ke rumah ballscrew, dan penguncian dudukan spindle."
  },
  {
    sheet: 26,
    file: "sheet_26.png",
    title: "Assembly SOP Part 2: Rangka Aluminium, BK12/BF12 & Stepper",
    category: "assembly",
    categoryLabel: "Perakitan & SOP",
    scale: "N/A (Prosedur)",
    paper: "A3",
    dims: "Standard Operating Procedure PENS",
    desc: "Petunjuk urutan kerja: perakitan balok ekstrusi 4080 dengan siku sudut 4040, pemasangan bearing fixed BK12 pada sisi dalam gantry, dan kopling motor stepper di sisi luar."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DRAWINGS_DATA };
}
