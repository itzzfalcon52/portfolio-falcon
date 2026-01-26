import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/modules/home/components/Navbar";
import BackgroundCodeParticles from "@/components/helpers/BackgroundParticles";
import Footer from "@/modules/home/components/Footer";

export default function BlogPage() {
  const blogs = [
    {
      slug: "scalable-code-execution-platform",
      title: "Building a Scalable Code Execution Platform (LeetCode Clone)",
      description:
        "How I designed an online judge: async execution pipeline with Judge0, secure evaluation, scalable polling, and a clean verdict system.",
      tags: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "Judge0"],
    },
    {
      slug: "realtime-2d-multiplayer-metaverse",
      title: "Building a Realtime 2D Multiplayer Metaverse",
      description:
        "Deep dive into realtime multiplayer: movement sync, state management, rendering with Phaser, and voice/video using WebRTC.",
      tags: ["React", "Phaser", "WebSockets", "WebRTC", "Node.js"],
    },
  ];

  return (
    <main className="flex min-h-screen justify-center py-12 font-sans bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
      <BackgroundCodeParticles />

      <div className="w-full max-w-3xl max-md:max-w-xl max-md:px-2 rounded-xl space-y-6 bg-zinc-200 dark:bg-zinc-800">
        <Navbar />

        <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-zinc-900 dark:text-white text-2xl font-bold">
                Blog
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Notes on systems, engineering, and things I build.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {blogs.map((b) => (
                <div
                  key={b.slug}
                  className="rounded-lg border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 p-4 hover:scale-[1.01] transition-transform duration-200"
                >
                  <h2 className="text-zinc-900 dark:text-white font-bold text-base leading-snug">
                    {b.title}
                  </h2>

                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
                    {b.description}
                  </p>

                  <div className="mt-3">
                    <p className="text-zinc-800 dark:text-zinc-200 text-sm font-semibold mb-2">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {b.tags.map((t) => (
                        <Badge
                          key={`${b.slug}-${t}`}
                          className="bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link href={`/blog/${b.slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-zinc-900"
                      >
                        Read Blog <span className="ml-2">&rarr;</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Footer />
      </div>
    </main>
  );
}