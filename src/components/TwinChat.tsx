"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TwinChatProps {
  onSpeakingChange?: (speaking: boolean) => void;
}

const SUGGESTIONS = [
  "How do you keep your AI agents in check?",
  "How would you grow a bank partnership ecosystem?",
  "Where does agentic AI fit in financial infrastructure?",
  "What do you look for as an investor?",
  "What did Goldman and BlackRock teach you?",
];

export default function TwinChat({ onSpeakingChange }: TwinChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    onSpeakingChange?.(streaming);
  }, [streaming, onSpeakingChange]);

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    const history: Message[] = [...messages, { role: "user", content: text.trim() }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    const update = (content: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        update(full);
      }
    } catch {
      update("I couldn't connect just now. Email me at jon@zanoff.org and the real me will answer.");
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="flex h-[480px] flex-col rounded-2xl border border-border bg-surface">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col justify-end gap-4">
            <p className="text-muted">
              Ask me about strategy, partnerships, investing or AI. Or start with one of these:
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-3.5 py-1.5 text-left text-sm text-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-md bg-accent/10 px-4 py-2.5 text-foreground"
                    : "max-w-[95%] whitespace-pre-wrap leading-relaxed text-foreground/90"
                }
              >
                {m.content || <span className="text-muted">Thinking…</span>}
              </div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-3 border-t border-border p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask my digital twin…"
          aria-label="Your question"
          className="flex-1 bg-transparent px-2 py-2 text-foreground placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || streaming}
          aria-label="Send"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-background transition-opacity disabled:opacity-30"
        >
          <ArrowUp size={18} />
        </button>
      </form>
    </div>
  );
}
