
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, ListMusic } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from './ui/use-toast';

function Player() {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    repeat,
    shuffle,
    play,
    pause,
    setVolume,
    setTime,
    setDuration,
    nextTrack,
    previousTrack,
    toggleRepeat,
    toggleShuffle
  } = usePlayer();

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setTime(value[0]);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleQueue = () => {
    toast({
      title: "🚧 Cola de reproducción",
      description: "Esta función no está implementada aún—¡pero podés pedirla en tu próximo prompt! 🚀"
    });
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-black/80 backdrop-blur-md border-t border-white/10 z-50 flex items-center px-4">
      {/* Track Info */}
      <div className="flex items-center w-1/4">
        <img 
          className="w-16 h-16 object-cover rounded-lg"
          alt={`Cover de ${currentTrack.title}`}
         src="https://images.unsplash.com/photo-1701403320634-89390f3f417f" />
        <div className="ml-4">
          <h3 className="font-semibold text-white">{currentTrack.title}</h3>
          <Link to={`/artist/${currentTrack.artist_handle}`} className="text-sm text-gray-400 hover:underline">
            {currentTrack.artist_name}
          </Link>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex-1 w-1/2 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4 mb-2">
          <Button variant="ghost" size="icon" onClick={toggleShuffle} className={shuffle ? 'text-purple-400' : 'text-gray-400'}>
            <Shuffle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={previousTrack} className="text-gray-200">
            <SkipBack className="w-6 h-6" />
          </Button>
          <Button size="icon" onClick={isPlaying ? pause : play} className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextTrack} className="text-gray-200">
            <SkipForward className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleRepeat} className={repeat ? 'text-purple-400' : 'text-gray-400'}>
            <Repeat className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center w-full max-w-lg space-x-2">
          <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration || 0}
            step={1}
            onValueChange={handleSeek}
            className="flex-1"
          />
          <span className="text-xs text-gray-400">{formatTime(duration || 0)}</span>
        </div>
      </div>

      {/* Volume and Queue */}
      <div className="w-1/4 flex items-center justify-end space-x-4">
        <Button variant="ghost" size="icon" onClick={handleQueue} className="text-gray-400">
          <ListMusic className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-2 w-32">
          <Button variant="ghost" size="icon" onClick={() => setVolume(volume > 0 ? 0 : 0.8)} className="text-gray-400">
            {volume > 0 ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={(value) => setVolume(value[0])}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.file_url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
        loop={repeat}
      />
    </footer>
  );
}

export default Player;
