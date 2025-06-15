import { useState, useEffect, useRef } from 'react';
import { playlist } from '@/constants/videos';

interface VideoPlayerState {
    currentVideoIndex: number;
    playerRef: React.RefObject<any>;
    startTimeInVideo: number;
    isTransitioning: boolean;
    changeVideo: (index: number) => void;
}

export const useVideoPlayer = (): VideoPlayerState => {
    const [state, setState] = useState<VideoPlayerState>({
        currentVideoIndex: 0,
        playerRef: useRef<any>(null),
        startTimeInVideo: 0,
        isTransitioning: false,
        changeVideo: () => { }
    });

    const handleVideoEnd = () => {
        setState(prevState => {
            const nextIndex = (prevState.currentVideoIndex + 1) % playlist.length;
            return {
                ...prevState,
                currentVideoIndex: nextIndex,
                startTimeInVideo: 0,
                isTransitioning: true
            };
        });
    };

    const changeVideo = (index: number) => {
        setState(prevState => ({
            ...prevState,
            currentVideoIndex: index,
            startTimeInVideo: 0,
            isTransitioning: true
        }));
    };

    useEffect(() => {
        const player = state.playerRef.current?.getInternalPlayer();
        if (player) {
            player.addEventListener('onStateChange', (event: any) => {
                if (event.data === 0) { // 0 = ended
                    handleVideoEnd();
                }
            });
        }

        return () => {
            if (player) {
                player.removeEventListener('onStateChange', handleVideoEnd);
            }
        };
    }, [state.currentVideoIndex]);

    useEffect(() => {
        setState(prev => ({
            ...prev,
            changeVideo
        }));
    }, []);

    // Reset transition state after animation
    useEffect(() => {
        if (state.isTransitioning) {
            const timer = setTimeout(() => {
                setState(prev => ({
                    ...prev,
                    isTransitioning: false
                }));
            }, 700); // Match the transition duration
            return () => clearTimeout(timer);
        }
    }, [state.isTransitioning]);

    return state;
}; 