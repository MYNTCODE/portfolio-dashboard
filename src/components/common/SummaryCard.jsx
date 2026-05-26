export default function SummaryCard({ label, value, note }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl">
      <p className="mb-2 text-zinc-400">{label}</p>
      <p className="text-3xl font-bold md:text-4xl">{value}</p>
      <p className="mt-2 text-xs text-zinc-500">{note}</p>
    </div>
  );
}
