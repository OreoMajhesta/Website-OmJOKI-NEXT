'use client'

import { useParams } from 'next/navigation'
import gamesdata from "../../../../public/assets/data/GamesData"
import Footer from "@/components/Footer"
import Order from "@/components/Order"
import { useTheme } from "@/app/functions/ThemeContext"

export default function OrderPage() {
   const { isDarkTheme } = useTheme()
   const params = useParams()
   const gameId = parseInt(params.gameId as string, 10)

   return (
      <div className={`transition-colors duration-500 ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-slate-100 text-black'}`}>
         <div className="px-4 sm:px-4 top-20 pt-28">
            <Order gamesData={gamesdata} gameId={gameId} />
         </div>
         <Footer />
      </div>
   )
}