export interface Milestone {
  id: string;
  label: string;
  targetDate: string; // ISO string or YYYY-MM-DD
  completed: boolean;
}

export type ThemeStyle = 'cyber' | 'minimal' | 'gradient' | 'brutalist';
export type DeviceMode = 'mobile' | 'desktop';
export type ColorMode = 'dark' | 'light';

export interface LockscreenConfig {
  title: string;
  targetDeadline: string; // YYYY-MM-DDTHH:mm
  quote: string;
  category: 'career' | 'drop' | 'academic' | 'custom';
  theme: ThemeStyle;
  colorMode: ColorMode;
  device: DeviceMode;
  milestones: Milestone[];
  showClockMock: boolean;
  accentColor: string;
}

export interface Preset {
  id: string;
  name: string;
  category: 'career' | 'drop' | 'academic' | 'custom';
  description: string;
  config: Partial<LockscreenConfig>;
}

export const PRESETS: Preset[] = [
  {
    id: 'career-internship',
    name: 'Google & Top Tech Summer 2027',
    category: 'career',
    description: 'SWE & Product Applications, LeetCode sprints, and System Design prep.',
    config: {
      title: 'Google 2027 SWE Deadline',
      targetDeadline: '2026-12-15T23:59',
      quote: 'Preparation meets opportunity. Focus on consistency.',
      theme: 'cyber',
      accentColor: '#38bdf8', // sky-400
      milestones: [
        { id: '1', label: 'Resume Polish & Portfolio Review', targetDate: '2026-11-28', completed: true },
        { id: '2', label: 'Top 75 LeetCode Patterns Mastery', targetDate: '2026-12-05', completed: false },
        { id: '3', label: 'Mock Technical Interviews (Peer)', targetDate: '2026-12-10', completed: false },
        { id: '4', label: 'Submit Priority Batch on Handshake', targetDate: '2026-12-15', completed: false },
      ],
    },
  },
  {
    id: 'creative-drop',
    name: 'CTRL:// Album & Visual Drop',
    category: 'drop',
    description: 'Master track delivery, cover art clearance, promo reels, and release.',
    config: {
      title: 'Global Exclusive Release',
      targetDeadline: '2026-12-01T00:00',
      quote: 'Sound is sacred. Every detail intentional.',
      theme: 'gradient',
      accentColor: '#a855f7', // purple-500
      milestones: [
        { id: '1', label: 'Final Master Audio Locked (WAV 24/48)', targetDate: '2026-11-24', completed: true },
        { id: '2', label: 'Motion Cover Art & Teaser 9:16 Cut', targetDate: '2026-11-27', completed: true },
        { id: '3', label: 'Press Kit & Creator Distribution Sync', targetDate: '2026-11-29', completed: false },
        { id: '4', label: 'Midnight Worldwide Premiere', targetDate: '2026-12-01', completed: false },
      ],
    },
  },
  {
    id: 'academic-finals',
    name: 'Fall Term Finals & Capstone',
    category: 'academic',
    description: 'Final papers, machine learning projects, and comprehensive exams.',
    config: {
      title: 'Fall Term Final Defense',
      targetDeadline: '2026-12-18T17:00',
      quote: 'Discipline today creates freedom tomorrow.',
      theme: 'minimal',
      accentColor: '#10b981', // emerald-500
      milestones: [
        { id: '1', label: 'Submit Research Draft & Code Repo', targetDate: '2026-12-02', completed: true },
        { id: '2', label: 'Algorithm & Deep Learning Exam Prep', targetDate: '2026-12-08', completed: false },
        { id: '3', label: 'Slide Deck & Interactive Walkthrough', targetDate: '2026-12-14', completed: false },
        { id: '4', label: 'Final Project Defense & Wrap', targetDate: '2026-12-18', completed: false },
      ],
    },
  },
  {
    id: 'swiss-minimal',
    name: 'Clean Focus / Personal Goal',
    category: 'custom',
    description: 'Ultra-refined typographic layout with maximum legibility at a glance.',
    config: {
      title: 'Target Horizon',
      targetDeadline: '2026-12-31T23:59',
      quote: 'Subtract until only the essential remains.',
      theme: 'brutalist',
      accentColor: '#f43f5e', // rose-500
      milestones: [
        { id: '1', label: 'Phase 1 Architecture Complete', targetDate: '2026-11-30', completed: true },
        { id: '2', label: 'Beta User Onboarding Wave', targetDate: '2026-12-15', completed: false },
        { id: '3', label: 'Year-End Benchmark Audit', targetDate: '2026-12-31', completed: false },
      ],
    },
  },
];
