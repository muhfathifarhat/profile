import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";

interface ContactLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  hoverBorder: string;
  hoverShadow: string;
}

const contactLinks: ContactLink[] = [
  {
    icon: <Mail size={18} className="text-indigo-400" />,
    label: "Gmail",
    href: "mailto:youremail@gmail.com", // ganti dengan email asli kamu
    hoverBorder: "hover:border-indigo-400/60",
    hoverShadow: "hover:shadow-[0_0_20px_-5px_rgba(129,140,248,0.5)]",
  },
  {
    icon: <FaGithub size={18} className="text-gray-200" />,
    label: "GitHub",
    href: "https://github.com/yourusername", // ganti dengan URL GitHub asli kamu
    hoverBorder: "hover:border-white/40",
    hoverShadow: "hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.35)]",
  },
  {
    icon: <FaWhatsapp size={18} className="text-emerald-400" />,
    label: "WhatsApp",
    href: "https://wa.me/6285155259996", // ganti dengan nomor asli kamu
    hoverBorder: "hover:border-emerald-400/60",
    hoverShadow: "hover:shadow-[0_0_20px_-5px_rgba(52,211,153,0.5)]",
  },
];

export default function ContactSection() {
  return (
    <>
      {/* SECTION 4 - Kontak */}
      <section
        id="contact"
        className="relative w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-24 bg-[#000000] text-white">
        {/* Judul */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 [font-family:'Poppins',sans-serif] ">
            Kontak Saya
          </h2>
          <span className="w-32 h-0.5 rounded-full bg-[#f7c200] " />
        </motion.div>

        {/* Tombol kontak */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md font-semibold text-sm transition-colors duration-300 ${link.hoverBorder} ${link.hoverShadow}`}>
              {link.icon}
              {link.label}
            </motion.a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/5 bg-[#000000] py-6 px-4">
        <p className="text-center text-xs text-gray-500">
          © Muhm.thi
        </p>
      </footer>
    </>
  );
}
