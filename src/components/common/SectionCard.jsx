export default function SectionCard({ children, className = '' }) {
  return (
    <section
      className={`rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur-xl md:p-8 ${className}`.trim()}
    >
      {children}
    </section>
  );
}
