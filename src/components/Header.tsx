import Link from "next/link";
import { profile } from "@/data/profile";

const nav = [
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="font-bold text-ink">
          {profile.name}
          <span className="ml-2 hidden text-sm font-medium text-muted sm:inline">{profile.role}</span>
        </Link>
        <nav className="flex gap-4 text-sm font-medium text-muted sm:gap-7">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
