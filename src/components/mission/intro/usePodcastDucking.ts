"use client";
import { useEffect } from "react";
import { useAudio } from "./AudioContext";

export default function usePodcastDucking(
  podcastRef: React.RefObject<HTMLAudioElement>
) {
  const { setForegroundPlaying } = useAudio();

  useEffect(() => {
    const el = podcastRef.current;
    if (!el) return;

    const onPlay = () => setForegroundPlaying(true);
    const onPause = () => setForegroundPlaying(false);
    const onEnded = () => setForegroundPlaying(false);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);

    // nếu mount khi đang phát (ví dụ auto-continue)
    if (!el.paused && !el.ended) setForegroundPlaying(true);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
      // đảm bảo trả lại trạng thái
      setForegroundPlaying(false);
    };
  }, [podcastRef, setForegroundPlaying]);
}
