import { Slider } from "@/components/ui/slider"

interface FilterKnobProps {
  value: number
  onChange: (value: number) => void
}

export default function FilterKnob({ value, onChange }: FilterKnobProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 rounded-full bg-gradient-to-b from-gray-700 to-gray-800 border-2 border-white cursor-pointer relative overflow-hidden transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-md"
        style={{
          transform: `rotate(${(value - 50) * 3.6}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        onClick={() => onChange(value < 50 ? 100 : 0)}
      >
        <div
          className="absolute top-0 left-1/2 w-1 h-3 bg-white rounded-full"
          style={{ transform: 'translateX(-50%)' }}
        />
        <div 
          className="absolute inset-1 rounded-full bg-white opacity-20"
          style={{
            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((value / 100 * 360 * Math.PI) / 180)}% ${50 - 50 * Math.sin((value / 100 * 360 * Math.PI) / 180)}%)`
          }}
        />
      </div>
      <Slider
        min={0}
        max={100}
        step={1}
        value={[value]}
        onValueChange={(newValue: number[]) => onChange(newValue[0])}
        className="w-32 mt-2"
      />
      <span className="mt-1 text-xs text-white">
        {value < 50 ? 'Low-Pass' : 'High-Pass'} Filter
      </span>
    </div>
  )
}