'use client'

import { useState, useEffect } from 'react'
import { TooltipProvider } from "@/components/ui/tooltip"
import Deck from './Deck'
import TrackLibrary from './TrackLibrary'
import MixerControls from './MixerControls'
import { Track } from "../types";
import { djInterfaceStyles as styles } from '@/app/styles/djInterface'

export default function DJInterface() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [crossfaderValue, setCrossfaderValue] = useState(50)
  const [loadedTracks, setLoadedTracks] = useState<{ left: Track | null, right: Track | null }>({ left: null, right: null })
  const [loopActive, setLoopActive] = useState<{ left: boolean, right: boolean }>({ left: false, right: false })
  const [headphoneCue, setHeadphoneCue] = useState<{ left: boolean, right: boolean }>({ left: false, right: false })
  const [filterValues, setFilterValues] = useState<{ left: number, right: number }>({ left: 50, right: 50 })
  const [masterVolume, setMasterVolume] = useState(75)

  useEffect(() => {
    const initialTracks: Track[] = [
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
    setTracks(initialTracks)
  }, [])

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleLoadTrack = (side: 'left' | 'right', track: Track) => {
    console.log(`Loading track for ${side} deck:`, track);
    setLoadedTracks(prev => {
      const newState = { ...prev, [side]: track };
      console.log("New loadedTracks state:", newState);
      return newState;
    });
  }

  const toggleHeadphoneCue = (side: 'left' | 'right') => {
    setHeadphoneCue(prev => ({ ...prev, [side]: !prev[side] }))
  }

  const handleFilterChange = (side: 'left' | 'right', value: number) => {
    setFilterValues(prev => ({ ...prev, [side]: value }))
  }

  useEffect(() => {
    console.log("loadedTracks updated:", loadedTracks);
  }, [loadedTracks]);

  return (
    <TooltipProvider>
      <div className="container-wide bg-black min-h-screen">
        <div className="content-wide max-w-full py-8">
          <h3 className="text-4xl font-bold text-center mb-8 text-blue-400">TuneFusion</h3>
 
                <div className="mb-8"> {/* Added margin-bottom here */}</div>
          <div className="deck-grid">
            <Deck
              side="left"
              loadedTrack={loadedTracks.left}
              onLoadTrack={handleLoadTrack}
              loopActive={loopActive.left}
              setLoopActive={(active) => setLoopActive(prev => ({ ...prev, left: active }))}
              headphoneCue={headphoneCue.left}
              toggleHeadphoneCue={() => toggleHeadphoneCue('left')}
              filterValue={filterValues.left}
              onFilterChange={(value) => handleFilterChange('left', value)}
            />
            <TrackLibrary
              tracks={filteredTracks}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Deck
              side="right"
              loadedTrack={loadedTracks.right}
              onLoadTrack={handleLoadTrack}
              loopActive={loopActive.right}
              setLoopActive={(active) => setLoopActive(prev => ({ ...prev, right: active }))}
              headphoneCue={headphoneCue.right}
              toggleHeadphoneCue={() => toggleHeadphoneCue('right')}
              filterValue={filterValues.right}
              onFilterChange={(value) => handleFilterChange('right', value)}
            />
          </div>
          
        </div>
      </div>
    </TooltipProvider>
  )
}