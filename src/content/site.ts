/**
 * Everything the site says lives here. Edit this file, not the components.
 *
 * - Reorder `projects` to reorder the work list (strongest first).
 * - `hooks[activeHook]` is the line under your name.
 * - `accent` picks one of the accent palettes defined in globals.css.
 * - Anything marked TODO is a placeholder waiting for a real link.
 */

export type ProjectLink = { label: string; href: string };

export type Preview =
  | { kind: "image"; src: string; alt: string }
  /** Drawn in dots on a canvas, in the page's ink colour. */
  | { kind: "dots"; pattern: "spectrogram" | "ocean"; alt: string };

export type Project = {
  id: string;
  name: string;
  /** One plain-English line. */
  line: string;
  /** Two or three sentences, shown when a row is opened. */
  detail: string;
  tags: string[];
  links: ProjectLink[];
  /** Slug of a post in posts.ts, if there's a write-up. */
  writeup?: string;
  /** Small mono note beside the name, e.g. "SIH 2026". */
  note?: string;
  preview: Preview;
};

export const site = {
  name: "Hussain Kagalwala",
  fullName: "Hussain Taher Kagalwala",
  url: "https://hussaincodes.live",

  /** Line under the name. Pick with `activeHook`. The word wrapped in *stars* gets the accent. */
  hooks: [
    "I build things that work on the web, on servers, and on *tiny chips*.",
    "Some of my code runs in your browser. Some of it runs on a chip the size of a *stamp*.",
    "I make web apps people actually use, and neural nets small enough to fit on a *microcontroller*.",
    "Browser, server, microcontroller: I like shipping the whole stack, *all the way down*.",
  ],
  activeHook: 0,

  /** Shown in the browser tab after the name. */
  role: "Full-stack & Edge AI Developer",

  status: "EEE student at BITS Pilani, Hyderabad · open to internships",

  /** "blue" | "marigold" | "olive" */
  accent: "blue" as "blue" | "marigold" | "olive",

  email: "hussaintaherkagalwala5253@gmail.com",
  github: { handle: "itzzfalcon52", href: "https://github.com/itzzfalcon52" },
  linkedin: {
    handle: "hussain-kagalwala",
    href: "https://www.linkedin.com/in/hussain-kagalwala-467a77328/",
  },
  timeZone: "Asia/Kolkata",

  projects: [
    {
      id: "holdfast",
      name: "Holdfast",
      line: "Finds the customers about to churn, explains why in plain words, and checks if outreach worked.",
      detail:
        "A deployed SaaS with a LangGraph agent that answers through typed, workspace-scoped tools. Every number the model writes is checked against computed evidence before anyone sees it, and the model only ever sees pseudonymous labels.",
      tags: ["React", "FastAPI", "LangGraph", "XGBoost", "PostgreSQL"],
      links: [
        { label: "Live demo", href: "https://holdfast-ai.duckdns.org" },
        // TODO: add the GitHub repo if it's public
      ],
      preview: { kind: "image", src: "/work/holdfast.jpg", alt: "Holdfast landing page showing a churn-risk tag for a demo account" },
    },
    {
      id: "kws",
      name: "Keyword spotting on a Coral board",
      line: "A 12-command voice model, squeezed to INT8 and running on the Edge TPU of a Coral Dev Board Micro.",
      detail:
        "Trained a CNN for 10 commands plus unknown and silence, quantized it to INT8 for the Edge TPU, and wrote the on-device audio preprocessing in C++. Board predictions match desktop inference on the same inputs. Research paper in progress.",
      tags: ["TensorFlow Lite", "Edge TPU", "C++", "INT8"],
      note: "paper in progress",
      links: [
        // TODO: add the repo (and the paper, once it's out)
      ],
      preview: { kind: "dots", pattern: "spectrogram", alt: "Illustration: a spectrogram of a spoken command, drawn in dots" },
    },
    {
      id: "drowsiness",
      name: "Driver Drowsiness Detection",
      line: "A camera the size of a matchbox that notices when a driver's eyes stay shut, and raises the alarm.",
      detail:
        "Built during my internship at Digitoad. I fine-tuned MobileNetV2, quantized it to INT8 and ran it in real time on an OpenMV H7 microcontroller camera. The camera talks to an ESP32 over UART, which sounds the alert and logs every event to a Blynk Cloud dashboard.",
      tags: ["MobileNetV2", "INT8", "OpenMV H7", "ESP32", "Blynk"],
      note: "Digitoad internship",
      links: [],
      preview: {
        kind: "image",
        src: "/work/drowsiness.jpg",
        alt: "Illustration: a camera view boxing two closed eyes, with the alert path from the OpenMV camera to an ESP32 and a dashboard",
      },
    },
    {
      id: "sponscrm",
      name: "SponsCRM",
      line: "The sponsorship CRM E-Cell at BITS Hyderabad actually uses to run its outreach.",
      detail:
        "Pipeline tracking, company assignment, activity logs, bulk import and Google Sheets export, behind role-based permissions and organization-scoped APIs.",
      tags: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
      links: [{ label: "Live", href: "https://www.sponscrm.tech" }],
      preview: { kind: "image", src: "/work/sponscrm.jpg", alt: "SponsCRM landing page" },
    },
    {
      id: "skillforge",
      name: "SkillForge",
      line: "A LeetCode-style online judge that runs untrusted code safely and hands back verdicts.",
      detail:
        "Submissions go through Judge0 sandboxes in batches, get polled asynchronously, and are judged on the server: AC, WA, TLE, RE, CE. The client never decides a verdict.",
      tags: ["Next.js", "Node.js", "Judge0", "Prisma", "PostgreSQL"],
      links: [
        { label: "Live", href: "https://skill-forge-orpin.vercel.app" },
        { label: "GitHub", href: "https://github.com/itzzfalcon52/skill-forge" },
      ],
      writeup: "scalable-code-execution-platform",
      preview: { kind: "image", src: "/work/skillforge.jpg", alt: "SkillForge landing page" },
    },
    {
      id: "hangoutx",
      name: "HangoutX",
      line: "A 2D multiplayer world in the browser where walking up to someone lets you start a video call.",
      detail:
        "Server-authoritative movement over WebSockets keeps every player in sync, Phaser draws the world, and WebRTC carries proximity voice and video peer to peer.",
      tags: ["React", "Phaser", "WebSockets", "WebRTC"],
      links: [
        { label: "Live", href: "https://www.hangoutx.space" },
        { label: "GitHub", href: "https://github.com/itzzfalcon52/HangoutX" },
      ],
      writeup: "realtime-2d-multiplayer-metaverse",
      preview: { kind: "image", src: "/work/hangoutx.jpg", alt: "HangoutX landing page" },
    },
    {
      id: "antarbodh",
      name: "AntarBodh",
      line: "Reading the ocean's temperature 15 depths down, from what satellites see at the surface.",
      detail:
        "Built with a team for Smart India Hackathon 2026: a CNN encoder and depth decoder over 7 satellite channels for the Bay of Bengal, checked against independent ARGO float measurements.",
      tags: ["PyTorch", "xarray", "FastAPI"],
      note: "SIH 2026",
      links: [{ label: "Live demo", href: "https://antarbodh-demo.vercel.app/" }],
      preview: { kind: "dots", pattern: "ocean", alt: "Illustration: ocean temperature fading with depth, drawn in dots" },
    },
  ] satisfies Project[] as Project[],

  experience: [
    {
      when: "May – Jul 2026",
      role: "Edge AI & Embedded Systems Intern",
      org: "Digitoad Technologies",
      where: "Bengaluru",
      line: "Put a driver-drowsiness model on a microcontroller camera: MobileNetV2, INT8, OpenMV H7, with ESP32 alerts.",
    },
    {
      when: "Aug 2026 – now",
      role: "Treasurer",
      org: "E-Cell, BITS Hyderabad",
      line: "Budgets and financial planning for the cell's entrepreneurship events.",
    },
    {
      when: "2026",
      role: "Organizer",
      org: "Launchpad'26",
      line: "Part of the team that ran the entrepreneurship summit.",
    },
    {
      when: "2026",
      role: "Web Developer",
      org: "DOTA, BITS Hyderabad",
      line: "Building and maintaining the cultural fest's website.",
    },
  ],

  /**
   * "What I work with", drawn as a signal path: browser → server → chip.
   * `icon` is a Simple Icons slug (see src/components/StackMap.tsx for the ones wired up);
   * leave it out for tools without an official mark and they get a square dot.
   */
  stack: [
    {
      group: "Web",
      where: "in the browser",
      art: "browser",
      items: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextdotjs" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Tailwind", icon: "tailwindcss" },
        { name: "Phaser" },
      ],
    },
    {
      group: "Backend",
      where: "on servers",
      art: "server",
      items: [
        { name: "Node.js", icon: "nodedotjs" },
        { name: "FastAPI", icon: "fastapi" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "Prisma", icon: "prisma" },
        { name: "WebSockets" },
        { name: "WebRTC", icon: "webrtc" },
        { name: "Docker", icon: "docker" },
      ],
    },
    {
      group: "AI & Edge",
      where: "on tiny chips",
      art: "chip",
      items: [
        { name: "LangGraph" },
        { name: "PyTorch", icon: "pytorch" },
        { name: "scikit-learn", icon: "scikitlearn" },
        { name: "TensorFlow Lite", icon: "tensorflow" },
        { name: "INT8 quantization" },
        { name: "Edge TPU" },
        { name: "ESP32", icon: "espressif" },
      ],
    },
  ] as { group: string; where: string; art: "browser" | "server" | "chip"; items: { name: string; icon?: string }[] }[],

};

export type Site = typeof site;
