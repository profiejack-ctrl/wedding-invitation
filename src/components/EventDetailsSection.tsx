import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Compass, Check, Copy, Shirt } from 'lucide-react';
import { invitationData } from '../config/invitationData';
import type { EventItem } from '../config/invitationData';
import { FloralDivider } from './FloralDecorations';

const EventCard: React.FC<{ event: EventItem; delay?: number }> = ({ event, delay = 0 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${event.venueName}, ${event.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className="glass-card-luxury relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 text-center max-w-md w-full border border-beige-300 shadow-md transition-all hover:shadow-lg overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <span className="rounded-full bg-sage-100 px-3.5 py-1 font-cinzel text-xs font-semibold uppercase tracking-widest text-sage-800 border border-sage-200">
          {event.subtitle}
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-sage-900 mt-2.5 mb-1">
          {event.title}
        </h3>
        <FloralDivider className="my-2 scale-75" />

        {/* Schedule & Time Cards */}
        <div className="w-full space-y-3 my-4 text-left">
          <div className="flex items-start space-x-3 rounded-2xl bg-white/85 p-3.5 border border-beige-200 shadow-xs">
            <Calendar className="h-5 w-5 text-sage-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</p>
              <p className="text-sm font-semibold text-gray-900">{event.date}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-2xl bg-white/85 p-3.5 border border-beige-200 shadow-xs">
            <Clock className="h-5 w-5 text-oldpink-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</p>
              <p className="text-sm font-semibold text-gray-900">{event.time}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-2xl bg-white/85 p-3.5 border border-beige-200 shadow-xs">
            <MapPin className="h-5 w-5 text-sage-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</p>
              <p className="text-sm font-bold text-gray-950">{event.venueName}</p>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{event.venueAddress}</p>
            </div>
          </div>

          {event.dressCode && (
            <div className="flex items-start space-x-3 rounded-2xl bg-sage-50/90 p-3.5 border border-sage-200/90">
              <Shirt className="h-5 w-5 text-sage-700 shrink-0 mt-0.5" />
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-sage-800 uppercase tracking-wider">Dress Code</p>
                  {/* Theme Swatch Preview */}
                  <div className="flex items-center space-x-1" title="Recommended theme colors">
                    <span className="h-3 w-3 rounded-full bg-[#819F80] border border-white shadow-xs" />
                    <span className="h-3 w-3 rounded-full bg-[#DDD0BB] border border-white shadow-xs" />
                    <span className="h-3 w-3 rounded-full bg-[#C0827F] border border-white shadow-xs" />
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-700 mt-0.5">{event.dressCode}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons with Minimum 44px Touch Targets */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open Google Maps for ${event.venueName}`}
          className="flex-1 flex min-h-[44px] items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-sage-700 to-sage-850 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:from-sage-800 hover:to-sage-900 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-sage-500"
        >
          <Compass className="h-4 w-4 text-beige-300" />
          <span>Open in Google Maps</span>
        </a>

        <button
          onClick={handleCopyAddress}
          aria-label="Copy venue address"
          className="flex min-h-[44px] items-center justify-center space-x-1.5 rounded-xl border border-beige-300 bg-white/95 px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-beige-50 transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-400"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-sage-600" />
              <span className="text-sage-700 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-gray-500" />
              <span>Copy Address</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export const EventDetailsSection: React.FC = () => {
  return (
    <section className="relative py-16 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-sage-800 font-semibold">
            Wedding Itinerary
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-sage-900 mt-1">
            Time & Location
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 italic leading-relaxed">
            We would be deeply honored by your presence at our wedding ceremony and celebration banquet.
          </p>
          <FloralDivider className="my-3" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 w-full">
          <EventCard event={invitationData.event.ceremony} delay={0.1} />
          <EventCard event={invitationData.event.reception} delay={0.25} />
        </div>
      </div>
    </section>
  );
};
