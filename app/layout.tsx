import './globals.css'
import { Montserrat } from 'next/font/google'
import { FloatingNav } from './components/floating-nav'
import { Footer } from './components/footer'


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Jessica Daniels - Voice Over Artist & Emcee',
  description: 'Professional voice over artist and emcee services by The Jess Daniel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
     
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
            <FloatingNav />
            <Footer />
          </div>
        
      </body>
    </html>
  )
}

