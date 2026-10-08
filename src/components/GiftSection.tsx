import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { invitationData } from '../config/invitationData';
import { FloralDivider } from './FloralDecorations';

export const GiftSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (!invitationData.giftInfo?.enabled) return null;

  const handleCopy = (accountNumber: string, index: number) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section className="relative py-12 px-4">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-sage-800 font-semibold">
            Wedding Registry
          </span>
          <h2 className="font-serif text-3xl text-sage-900 mt-1">
            Wedding Gift & Blessings
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto mt-2 italic leading-relaxed">
            Your presence and prayers at our wedding are the greatest gifts of all. If you wish to honor us with a token of love, digital envelopes are available below.
          </p>
          <FloralDivider className="my-3 scale-75" />
        </motion.div>

        {/* Toggle Gift Section Button with Min 48px Touch Target */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="shimmer-btn-oldpink flex min-h-[48px] items-center space-x-2 rounded-full px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:shadow-oldpink-500/25 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-oldpink-400"
        >
          <Gift className="h-4 w-4" />
          <span>{isOpen ? 'Close Wedding Gift' : 'Send Digital Gift'}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </motion.button>

        {/* Expandable Account Cards */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full space-y-3.5 mt-6 overflow-hidden"
            >
              {invitationData.giftInfo.accounts.map((acc, idx) => (
                <div
                  key={idx}
                  className="glass-card-luxury rounded-2xl p-5 border border-beige-300 shadow-sm text-left"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-sage-900 flex items-center space-x-1.5">
                      <CreditCard className="h-4 w-4 text-oldpink-600" />
                      <span>{acc.bankName}</span>
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">Digital Account</span>
                  </div>

                  <div className="rounded-xl bg-white/95 p-3.5 border border-beige-200 flex items-center justify-between shadow-xs">
                    <div>
                      <p className="font-mono text-sm font-bold text-gray-900 tracking-wider">
                        {acc.accountNumber}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5 font-medium">a.n {acc.holderName}</p>
                    </div>

                    <button
                      onClick={() => handleCopy(acc.accountNumber, idx)}
                      aria-label={`Copy account number for ${acc.holderName}`}
                      className="flex min-h-[44px] min-w-[76px] items-center justify-center space-x-1.5 rounded-lg bg-sage-100 hover:bg-sage-200 px-3.5 py-2 text-xs font-semibold text-sage-900 transition-colors active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage-400"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-sage-700" />
                          <span className="text-sage-800">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-sage-700" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
