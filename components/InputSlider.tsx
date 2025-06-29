import React, { useState, useEffect } from 'react';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}

const formatNumber = (num: number) => new Intl.NumberFormat('ru-RU').format(num);

const InputSlider: React.FC<InputSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  // Internal state for the input field to allow for more flexible typing
  const [inputValue, setInputValue] = useState(String(value));

  // When the external `value` prop changes (e.g., from the slider),
  // or when the input loses focus, sync the internal `inputValue`.
  useEffect(() => {
    if (!isFocused) {
      setInputValue(String(value));
    }
  }, [value, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow typing only numbers and a decimal point for percentages.
    const sanitizedValue = e.target.value.replace(unit === '%' ? /[^0-9.]/g : /[^0-9]/g, '');
    setInputValue(sanitizedValue);
  };

  const handleBlur = () => {
    let numValue = unit === '%' ? parseFloat(inputValue) : parseInt(inputValue, 10);

    // If input is invalid, we don't call onChange.
    // The `useEffect` will revert the `inputValue` to the last valid `value`
    // because `isFocused` is set to false.
    if (isNaN(numValue)) {
      setIsFocused(false);
      return;
    }

    // Clamp value within min/max bounds
    numValue = Math.max(min, Math.min(max, numValue));
    
    onChange(numValue);
    setIsFocused(false);
  };

  const handleFocus = () => {
    // When focusing, set inputValue to the current raw value for editing.
    setInputValue(String(value));
    setIsFocused(true);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(e.target.value);
    onChange(numValue);
  };
  
  const formattedValue = 
    unit === '$' 
    ? `${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)} $`
    : `${unit === '%' ? value.toLocaleString('ru-RU', {minimumFractionDigits: 0, maximumFractionDigits: 1}) : formatNumber(value)} ${unit}`;

  return (
    <div className="space-y-2">
      <label className="flex justify-between items-baseline text-sm font-medium text-zinc-300">
        <span>{label}</span>
        <input
          type="text"
          value={isFocused ? inputValue : formattedValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="bg-[#272727] text-white text-right font-semibold rounded-md py-1 px-2 w-36 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#EDC46E]"
        />
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#EDC46E]"
      />
    </div>
  );
};

export default InputSlider;