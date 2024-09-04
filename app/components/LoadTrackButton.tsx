import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UploadIcon } from 'lucide-react'
import { Track } from "../types"  // Update this import path if necessary

interface LoadTrackButtonProps {
  side: 'left' | 'right'
  onLoadTrack: (side: 'left' | 'right', track: Track) => void
}

export default function LoadTrackButton({ side, onLoadTrack }: LoadTrackButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const trackList: Track[] = [
    { 
      id: '1', 
      title: 'I Wanna Dance With Somebody', 
      artist: 'Whitney Houston', 
      bpm: 128, 
      key: 'C', 
      duration: 210,
      audioUrl: '/test-music/i-wanna-dance-with-somebody.mp3'
    },
    { 
      id: '2', 
      title: 'Dancing Queen', 
      artist: 'ABBA', 
      bpm: 140, 
      key: 'Am', 
      duration: 195,
      audioUrl: '/test-music/dancing-queen.mp3'
    },
    { 
      id: '3', 
      title: 'Livin On A Prayer', 
      artist: 'Bon Jovi', 
      bpm: 132, 
      key: 'G', 
      duration: 225,
      audioUrl: '/test-music/livin-on-a-prayer.mp3'
    },
  ];

  const handleTrackSelect = (track: Track) => {
    onLoadTrack(side, track)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mb-4 bg-gradient-to-b from-gray-700 to-gray-800 border-gray-600 text-white hover:bg-gray-600 hover:text-gray-300 transition-all duration-200 shadow-md">
          <UploadIcon className="mr-2 h-4 w-4" /> Load Track
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Select a track to load</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {trackList.map((track) => (
            <Button 
              key={track.id}
              onClick={() => handleTrackSelect(track)} 
              className="bg-gradient-to-b from-gray-700 to-gray-800 text-white hover:bg-gray-600 shadow-md"
            >
              {track.title} - {track.artist}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}