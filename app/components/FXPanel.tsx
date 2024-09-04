import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PlusIcon, MinusIcon } from 'lucide-react';

interface FXPanelProps {
  side: 'left' | 'right'
}

export default function FXPanel({ side }: FXPanelProps) {
    const [effects, setEffects] = useState([
      { type: 'Echo Out', intensity: 0 },
      { type: 'Phaser', intensity: 0 },
      { type: 'Reverb', intensity: 0 },
    ])
  
    const effectOptions = ['Echo Out', 'Phaser', 'Reverb', 'Filter', 'Flanger', 'Cut', 'FBCK', 'LEN']
  
    const handleEffectChange = (index: number, newType: string) => {
      const newEffects = [...effects]
      newEffects[index] = { ...newEffects[index], type: newType }
      setEffects(newEffects)
    }
  
    const handleIntensityChange = (index: number, newIntensity: number) => {
      const newEffects = [...effects]
      newEffects[index] = { ...newEffects[index], intensity: newIntensity }
      setEffects(newEffects)
    }
  
    const handleAddRemoveEffect = (index: number) => {
      if (effects.length < 3) {
        setEffects([...effects, { type: effectOptions[0], intensity: 0 }])
      } else {
        const newEffects = effects.filter((_, i) => i !== index)
        setEffects(newEffects)
      }
    }
  
    return (
      <div className="max-w-xl bg-gray-900 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-metallic-blue-400 mb-4">FX Panel</h3>
        <div className="bg-gray-800 p-4 rounded-lg">
          {effects.map((effect, index) => (
            <div key={index} className="mb-4 flex items-center space-x-2">
              <Select
                value={effect.type}
                onValueChange={(value) => handleEffectChange(index, value)}
              >
                <SelectTrigger className="w-[100px] bg-gray-900 text-metallic-blue-300 border-gray-700 text-xs h-8 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
                  <SelectValue placeholder="Select effect" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 rounded-lg">
                  {effectOptions.map((option) => (
                    <SelectItem key={option} value={option} className="text-metallic-blue-300 hover:bg-gray-800 text-xs">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-grow">
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[effect.intensity]}
                  onValueChange={(value) => handleIntensityChange(index, value[0])}
                  className="w-full hover:scale-105 transition-transform duration-200"
                />
              </div>
              <span className="text-metallic-blue-300 text-xs w-8">{effect.intensity}%</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleAddRemoveEffect(index)}
                className="bg-gray-900 hover:bg-gray-800 text-metallic-blue-300 border-gray-700 h-8 w-8 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                {effects.length < 3 ? <PlusIcon className="h-3 w-3" /> : <MinusIcon className="h-3 w-3" />}
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
}