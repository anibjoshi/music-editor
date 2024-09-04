import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';
import { Track } from "../types";

interface WaveformProps {
  loadedTrack: Track | null;
  loopActive: boolean;
  filterValue: number;
  isPlaying: boolean;
  onPlayPause: () => void;
}

interface ExtendedWaveSurferOptions extends WaveSurferOptions {
  responsive?: boolean;
}

export default function Waveform({ loadedTrack, loopActive, filterValue, isPlaying, onPlayPause }: WaveformProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const filterEffect = filterValue < 50 
    ? `linear-gradient(90deg, rgba(0,0,0,${1 - filterValue / 50}) 0%, rgba(0,0,0,0) 100%)`
    : `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,${(filterValue - 50) / 50}) 100%)`;

  useEffect(() => {
    let isMounted = true;

    if (waveformRef.current && loadedTrack?.audioUrl) {
      const options: ExtendedWaveSurferOptions = {
        container: waveformRef.current,
        waveColor: 'rgba(77, 166, 255, 0.3)', // Metallic blue with low opacity
        progressColor: 'rgba(77, 166, 255, 0.7)', // Metallic blue with higher opacity
        cursorColor: 'rgba(77, 166, 255, 1)', // Solid metallic blue
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 80,
        barGap: 2,
      };

      const ws = WaveSurfer.create(options);
      wavesurfer.current = ws;

      ws.load(loadedTrack.audioUrl);

      ws.on('ready', () => {
        if (isMounted) {
          setDuration(ws.getDuration());
          setIsLoaded(true);
        }
      });

      ws.on('audioprocess', () => {
        if (isMounted) {
          setCurrentTime(ws.getCurrentTime());
        }
      });

      return () => {
        isMounted = false;
        if (ws) {
          ws.unAll();
          ws.destroy();
        }
      };
    }
  }, [loadedTrack]);

  useEffect(() => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [isPlaying]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (wavesurfer.current) {
      wavesurfer.current.seekTo(value / 100);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden relative shadow-inner">
      <div className="h-32 relative">
        <div className="h-full w-full flex items-center justify-center">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`w-1 mx-px bg-gradient-to-t from-metallic-blue-500 to-metallic-blue-300 transition-all duration-500 ease-in-out ${isPlaying ? 'animate-pulse' : ''}`}
              style={{
                height: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.5
              }}
            />
          ))}
        </div>
        <div ref={waveformRef} className="absolute inset-0 opacity-0" />
        {loopActive && (
          <div className="absolute top-0 left-1/4 right-1/4 h-full border-2 border-metallic-blue-400 border-opacity-50 animate-pulse" />
        )}
        <div 
          className="absolute inset-0"
          style={{ background: filterEffect }}
        />
        <div className="absolute inset-0 bg-grid-metallic-blue-400/20 pointer-events-none" style={{ backgroundSize: '20px 20px' }} />
      </div>
      
      <div className="h-10 px-4 flex items-center bg-gray-900">
        <div className="w-full">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={isLoaded ? (currentTime / duration * 100) : 0}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-metallic-blue-300 mt-1">
            <span>{isLoaded ? formatTime(currentTime) : '00:00'}</span>
            <span>{isLoaded ? formatTime(duration) : '00:00'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}