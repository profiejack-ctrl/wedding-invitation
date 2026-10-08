import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { invitationData } from '../config/invitationData';

// Global YouTube API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface MusicPlayerProps {
  autoPlayTriggered: boolean;
  visible: boolean;
}

function parseYouTubeUrl(url: string): { videoId: string | null; startTime: number } {
  try {
    let videoId: string | null = null;
    let startTime = 0;

    // Match start time (?t=19, &t=19s, or &start=19)
    const timeMatch = url.match(/[?&](?:t|start)=(\d+)/);
    if (timeMatch) {
      startTime = parseInt(timeMatch[1], 10);
    }

    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/')[1].split(/[?&#]/);
      videoId = parts[0];
    } else if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v');
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1].split(/[?&#]/)[0];
    }

    return { videoId, startTime };
  } catch {
    return { videoId: null, startTime: 0 };
  }
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTriggered, visible }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);

  const { videoId: ytVideoId, startTime: ytStartSeconds } = parseYouTubeUrl(invitationData.audio.url);
  const isYouTube = Boolean(ytVideoId);

  // Initialize YouTube Player
  const initYouTubePlayer = useCallback(() => {
    if (!ytVideoId || !window.YT || !window.YT.Player) return;

    if (ytPlayerRef.current) return;

    try {
      ytPlayerRef.current = new window.YT.Player('youtube-audio-player', {
        height: '1',
        width: '1',
        videoId: ytVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: ytVideoId,
          start: ytStartSeconds,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            setPlayerReady(true);
          },
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING is 1, PAUSED is 2, ENDED is 0
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2 || event.data === 0) {
              setIsPlaying(false);
            }
          },
          onError: (err: any) => {
            console.log('YouTube Player Error:', err);
          },
        },
      });
    } catch (e) {
      console.log('Error initializing YouTube Player:', e);
    }
  }, [ytVideoId, ytStartSeconds]);

  // Load YouTube IFrame API Script if not loaded
  useEffect(() => {
    if (!isYouTube) {
      // Standard HTML5 Audio fallback
      const audio = new Audio(invitationData.audio.url);
      audio.loop = true;
      audio.preload = 'auto';
      audioRef.current = audio;

      return () => {
        audio.pause();
        audio.src = '';
      };
    }

    if (window.YT && window.YT.Player) {
      initYouTubePlayer();
    } else {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initYouTubePlayer();
      };
    }

    return () => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [isYouTube, initYouTubePlayer]);

  // Handle Autoplay Trigger when Guest Clicks "Open Invitation"
  useEffect(() => {
    if (!autoPlayTriggered) return;

    if (isYouTube) {
      const attemptPlay = () => {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
          try {
            ytPlayerRef.current.unMute();
            ytPlayerRef.current.setVolume(100);
            ytPlayerRef.current.playVideo();
            setIsPlaying(true);
          } catch (e) {
            console.log('YouTube autoplay prevented:', e);
          }
        }
      };

      if (playerReady) {
        attemptPlay();
      } else {
        const interval = setInterval(() => {
          if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
            attemptPlay();
            clearInterval(interval);
          }
        }, 200);
        setTimeout(() => clearInterval(interval), 5000);
      }
    } else if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log('Audio autoplay prevented:', err);
          setIsPlaying(false);
        });
    }
  }, [autoPlayTriggered, isYouTube, playerReady]);

  const togglePlay = () => {
    if (isYouTube) {
      if (!ytPlayerRef.current || typeof ytPlayerRef.current.playVideo !== 'function') return;

      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        ytPlayerRef.current.unMute();
        ytPlayerRef.current.setVolume(100);
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      }
    } else {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Audio play error:', err));
      }
    }
  };

  return (
    <>
      {/* Hidden YouTube IFrame container - pre-mounted for seamless playback */}
      {isYouTube && (
        <div
          style={{
            position: 'fixed',
            bottom: '-100px',
            left: '-100px',
            width: '1px',
            height: '1px',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -1,
          }}
          aria-hidden="true"
        >
          <div id="youtube-audio-player" />
        </div>
      )}

      {/* Floating Music Control Button - visible when invitation is opened */}
      {visible && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
            className={`group relative flex h-13 w-13 min-h-[48px] min-w-[48px] items-center justify-center rounded-full border border-beige-400/90 bg-white/95 shadow-[0_8px_25px_-5px_rgba(36,51,36,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-500 ${
              isPlaying ? 'ring-2 ring-sage-600/50 ring-offset-2 ring-offset-beige-50' : ''
            }`}
          >
            {/* Rotating vinyl background ring */}
            <div
              className={`absolute inset-0 rounded-full border border-dashed border-sage-500/60 transition-transform ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              aria-hidden="true"
            />

            {isPlaying ? (
              <div className="relative flex items-center justify-center">
                <Volume2 className="h-5 w-5 text-sage-800 transition-transform group-hover:scale-110" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oldpink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-oldpink-600"></span>
                </span>
              </div>
            ) : (
              <VolumeX className="h-5 w-5 text-gray-500 transition-transform group-hover:scale-110" />
            )}
          </button>

          {/* Floating mini track badge with Soundwave indicator */}
          {isPlaying && (
            <div className="absolute right-15 top-2 hidden items-center space-x-2 whitespace-nowrap rounded-full border border-beige-300 bg-white/95 px-3.5 py-1.5 text-xs text-sage-900 shadow-md backdrop-blur-md sm:flex">
              {/* Equalizer Soundwave Bars */}
              <div className="flex items-center space-x-0.5 h-3.5" aria-hidden="true">
                <span className="w-1 bg-sage-600 rounded-full soundwave-bar-1" />
                <span className="w-1 bg-oldpink-500 rounded-full soundwave-bar-2" />
                <span className="w-1 bg-sage-600 rounded-full soundwave-bar-3" />
              </div>
              <span className="max-w-[150px] truncate font-medium">{invitationData.audio.title}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};
