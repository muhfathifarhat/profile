"use client";

import { Building2, Calendar, MapPin } from "lucide-react";

export type ExperienceCardData = {
  role: string;
  company: string;
  period: string;
  location: string;
  highlightsLeft: string[];
  highlightsRight: string[];
};

export default function ExperienceCard({
  role,
  company,
  period,
  location,
  highlightsLeft,
  highlightsRight,
}: ExperienceCardData) {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-5 sm:p-8 border border-[#f7c200]/20">
      {/* Header: icon + role/company (kiri) — tanggal/lokasi (kanan) */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between pt-2 gap-3 sm:gap-4">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f7c200]/10 border border-[#f7c200]/20 flex items-center justify-center">
            <Building2
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#f7c200]"
              strokeWidth={2}
            />
          </div>
          <div className="text-start">
            <h3 className="text-white text-lg sm:text-2xl font-bold leading-snug [font-family:'Poppins',sans-serif]">
              {role}
            </h3>
            <p className="text-[#f7c200] text-xs sm:text-base font-mono font-medium mt-1">
              {company}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:text-right shrink-0">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm font-mono">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{period}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm font-mono">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Highlight bullets: 2 kolom di desktop, 1 kolom di mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 sm:gap-y-4 mt-5 sm:mt-6">
        <ul className="space-y-3 sm:space-y-4">
          {highlightsLeft.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#f7c200] shrink-0" />
              <span className="text-[#d4d4d4] font-mono text-sm text-start leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
        <ul className="space-y-3 sm:space-y-4">
          {highlightsRight.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#f7c200] shrink-0" />
              <span className="text-[#d4d4d4] font-mono text-sm text-start leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#f7c200]/10 mt-8 sm:mt-16" />
    </div>
  );
}