const portfolioFont = `
  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&display=swap');

  .portfolio-font {
    font-family: 'Inter Tight', Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
`;

export default function PortfolioLayout({ children }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#07070A] text-white portfolio-font">
      <style>{portfolioFont}</style>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_32%)]" />
      <main className="relative mx-auto max-w-6xl space-y-8 px-6 py-10">{children}</main>
    </div>
  );
}
