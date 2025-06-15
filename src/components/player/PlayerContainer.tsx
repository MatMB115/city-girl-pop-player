"use client";

import React from "react";
import ReactPlayer from "react-player";
import { playlist } from "@/constants/videos";
import { TransitionOverlay } from "./TransitionOverlay";
import { useVideo } from "@/contexts/VideoContext";

interface PlayerContainerProps {
    volume: number;
}

export const PlayerContainer = ({ volume }: PlayerContainerProps) => {
    const { currentVideoIndex, isTransitioning, isLoaded } = useVideo();
    const currentColor = playlist[currentVideoIndex].themeColor;

    if (!isLoaded) {
        return null;
    }

    return (
        <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div
                className={`w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border-4 relative`}
                style={{
                    borderColor: currentColor,
                    boxShadow: `0 0 15px 4px ${currentColor}, 0 0 30px 8px ${currentColor}33`,
                }}
            >
                <div className="w-full h-[102%] md:h-[100.5%] pointer-events-none">
                    <ReactPlayer
                        url={playlist[currentVideoIndex].url}
                        playing
                        volume={volume}
                        controls={false}
                        width="100%"
                        height="100%"
                        config={{
                            youtube: {
                                playerVars: {
                                    modestbranding: 1,
                                    rel: 0,
                                },
                            },
                        }}
                    />
                </div>
                <TransitionOverlay
                    isTransitioning={isTransitioning}
                    currentColor={currentColor}
                    variant="player"
                />
            </div>
        </div>
    );
};
