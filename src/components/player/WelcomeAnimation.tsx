"use client";

import React, { useEffect, useState } from 'react';
import { useVideo } from '@/contexts/VideoContext';
import { playlist } from '@/constants/videos';

export const WelcomeAnimation = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const { currentVideoIndex, isLoaded } = useVideo();
    const currentColor = playlist[currentVideoIndex].themeColor;
    const [displayColor, setDisplayColor] = useState(currentColor);

    useEffect(() => {
        // Update the display color when currentColor changes
        setDisplayColor(currentColor);
    }, [currentColor]);

    useEffect(() => {
        // Ensure the welcome animation stays visible for at least 3 seconds
        const timer = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 1000); // Time for fade out
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Always show the welcome animation initially, regardless of isLoaded
    if (!isVisible) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
                background: 'black',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
            }}
        >
            <div
                className="text-center"
                style={{
                    textShadow: `0 0 10px ${displayColor}, 0 0 20px ${displayColor}, 0 0 30px ${displayColor}`,
                    opacity: isFading ? 0 : 1,
                    transition: 'opacity 1s ease-in-out, text-shadow 0.5s ease-in-out',
                }}
            >
                <h1
                    className="text-4xl md:text-6xl font-bold mb-4 animate-pulse"
                    style={{ 
                        color: displayColor,
                        transition: 'color 0.5s ease-in-out'
                    }}
                >
                    City Pop Girl Player
                </h1>
                <p
                    className="text-xl md:text-2xl"
                    style={{ 
                        color: displayColor,
                        transition: 'color 0.5s ease-in-out'
                    }}
                >
                    Welcome to the Groove
                </p>
            </div>
        </div>
    );
}; 