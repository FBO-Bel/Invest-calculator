import React, { useState, useCallback, useEffect } from 'react';
import type { CalculationResult, ChartDataPoint } from './types';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import InvestmentChart from './components/InvestmentChart';

const App: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [years, setYears] = useState<number>(10);
  const [annualRate, setAnnualRate] = useState<number>(36);

  const [results, setResults] = useState<CalculationResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const calculateInvestmentGrowth = useCallback(() => {
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;
    let currentBalance = initialInvestment;
    let totalContributions = initialInvestment;
    const dataPoints: ChartDataPoint[] = [];

    dataPoints.push({
      year: 0,
      balance: initialInvestment,
      totalContributions: initialInvestment,
      totalInterest: 0,
    });

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        currentBalance = currentBalance * (1 + monthlyRate) + monthlyContribution;
        totalContributions += monthlyContribution;
      }
      const totalInterest = currentBalance - totalContributions;
      dataPoints.push({
        year,
        balance: Math.round(currentBalance),
        totalContributions: Math.round(totalContributions),
        totalInterest: Math.round(totalInterest),
      });
    }

    const finalBalance = currentBalance;
    const finalTotalContributions = initialInvestment + monthlyContribution * totalMonths;
    const finalTotalInterest = finalBalance - finalTotalContributions;

    setResults({
      finalBalance,
      totalContributions: finalTotalContributions,
      totalInterest: finalTotalInterest,
    });
    setChartData(dataPoints);
    setIsCalculated(true);
  }, [initialInvestment, monthlyContribution, years, annualRate]);

  useEffect(() => {
    calculateInvestmentGrowth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-[#272727] min-h-screen text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-[#EDC46E]">
            Инвестиционный калькулятор
          </h1>
          <p className="mt-2 text-lg text-zinc-400">
            Спланируйте своё финансовое будущее.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 bg-[#373737] p-6 rounded-2xl shadow-2xl border border-zinc-800">
            <CalculatorForm
              initialInvestment={initialInvestment}
              setInitialInvestment={setInitialInvestment}
              monthlyContribution={monthlyContribution}
              setMonthlyContribution={setMonthlyContribution}
              years={years}
              setYears={setYears}
              annualRate={annualRate}
              setAnnualRate={setAnnualRate}
              onCalculate={calculateInvestmentGrowth}
            />
          </div>

          <div className="lg:col-span-3 bg-[#373737] p-6 rounded-2xl shadow-2xl border border-zinc-800">
            {isCalculated && results ? (
              <div className="flex flex-col h-full">
                <ResultsDisplay results={results} />
                <div className="flex-grow mt-6 min-h-[300px] sm:min-h-[400px]">
                  <InvestmentChart data={chartData} />
                </div>
              </div>
            ) : (
               <div className="flex items-center justify-center h-full text-zinc-400">
                <p>Введите данные и нажмите "Рассчитать", чтобы увидеть результаты.</p>
              </div>
            )}
          </div>
        </main>
        
        <footer className="text-center mt-12 text-zinc-500 text-sm">
            <p>Этот калькулятор предназначен для иллюстративных целей и не является финансовой консультацией.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;