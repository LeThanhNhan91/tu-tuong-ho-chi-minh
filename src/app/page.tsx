"use client";
import React, { useEffect, useState } from "react";
import EventComponent from "@/components/mission/event/EventComponent";
import { eventsData } from "@/components/mission/event/EventData";
import MissionPage from "@/components/mission/Misson";
import LandingPage from "@/components/mission/intro/Intro";
import MusicToggleButton from "@/components/mission/button/MusicToggleButton";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"landing" | "mission" | "event">(
    "landing"
  );
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Chỉ hiện header khi đang ở TOP của trang
  const [isAtTop, setIsAtTop] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      // dùng ngưỡng nhỏ để tránh nhấp nháy do subpixel
      setIsAtTop(window.scrollY <= 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // thiết lập ban đầu
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigateToMission = () => setCurrentPage("mission");
  const handleNavigateToEvent = (id: string) => {
    setSelectedEventId(id);
    setCurrentPage("event");
  };
  const handleBackToMission = () => {
    setSelectedEventId(null);
    setCurrentPage("mission");
  };

  const selectedEvent = eventsData.find((e) => e.id === selectedEventId);

  const Header: React.FC = () => (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/co1.jpg"
            alt="Website Logo"
            className="h-8 w-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const span = document.createElement("span");
              span.textContent = "GROUP 2";
              span.className = "text-amber-300 tracking-widest font-semibold";
              target.parentElement?.appendChild(span);
            }}
          />
        </div>
        <MusicToggleButton placement="header" />
      </div>
      <div className="h-px w-full bg-white/10" />
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case "mission":
        return <MissionPage onNavigateToEvent={handleNavigateToEvent} />;
      case "event":
        if (selectedEvent) {
          return (
            <EventComponent event={selectedEvent} onBack={handleBackToMission} />
          );
        }
        setCurrentPage("mission");
        return <MissionPage onNavigateToEvent={handleNavigateToEvent} />;
      case "landing":
      default:
        return <LandingPage onNavigate={handleNavigateToMission} />;
    }
  };

  return (
    <div>
      {currentPage !== "landing" && isAtTop && <Header />}
      {renderPage()}
    </div>
  );
}
