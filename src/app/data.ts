export interface Opportunity {
  id: string;
  type: 'Mentorship' | 'Part-time Gig';
  title: string;
  organization: string;
  distance: string;
  timeCommitment: string;
  participants: string;
  description: string;
  whyThis: string;
  cardGradient: string;
  accentColor: string;
}

export interface Circle {
  id: string;
  name: string;
  members: number;
  distance: string;
  nextMeetup: string;
  host: string;
  venue: string;
  description: string;
  emoji: string;
  gradient: string;
  memberInitials: string[];
}

export const opportunities: Opportunity[] = [
  {
    id: '1',
    type: 'Mentorship',
    title: 'Guide a Robotics Team',
    organization: 'Sunrise STEM School',
    distance: '1.2 km',
    timeCommitment: '2 hrs / week',
    participants: '8 students',
    description:
      'A group of 8th-grade students are building their first autonomous robot and need a mentor who understands systems thinking and can bring real engineering intuition to the project. Weekly sessions on Tuesday mornings.',
    whyThis:
      'You spent decades in engineering and systems design — exactly what this team needs. They\'re not looking for a coach who reads from a manual; they need someone who\'s been in the field. Your profile flags a passion for guiding younger minds, and this school is just 1.2 km from your neighbourhood. Tuesday mornings align with your schedule too.',
    cardGradient: 'linear-gradient(135deg, #2A4A54 0%, #3E7B8C 100%)',
    accentColor: '#324E58',
  },
  {
    id: '2',
    type: 'Part-time Gig',
    title: 'Community Garden Advisor',
    organization: 'Green Roots Urban Farm',
    distance: '0.8 km',
    timeCommitment: '3 hrs / week',
    participants: '14 volunteers',
    description:
      'A local urban farm is looking for someone with operational experience to help coordinate their volunteer schedule, seasonal planting cycles, and community outreach events. Mostly weekend mornings.',
    whyThis:
      'Your background in operations maps directly to what this farm needs — structure without losing the community warmth. You mentioned outdoor activities as a personal interest, and this is a 10-minute walk from your home.',
    cardGradient: 'linear-gradient(135deg, #1B5E42 0%, #3DAF7A 100%)',
    accentColor: '#1B5E42',
  },
  {
    id: '3',
    type: 'Part-time Gig',
    title: 'Strategy Advisor',
    organization: 'Mosaic Social Enterprise',
    distance: '2.1 km',
    timeCommitment: 'Flexible hours',
    participants: '4 founders',
    description:
      'A small social enterprise building affordable housing solutions needs strategic guidance for their 12-month growth plan. They are looking for someone with real-world business experience, not just theory.',
    whyThis:
      'Three of your selected guidance areas — Strategy, Operations, and Mentoring — are exactly what this team needs right now. They\'re at an inflection point where lived experience matters far more than textbook knowledge.',
    cardGradient: 'linear-gradient(135deg, #4B41B8 0%, #7C73E8 100%)',
    accentColor: '#6C63FF',
  },
];

export const circles: Circle[] = [
  {
    id: '1',
    name: 'Classical Music Circle',
    members: 24,
    distance: '0.5 km',
    nextMeetup: 'Thu, 4:00 PM',
    host: 'Meera Pillai',
    venue: 'Indiranagar Community Hall',
    description:
      'A warm gathering of music lovers who meet weekly to listen, discuss, and occasionally perform classical pieces. Both Carnatic and Western traditions are welcome here. Bring your ears, your opinions, and maybe your instrument.',
    emoji: '🎵',
    gradient: 'linear-gradient(135deg, #5B21B6 0%, #A78BFA 100%)',
    memberInitials: ['MP', 'RS', 'KV', 'AN', 'SL', 'RG'],
  },
  {
    id: '2',
    name: 'Urban Gardeners',
    members: 31,
    distance: '1.1 km',
    nextMeetup: 'Sat, 7:00 AM',
    host: 'Rajan Nair',
    venue: 'Koramangala Community Plots',
    description:
      'Neighbours who grow food, share seeds, and swap stories every Saturday morning in the community plots. All experience levels welcome. Just bring your hands and your patience.',
    emoji: '🌿',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #34D399 100%)',
    memberInitials: ['RN', 'PK', 'SM', 'AG', 'VR', 'TL'],
  },
  {
    id: '3',
    name: "Storytellers' Circle",
    members: 18,
    distance: '2.0 km',
    nextMeetup: 'Fri, 6:00 PM',
    host: 'Sunitha George',
    venue: 'Jayanagar Library Annex',
    description:
      'Oral history, fiction, and memoir — a small group that meets to read, write, and remember together. No experience needed. Just a story you have been meaning to tell.',
    emoji: '📖',
    gradient: 'linear-gradient(135deg, #78350F 0%, #FCD34D 100%)',
    memberInitials: ['SG', 'MR', 'PB', 'KA', 'VN'],
  },
];
