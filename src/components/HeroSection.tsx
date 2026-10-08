import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { invitationData } from '../config/invitationData';
import { FloralDivider, FloralCorner } from './FloralDecorations';

export const HeroSection: React.FC = () => {
  const scrollToNext = () => {
    const coupleSection = document.getElementById('couple-section');
    if (coupleSection) {
      coupleSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between py-12 px-4 text-center overflow-hidden">
      {/* Decorative corners */}
      <FloralCorner position="top-left" className="top-2 left-2" />
      <FloralCorner position="top-right" className="top-2 right-2" />

      {/* Header Badge & Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-lg mx-auto"
      >
        <span className="inline-flex items-center space-x-1.5 rounded-full bg-sage-100/95 px-4 py-1.5 font-cinzel text-xs font-semibold tracking-[0.22em] text-sage-800 uppercase border border-sage-300/90 shadow-sm mb-4">
          <Sparkles className="h-3 w-3 text-sage-600" />
          <span>The Wedding Invitation</span>
        </span>

        <p className="font-serif italic text-sm sm:text-base text-gray-700 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
          Together with our families, we joyfully invite you to celebrate our special day
        </p>
      </motion.div>

      {/* Couple Name and Visual Centerpiece in Old Pink with Arched Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="relative z-10 my-4 flex flex-col items-center w-full"
      >
        <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-md">
          <div className="text-center">
            <h1 className="font-script text-6xl sm:text-7xl lg:text-8xl text-oldpink-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)]">
              {invitationData.couple.groom.name}
            </h1>
            <div className="my-1.5 flex items-center justify-center space-x-3">
              <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-beige-400 to-sage-400" />
              <span className="font-serif italic text-2xl sm:text-3xl text-sage-700 font-normal">
                &
              </span>
              <span className="h-[1px] w-14 bg-gradient-to-l from-transparent via-beige-400 to-sage-400" />
            </div>
            <h1 className="font-script text-6xl sm:text-7xl lg:text-8xl text-oldpink-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)]">
              {invitationData.couple.bride.name}
            </h1>
          </div>
        </div>

        <FloralDivider className="my-2" />

        {/* Date and Location Badge in Luxury Glass Card */}
        <div className="glass-card-luxury mt-2 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 rounded-2xl px-6 py-3.5 shadow-sm text-sm text-gray-800">
          <div className="flex items-center space-x-2 text-sage-900 font-semibold">
            <Calendar className="h-4 w-4 text-sage-600" />
            <span className="font-serif tracking-wide">{invitationData.event.displayDate}</span>
          </div>
          <span className="hidden sm:inline text-beige-400 font-light">|</span>
          <div className="flex items-center space-x-2 text-gray-700 font-medium">
            <MapPin className="h-4 w-4 text-oldpink-600" />
            <span className="text-xs sm:text-sm">Bali, Indonesia</span>
          </div>
        </div>
      </motion.div>

      {/* Quote card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 max-w-md mx-auto glass-card-subtle rounded-2xl p-5 border border-sage-200/90 text-center shadow-sm"
      >
        <p className="font-serif italic text-xs sm:text-sm text-gray-700 leading-relaxed">
          {invitationData.couple.quote.text}
        </p>
        <p className="font-cinzel text-[11px] text-sage-800 font-semibold tracking-wider mt-2.5 uppercase">
          — {invitationData.couple.quote.author}
        </p>
      </motion.div>

      {/* Scroll Down Prompt Button */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="relative z-10 mt-6 min-h-[44px] flex flex-col items-center justify-center text-sage-700 hover:text-sage-950 transition-colors cursor-pointer focus:outline-none"
        aria-label="Scroll down to couple profiles"
      >
        <span className="font-cinzel text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-1">
          Scroll Down
        </span>
        <ChevronDown className="h-4 w-4 text-sage-600" />
      </motion.button>
    </section>
  );
};
