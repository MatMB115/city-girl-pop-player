import { useEffect, useState } from "react";

type ServerTimeState =
  | { status: "idle" | "syncing"; offsetMs: null }
  | { status: "synced"; offsetMs: number }
  | { status: "error"; offsetMs: number | null };

async function fetchServerOffsetOnce(signal?: AbortSignal) {
  const sendMs = Date.now();
  const res = await fetch("/api/time", { cache: "no-store", signal });
  const server = (await res.json()) as { nowMs: number };
  const recvMs = Date.now();
  const rttMs = Math.max(0, recvMs - sendMs);
  const clientMidMs = sendMs + rttMs / 2;
  const offsetMs = server.nowMs - clientMidMs;
  return { offsetMs, rttMs };
}

export function useServerTimeOffset() {
  const [state, setState] = useState<ServerTimeState>({
    status: "idle",
    offsetMs: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function sync() {
      setState({ status: "syncing", offsetMs: null });
      try {
        const samples = [];
        for (let i = 0; i < 3; i++) {
          samples.push(await fetchServerOffsetOnce(controller.signal));
        }
        samples.sort((a, b) => a.rttMs - b.rttMs);
        const best = samples[0];
        if (!cancelled) setState({ status: "synced", offsetMs: best.offsetMs });
      } catch {
        if (!cancelled) setState((prev) => ({ status: "error", offsetMs: prev.offsetMs }));
      }
    }

    sync();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return state;
}

