'use client'

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Play, Pause, ChevronDown } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

// Define types for the items
interface VoiceOverItem {
  title: string
  audioSrc: string
}

interface VideoItem {
  title: string
  videoSrc: string
}

interface EmceeItem {
  title: string
  imageSrc: string
  description: string
}

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState<string>("voice-over-audio")
  const [isVoiceOverExpanded, setIsVoiceOverExpanded] = useState<boolean>(false)
  const [isEmceeExpanded, setIsEmceeExpanded] = useState<boolean>(false)

  // States to track playing audio, current time and duration
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [audioStates, setAudioStates] = useState<Map<number, { currentTime: number, duration: number }>>(new Map())

  // Refs for audio elements to control playback
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])

  // Function to format time
  const formatTime = useCallback((time: number): string => {
    return `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`
  }, [])

  const handleTimeUpdate = useCallback((audio: HTMLAudioElement, index: number): void => {
    if (playingIndex === index) {
      const currentAudioState = { currentTime: audio.currentTime, duration: audio.duration || 0 }
      setAudioStates(prev => new Map(prev.set(index, currentAudioState)))
    }
  }, [playingIndex])

  const handleSeek = useCallback((time: number): void => {
    if (playingIndex !== null && audioRefs.current[playingIndex]) {
      audioRefs.current[playingIndex]!.currentTime = time
    }
  }, [playingIndex])

  const playAudio = useCallback((index: number): void => {
    if (playingIndex === index) {
      // Pause the current audio if the same index is clicked again
      setPlayingIndex(null);
      audioRefs.current[index]?.pause();
    } else {
      if (playingIndex !== null) {
        // Pause the previous audio only if it's not null
        audioRefs.current[playingIndex]?.pause();
      }
  
      // Play the new audio and update playingIndex
      setPlayingIndex(index);
      audioRefs.current[index]?.play();
    }
  }, [playingIndex]);
  
  

  const voiceOverItems: VoiceOverItem[] = [
    { title: "Jamila Homes", audioSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446902/jamila_africa_1_yhyoyc.wav" },
    { title: "Miss International Ghana", audioSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446886/miss_international_ghana_01_nggeti.wav" },
    { title: "PARI REWORK", audioSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446818/PARI_REWORK_01_zvmdqz.wav" },
    { title: "ELITE MUMS", audioSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446787/elite_mums_final_3_zxtsln.mp3" },
    { title: "STUDY X", audioSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446394/StudyX_hoa2cr.mp3" },
    { title: "PERBI CUBS", audioSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446364/Perbi_cubs_2_zarbms.mp3" },
    { title: "MELCOM GHANA", audioSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446335/Melcom_ad_sample_jnmaqv.mp3" },
  ]

  const videoItems: VideoItem[] = [
    { title: "Essence Medical Lab", videoSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446839/VIDEO-2023-03-10-14-28-39_czcalo.mp4" },
    { title: "1990 Music Video Promo", videoSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733447025/Video_Promo_kwa2kq.mp4" },
    { title: "1990 Music Video Promo", videoSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733447094/Year_End_Promo_c8mssg.mp4" },
    { title: "Dox Open University", videoSrc: "https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446914/VID_36600929_090917_588_upyuht.mp4" },
  ]

  const emceeItems: EmceeItem[] = [
    { title: "Tech Conference 2022", imageSrc: "/emcee-event1.jpg", description: "Hosted the annual TechCon, engaging over 5000 attendees" },
    { title: "Charity Gala", imageSrc: "/emcee-event2.jpg", description: "Led a successful fundraiser, raising over $1M for children's education" },
    { title: "Industry Awards Night", imageSrc: "/emcee-event3.jpg", description: "Emceed the prestigious annual awards, celebrating industry achievements" },
    { title: "Product Launch Event", imageSrc: "/emcee-event4.jpg", description: "Unveiled the latest tech innovations to a global audience" },
    { title: "Corporate Team Building", imageSrc: "/emcee-event5.jpg", description: "Facilitated engaging activities for a Fortune 500 company" },
    { title: "International Film Festival", imageSrc: "/emcee-event6.jpg", description: "Hosted the opening and closing ceremonies of a renowned film festival" },
  ]

  return (
    <section id="portfolio" className="w-full py-20 md:py-32 bg-white">
      <style jsx>{`
        :global(:root) {
          --gold: #D4AF37;
          --gold-light: #F4E5B5;
          --gold-dark: #996515;
        }
      `}</style>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-12 text-center text-secondary">
            My Work
          </h2>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex justify-center mb-8 bg-white border-b border-secondary">
              {["voice-over-audio", "voice-over-video", "emcee"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`px-6 py-3 text-lg font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "text-gold-dark border-b-2 border-gold"
                      : "text-gray-600 hover:text-gold"
                  }`}
                >
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </TabsTrigger>
              ))}
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="voice-over-audio" className="mt-0">
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {voiceOverItems.slice(0, isVoiceOverExpanded ? voiceOverItems.length : 6).map((item, index) => (
                      <Card key={index} className="bg-white border border-secondary overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/50">
                        <CardContent className="p-6">
                          <h4 className="text-xl font-semibold mb-4 text-secondry">{item.title}</h4>
                          <div className=" rounded-lg p-4">
                            <audio
                              ref={(el) => (audioRefs.current[index] = el)}
                              src={item.audioSrc}
                              onTimeUpdate={(e) => handleTimeUpdate(e.target as HTMLAudioElement, index)}
                              className="hidden"
                            />
                            <div className="flex items-center justify-between mb-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => playAudio(index)}
                                className="text-secondary hover:text-black"
                                aria-label={playingIndex === index ? "Pause" : "Play"}
                              >
                                {playingIndex === index ? (
                                  <Pause className="h-6 w-6" />
                                ) : (
                                  <Play className="h-6 w-6" />
                                )}
                              </Button>
                              <div className="flex-1 mx-4">
                                <Slider
                                  value={[audioStates.get(index)?.currentTime || 0]}
                                  max={audioStates.get(index)?.duration || 100}
                                  step={0.1}
                                  onValueChange={(value) => handleSeek(value[0])}
                                  className="cursor-pointer"
                                  aria-label="Audio progress"
                                />
                              </div>
                              <div className="text-sm font-medium text-secondary">
                                {formatTime(audioStates.get(index)?.currentTime || 0)} /
                                {formatTime(audioStates.get(index)?.duration || 0)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {!isVoiceOverExpanded && voiceOverItems.length > 6 && (
                    <div className="text-center mt-8">
                      <Button
                        onClick={() => setIsVoiceOverExpanded(true)}
                        className="bg-secondary text-black hover:bg-gold-dark"
                      >
                        Load More
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="voice-over-video" className="mt-0">
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {videoItems.map((item, index) => (
                      <Card key={index} className="bg-white border border-secondary overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/50">
                        <CardContent className="p-6">
                          <div className="relative aspect-video w-full mb-4 rounded-lg overflow-hidden">
                            <video
                              controls
                              src={item.videoSrc}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="text-lg font-semibold text-secondary">{item.title}</h4>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="emcee" className="mt-0">
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {emceeItems.slice(0, isEmceeExpanded ? emceeItems.length : 6).map((item, index) => (
                      <Card key={index} className="bg-white border border-secondary overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold-light/50">
                        <CardContent className="p-6">
                          <div className="relative aspect-video w-full mb-4 rounded-lg overflow-hidden">
                            <Image
                              src={item.imageSrc}
                              alt={item.title}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <h4 className="text-lg font-semibold mb-2 text-secondary">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {!isEmceeExpanded && emceeItems.length > 6 && (
                    <div className="text-center mt-8">
                      <Button
                        onClick={() => setIsEmceeExpanded(true)}
                        className="bg-gold text-white hover:bg-gold-dark"
                      >
                        Load More
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio

