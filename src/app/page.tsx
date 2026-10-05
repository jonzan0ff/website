"use client";

import { useState } from "react";
import Image from "next/image";
import TwinChat from "@/components/TwinChat";
import AgentPipeline from "@/components/AgentPipeline";
import IntroPortrait from "@/components/IntroPortrait";
const STATS = [
  { value: "25+", label: "years building and backing financial technology" },
  { value: "$1B+", label: "combined value of investment in accelerated FinTech companies" },
  { value: "2010", label: "founded Empire Startups, playing a foundational role in building the global FinTech community as we know it" },
  { value: "40", label: "early-stage fintech investments" },
];

const AI_STATS = [
  { value: "8", label: "software suites built and running" },
  { value: "2", label: "AI agents with separate permissions" },
  { value: "14", label: "hard stops that block an agent mid-action" },
  { value: "0", label: "admin keys held by any agent" },
];

const PILLARS = [
  {
    title: "Ecosystems",
    body: "Since 2010 Empire Startups has been a meeting point for banks, founders and investors. At Techstars I ran the Barclays Accelerator. I know how bank-fintech partnerships come together, and where they stall.",
  },
  {
    title: "Capital",
    body: "Former Techstars Managing Director and investor in 40 early-stage fintech companies. Judge for Innotribe, BBVA Open Talent, Startupbootcamp FinTech and TransferWise.",
  },
  {
    title: "Infrastructure",
    body: "Product strategy for institutional trading platforms at Goldman Sachs (REDI Plus), BlackRock, Instinet and E*TRADE: the plumbing banks, brokers and asset managers run on.",
  },
];

const LOGOS = [
  { name: "Techstars", src: "/logos/techstars.svg", height: "h-7" },
  { name: "Goldman Sachs", src: "/logos/goldman.svg", height: "h-11" },
  { name: "BlackRock", src: "/logos/blackrock.svg", height: "h-6" },
  { name: "E*TRADE", src: "/logos/etrade.svg", height: "h-6" },
];

const PORTFOLIO = [
  { name: "Bank Novo", where: "New York", since: 2017 },
  { name: "Sigma Ratings", where: "New York", since: 2017 },
  { name: "RealBlocks", where: "New York", since: 2017 },
  { name: "APPLICA.AI", where: "Warsaw", since: 2018 },
  { name: "vector.ai", where: "London", since: 2018 },
  { name: "Harvest Platform", where: "New York", since: 2018 },
  { name: "SendFriend", where: "New York", since: 2018 },
  { name: "Waffle Labs", since: 2018 },
  { name: "Finch", since: 2019 },
  { name: "Hubly", where: "Vancouver", since: 2019 },
  { name: "taptrip", where: "Manchester", since: 2019 },
  { name: "Lance", where: "New York", since: 2019 },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{title}</h2>
    </div>
  );
}

export default function Home() {
  const [speaking, setSpeaking] = useState(false);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
      <nav className="flex items-center justify-between py-6">
        <a href="#" className="font-serif text-xl">
          Jon Zanoff
        </a>
        <div className="hidden gap-8 text-sm text-muted sm:flex">
          <a href="#ai" className="hover:text-foreground">Agentic AI</a>
          <a href="#work" className="hover:text-foreground">Work</a>
          <a href="#twin" className="hover:text-foreground">Digital twin</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>
      </nav>

      <header className="grid items-center gap-12 py-12 sm:py-20 md:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            The Ghost of FinTech Future
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Twenty-five years where traditional financial services meet the entrepreneurs rewiring them.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            I led product strategy for trading platforms at Goldman Sachs, BlackRock and E*TRADE, ran the Barclays
            Accelerator at Techstars, and founded Empire Startups. These days I also build
            software with a team of autonomous AI agents.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#twin"
              className="rounded-full bg-accent px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
            >
              Ask me anything
            </a>
            <a
              href="#ai"
              className="rounded-full border border-border px-6 py-3 transition-colors hover:border-accent/50"
            >
              How my AI agents work
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">New York</p>
        </div>
        <IntroPortrait className="mx-auto w-64 sm:w-80" />
      </header>

      <section className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.value} className="bg-background p-6">
            <p className="font-serif text-4xl text-accent">{s.value}</p>
            <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      <section id="ai" className="scroll-mt-8 py-24">
        <SectionTitle eyebrow="Agentic AI" title="My software studio is staffed by AI agents." />
        <p className="-mt-4 mb-10 max-w-3xl text-lg leading-relaxed text-muted">
          I design every product. Autonomous AI agents write, test and review the code, inside a
          governance system I built: who can change what, which checks must pass, and when a human
          has to sign off. It&apos;s the question every financial institution now faces. How do you
          let AI act on its own and still stay in control?
        </p>

        <AgentPipeline />

        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {AI_STATS.map((s) => (
            <div key={s.label} className="bg-background p-6">
              <p className="font-serif text-4xl text-accent">{s.value}</p>
              <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="scroll-mt-8 pb-24">
        <SectionTitle eyebrow="The work" title="From the trading floor to the startup edge" />
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-surface p-7">
              <h3 className="text-xl font-medium">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-2 place-items-center gap-x-8 gap-y-12 border-y border-border py-12 lg:grid-cols-4">
          {LOGOS.map((l) => (
            <Image
              key={l.name}
              src={l.src}
              alt={l.name}
              width={0}
              height={0}
              className={`${l.height} w-auto opacity-90 brightness-0 invert`}
            />
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">Lehigh University · BS, Mechanical Engineering and Mechanics</p>
      </section>

      <section className="pb-24">
        <SectionTitle eyebrow="Portfolio" title="A few of the founders I've backed" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PORTFOLIO.map((c) => (
            <div key={c.name} className="rounded-xl border border-border p-4">
              <p className="font-medium">{c.name}</p>
              <p className="mt-1 text-sm text-muted">
                {c.where ? `${c.where} · ${c.since}` : c.since}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="twin" className="scroll-mt-8 pb-24">
        <SectionTitle eyebrow="Digital twin" title="Ask me anything" />
        <div className="grid items-start gap-10 md:grid-cols-[auto_1fr]">
          <div className="flex flex-col items-center gap-4 md:w-56">
            <Image
              src="/avatar.jpg"
              alt="AI avatar of Jon Zanoff"
              width={224}
              height={224}
              className={`w-40 rounded-full border transition-all duration-500 md:w-56 ${
                speaking
                  ? "border-accent/60 shadow-[0_0_40px_var(--color-accent-glow)] animate-pulse"
                  : "border-border"
              }`}
            />
            <p className="text-center text-sm text-muted">
              An AI version of me, briefed on my career and views. For anything that matters, email
              the real me.
            </p>
          </div>
          <TwinChat onSpeakingChange={setSpeaking} />
        </div>
      </section>

      <footer id="contact" className="scroll-mt-8 border-t border-border py-16">
        <h2 className="font-serif text-3xl sm:text-4xl">Say hello.</h2>
        <p className="mt-4 max-w-md text-muted">
          Founders, operators, institutions and boards: the best conversations still start with a
          note. Find me on LinkedIn.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <a href="https://linkedin.com/in/jonzanoff" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            LinkedIn
          </a>
          <a href="https://empirestartups.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            Empire Startups
          </a>
        </div>
      </footer>
    </div>
  );
}
