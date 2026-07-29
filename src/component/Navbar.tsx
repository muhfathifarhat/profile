import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Mail,
  type LucideIcon,
  FolderOpen,
} from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const isClickScrolling = useRef(false);
  const clickScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tiap menu dipasangkan ikon yang relevan dengan isi section-nya.
  const navItems: { name: string; icon: LucideIcon }[] = [
    { name: "Home", icon: Home },
    { name: "About", icon: User },
    { name: "Experience", icon: Briefcase },
    { name: "Portfolio", icon: FolderOpen },
    { name: "Contact", icon: Mail },
  ];

  const sectionIds: { [key: string]: string } = {
    Home: "home",
    About: "about",
    Experience: "experience",
    Portfolio: "portofolio",
    Contact: "contact",
  };

  // Reverse map: id section -> nama menu
  const idToItem: { [key: string]: string } = Object.fromEntries(
    Object.entries(sectionIds).map(([item, id]) => [id, item]),
  );

  const handleNavClick = (item: string) => {
    setActive(item);

    isClickScrolling.current = true; // matikan sementara scrollspy biar tidak konflik

    const target = document.getElementById(sectionIds[item]);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Hitung ulang timeout berdasar jarak scroll, bukan angka tetap 800ms.
    // Scroll jarak jauh (misal Home -> Contact) butuh waktu lebih lama;
    // kalau timeout terlalu pendek, scrollspy nyala lagi di tengah animasi
    // dan bisa "menimpa" active state yang baru saja di-set manual.
    if (clickScrollTimeout.current) clearTimeout(clickScrollTimeout.current);
    const distance = target ? Math.abs(target.getBoundingClientRect().top) : 0;
    const estimatedDuration = Math.min(1200, Math.max(500, distance * 0.5));
    clickScrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, estimatedDuration);
  };

  useEffect(() => {
    const activeEl = navRefs.current[active];
    if (activeEl) {
      setUnderlineStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [active]);

  // Scrollspy - deteksi section aktif berdasarkan posisi scroll manual.
  // Pakai getBoundingClientRect() dibanding IntersectionObserver supaya:
  // 1. Semua section selalu dicek tiap scroll (bukan cuma yang "berubah")
  // 2. Section pendek & tinggi bisa dibandingkan secara adil (posisi, bukan rasio area)
  useEffect(() => {
    const sections = Object.values(sectionIds)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    let ticking = false;

    const updateActiveSection = () => {
      // Garis acuan: 35% dari atas viewport dianggap "posisi aktif"
      const referenceLine = window.innerHeight * 0.35;

      let currentId = sections[0].id;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // Ambil section terakhir yang bagian atasnya sudah melewati garis acuan
        if (rect.top <= referenceLine) {
          currentId = section.id;
        }
      }

      const item = idToItem[currentId];
      if (item) setActive(item);

      ticking = false;
    };

    const handleScroll = () => {
      if (isClickScrolling.current) return;
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // set active section saat pertama mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed bottom-4 lg:bottom-auto lg:top-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-4/5 lg:w-3/4 z-50 bg-[#292929]/60 backdrop-blur-md rounded-3xl border border-white/10 shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-20 py-3 flex items-center justify-between">
        <span className="hidden lg:inline font-mono text-gray-400 text-sm tracking-widest">
          Muhm.thi
        </span>

        {/* ---- DESKTOP (lg ke atas): ikon + nama menu ---- */}
        <ul className="hidden lg:flex items-center gap-8 relative">
          <motion.div
            className="absolute -bottom-[0.5px] h-[0.5px] bg-[#f7c20058] "
            animate={{ left: underlineStyle.left, width: underlineStyle.width }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {navItems.map(({ name, icon: Icon }) => (
            <li key={name}>
              <button
                ref={(el) => {
                  navRefs.current[name] = el;
                }}
                onClick={() => handleNavClick(name)}
                className={`flex items-center gap-2 font-mono text-sm tracking-widest transition-colors duration-200 ${
                  active === name
                    ? "text-[#cccccc]"
                    : "text-gray-400 hover:text-[#7A7A7A]"
                }`}
                style={
                  active === name
                    ? { filter: "drop-shadow(0 0 1px #dadada)" }
                    : undefined
                }>
                <Icon size={16} strokeWidth={1.75} />
                {name}
              </button>
            </li>
          ))}
        </ul>

        {/* ---- MOBILE + TABLET (di bawah lg): ikon saja ---- */}
        <ul className="flex lg:hidden items-center justify-between w-full gap-2 sm:gap-4">
          {navItems.map(({ name, icon: Icon }) => (
            <li key={name}>
              <button
                onClick={() => handleNavClick(name)}
                aria-label={name}
                className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors duration-200 ${
                  active === name
                    ? "text-[#cccccc] bg-[#76767617]"
                    : "text-gray-400 hover:text-[#7A7A7A]"
                }`}
                style={
                  active === name
                    ? { filter: "drop-shadow(0 0 1px #dadada)" }
                    : undefined
                }>
                <Icon size={18} strokeWidth={1.75} className="sm:w-5 sm:h-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
