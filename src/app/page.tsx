import Link from "next/link";
import { site } from "@/content/site";
import { posts } from "@/content/posts";
import { Portrait } from "@/components/Portrait";
import { Name } from "@/components/Name";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WorkList } from "@/components/WorkList";
import { StackMap } from "@/components/StackMap";
import { CopyEmail, LocalTime, Cookie, Reveal } from "@/components/Contact";
import { ArrowDown, ArrowUpRight } from "@/components/Icons";

/** Renders "*word*" in the hook as the accented word. */
function Hook({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/);
  return (
    <p className="hook">
      {parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p))}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <main>
        <header className="hero column">
          <Portrait alt={site.name} />
          <Name text={site.name} />
          <Hook text={site.hooks[site.activeHook]} />
          <p className="status mono">
            <span className="pulse" aria-hidden="true" />
            {site.status}
          </p>
          <nav className="hero-links" aria-label="Jump to">
            <a className="link" href="#work">
              See my work <ArrowDown />
            </a>
            <a className="link" href="#contact">
              Say hi
            </a>
          </nav>
        </header>

        <section id="work" className="section column" aria-labelledby="work-title">
          <h2 id="work-title" className="section-title" data-reveal>
            Selected work
          </h2>
          <WorkList projects={site.projects} />
        </section>

        <section className="section column" aria-labelledby="exp-title">
          <h2 id="exp-title" className="section-title" data-reveal>
            Experience
          </h2>
          <ol className="timeline">
            {site.experience.map((e, i) => (
              <li key={e.role + e.org} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <span className="when mono">{e.when}</span>
                <div>
                  <p>
                    <span className="role">{e.role}</span>
                    <span className="org">
                      {" "}
                      · {e.org}
                      {"where" in e && e.where ? `, ${e.where}` : ""}
                    </span>
                  </p>
                  <p className="line">{e.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section column" aria-labelledby="stack-title">
          <h2 id="stack-title" className="section-title" data-reveal>
            What I work with
          </h2>
          <StackMap stack={site.stack} />
        </section>

        <section className="section column" aria-labelledby="writing-title">
          <h2 id="writing-title" className="section-title" data-reveal>
            Writing
          </h2>
          <ul className="writing">
            {posts.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <Link href={`/blog/${p.slug}`}>
                  <p className="title">{p.title}</p>
                  <p className="desc">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="contact column" aria-labelledby="contact-title">
          <h2 id="contact-title" data-reveal>
            Let&rsquo;s build something.
          </h2>
          <p className="lede" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            Internships, side projects, or a question about something on this page. My inbox is open.
          </p>
          <div data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            <CopyEmail email={site.email} />
            <div className="contact-links">
              <a className="link" href={site.github.href} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a className="link" href={site.linkedin.href} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a className="link" href={`mailto:${site.email}`}>
                Open in mail app
              </a>
            </div>
          </div>
          <LocalTime timeZone={site.timeZone} />
        </section>
      </main>

      <footer className="footer column mono">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <Cookie />
      </footer>
      <Reveal />
    </>
  );
}
