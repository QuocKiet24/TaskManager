import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
        <p>© All Rights Reserved 2024.</p>
        <div className="flex items-center gap-4 text-xl">
          <a href="#" className="hover:text-emerald-400">
            <Facebook />
          </a>
          <a href="#" className="hover:text-emerald-400">
            <Instagram />
          </a>
          <a href="#" className="hover:text-emerald-400">
            <Linkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
