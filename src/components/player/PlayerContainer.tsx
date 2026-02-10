"use client";

import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { playlist } from "@/constants/videos";
import { TransitionOverlay } from "./TransitionOverlay";
import { useVideo } from "@/contexts/VideoContext";
import { usePlayerSync } from "@/hooks/usePlayerSync";

interface PlayerContainerProps {
    volume: number;
    playerRef: React.RefObject<any>;
}

export const PlayerContainer = ({ volume, playerRef }: PlayerContainerProps) => {
    const { currentVideoIndex, isTransitioning, isLoaded, mode, targetTimeSec, seekRequestId, changeVideo } = useVideo();
    const track = playlist[currentVideoIndex];
    const currentColor = track.themeColor;
    const syncEnabled = mode === "live";

    usePlayerSync({
        enabled: syncEnabled,
        playerRef,
        videoKey: track.url,
        targetTimeSec,
        durationSec: track.duration,
    });

    useEffect(() => {
        if (syncEnabled) return;
        let cancelled = false;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const attemptSeek = () => {
            const player = playerRef.current;
            if (player?.seekTo) {
                const safeTarget = Math.max(0, Math.min(targetTimeSec, Math.max(0, track.duration - 1)));
                player.seekTo(safeTarget, "seconds");
                return;
            }
            if (cancelled) return;
            timeoutId = setTimeout(attemptSeek, 250);
        };

        attemptSeek();
        return () => {
            cancelled = true;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [seekRequestId, syncEnabled, targetTimeSec, track.duration, playerRef]);

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
                        ref={playerRef}
                        url={track.url}
                        playing
                        volume={volume}
                        controls={false}
                        onEnded={() => {
                            if (mode !== "free") return;
                            changeVideo((currentVideoIndex + 1) % playlist.length);
                        }}
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
