"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play, Square } from "lucide-react";

const SCRIPT =
  "Hi, I'm Jon Zanoff. Agentic AI is moving faster than anything I've seen in twenty-five years of fintech. A static website, a resume, or even LinkedIn can't possibly keep pace, so I built one you can talk to. So go ahead, ask me anything.";

export default function IntroPortrait({ className = "" }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function stop() {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setPlaying(false);
  }

  async function play() {
    await videoRef.current?.play();
    setPlaying(true);
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="relative aspect-square w-full">
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 72%)",
            opacity: playing ? 1 : 0.5,
            transform: "scale(1.15)",
          }}
        />
        <video
          ref={videoRef}
          src="/avatar.mp4"
          poster="/avatar.jpg"
          preload="metadata"
          playsInline
          onEnded={stop}
          aria-label="AI avatar of Jon Zanoff"
          className={`relative h-full w-full rounded-full border object-cover transition-colors duration-500 ${
            playing ? "border-accent/60" : "border-border"
          }`}
        />
        <Image
          src="/avatar.jpg"
          alt="AI avatar of Jon Zanoff"
          fill
          sizes="320px"
          priority
          className={`rounded-full border border-border object-cover transition-opacity duration-300 ${
            playing ? "opacity-0" : "opacity-100"
          }`}
        />
        <span className="absolute right-[6%] top-[6%] rounded-full border border-accent/40 bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          AI twin
        </span>
      </div>
      <button
        onClick={playing ? stop : play}
        className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-accent/50 hover:text-accent"
      >
        {playing ? <Square size={14} /> : <Play size={14} />}
        {playing ? "Stop" : "Start here"}
      </button>
      <p
        className={`max-w-xs text-center text-sm leading-relaxed text-muted transition-opacity duration-500 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        {playing ? SCRIPT : ""}
      </p>
    </div>
  );
}
