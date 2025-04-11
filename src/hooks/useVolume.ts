import { useState } from 'react';

interface VolumeState {
    volume: number;
    showMutedNotice: boolean;
    toggleMute: () => void;
    setVolume: (volume: number) => void;
    setShowMutedNotice: (show: boolean) => void;
}

export const useVolume = (): VolumeState => {
    const [volume, setVolume] = useState(0);
    const [showMutedNotice, setShowMutedNotice] = useState(true);

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(0.6);
        } else {
            setVolume(0);
        }
        setShowMutedNotice(false);
    };

    return {
        volume,
        showMutedNotice,
        toggleMute,
        setVolume,
        setShowMutedNotice,
    };
}; 