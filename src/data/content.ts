import type { Project, Experience, Skill, Achievement } from '../types';

export const projects: Project[] = [
  {
    id: 'bhaago',
    title: 'Bhaago Neta Bhaago',
    badge: '🥇',
    description: '2D blockchain runner game on Monad Testnet. ERC-721 NFTs as power-ups, on-chain leaderboard, 4 smart contracts, sub-500ms score submission.',
    stack: ['React 18', 'TypeScript', 'Vite 5', 'Canvas 2D', 'ethers.js', 'Solidity', 'Hardhat'],
    winner: true,
    winnerLabel: 'HACKATHON WINNER',
    color: '#00ff9d',
  },
  {
    id: 'nft-gift',
    title: 'Web3 NFT Gift Card dApp',
    badge: '🥇',
    description: 'NFT gift cards on Cardano Ada Lovelace Testnet. ERC-721 ownership, MetaMask wallet auth, trustless peer-to-peer card transfers.',
    stack: ['React', 'Web3.js', 'Solidity', 'MetaMask'],
    winner: true,
    winnerLabel: 'HACKATHON WINNER',
    color: '#a855f7',
  },
  {
    id: 'legicall',
    title: 'LegiCall AI',
    badge: '🤖',
    description: 'Real-time legal call assistant. Speech-to-text pipeline, RAG-powered legal lookup, multilingual transcripts, PDF risk reports.',
    stack: ['JavaScript', 'Google Speech-to-Text', 'Azure', 'RAG', 'NLP'],
    winner: false,
    winnerLabel: '',
    color: '#00b4ff',
  },
  {
    id: 'heritage',
    title: 'Heritage Hues',
    badge: '🏆',
    description: 'Flutter + Firebase travel app with ML-powered recommendations, Google Maps integration, and OAuth. National Hackathon Winner.',
    stack: ['Flutter', 'Firebase', 'ML', 'Google Maps', 'OAuth'],
    winner: true,
    winnerLabel: 'NATIONAL WINNER',
    color: '#f59e0b',
  },
  {
    id: 'whatif',
    title: 'WhatIf Engine',
    badge: '🧠',
    description: 'Counterfactual ML reasoning engine. Causal inference models that answer "what if" scenarios from real-world datasets.',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
    winner: false,
    winnerLabel: '',
    color: '#ff2d55',
  },
];

export const experiences: Experience[] = [
  {
    id: 'microsoft',
    role: 'Microsoft Learn Student Ambassador',
    org: 'Microsoft',
    period: 'Aug 2024 – Present',
    highlights: [
      '10+ technical workshops delivered',
      '500+ students reached',
      'Azure, GitHub, AI/ML topics',
      '30% cloud adoption boost',
    ],
    color: '#00b4ff',
  },
  {
    id: 'aicte',
    role: 'Full Stack Dev Intern',
    org: 'AICTE Edunet Foundation',
    period: '2024',
    highlights: [
      'MERN stack development',
      'REST API design & integration',
      'Flask + AI/ML integration',
      '20% performance improvement',
    ],
    color: '#00ff9d',
  },
  {
    id: 'ilearn',
    role: 'Co-Founder',
    org: 'ILearn Community & TechnoSphere',
    period: 'Mar 2025 – Present',
    highlights: [
      '500+ member developer community',
      'AI/ML & Web3 workshops',
      'Tech education platform',
    ],
    color: '#a855f7',
  },
];

export const skills: Skill[] = [
  // Languages
  { name: 'C++', category: 'Languages', level: 85 },
  { name: 'Python', category: 'Languages', level: 92 },
  { name: 'JavaScript', category: 'Languages', level: 90 },
  { name: 'TypeScript', category: 'Languages', level: 88 },
  { name: 'Solidity', category: 'Languages', level: 80 },
  { name: 'Java', category: 'Languages', level: 75 },
  { name: 'SQL', category: 'Languages', level: 82 },
  // Frontend
  { name: 'React 18', category: 'Frontend', level: 92 },
  { name: 'Node.js', category: 'Frontend', level: 88 },
  { name: 'Express.js', category: 'Frontend', level: 85 },
  { name: 'Flask', category: 'Frontend', level: 82 },
  { name: 'Tailwind', category: 'Frontend', level: 90 },
  { name: 'REST APIs', category: 'Frontend', level: 88 },
  // AI/ML
  { name: 'TensorFlow', category: 'AI/ML', level: 80 },
  { name: 'Scikit-learn', category: 'AI/ML', level: 85 },
  { name: 'NLP', category: 'AI/ML', level: 78 },
  { name: 'LLMs', category: 'AI/ML', level: 82 },
  { name: 'RAG', category: 'AI/ML', level: 80 },
  { name: 'GenAI', category: 'AI/ML', level: 85 },
  // Blockchain
  { name: 'Smart Contracts', category: 'Blockchain', level: 82 },
  { name: 'ERC-721', category: 'Blockchain', level: 80 },
  { name: 'ethers.js', category: 'Blockchain', level: 78 },
  { name: 'Hardhat', category: 'Blockchain', level: 75 },
  { name: 'Solana', category: 'Blockchain', level: 70 },
  // Cloud
  { name: 'Azure', category: 'Cloud', level: 85 },
  { name: 'Firebase', category: 'Cloud', level: 88 },
  { name: 'Supabase', category: 'Cloud', level: 80 },
  { name: 'Git', category: 'Cloud', level: 92 },
  { name: 'CI/CD', category: 'Cloud', level: 78 },
  { name: 'Vercel', category: 'Cloud', level: 85 },
];

export const achievements: Achievement[] = [
  { rank: '01', title: '7x Hackathon Winner', desc: '50+ hackathons participated', icon: '🏆' },
  { rank: '02', title: 'McKinsey Forward 2025', desc: 'Elite leadership programme', icon: '🌐' },
  { rank: '03', title: 'Microsoft Student Ambassador', desc: 'Official MLSA', icon: '🔵' },
  { rank: '04', title: 'IEEE Secretary', desc: 'Anurag University chapter', icon: '⚡' },
  { rank: '05', title: 'Oracle Data Science Pro', desc: 'Professional certification', icon: '🔴' },
  { rank: '06', title: 'Oracle Cloud GenAI Pro', desc: 'Cloud Infrastructure 2025', icon: '☁️' },
  { rank: '07', title: 'Google Data Analytics', desc: 'Professional certificate', icon: '📊' },
  { rank: '08', title: 'Meta Front-End Developer', desc: 'Professional certificate', icon: '📘' },
  { rank: '09', title: 'HackerRank Gold Badge', desc: '300+ LeetCode problems', icon: '⭐' },
];

export const categoryColors: Record<string, string> = {
  Languages: '#00ff9d',
  Frontend: '#ff6b6b',
  'AI/ML': '#a855f7',
  Blockchain: '#f59e0b',
  Cloud: '#38bdf8',
};
