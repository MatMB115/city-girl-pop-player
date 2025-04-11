import { useState, useEffect } from 'react';
import { playlist } from '@/constants/videos';

const REFERENCE_TIMESTAMP = new Date("2025-01-01T00:00:00Z").getTime();
const TRANSITION_BUFFER = 10; // 10 seconds buffer before video transition

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
    let accumulatedTime = 0;
    for (let i = 0; i < playlist.length; i++) {
        const videoDuration = playlist[i].duration;
        if (time < accumulatedTime + videoDuration - TRANSITION_BUFFER) {
            index = i;
            break;
        }
        accumulatedTime += videoDuration;
    }

    // Calculate the start time within the current video
    let startTime = time - accumulatedTime;
    if (startTime < 0) startTime = 0;

    return { currentVideoIndex: index, startTimeInVideo: startTime };
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