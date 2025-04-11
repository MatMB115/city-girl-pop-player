import { useState, useEffect } from 'react';
import { playlist } from '@/constants/videos';

const REFERENCE_TIMESTAMP = new Date("2025-01-01T00:00:00Z").getTime();

interface VideoTimeState {
    currentVideoIndex: number;
    startTimeInVideo: number;
}

const calculateVideoTime = (): VideoTimeState => {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - REFERENCE_TIMESTAMP) / 1000);

    const totalDuration = playlist.reduce((acc, vid) => acc + vid.duration, 0);
    let time = elapsedSeconds % totalDuration;

    // Find the current video based on elapsed time
    let index = 0;
    for (let i = 0; i < playlist.length; i++) {
        if (time < playlist[i].duration) {
            index = i;
            break;
        }
        time -= playlist[i].duration;
    }

    return { currentVideoIndex: index, startTimeInVideo: time };
};

export const useVideoTime = (): VideoTimeState => {
    const [state, setState] = useState<VideoTimeState>(calculateVideoTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setState(calculateVideoTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return state;
}; 