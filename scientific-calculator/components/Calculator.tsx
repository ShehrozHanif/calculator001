// scientific-calculator/components/Calculator.tsx
"use client";

import React, { useState, useEffect } from 'react'; // Added useEffect
import Display from './Display';
import Button from './Button';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0'); // What is currently shown on the display
  const [currentValue, setCurrentValue] = useState(''); // Stores the first operand for binary operations
  const [operator, setOperator] = useState<string | null>(null); // Stores the pending operator
  const [waitingForOperand, setWaitingForOperand] = useState(false); // Flag if an operator was just pressed or result shown

  // --- Keyboard Support (T025) ---
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;

      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(key)) {
        append(key);
      if (['+', '-', '*', '/'].includes(key)) {
        performOperation(key);
      } else if (key === '^') {
        performOperation(key);
      } else if (key === 'Enter') {
        event.preventDefault();
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
  }, [displayValue, currentValue, operator, waitingForOperand]); // Updated dependencies


  const append = (value: string) => {
    // If an error is displayed or we are starting a new operand
    if (displayValue.includes('Error') || waitingForOperand) {
      setDisplayValue(value);
      setWaitingForOperand(false);
    } else {
      // Handle leading '0'
      if (displayValue === '0' && value !== '.') {
        setDisplayValue(value);
      } else if (value === '.' && displayValue.includes('.')) {
        // Prevent multiple decimal points in the current number
        return;
      } else {
        setDisplayValue(prev => prev + value);
      }
    }
  };

  const clear = () => {
    setDisplayValue('0');
    setCurrentValue('');
    setOperator(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (displayValue.includes('Error')) { // Clear error message on backspace
        setDisplayValue('0');
        setCurrentValue('');
        setOperator(null);
        setWaitingForOperand(false);
        return;
    }
    setDisplayValue(displayValue.length === 1 ? '0' : displayValue.slice(0, -1));
  };


  const performOperation = (nextOperator: string) => {
    if (displayValue.includes('Error')) return; // If error, user must clear

    // Prevent consecutive operators, or operator at start of expression
    const lastChar = displayValue.slice(-1);
    if (['+', '-', '*', '/', '^'].includes(lastChar) || displayValue === '0') {
        // Replace existing operator or prevent leading operator
        setDisplayValue(prev => prev.slice(0, -1) + nextOperator);
        setOperator(nextOperator); // Update operator
        return;
    }

    // Append operator to displayValue
    setDisplayValue(prev => prev + nextOperator);
    setOperator(nextOperator); // Store operator for calculation
    setWaitingForOperand(true); // Flag that we're waiting for next number
  };

  const calculate = () => {
    if (displayValue.includes('Error')) return; // If error, user must clear
    if (displayValue === '') return; // No expression to calculate

    let expressionToEvaluate = displayValue;

    // Replace '^' with '**' for Math.pow compatibility
    expressionToEvaluate = expressionToEvaluate.replace(/\^/g, '**');

    try {
      // Basic validation to prevent arbitrary code execution with eval
      // This is a minimal check, for a real app a dedicated parser is needed.
      if (!/^[\d+\-*/().\s**]+$/.test(expressionToEvaluate)) {
        throw new Error('Invalid expression');
      }
      // eslint-disable-next-line no-eval
      let result = eval(expressionToEvaluate);

      if (isNaN(result) || !isFinite(result)) {
        throw new Error('Invalid calculation');
      }

      setDisplayValue(String(result));
      setCurrentValue(String(result)); // Store result for chaining operations
      setOperator(null);
      setWaitingForOperand(true); // Now waiting for new number or operator after result
    } catch (e: any) {
      setDisplayValue(`Error: ${e.message}`);
      setCurrentValue(''); // Clear for error state
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const scientificFunc = (func: string) => {
    if (displayValue.includes('Error')) return; // If error, user must clear

    // Extract the last number from the displayValue for scientific function
    const lastNumberMatch = displayValue.match(/(\d+\.?\d*)$/);
    let numberToOperateOn = displayValue; // Default to full displayValue if no match

    if (lastNumberMatch) {
      numberToOperateOn = lastNumberMatch[1];
    } else if (!waitingForOperand) { // If not waiting for operand, then displayValue should be a number
        // This means displayValue is an expression without a trailing number
        // or a result already.
        // If displayValue is just a number, it will be handled by parseFloat below.
        // If it's something like "1+": error
        if (/[+\-*/^]/.test(displayValue.slice(-1))) { // Ends with an operator
            setDisplayValue('Error: Invalid input');
            setCurrentValue('');
            setOperator(null);
            setWaitingForOperand(true);
            return;
        }
    }


    const inputValue = parseFloat(numberToOperateOn);
    if (isNaN(inputValue)) {
      setDisplayValue('Error: Invalid input');
      setCurrentValue('');
      setOperator(null);
      setWaitingForOperand(true);
      return;
    }

    let result: number;
    switch (func) {
      case 'sin':
        result = Math.sin(inputValue * (Math.PI / 180));
        break;
      case 'cos':
        result = Math.cos(inputValue * (Math.PI / 180));
        break;
      case 'tan':
        result = Math.tan(inputValue * (Math.PI / 180));
        break;
      case 'log':
        if (inputValue <= 0) {
          setDisplayValue('Error: Log of non-positive');
          setCurrentValue('');
          setOperator(null);
          setWaitingForOperand(true);
          return;
        }
        result = Math.log10(inputValue);
        break;
      case 'sqrt':
        if (inputValue < 0) {
          setDisplayValue('Error: Sqrt of negative');
          setCurrentValue('');
          setOperator(null);
          setWaitingForOperand(true);
          return;
        }
        result = Math.sqrt(inputValue);
        break;
      default:
        return;
    }

    // Update displayValue by replacing the last number with the result
    // If there was an operator before the number, replace the number part
    const newDisplayValue = displayValue.replace(/(\d+\.?\d*)$/, String(result));
    setDisplayValue(newDisplayValue);
    setCurrentValue(String(result)); // Store result for chaining
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
        <Display value={displayValue} />
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