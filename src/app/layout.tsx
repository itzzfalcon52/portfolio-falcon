import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { Easter } from "@/components/Easter";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "Hussain Kagalwala builds full-stack web apps, applied AI products, and edge AI on real hardware. EEE student at BITS Pilani, Hyderabad, open to software and AI engineering internships.";
const hook = site.hooks[site.activeHook].replace(/\*/g, "");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Tab reads "Hussain Kagalwala — Full-stack & Edge AI Developer"; posts read "Post title · Hussain Kagalwala".
  title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.name}` },
  description,
  authors: [{ name: site.fullName, url: site.url }],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: hook,
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.role}`, description: hook },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#171716" },
  ],
};

/* Runs before paint: picks the theme (saved choice, else system) and the accent,
   and marks that JS is on so reveal/portrait styles apply without a flash. */
const boot = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t;var a=localStorage.getItem('accent');d.dataset.accent=a||'${site.accent}'}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrains.variable}`}
      data-accent={site.accent}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        {children}
        <Easter />
      </body>
    </html>
  );
}
