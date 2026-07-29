import { useState, useEffect } from "react";

interface LanyardResponsiveConfig {
  anchorX: number;
  position: [number, number, number];
}

export function useResponsiveAnchorX() {
  const [config, setConfig] = useState<LanyardResponsiveConfig>({
    anchorX: 2,
    position: [0, 0, 12],
  });

  useEffect(() => {
    const calculateConfig = (): LanyardResponsiveConfig => {
      const width = window.innerWidth;

      if (width >= 1680) return { anchorX: 2, position: [0, 0, 13] };
      if (width >= 1536) return { anchorX: 1.8, position: [0, 0, 13] }; // desktop besar
      if (width >= 1280) return { anchorX: 1.4, position: [0, 0, 14] }; // desktop besar
      if (width >= 1024) return { anchorX: 1.2, position: [0, 0, 16] }; // lg / tablet landscape besar
      if (width >= 900) return { anchorX: 1.2, position: [0, 0, 16] }; // tablet besar
      if (width >= 768) return { anchorX: 1, position: [0, 0, 16] }; // tablet standar
      return { anchorX: 0.6, position: [0, 0, 12] }; // fallback kecil (jaga-jaga)
    };

    const handleResize = () => setConfig(calculateConfig());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return config;
}