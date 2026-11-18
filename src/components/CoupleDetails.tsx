import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const families = [
  { name: 'Nelka', parents: 'Mr. Shehan Silva & Mrs. Ereka Sumanadasa', align: 'lg:text-right lg:items-end' },
  { name: 'Maneesha', parents: 'Mr. W.A.G. Ranasinghe & Mrs. Manel Vidhanapathirana', align: 'lg:text-left lg:items-start' },
];

export const CoupleDetails: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
      <div className="text-center mb-14 sm:mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-4 mb-6 mt-4">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-brand-plum/60" />
            <span className="text-brand-plum uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-[11px] font-semibold font-sans">
              Together With Their Parents
            </span>
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-brand-plum/60" />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 relative z-10">
        {families.map((f, i) => (
          <React.Fragment key={f.name}>
            {i === 1 && (
              <div className="flex lg:flex-col items-center gap-3 lg:px-10">
                <div className="w-12 h-[1px] lg:w-[1px] lg:h-16 bg-brand-plum/40" />
                <Heart className="w-5 h-5 text-brand-plum fill-brand-lavender/30" />
                <div className="w-12 h-[1px] lg:w-[1px] lg:h-16 bg-brand-plum/40" />
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + i * 0.2 }}
              className={`flex-1 flex flex-col items-center text-center ${f.align}`}
            >
              <h3 className="text-5xl sm:text-6xl font-display text-stone-800 mb-3">{f.name}</h3>
              <p className="text-stone-600 font-serif italic text-lg sm:text-xl max-w-sm">{f.parents}</p>
            </motion.div>
          </React.Fragment>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center text-stone-500 uppercase tracking-[0.3em] text-[11px] sm:text-xs font-semibold mt-16 leading-loose max-w-2xl mx-auto"
      >
        Request the honour of your presence to join them
        <br />
        with your cherished presence and prayers
      </motion.p>
    </div>
  );
};
