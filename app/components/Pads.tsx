import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface PadsProps {
  side: 'left' | 'right'
}

export default function Pads({ side }: PadsProps) {
    const [activeMode, setActiveMode] = useState('STEMS 2.0')
    const [activeStems, setActiveStems] = useState<string[]>([])
  
    const modes = ['STEMS 2.0', 'HOTCUES', 'SLICER', 'SAMPLER']
    const stemControls = [
      'Vocal', 'Instru', 'Bass', 'Kick',
      'HiHat', 'Stems FX', '(Acapella)', '(Instrumental)'
    ]
  
    const handleModeClick = (mode: string) => {
      setActiveMode(mode)
      setActiveStems([]) // Reset active stems when changing modes
    }
  
    const handleStemClick = (stem: string) => {
      setActiveStems(prev => 
        prev.includes(stem) ? prev.filter(s => s !== stem) : [...prev, stem]
      )
    }
  
    return (
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg max-w-xl">
        <h3 className="text-lg font-semibold text-metallic-blue-400 mb-4">Performance Pads</h3>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {modes.map(mode => (
            <Button
              key={mode}
              onClick={() => handleModeClick(mode)}
              className={`h-10 text-[10px] font-bold transition-all duration-200 rounded-full shadow-md hover:shadow-lg ${
                activeMode === mode
                  ? 'bg-metallic-blue-500 text-gray-900 scale-105'
                  : 'bg-gray-800 text-metallic-blue-300 hover:bg-gray-700'
              }`}
            >
              {mode}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {stemControls.map(stem => (
            <Button
              key={stem}
              onClick={() => handleStemClick(stem)}
              className={`h-10 text-[10px] font-bold transition-all duration-200 rounded-full shadow-md hover:shadow-lg ${
                activeStems.includes(stem)
                  ? 'bg-metallic-blue-500 text-gray-900'
                  : 'bg-gray-800 text-metallic-blue-300 hover:bg-gray-700'
              }`}
            >
              {stem}
            </Button>
          ))}
        </div>
      </div>
    )
}