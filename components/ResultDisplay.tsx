
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

const ImageIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
);


interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
        <LoadingSpinner />
        <p className="mt-4 text-lg font-semibold">La IA está rediseñando tu espacio...</p>
        <p className="text-sm">Esto puede tardar un momento.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-red-600 bg-red-50 p-4 rounded-lg">
        <p className="font-bold">¡Oh no! Ocurrió un error</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (generatedImage && originalImage) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center text-gray-600">Original</h3>
          <img src={originalImage} alt="Original" className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center text-indigo-600">Rediseñado con IA</h3>
          <img src={generatedImage} alt="Generado" className="w-full h-auto rounded-lg shadow-md border-4 border-indigo-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <ImageIcon className="w-20 h-20 mb-4 text-gray-300"/>
        <h3 className="text-xl font-semibold">Tu nuevo diseño aparecerá aquí</h3>
        <p className="mt-2 max-w-sm">Sube una imagen y selecciona los productos que te gustaría añadir a tu espacio para empezar.</p>
    </div>
  );
};
