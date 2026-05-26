import { formatCurrency } from '../utils/formatters.js';
import MetricCard from './MetricCard.jsx';
import SectionCard from './SectionCard.jsx';

function AllocationBar({ portfolio, selectedStock, onSelectStock }) {
  return (
    <div className="relative h-16 overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950/80 p-2 shadow-inner">
      <div className="flex h-full w-full gap-1.5 overflow-hidden rounded-[1.1rem]">
        {portfolio.map((item) => (
          <button
            key={item.name}
            onClick={() => onSelectStock(item.name)}
            className={`relative h-full bg-gradient-to-r ${item.gradient} transition-all duration-300 hover:brightness-125 ${
              selectedStock === item.name
                ? 'scale-y-105 shadow-[0_0_30px_rgba(255,255,255,0.25)]'
                : 'opacity-85'
            }`}
            style={{ width: `${item.percent}%` }}
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 transition hover:opacity-100" />
            <span className="relative z-10 text-sm font-bold drop-shadow-sm">
              {item.percent >= 15 ? `${item.name} ${item.percent}%` : item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AllocationTile({ item, years, isSelected, onSelectStock }) {
  return (
    <button
      onClick={() => onSelectStock(item.name)}
      className={`group rounded-[1.5rem] border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] ${
        isSelected
          ? 'border-white/60 bg-white/[0.08] shadow-[0_0_40px_rgba(255,255,255,0.08)]'
          : 'border-white/10 bg-zinc-950/70'
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`} />
          <div>
            <h3 className="text-2xl font-bold leading-none">{item.name}</h3>
            <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
          </div>
        </div>
        <span className="text-2xl font-bold text-zinc-200">{item.percent}%</span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <MetricCard label="Monthly" value={formatCurrency(item.amount)} />
        <MetricCard label="Yearly" value={formatCurrency(item.yearlyAmount)} />
        <MetricCard label={`${years}Y Total`} value={formatCurrency(item.totalAmount)} />
      </div>
    </button>
  );
}

export default function PortfolioAllocationSection({
  calculatedPortfolio,
  totalAllocation,
  years,
  selectedStock,
  onSelectStock,
}) {
  return (
    <SectionCard>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Allocation</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Click each section to inspect the position
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-zinc-300">
          {totalAllocation}%
        </span>
      </div>

      <AllocationBar
        portfolio={calculatedPortfolio}
        selectedStock={selectedStock}
        onSelectStock={onSelectStock}
      />

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {calculatedPortfolio.map((item) => (
          <AllocationTile
            key={item.name}
            item={item}
            years={years}
            isSelected={selectedStock === item.name}
            onSelectStock={onSelectStock}
          />
        ))}
      </div>
    </SectionCard>
  );
}
