"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, CalendarPlus } from 'lucide-react'

export function ContactSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 }
    }))
  }, [controls])

  const contactInfo = [
    { icon: Mail, title: "Email", content: "jessica@thejessicadaniels.com" },
    { icon: Phone, title: "Phone", content: "(555) 123-4567" },
    { icon: MapPin, title: "Location", content: "New Legon, Accra" }
  ]

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "https://facebook.com/thejessicadaniels" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/thejessicadaniels" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com/thejessicad" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/thejessicadaniels" }
  ]

  return (
    <section id="contact" className="w-full py-20 md:py-32 bg-gradient-to-br from-s via-background to-[#F4E5B5]/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-8 text-center bg-gradient-to-r from-[#FFCC33] to-[#F4E5B5] bg-clip-text text-transparent">
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-center text-[#FFCC33] mb-12">
            Ready to bring your ideas to life? Reach out and let&apos;s create something extraordinary together!
          </p>
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {contactInfo.map((item, index) => (
              <motion.div key={item.title} custom={index} animate={controls} initial={{ opacity: 0, y: 20 }}>
                <Card 
                  className={`bg-white/80 hover:bg-[#F4E5B5]/50 transition-colors cursor-pointer overflow-hidden ${activeCard === index ? 'ring-2 ring-[#FFCC33]' : ''}`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <item.icon className="w-8 h-8 text-[#FFCC33]" />
                      <Button variant="ghost" size="sm" className="text-[#FFCC33] hover:text-[#F4E5B5] hover:bg-[#FFCC33]">
                        Book Now <CalendarPlus className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-black">{item.title}</h3>
                    <p className="text-sm text-black">{item.content}</p>
                  </CardContent>
                  <div 
                    className="h-1 w-full bg-gradient-to-r from-[#FFCC33] to-[#F4E5B5] transform origin-left transition-transform duration-300 ease-in-out"
                    style={{ transform: `scaleX(${activeCard === index ? 1 : 0})` }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mb-12">
            {socialLinks.map((link, index) => (
              <SocialLink key={link.label} {...link} index={index} />
            ))}
          </div>
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#FFCC33] to-[#F4E5B5] text-white hover:opacity-90 transition-opacity"
            >
              Book Me Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SocialLink({ href, icon: Icon, label, index }: { href: string; icon: typeof Facebook; label: string; index: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#FFCC33] hover:text-[#F4E5B5] transition-colors p-2 rounded-full bg-[#F4E5B5]/50 hover:bg-[#FFCC33]"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Icon className="w-6 h-6" />
      <span className="sr-only">{label}</span>
    </motion.a>
  )
}

