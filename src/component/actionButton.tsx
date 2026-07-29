import { FileText } from "lucide-react";
import { FolderOpen } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="flex flex-wrap items-center gap-2 lg:gap-3">
      {/* Download CV */}
      
        <a href="/Muhamad-Fathi-Farhat_CV.pdf"
        download="Muhamad-Fathi-Farhat_CV.pdf"
        className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-md border border-black/15 bg-[#e6e6e6] text-black text-[11px] lg:text-xs font-mono whitespace-nowrap cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:bg-[#c9c9c9]"
      >
        <FileText size={14} className="shrink-0" />
        Download CV
      </a>

      <button className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-5 py-2 lg:py-2.5 rounded-md border border-white/65 bg-[#000000] text-white text-[11px] lg:text-xs font-mono whitespace-nowrap cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-white/100">
        <FolderOpen size={14} className="shrink-0" />
        View Project
      </button>
    </div>
  );
}