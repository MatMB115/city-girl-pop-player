"use client";

import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { playlist } from "@/constants/videos";
import { TransitionOverlay } from "./TransitionOverlay";
import { useVideo } from "@/contexts/VideoContext";
import { usePlayerSync } from "@/hooks/usePlayerSync";

interface BackgroundVideoProps {
    playerRef: React.RefObject<any>;
}

export const BackgroundVideo = ({ playerRef }: BackgroundVideoProps) => {
    const { currentVideoIndex, isTransitioning, isLoaded, mode, targetTimeSec, seekRequestId } = useVideo();
    const track = playlist[currentVideoIndex];
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
        <div className="absolute inset-0 z-0 scale-[3] sm:scale-[2] md:scale-[1.2] filter blur-[2px] md:blur-[1px] opacity-60">
            <ReactPlayer
                ref={playerRef}
                url={track.url}
                playing
                muted
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
            <TransitionOverlay
                isTransitioning={isTransitioning}
                currentColor={track.themeColor}
                variant="background"
            />
        </div>
    );
};
