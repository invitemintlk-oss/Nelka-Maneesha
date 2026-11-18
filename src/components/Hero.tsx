import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { FloatingPetals } from './FloatingPetals';

interface HeroProps {
  event?: string | null;
  inviteeName?: string;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  return touch;
}

export const Hero: React.FC<HeroProps> = ({ event = 'both', inviteeName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const useParallax = !reducedMotion && !isTouch;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-950">
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={useParallax ? { y: y1, scale } : undefined}
      >
        <img
          src="/images/457b7ffc34299f8cbf388654f080c496.jpg"
          alt="Golden curtain of fairy lights"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 45%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />
      </motion.div>

      <div className="absolute inset-5 sm:inset-8 border border-[#E8CF8E]/30 rounded-3xl pointer-events-none z-20 hidden sm:block" />
      <div className="absolute inset-6 sm:inset-9 border border-[#E8CF8E]/15 rounded-[1.3rem] pointer-events-none z-20 hidden sm:block" />

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 w-full max-w-5xl"
        style={useParallax ? { opacity } : undefined}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <p className="font-serif italic text-white/90 text-lg sm:text-2xl max-w-xl leading-relaxed">
            &ldquo;I have found the one whom my soul loves.&rdquo;
          </p>
          <span className="text-[#E8CF8E] uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-semibold mt-3 mb-8 sm:mb-10">
            Song of Solomon 3:4
          </span>

          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-[#E8CF8E] to-transparent" />
            <Heart className="w-5 h-5 text-[#E8CF8E] fill-[#E8CF8E]/30 animate-pulse" />
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-[#E8CF8E] to-transparent" />
          </div>

          <h1 className="font-display text-white text-6xl sm:text-8xl lg:text-9xl leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] py-2">
            Nelka <br className="sm:hidden" />
            <span className="text-[#E8CF8E] text-5xl sm:text-7xl lg:text-8xl mx-2 sm:mx-4">&</span>
            <br className="sm:hidden" />
            Maneesha
          </h1>

          <p className="mt-6 sm:mt-8 text-[#F3E3B5] font-serif text-xl sm:text-2xl tracking-[0.25em] uppercase">
            Thursday &middot; 07 January 2027
          </p>

          <p className="mt-8 sm:mt-10 mb-16 text-[1.05rem] sm:text-xl font-serif italic text-white/90 px-2 max-w-xl leading-relaxed">
            {inviteeName
              ? <>We cordially invite <span className="text-[#E8CF8E] not-italic font-semibold">{inviteeName}</span> to join us with your cherished presence and prayers</>
              : 'Together with our parents, we request the honour of your presence and prayers'}
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-30">
        <div className="w-[1px] h-28 bg-gradient-to-b from-transparent via-brand-plum to-transparent" />
        <div className="bg-stone-900/90 backdrop-blur-md px-2.5 py-6 rounded-full border border-brand-plum/40 shadow-xl">
          <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.7em] text-brand-rose font-bold font-sans">
            St. Anthony's Church • Weliweriya
          </p>
        </div>
        <div className="w-[1px] h-28 bg-gradient-to-t from-transparent via-brand-plum to-transparent" />
      </div>

      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-30">
        <div className="w-[1px] h-28 bg-gradient-to-b from-transparent via-brand-plum to-transparent" />
        <div className="bg-stone-900/90 backdrop-blur-md px-2.5 py-6 rounded-full border border-brand-plum/40 shadow-xl">
          <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.7em] text-brand-rose font-bold font-sans rotate-180">
            Save the Date • January 2027
          </p>
        </div>
        <div className="w-[1px] h-28 bg-gradient-to-t from-transparent via-brand-plum to-transparent" />
      </div>

      <motion.div
        className="absolute bottom-0 sm:bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.5em] text-white font-semibold bg-white/10 px-5 py-2 rounded-full border border-[#E8CF8E]/50 backdrop-blur-md shadow-lg">
          Discover
        </span>
        <div className="w-[1px] h-6 sm:h-16 bg-gradient-to-b from-[#E8CF8E] to-transparent animate-bounce" />
      </motion.div>
    </div>
  );
};
