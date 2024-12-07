'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Quote } from 'lucide-react'

interface Testimonial {
  text: string
  author: string
  position: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    text: "This product has completely transformed our workflow. It's intuitive, powerful, and a joy to use every day.",
    author: "Alex Johnson",
    position: "CTO, TechCorp",
    avatar: "/placeholder.svg?height=60&width=60"
  },
  {
    text: "I can't imagine running our business without this tool. It's been a game-changer for our team's productivity.",
    author: "Samantha Lee",
    position: "Operations Manager, InnovateCo",
    avatar: "/placeholder.svg?height=60&width=60"
  },
  {
    text: "The customer support is outstanding. They've gone above and beyond to ensure our success with the platform.",
    author: "Michael Chen",
    position: "Founder, StartupX",
    avatar: "/placeholder.svg?height=60&width=60"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full py-20 md:py-32 bg-[#1B1B1B] overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4 text-[#FFCC33]">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hear what our clients have to say about their experience with our product.
          </p>
        </motion.div>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-[#1B1B1B] border border-[#FFCC33]/20">
                <CardContent className="p-8">
                  <Quote className="w-12 h-12 text-[#FFCC33] mb-6 mx-auto" />
                  <p className="italic mb-6 text-xl md:text-2xl text-center text-white">
                    &quot;{testimonials[currentIndex].text}&quot;
                  </p>
                  <div className="flex items-center justify-center">
                    <Avatar className="w-16 h-16 border-2 border-[#FFCC33]">
                      <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].author} />
                      <AvatarFallback className="bg-[#FFCC33] text-[#1B1B1B]">
                        {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 text-left">
                      <p className="font-bold text-lg text-[#FFCC33]">{testimonials[currentIndex].author}</p>
                      <p className="text-sm text-gray-400">{testimonials[currentIndex].position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFCC33]/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#FFCC33]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

