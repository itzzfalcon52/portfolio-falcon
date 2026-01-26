import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  // TODO: replace with your real links
  const links = {
    github: "https://github.com/itzzfalcon52",
    linkedin: "https://www.linkedin.com/in/hussain-kagalwala-467a77328/",
    email: "mailto:hussaintaherkagalwala5253@gmail.com",
  };

  return (
    <footer className="mt-6 border-t border-zinc-300 bg-zinc-200/60 dark:border-zinc-700 dark:bg-zinc-900/60 px-4 py-4 font-mono rounded-b-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          © {year} <span className="text-zinc-900 dark:text-white font-semibold">Hussain</span>. Built
          with Next.js.
        </p>

        <div className="flex items-center gap-4 text-sm">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={links.email}
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}