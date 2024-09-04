import { Slider } from "@/components/ui/slider"

interface PitchSliderProps {
  pitch: number
  setPitch: (pitch: number) => void
}

export default function PitchSlider({ pitch, setPitch }: PitchSliderProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-metallic-blue-400 mb-4">Pitch Control</h3>
      <div className="h-64 flex items-center bg-gray-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-full w-12 flex items-center justify-center">
          <Slider
            orientation="vertical"
            min={-8}
            max={8}
            step={0.1}
            value={[pitch]}
            onValueChange={(value: number[]) => setPitch(value[0])}
            className="h-full hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="ml-2 h-full flex flex-col justify-between text-xs text-metallic-blue-300">
          <span>+8%</span>
          <span className="w-4 h-0.5 bg-metallic-blue-400"></span>
          <span>0%</span>
          <span className="w-4 h-0.5 bg-metallic-blue-400"></span>
          <span>-8%</span>
        </div>
      </div>
    </div>
  )
}