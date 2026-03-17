export interface Project {
  id: string;
  title: string;
  badge: string;
  description: string;
  stack: string[];
  winner: boolean;
  winnerLabel: string;
  color: string;
}

export interface Experience {
  id: string;
  role: string;
  org: string;
  period: string;
  highlights: string[];
  color: string;
}

export interface Skill {
  name: string;
  category: 'Languages' | 'Frontend' | 'AI/ML' | 'Blockchain' | 'Cloud';
  level: number; // 0-100
}

export interface Achievement {
  rank: string;
  title: string;
  desc: string;
  icon: string;
}
