"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import TypewriterText from "@/utils/TypewriterText";
import HireModal from "@/utils/Modals/HireModal";
import ContactModal from "@/utils/Modals/ContactModal";

function ProfileCard() {
  const [hireOpen, setHireOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);

  return (
    <div className="w-full mt-4 flex justify-between items-center gap-6">
      <div className="flex-1">
        <Badge className="mx-4 bg-zinc-900 text-white font-bold font-mono px-2 py-1 rounded-md mb-2 flex justify-center items-center gap-2">
          <span className="text-green-400 animate-pulse">●</span>
          Available for Hire
        </Badge>

        <h1 className="dark:text-white text-zinc-800 text-3xl px-4 py-2 font-bold font-mono">
          <TypewriterText text="I'm Hussain..." speed={40} startDelay={200} />
        </h1>

        <p className="dark:text-zinc-400 text-zinc-700 py-2 px-4 text-sm font-mono">
          Building scalable web applications and engaging user experiences.
        </p>

        <p className="dark:text-zinc-400 text-zinc-700 px-4 text-sm font-mono">
          BITS Hyderabad,India
        </p>

        <div className="py-4 flex px-4 items-center gap-4">
          <Button
            variant="outline"
            size="md"
            onClick={() => setHireOpen(true)}
            className="px-4 py-[4px] rounded-md border-green-400 text-green-400 hover:bg-green-400 hover:text-zinc-900"
          >
            Hire Me
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => setContactOpen(true)}
            className="px-4 py-[4px] rounded-md border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-zinc-900"
          >
            Contact Me
          </Button>
        </div>
      </div>

      <div className="flex-none pr-4">
        <Avatar className="w-48 h-48 max-md:hidden rounded-full border-2 border-green-400">
          <AvatarImage
            src="/profile.jpeg"
            alt="Hussain's Profile Picture"
            className="w-full h-full object-cover"
          />
        </Avatar>
      </div>

      <HireModal
        open={hireOpen}
        onOpenChange={setHireOpen}
        resumeUrl="/resume.pdf"
        email="mailto:hussaintaherkagalwala5253@gmail.com?subject=Internship%20Opportunity"
        linkedinUrl="https://www.linkedin.com/in/hussain-kagalwala-467a77328/"
      />

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}

export default ProfileCard;