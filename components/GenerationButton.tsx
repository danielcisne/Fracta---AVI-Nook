
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3L9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z"></path>
    </svg>
);


interface GenerationButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled: boolean;
}

export const GenerationButton: React.FC<GenerationButtonProps> = ({ onClick, isLoading, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generando...</span>
                </>
            ) : (
                <>
                    <SparklesIcon className="w-6 h-6" />
                    <span>Rediseñar Habitación</span>
                </>
            )}
        </button>
    );
};
