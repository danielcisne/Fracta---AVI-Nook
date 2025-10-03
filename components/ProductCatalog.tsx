import React from 'react';
import type { Product } from '../types';

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

interface ProductCatalogProps {
  products: Product[];
  selectedProducts: Product[];
  onProductSelect: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, selectedProducts, onProductSelect }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
      {products.map(product => {
        const isSelected = selectedProducts.some(p => p.id === product.id);

        return (
          <div
            key={product.id}
            className="relative group"
            title={product.name}
            onClick={() => onProductSelect(product)}
          >
            <div
              className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center p-2 transition-all duration-200 cursor-pointer
                ${isSelected ? 'ring-4 ring-indigo-500 bg-indigo-100' : 'hover:ring-2 hover:ring-indigo-300'}
              `}
            >
              <img 
                src={product.imageBase64} 
                alt={product.name} 
                className="w-full h-full object-contain" 
              />
            </div>

            {isSelected && (
              <div className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full p-1 shadow-lg">
                <CheckIcon className="w-3 h-3"/>
              </div>
            )}

            <p className="text-center text-xs mt-1 text-gray-600 truncate">{product.name}</p>
          </div>
        );
      })}
    </div>
  );
};
