import { Slider } from "@/components/ui/slider"
import { useState } from 'react'

interface VolumeFaderProps {
  side: 'left' | 'right'
}

export default function VolumeFader({ side }: VolumeFaderProps) {
  const [volume, setVolume] = useState(75)

  return (
    <div className="flex flex-col items-center">
      <Slider
        orientation="vertical"
        min={0}
        max={100}
        step={1}
        value={[volume]}
        onValueChange={(value: number[]) => setVolume(value[0])}
        className="h-32"
      />
      <span className="mt-2 text-sm font-semibold text-white">{side === 'left' ? 'Deck A' : 'Deck B'}</span>
    </div>
  )
}