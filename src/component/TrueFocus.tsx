import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  colors?: string[];
  delay?: number;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const PADDING = 8;
// Ekstra padding khusus di bagian bawah kotak fokus, tidak memengaruhi
// sisi atas/kiri/kanan — supaya kotak terasa sedikit lebih lebar ke bawah.
const PADDING_BOTTOM_EXTRA = 6;

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "rgba(255, 255, 255, 0.6",
  glowColor = "rgba(255, 225, 170, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 0.3,
  colors = [],
  delay = 0,
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"word" | "expand" | "hidden">("word");
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const getAllWordsRect = (): FocusRect => {
    if (!containerRef.current || wordRefs.current.length === 0)
      return { x: 0, y: 0, width: 0, height: 0 };
    const parentRect = containerRef.current.getBoundingClientRect();
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    wordRefs.current.forEach((ref) => {
      if (!ref) return;
      const r = ref.getBoundingClientRect();
      minX = Math.min(minX, r.left);
      minY = Math.min(minY, r.top);
      maxX = Math.max(maxX, r.right);
      maxY = Math.max(maxY, r.bottom);
    });
    return {
      x: minX - parentRect.left - PADDING,
      y: minY - parentRect.top - PADDING,
      width: maxX - minX + PADDING * 2,
      height: maxY - minY + PADDING * 2 + PADDING_BOTTOM_EXTRA,
    };
  };

  useLayoutEffect(() => {
    if (!started) return; // ← tambah ini
    if (!wordRefs.current[0] || !containerRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const firstRect = wordRefs.current[0].getBoundingClientRect();
    setFocusRect({
      x: firstRect.left - parentRect.left - PADDING,
      y: firstRect.top - parentRect.top - PADDING,
      width: firstRect.width + PADDING * 2,
      height: firstRect.height + PADDING * 2 + PADDING_BOTTOM_EXTRA,
    });
  }, [started]);

  useEffect(() => {
    if (manualMode) return;

    let timeout: ReturnType<typeof setTimeout>;
    let wordIndex = 0;

    const nextWord = () => {
      setPhase("word");
      setCurrentIndex(wordIndex);
      wordIndex++;

      if (wordIndex < words.length) {
        timeout = setTimeout(
          nextWord,
          (animationDuration + pauseBetweenAnimations) * 1000,
        );
      } else {
        timeout = setTimeout(
          () => {
            setPhase("expand");
            const allRect = getAllWordsRect();
            setFocusRect(allRect);

            timeout = setTimeout(
              () => {
                setPhase("hidden");
              },
              (animationDuration + pauseBetweenAnimations) * 1000,
            );
          },
          (animationDuration + pauseBetweenAnimations) * 1000,
        );
      }
    };

    timeout = setTimeout(() => {
      setStarted(true);
      nextWord();
    }, delay);

    return () => clearTimeout(timeout);
  }, [animationDuration, pauseBetweenAnimations, manualMode, delay]);

  useEffect(() => {
    if (!started) return; // ← tambah ini
    if (phase !== "word") return;
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left - PADDING,
      y: activeRect.top - parentRect.top - PADDING,
      width: activeRect.width + PADDING * 2,
      height: activeRect.height + PADDING * 2 + PADDING_BOTTOM_EXTRA,
    });
  }, [currentIndex, phase, started]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex!);
    }
  };

  return (
    <div
      className="relative flex flex-col gap-6 justify-center items-start"
      ref={containerRef}
      style={{ outline: "none", userSelect: "none" }}>
      {words.map((word: string, index: number) => {
        const isActive = phase === "word" ? index === currentIndex : true;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className="relative text-[3.7rem] font-black cursor-pointer"
            style={
              {
                color: colors[index] ?? "inherit",
                filter: manualMode
                  ? isActive
                    ? `blur(0px)`
                    : `blur(${blurAmount}px)`
                  : phase === "expand" || phase === "hidden"
                    ? `blur(0px)`
                    : isActive
                      ? `blur(0px)`
                      : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease`,
                outline: "none",
                userSelect: "none",
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}>
            {word}
          </span>
        );
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: !started ? 0 : phase === "hidden" ? 0 : 1,
        }}
        transition={{ duration: animationDuration }}
        style={
          {
            "--border-color": borderColor,
            "--glow-color": glowColor,
          } as React.CSSProperties
        }>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        />
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        />
      </motion.div>
    </div>
  );
};

export default TrueFocus;
