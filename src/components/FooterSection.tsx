import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { invitationData } from '../config/invitationData';
import { FloralDivider } from './FloralDecorations';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative py-14 px-4 text-center border-t border-beige-300/80 bg-gradient-to-b from-transparent via-sage-50/40 to-sage-100/60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto flex flex-col items-center"
      >
        <p className="font-serif italic text-sm text-gray-700 leading-relaxed max-w-xs">
          It would be our greatest pleasure and honor to celebrate our sacred union with you.
        </p>

        <h3 className="font-script text-4xl sm:text-5xl text-oldpink-700 my-2.5 drop-shadow-sm">
          {invitationData.couple.groom.name} & {invitationData.couple.bride.name}
        </h3>

        <div className="inline-flex items-center space-x-1.5 rounded-full bg-sage-100/90 px-4 py-1.5 text-xs font-semibold text-sage-800 my-2 border border-sage-200 shadow-xs">
          <span>{invitationData.couple.hashtag}</span>
        </div>

        <FloralDivider className="my-2 scale-75" />

        <p className="text-[11px] text-gray-500 mt-2 flex items-center space-x-1.5">
          <span>Crafted with love for our special day</span>
          <Heart className="h-3.5 w-3.5 text-oldpink-500 fill-current inline animate-pulse-slow" />
        </p>
      </motion.div>
    </footer>
  );
};
