import { formatCurrency } from '../utils/formatters.js';
import SummaryCard from './SummaryCard.jsx';

export default function ProjectionSummary({ totalInvested, projectedValue, projectedGain }) {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      <SummaryCard
        label="Total Invested"
        value={formatCurrency(totalInvested)}
        note="Your own capital"
      />
      <SummaryCard
        label="Projected Value"
        value={formatCurrency(projectedValue)}
        note="Weighted average from portfolio growth rates"
      />
      <SummaryCard
        label="Projected Gain"
        value={formatCurrency(projectedGain)}
        note="Growth estimate only"
      />
    </section>
  );
}
