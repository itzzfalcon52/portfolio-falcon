// Blog posts. Edit freely; each post renders at /blog/<slug>.

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  sections: { heading: string; blocks: Block[] }[];
};

export const posts: Post[] = [
  {
    "slug": "realtime-2d-multiplayer-metaverse",
    "title": "Building a Realtime 2D Multiplayer Metaverse in the Browser",
    "description": "A technical breakdown of the architecture behind a browser-based 2D multiplayer world: server-authoritative movement, WebSockets state sync, Phaser rendering, and proximity video calling via WebRTC.",
    "tags": [
      "Next.js",
      "React",
      "Phaser",
      "WebSockets",
      "WebRTC",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Turborepo"
    ],
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "p",
            "text": "Over the last few months, I’ve been building a browser-based 2D multiplayer metaverse inspired by products like Gather, Zep, and Spatial. The goal was simple on paper: let multiple users join a shared space, move around, see each other in real time, chat, and even start a video call when they’re nearby."
          },
          {
            "type": "p",
            "text": "In practice, this turned into a deep dive into realtime systems, server-authoritative movement, state synchronization, and multiplayer architecture."
          },
          {
            "type": "p",
            "text": "This post is a technical breakdown of how I designed and built the system."
          }
        ]
      },
      {
        "heading": "High-Level Architecture",
        "blocks": [
          {
            "type": "p",
            "text": "The project is structured as a monorepo:"
          },
          {
            "type": "code",
            "text": "apps/web → Next.js frontend (Phaser client)\napps/http → REST API (auth, spaces, admin, metadata)\napps/ws → WebSocket server (realtime multiplayer)\npackages/db → Prisma + database client"
          },
          {
            "type": "list",
            "items": [
              "HTTP server handles auth, spaces, admin actions",
              "WebSocket server handles presence, movement, chat, and realtime state",
              "Frontend uses Phaser to render the world and players"
            ]
          }
        ]
      },
      {
        "heading": "Why WebSockets + Server Authority",
        "blocks": [
          {
            "type": "p",
            "text": "For a multiplayer system, I wanted:"
          },
          {
            "type": "list",
            "items": [
              "Low-latency updates",
              "No client-side cheating",
              "A single source of truth"
            ]
          },
          {
            "type": "p",
            "text": "So I went with WebSockets for a persistent realtime connection and server-authoritative movement."
          },
          {
            "type": "p",
            "text": "Every movement works like this:"
          },
          {
            "type": "list",
            "items": [
              "Client sends intent: { x, y }",
              "Server validates collision + bounds",
              "Server updates state",
              "Server broadcasts the new position to everyone"
            ]
          },
          {
            "type": "p",
            "text": "This ensures: no teleport hacks, no desync, and everyone stays in sync."
          }
        ]
      },
      {
        "heading": "World & Collision System",
        "blocks": [
          {
            "type": "p",
            "text": "Visually, the world is rendered using Phaser 3 with tilemaps."
          },
          {
            "type": "p",
            "text": "Internally, the map uses floor/wall/foreground layers and a collision grid."
          },
          {
            "type": "p",
            "text": "Movement is grid-based (32px steps) and the server uses the collision grid to reject invalid moves."
          },
          {
            "type": "p",
            "text": "This separation between visual tiles and logical collision grid turned out to be critical for correctness."
          }
        ]
      },
      {
        "heading": "Presence System & Room Management",
        "blocks": [
          {
            "type": "p",
            "text": "Each “space” is a separate multiplayer room. When a user joins:"
          },
          {
            "type": "list",
            "items": [
              "JWT is verified",
              "User is fetched from DB",
              "Spawn point is assigned",
              "User is added to room state",
              "Presence is broadcast to others"
            ]
          },
          {
            "type": "p",
            "text": "When a user leaves:"
          },
          {
            "type": "list",
            "items": [
              "They’re removed from the room",
              "A “player left” event is broadcast"
            ]
          },
          {
            "type": "p",
            "text": "Each room maintains connected players, their positions, and their avatars."
          }
        ]
      },
      {
        "heading": "Realtime Chat",
        "blocks": [
          {
            "type": "p",
            "text": "Chat is implemented as room-scoped messages, server-validated, and broadcast only to users in the same space."
          },
          {
            "type": "p",
            "text": "This avoids cross-room leaks and trusting clients blindly."
          }
        ]
      },
      {
        "heading": "Proximity Video Calling with WebRTC",
        "blocks": [
          {
            "type": "p",
            "text": "One of the most fun features was 1-on-1 video calling when two players are nearby."
          },
          {
            "type": "p",
            "text": "Flow:"
          },
          {
            "type": "list",
            "items": [
              "Client detects proximity",
              "Allows “start call”",
              "Signaling happens over WebSocket",
              "Media flows peer-to-peer using WebRTC"
            ]
          },
          {
            "type": "p",
            "text": "This keeps latency low and server load minimal."
          }
        ]
      },
      {
        "heading": "Admin System",
        "blocks": [
          {
            "type": "p",
            "text": "Admins can create maps, create elements, and design spaces visually. This makes the world data-driven instead of hardcoded."
          }
        ]
      },
      {
        "heading": "Hard Problems & Lessons",
        "blocks": [
          {
            "type": "p",
            "text": "Some interesting challenges:"
          },
          {
            "type": "list",
            "items": [
              "Smoothing movement without client prediction",
              "Preventing jitter",
              "Keeping Phaser rendering and server state in sync",
              "Managing room lifecycles",
              "Designing message protocols"
            ]
          }
        ]
      },
      {
        "heading": "What I’d Do If I Scaled This",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Interest management (only send nearby players)",
              "Snapshot + delta compression",
              "Region-based servers",
              "Dedicated SFU for voice",
              "Proper matchmaking & sharding"
            ]
          }
        ]
      },
      {
        "heading": "Closing Thoughts",
        "blocks": [
          {
            "type": "p",
            "text": "This project taught me more about realtime systems and multiplayer architecture than any tutorial ever could. It’s still evolving, but the core architecture is now solid and extensible."
          }
        ]
      }
    ]
  },
  {
    "slug": "scalable-code-execution-platform",
    "title": "Building a Scalable Online Code Execution Platform (LeetCode Clone)",
    "description": "Designing a reliable, scalable, and safe code execution pipeline: Judge0 sandboxing, async polling, verdict computation (AC/WA/TLE/CE), and persistence with PostgreSQL.",
    "tags": [
      "Next.js",
      "Node.js",
      "Judge0",
      "Prisma",
      "PostgreSQL",
      "Async Pipelines"
    ],
    "sections": [
      {
        "heading": "Overview",
        "blocks": [
          {
            "type": "p",
            "text": "When I started building a LeetCode-style platform, I thought the hardest part would be the UI. I was wrong. The real challenge turned out to be designing a reliable, scalable, and safe code execution pipeline."
          },
          {
            "type": "p",
            "text": "In this post, I’ll walk through how I designed and built a full-stack online judge that can evaluate code submissions asynchronously, handle multiple languages, and return verdicts like AC, WA, TLE, and CE."
          }
        ]
      },
      {
        "heading": "The Problem",
        "blocks": [
          {
            "type": "p",
            "text": "Running untrusted user code is dangerous and expensive:"
          },
          {
            "type": "list",
            "items": [
              "You can’t run it on your own server directly",
              "It can infinite-loop",
              "It can eat memory",
              "It can crash your process"
            ]
          },
          {
            "type": "p",
            "text": "At the same time, users expect:"
          },
          {
            "type": "list",
            "items": [
              "Fast feedback",
              "Accurate verdicts",
              "Support for multiple languages",
              "Reliable result storage"
            ]
          },
          {
            "type": "p",
            "text": "So the core problem became: how do you build a safe, asynchronous, scalable code evaluation system?"
          }
        ]
      },
      {
        "heading": "High-Level Architecture",
        "blocks": [
          {
            "type": "p",
            "text": "The system is split into:"
          },
          {
            "type": "code",
            "text": "Client → API → Submission DB → Judge0 → Polling Worker → Verdict → Client"
          },
          {
            "type": "list",
            "items": [
              "Next.js frontend for UI",
              "Node.js API for submissions & DB",
              "Judge0 as the sandboxed execution engine",
              "PostgreSQL for persistence"
            ]
          },
          {
            "type": "p",
            "text": "High-level flow:"
          }
        ]
      },
      {
        "heading": "Why Judge0 + Async Polling",
        "blocks": [
          {
            "type": "p",
            "text": "Instead of running code myself, I use Judge0, which runs code in containers, enforces time/memory limits, and supports many languages."
          },
          {
            "type": "p",
            "text": "But Judge0 is async: you submit code, get a token, and you must poll for the result later."
          },
          {
            "type": "p",
            "text": "So I designed the system around batch submission, async polling, and deferred verdict storage."
          }
        ]
      },
      {
        "heading": "Submission Pipeline",
        "blocks": [
          {
            "type": "p",
            "text": "When a user clicks “Submit”:"
          },
          {
            "type": "list",
            "items": [
              "Code + language + problem ID → API"
            ]
          },
          {
            "type": "p",
            "text": "Backend flow:"
          },
          {
            "type": "list",
            "items": [
              "API stores submission as PENDING",
              "API sends batch request to Judge0",
              "Judge0 returns tokens",
              "Backend polls Judge0 for results",
              "Backend matches outputs vs expected and computes verdict",
              "DB is updated",
              "Frontend shows final result"
            ]
          },
          {
            "type": "p",
            "text": "This keeps the API fast, the UI responsive, and execution fully isolated."
          }
        ]
      },
      {
        "heading": "Verdict System",
        "blocks": [
          {
            "type": "p",
            "text": "Each test case produces stdout, stderr, time, and memory. The backend compares outputs and sets verdicts like:"
          },
          {
            "type": "list",
            "items": [
              "Accepted (AC)",
              "Wrong Answer (WA)",
              "Time Limit Exceeded (TLE)",
              "Runtime Error (RE)",
              "Compilation Error (CE)"
            ]
          },
          {
            "type": "p",
            "text": "Only the backend decides verdicts — never the client."
          }
        ]
      },
      {
        "heading": "Security Model",
        "blocks": [
          {
            "type": "p",
            "text": "Key rules:"
          },
          {
            "type": "list",
            "items": [
              "Never execute user code on my server",
              "Never trust client verdicts",
              "All evaluation is sandboxed, time-limited, and memory-limited"
            ]
          }
        ]
      },
      {
        "heading": "Data Model",
        "blocks": [
          {
            "type": "p",
            "text": "Core entities:"
          },
          {
            "type": "list",
            "items": [
              "User",
              "Problem",
              "TestCase",
              "Submission",
              "SubmissionResult"
            ]
          },
          {
            "type": "p",
            "text": "This enables submission history, solved tracking, and per-user progress."
          }
        ]
      },
      {
        "heading": "Performance Problems I Hit",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Too many polls → rate limits",
              "Large batches → slow UI",
              "Mapping language IDs reliably",
              "Handling partial failures"
            ]
          }
        ]
      },
      {
        "heading": "What I’d Change At Scale",
        "blocks": [
          {
            "type": "p",
            "text": "If this had 100k users, I’d:"
          },
          {
            "type": "list",
            "items": [
              "Replace polling with background workers + queues (Redis/BullMQ)",
              "Cache problem data",
              "Split submission service and worker service",
              "Consider running my own sandbox instead of Judge0",
              "Shard the submissions database"
            ]
          }
        ]
      },
      {
        "heading": "Final Thoughts",
        "blocks": [
          {
            "type": "p",
            "text": "This project taught me how real judge systems are designed, how to think in async pipelines, and how to build safer execution systems."
          },
          {
            "type": "p",
            "text": "It’s no longer “a LeetCode clone” — it’s a distributed evaluation system."
          }
        ]
      }
    ]
  }
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
