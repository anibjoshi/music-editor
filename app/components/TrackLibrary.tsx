import { trackLibraryStyles as styles } from '@/app/styles/trackLibrary'
import { Track } from "@/types"
import { Input } from "@/components/ui/input"

interface TrackLibraryProps {
  tracks: Track[]
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function TrackLibrary({ tracks, searchTerm, setSearchTerm }: TrackLibraryProps) {
  return (
    <div className={`${styles.container} bg-black`}>
      <h2 className={`${styles.title} text-blue-400`}>Track Library</h2>
      <Input
        type="text"
        placeholder="Search tracks..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        className="mb-4 bg-gray-900 border-gray-800 text-blue-300 placeholder-blue-500"
      />
      <div className="flex-grow overflow-y-auto space-y-2">
        {tracks.map(track => (
          <div key={track.id} className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer group shadow-md">
            <div className="font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-200">{track.title}</div>
            <div className="text-sm text-blue-300">{track.artist}</div>
            <div className="text-xs text-blue-500">
              BPM: {track.bpm} | Key: {track.key}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}