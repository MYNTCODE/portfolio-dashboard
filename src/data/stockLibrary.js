export const STOCK_LIBRARY = [
  {
    name: 'VOO',
    description: 'Core ETF / U.S. Market',
    thesis:
      'The core of the portfolio. It helps reduce single-stock risk and gives broad exposure to large U.S. companies in the S&P 500.',
    gradient: 'from-sky-400 to-blue-600',
    defaultAllocation: 50,
    defaultGrowth: 9,
  },
  {
    name: 'NVDA',
    description: 'AI Leader / GPU',
    thesis:
      'A leading AI infrastructure company. It has strong growth potential, but it can be volatile, so it works best as a growth satellite position.',
    gradient: 'from-emerald-400 to-green-600',
    defaultAllocation: 25,
    defaultGrowth: 22,
  },
  {
    name: 'MU',
    description: 'HBM / AI Memory',
    thesis:
      'A memory-focused semiconductor stock that may benefit from AI server demand and HBM growth, but it can move strongly with the memory cycle.',
    gradient: 'from-violet-400 to-purple-600',
    defaultAllocation: 15,
    defaultGrowth: 15,
  },
  {
    name: 'MRVL',
    description: 'AI Networking',
    thesis:
      'A supporting AI infrastructure position focused on networking and custom silicon. It adds upside, but carries higher risk than the core position.',
    gradient: 'from-amber-400 to-orange-600',
    defaultAllocation: 10,
    defaultGrowth: 18,
  },
  {
    name: 'GOOGL',
    description: 'AI / Search / Cloud',
    thesis:
      'A large-cap technology company with exposure to AI, search, cloud, YouTube, and digital advertising. It can balance growth with a stronger business base.',
    gradient: 'from-blue-400 to-cyan-600',
    defaultAllocation: 10,
    defaultGrowth: 12,
  },
  {
    name: 'LLY',
    description: 'Healthcare / Pharma Growth',
    thesis:
      'A healthcare growth position. It adds sector diversification away from technology and semiconductors.',
    gradient: 'from-rose-400 to-pink-600',
    defaultAllocation: 10,
    defaultGrowth: 12,
  },
  {
    name: 'O',
    description: 'Monthly Dividend REIT',
    thesis:
      'A dividend-focused REIT. It can add monthly income, but may grow slower than technology-heavy positions.',
    gradient: 'from-teal-400 to-emerald-700',
    defaultAllocation: 10,
    defaultGrowth: 6,
  },
  {
    name: 'BRK.B',
    description: 'Quality / Value Compounder',
    thesis:
      'A quality/value compounder that can help stabilize the portfolio and reduce dependence on high-growth technology names.',
    gradient: 'from-zinc-300 to-zinc-600',
    defaultAllocation: 10,
    defaultGrowth: 9,
  },
];
