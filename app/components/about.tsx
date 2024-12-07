"use client"

import React, { useState } from "react"
import { motion} from "framer-motion"
import {  Tv, Mic2, Users, Headphones, ArrowRight, Play, X } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

const AboutSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  }

  const experienceItems = [
    { icon: Tv, title: "Commercials", description: "For major brands", color: "from-blue-500 to-cyan-500" },
    { icon: Mic2, title: "Narration", description: "Documentaries & corporate", color: "from-purple-500 to-pink-500" },
    { icon: Users, title: "Character Voices", description: "Animation & video games", color: "from-yellow-500 to-red-500" },
    { icon: Headphones, title: "Audiobooks", description: "Various genres", color: "from-green-500 to-teal-500" }
  ]

  return (
    <section id="about" className="w-full py-20 md:py-32 bg-gradient-to-b from-background via-background to-secondary/10">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="grid gap-10 lg:grid-cols-12 items-center"
        >
          <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-8">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              As &quot;The Jess Daniel,&quot; I&apos;ve spent over a decade breathing life into stories through my voice. 
              From electrifying commercials to immersive audiobooks, my versatility and unwavering professionalism 
              ensure that each project not only meets but exceeds expectations, creating a lasting impact on its audience.
            </p>

            <motion.div
              variants={fadeInUp}
              className="space-y-8"
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">My Approach</h3>
                  <p className="text-foreground/80">
                    I believe in the transformative power of voice to evoke emotions, convey complex messages, and create unforgettable impressions.
                    My approach is a fusion of technical mastery and intuitive storytelling, ensuring that each project not only meets professional standards
                    but also forges a deep, resonant connection with its intended audience. Whether it&apos;s a commercial that sparks desire or a narration
                    that educates and inspires, I bring a nuanced understanding of tone, pacing, and emotion to every word.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Industry Experience</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {experienceItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-4 p-4 rounded-lg overflow-hidden relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />
                        <item.icon className="h-8 w-8 text-primary relative z-10" />
                        <div className="relative z-10">
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-foreground/70">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex space-x-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Explore My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="bg-background hover:bg-secondary/10">
                    Watch Demo Reel
                    <Play className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] p-0 bg-black overflow-hidden">
                  <div className="relative aspect-video">
                    <video
                      className="w-full h-full object-cover"
                      src="https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446839/VIDEO-2023-03-10-14-28-39_czcalo.mp4"
                      controls
                      autoPlay
                      loop
                    >
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={() => setIsVideoOpen(false)}
                      className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                      aria-label="Close dialog"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-7 relative"
          >
            <div className="aspect-[5/5] relative rounded-3xl overflow-hidden shadow-2xl border-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20"></div>
              <Image
                src="https://res.cloudinary.com/dzqw3brbh/image/upload/v1733460290/jess_1_hwmxr4.jpg"
                alt="Jessica Daniels"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Jessica Daniels</h3>
                  <p className="text-white/80">Professional Voice Actor</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection

