"use client"

import Invoice from "@/components/Invoice";
import { useTheme } from "../functions/ThemeContext";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function HomePage() {
   const { isDarkTheme } = useTheme();
   return (
      <div className={`transition-colors duration-500 ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-slate-100 text-black'}`}>
         <div className="px-4 lg:px-0 top-20 pt-28">
            <Suspense fallback={<div>Loading invoice...</div>}>
               <Invoice />
            </Suspense>
         </div>
         <Footer />
      </div>
   );
}
