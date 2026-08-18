import Lanyard from "./Lanyard";
import LanyardStatic from "./LanyardStatic";
import TrueFocus from "./TrueFocus";
import TextType from "./TextType";
import TechBadges from "./techBadges";
import ExploreButton from "./Explore";
import { motion } from "motion/react";
import { useResponsiveAnchorX } from "./useResponsiveAnchorX";

interface HeroSectionProps {
  showIntro: boolean;
}

export default function HeroSection({ showIntro }: HeroSectionProps) {
  const { anchorX, position } = useResponsiveAnchorX();
  return (
    <>
      {/* SECTION 1 */}
      <section
        id="home"
        className="relative w-full lg:h-dvh text-white px-4 md:px-10 lg:px-10 xl:px-20 py-10 pb-32 lg:pb-0 overflow-x-hidden lg:overflow-hidden bg-black">
        {/* BACKGROUND GRID */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)
      `,
            backgroundSize: "50px 50px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at center, black 30%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse 80% 70% at center, black 30%, transparent 70%)",
          }}
        />

        {/* LANYARD STATIC - HANYA di mobile murni (< md), menggantung di atas konten */}
        {!showIntro && (
          <div className="md:hidden absolute top-0 left-0 right-0 h-[35vh] z-30 pointer-events-none flex justify-center pt-4">
            <LanyardStatic strapHeight={100} cardWidth={170} cardHeight={230} />
          </div>
        )}

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 h-full gap-8 md:gap-4 lg:gap-0 ">
          {/* Spacer khusus mobile murni, karena lanyard mobile posisinya absolute di atas */}
          <div className="block md:hidden h-[35vh]" />

          {/* KIRI - Content */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center items-center md:items-start lg:items-end px-4 md:px-0 lg:px-8 gap-4 md:h-full lg:h-full md:ml-16 md:mt-14 lg:ml-0 lg:mt-0">
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-md min-h-[460px] md:min-h-[480px] lg:min-h-[525px] mt-16 md:mt-0 lg:mt-24">
              {/* Outer Glow */}
              <div
                className="absolute -top-16 -left-16 md:-top-20 md:-left-16 lg:-top-24 lg:-left-28 w-[420px] h-[420px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px] rounded-full pointer-events-none"
                style={{
                  background: `
                    radial-gradient(
                      circle,
                      rgba(255, 222, 160, 0.10) 30%,
                      rgba(255, 222, 160, 0.06) 35%,
                      rgba(255, 222, 160, 0.03) 100%,
                      transparent 85%
                    )
                  `,
                  filter: "blur(70px)",
                }}
              />

              {/* Inner Glow */}
              <div
                className="absolute -top-4 -left-12 md:-top-5 md:-left-12 lg:-top-6 lg:-left-20 w-[220px] h-[220px] md:w-[260px] md:h-[260px] lg:w-[330px] lg:h-[330px] rounded-full pointer-events-none"
                style={{
                  background: `
                    radial-gradient(
                      circle,
                      rgba(255, 245, 220, 0.45) 0%,
                      rgba(255, 225, 170, 0.28) 25%,
                      rgba(255, 210, 120, 0.12) 50%,
                      transparent 75%
                    )
                  `,
                  filter: "blur(35px)",
                }}
              />
              <motion.div className="absolute inset-0 px-5 sm:px-6 md:px-0 lg:px-8 py-6 md:py-0 lg:py-8 flex flex-col gap-3 md:gap-4 lg:gap-4 items-start justify-center">
                {/* Badge HELLO, WELCOME */}
                <div className="relative inline-block mb-2 md:mb-3 lg:mb-3 -rotate-3 -translate-x-2">
                  <span className="inline-block bg-[#ffffff1a] border border-white/10 text-white font-mono text-xs sm:text-sm md:text-sm lg:text-base tracking-wide px-3 md:px-4 lg:px-4 py-1 rounded-lg uppercase">
                    Hello, Welcome
                  </span>
                </div>

                <div className="flex justify-start w-full mb-4 md:mb-5 lg:mb-6">
                  <TrueFocus
                    sentence="Data|Analyst"
                    separator="|"
                    colors={["#ffffff", "#8e8e8e"]}
                    manualMode={false}
                    blurAmount={5}
                    animationDuration={0.5}
                    pauseBetweenAnimations={0.3}
                    delay={2000}
                  />
                </div>

                <div className="flex justify-start w-full text-base md:text-lg lg:text-lg font-mono tracking-wide text-[#888888]">
                  <TextType
                    text={["Welcome!", "Fresh Graduate", "Junior Data Analyst"]}
                    typingSpeed={100}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="_"
                    deletingSpeed={40}
                  />
                </div>

                <p className="font-thin font-mono text-sm md:text-base lg:text-base text-start leading-relaxed max-w-xs md:max-w-sm lg:max-w-sm text-[#b4b4b4]">
                  Database queries, Data processing, Data transformation, Data
                  analysis, Data visualization.
                </p>

                <TechBadges />

                <p className="font-mono font-light text-xs md:text-xs lg:text-xs text-start leading-relaxed max-w-sm text-[#525252]">
                  ↓ Explore my work
                </p>
              </motion.div>
            </div>
          </div>

          {/* KANAN - Lanyard */}
          {/* md–lg: LanyardStatic tampil di kolom kanan. >= lg: kosong, karena Lanyard 3D real ambil alih via overlay absolute di bawah. */}
          <div className="hidden md:flex md:col-span-6 lg:col-span-6 items-center justify-center relative">
            {!showIntro && (
              <div className="lg:hidden">
                <LanyardStatic
                  strapHeight={140}
                  cardWidth={210}
                  cardHeight={290}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LANYARD 3D - tampil di 1024px KE ATAS (desktop) */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-dvh z-30 pointer-events-none">
        <div className="pointer-events-auto">
          <Lanyard
            position={position}
            gravity={[0, -40, 0]}
            ropeLength={0.9}
            anchorX={anchorX}
            lanyardWidth={0.7}
          />
        </div>
        {/* Explore my work */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <ExploreButton />
        </div>
      </div>
    </>
  );
}
