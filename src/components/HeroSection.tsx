import { ArrowRight, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function HeroSection() {
  return (
    <section
      id="home"
      className="scroll-mt-20 relative border-b border-white/[0.08] bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.12),_transparent_55%)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-22">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="flex flex-col justify-center gap-7 lg:col-span-7">
            <div>
              <p className="text-xs font-medium tracking-wider text-blue-400">
                1st-Year B.Tech Student · College Fresher · Learning &amp; Building
              </p>

              <h1 className="mt-4 font-['Outfit'] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                {PROFILE.role}
              </h1>

              <p className="mt-3 text-base font-medium text-blue-300/90 sm:text-lg">
                {PROFILE.headlineSub}
              </p>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
                {PROFILE.heroSummary}
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                <span>Python &amp; Web Development</span>
                <span aria-hidden="true">·</span>
                <span>Generative AI Exploration</span>
                <span aria-hidden="true">·</span>
                <span>Problem Solving Fundamentals</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <span>View Project Galleries</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#111722] px-5 py-3 text-sm font-medium text-slate-100 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-white/25 hover:bg-[#172030] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <Mail className="h-4 w-4 text-slate-300" aria-hidden="true" />
                  <span>Connect With Me</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.1] bg-[#0D131F] p-6">
              <div className="flex items-start gap-5">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#151C2A]">
                  <img
                    src={PROFILE.avatarImage}
                    alt={`${PROFILE.name} studio portrait`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wider text-blue-400">
                    Student Profile
                  </p>
                  <h2 className="mt-1 font-['Outfit'] text-xl font-semibold text-white">
                    {PROFILE.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">{PROFILE.status}</p>
                  <p className="text-sm text-slate-400">{PROFILE.role}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {PROFILE.tagline}
              </p>

              <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.08] bg-[#070A11]">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5 text-xs text-slate-400">
                  <span className="font-mono text-slate-300">student_journey.py</span>
                  <span className="font-mono text-slate-500">Python 3</span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-slate-200">
                  <code>
                    <span className="text-blue-400">student</span> = {'{\n'}
                    {'  '}
                    <span className="text-sky-300">&quot;name&quot;</span>:{' '}
                    <span className="text-emerald-300">&quot;{PROFILE.name}&quot;</span>,{'\n'}
                    {'  '}
                    <span className="text-sky-300">&quot;status&quot;</span>:{' '}
                    <span className="text-emerald-300">&quot;{PROFILE.status}&quot;</span>,{'\n'}
                    {'  '}
                    <span className="text-sky-300">&quot;interests&quot;</span>: [
                    <span className="text-emerald-300">&quot;Python&quot;</span>,{' '}
                    <span className="text-emerald-300">&quot;Web&quot;</span>,{' '}
                    <span className="text-emerald-300">&quot;Generative AI&quot;</span>],{'\n'}
                    {'  '}
                    <span className="text-sky-300">&quot;goal&quot;</span>:{' '}
                    <span className="text-emerald-300">&quot;Career in AI Engineering&quot;</span>
                    {'\n}'}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
