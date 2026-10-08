import React, { useState } from 'react';
import { EnvelopeCover } from './components/EnvelopeCover';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownSection } from './components/CountdownSection';
import { EventDetailsSection } from './components/EventDetailsSection';
import { GiftSection } from './components/GiftSection';
import { RsvpSection } from './components/RsvpSection';
import { FooterSection } from './components/FooterSection';
import { MusicPlayer } from './components/MusicPlayer';
import { FloatingPetals } from './components/FloatingPetals';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setAutoPlayAudio(true);
  };

  return (
    <div className="min-h-screen bg-[#151c16] text-[#243324] relative flex justify-center selection:bg-sage-200 selection:text-sage-900">
      {/* Background Audio Player Engine - preloads immediately */}
      <MusicPlayer autoPlayTriggered={autoPlayAudio} visible={isOpen} />

      {/* Interactive Envelope Gate */}
      <EnvelopeCover isOpen={isOpen} onOpen={handleOpenInvitation} />

      {/* Romantic Falling Petals Atmosphere */}
      {isOpen && <FloatingPetals />}

      {/* Mobile-First Invitation Container with Desktop Centering & Warm Beige/Sage Frame */}
      <main className="w-full max-w-lg min-h-screen bg-gradient-to-b from-[#FCFAF7] via-[#F8F3EC] to-[#EEF3ED] shadow-2xl relative overflow-x-hidden border-x border-beige-300/60">
        {/* Ambient Top Glow in Sage */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-sage-200/40 rounded-full blur-3xl" />

        {/* Invitation Sections */}
        <HeroSection />
        <CoupleSection />
        <CountdownSection />
        <EventDetailsSection />
        <GiftSection />
        <RsvpSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default App;
