"use client";

import React, { useRef } from "react";
import { playlist } from "@/constants/videos";
import Footer from "@/components/common/Footer";
import { useVolume } from "@/hooks/useVolume";
import { VolumeControl } from "@/components/player/VolumeControl";
import { SocialLinks } from "@/components/common/SocialLinks";
import { BackgroundVideo } from "@/components/player/BackgroundVideo";
import { PlayerContainer } from "@/components/player/PlayerContainer";
import { MutedNotice } from "@/components/player/MutedNotice";
import { VideoTitle } from "@/components/player/VideoTitle";
import { VideoNavButton } from "@/components/player/VideoNavButton";
import { WelcomeAnimation } from "@/components/player/WelcomeAnimation";
import { VideoProvider, useVideo } from "@/contexts/VideoContext";

export default function VideoPlayer() {
    const { volume, showMutedNotice, toggleMute, setVolume } = useVolume();

    return (
        <VideoProvider>
            <VideoPlayerContent 
                volume={volume}
                showMutedNotice={showMutedNotice}
                toggleMute={toggleMute}
                setVolume={setVolume}
            />
        </VideoProvider>
    );
}

function VideoPlayerContent({ 
    volume, 
    showMutedNotice, 
    toggleMute, 
    setVolume 
}: { 
    volume: number;
    showMutedNotice: boolean;
    toggleMute: () => void;
    setVolume: (volume: number) => void;
}) {
    const playerRef = useRef<any>(null);
    const { currentVideoIndex, isLoaded, changeVideo } = useVideo();
    const currentColor = playlist[currentVideoIndex].themeColor;

    return (
        <div className="flex flex-col h-screen">
            <div className="relative w-full h-screen overflow-hidden select-none">
                <WelcomeAnimation currentColor={currentColor} />
                <SocialLinks />
                <BackgroundVideo playerRef={playerRef} />
                <VideoTitle />
                <PlayerContainer volume={volume} />
                <VideoNavButton
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
