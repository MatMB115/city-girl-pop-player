import { useState, useEffect, useRef } from 'react';
import { playlist } from '@/constants/videos';

interface VideoTimeState {
    currentVideoIndex: number;
    playerRef: React.RefObject<any>;
    startTimeInVideo: number;
    changeVideo: (index: number) => void;
}

export const useVideoTime = (): VideoTimeState => {
    const [state, setState] = useState<VideoTimeState>({
        currentVideoIndex: 0,
        playerRef: useRef<any>(null),
        startTimeInVideo: 0,
        changeVideo: () => { }
    });

    const handleVideoEnd = () => {
        setState(prevState => {
            const nextIndex = (prevState.currentVideoIndex + 1) % playlist.length;
            return {
                ...prevState,
                currentVideoIndex: nextIndex,
                startTimeInVideo: 0
            };
        });
    };

    const changeVideo = (index: number) => {
        setState(prevState => ({
            ...prevState,
            currentVideoIndex: index,
            startTimeInVideo: 0
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

    // Update state with changeVideo function
    useEffect(() => {
        setState(prev => ({
            ...prev,
            changeVideo
        }));
    }, []);

    return state;
}; 