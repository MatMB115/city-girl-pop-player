"use client";

import React from "react";
import ReactPlayer from "react-player";
import { playlist } from "@/constants/videos";
import { TransitionOverlay } from "./TransitionOverlay";
import { useVideo } from "@/contexts/VideoContext";

interface BackgroundVideoProps {
    playerRef: React.RefObject<any>;
}

export const BackgroundVideo = ({ playerRef }: BackgroundVideoProps) => {
    const { currentVideoIndex, isTransitioning, isLoaded } = useVideo();

    if (!isLoaded) {
        return null;
    }

    return (
        <div className="absolute inset-0 z-0 scale-[3] sm:scale-[2] md:scale-[1.2] filter blur-[2px] md:blur-xs opacity-60">
            <ReactPlayer
                ref={playerRef}
                url={playlist[currentVideoIndex].url}
                playing
                muted
                width="100%"
                height="100%"
                config={{ playerVars: { modestbranding: 1, rel: 0 } }}
            />
            <TransitionOverlay
                isTransitioning={isTransitioning}
                currentColor={playlist[currentVideoIndex].themeColor}
                variant="background"
            />
        </div>
    );
};
