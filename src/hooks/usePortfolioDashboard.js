import { useMemo, useState } from 'react';

import {
  DEFAULT_ENABLED_STOCKS,
  DEFAULT_INVESTMENT_YEARS,
  DEFAULT_MONTHLY_BUDGET,
} from '../constants/portfolio.js';
import { STOCK_LIBRARY } from '../data/stockLibrary.js';
import {
  buildPortfolio,
  buildRiskProfile,
  calculatePositionAmounts,
  calculateProjectedValue,
  calculateWeightedAnnualGrowth,
  createInitialMap,
  equalWeightAllocation,
  getTotalAllocation,
  normalizeAllocationMap,
  resetAllocationMap,
} from '../utils/portfolio.js';

export function usePortfolioDashboard() {
  const [monthlyBudget, setMonthlyBudget] = useState(DEFAULT_MONTHLY_BUDGET);
  const [years, setYears] = useState(DEFAULT_INVESTMENT_YEARS);
  const [selectedStock, setSelectedStock] = useState(DEFAULT_ENABLED_STOCKS[0]);
  const [enabledStocks, setEnabledStocks] = useState(DEFAULT_ENABLED_STOCKS);
  const [allocations, setAllocations] = useState(() =>
    createInitialMap(STOCK_LIBRARY, 'defaultAllocation'),
  );
  const [growthRates, setGrowthRates] = useState(() =>
    createInitialMap(STOCK_LIBRARY, 'defaultGrowth', STOCK_LIBRARY.map((stock) => stock.name)),
  );

  const portfolio = useMemo(
    () => buildPortfolio(STOCK_LIBRARY, enabledStocks, allocations, growthRates),
    [enabledStocks, allocations, growthRates],
  );

  const totalAllocation = useMemo(() => getTotalAllocation(portfolio), [portfolio]);

  const selected = portfolio.find((item) => item.name === selectedStock) ?? portfolio[0] ?? null;

  const calculatedPortfolio = useMemo(
    () => calculatePositionAmounts(portfolio, monthlyBudget, years),
    [portfolio, monthlyBudget, years],
  );

  const totalInvested = monthlyBudget * 12 * years;

  const weightedAnnualGrowth = useMemo(
    () => calculateWeightedAnnualGrowth(portfolio),
    [portfolio],
  );

  const projectedValue = useMemo(
    () => calculateProjectedValue(monthlyBudget, years, weightedAnnualGrowth, totalInvested),
    [monthlyBudget, years, weightedAnnualGrowth, totalInvested],
  );

  const projectedGain = projectedValue - totalInvested;
  const riskProfile = useMemo(
    () => buildRiskProfile(weightedAnnualGrowth),
    [weightedAnnualGrowth],
  );

  const updateAllocation = (stockName, value) => {
    setAllocations((prev) => ({ ...prev, [stockName]: value }));
  };

  const updateGrowthRate = (stockName, value) => {
    setGrowthRates((prev) => ({ ...prev, [stockName]: value }));
  };

  const normalizeAllocations = () => {
    setAllocations((prev) => normalizeAllocationMap(portfolio, prev, totalAllocation));
  };

  const resetAllocations = () => {
    // Reset first, then normalize so active allocations always sum to 100.
    setAllocations(resetAllocationMap(STOCK_LIBRARY, enabledStocks));
    setTimeout(normalizeAllocations, 0);
  };

  const toggleStock = (stockName) => {
    const isEnabled = enabledStocks.includes(stockName);

    if (isEnabled && enabledStocks.length === 1) {
      return;
    }

    if (isEnabled) {
      const nextEnabled = enabledStocks.filter((name) => name !== stockName);
      setEnabledStocks(nextEnabled);
      setAllocations((prev) => ({ ...prev, [stockName]: 0 }));
      if (selectedStock === stockName) {
        setSelectedStock(nextEnabled[0]);
      }
      return;
    }

    const stock = STOCK_LIBRARY.find((item) => item.name === stockName);
    setEnabledStocks((prev) => [...prev, stockName]);
    setSelectedStock(stockName);
    setAllocations((prev) => ({
      ...prev,
      [stockName]: stock?.defaultAllocation ?? 10,
    }));
  };

  const equalWeight = () => {
    setAllocations((prev) => equalWeightAllocation(portfolio, prev));
  };

  return {
    monthlyBudget,
    setMonthlyBudget,
    years,
    setYears,
    selectedStock,
    setSelectedStock,
    enabledStocks,
    allocations,
    growthRates,
    portfolio,
    totalAllocation,
    selected,
    calculatedPortfolio,
    totalInvested,
    weightedAnnualGrowth,
    projectedValue,
    projectedGain,
    riskProfile,
    updateAllocation,
    updateGrowthRate,
    normalizeAllocations,
    resetAllocations,
    toggleStock,
    equalWeight,
  };
}
