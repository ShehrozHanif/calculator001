"use client";

import React, { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      if (/[0-9.]/.test(key)) append(key);
      else if (/[+\-*/^]/.test(key)) append(key);
      else if (key === 'Enter') { event.preventDefault(); calculate(); }
      else if (key === 'Backspace') backspace();
      else if (key === 'Escape') clear();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [displayValue]);

  const append = (value: string) => {
    if (displayValue.includes('Error') || waitingForOperand) {
      setDisplayValue(value);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(prev => (prev === '0' ? value : prev + value));
    }
  };

  const clear = () => setDisplayValue('0');

  const backspace = () => {
    setDisplayValue(prev => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
  };

  const calculate = () => {
    let expression = displayValue.replace(/\^/g, '**');
    try {
      if (!/^[0-9+\-*/().\s**]+$/.test(expression)) throw new Error('Invalid expression');
      // eslint-disable-next-line no-eval
      const result = eval(expression);
      if (!isFinite(result)) throw new Error('Invalid calculation');
      setDisplayValue(String(result));
      setWaitingForOperand(true);
    } catch (e: any) {
      setDisplayValue(`Error: ${e.message}`);
      setWaitingForOperand(true);
    }
  };

  const scientificFunc = (func: string) => {
    let value = parseFloat(displayValue);
    if (isNaN(value)) return;
    let result = value;
    switch (func) {
      case 'sin': result = Math.sin(value * (Math.PI/180)); break;
      case 'cos': result = Math.cos(value * (Math.PI/180)); break;
      case 'tan': result = Math.tan(value * (Math.PI/180)); break;
      case 'log': result = value > 0 ? Math.log10(value) : NaN; break;
      case 'sqrt': result = value >= 0 ? Math.sqrt(value) : NaN; break;
    }
    if (isNaN(result)) setDisplayValue('Error: Invalid input');
    else {
      setDisplayValue(String(result));
      setWaitingForOperand(true);
    }
  };

  const buttonLayout = [
    ['C', '←', '^', '/'],
    ['sin', 'cos', 'tan', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', '=', '='],
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-700 p-6 rounded-lg shadow-xl max-w-sm mx-auto">
        <Display value={displayValue} />
        <div className="grid grid-cols-4 gap-2 mt-4">
          {buttonLayout.flat().map((label, index) => {
            let variant: 'default' | 'operator' | 'action' | 'scientific' = 'default';
            if (['+', '-', '*', '/', '^'].includes(label)) variant = 'operator';
            else if (['C', '←'].includes(label)) variant = 'action';
            else if (['sin','cos','tan','log','sqrt'].includes(label)) variant = 'scientific';

            const handleClick = () => {
              if (label === 'C') clear();
              else if (label === '←') backspace();
              else if (label === '=') calculate();
              else if (['sin','cos','tan','log','sqrt'].includes(label)) scientificFunc(label);
              else append(label);
            };

            return <Button key={index} label={label} onClick={handleClick} variant={variant} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculator;