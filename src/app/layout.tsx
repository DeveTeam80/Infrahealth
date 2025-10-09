import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import Script from "next/script"
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NQMPECPECD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NQMPECPECD');
          `}
        </Script>

        <Header />
        <main>{children}</main>
        <ScrollToTopButton />
        <Script
          src="//code.tidio.co/eazja8bemk1t8p69mhhzqrbxcr99nyeo.js"
          async
        />
        <Footer/>
      </body>
    </html>
  )
}
