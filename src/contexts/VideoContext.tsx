"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { playlist } from "@/constants/videos";
import { useServerTimeOffset } from "@/hooks/useServerTimeOffset";

type PlaybackMode = "live" | "free";

interface VideoContextType {
  mode: PlaybackMode;
  setMode: (mode: PlaybackMode) => void;
  currentVideoIndex: number;
  targetTimeSec: number;
  seekRequestId: number;
  isTransitioning: boolean;
  isLoaded: boolean;
  changeVideo: (index: number) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

function getStationEpochMs() {
  const raw = process.env.NEXT_PUBLIC_STATION_EPOCH_MS;
  const fallback = Date.UTC(2026, 0, 1, 0, 0, 0, 0);
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function computePositionInPlaylist(elapsedSec: number, durationsSec: number[]) {
  const cycleSec = durationsSec.reduce((sum, d) => sum + d, 0);
  if (cycleSec <= 0) return { index: 0, timeSec: 0 };

  let pos = elapsedSec % cycleSec;
  if (pos < 0) pos += cycleSec;

  for (let i = 0; i < durationsSec.length; i++) {
    const d = durationsSec[i];
    if (pos < d) return { index: i, timeSec: pos };
    pos -= d;
  }
  return { index: durationsSec.length - 1, timeSec: 0 };
}

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const stationEpochMs = useMemo(() => getStationEpochMs(), []);
  const durationsSec = useMemo(() => playlist.map((v) => v.duration), []);
  const serverTime = useServerTimeOffset();

  const [mode, setModeState] = useState<PlaybackMode>("live");
  const [freeVideoIndex, setFreeVideoIndex] = useState(0);
  const [freeSeekToSec, setFreeSeekToSec] = useState(0);
  const [seekRequestId, setSeekRequestId] = useState(0);

  const [liveNowMs, setLiveNowMs] = useState<number | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [targetTimeSec, setTargetTimeSec] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const lastIndexRef = useRef<number>(0);
  const didInitRef = useRef(false);

  useEffect(() => {
    const offset = serverTime.status === "synced" ? serverTime.offsetMs : 0;
    const tick = () => setLiveNowMs(Date.now() + offset);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [serverTime.status, serverTime.offsetMs]);

  useEffect(() => {
    if (mode === "free") {
      setCurrentVideoIndex(freeVideoIndex);
      setTargetTimeSec(freeSeekToSec);
      setIsLoaded(true);
      return;
    }
    if (liveNowMs === null) return;
    const elapsedSec = (liveNowMs - stationEpochMs) / 1000;
    const pos = computePositionInPlaylist(elapsedSec, durationsSec);
    setCurrentVideoIndex(pos.index);
    setTargetTimeSec(pos.timeSec);
    setIsLoaded(true);
  }, [mode, freeVideoIndex, freeSeekToSec, liveNowMs, stationEpochMs, durationsSec]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!didInitRef.current) {
      didInitRef.current = true;
      lastIndexRef.current = currentVideoIndex;
      return;
    }
    if (lastIndexRef.current === currentVideoIndex) return;
    lastIndexRef.current = currentVideoIndex;
    setIsTransitioning(true);
    const t = setTimeout(() => setIsTransitioning(false), 700);
    return () => clearTimeout(t);
  }, [currentVideoIndex, isLoaded]);

  const setMode = (nextMode: PlaybackMode) => {
    if (nextMode === mode) return;
    if (nextMode === "free") {
      setFreeVideoIndex(currentVideoIndex);
      setFreeSeekToSec(targetTimeSec);
      setSeekRequestId((v) => v + 1);
    }
    setModeState(nextMode);
  };

  const changeVideo = (index: number) => {
    if (mode !== "free") return;
    const clamped = Math.max(0, Math.min(index, playlist.length - 1));
    setFreeVideoIndex(clamped);
    setFreeSeekToSec(0);
    setSeekRequestId((v) => v + 1);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <VideoContext.Provider
      value={{
        mode,
        setMode,
        currentVideoIndex,
        targetTimeSec,
        seekRequestId,
        isTransitioning,
        isLoaded,
        changeVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
}
