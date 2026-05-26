import SectionCard from './SectionCard.jsx';

export default function StockUniverseSection({ stockLibrary, enabledStocks, onToggleStock }) {
  return (
    <SectionCard>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Stock Universe</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Turn stocks on/off. Active stocks will be included in the 100% portfolio
            allocation.
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-zinc-300">
          Active: {enabledStocks.length} stocks
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stockLibrary.map((stock) => {
          const isEnabled = enabledStocks.includes(stock.name);

          return (
            <button
              key={stock.name}
              onClick={() => onToggleStock(stock.name)}
              className={`rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                isEnabled
                  ? 'border-white/40 bg-white/[0.08]'
                  : 'bg-zinc-950/50 opacity-55 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${stock.gradient}`} />
                  <div>
                    <p className="text-lg font-bold">{stock.name}</p>
                    <p className="text-xs text-zinc-500">{stock.description}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    isEnabled
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-zinc-700 text-zinc-400'
                  }`}
                >
                  {isEnabled ? 'ON' : 'OFF'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}
