import "./App.css";
import "./index.css";

import HeroSection from "./component/HeroSection";
import Navbar from "./component/Navbar";
import Intro from "./component/Intro.tsx";
import AOS from "aos";
import "aos/dist/aos.css";
import LogoLoop from "./component/LogoLoop";
import AboutSection from "./component/AboutSection";
import ExperienceSection from "./component/ExperienceSection";
import PortfolioShowcase from "./component/PortofolioShowcase";
import ContactSection from "./component/Contact";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const scrollLockRef = useRef(true);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const resetScroll = () => {
      if (scrollLockRef.current) {
        window.scrollTo(0, 0);
      }
    };

    resetScroll();

    window.addEventListener("load", resetScroll);
    window.addEventListener("pageshow", resetScroll);

    const timers = [50, 150, 300, 600, 1000, 1500].map((ms) =>
      setTimeout(resetScroll, ms),
    );

    const unlockTimer = setTimeout(() => {
      scrollLockRef.current = false;
    }, 1600);

    return () => {
      window.removeEventListener("load", resetScroll);
      window.removeEventListener("pageshow", resetScroll);
      timers.forEach(clearTimeout);
      clearTimeout(unlockTimer);
    };
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      {/* INTRO */}
      <AnimatePresence>
        {showIntro && <Intro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* NAVBAR */}
      <Navbar />

      {/* SECTION 1 - Hero (dipindah ke komponen terpisah) */}
      <HeroSection showIntro={showIntro} />

      {/* SECTION 2 - dipindah ke komponen terpisah */}
      <AboutSection />

      {/* SECTION 3 - Pengalaman Kerja (ScrollStack) */}
      <ExperienceSection />

      {/* LOGO LOOP */}
      <div className="w-[100%] bg-black pt-10">
        <div className="w-[75%] mx-auto bg-black">
          <LogoLoop
            logos={techLogos}
            speed={40}
            direction="left"
            logoHeight={isMobile ? 35 : 40}
            gap={isMobile ? 40 : 85}
            hoverSpeed={40}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Technology partners"
          />
        </div>
      </div>

      <PortfolioShowcase />

      <div>
        <ContactSection />
      </div>
    </div>
  );
}

export default App;