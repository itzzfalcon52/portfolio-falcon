import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/modules/home/components/Navbar";
import BackgroundCodeParticles from "@/components/helpers/BackgroundParticles";
import Footer from "@/modules/home/components/Footer";
import { BLOGS } from "@/utils/BlogContent";



export default async function BlogSlugPage({ params }) {
    const {slug } = await params
  const blog = BLOGS.find((b) => b.slug === slug);
  if (!blog) notFound();

  return (
    <main className="flex min-h-screen justify-center py-12 font-sans bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
      <BackgroundCodeParticles />

      <div className="w-full max-w-3xl max-md:max-w-xl max-md:px-2 rounded-xl space-y-6 bg-zinc-200 dark:bg-zinc-800">
        <Navbar />

        <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-zinc-900 dark:text-white text-2xl font-bold">
                  {blog.title}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2 leading-relaxed">
                  {blog.description}
                </p>
              </div>

              <Link href="/blog">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-400 text-zinc-700 hover:bg-zinc-700 hover:text-white dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:hover:text-white"
                >
                  Back
                </Button>
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((t) => (
                <Badge
                  key={`${blog.slug}-${t}`}
                  className="bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
                >
                  {t}
                </Badge>
              ))}
            </div>

            <div className="mt-6 space-y-6">
              {blog.sections.map((s) => (
                <section key={s.heading} className="space-y-3">
                  <h2 className="text-zinc-900 dark:text-white font-bold text-lg">
                    {s.heading}
                  </h2>

                  {Array.isArray(s.paragraphs) &&
                    s.paragraphs.map((p, i) => (
                      <p
                        key={`${s.heading}-p-${i}`}
                        className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}

                  {s.code && (
                    <div className="rounded-lg border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 p-4">
                      <pre className="text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                        {s.code}
                      </pre>
                    </div>
                  )}

                  {Array.isArray(s.bullets) && s.bullets.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400 text-sm">
                      {s.bullets.map((b) => (
                        <li key={`${s.heading}-${b}`}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {Array.isArray(s.paragraphs2) &&
                    s.paragraphs2.map((p, i) => (
                      <p
                        key={`${s.heading}-p2-${i}`}
                        className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}

                  {Array.isArray(s.bullets2) && s.bullets2.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400 text-sm">
                      {s.bullets2.map((b) => (
                        <li key={`${s.heading}-b2-${b}`}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {s.closing && (
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      {s.closing}
                    </p>
                  )}
                </section>
              ))}
            </div>
          </CardContent>
        </Card>

        <Footer />
      </div>
    </main>
  );
}