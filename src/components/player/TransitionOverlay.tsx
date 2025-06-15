import React from 'react';

interface TransitionOverlayProps {
    isTransitioning: boolean;
    currentColor: string;
    variant?: 'player' | 'background';
}

export const TransitionOverlay: React.FC<TransitionOverlayProps> = ({ 
    isTransitioning, 
    currentColor,
    variant = 'player'
}) => {
    const isPlayer = variant === 'player';
    const colorOpacity = isPlayer ? '33' : '22'; // 20% para player, 13% para background

    return (
        <div
            className={`
                absolute inset-0 pointer-events-none 
                transition-opacity duration-700 ease-in-out 
                bg-black
                ${isPlayer ? 'rounded-2xl z-10' : 'z-0'}
                ${isTransitioning ? 'opacity-100' : 'opacity-0'}
            `}
        >
            <div
                className={`
                    absolute inset-0 
                    transition-opacity duration-300
                    ${isPlayer ? 'rounded-2xl' : ''}
                    ${isTransitioning ? 'opacity-100' : 'opacity-0'}
                `}
                style={{
                    background: `linear-gradient(to bottom, ${currentColor}${colorOpacity}, black)`,
                }}
            />
        </div>
    );
}; 