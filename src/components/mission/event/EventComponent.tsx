"use client";
import React, { FC } from "react";
import { motion } from "framer-motion";
import { EventData } from "./EventData";
import EventAudioButton from "./EventAudioButton";

// Định nghĩa kiểu cho props
interface EventComponentProps {
  event: EventData;
  onBack: () => void;
}

// Component hiển thị chi tiết một sự kiện
const EventComponent: FC<EventComponentProps> = ({ event, onBack }) => {
  const audioSrc = `/podcast/${event.id}.mp4`;

  return (
    <div className="bg-[#2a2726] text-[#e8e2d9] min-h-screen p-4 sm:p-8 md:p-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Noto+Serif:wght@400;700&display=swap');
        :root{
          --font-sans: 'Be Vietnam Pro', system-ui, -apple-system, 'Segoe UI', Roboto, 'Noto Sans', Arial, sans-serif;
          --font-serif: 'Noto Serif', Georgia, 'Times New Roman', serif;
        }
        body { background-color: #2a2726; font-family: var(--font-sans); }
        .h-serif{ font-family: var(--font-serif); }
      `}</style>

      {/* Nút voiceover (floating) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-12 md:translate-x-0 z-50">
        <EventAudioButton src={audioSrc} label="Voiceover" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <button
          onClick={onBack}
          className="absolute top-18 left-4 text-sm uppercase tracking-widest hover:text-[#c5b8a5] transition-colors z-10"
        >
          &larr; Back
        </button>

        {/* Header */}
        <header className="text-center my-12">
          <h1 className="h-serif text-7xl md:text-9xl font-bold text-[#c5b8a5]">YEAR {event.year}</h1>
        </header>

        {/* Main */}
        <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-8">
            <h2 className="h-serif text-4xl font-bold">{event.title}</h2>

            <div className="relative">
              <span className="absolute -top-4 -left-4 text-6xl text-[#c5b8a5] opacity-30">“</span>
              <p className="h-serif text-xl italic">{event.mainQuote}</p>
            </div>

            <div className="border-l-2 border-[#c5b8a5]/30 pl-4">
              <p className="mb-4">{event.description.paragraph1}</p>
              <p>{event.description.paragraph2}</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-auto object-cover border-4 border-black/20 shadow-lg"
            />
          </div>
        </main>

        {/* Gallery & Quote */}
        <section className="max-w-7xl mx-auto mt-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <img src={event.gallery.image1} alt={event.gallery.caption1} className="w-full h-auto object-cover" />
              <p className="text-center text-sm italic text-[#c5b8a5] h-serif">{event.gallery.caption1}</p>
            </div>
            <div className="space-y-4">
              <img src={event.gallery.image2} alt={event.gallery.caption2} className="w-full h-auto object-cover" />
              <p className="text-center text-sm italic text-[#c5b8a5] h-serif">{event.gallery.caption2}</p>
            </div>
          </div>

          <div className="text-center py-12">
            <div className="relative max-w-3xl mx-auto">
              <span className="absolute -top-8 left-0 text-8xl text-[#c5b8a5] opacity-20">“</span>
              <p className="h-serif text-2xl md:text-3xl italic leading-relaxed">{event.finalQuote.text}</p>
              <span className="absolute -bottom-8 right-0 text-8xl text-[#c5b8a5] opacity-20">”</span>
            </div>
            <p className="mt-6 text-lg text-[#c5b8a5] h-serif">-- {event.finalQuote.author} --</p>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default EventComponent;
