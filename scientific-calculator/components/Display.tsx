// scientific-calculator/components/Display.tsx
import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div
      className="text-right p-4 text-4xl bg-gray-800 text-white rounded-t-lg shadow-inner break-words overflow-hidden"
      style={{ minHeight: '80px' }} // Ensure enough height for content
    >
      {value}
    </div>
  );
};

export default Display;
