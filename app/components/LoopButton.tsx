import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface LoopButtonProps {
  active: boolean
  setActive: (active: boolean) => void
}

export default function LoopButton({ active, setActive }: LoopButtonProps) {
  const [loopLength, setLoopLength] = useState(16)
  const [loopStart, setLoopStart] = useState<number | null>(null)
  const [loopEnd, setLoopEnd] = useState<number | null>(null)

  const increaseLoop = () => setLoopLength(prev => Math.min(prev * 2, 64))
  const decreaseLoop = () => setLoopLength(prev => Math.max(prev / 2, 1))

  const setManualLoopStart = () => setLoopStart(Date.now())
  const setManualLoopEnd = () => setLoopEnd(Date.now())

  const toggleLoop = () => {
    if (active) {
      setLoopStart(null)
      setLoopEnd(null)
    }
    setActive(!active)
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <span className="text-white text-xs">LOOP</span>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-gray-300 hover:bg-gray-700 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-md"
          onClick={decreaseLoop}
          disabled={loopLength <= 1 || !active}
        >
          <ChevronLeftIcon />
        </Button>

        <div className="bg-gray-800 text-white px-4 py-2 rounded">
          {loopLength}-beat
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-gray-300 hover:bg-gray-700 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-md"
          onClick={increaseLoop}
          disabled={loopLength >= 64 || !active}
        >
          <ChevronRightIcon />
        </Button>
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <Button
          variant="ghost"
          className={`text-white hover:bg-gray-700 transition-all duration-200 ease-in-out ${
            active ? "bg-gray-400 text-black" : "bg-gray-800"
          }`}
          onClick={toggleLoop}
        >
          {active ? "Deactivate Loop" : "Activate Loop"}
        </Button>

        <div className="flex space-x-2">
          <Button
            variant="ghost"
            className="text-white hover:bg-gray-700 transition-all duration-200 ease-in-out"
            onClick={setManualLoopStart}
            disabled={!active}
          >
            Set Start
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-gray-700 transition-all duration-200 ease-in-out"
            onClick={setManualLoopEnd}
            disabled={!loopStart || !active}
          >
            Set End
          </Button>
        </div>
      </div>

      {loopStart && loopEnd && (
        <div className="mt-2 text-xs text-gray-400">
          <p>Loop Start: {new Date(loopStart).toLocaleTimeString()}</p>
          <p>Loop End: {new Date(loopEnd).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  )
}