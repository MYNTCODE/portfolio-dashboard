import {
  useMemo,
  useState,
} from 'react';

const portfolioFont = `
  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&display=swap');

  .portfolio-font {
    font-family: 'Inter Tight', Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
`;

export default function PortfolioVisualization() {
  const [monthlyBudget, setMonthlyBudget] = useState(4000);
  const [years, setYears] = useState(10);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [selectedStock, setSelectedStock] = useState('VOO');
  const [allocations, setAllocations] = useState({
    VOO: 50,
    NVDA: 25,
    MU: 15,
    MRVL: 10,
  });

  const [growthRates, setGrowthRates] = useState({
    VOO: 9,
    NVDA: 22,
    MU: 15,
    MRVL: 18,
  });

  const basePortfolio = [
    {
      name: 'VOO',
      description: 'Core ETF / U.S. Market',
      thesis:
        'The core of the portfolio. It helps reduce single-stock risk and gives broad exposure to large U.S. companies in the S&P 500.',
      gradient: 'from-sky-400 to-blue-600',
    },
    {
      name: 'NVDA',
      description: 'AI Leader / GPU',
      thesis:
        'A leading AI infrastructure company. It has strong growth potential, but it can be volatile, so it works best as a growth satellite position.',
      gradient: 'from-emerald-400 to-green-600',
    },
    {
      name: 'MU',
      description: 'HBM / AI Memory',
      thesis:
        'A memory-focused semiconductor stock that may benefit from AI server demand and HBM growth, but it can move strongly with the memory cycle.',
      gradient: 'from-violet-400 to-purple-600',
    },
    {
      name: 'MRVL',
      description: 'AI Networking',
      thesis:
        'A supporting AI infrastructure position focused on networking and custom silicon. It adds upside, but carries higher risk than the core position.',
      gradient: 'from-amber-400 to-orange-600',
    },
  ];

  const totalAllocation = useMemo(
    () => Object.values(allocations).reduce((sum, value) => sum + value, 0),
    [allocations],
  );

  const portfolio = useMemo(() => {
    return basePortfolio.map((item) => ({
      ...item,
      percent: allocations[item.name] ?? 0,
    }));
  }, [allocations]);

  const selected = portfolio.find((item) => item.name === selectedStock) ?? portfolio[0];

  const calculatedPortfolio = useMemo(() => {
    return portfolio.map((item) => ({
      ...item,
      amount: Math.round((monthlyBudget * item.percent) / 100),
      yearlyAmount: Math.round((monthlyBudget * item.percent * 12) / 100),
      totalAmount: Math.round((monthlyBudget * item.percent * 12 * years) / 100),
    }));
  }, [portfolio, monthlyBudget, years]);

  const totalInvested = monthlyBudget * 12 * years;

  const weightedAnnualGrowth = useMemo(() => {
    return portfolio.reduce((sum, item) => {
      const allocationWeight = item.percent / 100;
      const growth = growthRates[item.name] ?? 0;
      return sum + allocationWeight * growth;
    }, 0);
  }, [portfolio, growthRates]);

  const projectedValue = useMemo(() => {
    const monthlyRate = weightedAnnualGrowth / 100 / 12;
    const totalMonths = years * 12;

    if (monthlyRate === 0) return totalInvested;

    return Math.round(
      monthlyBudget * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate),
    );
  }, [monthlyBudget, years, weightedAnnualGrowth, totalInvested]);

  const projectedGain = projectedValue - totalInvested;

  const updateAllocation = (stockName, value) => {
    setAllocations((prev) => ({ ...prev, [stockName]: value }));
  };

  const updateGrowthRate = (stockName, value) => {
    setGrowthRates((prev) => ({ ...prev, [stockName]: value }));
  };

  const normalizeAllocations = () => {
    if (totalAllocation === 0) return;

    const normalized = {};
    let runningTotal = 0;

    basePortfolio.forEach((item, index) => {
      if (index === basePortfolio.length - 1) {
        normalized[item.name] = Math.max(0, 100 - runningTotal);
      } else {
        const value = Math.round(((allocations[item.name] ?? 0) / totalAllocation) * 100);
        normalized[item.name] = value;
        runningTotal += value;
      }
    });

    setAllocations(normalized);
  };

  const resetAllocations = () => {
    setAllocations({ VOO: 50, NVDA: 25, MU: 15, MRVL: 10 });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#07070A] text-white portfolio-font">
      <style>{portfolioFont}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_32%)]" />

      <main className="relative max-w-6xl mx-auto px-6 py-10 space-y-8">
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-blue-300 mb-3">Portfolio Visualizer</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">AI Growth Portfolio</h1>
            <p className="text-zinc-400 text-lg mt-3">Interactive DCA allocation dashboard</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-xl shadow-2xl">
            <p className="text-zinc-400 text-sm">Total Capital Invested</p>
            <p className="text-3xl font-bold mt-1">฿{totalInvested.toLocaleString()}</p>
            <p className="text-xs text-zinc-500 mt-1">Capital only, before projected growth</p>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-5">
          <ControlCard
            label="Monthly DCA Budget"
            value={`฿${monthlyBudget.toLocaleString()}`}
            min={1000}
            max={20000}
            step={500}
            rangeValue={monthlyBudget}
            onChange={setMonthlyBudget}
          />
          <ControlCard
            label="Investment Period"
            value={`${years} years`}
            min={1}
            max={30}
            step={1}
            rangeValue={years}
            onChange={setYears}
          />
          <SummaryCard
            label="Weighted Portfolio Growth"
            value={`${weightedAnnualGrowth.toFixed(1)}% / year`}
            note="Calculated from each stock allocation"
          />
        </section>

        <section className="grid md:grid-cols-3 gap-5">
          <SummaryCard label="Total Invested" value={`฿${totalInvested.toLocaleString()}`} note="Your own capital" />
          <SummaryCard label="Projected Value" value={`฿${projectedValue.toLocaleString()}`} note={`Weighted average from portfolio growth rates`} />
          <SummaryCard label="Projected Gain" value={`฿${projectedGain.toLocaleString()}`} note="Growth estimate only" />
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Allocation Controls</h2>
              <p className="text-zinc-500 text-sm mt-1">Adjust each position. Keep the total at 100% for a full allocation.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-4 py-2 text-sm border ${totalAllocation === 100 ? 'bg-green-500/10 border-green-400/30 text-green-300' : 'bg-orange-500/10 border-orange-400/30 text-orange-300'}`}>
                Total: {totalAllocation}%
              </span>
              <button onClick={normalizeAllocations} className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition">
                Normalize to 100%
              </button>
              <button onClick={resetAllocations} className="rounded-full bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition">
                Reset
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {portfolio.map((item) => (
              <div key={item.name} className="rounded-[1.5rem] border border-white/10 bg-zinc-950/70 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${item.gradient}`} />
                    <div>
                      <p className="text-xl font-bold">{item.name}</p>
                      <p className="text-xs text-zinc-500">{item.description}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{item.percent}%</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm text-zinc-400">
                      <span>Allocation</span>
                      <span>{item.percent}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={item.percent}
                      onChange={(e) => updateAllocation(item.name, Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm text-zinc-400">
                      <span>Expected Growth</span>
                      <span>{growthRates[item.name]}% / year</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="1"
                      value={growthRates[item.name]}
                      onChange={(e) => updateGrowthRate(item.name, Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">Portfolio Allocation</h2>
              <p className="text-zinc-500 text-sm mt-1">Click each section to inspect the position</p>
            </div>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-zinc-300">{totalAllocation}%</span>
          </div>

          <div className="relative h-16 rounded-[1.5rem] bg-zinc-950/80 p-2 border border-white/10 shadow-inner overflow-hidden">
            <div className="h-full w-full rounded-[1.1rem] overflow-hidden flex gap-1.5">
              {calculatedPortfolio.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setSelectedStock(item.name)}
                  className={`relative h-full bg-gradient-to-r ${item.gradient} transition-all duration-300 hover:brightness-125 ${selectedStock === item.name ? 'scale-y-105 shadow-[0_0_30px_rgba(255,255,255,0.25)]' : 'opacity-85'}`}
                  style={{ width: `${item.percent}%` }}
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition" />
                  <span className="relative z-10 text-sm font-bold drop-shadow-sm">
                    {item.percent >= 15 ? `${item.name} ${item.percent}%` : item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-7">
            {calculatedPortfolio.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelectedStock(item.name)}
                className={`group text-left rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] ${
                  selectedStock === item.name
                    ? 'border-white/60 bg-white/[0.08] shadow-[0_0_40px_rgba(255,255,255,0.08)]'
                    : 'border-white/10 bg-zinc-950/70'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`} />
                    <div>
                      <h3 className="text-2xl font-bold leading-none">{item.name}</h3>
                      <p className="text-sm text-zinc-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-zinc-200">{item.percent}%</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-5">
                  <Metric label="Monthly" value={`฿${item.amount.toLocaleString()}`} />
                  <Metric label="Yearly" value={`฿${item.yearlyAmount.toLocaleString()}`} />
                  <Metric label={`${years}Y Total`} value={`฿${item.totalAmount.toLocaleString()}`} />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${selected.gradient}`} />
              <div>
                <p className="text-zinc-500 text-sm">Selected Position</p>
                <h2 className="text-3xl font-bold">{selected.name}</h2>
              </div>
            </div>
            <p className="text-zinc-400 mb-4">{selected.description}</p>
            <p className="text-zinc-100 leading-relaxed text-lg">{selected.thesis}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-6">Risk Profile</h2>
            <div className="space-y-5">
              {[
                ['Growth', 85, 'from-emerald-400 to-green-600'],
                ['Stability', 55, 'from-sky-400 to-blue-600'],
                ['Volatility', 70, 'from-amber-400 to-orange-600'],
              ].map(([label, value, gradient]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-2 text-zinc-400">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-4 rounded-full bg-zinc-950/90 border border-white/10 overflow-hidden p-1">
                    <div className={`h-full rounded-full bg-gradient-to-r ${gradient}`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ControlCard({ label, value, min, max, step, rangeValue, onChange }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl shadow-2xl">
      <p className="text-zinc-400 mb-2">{label}</p>
      <p className="text-4xl font-bold mb-5">{value}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={rangeValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-500 cursor-pointer"
      />
    </div>
  );
}

function SummaryCard({ label, value, note }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl shadow-2xl">
      <p className="text-zinc-400 mb-2">{label}</p>
      <p className="text-3xl md:text-4xl font-bold">{value}</p>
      <p className="text-xs text-zinc-500 mt-2">{note}</p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/[0.055] border border-white/10 p-3">
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <p className="text-lg md:text-xl font-bold truncate">{value}</p>
    </div>
  );
}
