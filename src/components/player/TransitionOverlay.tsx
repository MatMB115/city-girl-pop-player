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
            className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out ${
                isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
                background: 'black',
                borderRadius: isPlayer ? '1rem' : '0',
                zIndex: isPlayer ? 10 : 0,
            }}
        >
            <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                    isTransitioning ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                    background: `linear-gradient(to bottom, ${currentColor}${colorOpacity}, black)`,
                    borderRadius: isPlayer ? '1rem' : '0',
                }}
            />
        </div>
    );
}; 