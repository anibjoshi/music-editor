import EQControls from './EQControls'
import MasterVolumeKnob from './MasterVolumeKnob'
import Crossfader from './Crossfader'

interface MixerControlsProps {
  crossfaderValue: number
  setCrossfaderValue: (value: number) => void
  masterVolume: number
  setMasterVolume: (value: number) => void
}

export default function MixerControls({ 
  crossfaderValue, 
  setCrossfaderValue,
  masterVolume,
  setMasterVolume
}: MixerControlsProps) {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg border border-gray-700 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex flex-col items-center space-y-4">
          <MasterVolumeKnob value={masterVolume} onChange={setMasterVolume} />
          <Crossfader value={crossfaderValue} onChange={setCrossfaderValue} />
        </div>
      </div>
    </div>
  )
}