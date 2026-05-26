import { CONTROL_CONFIG } from '../constants/portfolio.js';
import SectionCard from './SectionCard.jsx';

function AllocationControlRow({
  item,
  onUpdateAllocation,
  onUpdateGrowthRate,
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950/70 p-5">
      <div className="mb-4 flex items-center justify-between">
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
          <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
            <span>Allocation</span>
            <span>{item.percent}%</span>
          </div>
          <input
            type="range"
            min={CONTROL_CONFIG.allocation.min}
            max={CONTROL_CONFIG.allocation.max}
            step={CONTROL_CONFIG.allocation.step}
            value={item.percent}
            onChange={(event) => onUpdateAllocation(item.name, Number(event.target.value))}
            className={`w-full cursor-pointer ${CONTROL_CONFIG.allocation.accentClassName}`}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
            <span>Expected Growth</span>
            <span>{item.growth}% / year</span>
          </div>
          <input
            type="range"
            min={CONTROL_CONFIG.growth.min}
            max={CONTROL_CONFIG.growth.max}
            step={CONTROL_CONFIG.growth.step}
            value={item.growth}
            onChange={(event) => onUpdateGrowthRate(item.name, Number(event.target.value))}
            className={`w-full cursor-pointer ${CONTROL_CONFIG.growth.accentClassName}`}
          />
        </div>
      </div>
    </div>
  );
}

export default function AllocationControlsSection({
  portfolio,
  totalAllocation,
  onNormalizeAllocations,
  onEqualWeight,
  onResetAllocations,
  onUpdateAllocation,
  onUpdateGrowthRate,
}) {
  return (
    <SectionCard>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Allocation Controls</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Adjust allocation and growth rate for each active stock.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full border px-4 py-2 text-sm ${
              totalAllocation === 100
                ? 'bg-green-500/10 border-green-400/30 text-green-300'
                : 'bg-orange-500/10 border-orange-400/30 text-orange-300'
            }`}
          >
            Total: {totalAllocation}%
          </span>
          <button
            onClick={onNormalizeAllocations}
            className="rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
          >
            Normalize to 100%
          </button>
          <button
            onClick={onEqualWeight}
            className="rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
          >
            Equal Weight
          </button>
          <button
            onClick={onResetAllocations}
            className="rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {portfolio.map((item) => (
          <AllocationControlRow
            key={item.name}
            item={item}
            onUpdateAllocation={onUpdateAllocation}
            onUpdateGrowthRate={onUpdateGrowthRate}
          />
        ))}
      </div>
    </SectionCard>
  );
}
