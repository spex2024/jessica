"use client"

import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer 
      className="bg-[#0D0D0D] border-t-2 border-[#FFCC33]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="flex flex-col items-center justify-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-[#FFCC33] text-lg font-semibold mb-2">
            Jessica Daniels
          </p>
          <p className="text-[#FFCC33]/80 text-sm text-center max-w-md">
            Transforming ideas into captivating digital experiences
          </p>
          <div className="mt-4 w-16 h-1 bg-[#FFCC33] rounded-full"/>
          <p className="mt-4 text-[#FFCC33]/60 text-xs">
            © {currentYear} Jessica Daniels. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

