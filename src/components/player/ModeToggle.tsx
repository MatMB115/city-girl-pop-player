"use client";

import type { CSSProperties } from "react";
import { useVideo } from "@/contexts/VideoContext";

export function ModeToggle({ currentColor }: { currentColor: string }) {
  const { mode, setMode } = useVideo();
  const isLive = mode === "live";

  const buttonStyle: CSSProperties = {
    borderColor: currentColor,
    boxShadow: `0 0 12px 2px ${currentColor}66`,
  };

  return (
    <div className="absolute top-16 left-4 z-20">
      <button
        type="button"
        onClick={() => setMode(isLive ? "free" : "live")}
        className="bg-black/60 text-white px-4 py-2 rounded-full text-sm border transition-colors hover:bg-black/75"
        style={buttonStyle}
      >
        {isLive ? "Free Mode" : "Back to Live"}
      </button>
    </div>
  );
}
