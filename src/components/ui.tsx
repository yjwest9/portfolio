import Image from "next/image";
import type { Shot } from "@/data/projects";

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-soft px-2.5 py-1 text-[13px] font-medium text-body">{children}</span>
  );
}

export function AwardBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[13px] font-semibold text-amber-700 ring-1 ring-amber-200">
      <span aria-hidden>🏆</span>
      {children}
    </span>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-semibold tracking-wide text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">{title}</h2>
    </div>
  );
}

/** 스크린샷을 브라우저 창 모양 프레임 안에 보여 준다. 모바일 캡처는 폰 비율로 가운데 정렬. */
export function Screenshot({ shot, priority = false, fixed = false }: { shot: Shot; priority?: boolean; fixed?: boolean }) {
  if (fixed) {
    // 목록 카드용: 모든 카드가 같은 16:10 비율로 보이도록 위쪽 기준으로 자른다.
    return (
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgba(22,24,29,0.08)] ring-1 ring-line">
        <div className="flex gap-1.5 border-b border-line bg-soft px-3 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            priority={priority}
            className="object-cover object-top"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </div>
    );
  }
  if (shot.mobile) {
    return (
      <div className="flex justify-center rounded-xl bg-soft p-6">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={407}
          height={914}
          className="h-auto w-56 rounded-2xl shadow-lg ring-1 ring-black/5"
        />
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgba(22,24,29,0.08)] ring-1 ring-line">
      <div className="flex gap-1.5 border-b border-line bg-soft px-3 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={1600}
        height={900}
        priority={priority}
        className="h-auto w-full"
        sizes="(min-width: 1024px) 640px, 100vw"
      />
    </div>
  );
}

export function ExternalLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        primary
          ? "inline-flex items-center gap-1 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
          : "inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-ink ring-1 ring-line transition hover:bg-soft"
      }
    >
      {children} <span aria-hidden>↗</span>
    </a>
  );
}
