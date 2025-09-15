"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

interface AudioContextType {
  isMusicPlaying: boolean;
  playMusic: () => void;
  toggleMusic: () => void;
  /** Bật true khi có âm thanh tiền cảnh (podcast/video) đang phát để nhạc nền tự duck */
  setForegroundPlaying: (on: boolean) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within an AudioProvider");
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: FC<AudioProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRafRef = useRef<number | null>(null);

  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isForegroundPlaying, setIsForegroundPlaying] = useState<boolean>(false);

  // thông số ducking
  const NORMAL_VOL = 1.0;
  const DUCK_VOL = 0.25;
  const FADE_MS = 300;

  // Helper: fade volume mượt
  const fadeVolume = (to: number, duration: number = FADE_MS) => {
    const el = audioRef.current;
    if (!el) return;

    if (fadeRafRef.current) cancelAnimationFrame(fadeRafRef.current);

    const from = el.volume;
    const start = performance.now();

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      el.volume = from + (to - from) * p;
      if (p < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        fadeRafRef.current = null;
      }
    };
    fadeRafRef.current = requestAnimationFrame(step);
  };

  // Khôi phục preference nhạc nền
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pref = localStorage.getItem("music-pref");
    if (pref === "on") {
      audioRef.current
        ?.play()
        .then(() => {
          setIsMusicPlaying(true);
          // nếu lúc mở app mà foreground đã phát, hãy duck ngay
          const target = isForegroundPlaying ? DUCK_VOL : NORMAL_VOL;
          audioRef.current!.volume = target;
        })
        .catch(() => setIsMusicPlaying(false)); // autoplay bị chặn
    } else {
      // đảm bảo volume đúng khi chưa phát
      if (audioRef.current) audioRef.current.volume = NORMAL_VOL;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Theo dõi foreground để duck/unduck ngay cả khi đang phát
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    // chỉ xử lý khi nhạc nền đang bật
    if (!isMusicPlaying) return;

    const target = isForegroundPlaying ? DUCK_VOL : NORMAL_VOL;
    fadeVolume(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isForegroundPlaying, isMusicPlaying]);

  const playMusic = () => {
    const el = audioRef.current;
    el
      ?.play()
      .then(() => {
        setIsMusicPlaying(true);
        if (typeof window !== "undefined") localStorage.setItem("music-pref", "on");
        // áp volume theo trạng thái foreground hiện tại
        el.volume = isForegroundPlaying ? DUCK_VOL : NORMAL_VOL;
      })
      .catch((error) => console.error("Audio play failed:", error));
  };

  const toggleMusic = () => {
    const el = audioRef.current;
    if (isMusicPlaying) {
      el?.pause();
      setIsMusicPlaying(false);
      if (typeof window !== "undefined") localStorage.setItem("music-pref", "off");
    } else {
      el
        ?.play()
        .then(() => {
          setIsMusicPlaying(true);
          if (typeof window !== "undefined") localStorage.setItem("music-pref", "on");
          el!.volume = isForegroundPlaying ? DUCK_VOL : NORMAL_VOL;
        })
        .catch((error) => console.error("Audio play failed:", error));
    }
  };

  const setForegroundPlaying = (on: boolean) => {
    setIsForegroundPlaying(on);
  };

  const contextValue: AudioContextType = {
    isMusicPlaying,
    playMusic,
    toggleMusic,
    setForegroundPlaying,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      <audio ref={audioRef} src="/podcast/music.mp3" loop />
      {children}
    </AudioContext.Provider>
  );
};
