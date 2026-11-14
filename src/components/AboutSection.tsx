import { ABOUT_APPROACH, ABOUT_QUOTES, FOCUS_AREAS } from '../data/portfolioData';

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-white/[0.08] bg-[#07090E] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-wider text-blue-400">About Me</p>
          <h2 className="mt-2 font-['Outfit'] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Building My Foundation as a 1st-Year B.Tech Student
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            I am a student who is learning, building, experimenting, and preparing for a career in
            AI engineering.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {ABOUT_QUOTES.map((quote) => (
              <blockquote
                key={quote}
                className="rounded-xl border border-white/[0.08] bg-[#0D131F] p-6 text-base leading-relaxed text-slate-200"
              >
                {quote}
              </blockquote>
            ))}

            <p className="text-sm leading-relaxed text-slate-400">{ABOUT_APPROACH}</p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-medium text-slate-400">
              <span>Undergraduate Fresher</span>
              <span aria-hidden="true">·</span>
              <span>Hands-on Project Learner</span>
              <span aria-hidden="true">·</span>
              <span>Hackathon Enthusiast</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0D131F] p-6 sm:p-8">
              <p className="text-xs font-medium tracking-wider text-blue-400">
                Currently Exploring
              </p>
              <h3 className="mt-2 font-['Outfit'] text-xl font-semibold text-white">
                Primary focus areas in my 1st year
              </h3>

              <ul className="mt-6 divide-y divide-white/[0.08]">
                {FOCUS_AREAS.map((area) => (
                  <li
                    key={area.name}
                    className="flex items-center justify-between gap-4 py-3.5 text-sm"
                  >
                    <span className="font-medium text-slate-200">{area.name}</span>
                    <span className="text-xs font-medium text-blue-400 tabular-nums">
                      {area.stage}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm leading-relaxed text-slate-400">
                Exploring foundational computer science alongside modern tools to bridge practical
                code with AI concepts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
