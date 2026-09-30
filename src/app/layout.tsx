import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role} 포트폴리오`,
  description: profile.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-screen">
        <Header />
        {children}
        <footer className="border-t border-line py-10 text-center text-sm text-muted">
          © 2026 {profile.name}. Built with Next.js · Deployed on Vercel
        </footer>
      </body>
    </html>
  );
}
