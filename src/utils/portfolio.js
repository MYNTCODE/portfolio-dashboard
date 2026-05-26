import { DEFAULT_ENABLED_STOCKS, RISK_PROFILE_CONFIG } from '../constants/portfolio.js';

export function createInitialMap(stockLibrary, valueKey, enabledStocks = DEFAULT_ENABLED_STOCKS) {
  return stockLibrary.reduce((result, stock) => {
    result[stock.name] = enabledStocks.includes(stock.name) ? stock[valueKey] : 0;
    return result;
  }, {});
}

export function buildPortfolio(stockLibrary, enabledStocks, allocations, growthRates) {
  return stockLibrary
    .filter((stock) => enabledStocks.includes(stock.name))
    .map((stock) => ({
      ...stock,
      percent: allocations[stock.name] ?? 0,
      growth: growthRates[stock.name] ?? 0,
    }));
}

export function getTotalAllocation(portfolio) {
  return portfolio.reduce((sum, item) => sum + item.percent, 0);
}

export function calculatePositionAmounts(portfolio, monthlyBudget, years) {
  return portfolio.map((item) => ({
    ...item,
    amount: Math.round((monthlyBudget * item.percent) / 100),
    yearlyAmount: Math.round((monthlyBudget * item.percent * 12) / 100),
    totalAmount: Math.round((monthlyBudget * item.percent * 12 * years) / 100),
  }));
}

export function calculateWeightedAnnualGrowth(portfolio) {
  return portfolio.reduce((sum, item) => {
    const allocationWeight = item.percent / 100;
    return sum + allocationWeight * item.growth;
  }, 0);
}

export function calculateProjectedValue(monthlyBudget, years, weightedAnnualGrowth, totalInvested) {
  const monthlyRate = weightedAnnualGrowth / 100 / 12;
  const totalMonths = years * 12;

  if (monthlyRate === 0) {
    return totalInvested;
  }

  return Math.round(monthlyBudget * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate));
}

export function normalizeAllocationMap(portfolio, allocations, totalAllocation) {
  if (portfolio.length === 0 || totalAllocation === 0) {
    return allocations;
  }

  const normalized = { ...allocations };
  let runningTotal = 0;

  portfolio.forEach((item, index) => {
    if (index === portfolio.length - 1) {
      normalized[item.name] = Math.max(0, 100 - runningTotal);
      return;
    }

    const value = Math.round(((allocations[item.name] ?? 0) / totalAllocation) * 100);
    normalized[item.name] = value;
    runningTotal += value;
  });

  return normalized;
}

export function equalWeightAllocation(portfolio, allocations) {
  if (portfolio.length === 0) {
    return allocations;
  }

  const next = { ...allocations };
  const base = Math.floor(100 / portfolio.length);
  let remainder = 100 - base * portfolio.length;

  portfolio.forEach((item) => {
    next[item.name] = base + (remainder > 0 ? 1 : 0);
    remainder -= 1;
  });

  return next;
}

export function resetAllocationMap(stockLibrary, enabledStocks) {
  return createInitialMap(stockLibrary, 'defaultAllocation', enabledStocks);
}

export function buildRiskProfile(weightedAnnualGrowth) {
  const values = {
    growth: Math.min(100, Math.round(weightedAnnualGrowth * 5)),
    stability: Math.max(20, 100 - Math.round(weightedAnnualGrowth * 3)),
    volatility: Math.min(100, 40 + Math.round(weightedAnnualGrowth * 2)),
  };

  return RISK_PROFILE_CONFIG.map((item) => ({
    ...item,
    value: values[item.key],
  }));
}
