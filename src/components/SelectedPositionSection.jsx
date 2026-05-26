import SectionCard from './SectionCard.jsx';

function SelectedPositionCard({ selected }) {
  return (
    <SectionCard className="p-7">
      <div className="mb-5 flex items-center gap-3">
        <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${selected.gradient}`} />
        <div>
          <p className="text-sm text-zinc-500">Selected Position</p>
          <h2 className="text-3xl font-bold">{selected.name}</h2>
        </div>
      </div>
      <p className="mb-4 text-zinc-400">{selected.description}</p>
      <p className="text-lg leading-relaxed text-zinc-100">{selected.thesis}</p>
    </SectionCard>
  );
}

function RiskProfileCard({ riskProfile }) {
  return (
    <SectionCard className="p-7">
      <h2 className="mb-6 text-2xl font-bold">Risk Profile</h2>
      <div className="space-y-5">
        {riskProfile.map((item) => (
          <div key={item.key}>
            <div className="mb-2 flex justify-between text-sm text-zinc-400">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="h-4 overflow-hidden rounded-full border border-white/10 bg-zinc-950/90 p-1">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.gradient}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default function SelectedPositionSection({ selected, riskProfile }) {
  if (!selected) {
    return null;
  }

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <SelectedPositionCard selected={selected} />
      <RiskProfileCard riskProfile={riskProfile} />
    </section>
  );
}
