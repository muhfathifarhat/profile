import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Code2, Award, ArrowUpRight } from "lucide-react";
import { projectCount, certificateCount } from "./PortofolioData";

interface StatItem {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

const stats: StatItem[] = [
  { icon: <Award size={20} />, value: certificateCount, label: "CERTIFICATE" },
  { icon: <Code2 size={20} />, value: projectCount, label: "PORTOFOLIO" },
];

// Ganti tab aktif di PortfolioShowcase (section #portofolio) lewat custom event,
// karena StatsCards dan PortfolioShowcase adalah komponen terpisah (tidak
// punya hubungan parent-child langsung), lalu scroll ke section itu.
function goToPortfolioTab(tab: "projects" | "certificates") {
  window.dispatchEvent(new CustomEvent("portfolio:setTab", { detail: tab }));
  document
    .getElementById("portofolio")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function StatsCards() {
  const lastScrollY = useRef(0);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [lockedVisible, setLockedVisible] = useState(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY > lastScrollY.current ? "down" : "up";
      setScrollDir(direction);
      lastScrollY.current = currentY;

      if (direction === "up" && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top >= window.innerHeight) {
          setLockedVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== REF & TRIGGER ANIMASI =====
  const containerInView = useInView(containerRef, { amount: 0.3, once: false });
  const prevContainerInView = useRef(containerInView);

  useEffect(() => {
    if (
      prevContainerInView.current === true &&
      containerInView === false &&
      scrollDir === "down"
    ) {
      setLockedVisible(true);
    }
    prevContainerInView.current = containerInView;
  }, [containerInView, scrollDir]);

  const visible = lockedVisible || containerInView;

  const fadeTransition = (index: number) =>
    lockedVisible
      ? { duration: 0 }
      : visible
        ? { duration: 0.5, ease: "easeOut" as const, delay: index * 0.1 }
        : { duration: 0.15, ease: "easeIn" as const, delay: 0 };

  // Glow reusable — pojok kanan-atas
  const GlowTopRight = () => (
    <div
      className="absolute -right-12 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
      style={{
        background: `
        radial-gradient(
          rgba(247,194,0, 0.10) 30%,
          rgba(247,194,0, 0.06) 35%,
          rgba(247,194,0, 0.03) 100%,
          transparent 85%
        )
      `,
        filter: "blur(40px)",
      }}
    />
  );

  return (
    <div
      ref={containerRef}
      className="w-full grid grid-cols-1 md:grid-cols-[0.75fr_1.1fr_1.1fr] gap-3 items-center">
      {/* FOCUS - tanpa card, ukuran mengikuti referensi gambar */}
      <motion.div
        className="flex flex-col items-start justify-center h-full px-1 md:px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={fadeTransition(0)}>
        <span className="text-[#f7c200] text-base tracking-[0.2em] font-mono uppercase [text-shadow:0_0_5px_#FF6600,0_0_15px_#FF6600,0_0_30px_rgba(247,194,0,0.6),0_0_45px_rgba(247,194,0,0.4)]">
          Focus
        </span>
        <span className="text-white text-3xl font-extrabold">Data Analyst</span>
      </motion.div>

      {/* PORTOFOLIO - tengah */}
      <motion.div
        onClick={() => goToPortfolioTab("projects")}
        className="group relative overflow-hidden bg-[#1A1A1A] rounded-2xl p-5 flex flex-col justify-between min-h-[110px] cursor-pointer border border-transparent transition-all duration-300 hover:border-[#f7c200]/35 hover:shadow-[0_12px_15px_-12px_rgba(247,194,0,0.35)]"
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileHover={{ y: -6 }}
        transition={fadeTransition(1)}>
        <GlowTopRight />

        <div className="relative flex items-start justify-between">
          <div className="text-white">{stats[1].icon}</div>
          <span className="text-white text-2xl font-bold font-mono">
            {stats[1].value}
          </span>
        </div>

        <div className="relative flex items-center justify-between mt-4">
          <span className="text-gray-400 text-xs tracking-widest font-mono uppercase">
            {stats[1].label}
          </span>
          <ArrowUpRight size={16} className="text-gray-400" />
        </div>
      </motion.div>

      {/* CERTIFICATE - kanan */}
      <motion.div
        onClick={() => goToPortfolioTab("certificates")}
        className="group relative overflow-hidden bg-[#1A1A1A] rounded-2xl p-5 flex flex-col justify-between min-h-[110px] cursor-pointer border border-transparent transition-all duration-300 hover:border-[#f7c200]/35 hover:shadow-[0_12px_15px_-12px_rgba(247,194,0,0.35)]"
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileHover={{ y: -6 }}
        transition={fadeTransition(2)}>
        <GlowTopRight />

        <div className="relative flex items-start justify-between">
          <div className="text-white">{stats[0].icon}</div>
          <span className="text-white text-2xl font-bold font-mono">
            {stats[0].value}
          </span>
        </div>

        <div className="relative flex items-center justify-between mt-4">
          <span className="text-gray-400 text-xs tracking-widest font-mono uppercase">
            {stats[0].label}
          </span>
          <ArrowUpRight size={16} className="text-gray-400" />
        </div>
      </motion.div>
    </div>
  );
}
