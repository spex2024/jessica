"use client"

import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play } from 'lucide-react'

interface VideoDialogProps {
  videoSrc: string
}

export function VideoDialog({ videoSrc }: VideoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Play className="mr-2 h-4 w-4" />
          Play Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <video src={videoSrc} controls className="w-full" />
      </DialogContent>
    </Dialog>
  )
}

