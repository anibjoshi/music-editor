import React, { useState } from 'react';
import { Track } from "../types";
import LoadTrackButton from './LoadTrackButton'
import Waveform from './Waveform'
import JogWheel from './JogWheel'
import PitchSlider from './PitchSlider'
import AnimatedTooltipButton from './AnimatedTooltipButton'
import LoopButton from './LoopButton'
import EQControls from './EQControls'
import FilterKnob from './FilterKnob'
import Pads from './Pads'
import { PlayIcon, PauseIcon } from 'lucide-react'
import { deckStyles as styles } from '@/app/styles/deck'
import FXPanel from './FXPanel'

interface DeckProps {
  side: 'left' | 'right'
  loadedTrack: Track | null
  onLoadTrack: (side: 'left' | 'right', track: Track) => void
  loopActive: boolean
  setLoopActive: (active: boolean) => void
  headphoneCue: boolean
  toggleHeadphoneCue: () => void
  filterValue: number
  onFilterChange: (value: number) => void
}

export default function Deck({
  side,
  loadedTrack,
  onLoadTrack,
  loopActive,
  setLoopActive,
  headphoneCue,
  toggleHeadphoneCue,
  filterValue,
  onFilterChange
}: DeckProps) {
  const [pitch, setPitch] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`${styles.container} flex flex-col h-full max-w-full bg-black`}>
      <h2 className={`${styles.title} text-center mb-4 text-blue-400`}>{side === 'left' ? 'Deck A' : 'Deck B'}</h2>
      <LoadTrackButton side={side} onLoadTrack={onLoadTrack} />
      <div className="flex-grow">
        <Waveform 
          loadedTrack={loadedTrack}
          loopActive={loopActive}
          filterValue={filterValue}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      </div>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-400">
            {loadedTrack ? loadedTrack.title : 'No track loaded'}
          </span>
          <span className="text-sm text-blue-300">
            {loadedTrack ? `${loadedTrack.bpm} BPM - ${loadedTrack.key}` : '--'}
          </span>
        </div>
        <div className="bg-gray-900 p-3 rounded-lg shadow-inner">
          <div className="flex justify-between items-center mb-3">
            <AnimatedTooltipButton text="Cue" tooltip="Cue" onClick={() => {}} className="flex-1 mr-2" />
            <AnimatedTooltipButton 
              icon={isPlaying ? <PauseIcon /> : <PlayIcon />} 
              tooltip={isPlaying ? "Pause" : "Play"} 
              onClick={handlePlayPause}
              className="flex-1 mx-2"
            />
            <AnimatedTooltipButton text="Sync" tooltip="Sync" onClick={() => setPitch(0)} className="flex-1 ml-2" />
          </div>
          <div className="bg-gray-700 p-3 rounded-lg">
            <LoopButton active={loopActive} setActive={setLoopActive} />
          </div>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div className="flex-1">
            <PitchSlider pitch={pitch} setPitch={setPitch} />
          </div>
          <div className="flex-1">
            <JogWheel side={side} isPlaying={isPlaying} />
          </div>
        </div>
        <div className="space-y-4 bg-gray-900 p-3 rounded-lg shadow-inner">
          <EQControls side={side} />
          <Pads side={side} />
          <FXPanel side={side} />
        </div>
      </div>
    </div>
  )
}