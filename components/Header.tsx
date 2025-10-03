
import React from 'react';

const PaintBrushIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z"></path>
        <path d="M9 8l-6 6 2 2 7-7"></path>
        <path d="M14 13l2 2 7-7"></path>
    </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center sm:justify-start">
        <div className="flex items-center space-x-3 text-indigo-600">
            <PaintBrushIcon className="h-8 w-8" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Asistente de Diseño de Interiores IA
            </h1>
        </div>
      </div>
    </header>
  );
};
