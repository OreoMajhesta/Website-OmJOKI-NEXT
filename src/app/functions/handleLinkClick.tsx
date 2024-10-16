'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function useHandleLinkClick() {
   const router = useRouter()

   const handleLinkClick = useCallback((path: string, scrollTo?: string) => {
      if (path === "back") {
         router.back()
      } else {
         router.push(path)
         if (scrollTo) {
            setTimeout(() => {
               const section = document.getElementById(scrollTo)
               if (section) {
                  section.scrollIntoView({ behavior: 'smooth' })
               }
            }, 200)
         }
      }
   }, [router])

   return handleLinkClick
}