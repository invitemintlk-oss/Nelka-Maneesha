import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Church, GlassWater } from 'lucide-react';

interface CeremonyDetailsProps {
  event?: string | null;
}

const items = [
  { icon: Calendar, title: 'Thursday, 07 January 2027', lines: [] as string[] },
  { icon: Church, title: 'Holy Mass', lines: ['3.15 P.M.', "St. Anthony's Church, Weliweriya"] },
  { icon: GlassWater, title: 'Reception', lines: ['From 6.00 P.M. onwards', 'The Lakeside, Gampaha'] },
];

export const CeremonyDetails: React.FC<CeremonyDetailsProps> = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        <div className="lg:w-1/2 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="text-brand-plum uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[11px] sm:text-xs font-bold">
                The Sacred Union
              </span>
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-brand-plum/60 to-transparent" />
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display text-stone-800 mb-8 leading-[1.1]">
              A Celebration of <br />
              <span className="text-brand-plum">Faith & Love</span>
            </h2>

            <p className="text-stone-500/90 font-serif text-lg sm:text-xl leading-relaxed mb-14 max-w-lg">
              Join us as we exchange our vows before God, surrounded by the warmth and prayers of our loved ones.
            </p>

            <div className="relative space-y-12 ml-10 sm:ml-12 border-l-[1.5px] border-brand-lavender/30 pl-10 sm:pl-12 py-4">
              {items.map(({ icon: Icon, title, lines }) => (
                <div key={title} className="relative group flex items-center min-h-[48px]">
                  <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-lavender/40 shadow-lg flex items-center justify-center group-hover:border-brand-plum transition-all duration-500">
                    <Icon className="w-5 h-5 text-brand-plum" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl sm:text-3xl text-stone-800 group-hover:text-brand-plum transition-colors duration-500">
                      {title}
                    </h4>
                    {lines.map((line) => (
                      <p key={line} className="text-stone-500/90 font-serif text-base sm:text-lg mt-1">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="lg:w-1/2 w-full max-w-md lg:max-w-none relative"
        >
          <div className="absolute -inset-3 sm:-inset-4 border border-brand-plum/30 rounded-t-full rounded-b-[2rem] translate-x-2 translate-y-2" />
          <div className="relative aspect-[3/4] rounded-t-full rounded-b-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <img
              src="/images/0bb8c9295b522723665a78801e1871dd.jpg"
              alt="Candlelit garden reception under lanterns"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
