import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { invitationData } from '../config/invitationData';
import { FloralCorner, FloralDivider } from './FloralDecorations';

interface EnvelopeCoverProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({ onOpen, isOpen }) => {
  const [guestName, setGuestName] = useState<string>('Guest');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get('to') || params.get('guest') || params.get('u');
    if (recipient) {
      setGuestName(decodeURIComponent(recipient));
    }
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: { duration: 1.1, ease: [0.45, 0, 0.15, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#182319] via-[#121a13] to-[#0a100b] p-4 text-white overflow-hidden select-none"
        >
          {/* Subtle Sage Green & Old Pink ambient glow */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-sage-500/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-oldpink-500/20 blur-3xl" aria-hidden="true" />

          {/* Invitation Card Envelope in Warm Linen/Beige with Luxury Elevation */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm sm:max-w-md rounded-3xl border border-beige-300/90 bg-gradient-to-b from-[#FCFAF7] via-[#F8F3EC] to-[#EFE7D8] p-7 sm:p-9 text-center text-[#243324] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Delicate corner flourishes */}
            <FloralCorner position="top-left" className="top-0 left-0 -translate-x-3 -translate-y-3" />
            <FloralCorner position="top-right" className="top-0 right-0 translate-x-3 -translate-y-3" />
            <FloralCorner position="bottom-left" className="bottom-0 left-0 -translate-x-3 translate-y-3" />
            <FloralCorner position="bottom-right" className="bottom-0 right-0 translate-x-3 translate-y-3" />

            {/* Inner Border Frame in Warm Beige */}
            <div className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-beige-400/90" aria-hidden="true" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Luxury Wax Seal Monogram */}
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sage-700 via-sage-800 to-sage-950 text-beige-200 shadow-[0_8px_20px_-4px_rgba(53,72,52,0.5)] border-2 border-beige-300/80">
                <div className="absolute inset-1 rounded-full border border-beige-300/40" />
                <span className="font-serif text-2xl font-bold tracking-wider">
                  {invitationData.couple.groom.name[0]} & {invitationData.couple.bride.name[0]}
                </span>
                {/* Micro seal shine */}
                <div className="absolute top-1.5 left-2 h-3.5 w-3.5 rounded-full bg-white/20 blur-[1px]" />
              </div>

              {/* Subtitle */}
              <p className="font-cinzel text-xs uppercase tracking-[0.28em] text-sage-800 font-semibold mb-1">
                The Wedding Celebration of
              </p>

              {/* Couple Names in Old Pink */}
              <h1 className="font-script text-4xl sm:text-5xl text-oldpink-700 leading-tight my-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                {invitationData.couple.groom.name} & {invitationData.couple.bride.name}
              </h1>

              <FloralDivider className="my-2.5 scale-90" />

              {/* Recipient Card */}
              <div className="w-full rounded-2xl bg-white/95 border border-beige-300/90 p-4 shadow-sm backdrop-blur-md my-3 transition-all">
                <div className="flex items-center justify-center space-x-1.5 text-xs uppercase tracking-wider text-sage-700 font-medium mb-1">
                  <Mail className="h-3.5 w-3.5 text-sage-600" />
                  <span>Dear Honored Guest,</span>
                </div>
                <p className="font-serif text-lg sm:text-xl font-bold text-sage-950 tracking-wide">
                  {guestName}
                </p>
                <p className="text-[11px] text-gray-500 mt-1 italic">
                  You are cordially invited to celebrate our special day with us.
                </p>
              </div>

              {/* Open Button with Haptic Press State & Min 48px Target */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpen}
                aria-label="Open wedding invitation and start background music"
                className="shimmer-btn mt-4 flex min-h-[48px] items-center justify-center space-x-2.5 rounded-full px-8 py-3.5 text-white font-semibold text-sm shadow-lg hover:shadow-sage-700/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
              >
                <Mail className="h-4 w-4" />
                <span>Open Invitation</span>
                <Sparkles className="h-4 w-4 text-beige-200" />
              </motion.button>

              <p className="text-[11px] text-gray-500 mt-4 tracking-wide flex items-center space-x-1">
                <span>Tap to open invitation with music</span>
                <Heart className="h-3 w-3 text-oldpink-500 inline fill-current" />
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
