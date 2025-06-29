import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../types';

interface InvestmentChartProps {
  data: ChartDataPoint[];
}

const formatCurrency = (value: number) => {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M $`;
    }
    if (value >= 1000) {
        return `${(value / 1000).toFixed(0)}K $`;
    }
    return `${value} $`;
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const format = (val: number) => `${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val)} $`;
    
    return (
      <div className="bg-[#373737] p-4 rounded-lg border border-zinc-700 shadow-xl text-sm">
        <p className="font-bold text-white mb-2">{`Год ${label}`}</p>
        <p className="text-zinc-400">{`Всего вложений: ${format(data.totalContributions)}`}</p>
        <p className="text-[#EDC46E]">{`Доход: ${format(data.totalInterest)}`}</p>
        <p className="text-white font-semibold mt-1">{`Баланс: ${format(data.balance)}`}</p>
      </div>
    );
  }

  return null;
};


const InvestmentChart: React.FC<InvestmentChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
        <XAxis dataKey="year" stroke="#a1a1aa" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
        <YAxis stroke="#a1a1aa" tick={{ fill: '#a1a1aa', fontSize: 12 }} tickFormatter={formatCurrency} width={80} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{fontSize: "14px", color: "#d4d4d8"}}/>
        <Area 
            type="monotone" 
            dataKey="totalContributions" 
            stackId="1" 
            stroke="#a1a1aa" 
            fill="#71717a" 
            fillOpacity={0.6}
            name="Вложения"
        />
        <Area 
            type="monotone" 
            dataKey="totalInterest" 
            stackId="1" 
            stroke="#EDC46E" 
            fill="#EDC46E" 
            fillOpacity={0.6}
            name="Доход"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default InvestmentChart;