import { formatCurrency } from '../utils/formatters.js';

export default function HeroSection({ totalInvested }) {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-blue-300">
          Portfolio Visualizer
        </p>
        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">AI Growth Portfolio</h1>
        <p className="mt-3 text-lg text-zinc-400">Interactive DCA allocation dashboard</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-4 shadow-2xl backdrop-blur-xl">
        <p className="text-sm text-zinc-400">Total Capital Invested</p>
        <p className="mt-1 text-3xl font-bold">{formatCurrency(totalInvested)}</p>
        <p className="mt-1 text-xs text-zinc-500">Capital only, before projected growth</p>
      </div>
    </section>
  );
}
