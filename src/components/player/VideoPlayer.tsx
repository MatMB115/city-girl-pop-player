"use client";

import React from "react";
import { playlist } from "@/constants/videos";
import Footer from "@/components/common/Footer";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { useVolume } from "@/hooks/useVolume";
import { VolumeControl } from "@/components/player/VolumeControl";
import { SocialLinks } from "@/components/common/SocialLinks";
import { BackgroundVideo } from "@/components/player/BackgroundVideo";
import { PlayerContainer } from "@/components/player/PlayerContainer";
import { MutedNotice } from "@/components/player/MutedNotice";
import { VideoTitle } from "@/components/player/VideoTitle";
import { NavigationButtons } from "@/components/player/NavigationButtons";

export default function VideoPlayer() {
    const { currentVideoIndex, playerRef, changeVideo } = useVideoPlayer();
    const { volume, showMutedNotice, toggleMute, setVolume } = useVolume();
    const currentColor = playlist[currentVideoIndex].themeColor;

    return (
        <div className="flex flex-col h-screen">
            <div className="relative w-full h-screen overflow-hidden select-none">
                <SocialLinks />
                <BackgroundVideo
                    currentVideoIndex={currentVideoIndex}
                    playerRef={playerRef}
                />
                <VideoTitle currentVideoIndex={currentVideoIndex} />
                <PlayerContainer
                    currentVideoIndex={currentVideoIndex}
                    volume={volume}
                    currentColor={currentColor}
                    playerRef={playerRef}
                />
                <NavigationButtons
                    currentVideoIndex={currentVideoIndex}
                    onVideoChange={changeVideo}
                    currentColor={currentColor}
                />
                <MutedNotice
                    show={showMutedNotice}
                    volume={volume}
                    onToggleMute={toggleMute}
                />
                <VolumeControl
                    volume={volume}
                    currentColor={currentColor}
                    onVolumeChange={setVolume}
                    onToggleMute={toggleMute}
                />
            </div>
            <Footer />
        </div>
    );
}
