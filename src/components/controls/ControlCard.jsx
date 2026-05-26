export default function ControlCard({
  label,
  value,
  min,
  max,
  step,
  rangeValue,
  onChange,
  accentClassName = 'accent-blue-500',
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl">
      <p className="mb-2 text-zinc-400">{label}</p>
      <p className="mb-5 text-4xl font-bold">{value}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={rangeValue}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`w-full cursor-pointer ${accentClassName}`}
      />
    </div>
  );
}
