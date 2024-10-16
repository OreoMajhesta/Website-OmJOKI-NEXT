"use client"

import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../app/functions/ThemeContext';

const ContactWhatsApp = () => {
  const { isDarkTheme } = useTheme();
  const phoneNumber = '+6288216389495';
  const message = 'Halo, saya ingin bertanya tentang jasa joki Anda.';

  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className={`${isDarkTheme ? 'bg-slate-800 text-white' : 'bg-white text-black'} transition-all duration-500 p-6 rounded-lg shadow-xl`}>
        <h1 className="text-2xl font-bold mb-4">Hubungi Kami di WhatsApp</h1>
        <p className="mb-6">Jika Anda memiliki pertanyaan, klik tombol di bawah ini untuk menghubungi kami melalui WhatsApp.</p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
        >
          <FaWhatsapp className="mr-2" />
          Hubungi via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ContactWhatsApp;
