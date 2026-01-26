export const BLOGS = [
    {
      slug: "realtime-2d-multiplayer-metaverse",
      title: "Building a Realtime 2D Multiplayer Metaverse in the Browser",
      description:
        "A technical breakdown of the architecture behind a browser-based 2D multiplayer world: server-authoritative movement, WebSockets state sync, Phaser rendering, and proximity video calling via WebRTC.",
      tags: [
        "Next.js",
        "React",
        "Phaser",
        "WebSockets",
        "WebRTC",
        "Node.js",
        "Express",
        "Prisma",
        "PostgreSQL",
        "Turborepo",
      ],
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "Over the last few months, I’ve been building a browser-based 2D multiplayer metaverse inspired by products like Gather, Zep, and Spatial. The goal was simple on paper: let multiple users join a shared space, move around, see each other in real time, chat, and even start a video call when they’re nearby.",
            "In practice, this turned into a deep dive into realtime systems, server-authoritative movement, state synchronization, and multiplayer architecture.",
            "This post is a technical breakdown of how I designed and built the system.",
          ],
        },
        {
          heading: "High-Level Architecture",
          paragraphs: ["The project is structured as a monorepo:"],
          code: `apps/web → Next.js frontend (Phaser client)
  apps/http → REST API (auth, spaces, admin, metadata)
  apps/ws → WebSocket server (realtime multiplayer)
  packages/db → Prisma + database client`,
          bullets: [
            "HTTP server handles auth, spaces, admin actions",
            "WebSocket server handles presence, movement, chat, and realtime state",
            "Frontend uses Phaser to render the world and players",
          ],
        },
        {
          heading: "Why WebSockets + Server Authority",
          paragraphs: ["For a multiplayer system, I wanted:"],
          bullets: [
            "Low-latency updates",
            "No client-side cheating",
            "A single source of truth",
          ],
          paragraphs2: [
            "So I went with WebSockets for a persistent realtime connection and server-authoritative movement.",
            "Every movement works like this:",
          ],
          bullets2: [
            "Client sends intent: { x, y }",
            "Server validates collision + bounds",
            "Server updates state",
            "Server broadcasts the new position to everyone",
          ],
          closing:
            "This ensures: no teleport hacks, no desync, and everyone stays in sync.",
        },
        {
          heading: "World & Collision System",
          paragraphs: [
            "Visually, the world is rendered using Phaser 3 with tilemaps.",
            "Internally, the map uses floor/wall/foreground layers and a collision grid.",
            "Movement is grid-based (32px steps) and the server uses the collision grid to reject invalid moves.",
            "This separation between visual tiles and logical collision grid turned out to be critical for correctness.",
          ],
        },
        {
          heading: "Presence System & Room Management",
          paragraphs: ["Each “space” is a separate multiplayer room. When a user joins:"],
          bullets: [
            "JWT is verified",
            "User is fetched from DB",
            "Spawn point is assigned",
            "User is added to room state",
            "Presence is broadcast to others",
          ],
          paragraphs2: ["When a user leaves:"],
          bullets2: ["They’re removed from the room", "A “player left” event is broadcast"],
          closing:
            "Each room maintains connected players, their positions, and their avatars.",
        },
        {
          heading: "Realtime Chat",
          paragraphs: [
            "Chat is implemented as room-scoped messages, server-validated, and broadcast only to users in the same space.",
            "This avoids cross-room leaks and trusting clients blindly.",
          ],
        },
        {
          heading: "Proximity Video Calling with WebRTC",
          paragraphs: [
            "One of the most fun features was 1-on-1 video calling when two players are nearby.",
            "Flow:",
          ],
          bullets: [
            "Client detects proximity",
            "Allows “start call”",
            "Signaling happens over WebSocket",
            "Media flows peer-to-peer using WebRTC",
          ],
          closing: "This keeps latency low and server load minimal.",
        },
        {
          heading: "Admin System",
          paragraphs: [
            "Admins can create maps, create elements, and design spaces visually. This makes the world data-driven instead of hardcoded.",
          ],
        },
        {
          heading: "Hard Problems & Lessons",
          paragraphs: ["Some interesting challenges:"],
          bullets: [
            "Smoothing movement without client prediction",
            "Preventing jitter",
            "Keeping Phaser rendering and server state in sync",
            "Managing room lifecycles",
            "Designing message protocols",
          ],
        },
        {
          heading: "What I’d Do If I Scaled This",
          bullets: [
            "Interest management (only send nearby players)",
            "Snapshot + delta compression",
            "Region-based servers",
            "Dedicated SFU for voice",
            "Proper matchmaking & sharding",
          ],
        },
        {
          heading: "Closing Thoughts",
          paragraphs: [
            "This project taught me more about realtime systems and multiplayer architecture than any tutorial ever could. It’s still evolving, but the core architecture is now solid and extensible.",
          ],
        },
      ],
    },
  
    {
      slug: "scalable-code-execution-platform",
      title: "Building a Scalable Online Code Execution Platform (LeetCode Clone)",
      description:
        "Designing a reliable, scalable, and safe code execution pipeline: Judge0 sandboxing, async polling, verdict computation (AC/WA/TLE/CE), and persistence with PostgreSQL.",
      tags: ["Next.js", "Node.js", "Judge0", "Prisma", "PostgreSQL", "Async Pipelines"],
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "When I started building a LeetCode-style platform, I thought the hardest part would be the UI. I was wrong. The real challenge turned out to be designing a reliable, scalable, and safe code execution pipeline.",
            "In this post, I’ll walk through how I designed and built a full-stack online judge that can evaluate code submissions asynchronously, handle multiple languages, and return verdicts like AC, WA, TLE, and CE.",
          ],
        },
        {
          heading: "The Problem",
          paragraphs: [
            "Running untrusted user code is dangerous and expensive:",
          ],
          bullets: [
            "You can’t run it on your own server directly",
            "It can infinite-loop",
            "It can eat memory",
            "It can crash your process",
          ],
          paragraphs2: ["At the same time, users expect:"],
          bullets2: [
            "Fast feedback",
            "Accurate verdicts",
            "Support for multiple languages",
            "Reliable result storage",
          ],
          closing:
            "So the core problem became: how do you build a safe, asynchronous, scalable code evaluation system?",
        },
        {
          heading: "High-Level Architecture",
          paragraphs: ["The system is split into:"],
          bullets: [
            "Next.js frontend for UI",
            "Node.js API for submissions & DB",
            "Judge0 as the sandboxed execution engine",
            "PostgreSQL for persistence",
          ],
          paragraphs2: ["High-level flow:"],
          code: `Client → API → Submission DB → Judge0 → Polling Worker → Verdict → Client`,
        },
        {
          heading: "Why Judge0 + Async Polling",
          paragraphs: [
            "Instead of running code myself, I use Judge0, which runs code in containers, enforces time/memory limits, and supports many languages.",
            "But Judge0 is async: you submit code, get a token, and you must poll for the result later.",
            "So I designed the system around batch submission, async polling, and deferred verdict storage.",
          ],
        },
        {
          heading: "Submission Pipeline",
          paragraphs: ["When a user clicks “Submit”:"],
          bullets: ["Code + language + problem ID → API"],
          paragraphs2: ["Backend flow:"],
          bullets2: [
            "API stores submission as PENDING",
            "API sends batch request to Judge0",
            "Judge0 returns tokens",
            "Backend polls Judge0 for results",
            "Backend matches outputs vs expected and computes verdict",
            "DB is updated",
            "Frontend shows final result",
          ],
          closing:
            "This keeps the API fast, the UI responsive, and execution fully isolated.",
        },
        {
          heading: "Verdict System",
          paragraphs: ["Each test case produces stdout, stderr, time, and memory. The backend compares outputs and sets verdicts like:"],
          bullets: [
            "Accepted (AC)",
            "Wrong Answer (WA)",
            "Time Limit Exceeded (TLE)",
            "Runtime Error (RE)",
            "Compilation Error (CE)",
          ],
          closing: "Only the backend decides verdicts — never the client.",
        },
        {
          heading: "Security Model",
          paragraphs: ["Key rules:"],
          bullets: [
            "Never execute user code on my server",
            "Never trust client verdicts",
            "All evaluation is sandboxed, time-limited, and memory-limited",
          ],
        },
        {
          heading: "Data Model",
          paragraphs: ["Core entities:"],
          bullets: ["User", "Problem", "TestCase", "Submission", "SubmissionResult"],
          closing:
            "This enables submission history, solved tracking, and per-user progress.",
        },
        {
          heading: "Performance Problems I Hit",
          bullets: [
            "Too many polls → rate limits",
            "Large batches → slow UI",
            "Mapping language IDs reliably",
            "Handling partial failures",
          ],
        },
        {
          heading: "What I’d Change At Scale",
          paragraphs: ["If this had 100k users, I’d:"],
          bullets: [
            "Replace polling with background workers + queues (Redis/BullMQ)",
            "Cache problem data",
            "Split submission service and worker service",
            "Consider running my own sandbox instead of Judge0",
            "Shard the submissions database",
          ],
        },
        {
          heading: "Final Thoughts",
          paragraphs: [
            "This project taught me how real judge systems are designed, how to think in async pipelines, and how to build safer execution systems.",
            "It’s no longer “a LeetCode clone” — it’s a distributed evaluation system.",
          ],
        },
      ],
    },
  ];