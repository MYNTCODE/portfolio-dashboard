export default function MetricCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
      <p className="mb-1 text-xs text-zinc-500">{label}</p>
      <p className="truncate text-lg font-bold md:text-xl">{value}</p>
    </div>
  );
}
