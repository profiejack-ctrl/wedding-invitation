import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, Clock } from 'lucide-react';
import { invitationData } from '../config/invitationData';
import { FloralCorner } from './FloralDecorations';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(invitationData.event.countdownTarget).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    const { groom, bride } = invitationData.couple;
    const { ceremony } = invitationData.event;
    const title = encodeURIComponent(`The Wedding of ${groom.name} & ${bride.name}`);
    const details = encodeURIComponent(
      `Join us in celebrating the wedding ceremony of ${groom.name} & ${bride.name}!\n\nLocation: ${ceremony.venueName}\nAddress: ${ceremony.venueAddress}`
    );
    const location = encodeURIComponent(`${ceremony.venueName}, ${ceremony.venueAddress}`);
    const dates = `${ceremony.isoDate}/${ceremony.isoEndDate}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="relative py-16 px-4">
      <div className="relative max-w-lg mx-auto rounded-3xl bg-gradient-to-b from-[#1c291d] via-[#152016] to-[#0d140e] p-7 sm:p-9 text-center text-white shadow-2xl overflow-hidden border border-beige-300/40">
        <FloralCorner position="top-left" className="top-0 left-0 -translate-x-2 -translate-y-2" />
        <FloralCorner position="top-right" className="top-0 right-0 translate-x-2 -translate-y-2" />

        {/* Ambient background glow in Old Pink & Sage */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-oldpink-400/20 via-transparent to-transparent" aria-hidden="true" />

        <div className="relative z-10">
          <span className="inline-flex items-center space-x-1.5 font-cinzel text-xs uppercase tracking-[0.25em] text-beige-300 font-semibold mb-1">
            <Clock className="h-3.5 w-3.5 text-beige-300" />
            <span>Counting Down The Days</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1 mb-2">
            Save Our Date
          </h2>
          <p className="font-serif text-sm text-beige-200/90 italic mb-6">
            {invitationData.event.displayDate}
          </p>

          {/* Countdown Grid with Tabular Figures */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 my-6">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.92, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-beige-300/35 p-3 sm:p-4 shadow-inner"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold text-beige-200 tabular-nums select-all">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-wider text-oldpink-200 mt-1 font-semibold">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Add to Calendar Button with Minimum 48px Target */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAddToCalendar}
            aria-label="Add wedding to Google Calendar"
            className="mt-3 inline-flex min-h-[48px] items-center space-x-2 rounded-full border border-beige-300 bg-gradient-to-r from-beige-400 via-beige-500 to-beige-400 px-7 py-3 text-xs sm:text-sm font-semibold text-sage-950 shadow-lg hover:shadow-beige-400/30 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-beige-400"
          >
            <CalendarPlus className="h-4 w-4" />
            <span>Add to Google Calendar</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
