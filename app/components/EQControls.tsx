import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EQControlsProps {
  side: 'left' | 'right'
}

export default function EQControls({ side }: EQControlsProps) {
  const [eqValues, setEqValues] = useState([0, 0, 0, 0, 0])
  const frequencies = ['60 Hz', '230 Hz', '910 Hz', '3.6 kHz', '14 kHz']
  const frequencyRanges = ['20-120 Hz', '120-500 Hz', '500-2k Hz', '2k-8k Hz', '8k-20k Hz']

  const handleSliderChange = (index: number, value: number[]) => {
    const newEqValues = [...eqValues]
    newEqValues[index] = value[0]
    setEqValues(newEqValues)
  }

  const handlePresetChange = (preset: string) => {
    switch (preset) {
      case 'bass-boost':
        setEqValues([6, 3, 0, 0, 0])
        break
      case 'vocal-enhance':
        setEqValues([0, -2, 2, 4, 1])
        break
      case 'treble-boost':
        setEqValues([0, 0, 2, 4, 6])
        break
      default:
        setEqValues([0, 0, 0, 0, 0])
    }
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg max-w-xl">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-semibold text-metallic-blue-400">Equalizer</h3>
        <Select onValueChange={handlePresetChange}>
          <SelectTrigger className="w-[180px] bg-gray-800 text-metallic-blue-300 border-gray-700 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
            <SelectValue placeholder="Preset" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 rounded-lg">
            <SelectItem value="flat">Flat</SelectItem>
            <SelectItem value="bass-boost">Bass Boost</SelectItem>
            <SelectItem value="vocal-enhance">Vocal Enhance</SelectItem>
            <SelectItem value="treble-boost">Treble Boost</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between items-end h-64 mb-2">
        {frequencies.map((freq, index) => (
          <div key={freq} className="flex flex-col items-center">
            <span className="text-xs text-metallic-blue-300 mb-1">+12 dB</span>
            <div className="relative h-48 w-12 bg-gray-800 rounded-lg p-2 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200">
              <Slider
                orientation="vertical"
                min={-12}
                max={12}
                step={1}
                value={[eqValues[index]]}
                onValueChange={(value) => handleSliderChange(index, value)}
                className="h-full hover:scale-105 transition-transform duration-200"
              />
              <div
                className="absolute bottom-0 left-1/2 w-1 bg-metallic-blue-400 transition-all duration-200 rounded-t-full"
                style={{
                  height: `${((eqValues[index] + 12) / 24) * 100}%`,
                  opacity: 0.2 + ((eqValues[index] + 12) / 24) * 0.8,
                  transform: 'translateX(-50%)',
                }}
              />
            </div>
            <span className="text-xs text-metallic-blue-300 mt-1">-12 dB</span>
            <span className="text-xs text-metallic-blue-400 mt-2">{freq}</span>
            <span className="text-[10px] text-metallic-blue-500 mt-1">{frequencyRanges[index]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}