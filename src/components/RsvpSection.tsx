import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, MessageSquare, Share2, User } from 'lucide-react';
import { invitationData } from '../config/invitationData';
import { FloralDivider } from './FloralDecorations';

interface WishMessage {
  id: string;
  name: string;
  attendance: 'attending' | 'not_attending';
  guestCount: number;
  message: string;
  date: string;
}

const INITIAL_WISHES: WishMessage[] = [
  {
    id: '1',
    name: 'Alexander & Sarah',
    attendance: 'attending',
    guestCount: 2,
    message: 'Wishing you both a lifetime filled with immense joy, love, and endless blessings!',
    date: 'Just now',
  },
  {
    id: '2',
    name: 'Uncle David & Family',
    attendance: 'attending',
    guestCount: 3,
    message: 'Congratulations Jerryboy & Donnie Rose! May your marriage be blessed richly each day.',
    date: '1 hour ago',
  },
  {
    id: '3',
    name: 'Clarissa Valerie',
    attendance: 'attending',
    guestCount: 1,
    message: 'So happy for both of you! Excited to celebrate together on your big day!',
    date: '3 hours ago',
  },
];

export const RsvpSection: React.FC = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [wishes, setWishes] = useState<WishMessage[]>(() => {
    const saved = localStorage.getItem('wedding_wishes');
    return saved ? JSON.parse(saved) : INITIAL_WISHES;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get('to') || params.get('guest');
    if (recipient) {
      setName(decodeURIComponent(recipient));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Trigger celebration confetti with Sage green, Old pink, and Beige palette
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#819F80', '#C0827F', '#DDD0BB', '#5F7F5E', '#A75F5C', '#D4AF37'],
      });
    } catch {
      // Graceful fallback
    }

    const newWish: WishMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      guestCount: attendance === 'attending' ? guestCount : 0,
      message: message.trim() || 'Congratulations and best wishes on your wedding!',
      date: 'Just now',
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));
    setIsSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const phone = invitationData.rsvp.whatsappNumber;
    const statusText =
      attendance === 'attending'
        ? `Joyfully Attending (${guestCount} person${guestCount > 1 ? 's' : ''})`
        : 'Regretfully Unable to Attend';

    const text = encodeURIComponent(
      `*Wedding RSVP - ${invitationData.couple.groom.name} & ${invitationData.couple.bride.name}*\n\n` +
        `Name: ${name}\n` +
        `Status: ${statusText}\n` +
        `Wishes: ${message || 'Congratulations on your wedding!'}`
    );

    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-sage-800 font-semibold">
            Reservation & Attendance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-sage-900 mt-1">
            RSVP & Wishes
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 italic leading-relaxed">
            {invitationData.rsvp.note}
          </p>
          <FloralDivider className="my-3" />
        </motion.div>

        {/* Form Container with High-Contrast Inputs & Accessible Targets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card-luxury w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-beige-300 shadow-xl"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="guest-name-input" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-oldpink-600">*</span>
                </label>
                <input
                  id="guest-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe & Partner"
                  className="w-full min-h-[44px] rounded-xl border border-beige-300 bg-white/95 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-200 transition-all"
                />
              </div>

              {/* Attendance Radio Selection with ≥44px Target */}
              <div>
                <span className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Attendance Confirmation <span className="text-oldpink-600">*</span>
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`flex min-h-[44px] items-center justify-center space-x-2 rounded-xl border p-3 text-xs sm:text-sm font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-400 ${
                      attendance === 'attending'
                        ? 'border-sage-700 bg-sage-700 text-white shadow-md'
                        : 'border-beige-300 bg-white/90 text-gray-700 hover:bg-sage-50'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('not_attending')}
                    className={`flex min-h-[44px] items-center justify-center space-x-2 rounded-xl border p-3 text-xs sm:text-sm font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-oldpink-400 ${
                      attendance === 'not_attending'
                        ? 'border-oldpink-700 bg-oldpink-700 text-white shadow-md'
                        : 'border-beige-300 bg-white/90 text-gray-700 hover:bg-oldpink-50'
                    }`}
                  >
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Guest Count (if attending) */}
              {attendance === 'attending' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Number of Guests Attending
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setGuestCount(count)}
                        className={`flex-1 min-h-[44px] rounded-xl border py-2.5 text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-400 ${
                          guestCount === count
                            ? 'border-sage-600 bg-sage-600 text-white shadow-sm'
                            : 'border-beige-300 bg-white/90 text-gray-700 hover:bg-sage-50'
                        }`}
                      >
                        {count} {count === 4 ? '+' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Congratulatory message */}
              <div>
                <label htmlFor="guest-message-input" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Wishes & Prayers for the Couple
                </label>
                <textarea
                  id="guest-message-input"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your heartfelt congratulations and blessings..."
                  className="w-full rounded-xl border border-beige-300 bg-white/95 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-200 resize-none transition-all"
                />
              </div>

              {/* Submit button with Min 48px Target */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="shimmer-btn flex min-h-[48px] w-full items-center justify-center space-x-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-500"
              >
                <Send className="h-4 w-4" />
                <span>Submit RSVP & Send Wishes</span>
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center py-4 text-center space-y-3"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-700 ring-4 ring-sage-50">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-sage-950">
                Thank You, {name}!
              </h3>
              <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
                {attendance === 'attending'
                  ? 'Your attendance has been recorded. We eagerly look forward to celebrating with you!'
                  : 'Thank you for letting us know and for sending your warm wishes.'}
              </p>

              {/* WhatsApp direct notification button with Min 48px Target */}
              <button
                onClick={handleSendWhatsApp}
                className="mt-2 inline-flex min-h-[48px] items-center space-x-2 rounded-xl bg-sage-700 hover:bg-sage-800 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition-all active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-500"
              >
                <Share2 className="h-4 w-4" />
                <span>Forward RSVP via WhatsApp</span>
              </button>

              <button
                onClick={() => setIsSubmitted(false)}
                className="min-h-[44px] flex items-center text-xs text-sage-700 underline hover:text-sage-900 pt-1 cursor-pointer focus:outline-none"
              >
                Edit your response
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Wishes Wall / Guestbook */}
        <div className="w-full max-w-lg mt-10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif text-lg font-bold text-sage-900 flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-sage-700" />
              <span>Guestbook Wishes ({wishes.length})</span>
            </h4>
          </div>

          <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
            {wishes.map((w) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card-luxury rounded-2xl p-4 border border-beige-200 shadow-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-100 text-sage-800 text-xs font-bold border border-sage-200">
                      {w.name[0]?.toUpperCase() || <User className="h-3.5 w-3.5" />}
                    </div>
                    <span className="font-serif text-sm font-bold text-sage-950">
                      {w.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">{w.date}</span>
                </div>
                <div className="mb-2">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      w.attendance === 'attending'
                        ? 'bg-sage-100 text-sage-800 border border-sage-200'
                        : 'bg-oldpink-100 text-oldpink-800 border border-oldpink-200'
                    }`}
                  >
                    {w.attendance === 'attending' ? '• Joyfully Attending' : '• Unable to attend'}
                  </span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed italic pl-9">
                  "{w.message}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
