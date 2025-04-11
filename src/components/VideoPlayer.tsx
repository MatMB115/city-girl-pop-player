"use client";

import React from "react";
import { playlist } from "@/constants/videos";
import Footer from "./common/Footer";
import { useVideoTime } from "@/hooks/useVideoTime";
import { useVolume } from "@/hooks/useVolume";
import { VolumeControl } from "./player/VolumeControl";
import { SocialLinks } from "./common/SocialLinks";
import { BackgroundVideo } from "./player/BackgroundVideo";
import { MainPlayer } from "./player/MainPlayer";
import { MutedNotice } from "./player/MutedNotice";
import { VideoTitle } from "./player/VideoTitle";

export default function VideoPlayer() {
    const { currentVideoIndex, startTimeInVideo } = useVideoTime();
    const { volume, showMutedNotice, toggleMute, setVolume, setShowMutedNotice } = useVolume();
    const currentColor = playlist[currentVideoIndex].themeColor;

    return (
        <div className="flex flex-col h-screen">
            <div className="relative w-full h-screen overflow-hidden select-none">
                <SocialLinks />
                <BackgroundVideo
                    currentVideoIndex={currentVideoIndex}
                    startTimeInVideo={startTimeInVideo}
                />
                <VideoTitle currentVideoIndex={currentVideoIndex} />
                <MainPlayer
                    currentVideoIndex={currentVideoIndex}
                    startTimeInVideo={startTimeInVideo}
                    volume={volume}
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
