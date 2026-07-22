import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/6285111202275?text=Halo%20Admin!%20Saya%20ingin%20bertanya."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-green-500 px-5 py-3 text-white shadow-xl transition hover:scale-105 hover:bg-green-600"
    >
      <FaWhatsapp size={28} />
      <span className="hidden md:block font-semibold">Hubungi Kami</span>
    </a>
  );
}
