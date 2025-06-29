import React from 'react';
import type { CalculationResult } from '../types';
import PiggyBankIcon from './icons/PiggyBankIcon';
import ChartIcon from './icons/ChartIcon';
import CalculatorIcon from './icons/CalculatorIcon';

interface ResultsDisplayProps {
  results: CalculationResult;
}

const formatCurrency = (value: number) =>
  `${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)} $`;

const ResultCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className={`bg-black/25 p-4 rounded-xl flex items-center space-x-4 border-l-4 ${color}`}>
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div>
        <h2 className="text-2xl font-bold text-white mb-4">Результаты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResultCard 
                title="Итоговый баланс"
                value={formatCurrency(results.finalBalance)}
                icon={<PiggyBankIcon />}
                color="border-[#EDC46E]"
            />
            <ResultCard 
                title="Всего вложений"
                value={formatCurrency(results.totalContributions)}
                icon={<CalculatorIcon />}
                color="border-zinc-500"
            />
            <ResultCard 
                title="Доход от процентов"
                value={formatCurrency(results.totalInterest)}
                icon={<ChartIcon />}
                color="border-zinc-600"
            />
        </div>
    </div>
  );
};

export default ResultsDisplay;