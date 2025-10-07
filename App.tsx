import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ProductCatalog } from './components/ProductCatalog';
import { ResultDisplay } from './components/ResultDisplay';
import { redesignRoom } from './services/geminiService';
import { products as initialProducts } from './constants/products';
import type { Product, UserImage } from './types';
import { GenerationButton } from './components/GenerationButton';

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<UserImage | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserImage({
        data: (reader.result as string).split(',')[1],
        mimeType: file.type,
        dataUrl: reader.result as string
      });
      setGeneratedImage(null);
    };
    reader.onerror = () => {
      setError('Error al leer el archivo de imagen de la habitación.');
    };
    reader.readAsDataURL(file);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProducts(prevSelected => {
      const isSelected = prevSelected.some(p => p.id === product.id);
      if (isSelected) {
        return prevSelected.filter(p => p.id !== product.id);
      } else {
        return [...prevSelected, product];
      }
    });
  };

  const handleGenerate = useCallback(async () => {
    if (!userImage || selectedProducts.length === 0) {
      setError('Por favor, suba una imagen de la habitación y seleccione al menos un producto.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const newImage = await redesignRoom(userImage, selectedProducts);
      setGeneratedImage(newImage);
    } catch (err)
 {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado al generar la imagen.');
    } finally {
      setIsLoading(false);
    }
  }, [userImage, selectedProducts]);

  const handleReset = () => {
    setUserImage(null);
    setSelectedProducts([]);
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna de Controles */}
          <div className="flex flex-col gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-700 border-b pb-2">1. Sube la foto de tu habitación</h2>
              <ImageUploader onImageUpload={handleImageUpload} userImage={userImage?.dataUrl ?? null} />
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-700 border-b pb-2">2. Elige los productos</h2>
              <ProductCatalog
                products={initialProducts}
                selectedProducts={selectedProducts}
                onProductSelect={handleProductSelect}
              />
            </div>

            <GenerationButton
              onClick={handleGenerate}
              isLoading={isLoading}
              disabled={!userImage || selectedProducts.length === 0}
            />
          </div>

          {/* Columna de Resultados */}
          <div className="bg-white p-6 rounded-2xl shadow-lg min-h-[400px] flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-gray-700 border-b pb-2">3. Visualiza el resultado</h2>
            <div className="flex-grow">
              <ResultDisplay
                originalImage={userImage?.dataUrl ?? null}
                generatedImage={generatedImage}
                isLoading={isLoading}
                error={error}
              />
            </div>
            {(generatedImage || error) && !isLoading && (
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-3 bg-gray-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 mt-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 7.24 2.24"></path><path d="M3.51 15A9 9 0 0 0 16.76 21.76"></path></svg>
                <span>Nuevo Rediseño</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;