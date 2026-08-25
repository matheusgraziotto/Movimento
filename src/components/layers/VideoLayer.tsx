import React, { useState, useRef, useEffect } from 'react';
import { QuizLayer } from '../../types';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { getSavedVideoBlob } from '../../utils/videoStorage';

interface VideoLayerProps {
  layer: QuizLayer;
}

export const VideoLayer: React.FC<VideoLayerProps> = ({ layer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string>(() => {
    if (
      layer.content?.video &&
      typeof layer.content.video === 'string' &&
      !layer.content.video.includes('<')
    ) {
      return layer.content.video;
    }
    return '/video-final-desafio50.mp4';
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load custom video from IndexedDB if previously saved
  useEffect(() => {
    let active = true;
    getSavedVideoBlob().then((blob) => {
      if (active && blob) {
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div className="w-full my-3 flex flex-col items-center" id="quiz-video-layer">
      {/* Video Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onClick={togglePlay}
        className="relative w-full max-w-[380px] sm:max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-800 bg-black cursor-pointer group select-none transition-all"
      >
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover"
        />

        {/* Big Center Play Button Overlay when Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1px] transition-all">
            <div className="w-20 h-20 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-200 ring-4 ring-white/30">
              <Play className="w-10 h-10 ml-1 fill-white" />
            </div>
            <p className="mt-4 text-white text-xs sm:text-sm font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full bg-black/70 border border-white/20">
              Toca para reproducir video
            </p>
          </div>
        )}

        {/* Video Controls Bar */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5 transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Slider */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:h-2 transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs font-medium">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1 hover:text-blue-400 transition-colors"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-1 hover:text-blue-400 transition-colors"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <span>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (videoRef.current) videoRef.current.currentTime = 0;
                }}
                className="p-1 hover:text-blue-400 transition-colors"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1 hover:text-blue-400 transition-colors"
                aria-label="Pantalla completa"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


