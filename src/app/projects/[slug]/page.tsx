import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { AwardBadge, ExternalLink, Screenshot } from "@/components/ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.title} | 서영준 포트폴리오`, description: p.tagline } : {};
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-6 text-2xl font-bold tracking-tight text-ink">{children}</h2>;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.indexOf(p);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-12">
      <Link href="/#projects" className="text-sm font-medium text-muted hover:text-ink">
        ← 프로젝트 목록
      </Link>

      {/* 제목 */}
      <header className="mt-8">
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          {p.title}
          {p.subtitle && <span className="ml-3 text-2xl font-semibold text-muted">{p.subtitle}</span>}
        </h1>
        <p className="mt-4 text-lg leading-relaxed">{p.tagline}</p>
        {p.award && (
          <div className="mt-4">
            <AwardBadge>{p.award}</AwardBadge>
          </div>
        )}
      </header>

      {/* 개요 표 */}
      <dl className="mt-10 grid gap-x-8 gap-y-5 rounded-xl bg-soft p-6 sm:grid-cols-2">
        {[
          ["기간", p.period],
          ["인원", p.team],
          ["내 역할", p.role],
          ["기여도", p.contribution ?? "단독 개발"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-sm text-muted">{k}</dt>
            <dd className="mt-1 font-semibold text-ink">{v}</dd>
          </div>
        ))}
        <div className="sm:col-span-2">
          <dt className="text-sm text-muted">기술 스택</dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="rounded-md bg-white px-2.5 py-1 text-[13px] font-medium ring-1 ring-line">
                {s}
              </span>
            ))}
          </dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.links.map((l, i) => (
          <ExternalLink key={l.href} href={l.href} primary={i === 0}>
            {l.label}
          </ExternalLink>
        ))}
      </div>

      <div className="mt-12">
        <Screenshot shot={p.cover} priority />
      </div>

      {/* 소개 */}
      <section className="mt-20">
        <H2>프로젝트 소개</H2>
        <div className="space-y-4 text-[17px] leading-8">
          {p.overview.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </section>

      {/* 주요 기능 */}
      <section className="mt-20">
        <H2>주요 기능</H2>
        <div className="grid gap-4 sm:grid-cols-2">
          {p.features.map((f) => (
            <div key={f.title} className="rounded-xl p-5 ring-1 ring-line">
              <h3 className="font-bold text-ink">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 화면 */}
      <section className="mt-20">
        <H2>화면</H2>
        <div className="space-y-10">
          {p.shots.map((s) => (
            <figure key={s.src}>
              <Screenshot shot={s} />
              {s.caption && <figcaption className="mt-3 text-center text-sm text-muted">{s.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      {/* 문제 해결 */}
      <section className="mt-20">
        <H2>{p.troubleTitle ?? "문제 해결"}</H2>
        <div className="space-y-6">
          {p.troubles.map((t, i) => (
            <article key={t.title} className="rounded-2xl p-6 ring-1 ring-line sm:p-8">
              <p className="text-sm font-semibold text-accent">#{i + 1}</p>
              <h3 className="mt-1 text-xl font-bold leading-snug text-ink">{t.title}</h3>
              <dl className="mt-6 space-y-5 text-[15px] leading-7">
                <div>
                  <dt className="font-semibold text-ink">문제</dt>
                  <dd className="mt-1">{t.problem}</dd>
                </div>
                {t.cause && (
                  <div>
                    <dt className="font-semibold text-ink">원인</dt>
                    <dd className="mt-1">{t.cause}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-semibold text-ink">해결</dt>
                  <dd className="mt-1">
                    <ul className="space-y-1.5">
                      {t.solution.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="rounded-lg bg-accent-soft px-4 py-3">
                  <dt className="font-semibold text-accent">결과</dt>
                  <dd className="mt-1 text-ink">{t.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* 회고 */}
      <section className="mt-20">
        <H2>배운 점</H2>
        <ul className="space-y-3 text-[16px] leading-7">
          {p.retrospective.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-muted" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 이전/다음 */}
      <nav className="mt-20 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="rounded-xl p-5 ring-1 ring-line transition hover:bg-soft">
            <p className="text-sm text-muted">← 이전 프로젝트</p>
            <p className="mt-1 font-bold text-ink">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="rounded-xl p-5 text-right ring-1 ring-line transition hover:bg-soft">
            <p className="text-sm text-muted">다음 프로젝트 →</p>
            <p className="mt-1 font-bold text-ink">{next.title}</p>
          </Link>
        )}
      </nav>
    </main>
  );
}
