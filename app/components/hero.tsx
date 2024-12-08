'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, Volume1, VolumeX } from 'lucide-react'

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
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default function HeroWithAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const volumeControlRef = useRef<HTMLDivElement>(null)

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

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeControlRef.current) return;

    const rect = volumeControlRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let newVolume = (angle + Math.PI) / (2 * Math.PI);
    newVolume = Math.max(0, Math.min(1, newVolume));

    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleEnded = () => {
        setIsPlaying(false);
      };
      const updateProgress = () => {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        setProgress(isNaN(progress) ? 0 : progress);
      };
      audioElement.addEventListener('ended', handleEnded);
      audioElement.addEventListener('timeupdate', updateProgress);
      return () => {
        audioElement.removeEventListener('ended', handleEnded);
        audioElement.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setIsVolumeControlVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              Jessica Daniels
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
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlay}
                      className="bg-[#FFCC33] text-[#0D0D0D] rounded-full p-4 hover:bg-[#FFCC33]/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFCC33] focus:ring-opacity-50"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                    </button>
                    <div className="flex-1 space-y-2">
                      <div className="relative w-full h-2 bg-[#FFCC33]/30 rounded-full overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-[#FFCC33] rounded-full"
                          style={{ width: `${progress}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-[#FFCC33]/70">
                        <span>{formatTime(progress * 0.9)}</span>
                        <span>{formatTime(90)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <button
                        onClick={() => setIsVolumeControlVisible(!isVolumeControlVisible)}
                        className="text-[#FFCC33] hover:text-[#FFCC33]/80 transition-colors duration-200 focus:outline-none"
                        aria-label="Volume Control"
                      >
                        {volume === 0 ? <VolumeX size={24} /> : volume < 0.5 ? <Volume1 size={24} /> : <Volume2 size={24} />}
                      </button>
                      {isVolumeControlVisible && (
                        <div
                          ref={volumeControlRef}
                          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 h-32 bg-[#0D0D0D] rounded-full shadow-lg flex items-center justify-center"
                          onMouseMove={handleVolumeChange}
                          onMouseDown={handleVolumeChange}
                        >
                          <div className="w-24 h-24 rounded-full border-4 border-[#FFCC33]/30 relative">
                            <div
                              className="absolute w-full h-full rounded-full overflow-hidden"
                              style={{
                                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(2 * Math.PI * volume)}% ${50 - 50 * Math.sin(2 * Math.PI * volume)}%)`
                              }}
                            >
                              <div className="w-full h-full bg-[#FFCC33]/30" />
                            </div>
                            <div
                              className="absolute w-3 h-3 bg-[#FFCC33] rounded-full transform -translate-x-1/2 -translate-y-1/2"
                              style={{
                                left: `${50 + 40 * Math.cos(2 * Math.PI * volume)}%`,
                                top: `${50 - 40 * Math.sin(2 * Math.PI * volume)}%`
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center text-[#FFCC33] font-bold text-lg">
                            {Math.round(volume * 100)}%
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-sm text-[#FFCC33]/70">
                      Volume: {Math.round(volume * 100)}%
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
      </div>
      
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[#FFCC33] text-sm mb-2">Scroll Down</span>
        <motion.div
          className="w-6 h-10 border-2 border-[#FFCC33] rounded-full p-1"
          initial={{ y: 0 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-2 h-2 bg-[#FFCC33] rounded-full"
            initial={{ y: 0 }}
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

