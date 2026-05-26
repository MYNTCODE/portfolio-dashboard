import AllocationControlsSection from '../components/AllocationControlsSection.jsx';
import DashboardControls from '../components/DashboardControls.jsx';
import HeroSection from '../components/HeroSection.jsx';
import PortfolioAllocationSection from '../components/PortfolioAllocationSection.jsx';
import ProjectionSummary from '../components/ProjectionSummary.jsx';
import SelectedPositionSection from '../components/SelectedPositionSection.jsx';
import StockUniverseSection from '../components/StockUniverseSection.jsx';
import { STOCK_LIBRARY } from '../data/stockLibrary.js';
import { usePortfolioDashboard } from '../hooks/usePortfolioDashboard.js';

export default function PortfolioDashboardPage() {
  const dashboard = usePortfolioDashboard();

  return (
    <>
      <HeroSection totalInvested={dashboard.totalInvested} />
      <DashboardControls
        monthlyBudget={dashboard.monthlyBudget}
        setMonthlyBudget={dashboard.setMonthlyBudget}
        years={dashboard.years}
        setYears={dashboard.setYears}
        weightedAnnualGrowth={dashboard.weightedAnnualGrowth}
      />
      <ProjectionSummary
        totalInvested={dashboard.totalInvested}
        projectedValue={dashboard.projectedValue}
        projectedGain={dashboard.projectedGain}
      />
      <StockUniverseSection
        stockLibrary={STOCK_LIBRARY}
        enabledStocks={dashboard.enabledStocks}
        onToggleStock={dashboard.toggleStock}
      />
      <AllocationControlsSection
        portfolio={dashboard.portfolio}
        totalAllocation={dashboard.totalAllocation}
        onNormalizeAllocations={dashboard.normalizeAllocations}
        onEqualWeight={dashboard.equalWeight}
        onResetAllocations={dashboard.resetAllocations}
        onUpdateAllocation={dashboard.updateAllocation}
        onUpdateGrowthRate={dashboard.updateGrowthRate}
      />
      <PortfolioAllocationSection
        calculatedPortfolio={dashboard.calculatedPortfolio}
        totalAllocation={dashboard.totalAllocation}
        years={dashboard.years}
        selectedStock={dashboard.selectedStock}
        onSelectStock={dashboard.setSelectedStock}
      />
      <SelectedPositionSection
        selected={dashboard.selected}
        riskProfile={dashboard.riskProfile}
      />
    </>
  );
}
