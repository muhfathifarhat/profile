import { useEffect } from "react";

interface WordItem {
  text: string;
  color: string;
}

const WORDS: WordItem[] = [
  { text: "Analysis", color: "#EF4444" },
  { text: "Cleaning", color: "#F59E0B" },
  { text: "Processing", color: "#10B981" },
  { text: "Exploration", color: "#3B82F6" },
  { text: "Visualization", color: "#8B5CF6" },
  { text: "Welcome", color: "#FFFFFF" },
];

const QUICK_WORD_DURATION = 200;
const WELCOME_DURATION = 1100;
const FADE_OUT_DURATION = 500;

// Titik mulai (delay) tiap kata, dihitung kumulatif.
const START_TIMES = WORDS.map((_, i) => QUICK_WORD_DURATION * i);
const TOTAL_WORDS_DURATION =
  QUICK_WORD_DURATION * (WORDS.length - 1) + WELCOME_DURATION;
const TOTAL_DURATION = TOTAL_WORDS_DURATION + FADE_OUT_DURATION;

export default function Intro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(onComplete, TOTAL_DURATION);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      style={{
        animation: `introFadeOut ${FADE_OUT_DURATION}ms ease forwards`,
        animationDelay: `${TOTAL_WORDS_DURATION}ms`,
      }}>
      <div className="relative w-full max-w-2xl h-16 md:h-20 flex items-center justify-center px-4">
        {WORDS.map((word, i) => {
          const isWelcome = i === WORDS.length - 1;
          const duration = isWelcome ? WELCOME_DURATION : QUICK_WORD_DURATION;

          return (
            <h1
              key={word.text}
              className={`absolute text-center ${isWelcome ? "text-3xl md:text-5xl" : "text-xl md:text-3xl"}`}
              style={{
                fontFamily: '"Press Start 2P", monospace',
                color: word.color,
                letterSpacing: "0.05em",
                opacity: 0,
                textShadow: `0 0 2px ${word.color}, 0 0 10px ${word.color}, 0 0 10px ${word.color}`,
                animation: `${isWelcome ? "introWordWelcome" : "introWordQuick"} ${duration}ms ${isWelcome ? "ease-out" : "linear"} forwards`,
                animationDelay: `${START_TIMES[i]}ms`,
              }}>
              {word.text}
            </h1>
          );
        })}
      </div>

      <style>{`
        @keyframes introWordQuick {
          0%   { opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes introWordWelcome {
          0%   { opacity: 0; transform: translateY(12px) scale(0.85); }
          35%  { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes introFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
