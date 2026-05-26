export const DEFAULT_MONTHLY_BUDGET = 4000;
export const DEFAULT_INVESTMENT_YEARS = 10;
export const DEFAULT_ENABLED_STOCKS = ['VOO', 'NVDA', 'MU', 'MRVL'];

export const CONTROL_CONFIG = {
  monthlyBudget: {
    label: 'Monthly DCA Budget',
    min: 1000,
    max: 20000,
    step: 500,
    accentClassName: 'accent-blue-500',
  },
  years: {
    label: 'Investment Period',
    min: 1,
    max: 30,
    step: 1,
    accentClassName: 'accent-blue-500',
  },
  allocation: {
    min: 0,
    max: 100,
    step: 1,
    accentClassName: 'accent-blue-500',
  },
  growth: {
    min: 0,
    max: 40,
    step: 1,
    accentClassName: 'accent-emerald-500',
  },
};

export const RISK_PROFILE_CONFIG = [
  {
    key: 'growth',
    label: 'Growth',
    gradient: 'from-emerald-400 to-green-600',
  },
  {
    key: 'stability',
    label: 'Stability',
    gradient: 'from-sky-400 to-blue-600',
  },
  {
    key: 'volatility',
    label: 'Volatility',
    gradient: 'from-amber-400 to-orange-600',
  },
];
