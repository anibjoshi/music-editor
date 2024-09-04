import { Slider } from "@/components/ui/slider"

interface CrossfaderProps {
  value: number
  onChange: (value: number) => void
}

export default function Crossfader({ value, onChange }: CrossfaderProps) {
  return (
    <div className="w-64 relative">
      <Slider
        min={0}
        max={100}
        step={1}
        value={[value]}
        onValueChange={(newValue: number[]) => onChange(newValue[0])}
        className="[&>span:first-child]:h-2 [&>span:first-child]:bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500"
      />
      <div className="absolute top-full left-0 text-xs font-semibold text-white">Deck A</div>
      <div className="absolute top-full right-0 text-xs font-semibold text-white">Deck B</div>
      <div
        className="absolute bottom-full left-1/2 w-1 h-3 bg-white"
        style={{ transform: 'translateX(-50%)' }}
      />
    </div>
  )
}