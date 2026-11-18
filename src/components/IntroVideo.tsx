import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface IntroVideoProps {
  key?: React.Key;
  onComplete: () => void;
  onMusicStart?: () => void;
  readyToTransition?: boolean;
}

export const INTRO_VIDEO_URL = '/images/gemini_generated_video_bb45b609.mp4';

// Stage 1: blurred, paused video behind the names and the "View Invitation" button.
// Stage 2: after the click the video plays clearly; when it ends (or Skip) the invitation opens.
export function IntroVideo({ onComplete, onMusicStart, readyToTransition = true }: IntroVideoProps) {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const completedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!finished || !readyToTransition || completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [finished, readyToTransition, onComplete]);

  const handleOpen = () => {
    if (playing) return;
    onMusicStart?.();
    setPlaying(true);
    const video = videoRef.current;
    if (!video) {
      setFinished(true);
      return;
    }
    video.currentTime = 0;
    // If playback is blocked or the file fails, go straight to the invitation.
    video.play().catch(() => setFinished(true));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-stone-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <video
        ref={videoRef}
        // '#t=0.1' makes mobile browsers draw the first frame while the video is paused.
        src={`${INTRO_VIDEO_URL}#t=0.1`}
        muted
        playsInline
        preload="auto"
        onEnded={() => setFinished(true)}
        onError={() => playing && setFinished(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-1000 ease-out ${
          playing ? 'blur-0 scale-100' : 'blur-[8px] scale-110'
        }`}
      />

      <AnimatePresence>
        {!playing && (
          <motion.div
            key="overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="text-white/80 uppercase tracking-[0.5em] text-[10px] sm:text-xs font-semibold mb-6"
              >
                You are invited to the wedding of
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-white text-6xl sm:text-8xl lg:text-9xl leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              >
                Nelka <span className="text-[#E8CF8E]">&</span> Maneesha
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="flex items-center gap-4 mt-6 mb-12"
              >
                <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-[#E8CF8E] to-transparent" />
                <span className="text-[#F3E3B5] font-serif text-lg sm:text-2xl tracking-[0.3em]">07 . 01 . 2027</span>
                <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-[#E8CF8E] to-transparent" />
              </motion.div>

              <motion.button
                type="button"
                onClick={handleOpen}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="px-10 py-4 rounded-full border border-[#E8CF8E]/70 bg-white/10 backdrop-blur-md text-white uppercase tracking-[0.35em] text-[11px] sm:text-xs font-semibold shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:bg-[#E8CF8E] hover:text-stone-900 transition-colors duration-300 active:scale-95"
              >
                View Invitation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {playing && (
        <motion.button
          type="button"
          onClick={() => setFinished(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 right-6 z-20 px-5 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/40 text-white uppercase tracking-[0.3em] text-[10px] font-semibold hover:bg-white/20 transition-colors"
        >
          {finished ? 'Opening…' : 'Skip'}
        </motion.button>
      )}
    </motion.div>
  );
}
