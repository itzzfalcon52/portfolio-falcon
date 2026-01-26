"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ContactModal({
  open,
  onOpenChange,
  phone = "+918320375491",
  email = "hussaintaherkagalwala5253@gmail.com",
  linkedinName = "Hussain Kagalwala",
  linkedinUrl = "https://www.linkedin.com/in/hussain-kagalwala/",
  college = "BITS Pilani Hyderabad Campus",
}) {
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${email}?subject=Contact%20from%20Portfolio`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-white font-mono">
            Contact
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 font-mono">
          <div className="space-y-2 text-sm">
            <p className="text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-white">
                Phone:
              </span>{" "}
              {phone}
            </p>

            <p className="text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-white">
                Email:
              </span>{" "}
              {email}
            </p>

            <p className="text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-white">
                LinkedIn:
              </span>{" "}
              {linkedinName}
            </p>

            <p className="text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-white">
                College:
              </span>{" "}
              {college}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <a href={telHref}>
              <Button
                variant="outline"
                size="sm"
                className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-zinc-900"
              >
                Call
              </Button>
            </a>

            <a href={mailHref}>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-zinc-900"
              >
                Email
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