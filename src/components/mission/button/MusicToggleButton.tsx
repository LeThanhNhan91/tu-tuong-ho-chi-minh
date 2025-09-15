"use client";
import React from "react";
import { useAudio } from "../intro/AudioContext";

type Placement = "floating" | "header";

interface Props {
  placement?: Placement;
  className?: string;
}

const MusicToggleButton: React.FC<Props> = ({ placement = "floating", className }) => {
  const { isMusicPlaying, toggleMusic } = useAudio();

  const containerClass =
    placement === "floating"
      ? "fixed bottom-6 right-6 z-50"
      : "relative z-40"; // inline trong header

  const buttonStyle =
    placement === "floating"
      ? "p-3 bg-black/30 backdrop-blur-sm rounded-full transition-colors"
      : "p-2 rounded-md transition-colors";

  return (
    <>
      <style>
        {`
        .sound-icon {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 28px;
          height: 24px;
          cursor: pointer;
        }
        .sound-icon__bar {
          width: 4px;
          background-color: #c5b8a5; /* màu vàng nhạt như ảnh */
          transition: height 0.3s ease-in-out;
          border-radius: 2px;
        }
        .sound-icon--playing .sound-icon__bar:nth-child(1) { animation: sound-wave 1.2s infinite ease-in-out; animation-delay: 0.1s; }
        .sound-icon--playing .sound-icon__bar:nth-child(2) { animation: sound-wave 1.2s infinite ease-in-out; animation-delay: 0.3s; }
        .sound-icon--playing .sound-icon__bar:nth-child(3) { animation: sound-wave 1.2s infinite ease-in-out; animation-delay: 0.5s; }
        .sound-icon--playing .sound-icon__bar:nth-child(4) { animation: sound-wave 1.2s infinite ease-in-out; animation-delay: 0.2s; }
        .sound-icon--paused .sound-icon__bar { height: 6px !important; animation: none !important; }

        @keyframes sound-wave {
          0% { height: 6px; }
          50% { height: 24px; }
          100% { height: 6px; }
        }
        `}
      </style>

      <div className={`${containerClass} ${className || ""}`}>
        <button
          onClick={toggleMusic}
          aria-label={isMusicPlaying ? "Tắt nhạc" : "Bật nhạc"}
          aria-pressed={isMusicPlaying}
          title={isMusicPlaying ? "Tắt nhạc" : "Bật nhạc"}
          className={buttonStyle}
        >
          <div
            className={`sound-icon ${
              isMusicPlaying ? "sound-icon--playing" : "sound-icon--paused"
            }`}
          >
            <span className="sound-icon__bar" style={{ height: "12px" }} />
            <span className="sound-icon__bar" style={{ height: "20px" }} />
            <span className="sound-icon__bar" style={{ height: "16px" }} />
            <span className="sound-icon__bar" style={{ height: "10px" }} />
          </div>
        </button>
      </div>
    </>
  );
};

export default MusicToggleButton;
