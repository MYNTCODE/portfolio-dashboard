import DashboardControls from '../components/dashboard/DashboardControls.jsx';
import HeroSection from '../components/dashboard/HeroSection.jsx';
import AllocationControlsSection from '../components/portfolio/AllocationControlsSection.jsx';
import PortfolioAllocationSection from '../components/portfolio/PortfolioAllocationSection.jsx';
import ProjectionSummary from '../components/portfolio/ProjectionSummary.jsx';
import SelectedPositionSection from '../components/portfolio/SelectedPositionSection.jsx';
import StockUniverseSection from '../components/portfolio/StockUniverseSection.jsx';
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
