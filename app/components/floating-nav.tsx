"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, User, Briefcase, MessageSquare, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('home')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const updateActiveSection = () => {
      const sections = ['home', 'about', 'portfolio', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-6 left-2/3 transform -translate-x-1/2 bg-white/10 backdrop-blur-xl rounded-full shadow-lg z-50 border border-white/20 hidden sm:block"
    >
      <ul className="flex items-center justify-center px-4 py-2">
        {[
          { id: 'home', Icon: Home, label: 'Home' },
          { id: 'about', Icon: User, label: 'About' },
          { id: 'portfolio', Icon: Briefcase, label: 'Portfolio' },
          { id: 'contact', Icon: MessageSquare, label: 'Contact' },
        ].map(({ id, Icon, label }) => (
          <li key={id} className="mx-2 relative">
            <motion.button
              onClick={() => handleClick(id)}
              className="flex flex-col items-center p-2 rounded-full transition-all text-[#FFCC33] hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium hidden sm:inline">{label}</span>
              {activeSection === id && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-secondary rounded-full"
                  layoutId="activeSection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </li>
        ))}
        <li className="mx-2">
          <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex flex-col items-center p-2 rounded-full text-[#FFCC33] hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium hidden sm:inline">Dark</span>
              </>
            )}
          </motion.button>
        </li>
      </ul>
    </motion.nav>
  )
}

