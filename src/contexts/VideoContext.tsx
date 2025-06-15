"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { playlist } from '@/constants/videos';

const STORAGE_KEY = 'city-pop-player-current-index';

interface VideoContextType {
    currentVideoIndex: number;
    isTransitioning: boolean;
    isLoaded: boolean;
    changeVideo: (index: number) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: React.ReactNode }) {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadInitialState = () => {
            try {
                const savedIndex = localStorage.getItem(STORAGE_KEY);
                if (savedIndex) {
                    const parsedIndex = parseInt(savedIndex, 10);
                    if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < playlist.length) {
                        setCurrentVideoIndex(parsedIndex);
                    }
                }
            } catch (e) {
                console.error('Error reading from localStorage:', e);
            }
            setIsLoaded(true);
        };

        const timer = setTimeout(loadInitialState, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, currentVideoIndex.toString());
        }
    }, [currentVideoIndex, isLoaded]);

    const changeVideo = (index: number) => {
        setIsTransitioning(true);
        setCurrentVideoIndex(index);
        setTimeout(() => setIsTransitioning(false), 700);
    };

    return (
        <VideoContext.Provider value={{ currentVideoIndex, isTransitioning, isLoaded, changeVideo }}>
            {children}
        </VideoContext.Provider>
    );
}

export function useVideo() {
    const context = useContext(VideoContext);
    if (context === undefined) {
        throw new Error('useVideo must be used within a VideoProvider');
    }
    return context;
} 