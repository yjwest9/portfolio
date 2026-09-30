import Link from "next/link";
import { projects, otherWorks } from "@/data/projects";
import { profile, skills, timeline } from "@/data/profile";
import { AwardBadge, ExternalLink, Screenshot, SectionTitle, Tag } from "@/components/ui";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-20 sm:pt-28">
        <p className="font-semibold text-accent">{profile.role}</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-6xl sm:leading-[1.15]">
          {profile.headline[0]}
          <br />
          {profile.headline[1]} <span className="text-accent">{profile.name}</span>입니다.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">{profile.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#projects"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            프로젝트 보기
          </Link>
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-ink ring-1 ring-line transition hover:bg-soft"
          >
            {profile.email}
          </a>
        </div>
        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-8">
          {profile.facts.map((f) => (
            <div key={f.label}>
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-line bg-soft/60 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle eyebrow="PROJECTS" title="주요 프로젝트" />
          <div className="flex flex-col gap-10">
            {projects.map((p, i) => (
              <article
                key={p.slug}
                className="grid gap-8 rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10"
              >
                <Link href={`/projects/${p.slug}`} className="block self-start transition hover:-translate-y-0.5">
                  <Screenshot shot={p.cover} priority={i === 0} fixed />
                </Link>
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                    <span className="font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>{p.period}</span>
                    <span aria-hidden>·</span>
                    <span>{p.team}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-ink">
                    {p.title}
                    {p.subtitle && <span className="ml-2 text-lg font-semibold text-muted">{p.subtitle}</span>}
                  </h3>
                  <p className="mt-2 leading-relaxed">{p.tagline}</p>
                  {p.award && (
                    <div className="mt-3">
                      <AwardBadge>{p.award}</AwardBadge>
                    </div>
                  )}
                  <p className="mt-5 text-sm">
                    <span className="font-semibold text-ink">내 역할 </span>
                    {p.role}
                    {p.contribution && <span className="text-muted"> · {p.contribution}</span>}
                  </p>
                  <ul className="mt-4 space-y-2 text-[15px]">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-7">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
                    >
                      자세히 보기 →
                    </Link>
                    {p.links.map((l) => (
                      <ExternalLink key={l.href} href={l.href}>
                        {l.label}
                      </ExternalLink>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <h3 className="mb-5 mt-16 text-lg font-bold text-ink">그 밖의 작업</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {otherWorks.map((w) => (
              <div key={w.title} className="rounded-xl bg-white p-6 ring-1 ring-line">
                <p className="text-sm text-muted">{w.kind}</p>
                <h4 className="mt-1 font-bold text-ink">{w.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed">{w.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle eyebrow="SKILLS" title="기술 스택" />
        <div className="grid gap-5 sm:grid-cols-2">
          {skills.map((g) => (
            <div key={g.group} className="rounded-xl p-6 ring-1 ring-line">
              <h3 className="font-bold text-ink">{g.group}</h3>
              <ul className="mt-4 divide-y divide-line">
                {g.items.map((s) => (
                  <li key={s.name} className="flex items-baseline justify-between gap-4 py-2.5 text-[15px]">
                    <span className="font-semibold text-ink">{s.name}</span>
                    <span className="text-right text-sm text-muted">{s.used}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-line bg-soft/60 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle eyebrow="ABOUT" title="교육 · 수상" />
          <ol className="relative max-w-3xl border-l border-line pl-8">
            {timeline.map((t) => (
              <li key={t.title} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[37px] top-1.5 size-3 rounded-full bg-accent ring-4 ring-accent-soft" />
                <p className="text-sm text-muted">{t.period}</p>
                <h3 className="mt-1 text-lg font-bold text-ink">{t.title}</h3>
                {t.desc && <p className="mt-1 text-[15px]">{t.desc}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-5 py-24 text-center">
        <p className="text-sm font-semibold tracking-wide text-accent">CONTACT</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">함께 일할 기회를 기다리고 있습니다</h2>
        <p className="mt-4">{profile.location} · 풀스택 / 백엔드 / 프론트엔드</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition hover:brightness-110"
          >
            {profile.email}
          </a>
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
        </div>
      </section>
    </main>
  );
}
