import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-4 relative z-20">

      {/* WhatsApp */}
      
        <a href="https://wa.me/628xxxxxxxxxx"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
      >
        <FaWhatsapp size={24} />
      </a>

      {/* Email */}
      
        <a href="mailto:email@gmail.com"
        className="text-gray-400 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
      >
        <MdEmail size={24} />
      </a>

      {/* LinkedIn */}
      
        <a href="https://linkedin.com/in/username"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
      >
        <FaLinkedin size={24} />
      </a>

      {/* GitHub */}
      
        <a href="https://github.com/username"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
      >
        <FaGithub size={24} />
      </a>

    </div>
  );
}