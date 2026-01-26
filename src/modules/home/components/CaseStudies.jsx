import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CaseStudies() {
  const caseStudies = [
    {
      title: " Building a Scalable Code Execution Platform (LeetCode Clone)",
      description:
        "A full-featured online judge where users can write, submit, and evaluate code against test cases. Designed with an asynchronous execution pipeline using Judge0, secure evaluation, and scalable result polling.",
      highlights: [
        "Async code execution pipeline",
        "Multi-language support",
        "Verdict system (AC, WA, TLE, CE)",
        "Problem management & test cases",
        "Solved tracking & user progress",
      ],
      tech: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "Judge0"],
      href: "/blog/scalable-code-execution-platform",
    },
    {
      title: " Building a Realtime 2D Multiplayer Metaverse",
      description:
        "A browser-based multiplayer world where users can move around, see others in realtime, and interact in shared spaces. Built using Phaser for rendering, WebSockets for state sync, and WebRTC for voice.",
      highlights: [
        "Realtime player presence & movement sync",
        "Map system with collision grids",
        "Camera & world scaling",
        "Multiplayer state management",
        "Voice and Video infrastructure using WebRTC",
      ],
      tech: ["React", "Phaser", "WebSockets", "WebRTC", "Node.js"],
      href: "/blog/realtime-2d-multiplayer-metaverse",
    },
  ];

  return (
    <div className="mt-4 font-mono">
      <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center text-zinc-900 dark:text-white text-lg">
            <h1 className="font-bold">Featured Case Studies</h1>
          </div>

          {/* Case Studies List */}
          <div className="mt-4 space-y-4">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 p-4 hover:scale-[1.01] transition-transform duration-200"
              >
                <h2 className="text-zinc-900 dark:text-white font-bold text-base leading-snug">
                  {cs.title}
                </h2>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
                  {cs.description}
                </p>

                {/* Highlights */}
                <div className="mt-3">
                  <p className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold mb-2">
                    Highlights
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400 text-sm">
                    {cs.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                {/* Tech */}
                <div className="mt-3">
                  <p className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold mb-2">
                    Tech
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cs.tech.map((t, i) => (
                      <Badge
                        key={i}
                        className="bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4">
                  <a href={cs.href}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-zinc-900"
                    >
                      Read Case Study <span className="ml-2">&rarr;</span>
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}