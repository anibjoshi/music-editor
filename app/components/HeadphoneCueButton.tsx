import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { HeadphonesIcon } from 'lucide-react'

interface HeadphoneCueButtonProps {
  active: boolean
  onClick: () => void
}

export default function HeadphoneCueButton({ active, onClick }: HeadphoneCueButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={active ? "default" : "outline"}
          size="icon"
          onClick={onClick}
          className={`ml-2 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-md ${active ? 'bg-white text-gray-900' : 'text-white border-white'}`}
        >
          <HeadphonesIcon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{active ? 'Disable' : 'Enable'} Headphone Cue</p>
      </TooltipContent>
    </Tooltip>
  )
}