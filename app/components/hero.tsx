'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2 } from 'lucide-react'

const brands = [
  "Essence Medical Lab",
  "Jamila Homes",
  "Doxa Open University",
  "1990 Media",
  "Elite Mum",
  "Study X",
  "Pari Rework",
  "Miss International Ghana",
  "Melcom Ghana",
  "Perbi Cubs"
]

const Typewriter = ({ text, delay = 100 }:{text:string , delay:number}) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return <span>{currentText}</span>
}

const AudioVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  const bars = 50
  const controls = useAnimation()

  useEffect(() => {
    if (isPlaying) {
      controls.start(i => ({
        height: Math.random() * 100 + '%',
        transition: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: i * 0.02
        }
      }))
    } else {
      controls.stop()
      controls.set({ height: '20%' })
    }
  }, [isPlaying, controls])

  return (
    <div className="flex items-end h-20 w-full space-x-1">
      {[...Array(bars)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          animate={controls}
          className="w-1 bg-[#FFCC33]"
          style={{ height: '20%' }}
        />
      ))}
    </div>
  )
}

const VoiceParticles = () => {
    return (
      <div className="absolute inset-0 z-1 w-full h-full">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              r={Math.random() * 3 + 1}
              fill="#FFCC33"
              filter="url(#glow)"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
          {[...Array(3)].map((_, i) => (
            <motion.path
              key={`wave-${i}`}
              d="M0 50 Q25 30 50 50 T100 50"
              fill="none"
              stroke="#FFCC33"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              initial={{
                pathLength: 0,
                pathOffset: 1,
              }}
              animate={{
                pathLength: 1,
                pathOffset: 0,
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </svg>
      </div>
    );
  };
  

const BrandCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length)
    }, 3000) // Change brand every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-20 overflow-hidden">
      {brands.map((brand, index) => (
        <motion.div
          key={brand}
          className="absolute w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : 20
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <span className="text-xl font-medium text-[#FFCC33]">{brand}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#0D0D0D] text-[#FFCC33] flex items-center justify-center overflow-hidden relative">
      <VoiceParticles />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <h1 className="text-6xl font-bold tracking-tight lg:text-7xl">
              <Typewriter text="Jessica Daniels" delay={100} />
            </h1>
            <p className="text-3xl font-light text-[#FFCC33]">
              Voice that Captivates
            </p>
            <p className="text-xl text-[#FFCC33] max-w-2xl">
              Elevate your project with professional voice overs that bring stories to life. From commercials to animations, I deliver quality that resonates.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-[#FFCC33] text-[#0D0D0D] hover:bg-[#FFCC33]/90 relative overflow-hidden group transition-all duration-300 ease-out rounded-full shadow-lg"
              >
                <span className="relative z-10 font-semibold">Explore My Works</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:translate-x-2">
                  →
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg bg-[#FFCC33]/20 px-8 py-6 border-2 border-[#FFCC33] text-[#FFCC33] hover:bg-[#FFCC33]/10 relative overflow-hidden group transition-all duration-300 ease-out rounded-full shadow-lg"
              >
                <span className="relative z-10 font-semibold">Book Now</span>
                <span className="absolute inset-0 bg-[#FFCC33] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:-translate-x-2">
                  ←
                </span>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-[#FFCC33]/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
              <div className="mb-6">
                <AudioVisualizer isPlaying={isPlaying} />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Listen to my demo reel</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="bg-[#FFCC33] text-[#0D0D0D] rounded-full p-4 hover:bg-[#FFCC33]/90 transition-all duration-300"
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Volume2 size={20} className="text-[#FFCC33]" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full accent-[#FFCC33]"
                      />
                    </div>
                    <div className="h-2 bg-[#FFCC33]/30 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFCC33] w-1/2"></div>
                    </div>
                  </div>
                </div>
                <audio
                  ref={audioRef}
                  src="https://res.cloudinary.com/dzqw3brbh/video/upload/v1733446705/jamila_Africa_2_gfxg2f.wav"
                  className="hidden"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <p className="text-[#FFCC33] mb-6 text-center text-2xl font-semibold">Trusted by global brands</p>
          <BrandCarousel />
        </motion.div>
      </div>
    </div>
  )
}

