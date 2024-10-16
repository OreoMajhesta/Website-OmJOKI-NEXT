'use client'

import ContactWhatsApp from "../../components/ContactWhatsApp";
import Footer from "../../components/Footer";
import { useTheme } from "../functions/ThemeContext";

export default function ContactPage() {
   const { isDarkTheme } = useTheme();
   return (
      <div className={`transition-colors duration-500 ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-slate-100 text-black'}`}>
         <div className="px-4 lg:px-0 top-20 pt-28">
            <ContactWhatsApp />
         </div>
         <Footer />
      </div>
   );
}