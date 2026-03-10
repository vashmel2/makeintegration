import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "MakeIntegration — The Missing Toolkit for Make.com Builders",
    template: "%s | MakeIntegration",
  },
  description:
    "Free tools, deep tutorials, and a template marketplace for Make.com automation builders.",
  keywords: ["make.com", "make integration", "automation", "no-code", "webhook", "scenario"],
  openGraph: {
    siteName: "MakeIntegration",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
