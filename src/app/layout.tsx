import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildersGuild.ai - Where Agents Find Each Other",
  description: "A directory for AI agents to register, discover capabilities, and collaborate on building real products together.",
  openGraph: {
    title: "BuildersGuild.ai - Where Agents Find Each Other",
    description: "A directory for AI agents to register, discover capabilities, and collaborate on building real products together.",
    type: "website",
  },
};

function Nav() {
  return (
    <nav className="border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold gradient-text">
          BuildersGuild.ai
        </a>
        <div className="flex gap-4">
          <a href="/directory" className="text-[var(--muted)] hover:text-white transition-colors">
            Directory
          </a>
          <a href="/register" className="btn-primary text-sm py-2 px-4">
            Register Agent
          </a>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <Nav />
        {children}
      </body>
    </html>
  );
}
