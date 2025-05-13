
import React, { useEffect, useState, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export const MusicPlayer: React.FC = () => {
  const { currentDayMusic } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create an audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    // Mock URL for demo purpose - in a real app, we'd use the actual music URLs
    const mockAudioUrl = `/devotional-music-${currentDayMusic.day.toLowerCase()}.mp3`;
    audioRef.current.src = mockAudioUrl;
    
    // Auto-play functionality
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          // Auto-play was prevented
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [currentDayMusic]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          toast.error("Could not play music. Please check your browser settings.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="h-8 w-8 rounded-full hover:bg-devotional-gold/20"
        >
          {isPlaying ? (
            <VolumeX size={18} className="text-devotional-maroon" />
          ) : (
            <Volume2 size={18} className="text-devotional-maroon" />
          )}
        </Button>
        
        <div className="text-xs text-devotional-maroon font-semibold hidden sm:block">
          <span>{currentDayMusic.deity} Music</span>
        </div>
        
        <Music size={16} className="text-devotional-gold mr-1 hidden sm:block" />
      </div>
    </div>
  );
};
