import groomImg from '../assets/groom.jpg';
import brideImg from '../assets/bride.jpg';
import heroImg from '../assets/hero.png';

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string; // Human-readable date
  time: string; // e.g. "09:00 AM - 11:00 AM"
  isoDate: string; // For calendar generation e.g. "20261030T010000Z"
  isoEndDate: string; // e.g. "20261030T040000Z"
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  dressCode?: string;
}

export interface PersonInfo {
  name: string;
  fullName: string;
  role: string;
  fatherName: string;
  motherName: string;
  instagram?: string;
  avatarUrl: string;
  description: string;
}

export interface InvitationConfig {
  couple: {
    groom: PersonInfo;
    bride: PersonInfo;
    heroImage: string;
    hashtag: string;
    quote: {
      text: string;
      author: string;
    };
  };
  event: {
    ceremony: EventItem;
    reception: EventItem;
    countdownTarget: string; // ISO string e.g. "2026-10-30T09:00:00+08:00"
    displayDate: string;
  };
  audio: {
    title: string;
    artist: string;
    url: string;
  };
  rsvp: {
    whatsappNumber: string; // international format without '+' e.g. "6281234567890"
    note: string;
  };
  giftInfo?: {
    enabled: boolean;
    accounts: Array<{
      bankName: string;
      accountNumber: string;
      holderName: string;
    }>;
  };
}

export const invitationData: InvitationConfig = {
  couple: {
    groom: {
      name: 'Jerryboy',
      fullName: 'Jerryboy Alvarez',
      role: 'The Groom',
      fatherName: 'Mr. Alvarez',
      motherName: 'Mrs. Alvarez',
      instagram: 'jerryboy.alvarez',
      avatarUrl: groomImg,
      description: 'Beloved son of Mr. Alvarez and Mrs. Alvarez',
    },
    bride: {
      name: 'Donnie Rose',
      fullName: 'Donnie Rose Ramirez',
      role: 'The Bride',
      fatherName: 'Mr. Ramirez',
      motherName: 'Mrs. Ramirez',
      instagram: 'donnierose.ramirez',
      avatarUrl: brideImg,
      description: 'Beloved daughter of Mr. Ramirez and Mrs. Ramirez',
    },
    heroImage: heroImg,
    hashtag: '#RamirezDownTheAisleforAlvarez',
    quote: {
      text: '“Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.”',
      author: '1 Corinthians 13:4-7',
    },
  },
  event: {
    displayDate: 'Friday, October 30, 2026',
    countdownTarget: '2026-10-30T09:00:00+08:00',
    ceremony: {
      id: 'ceremony',
      title: 'Wedding Ceremony',
      subtitle: 'The Sacred Vows',
      date: 'Friday, 30 October 2026',
      time: '09:00 AM - 11:00 AM (WITA / GMT+8)',
      isoDate: '20261030T010000Z',
      isoEndDate: '20261030T030000Z',
      venueName: "Web's Event Place",
      venueAddress: 'Damong Maliit, Quezon City',
      mapsUrl: 'https://maps.google.com/?q=Damong+Maliit+Quezon+City',
      dressCode: 'Soft Sage Green, Warm Beige, or Old Pink Elegance',
    },
    reception: {
      id: 'reception',
      title: 'Wedding Celebration & Dinner',
      subtitle: 'Evening Banquet & Celebration',
      date: 'Friday, 30 October 2026',
      time: '06:00 PM - 10:00 PM (WITA / GMT+8)',
      isoDate: '20261030T100000Z',
      isoEndDate: '20261030T140000Z',
      venueName: "Web's Event Place",
      venueAddress: 'Damong Maliit, Quezon City',
      mapsUrl: 'https://maps.google.com/?q=Damong+Maliit+Quezon+City',
      dressCode: 'Formal Black Tie or Romantic Pastel Formal',
    },
  },
  audio: {
    title: 'Tahanan - El Manu | Clyde Pianist (Piano Cover)',
    artist: 'El Manu / Clyde Pianist',
    url: 'https://youtu.be/Dg2qFCYGxYk?list=RDDg2qFCYGxYk&t=19',
  },
  rsvp: {
    whatsappNumber: '6281234567890',
    note: 'Please confirm your attendance before October 15, 2026 so we can prepare your seat with love.',
  },
  giftInfo: {
    enabled: true,
    accounts: [
      {
        bankName: 'Bank Central Asia (BCA)',
        accountNumber: '8830192841',
        holderName: 'Jerryboy Alvarez',
      },
      {
        bankName: 'Bank Mandiri',
        accountNumber: '1420019283741',
        holderName: 'Donnie Rose Ramirez',
      },
    ],
  },
};
