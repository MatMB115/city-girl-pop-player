"use client";

import React, { useEffect, useState } from 'react';
import { useVideo } from '@/contexts/VideoContext';
import { playlist } from '@/constants/videos';

export const WelcomeAnimation = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const { currentVideoIndex, isLoaded } = useVideo();
    const currentColor = playlist[currentVideoIndex].themeColor;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 1000); // Tempo para o fade out
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoaded || !isVisible) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            style={{
                background: 'black',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
            }}
        >
            <div
                className="text-center"
                style={{
                    textShadow: `0 0 10px ${currentColor}, 0 0 20px ${currentColor}, 0 0 30px ${currentColor}`,
                    opacity: isFading ? 0 : 1,
                    transition: 'opacity 1s ease-in-out',
                }}
            >
                <h1
                    className="text-4xl md:text-6xl font-bold mb-4 animate-pulse"
                    style={{ color: currentColor }}
                >
                    City Pop Girl Player
                </h1>
                <p
                    className="text-xl md:text-2xl"
                    style={{ color: currentColor }}
                >
                    Welcome to the Groove
                </p>
            </div>
        </div>
    );
}; 