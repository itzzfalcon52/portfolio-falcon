"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const OPEN_EVENT = "hk:terminal";
export const openTerminal = () => window.dispatchEvent(new Event(OPEN_EVENT));

const SECRET_WORDS = ["falcon", "hello", "hussain"];
const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

type Line = { kind: "cmd" | "out" | "hi"; text: string };

const greeting: Line[] = [
  { kind: "hi", text: "you found the back door." },
  { kind: "out", text: "type `help` to see what this thing does. esc to leave." },
];

function run(raw: string): Line[] | "clear" | "exit" {
  const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
  const out = (text: string): Line => ({ kind: "out", text });
  switch (cmd) {
    case "":
      return [];
    case "help":
      return [out("whoami · ls projects · cat stack · contact · sudo hire hussain · theme · cookie · clear · exit")];
    case "whoami":
      return [
        out(`${site.fullName}`),
        out("EEE student at BITS Pilani, Hyderabad. Builds web apps, applied AI, and edge AI on real hardware."),
      ];
    case "ls":
    case "ls projects":
      return site.projects.map((p) => out(`${p.id.padEnd(12)} ${p.line}`));
    case "cat stack":
      return site.stack.map((g) => out(`${g.group.padEnd(10)} ${g.items.map((i) => i.name).join(", ")}`));
    case "contact":
      return [out(site.email), out(site.github.href), out(site.linkedin.href)];
    case "sudo hire hussain":
    case "sudo hire":
      return [
        { kind: "hi", text: "[sudo] password for recruiter: ********" },
        out("permission granted. drafting an email…"),
        out(`→ ${site.email}`),
      ];
    case "hire hussain":
      return [out("permission denied. try sudo.")];
    case "theme": {
      const d = document.documentElement;
      const next = d.dataset.theme === "dark" ? "light" : "dark";
      d.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
      return [out(`lights ${next === "dark" ? "off" : "on"}.`)];
    }
    case "cookie":
    case "cat cookie":
      return [out("there's one at the very bottom of the page.")];
    case "rm -rf /":
    case "sudo rm -rf /":
      return [out("nice try.")];
    case "clear":
      return "clear";
    case "exit":
    case "quit":
      return "exit";
    default:
      return [out(`command not found: ${cmd.split(" ")[0]}. try \`help\`.`)];
  }
}

export function Easter() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>(greeting);
  const [value, setValue] = useState("");

  // Console note for the curious.
  useEffect(() => {
    const ink = "font: 600 13px/1.6 ui-monospace, monospace;";
    console.log(
      "%cHey, you opened DevTools.\n%cThis site is a static Next.js build. The portrait is a few " +
        "thousand dots on a canvas, dithered from a photo when the page loads.\n" +
        "Psst: type “falcon” anywhere on the page.\n" +
        `If you're hiring: ${site.email}`,
      ink,
      "font: 12px/1.6 ui-monospace, monospace; color: #8a8378;",
    );
  }, []);

  useEffect(() => {
    const open = () => {
      const d = dialog.current;
      if (d && !d.open) {
        d.showModal();
        requestAnimationFrame(() => input.current?.focus());
      }
    };
    window.addEventListener(OPEN_EVENT, open);

    let buffer = "";
    let konami = 0;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();

      konami = k === KONAMI[konami] ? konami + 1 : k === KONAMI[0] ? 1 : 0;
      if (konami === KONAMI.length) {
        konami = 0;
        open();
        return;
      }
      if (k.length === 1 && /[a-z]/.test(k)) {
        buffer = (buffer + k).slice(-12);
        if (SECRET_WORDS.some((w) => buffer.endsWith(w))) {
          buffer = "";
          open();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = run(value);
    const echo: Line = { kind: "cmd", text: `$ ${value}` };
    setValue("");
    if (res === "clear") return setLines([]);
    if (res === "exit") {
      dialog.current?.close();
      setLines(greeting);
      return;
    }
    setLines((l) => [...l, echo, ...res]);
    if (value.trim().toLowerCase().startsWith("sudo hire")) {
      window.setTimeout(() => {
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Saw your portfolio")}`;
      }, 900);
    }
  };

  return (
    <dialog
      ref={dialog}
      className="term"
      aria-label="Terminal"
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
      onClose={() => setLines(greeting)}
    >
      <div className="term-bar mono">
        <span>guest@hussaincodes ~</span>
        <button type="button" className="term-close" aria-label="Close terminal" onClick={() => dialog.current?.close()}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="term-body" ref={body} onClick={() => input.current?.focus()}>
        {lines.map((l, i) => (
          <pre key={i} className={l.kind}>
            {l.text}
          </pre>
        ))}
        <form className="term-input" onSubmit={submit}>
          <span aria-hidden="true">$</span>
          <label htmlFor="term-in" className="sr-only">
            Command
          </label>
          <input
            id="term-in"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
          />
        </form>
      </div>
    </dialog>
  );
}
