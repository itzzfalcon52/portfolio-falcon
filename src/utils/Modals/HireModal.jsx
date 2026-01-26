"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function HireModal({
  open,
  onOpenChange,
  resumeUrl = "/resume.pdf",
  email = "mailto:hussain.kagalwala@example.com?subject=Internship%20Opportunity",
  linkedinUrl = "https://www.linkedin.com/in/hussain-kagalwala-467a77328/",
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-white font-mono">
            Let&apos;s Build Something Interesting
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 font-mono">
          <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
            Hi! I’m currently looking for software engineering / full-stack
            internship opportunities where I can work on real-world systems,
            learn from strong engineers, and contribute to meaningful products.
          </p>

          <p className="text-zinc-700 dark:text-zinc-300 text-sm">
            I’m especially interested in roles involving:
          </p>

          <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300 text-sm">
            <li>Full-stack development</li>
            <li>Backend / systems-heavy work</li>
            <li>Realtime systems &amp; platform engineering</li>
          </ul>

          <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
            If you think I’d be a good fit for your team, I’d love to talk.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a href={resumeUrl} download>
              <Button
                variant="outline"
                size="sm"
                className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-zinc-900"
              >
                Download Resume
              </Button>
            </a>

            <a href={email}>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-zinc-900"
              >
                Email Me
              </Button>
            </a>

            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-400 text-zinc-700 hover:bg-zinc-700 hover:text-white dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:hover:text-white"
              >
                LinkedIn
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}