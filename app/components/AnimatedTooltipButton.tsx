import React from 'react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface AnimatedTooltipButtonProps {
  icon?: React.ReactNode;
  text?: string;
  tooltip: string;
  onClick: () => void;
  className?: string;
}

export default function AnimatedTooltipButton({ icon, text, tooltip, onClick, className }: AnimatedTooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          className={`bg-gray-700 hover:bg-gray-600 text-white border-gray-600 ${className}`}
          onClick={onClick}
        >
          {icon || text}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}