"use client";

import { useEffect, useRef } from "react";

type PlayerLike = {
  getCurrentTime?: () => number;
  seekTo?: (amount: number, type?: "seconds") => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function usePlayerSync({
  enabled,
  playerRef,
  videoKey,
  targetTimeSec,
  durationSec,
  driftToleranceSec = 1.5,
  resyncIntervalMs = 5000,
}: {
  enabled: boolean;
  playerRef: React.RefObject<any>;
  videoKey: string;
  targetTimeSec: number;
  durationSec: number;
  driftToleranceSec?: number;
  resyncIntervalMs?: number;
}) {
  const lastSeekRef = useRef<{ videoKey: string; atMs: number; timeSec: number } | null>(null);
  useEffect(() => {
    if (!enabled) lastSeekRef.current = null;
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const last = lastSeekRef.current;
    if (last?.videoKey === videoKey) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const attemptSeek = () => {
      const player: PlayerLike | null = playerRef.current;
      if (player?.seekTo) {
        const safeTarget = clamp(targetTimeSec, 0, Math.max(0, durationSec - 1));
        player.seekTo(safeTarget, "seconds");
        lastSeekRef.current = { videoKey, atMs: Date.now(), timeSec: safeTarget };
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
  }, [enabled, videoKey, targetTimeSec, durationSec, playerRef]);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      const player: PlayerLike | null = playerRef.current;
      if (!player?.getCurrentTime || !player?.seekTo) return;

      const current = player.getCurrentTime();
      const safeTarget = clamp(targetTimeSec, 0, Math.max(0, durationSec - 1));

      const diff = Math.abs(current - safeTarget);
      if (diff < driftToleranceSec) return;

      const last = lastSeekRef.current;
      const nowMs = Date.now();
      if (last && last.videoKey === videoKey && nowMs - last.atMs < 1500) return;

      player.seekTo(safeTarget, "seconds");
      lastSeekRef.current = { videoKey, atMs: nowMs, timeSec: safeTarget };
    }, resyncIntervalMs);

    return () => clearInterval(interval);
  }, [enabled, playerRef, targetTimeSec, durationSec, driftToleranceSec, resyncIntervalMs, videoKey]);
}
