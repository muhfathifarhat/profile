export interface ProjectItem {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  link?: string | null;
  tags?: string[];
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  link?: string | null;
  pdf: string; // path ke file PDF, dirender langsung jadi gambar di web
}

export const projects: ProjectItem[] = [
  {
    title: "Tracking Gps",
    subtitle: "Web Dev & Internet of Things",
    description:
      "Rancang Bangun Sistem Pelacakan Lokasi Real-Time Berbasis IoT Menggunakan Arduino dan Modul GPS untuk Kendaraan.",
    link: "https://gps-track.free.nf/", // contoh: ganti dengan URL project asli kamu
    tags: ["C++", "PHP", "JavaScript", "mySQL", "Firebase", "TinyGPS"],
    image: "/assets/project/tracking-gps.png",
  },
  {
    title: "Web Portofolio",
    subtitle: "Web Dev",
    description:
      "Website portofolio yang menampilkan profil, pengalaman, dan proyek yang pernah dikerjakan.",
    link: "", // contoh: ganti dengan URL project asli kamu
    tags: ["React", "TypeScript", "Tailwind"],
    image: "/assets/project/web-porto.png",
  },
  {
    title: "BigQuery-Ecommerce",
    subtitle: "Data Analyst",
    description: "Dasboard interaktif ini menampilkan performa e-commerce melalui analisis pendapatan bulanan, jumlah pelanggan, dan kinerja pengiriman.",
    link: "https://public.tableau.com/shared/W9F7T3JTG?:display_count=n&:origin=viz_share_link",
    tags: ["SQL", "Excel", "Tableau"],
    image: "/assets/project/bigquery-ecommerce.png",
  },
  {
    title: "Keggle-Covid19 ID",
    subtitle: "Data Analyst",
    description: "Menganalisis perkembangan COVID-19 di Indonesia melalui visualisasi total kasus, kematian, pemulihan, distribusi kasus antarprovinsi, persebaran geografis, serta tren kasus.",
    link: "https://public.tableau.com/shared/8BFN3JNP8?:display_count=n&:origin=viz_share_link",
    tags: ["Excel", "Tableau"],
    image: "/assets/project/kaggle-covid19.png",
  },
  {
    title: "Keggle-Flight Delay",
    subtitle: "Data Analyst",
    description: "Menganalisis faktor penyebab keterlambatan penerbangan berdasarkan jenis delay, tren keterlambatan dari waktu ke waktu, distribusi delay antar maskapai, serta persebaran geografis.",
    link: "https://public.tableau.com/shared/9CHP4JYTX?:display_count=n&:origin=viz_share_link",
    tags: ["Excel", "Tableau"],
    image: "/assets/project/kaggle-flight.png",
  },
  {
    title: "Keggle-Pokemon Stats",
    subtitle: "Data Analyst",
    description: "Menganalisis profil dan statistik setiap Pokémon secara interaktif, mencakup informasi tipe, generasi, status Legendary, distribusi atribut, power berdasarkan Pokémon yang dipilih.",
    link: "https://public.tableau.com/shared/4CGKWMYGJ?:display_count=n&:origin=viz_share_link",
    tags: ["Excel", "Tableau"],
    image: "/assets/project/kaggle-pokestat.png",
  },
  {
    title: "",
    description: "",
    link: null,
    tags: [],
  },
];

export const certificates: CertificateItem[] = [
  {
    title: "BNSP Pemrograman",
    issuer: "BNSP",
    date: "2025",
    link: null,
    pdf: "/assets/certificate/BNSP-Pemrograman.pdf",
  },
  {
    title: "Pivot Table In Microsoft Excel",
    issuer: "MySkill",
    date: "2026",
    link: null,
    pdf: "/assets/certificate/Pivot-Table.pdf",
  },
  {
    title: "Intro To Data Analytics",
    issuer: "Revou",
    date: "2026",
    link: null,
    pdf: "/assets/certificate/Intro-To-Data-Analytic.pdf",
  },
  {
    title: "Data Analyst & Business Intelligence",
    issuer: "Dibimbing",
    date: "2026",
    link: null,
    pdf: "/assets/certificate/DataAnalytic&BusinessIntelligence.pdf",
  },
];

// Jumlah project "asli" yang dihitung untuk statistik -- kartu placeholder
// "Coming Soon" (title kosong) sengaja tidak ikut dihitung.
export const projectCount = projects.filter((p) => p.title.trim() !== "").length;
export const certificateCount = certificates.length;