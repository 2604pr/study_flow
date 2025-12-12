import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyFlow | Learning Tracker",
  description: "Track and optimize your study tasks as a developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
              <h1 className="text-lg font-semibold tracking-tight">
                StudyFlow
              </h1>
              <span className="text-xs text-slate-400">
                Focused learning for developers
              </span>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-5xl flex-1 px-4 py-6">
            {children}
          </main>

          <footer className="border-t border-slate-800 bg-slate-900/80">
            <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} StudyFlow</span>
              <span>
                Built by{" "}
                <a
                  href="https://www.linkedin.com/in/your-linkedin"
                  className="underline hover:text-slate-200"
                  target="_blank"
                >
                  Your Name
                </a>{" "}
                ·{" "}
                <a
                  href="https://github.com/your-github"
                  className="underline hover:text-slate-200"
                  target="_blank"
                >
                  GitHub
                </a>
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
