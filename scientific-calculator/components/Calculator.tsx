// scientific-calculator/components/Calculator.tsx
"use client";

import React, { useState, useEffect } from 'react'; // Added useEffect
import Display from './Display';
import Button from './Button';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // --- Keyboard Support (T025) ---
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;

      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(key)) {
        append(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        performOperation(key);
      } else if (key === '^') {
        performOperation(key);
      } else if (key === 'Enter') {
        event.preventDefault(); // Prevent default form submission if any
        calculate();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === 'Escape') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [display, currentValue, operator, waitingForOperand]); // Dependencies for useEffect


  const append = (value: string) => {
    if (display.includes('Error')) { // Clear error message before appending
        setDisplay('0');
    }
    if (value === '.' && display.includes('.')) return;
    if (waitingForOperand) {
      setDisplay(value);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const clear = () => {
    setDisplay('0');
    setCurrentValue('');
    setOperator(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (display.includes('Error')) { // Clear error message on backspace
        setDisplay('0');
        return;
    }
    setDisplay(display.length === 1 ? '0' : display.slice(0, -1));
  };


  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (currentValue === '') {
      setCurrentValue(String(inputValue));
    } else if (operator) {
      const prevValue = parseFloat(currentValue);
      let result: number;
      switch (operator) {
        case '+':
          result = prevValue + inputValue;
          break;
        case '-':
          result = prevValue - inputValue;
          break;
        case '*':
          result = prevValue * inputValue;
          break;
        case '/':
          if (inputValue === 0) {
            setDisplay('Error: Div by zero');
            setCurrentValue('');
            setOperator(null);
            setWaitingForOperand(true);
            return;
          }
          result = prevValue / inputValue;
          break;
        case '^': // Power operation
          result = Math.pow(prevValue, inputValue);
          break;
        default:
          return;
      }
      setCurrentValue(String(result));
      setDisplay(String(result));
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (currentValue === '' || operator === null || waitingForOperand) return;

    const prevValue = parseFloat(currentValue);
    const inputValue = parseFloat(display);

    let result: number;
    try {
      switch (operator) {
        case '+':
          result = prevValue + inputValue;
          break;
        case '-':
          result = prevValue - inputValue;
          break;
        case '*':
          result = prevValue * inputValue;
          break;
        case '/':
          if (inputValue === 0) {
            setDisplay('Error: Div by zero');
            setCurrentValue('');
            setOperator(null);
            setWaitingForOperand(true);
            return;
          }
          result = prevValue / inputValue;
          break;
        case '^': // Power operation
          result = Math.pow(prevValue, inputValue);
          break;
        default:
          throw new Error('Invalid operator');
      }
      setCurrentValue(String(result));
      setDisplay(String(result));
      setOperator(null);
      setWaitingForOperand(true);
    } catch (e: any) {
      setDisplay(`Error: ${e.message}`);
      setCurrentValue('');
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const scientificFunc = (func: string) => {
    const inputValue = parseFloat(display);
    if (isNaN(inputValue)) {
      setDisplay('Error: Invalid input');
      return;
    }
    let result: number;
    switch (func) {
      case 'sin':
        result = Math.sin(inputValue * (Math.PI / 180)); // Convert degrees to radians
        break;
      case 'cos':
        result = Math.cos(inputValue * (Math.PI / 180)); // Convert degrees to radians
        break;
      case 'tan':
        result = Math.tan(inputValue * (Math.PI / 180)); // Convert degrees to radians
        break;
      case 'log':
        if (inputValue <= 0) {
          setDisplay('Error: Log of non-positive');
          return;
        }
        result = Math.log10(inputValue); // Base 10 log
        break;
      case 'sqrt':
        if (inputValue < 0) {
          setDisplay('Error: Sqrt of negative');
          return;
        }
        result = Math.sqrt(inputValue);
        break;
      default:
        return;
    }
    setDisplay(String(result));
    setCurrentValue(String(result));
    setOperator(null);
    setWaitingForOperand(true);
  };


  const buttonLayout = [
    ['C', '←', '^', '/'],
    ['sin', 'cos', 'tan', '*'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', '=', '='], // Two '=' for layout
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-700 p-6 rounded-lg shadow-xl max-w-sm mx-auto">
        <Display value={display} />
        <div className="grid grid-cols-4 gap-2 mt-4">
          {buttonLayout.map((row, rowIndex) => (
            row.map((buttonLabel, colIndex) => {
              let variantType: 'default' | 'operator' | 'action' | 'scientific' = 'default';
              if (['+', '-', '*', '/', '^'].includes(buttonLabel)) {
                variantType = 'operator';
              } else if (['C', '←'].includes(buttonLabel)) {
                variantType = 'action';
              } else if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(buttonLabel)) {
                variantType = 'scientific';
              }

              const handleClick = () => {
                if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(buttonLabel)) {
                  append(buttonLabel);
                } else if (['+', '-', '*', '/', '^'].includes(buttonLabel)) {
                  performOperation(buttonLabel);
                } else if (buttonLabel === 'C') {
                  clear();
                } else if (buttonLabel === '←') {
                  backspace();
                } else if (buttonLabel === '=') {
                  calculate();
                } else if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(buttonLabel)) {
                  scientificFunc(buttonLabel);
                }
              };

              return (
                <Button
                  key={`${rowIndex}-${colIndex}`}
                  label={buttonLabel}
                  onClick={handleClick}
                  variant={variantType}
                />
              );
            })
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;