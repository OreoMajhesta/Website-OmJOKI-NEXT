"use client"

import Invoice from "@/components/Invoice";
import { useTheme } from "../functions/ThemeContext";
import Footer from "@/components/Footer";

export default function HomePage() {
   const { isDarkTheme } = useTheme();
   return (
      <div className={`transition-colors duration-500 ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-slate-100 text-black'}`}>
         <div className="px-4 lg:px-0 top-20 pt-28">
            <Invoice />
         </div>
         <Footer />
      </div>
   );
}