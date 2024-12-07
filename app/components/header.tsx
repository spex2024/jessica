"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl">The Jess Daniel</span>
          </Link>
        </div>
        <div className="flex items-center">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#portfolio" className="transition-colors hover:text-primary">
              Portfolio
            </Link>
            <Link href="#testimonials" className="transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link href="#contact" passHref>
              <Button variant="default">Contact</Button>
            </Link>
          </nav>
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 p-4">
            <Link href="#about" className="transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#portfolio" className="transition-colors hover:text-primary">
              Portfolio
            </Link>
            <Link href="#testimonials" className="transition-colors hover:text-primary">
              Testimonials
            </Link>
            <Link href="#contact" passHref>
              <Button variant="default">Contact</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

