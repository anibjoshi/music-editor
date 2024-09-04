import { VolumeIcon } from 'lucide-react'

interface MasterVolumeKnobProps {
  value: number
  onChange: (value: number) => void
}

export default function MasterVolumeKnob({ value, onChange }: MasterVolumeKnobProps) {
  const angle = (value / 100) * 270 - 135; // Map 0-100 to -135 to 135 degrees

  return (
    <div className="relative w-32 h-32">
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-700 to-gray-800 shadow-inner"></div>
      <div 
        className="absolute inset-1 rounded-full bg-white opacity-20"
        style={{
          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle * Math.PI) / 180)}% ${50 - 50 * Math.sin((angle * Math.PI) / 180)}%)`
        }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/2 w-1 h-16 bg-white origin-bottom rounded-full"
        style={{ transform: `translate(-50%, -100%) rotate(${angle}deg)` }}
      ></div>
      <div className="absolute inset-4 rounded-full bg-gray-900 flex items-center justify-center shadow-inner">
        <VolumeIcon className="w-8 h-8 text-white" />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-bold text-white">
        {value}%
      </div>
    </div>
  )
}