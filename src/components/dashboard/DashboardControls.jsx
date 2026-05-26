import { CONTROL_CONFIG } from '../../constants/portfolio.js';
import { formatCurrency } from '../../utils/formatters.js';
import SummaryCard from '../common/SummaryCard.jsx';
import ControlCard from '../controls/ControlCard.jsx';

export default function DashboardControls({
  monthlyBudget,
  setMonthlyBudget,
  years,
  setYears,
  weightedAnnualGrowth,
}) {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      <ControlCard
        label={CONTROL_CONFIG.monthlyBudget.label}
        value={formatCurrency(monthlyBudget)}
        min={CONTROL_CONFIG.monthlyBudget.min}
        max={CONTROL_CONFIG.monthlyBudget.max}
        step={CONTROL_CONFIG.monthlyBudget.step}
        rangeValue={monthlyBudget}
        onChange={setMonthlyBudget}
        accentClassName={CONTROL_CONFIG.monthlyBudget.accentClassName}
      />
      <ControlCard
        label={CONTROL_CONFIG.years.label}
        value={`${years} years`}
        min={CONTROL_CONFIG.years.min}
        max={CONTROL_CONFIG.years.max}
        step={CONTROL_CONFIG.years.step}
        rangeValue={years}
        onChange={setYears}
        accentClassName={CONTROL_CONFIG.years.accentClassName}
      />
      <SummaryCard
        label="Weighted Portfolio Growth"
        value={`${weightedAnnualGrowth.toFixed(1)}% / year`}
        note="Calculated from active stocks"
      />
    </section>
  );
}
