
import React, { useRef } from 'react';

const UploadIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  userImage: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, userImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {userImage ? (
        <div className="relative group cursor-pointer" onClick={handleDropzoneClick}>
          <img src={userImage} alt="Habitación del usuario" className="w-full h-auto max-h-80 object-contain rounded-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
            <p className="text-white text-lg font-semibold">Cambiar imagen</p>
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
          onClick={handleDropzoneClick}
        >
          <div className="flex flex-col items-center text-gray-500">
            <UploadIcon className="w-12 h-12 mb-2" />
            <p className="font-semibold">Haz clic para subir una imagen</p>
            <p className="text-sm">o arrastra y suelta aquí</p>
            <p className="text-xs mt-2">PNG, JPG, WEBP</p>
          </div>
        </div>
      )}
    </div>
  );
};
