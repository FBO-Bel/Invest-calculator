export interface CalculationResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
}

export interface ChartDataPoint {
  year: number;
  balance: number;
  totalContributions: number;
  totalInterest: number;
}
