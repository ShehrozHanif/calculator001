// scientific-calculator/components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'action' | 'scientific';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'default' }) => {
  let bgColor = 'bg-gray-600'; // Default numbers
  let hoverBgColor = 'hover:bg-gray-700';
  let textColor = 'text-white';

  switch (variant) {
    case 'operator':
      bgColor = 'bg-indigo-500';
      hoverBgColor = 'hover:bg-indigo-600';
      break;
    case 'action':
      bgColor = 'bg-red-500';
      hoverBgColor = 'hover:bg-red-600';
      break;
    case 'scientific':
      bgColor = 'bg-green-500';
      hoverBgColor = 'hover:bg-green-600';
      break;
  }

  return (
    <button
      className={`p-4 m-1 rounded-full text-3xl font-semibold shadow-lg transition duration-200 ease-in-out transform active:scale-95
                  ${bgColor} ${hoverBgColor} ${textColor}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;