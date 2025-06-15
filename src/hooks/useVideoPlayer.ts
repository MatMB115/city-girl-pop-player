import { useState, useEffect, useRef } from 'react';
import { playlist } from '@/constants/videos';

const STORAGE_KEY = 'city-pop-player-current-index';

// Função para verificar se o localStorage está disponível
const isLocalStorageAvailable = () => {
    if (typeof window === 'undefined') return false;
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
};

// Função para obter o índice inicial do vídeo
const getInitialVideoIndex = () => {
    if (isLocalStorageAvailable()) {
        const savedIndex = localStorage.getItem(STORAGE_KEY);
        if (savedIndex) {
            const parsedIndex = parseInt(savedIndex, 10);
            if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < playlist.length) {
                return parsedIndex;
            }
        }
    }
    return 0;
};

interface VideoPlayerState {
    currentVideoIndex: number;
    playerRef: React.RefObject<any>;
    startTimeInVideo: number;
    isTransitioning: boolean;
    changeVideo: (index: number) => void;
}

export const useVideoPlayer = (): VideoPlayerState => {
    // 1. Refs
    const playerRef = useRef<any>(null);

    // 2. Estado inicial
    const [state, setState] = useState<VideoPlayerState>(() => ({
        currentVideoIndex: getInitialVideoIndex(),
        playerRef,
        startTimeInVideo: 0,
        isTransitioning: false,
        changeVideo: () => { }
    }));

    // 3. Efeitos
    // Efeito para salvar no localStorage
    useEffect(() => {
        if (isLocalStorageAvailable()) {
            localStorage.setItem(STORAGE_KEY, state.currentVideoIndex.toString());
        }
    }, [state.currentVideoIndex]);

    // Efeito para o player
    useEffect(() => {
        const player = state.playerRef.current?.getInternalPlayer();
        if (player) {
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

            player.addEventListener('onStateChange', (event: any) => {
                if (event.data === 0) { // 0 = ended
                    handleVideoEnd();
                }
            });

            return () => {
                player.removeEventListener('onStateChange', handleVideoEnd);
            };
        }
    }, [state.currentVideoIndex]);

    // Efeito para a função changeVideo
    useEffect(() => {
        const changeVideo = (index: number) => {
            setState(prevState => ({
                ...prevState,
                currentVideoIndex: index,
                startTimeInVideo: 0,
                isTransitioning: true
            }));
        };

        setState(prevState => ({
            ...prevState,
            changeVideo
        }));
    }, []);

    // Efeito para a transição
    useEffect(() => {
        if (state.isTransitioning) {
            const timer = setTimeout(() => {
                setState(prev => ({
                    ...prev,
                    isTransitioning: false
                }));
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [state.isTransitioning]);

    return state;
}; 