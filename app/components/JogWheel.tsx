interface JogWheelProps {
  side: 'left' | 'right'
  isPlaying: boolean
}

export default function JogWheel({ side, isPlaying }: JogWheelProps) {
  return (
    <div 
      className={`
        w-48 h-48 md:w-64 md:h-64 rounded-full 
        bg-gradient-to-b from-gray-700 to-gray-800 
        mx-auto relative overflow-hidden 
        transition-shadow duration-300 ease-in-out 
        hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] 
      `}
      style={{
        animation: isPlaying ? 'spin 60s linear infinite' : 'none'
      }}
    >
      <div className="absolute top-0 left-1/2 w-1 h-4 bg-white -translate-x-1/2" />
      <div className="absolute inset-2 rounded-full bg-gray-900 flex items-center justify-center shadow-inner">
        <div className={`text-2xl font-bold text-white`}>
          {side === 'left' ? 'A' : 'B'}
        </div>
      </div>
    </div>
  )
}