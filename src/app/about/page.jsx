import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/modules/home/components/Navbar";
import BackgroundCodeParticles from "@/components/helpers/BackgroundParticles";
import Footer from "@/modules/home/components/Footer";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen justify-center py-12 font-sans bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
      <BackgroundCodeParticles />
      <div className="w-full max-w-3xl max-md:max-w-xl max-md:px-2 rounded-xl space-y-6 bg-zinc-200 dark:bg-zinc-800">
        <Navbar />

        {/* Profile Section */}
        <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-400">
                  <Image
                    src="/profile.jpeg"
                    alt="Hussain Kagalwala"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Intro */}
              <div className="flex-1">
                <h1 className="text-zinc-900 dark:text-white text-3xl font-bold mb-2">
                  About Me
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                  Hey! I&#39;m <span className="text-zinc-900 dark:text-white font-semibold">Hussain Kagalwala</span>, a sophomore at BITS Pilani, Hyderabad, and I love building things on the internet — especially the kind that have interesting systems and engineering challenges behind them.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journey Section */}
        <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
          <CardContent className="p-6">
            <h2 className="text-zinc-900 dark:text-white text-2xl font-bold mb-4">
              My Journey
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
              <p>
                I started out with frontend development, trying to make clean and responsive UIs using React and Next.js. But pretty quickly, I got more curious about what happens behind the scenes: how realtime apps sync data, how large features are structured, and how systems like code execution platforms actually work. That curiosity pushed me into building more system-heavy projects.
              </p>
              <p>
                Over time, I&#39;ve built things like a LeetCode-style online judge where users can write, submit, and evaluate code, and a realtime 2D multiplayer metaverse using Phaser, WebSockets, and WebRTC. I really enjoy working on problems where architecture, performance, and reliability actually matter — not just how things look on the surface.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What I Enjoy Section */}
        <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
          <CardContent className="p-6">
            <h2 className="text-zinc-900 dark:text-white text-2xl font-bold mb-4">
              What I Enjoy Working On
            </h2>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-base list-disc pl-6">
              <li>Realtime systems (multiplayer, presence, WebSockets)</li>
              <li>Backend-heavy features (async pipelines, background jobs, queues)</li>
              <li>Developer tools & platforms (dashboards, code execution, admin panels)</li>
              <li>Full-stack products where both UX and architecture are important</li>
            </ul>
          </CardContent>
        </Card>

        {/* Learning Section */}
        <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
          <CardContent className="p-6">
            <h2 className="text-zinc-900 dark:text-white text-2xl font-bold mb-4">
              What I&#39;m Learning & Exploring Right Now
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-4">
              Lately, I&#39;ve been spending a lot of time leveling up my engineering fundamentals and exploring more &quot;infrastructure-level&quot; topics, including:
            </p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-base list-disc pl-6">
              <li>GenAI for full-stack applications (building real products, not just demos)</li>
              <li>DevOps basics and deployment workflows</li>
              <li>Docker and containerization</li>
              <li>Redis for caching, queues, and background jobs</li>
              <li>System design and scalable backend architectures</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mt-4">
              My goal is to get more comfortable building, shipping, and operating larger, more reliable systems end-to-end.
            </p>
          </CardContent>
        </Card>

        {/* Beyond Coding Section */}
        <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
          <CardContent className="p-6">
            <h2 className="text-zinc-900 dark:text-white text-2xl font-bold mb-4">
              A Bit Beyond Coding
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-4">
              Apart from coding, I&#39;ve been quite involved in campus activities at BITS:
            </p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-base list-disc pl-6">
              <li>Part of the core team at E-Cell, BITS Hyderabad</li>
              <li>Organizer for Launchpad, our entrepreneurship summit</li>
              <li>Worked with Enactus and the Innovation Cell on sponsorships and tech initiatives</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mt-4">
              These experiences taught me how to communicate professionally, work in teams, and take ownership of things — not just write code.
            </p>
          </CardContent>
        </Card>

        {/* Looking For Section */}
        <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
          <CardContent className="p-6">
            <h2 className="text-zinc-900 dark:text-white text-2xl font-bold mb-4">
              What I&#39;m Looking For
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-4">
              Right now, I&#39;m looking for software engineering / full-stack internships where I can:
            </p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-base list-disc pl-6">
              <li>Work on real-world systems</li>
              <li>Learn from strong engineers</li>
              <li>And contribute to products that actually get used by people</li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-500 to-green-500 border-none w-full">
          <CardContent className="p-6 text-center">
            <h2 className="text-white text-2xl font-bold mb-2">
              Let&#39;s Build Something Cool
            </h2>
            <p className="text-white/90 text-base mb-4">
              If you&#39;re building something interesting, or think I&#39;d be a good fit for your team, I&#39;d love to chat. Feel free to reach out!
            </p>
            <a href="mailto:youremail@example.com">
              <Button
                variant="solid"
                size="lg"
                className="bg-white text-blue-600 border-white hover:bg-zinc-100 hover:text-blue-700 font-semibold"
              >
                Contact Me
              </Button>
            </a>
          </CardContent>
        </Card>

        <Footer />
      </div>
    </main>
  );
}