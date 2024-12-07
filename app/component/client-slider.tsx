"use client"

import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { motion } from 'framer-motion'

const clients = [
  { name: "Client 1", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Client 2", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Client 3", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Client 4", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Client 5", logo: "/placeholder.svg?height=80&width=200" },
  { name: "Client 6", logo: "/placeholder.svg?height=80&width=200" },
]

export function ClientSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/5">
      <div className="container px-4 md:px-6">
        <motion.h2 
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Trusted by Industry Leaders
        </motion.h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        >
          <CarouselContent>
            {clients.map((client, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <motion.div 
                  className="p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={200}
                    height={80}
                    className="mx-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

