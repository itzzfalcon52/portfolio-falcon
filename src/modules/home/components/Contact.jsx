import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Contact() {
  // TODO: replace with your real links
  const links = {
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-handle",
    email: "mailto:youremail@example.com",
  };

return (
    <div className="mt-4 font-mono">
        <Card className="bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700 w-full">
            <CardContent className="p-4">
                <h1 className="text-zinc-900 dark:text-white font-bold text-lg">
                    Let&apos;s Build Something Interesting
                </h1>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
                    I&apos;m actively looking for software engineering / full-stack internships
                    and challenging engineering problems.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                    <a href={links.github} target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-400 text-zinc-700 hover:bg-zinc-700 hover:text-white dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:hover:text-white"
                        >
                            GitHub
                        </Button>
                    </a>

                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-zinc-900"
                        >
                            LinkedIn
                        </Button>
                    </a>

                    <a href={links.email}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-zinc-900"
                        >
                            Email
                        </Button>
                    </a>
                </div>
            </CardContent>
        </Card>
    </div>
);
}

export default Contact;