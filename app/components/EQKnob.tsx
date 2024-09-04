import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface EQKnobProps {
  label: string
}

export default function EQKnob({ label }: EQKnobProps) {
  const [value, setValue] = useState(50)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className="flex flex-col items-center transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
        >
          <div
            className="w-12 h-12 rounded-full bg-gradient-to-b from-gray-700 to-gray-800 border-2 border-white cursor-pointer relative overflow-hidden shadow-md"
            style={{
              transform: `rotate(${(value - 50) * 3.6}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
            onClick={() => setValue((prevValue) => (prevValue + 10) % 100)}
          >
            <div
              className="absolute top-0 left-1/2 w-1 h-2 bg-white rounded-full"
              style={{ transform: 'translateX(-50%)' }}
            />
            <div 
              className="absolute inset-1 rounded-full bg-white opacity-20"
              style={{
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((value / 100 * 360 * Math.PI) / 180)}% ${50 - 50 * Math.sin((value / 100 * 360 * Math.PI) / 180)}%)`
              }}
            />
          </div>
          <span className="mt-1 text-xs text-white">{label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}: {value}%</p>
      </TooltipContent>
    </Tooltip>
  )
}