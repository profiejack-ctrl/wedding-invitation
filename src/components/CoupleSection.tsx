import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { invitationData } from '../config/invitationData';
import type { PersonInfo } from '../config/invitationData';
import { FloralDivider, FloralOrnamentRing } from './FloralDecorations';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const PersonCard: React.FC<{ person: PersonInfo; delay?: number }> = ({ person, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className="glass-card-luxury relative flex flex-col items-center rounded-3xl p-6 sm:p-8 text-center max-w-sm w-full border border-beige-300/90 shadow-md transition-all hover:shadow-lg"
    >
      {/* Avatar Container with Animated Floral Ring */}
      <div className="relative mb-5 flex items-center justify-center">
        <FloralOrnamentRing className="absolute h-44 w-44 sm:h-48 sm:w-48 text-sage-400/80 animate-spin-slow pointer-events-none" />
        <div className="relative h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full border-4 border-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15)] ring-2 ring-beige-300">
          <img
            src={person.avatarUrl}
            alt={person.fullName}
            width={144}
            height={144}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            loading="lazy"
          />
        </div>
      </div>

      {/* Role tag badge */}
      <span className="mb-1 rounded-full bg-sage-100/95 px-3.5 py-1 font-cinzel text-[11px] font-semibold tracking-wider text-sage-800 uppercase border border-sage-200">
        {person.role}
      </span>

      {/* Name in Old Pink */}
      <h3 className="font-script text-4xl sm:text-5xl text-oldpink-700 my-1 drop-shadow-sm">
        {person.name}
      </h3>
      <p className="font-serif text-sm font-semibold text-gray-900 tracking-wide">
        {person.fullName}
      </p>

      {/* Parents information */}
      <div className="mt-3 text-xs text-gray-600 space-y-0.5 max-w-[240px]">
        <p className="italic leading-relaxed">{person.description}</p>
      </div>

      {/* Instagram Button with ≥44px Touch Target */}
      {person.instagram && (
        <a
          href={`https://instagram.com/${person.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit @${person.instagram} on Instagram`}
          className="mt-5 inline-flex min-h-[44px] items-center space-x-2 rounded-full border border-beige-300 bg-white/95 px-4 py-2 text-xs font-semibold text-sage-900 shadow-sm transition-all hover:bg-sage-50 hover:text-sage-950 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sage-500"
        >
          <InstagramIcon className="h-4 w-4 text-oldpink-600" />
          <span>@{person.instagram}</span>
        </a>
      )}
    </motion.div>
  );
};

export const CoupleSection: React.FC = () => {
  return (
    <section id="couple-section" className="relative py-16 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-sage-800 font-semibold">
            The Happy Couple
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-sage-900 mt-1">
            Groom & Bride
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 italic leading-relaxed">
            By the grace of God and with the blessings of our beloved families, we invite you to be part of our journey.
          </p>
          <FloralDivider className="my-3" />
        </motion.div>

        {/* Couple Cards Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
          <PersonCard person={invitationData.couple.groom} delay={0.1} />

          {/* Heart center centerpiece */}
          <div className="flex items-center justify-center my-[-8px] md:my-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sage-700 to-sage-900 text-beige-200 shadow-lg ring-4 ring-beige-200" aria-hidden="true">
              <Heart className="h-6 w-6 fill-current animate-pulse-slow text-oldpink-300" />
            </div>
          </div>

          <PersonCard person={invitationData.couple.bride} delay={0.25} />
        </div>
      </div>
    </section>
  );
};
