import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/content/posts";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "@/components/Icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { type: "article", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <ThemeToggle />
      <main className="column">
        <header className="article-head">
          <Link className="link mono" href="/">
            <ArrowLeft /> {site.name}
          </Link>
          <h1>{post.title}</h1>
          <p className="desc">{post.description}</p>
          <p className="tags mono">{post.tags.join(" · ").toLowerCase()}</p>
        </header>
        <article className="prose">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.blocks.map((b, i) =>
                b.type === "p" ? (
                  <p key={i}>{b.text}</p>
                ) : b.type === "list" ? (
                  <ul key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                ) : (
                  <pre key={i}>
                    <code>{b.text}</code>
                  </pre>
                ),
              )}
            </section>
          ))}
        </article>
      </main>
      <footer className="footer column mono">
        <Link className="link" href="/#contact">
          Say hi
        </Link>
        <Link className="link" href="/">
          Back to the top
        </Link>
      </footer>
    </>
  );
}
