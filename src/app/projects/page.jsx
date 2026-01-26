import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/modules/home/components/Navbar";
import BackgroundCodeParticles from "@/components/helpers/BackgroundParticles";
import Footer from "@/modules/home/components/Footer";

export default function ProjectsPage() {
  const projects = [
    {
      slug: "hangoutx",
      image: "/HangoutX.png",
      title: "HangoutX — 2D Metaverse App",
      description:
        "A 2D metaverse application enabling users to create avatars, explore virtual spaces, and interact with others in real-time.",
      tags: ["WebSockets", "WebRTC", "Phaser", "Next.js"],
      github: "https://github.com/itzzfalcon52/HangoutX",
      live: "https://www.hangoutx.space/",
    },
    {
      slug: "skillforge",
      image: "/SkillForge.png",
      title: "SkillForge — Online Coding Platform",
      description:
        "An online coding platform offering interactive coding challenges, tutorials, and a collaborative environment for developers to enhance their skills.",
      tags: ["Judge0", "Next.js", "React", "shadcn/ui", "Prisma", "PostgreSQL"],
      github: "https://github.com/itzzfalcon52/skill-forge",
      live: "https://skill-forge-orpin.vercel.app/",
    },
    {
        slug: "umbrella-alert",
        image: "/UmbrellaAlert.png",
        title: "Umbrella Alert — Weather Notification App",
        description:
          "A weather notification app that shows forecasts and lets users compare weather across cities.",
        tags: ["React", "API Integrations", "Netlify"],
        github: "https://github.com/itzzfalcon52/React--Weather_app",
        live: "https://umbrellaalert.netlify.app/",
      },
    {
      slug: "worldwise",
      image: "/worldWise.png", 
      title: "WorldWise — Track Your Trips Efficiently",
      description:
        "WorldWise is a travel tracking web app where you can keep a record of the cities you’ve visited around the world. It includes an interactive map, date picker, and notes — tied together with a smooth React experience.",
      tags: ["React Router", "React Leaflet", "Vite", "Supabase", "Netlify"],
      github: "https://github.com/itzzfalcon52/React--WorldWise",
      live: "https://trackwithworldwise.netlify.app/",
    },
    {
      slug: "yumlyst",
      image: "/yumlyst.png",
      title: "Yumlyst — Recipe Search & Cooking Assistant",
      description:
        "Yumlyst is a modern, responsive web app that helps you search dishes and get step-by-step recipes. It also lets you customize ingredient quantities based on servings.",
      tags: ["JavaScript", "Forkify API"],
      github: "https://github.com/itzzfalcon52/Yumlyst-app",
      live: "https://yumlyst-app.netlify.app/",
    },
    {
      slug: "usepopcorn",
      image: "/usePopcorn.png", 
      title: "usePopcorn — Movie Finder & Watch Tracker",
      description:
        "usePopcorn is a movie-finding web app built with React. It uses the OMDb API to fetch movie data and allows users to search, explore, and track movies they’ve watched.",
      tags: ["React", "OMDb API"],
      github: "https://github.com/itzzfalcon52/React--UsePopcorn",
      live: "https://watchwithpopcorn.netlify.app",
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
                Projects
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                A few things I’ve built recently.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              {projects.map((p) => (
                <Card
                  key={p.slug}
                  className="bg-zinc-50 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 overflow-hidden hover:scale-[1.01] transition-transform duration-200"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image */}
                      <div className="relative w-full sm:w-44 h-40 sm:h-28 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 640px) 100vw, 176px"
                          priority={false}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h2 className="text-zinc-900 dark:text-white font-bold text-lg">
                          {p.title}
                        </h2>

                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 leading-relaxed">
                          {p.description}
                        </p>

                        {/* Tags */}
                        {Array.isArray(p.tags) && p.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {p.tags.map((tag) => (
                              <Badge
                                key={`${p.slug}-${tag}`}
                                className="bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* CTAs */}
                        <div className="mt-4 flex flex-wrap gap-3">
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-zinc-400 text-zinc-700 hover:bg-zinc-700 hover:text-white dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:hover:text-white"
                            >
                              GitHub
                            </Button>
                          </a>

                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-zinc-900"
                            >
                              Live
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Footer />
      </div>
    </main>
  );
}