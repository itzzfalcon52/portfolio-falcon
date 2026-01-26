import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Experience() {
  const items = [
    {
      org: "E-Cell, BITS Hyderabad",
      role: "Core Team Member",
      note: "Worked on sponsorships, partnerships, and tech initiatives.",
      tag: "Leadership",
    },
    {
      org: "Launchpad'26",
      role: "Organizer",
      note: "Part of the team driving the Entrepreneurship Summit operations.",
      tag: "Events",
    },
    {
      org: "DOTA BPHC",
      role: "Web Developer",
      note: "Building and maintaining the cultural fest website.",
      tag: "Web",
    },
  ];

  return (
    <div className="mt-4 font-mono">
      <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-zinc-900 dark:text-white font-bold text-lg">Experience & Leadership</h1>
          </div>

          {/* Items */}
          <div className="mt-4 space-y-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-zinc-900 dark:text-white font-semibold text-sm">
                      {item.role}{" "}
                      <span className="text-zinc-600 dark:text-zinc-400 font-normal">· {item.org}</span>
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">{item.note}</p>
                  </div>

                  <Badge className="bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700">
                    {item.tag}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}