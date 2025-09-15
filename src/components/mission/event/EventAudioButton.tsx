"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import usePodcastDucking from "../intro/usePodcastDucking";

type Props = {
  src: string;
  label?: string;
  className?: string;
};

const EventAudioButton: React.FC<Props> = ({ src, label = "Play voiceover", className }) => {
  const audioRef = useRef<HTMLAudioElement>(null) as React.RefObject<HTMLAudioElement>;
  const [isPlaying, setIsPlaying] = useState(false);

  usePodcastDucking(audioRef);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setIsPlaying(false);
  }, [src]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <>
      <style>{`
        .ea-pill {
          background: #b9915a; /* gold nền */
          border: 1px solid rgba(0,0,0,0.25);
          box-shadow: 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .ea-bars span {
          width: 4px;
          height: 10px;
          background: #1b1715;
          border-radius: 2px;
          transform-origin: bottom;
        }
        .ea-playing .ea-bars span:nth-child(1){ animation: ea-wave 1s infinite ease-in-out; animation-delay: 0.0s; }
        .ea-playing .ea-bars span:nth-child(2){ animation: ea-wave 1s infinite ease-in-out; animation-delay: 0.15s; }
        .ea-playing .ea-bars span:nth-child(3){ animation: ea-wave 1s infinite ease-in-out; animation-delay: 0.30s; }
        @keyframes ea-wave{
          0%,100%{ transform: scaleY(0.6); }
          50%{ transform: scaleY(1.6); }
        }
      `}</style>

      <button
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause voiceover" : "Play voiceover"}
        title={isPlaying ? "Pause voiceover" : label}
        className={`ea-pill rounded-full px-5 py-3 flex items-center gap-3 backdrop-blur-[0.5px] hover:brightness-105 transition-all ${
          isPlaying ? "ea-playing" : ""
        } ${className || ""}`}
      >
        {/* icon face speaking */}
        <img
          src="/podcast/voice.png"
          alt=""
          className="w-12 h-12 pointer-events-none select-none"
          draggable={false}
        />
        {/* bars hiển thị khi phát */}
        <div className={`ea-bars flex items-end gap-1 ${isPlaying ? "opacity-100" : "opacity-40"}`}>
          <span />
          <span />
          <span />
        </div>
      </button>

      {/* thẻ audio riêng cho event */}
      <audio ref={audioRef} src={src} preload="none" />
    </>
  );
};

export default EventAudioButton;
