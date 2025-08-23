import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css"

import Header from "@/components/Header"
import ScrollToTopButton from "@/components/ScrolltoTop"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Infra.Health",
  description: "Healthcare Infrastructure Solutions",
}

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"], 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        <Header />
        <main>{children}</main>
         <ScrollToTopButton />
         <Footer/>
      </body>
    </html>
  )
}
