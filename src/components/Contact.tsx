"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState("");
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setMsg("Copied. Talk soon.");
    } catch {
      // Clipboard blocked (old browser, insecure context): fall back to the mail app.
      window.location.href = `mailto:${email}`;
      return;
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setCopied(false);
      setMsg("");
    }, 2200);
  };

  return (
    <>
      <button type="button" className="copy-email" data-copied={copied} onClick={copy} aria-describedby="copy-hint">
        <span className="addr">
          {email.split("@")[0]}
          <wbr />@{email.split("@")[1]}
        </span>
        <span className="state">
          <CopyIcon />
          <CheckIcon />
        </span>
      </button>
      <span id="copy-hint" className="sr-only">
        Copies the email address
      </span>
      <span className="copy-toast mono" aria-live="polite">
        {msg}
      </span>
    </>
  );
}

export function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit", hour12: true });
    const tick = () => setNow(fmt.format(new Date()).toLowerCase());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <p className="local-time">
      {now ? (
        <>
          It&rsquo;s <span className="mono">{now}</span> for me in Hyderabad right now.
        </>
      ) : (
        <>I&rsquo;m in Hyderabad (IST, UTC+5:30).</>
      )}
    </p>
  );
}

/* A cookie at the very bottom. Each click takes a bite. */
const BITES = [
  "You found the bottom. Have a cookie.",
  "Good, right?",
  "Saving the last bite?",
  "Gone. Thanks for reading this far.",
];

export function Cookie() {
  const [bites, setBites] = useState(0);
  const [eaten, setEaten] = useState(0);

  useEffect(() => {
    try { setEaten(Number(localStorage.getItem("cookies") || 0)); } catch {}
  }, []);

  const bite = () => {
    setBites((b) => {
      const n = b >= 3 ? 0 : b + 1;
      if (n === 3) {
        setEaten((e) => {
          const t = e + 1;
          try { localStorage.setItem("cookies", String(t)); } catch {}
          return t;
        });
      }
      return n;
    });
  };

  const label = bites === 0 && eaten > 0 ? `Another one? That'd be cookie #${eaten + 1}.` : BITES[bites];

  return (
    <button type="button" className="cookie" onClick={bite} aria-live="polite">
      <span>{label}</span>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <defs>
          <mask id="bites">
            <rect width="28" height="28" fill="white" />
            {bites >= 1 && <circle cx="25" cy="6" r="5" fill="black" />}
            {bites >= 2 && <circle cx="26" cy="15" r="5" fill="black" />}
            {bites >= 3 && <circle cx="14" cy="14" r="16" fill="black" />}
          </mask>
        </defs>
        <g mask="url(#bites)">
          <circle cx="14" cy="14" r="11.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <rect x="9" y="9" width="2.4" height="2.4" fill="currentColor" />
          <rect x="15.5" y="8" width="2.4" height="2.4" fill="currentColor" />
          <rect x="11" y="15.5" width="2.4" height="2.4" fill="currentColor" />
          <rect x="17" y="15" width="2.4" height="2.4" fill="currentColor" />
          <rect x="13.5" y="19.5" width="2" height="2" fill="currentColor" />
        </g>
        {bites >= 3 && (
          <g fill="currentColor">
            <rect x="8" y="22" width="2" height="2" />
            <rect x="13" y="24" width="2" height="2" />
            <rect x="18" y="23" width="2" height="2" />
          </g>
        )}
      </svg>
    </button>
  );
}

/* Adds .is-in to [data-reveal] elements as they enter the viewport. */
export function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries)
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}
