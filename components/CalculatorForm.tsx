import React from 'react';
import InputSlider from './InputSlider';

interface CalculatorFormProps {
  initialInvestment: number;
  setInitialInvestment: (value: number) => void;
  monthlyContribution: number;
  setMonthlyContribution: (value: number) => void;
  years: number;
  setYears: (value: number) => void;
  annualRate: number;
  setAnnualRate: (value: number) => void;
  onCalculate: () => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  initialInvestment,
  setInitialInvestment,
  monthlyContribution,
  setMonthlyContribution,
  years,
  setYears,
  annualRate,
  setAnnualRate,
  onCalculate,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Параметры</h2>
      
      <InputSlider
        label="Начальный капитал"
        value={initialInvestment}
        onChange={setInitialInvestment}
        min={0}
        max={1000000}
        step={1000}
        unit="$"
      />
      
      <InputSlider
        label="Ежемесячные пополнения"
        value={monthlyContribution}
        onChange={setMonthlyContribution}
        min={0}
        max={100000}
        step={500}
        unit="$"
      />
      
      <InputSlider
        label="Срок инвестирования"
        value={years}
        onChange={setYears}
        min={1}
        max={50}
        step={1}
        unit="лет"
      />
      
      <InputSlider
        label="Ожидаемая доходность"
        value={annualRate}
        onChange={setAnnualRate}
        min={36}
        max={72}
        step={0.5}
        unit="%"
      />
      
      <button
        onClick={onCalculate}
        className="w-full bg-[#EDC46E] hover:bg-[#d4ad61] text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#EDC46E] focus:ring-opacity-50 text-lg shadow-lg"
      >
        Рассчитать
      </button>
    </div>
  );
};

export default CalculatorForm;