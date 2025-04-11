import React from "react";
import { playlist } from "@/constants/videos";

interface VideoTitleProps {
    currentVideoIndex: number;
}

export function VideoTitle({ currentVideoIndex }: VideoTitleProps) {
    const currentVideo = playlist[currentVideoIndex];

    return (
        <div className="absolute top-4 left-4 z-10">
            <h1
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white animate-pulse"
                style={{
                    textShadow: `0 0 10px ${currentVideo.themeColor}, 0 0 20px ${currentVideo.themeColor}, 0 0 30px ${currentVideo.themeColor}`
                }}
            >
                {currentVideo.title}
            </h1>
        </div>
    );
} 