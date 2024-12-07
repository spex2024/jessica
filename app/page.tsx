"use client"



import Portfolio from './components/portfolio'
import AboutSection from './components/about'
import Hero from './components/hero'
import Testimonials from './components/testimonial'
import { ContactSection } from './components/contact'

export default function Home() {


  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      {/* Hero Section */}
      <Hero/>

      {/* About Section */}
      <AboutSection/>

      {/* Portfolio Section */}
      < Portfolio/>
      {/* Testimonials Section */}
       <Testimonials/>

      {/* Contact Section */}
       <ContactSection/>
    </div>
  )
}

